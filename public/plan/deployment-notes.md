# PentaHouse — Deployment & DNS Change Log

**Date:** 29 September 2026  
**Domain:** https://pentahouse.in  
**VPS:** srv925209.hstgr.cloud — `31.97.207.239`  
**Project:** Next.js 16 (Turbopack)

---

## How We Deployed

### 1. Build Locally
Ran the production build on the local machine to verify no errors:
```
npm run build
```

### 2. Upload Files to VPS (via Python SFTP script)
Used a Python script (`deploy.py`) with `paramiko` to:
- Connect to VPS via SSH (`root@31.97.207.239`)
- Upload all files in `src/` and config files (`package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`) to `/var/www/pentahouse/` on the server via SFTP
- Files excluded from upload: `node_modules/`, `.next/`, `.git/`, `.env.local`

### 3. Install Dependencies on Server
```
cd /var/www/pentahouse
npm install --legacy-peer-deps
```

### 4. Build on Server
```
npm run build
```
- Compiled successfully in ~14.7s
- 11 pages generated (10 static, 1 dynamic: `/blog/[slug]`)

### 5. Restart PM2
```
pm2 restart pentahouse
pm2 save
```
- PM2 process ID: `11`
- App runs on port `3060`
- PM2 process name: `pentahouse`

### Server Stack
| Component | Detail |
|-----------|--------|
| Web server | Nginx (reverse proxy) |
| App server | PM2 (Node.js process manager) |
| App port | 3060 |
| SSL | Certbot / Let's Encrypt |
| Nginx config | `/etc/nginx/sites-enabled/pentahouse.in` |

Nginx proxies all traffic from `pentahouse.in` → `localhost:3060` (Next.js app).

---

## DNS Changes Made (Hostinger DNS Panel)

### 1. Changed ALIAS `@` → A Record
| Field | From | To |
|-------|------|----|
| Type | ALIAS | A |
| Name | @ | @ |
| Content | `pentahouse.in.cdn.hstgr.net` | `31.97.207.239` |

### 2. Changed `www` CNAME → A Record
| Field | From | To |
|-------|------|----|
| Type | CNAME | A |
| Name | www | www |
| Content | `www.pentahouse.in.cdn.hstgr.net` | `31.97.207.239` |

---

## Why These DNS Changes Were Needed

Before the changes, both `pentahouse.in` and `www.pentahouse.in` pointed to Hostinger's shared hosting (WordPress site) via their CDN.

After the changes, both point directly to the VPS IP (`31.97.207.239`), where Nginx receives the request and forwards it to the Next.js app running on port 3060.

```
BEFORE:
pentahouse.in → Hostinger CDN → WordPress (shared hosting)

AFTER:
pentahouse.in → 31.97.207.239 → Nginx → Next.js (port 3060) → PM2
```

---

## Future Deployments

Just run from the project root:
```
python deploy.py
```

This automatically uploads, builds, and restarts the app on the VPS.
