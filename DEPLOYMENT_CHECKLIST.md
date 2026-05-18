# Vercel + Render Deployment Checklist

## Initial Setup

### Backend (Render)

- [ ] Create Render account at render.com
- [ ] Create PostgreSQL database on Render (or note existing database connection details)
- [ ] Get database credentials:
  - [ ] Host
  - [ ] Port (usually 5432)
  - [ ] Database name
  - [ ] Username
  - [ ] Password

### Frontend (Vercel)

- [ ] Create Vercel account at vercel.com
- [ ] Push your code to GitHub (`git push origin main`)
- [ ] Get your GitHub repository URL

---

## Step 1: Deploy Backend to Render

1. **Create Web Service on Render**
   - Go to render.com dashboard
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub repository
   - Select your repo

2. **Configure Web Service**
   - Name: `ai-platform-backend` (or your choice)
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Region: Select closest to your users

3. **Set Environment Variables**
   - Go to Service Settings → Environment
   - Add these variables (update with your database details):
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=your-render-db-host
   DB_PORT=5432
   DB_NAME=ai_agent_platform
   DB_USER=postgres
   DB_PASSWORD=your-secure-password
   CORS_ORIGIN=https://your-frontend-name.vercel.app
   ```

4. **Deploy Database Schema**
   - Get your production database host from Render
   - In your local terminal, run:
   ```bash
   $env:PGPASSWORD='your-db-password'
   & 'C:\Program Files\PostgreSQL\18\bin\psql.exe' -U postgres -h your-db-host -d ai_agent_platform -f 'backend\database.sql'
   ```
   - This loads the schema and 23 seed categories

5. **Copy Backend URL**
   - After deploy succeeds, Render shows you the URL
   - Example: `https://ai-platform-backend.onrender.com`
   - Save this URL

---

## Step 2: Deploy Frontend to Vercel

1. **Create Project on Vercel**
   - Go to vercel.com → "New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Build & Output**
   - Framework: Preset should auto-select Vite
   - Root Directory: `./frontend` (if monorepo) or root if frontend only
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - In Vercel, go to Settings → Environment Variables
   - Add:
   ```
   VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
   ```
   - Replace `your-backend-name` with your Render service name

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will show you the frontend URL
   - Example: `https://your-project-name.vercel.app`

---

## Step 3: Verify Deployment

1. **Test Frontend Loading**
   - Visit your Vercel URL in browser
   - Should see homepage with categories

2. **Test API Connection**
   - With browser dev tools open (F12)
   - Go to Network tab
   - Click on a category
   - Should see API request to your Render backend
   - Response should show projects

3. **Test Full Workflow**
   - [ ] View categories (should show 23 categories)
   - [ ] View category details and projects
   - [ ] Try deleting a project (if applicable)
   - [ ] Check browser console for errors

4. **Monitor Errors**
   - Vercel: Check Deployments tab, look for build logs
   - Render: Check Logs tab for runtime errors
   - Browser: Press F12, check Console tab

---

## Step 4: Update Backend CORS (if needed)

If you get "CORS error" after deployment:

1. **Get correct frontend URL** from Vercel dashboard (with HTTPS)
2. **Update Environment Variable on Render**
   - Go to Render Service → Environment
   - Update `CORS_ORIGIN` to exact Vercel URL
   - Add `https://` prefix
   - Add `.vercel.app` suffix
   - Example: `https://my-project.vercel.app`
3. **Restart Service** on Render (usually auto-restarts on env change)

---

## Troubleshooting

### Frontend shows blank page
- Check browser console (F12) for errors
- Verify `VITE_API_BASE_URL` is set in Vercel Environment Variables
- Check that Render backend is running (visit backend URL in browser)

### API calls fail with 500 error
- Check Render logs for database connection errors
- Verify all database credentials are correct
- Ensure database exists: `ai_agent_platform`
- Verify schema was loaded: Run `database.sql` again if needed

### CORS errors in browser
- Exact `CORS_ORIGIN` must match your Vercel URL including `https://`
- Restart Render service after changing environment variables
- Clear browser cache (Ctrl+Shift+Delete)

### Build fails on Vercel
- Check that `npm run build` works locally first
- Verify all dependencies are in `package.json`
- Check Node version compatibility (use Node 18+ recommended)

### Render keeps crashing
- Check Render logs for detailed error messages
- Verify `npm start` command and that `server.js` is valid
- Check that PORT environment variable is NOT hardcoded (use `process.env.PORT`)

---

## Next Steps After Deployment

1. **Enable Auto-Deploy**
   - Both Vercel and Render auto-deploy on git push
   - Any changes to main branch will redeploy

2. **Set Up Custom Domain** (optional)
   - Vercel: Add domain in Settings → Domains
   - Render: Add custom domain in Service Settings

3. **Add CI/CD Tests** (advanced)
   - Add GitHub Actions workflows to run tests before deploy
   - Prevents broken deploys

4. **Monitor Performance**
   - Vercel Analytics: Settings → Analytics
   - Render: Check resource usage in dashboard

---

## Quick Reference

| Component | Platform | URL Format |
|-----------|----------|-----------|
| Frontend | Vercel | `https://your-project.vercel.app` |
| Backend API | Render | `https://your-backend.onrender.com` |
| Database | Render | PostgreSQL instance |

**Frontend connects to Backend via**: `VITE_API_BASE_URL` environment variable
**Backend accepts requests from**: `CORS_ORIGIN` environment variable
