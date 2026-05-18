# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Setup PostgreSQL Database

```bash
# Create database
createdb ai_agent_platform

# Run schema (from backend folder)
psql -U postgres -d ai_agent_platform -f database.sql
```

### 3. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

✅ Open `http://localhost:5173` in your browser

## 🎯 What You Get

### Homepage
- Hero section with animated title
- 10 pre-loaded business categories
- Smooth category cards with hover effects
- CTA buttons to explore and add projects

### Category Page
- View all AI projects in a category
- Project cards with image preview
- Problem statement preview
- Direct GitHub links

### Project Detail Page
- Full project documentation
- Problem statement & challenges
- AI solution explanation
- Workflow visualization
- Technology stack display
- Benefits & future improvements
- GitHub repository button

### Admin Panel
- Add new projects easily
- Select category
- Upload workflow images
- Add multiple technologies
- Form validation

## 📂 File Structure

```
Gen AI/
├── frontend/          # React.js SPA
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── context/       # Global state
│   │   ├── hooks/         # Custom hooks
│   │   └── styles/        # Global styles
│   └── package.json
│
└── backend/           # Express.js API
    ├── src/
    │   ├── routes/        # API routes
    │   ├── controllers/    # Business logic
    │   ├── models/        # Database queries
    │   ├── middleware/    # Custom middleware
    │   └── config/        # Configuration
    ├── database.sql       # Schema
    └── package.json
```

## 🔧 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project
- `GET /api/categories/:categoryId/projects` - Get by category
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🎨 Customization

### Change Colors
Edit `frontend/src/styles/globals.css`:
```css
:root {
  --color-primary: #1a1a1a;
  --color-accent: #0066ff;
  /* ... other variables */
}
```

### Add More Categories
Edit `backend/database.sql` and re-run migrations

### Modify Database
Edit `backend/src/config/database.js`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Frontend (5173)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error
- Check PostgreSQL is running
- Verify `.env` credentials
- Ensure database exists: `createdb ai_agent_platform`

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Verify frontend URL in CORS config

## 📦 Production Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy 'dist' folder to Vercel
```

### Backend (Render.com)
```
1. Push to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy
```

### Database (Neon.tech)
```
1. Create PostgreSQL instance
2. Update DB credentials in .env
3. Run database.sql
```

## 💡 Next Steps

1. ✅ Add your own AI projects
2. ✅ Customize colors and fonts
3. ✅ Deploy to production
4. ✅ Add more categories
5. ✅ Configure analytics

## 📚 Technology Stack

| Aspect | Technology |
|--------|-----------|
| Frontend | React.js, Vite |
| Routing | React Router |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Plain CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| HTTP | Axios |

## 🌟 Features Included

✅ Responsive design
✅ Modern SaaS UI
✅ Smooth animations
✅ Loading skeletons
✅ Toast notifications
✅ Form validation
✅ Error handling
✅ Image upload
✅ CORS support
✅ MVC architecture

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [PostgreSQL](https://postgresql.org)
- [Framer Motion](https://www.framer.com/motion)
- [Vite Guide](https://vitejs.dev)

---

**You're all set! Start building amazing projects! 🚀**
