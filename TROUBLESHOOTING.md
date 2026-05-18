# Setup & Troubleshooting Guide

## ✅ Installation Checklist

### Prerequisites
- [ ] Node.js 16.x+ installed
- [ ] npm or yarn installed
- [ ] PostgreSQL 12.x+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### Verification
```bash
node --version    # Should be v16+
npm --version     # Should be 8+
psql --version    # Should be PostgreSQL 12+
```

---

## 🚀 Step-by-Step Setup

### 1. Frontend Setup

```bash
cd frontend
npm install
```

**Expected output:**
- No errors
- Dependencies installed in `node_modules/`

**If errors occur:**
- Try `npm cache clean --force`
- Delete `package-lock.json`
- Run `npm install` again

---

### 2. Backend Setup

```bash
cd ../backend
npm install
```

**Expected output:**
- No errors
- Dependencies installed in `node_modules/`

---

### 3. Database Setup

Create database:
```bash
createdb ai_agent_platform
```

**Error: `createdb: command not found`**
- PostgreSQL not in PATH
- Use pgAdmin instead
- Or: `psql -U postgres -c "CREATE DATABASE ai_agent_platform;"`

Load schema:
```bash
psql -U postgres -d ai_agent_platform -f database.sql
```

**Error: `FATAL: Ident authentication failed`**
- Password authentication issue
- Try: `psql -U postgres -W -d ai_agent_platform -f database.sql`
- Enter password when prompted

**Error: `connection refused`**
- PostgreSQL not running
- start PostgreSQL service (varies by OS)

---

### 4. Environment Setup

**Backend `.env`:**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_agent_platform
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=http://localhost:5173
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 5. Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
API available at http://localhost:5000/api
Database connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v5.0.0
  Local:   http://localhost:5173/
```

---

## 🔧 Troubleshooting Guide

### Frontend Issues

#### Issue: `npm install` fails
```
Solution:
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

#### Issue: Port 5173 already in use
```bash
# Find process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 5174
```

#### Issue: Module not found errors
```
Solution:
- Check import paths are correct
- Verify file names match exactly
- Clear .vite cache
rm -rf node_modules/.vite
npm run dev
```

#### Issue: CORS errors in console
```
Frontend shows: Access to XMLHttpRequest blocked by CORS

Solution:
1. Verify backend is running on 5000
2. Check VITE_API_BASE_URL in .env
3. Verify CORS_ORIGIN in backend .env
4. Restart both servers
```

#### Issue: API requests timeout
```
Solution:
1. Check backend server is running
2. Network tab in DevTools to verify request
3. Check if proxy is configured in vite.config.js
```

---

### Backend Issues

#### Issue: `npm install` fails for pg or bcrypt
```
Solution:
# Build tools needed
Windows: Install Python + Visual Studio Build Tools
Mac: xcode-select --install
Linux: sudo apt-get install build-essential

npm install
```

#### Issue: Port 5000 already in use
```bash
# Find process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
npm run dev
```

#### Issue: Cannot connect to database
```
Solution:
1. Verify PostgreSQL is running
   - Windows: Check Services
   - Mac: brew services list
   - Linux: sudo service postgresql status

2. Check connection string in .env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres

3. Test connection:
   psql -U postgres -h localhost
```

#### Issue: Database schema errors
```
Solution:
1. Check database exists
   psql -l

2. Verify schema loaded
   psql -d ai_agent_platform -c "\dt"
   
3. Reload schema
   psql -d ai_agent_platform -f database.sql
```

#### Issue: Cannot find module dotenv
```bash
Solution:
cd backend
npm install dotenv
```

---

### Database Issues

#### Issue: createdb fails
```bash
Solution:
# Check PostgreSQL running
psql -U postgres -l

# If not installed, install PostgreSQL
# Windows: Download installer
# Mac: brew install postgresql@14
# Linux: sudo apt-get install postgresql
```

#### Issue: Permission denied error
```
Solution:
1. Check username/password
2. Try:
   psql -U postgres -W -d template1
   
3. If wrong password, reset:
   sudo -u postgres psql
   ALTER USER postgres WITH PASSWORD 'newpassword';
```

#### Issue: Database already exists
```sql
Solution:
DROP DATABASE IF EXISTS ai_agent_platform;
CREATE DATABASE ai_agent_platform;
\c ai_agent_platform
\i database.sql
```

#### Issue: Tables not created
```bash
Solution:
psql -d ai_agent_platform -f backend/database.sql

# Verify tables:
psql -d ai_agent_platform -c "\dt"
# Should show: categories, projects
```

---

### Common Application Issues

#### Issue: Homepage shows no categories
```
Solution:
1. Check database has categories
   psql -d ai_agent_platform -c "SELECT * FROM categories;"

2. Check backend API returns data
   curl http://localhost:5000/api/categories

3. Check frontend console for errors
```

#### Issue: Cannot upload project image
```
Solution:
1. Verify uploads/ folder exists
2. Check backend has write permissions
3. Verify image size < 10MB
4. Check browser console for error details
```

#### Issue: Project form validation error
```
Solution:
1. Check all required fields filled
2. Verify category is selected
3. Check console for specific error
4. Verify backend is responding to POST request
```

---

### Network & Connectivity

#### Issue: Frontend can't reach backend
```bash
Solution:
1. Verify both services running
   - Backend: http://localhost:5000/health
   - Frontend: http://localhost:5173

2. Check firewall
   - Windows: Check Windows Defender
   - Mac: Check System Preferences
   - Linux: Check iptables

3. Verify proxy in vite.config.js:
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, '')
     }
   }
```

#### Issue: Localhost refuses connection
```
Solution:
1. Ensure services are actually running
2. Check correct ports (5000, 5173)
3. Try 127.0.0.1 instead of localhost
4. Restart both services
```

---

## 🔍 Debugging Commands

### Frontend Debugging

```bash
# Check npm scripts
npm run

# List installed packages
npm ls

# Check specific package version
npm ls react

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

### Backend Debugging

```bash
# List all npm packages
npm ls

# Check specific package
npm ls pg

# Test server startup
npm run dev

# Check Node version
node --version

# Debug with verbose logging
DEBUG=* npm run dev
```

### Database debugging

```bash
# Connect to database
psql -d ai_agent_platform

# List databases
\l

# List tables
\dt

# Describe table
\d projects

# Query all data
SELECT * FROM categories;

# Count records
SELECT COUNT(*) FROM projects;

# Exit psql
\q
```

---

## 📋 Verification Checklist

### Frontend Working?
- [ ] Page loads at http://localhost:5173
- [ ] Navigation works
- [ ] Categories display
- [ ] No console errors
- [ ] Styles appear correctly
- [ ] Animations smooth

### Backend Working?
- [ ] Server runs without errors
- [ ] Health check passes: `curl http://localhost:5000/health`
- [ ] Categories API returns data
- [ ] Projects API returns data
- [ ] Console shows requests

### Database Working?
- [ ] Can connect with psql
- [ ] Tables exist (categories, projects)
- [ ] Categories contain sample data
- [ ] Can query without errors

### Full Stack Working?
- [ ] Frontend loads homepage
- [ ] Categories appear from database
- [ ] Can navigate between pages
- [ ] API calls work
- [ ] No CORS errors
- [ ] No 404 errors

---

## 🆘 Getting Help

### Before Asking for Help

1. **Check console errors**
   - Browser: F12 → Console tab
   - Terminal: Check output for error messages

2. **Verify services running**
   - Backend: `curl http://localhost:5000/health`
   - Frontend: Visit http://localhost:5173

3. **Check environment variables**
   - Backend: Verify .env file exists
   - Frontend: Verify .env file exists
   - Database: Verify database exists

4. **Restart everything**
   - Kill backend (Ctrl+C)
   - Kill frontend (Ctrl+C)
   - Restart both services

5. **Check documentation**
   - README.md
   - QUICKSTART.md
   - backend/README.md
   - frontend/README.md

### Error Message Guide

| Error | Probable Cause | Solution |
|-------|---|---|
| `EADDRINUSE` | Port in use | Kill process on port |
| `ECONNREFUSED` | Backend not running | Start backend |
| `CORS error` | Backend CORS config | Check .env |
| `Cannot find module` | Missing dependency | npm install |
| `connect ECONNREFUSED` | Database not running | Start PostgreSQL |
| `Unexpected token` | JSON parse error | Check API response |
| `net::ERR_NAME_NOT_RESOLVED` | Wrong hostname | Use localhost |

---

## 💾 File Permissions

### Linux/Mac
```bash
# Make database.sql readable
chmod 644 backend/database.sql

# Make directories writable
chmod 755 backend/uploads
chmod 755 frontend/node_modules

# Make scripts executable (if needed)
chmod +x backend/node_modules/.bin/*
```

### Windows
- Right-click folder → Properties → Security
- Check "Full Control" for your user
- Apply and OK

---

## 🌐 Network Setup for Collaboration

### Access from Another Machine

**Backend:**
```env
# In backend/.env
CORS_ORIGIN=http://192.168.1.100:5173
```

**Frontend:**
```env
# In frontend/.env
VITE_API_BASE_URL=http://192.168.1.100:5000/api
```

Replace `192.168.1.100` with your machine's IP address.

---

## 📱 Mobile Testing

### Local Mobile Access
```
1. Get your machine's IP: ipconfig (Windows) or ifconfig (Mac/Linux)
2. Frontend URL: http://YOUR_IP:5173
3. Ensure firewall allows port 5173
4. Test on mobile browser
```

---

## 🚀 Production Verification

### Pre-Deployment Checklist

- [ ] `npm run build` succeeds (frontend)
- [ ] No console errors in production
- [ ] Database backups configured
- [ ] Environment variables configured
- [ ] HTTPS certificates installed
- [ ] Custom domain configured
- [ ] CI/CD pipeline working
- [ ] Monitoring/logging setup
- [ ] Database migrations tested
- [ ] API documentation updated

---

## 📊 Performance Troubleshooting

### Slow Frontend
```
Check:
1. Network tab in DevTools
2. Performance tab for bottlenecks
3. Bundle size: npm run build
4. Large images slowing load
```

### Slow Backend
```
Check:
1. Database query performance
2. Missing database indexes
3. N+1 query problems
4. Connection pool exhaustion
```

### Slow Database
```
Check:
1. Index existence
2. Query execution plan
3. Connection limits
4. Disk space available
```

---

## 🔐 Security Verification

### Before Production

- [ ] Remove console.logs
- [ ] Check .env not committed
- [ ] Verify CORS whitelist
- [ ] Check input validation
- [ ] Update dependencies
- [ ] Enable HTTPS
- [ ] Setup rate limiting
- [ ] Add authentication
- [ ] Review error messages

---

## 📞 Support Resources

### Official Documentation
- React: https://react.dev/learn
- Express: https://expressjs.com/en/starter/hello-world.html
- PostgreSQL: https://www.postgresql.org/docs/current/
- Vite: https://vitejs.dev/guide/

### Troubleshooting Sites
- Stack Overflow: Search your error
- GitHub Issues: Check project repos
- Error codes: Look up specific error messages

---

## ✨ Success Indicators

When everything is working:
- ✅ Frontend loads without errors
- ✅ Backend server running (no errors)
- ✅ Database contains categories
- ✅ Can navigate between pages
- ✅ API requests complete successfully
- ✅ No console errors
- ✅ Toast notifications work
- ✅ Can create projects via admin panel
- ✅ Images upload properly
- ✅ All animations smooth

---

**You're all set! 🎉 Enjoy building!**

If something isn't working, first:
1. Check this guide
2. Review error messages
3. Verify services are running
4. Restart everything
5. Check documentation

