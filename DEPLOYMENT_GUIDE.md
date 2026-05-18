# Deployment Guide: Vercel + Render

## 1. Frontend Deployment (Vercel)

### Prerequisites
- GitHub account with your project repo pushed
- Vercel account (vercel.com)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment to Vercel and Render"
   git push origin main
   ```

2. **Connect Vercel**
   - Go to vercel.com, sign in, click "New Project"
   - Select your GitHub repository
   - Select "frontend" as the root directory (if monorepo)
   - Or just import the frontend folder if separate

3. **Configure Environment Variables in Vercel**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-render-backend-url/api
     ```
   - Example: `https://ai-platform-backend.onrender.com/api`

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

---

## 2. Backend Deployment (Render)

### Prerequisites
- Render account (render.com)
- Production PostgreSQL database (see options below)

### Database Options

**Option A: PostgreSQL on Render (Recommended)**
- Go to Render Dashboard → New + → PostgreSQL
- Create a new database instance
- Save the connection string

**Option B: Keep existing PostgreSQL instance**
- Ensure your current PostgreSQL is accessible from internet (requires firewall config)
- Or migrate to cloud-hosted PostgreSQL (AWS RDS, Azure Database, etc.)

### Steps

1. **Prepare Backend for Production**
   - Update `backend/.env.production` with production database URL
   - Ensure CORS_ORIGIN matches your Vercel frontend URL

2. **Connect Render**
   - Go to render.com, sign in, click "New Web Service"
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub repo
   - Select the "backend" directory as root

3. **Configure Environment Variables on Render**
   - In Render dashboard, go to Environment
   - Add the following:
     ```
     NODE_ENV=production
     PORT=10000
     DB_HOST=your-db-host
     DB_PORT=5432
     DB_NAME=ai_agent_platform
     DB_USER=postgres
     DB_PASSWORD=your-secure-password
     CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
     ```

4. **Configure Build Settings**
   - Build Command: `npm install && npm run build` (if you have a build script)
   - Start Command: `npm start`
   - Node Version: 20 (or your version)

5. **Deploy Database Schema**
   - Before first deploy, run the SQL schema on production database:
     ```bash
     psql -U postgres -h your-prod-db-host -d ai_agent_platform -f backend/database.sql
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

---

## 3. Post-Deployment Checklist

- [ ] Frontend builds without errors
- [ ] Backend API is accessible from Vercel (test `/api/categories`)
- [ ] Database has all 23 categories
- [ ] CORS headers allow requests from Vercel frontend
- [ ] Environment variables are set correctly on both platforms
- [ ] Hero image is in `frontend/public/ai-hero.png`
- [ ] Test creating/viewing/deleting projects from production frontend

---

## 4. Troubleshooting

### Common Issues

**CORS errors on Vercel frontend**
- Check `CORS_ORIGIN` in Render environment matches your Vercel domain exactly
- Restart Render service after changing env vars

**Frontend can't connect to API**
- Verify `VITE_API_URL` is set in Vercel
- Check that Render backend URL is accessible (test in browser)
- Look at browser Network tab to see actual request URL

**Database connection fails on Render**
- Ensure all DB credentials are correct
- Check database is running and accessible
- Verify firewall/security group allows Render to connect

**Build fails on Vercel**
- Check that `npm run build` works locally
- Verify all dependencies are in package.json
- Check for environment variable references

---

## 5. Quick Reference: URLs After Deployment

```
Frontend:  https://your-project-name.vercel.app
Backend:   https://your-backend-name.onrender.com
API Base:  https://your-backend-name.onrender.com/api
```
