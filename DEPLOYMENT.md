# Deployment Guide

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│          Production Environment                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Frontend (Vercel)    Backend (Render/Railway)      │
│  ├─ React SPA          ├─ Express API               │
│  ├─ Vite Built        ├─ Node.js                   │
│  └─ CDN               └─ Port 5000                 │
│         ↓                    ↓                       │
│      API Calls ───────────────────→ Processing     │
│                                                      │
│              ↓                                       │
│    PostgreSQL Database (Neon/Supabase)             │
│         ├─ Backups                                 │
│         ├─ Monitoring                              │
│         └─ SSL Connection                          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free)
- Project pushed to GitHub

### Step 1: Prepare Frontend

```bash
cd frontend

# Update environment variables
# .env for development (already set)
# Vercel will use .env.production

# Build locally to test
npm run build

# Check dist folder created
ls dist/
```

### Step 2: Configure Vercel

Create `vercel.json` in project root:
```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "frontend/dist/index.html"
    }
  ]
}
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**Option B: GitHub Integration**
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select frontend folder
5. Set Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com/api
   ```
6. Click Deploy

### Step 4: Configure Environment

In Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add:
   ```
   VITE_API_BASE_URL=https://your-api-domain.com/api
   ```
3. Redeploy

### Step 5: Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your domain
3. Update DNS records:
   - Type: CNAME
   - Name: www (or @ for root)
   - Value: cname.vercel-dns.com

### Verification
```
✅ Frontend deployed at https://yourdomain.com
✅ API requests go to backend
✅ All pages load correctly
✅ Animations work smoothly
```

---

## 🔧 Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (https://render.com)
- Backend code pushed to GitHub

### Step 1: Prepare Backend

```bash
cd backend

# Update package.json
npm install

# Verify scripts
npm start  # Should work

# Create .env for deployment
# Don't commit this file!
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Create Render Service

1. Log in to Render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository
5. Fill in details:
   - Name: `ai-agent-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free (or Paid)

### Step 4: Configure Environment Variables

In Render Dashboard, go to Environment variables:
```env
PORT=5000
NODE_ENV=production
DB_HOST=your-database-host.neon.tech
DB_PORT=5432
DB_NAME=ai_agent_platform
DB_USER=neon_user
DB_PASSWORD=secure_password_here
CORS_ORIGIN=https://yourdomain.com
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment
3. Get URL from dashboard
4. Update frontend `VITE_API_BASE_URL`

---

## 🗄️ Database Deployment (Neon)

### Prerequisites
- Neon account (https://neon.tech)
- Database schema ready

### Step 1: Create Neon Database

1. Log in to Neon.tech
2. Click "Create Project"
3. Configure:
   - Database Name: `ai_agent_platform`
   - Region: Closest to your backend
   - PostgreSQL Version: 14 or 15

### Step 2: Get Connection String

1. In Neon Dashboard
2. Connection String section
3. Copy `Database URL`
   ```
   postgresql://user:password@host:5432/dbname
   ```

### Step 3: Load Schema

```bash
# Using psql
PGPASSWORD=your_password psql -h host -U user -d dbname -f database.sql

# Or using connection string
psql "postgresql://user:password@host:5432/dbname" -f database.sql
```

### Step 4: Update Backend Environment

```env
# Neon provides this format
DB_HOST=your-db.neon.tech
DB_PORT=5432
DB_NAME=ai_agent_platform
DB_USER=neon_user
DB_PASSWORD=your_secure_password
```

### Step 5: Verify Connection

```bash
# From backend directory
npm run dev

# Check server connects to database
# Should see: "Database connected successfully"
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Frontend
      run: |
        cd frontend
        npm install
        npm run build
        vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
    
    - name: Deploy Backend
      run: |
        cd backend
        npm install
        # Render auto-deploys on push to connected repo
```

---

## 🔐 Security Checklist

### Before Going Live

- [ ] No `.env` files committed
- [ ] No API keys in code
- [ ] HTTPS enabled on all services
- [ ] CORS properly configured
- [ ] Database password is strong
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error messages don't leak info
- [ ] Dependencies updated
- [ ] Secrets stored securely

### Environment Variables Checklist

**Frontend (Vercel):**
```
✅ VITE_API_BASE_URL (use https://)
```

**Backend (Render):**
```
✅ NODE_ENV=production
✅ PORT (assigned by Render)
✅ DB_HOST (from Neon)
✅ DB_USER (from Neon)
✅ DB_PASSWORD (secure, random)
✅ DB_NAME (ai_agent_platform)
✅ CORS_ORIGIN (your frontend URL)
```

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

**Render Dashboard:**
- CPU usage
- Memory usage
- Request count
- Error rate

**Neon Dashboard:**
- Database connections
- Query performance
- Backup status

### Regular Maintenance

```
Daily:
- Check error logs
- Monitor uptime

Weekly:
- Review performance metrics
- Check for failed requests

Monthly:
- Update dependencies
- Review security updates
- Backup database
- Analyze usage patterns
```

---

## 🔧 Production Commands

### Testing Production Build Locally

```bash
# Frontend
cd frontend
npm run build
npm run preview
# Visit http://localhost:4173

# Backend
cd backend
NODE_ENV=production npm start
```

### Accessing Production Logs

**Render Backend:**
```
1. Log in to Render
2. Select your service
3. Logs tab
4. View real-time logs
```

**Neon Database:**
```
1. Log in to Neon
2. Dashboard
3. Recent activity
4. Query performance
```

---

## 🚨 Troubleshooting Production

### Frontend Not Loading

**Solution:**
1. Check Vercel deployment status
2. Verify environment variables set
3. Check browser console for errors
4. Clear browser cache (Ctrl+Shift+Delete)

### Backend API Returning 500 Error

**Solution:**
1. Check Render logs
2. Verify database connection
3. Check environment variables
4. Review recent changes

### Database Connection Failing

**Solution:**
1. Verify connection string format
2. Check password correct
3. Verify IP whitelisted (Neon)
4. Test connection from backend logs

### Slow Performance

**Solution:**
1. Check database query performance
2. Enable caching on frontend
3. Use CDN for static assets
4. Optimize images
5. Add database indexes

---

## 📱 Testing Before Launch

### Pre-Deployment Testing

```bash
# Frontend Testing
npm run build
npm run preview

# Backend Testing
NODE_ENV=production npm start

# Manual Tests
- Test homepage loading
- Test category navigation
- Test project details page
- Test admin form submission
- Test image upload
- Test API requests
- Test error handling
- Test on mobile devices
```

---

## 📈 Scaling Strategy

### If Traffic Increases

**Database:**
- Upgrade Neon plan
- Add indexes
- Enable connection pooling
- Archive old data

**Backend:**
- Scale to multiple instances (Render)
- Enable auto-scaling
- Implement caching (Redis)
- Optimize queries

**Frontend:**
- Already on CDN (Vercel)
- Enable compression
- Optimize bundle size
- Implement lazy loading

---

## 💰 Cost Estimation

| Service | Tier | Cost/Month |
|---------|------|-----------|
| Vercel | Hobby | $0-20 |
| Render | Free/Starter | $0-7 |
| Neon | Free/Pro | $0-50 |
| Custom Domain | Namecheap | $10-15 |
| **Total** | | **$10-92** |

---

## 🎯 Post-Launch

### Day 1
- Monitor for errors
- Check all features work
- Get user feedback
- Monitor costs

### Week 1
- Analyze user behavior
- Optimize based on errors
- Plan improvements
- Setup analytics

### Month 1
- Review performance metrics
- Plan next features
- Gather user feedback
- Prepare for scaling

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All tests pass locally
- [ ] Build succeeds without errors
- [ ] Environment variables set
- [ ] Database schema applied
- [ ] Security review completed
- [ ] Performance tested

### During Deployment
- [ ] Frontend deployed successfully
- [ ] Backend deployed successfully
- [ ] Database migrated
- [ ] Environment variables verified
- [ ] Services can communicate

### Post-Deployment
- [ ] Homepage loads
- [ ] Categories display
- [ ] API requests work
- [ ] No console errors
- [ ] No 404 errors
- [ ] Animations smooth
- [ ] Mobile responsive
- [ ] Forms submit successfully

---

## 📞 Deployment Support

### Service Documentation
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Neon: https://neon.tech/docs
- GitHub: https://docs.github.com

### Need Help?
1. Check service status pages
2. Review documentation
3. Check GitHub issues
4. Contact support teams

---

**Congratulations! Your app is live! 🎉**

