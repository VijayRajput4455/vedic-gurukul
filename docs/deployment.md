# Deployment Guide: Sanskrit Vedic Gurukul & Trust Website

## 1. Local Development

```bash
cd frontend
npm install
npm run dev
```

The application will start on `http://localhost:5173/`.

---

## 2. Production Build

```bash
cd frontend
npm run build
```

This compiles optimized assets into `frontend/dist/`.

---

## 3. Hosting Options

### A. Vercel / Netlify / Cloudflare Pages (Recommended)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or 20.x+

### B. Nginx / Apache Static Hosting
Copy `frontend/dist/` to `/var/www/html/` or your virtual host directory. Ensure fallback routing for single-page applications:

```nginx
server {
    listen 80;
    server_name vedicgurukul.org;
    root /var/www/vedic-gurukul/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### C. Docker Deployment

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
