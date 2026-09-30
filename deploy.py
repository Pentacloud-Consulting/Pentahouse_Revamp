"""
PentaHouse VPS Deployment Script
Uploads src/ + config files, builds on server, restarts PM2
Run: python deploy.py
"""

import sys
import paramiko
from pathlib import Path

# ─── CONFIG ──────────────────────────────────────────────────────────────────
HOST       = "31.97.207.239"
PORT       = 22
USER       = "root"
PASSWORD   = "Pentacloud@2026"
REMOTE_DIR = "/var/www/pentahouse"

LOCAL_PROJECT = Path(__file__).parent

UPLOAD_ITEMS = [
    "src",
    "package.json",
    "next.config.ts",
    "postcss.config.mjs",
    "tsconfig.json",
]

SKIP_DIRS  = {"node_modules", ".next", ".git", ".vscode", "__pycache__"}
SKIP_FILES = {".env.local", ".env", "deploy.py"}
# ─────────────────────────────────────────────────────────────────────────────


def log(msg, tag=">>"):
    print(f"  {tag} {msg}", flush=True)


def upload_dir(sftp, local_path: Path, remote_path: str):
    try:
        sftp.stat(remote_path)
    except FileNotFoundError:
        sftp.mkdir(remote_path)

    for item in sorted(local_path.iterdir()):
        if item.name in SKIP_DIRS or item.name in SKIP_FILES:
            continue
        remote_item = f"{remote_path}/{item.name}"
        if item.is_dir():
            upload_dir(sftp, item, remote_item)
        else:
            rel = item.relative_to(LOCAL_PROJECT)
            log(f"  {rel}")
            sftp.put(str(item), remote_item)


def run_cmd(ssh, command: str):
    print(f"\n  $ {command}", flush=True)
    _, stdout, stderr = ssh.exec_command(command, get_pty=True)
    for line in stdout:
        line = line.rstrip()
        if line:
            print(f"    {line}", flush=True)
    exit_code = stdout.channel.recv_exit_status()
    err = stderr.read().decode().strip()
    if exit_code != 0 and err:
        print(f"  STDERR: {err}", flush=True)
    return exit_code


def main():
    # Force UTF-8 on Windows terminal
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    print("\n" + "=" * 55)
    print("  PentaHouse Deployment Script")
    print("=" * 55)
    print(f"  Host   : {HOST}")
    print(f"  Remote : {REMOTE_DIR}")
    print("=" * 55 + "\n")

    # 1. Connect
    log("Connecting to VPS...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(HOST, port=PORT, username=USER, password=PASSWORD, timeout=30)
    except Exception as e:
        print(f"\n  Connection failed: {e}")
        sys.exit(1)
    log("Connected! [OK]")

    # 2. Upload files via SFTP
    log("Opening SFTP...")
    sftp = ssh.open_sftp()

    for item_name in UPLOAD_ITEMS:
        local_item = LOCAL_PROJECT / item_name
        if not local_item.exists():
            log(f"Skipping (not found): {item_name}", "!")
            continue
        remote_item = f"{REMOTE_DIR}/{item_name}"
        if local_item.is_dir():
            log(f"Uploading folder: {item_name}/", "[DIR]")
            upload_dir(sftp, local_item, remote_item)
        else:
            log(f"Uploading file: {item_name}", "[FILE]")
            sftp.put(str(local_item), remote_item)

    sftp.close()
    log("All files uploaded! [DONE]")

    # 3. npm install
    print("\n" + "-" * 55)
    log("Installing dependencies...")
    run_cmd(ssh, f"cd {REMOTE_DIR} && npm install --legacy-peer-deps")

    # 4. npm run build
    print("\n" + "-" * 55)
    log("Building Next.js app (takes ~1-2 min)...")
    code = run_cmd(ssh, f"cd {REMOTE_DIR} && npm run build")

    if code != 0:
        print("\n  Build FAILED! Check errors above.")
        ssh.close()
        sys.exit(1)

    # 5. Restart PM2
    print("\n" + "-" * 55)
    log("Restarting PM2...")
    run_cmd(ssh, "pm2 restart pentahouse || pm2 start npm --name pentahouse -- start")
    run_cmd(ssh, "pm2 save")

    ssh.close()
    print("\n" + "=" * 55)
    print("  Deployment complete!")
    print("  Live at: https://pentahouse.in")
    print("=" * 55 + "\n")


if __name__ == "__main__":
    main()
