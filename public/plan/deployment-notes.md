# PentaHouse — Deployment & DNS Documentation

**Last Updated:** 30 September 2026  
**Live Site:** https://pentahouse.in  
**VPS Server:** `srv925209.hstgr.cloud` (`31.97.207.239`)  
**Project Framework:** Next.js 16 (Turbopack)  

---

## 🚀 Quick Deployment Guide (Python SFTP Auto-Deploy)

To deploy updates to the live site at any time, run the following command from the project root directory:

```bash
python deploy.py
```

### Prerequisites
1. **Python 3** installed on your system.
2. **Paramiko library** installed:
   ```bash
   pip install paramiko
   ```

---

## 📋 What `deploy.py` Does Automatically

1. **SSH Connection:** Connects securely to VPS `31.97.207.239` via SSH / SFTP.
2. **File Upload:** Uploads modified project files (`src/`, `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`).
3. **Exclusions:** Automatically skips unnecessary/sensitive files (`node_modules`, `.next`, `.git`, `.env.local`, etc.).
4. **Dependency Installation:** Executes `npm install --legacy-peer-deps` on the server.
5. **Next.js Production Build:** Runs `npm run build` directly on the VPS.
6. **PM2 Server Restart:** Restarts process `pentahouse` via `pm2 restart pentahouse || pm2 start npm --name pentahouse -- start` and saves state (`pm2 save`).

---

## 🤖 Prompt / AI Guide for Future Deployments

> **Copy and paste this prompt into AI assistant when you want to deploy changes in the future:**

```text
Please deploy the latest code of PentaHouse to the production VPS server.

1. Ensure paramiko is available, then execute the deployment script in the project root:
   python deploy.py

2. Monitor output and verify:
   - SFTP file upload completed cleanly.
   - `npm install --legacy-peer-deps` succeeded.
   - `npm run build` compiled successfully with exit code 0.
   - PM2 restarted process "pentahouse".

3. Confirm live website status at https://pentahouse.in.
```

---

## 🛠 Manual Deployment / SSH Fallback Instructions

If `deploy.py` cannot be used or you need to inspect the server manually:

### 1. SSH into VPS
```bash
ssh root@31.97.207.239
```
*(Password configured inside `deploy.py`)*

### 2. Navigate to Project Directory
```bash
cd /var/www/pentahouse
```

### 3. Build & Restart PM2
```bash
npm install --legacy-peer-deps
npm run build
pm2 restart pentahouse
pm2 save
```

### 4. PM2 Status & Logs Check
```bash
pm2 status
pm2 logs pentahouse --lines 50
```

---

## ⚙️ VPS & Server Configuration

| Component | Configuration / Detail |
|-----------|------------------------|
| **Server Host** | Hostinger VPS (`31.97.207.239`) |
| **Web Server** | Nginx (Reverse Proxy `pentahouse.in` -> `localhost:3060`) |
| **App Manager** | PM2 (`pentahouse` process running Next.js) |
| **App Port** | `3060` |
| **Remote Path** | `/var/www/pentahouse` |
| **SSL Certificate**| Let's Encrypt / Certbot |
| **Nginx Config** | `/etc/nginx/sites-enabled/pentahouse.in` |

---

## 🌐 DNS Settings (Hostinger Panel)

| Record Type | Name | Target / Content | Status |
|-------------|------|------------------|--------|
| **A** | `@` | `31.97.207.239` | Active |
| **A** | `www` | `31.97.207.239` | Active |

*(Directly points domain traffic to VPS IP, bypassing Hostinger Shared CDN).*
