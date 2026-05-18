# AI Agent Solutions Platform

A comprehensive full-stack web platform showcasing AI business automation projects. Built with modern SaaS design principles, featuring a React frontend and Node.js/Express backend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup & Configuration](#setup--configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)

## ✨ Features

### Frontend
- **Homepage Hero Section** with smooth animations
- **Category Showcase** with business automation categories
- **Case Study Gallery** organized by category
- **Detailed Project Documentation** with workflow visualization
- **Admin Panel** to add new projects
- **Responsive Design** for all devices
- **Modern SaaS UI** with soft shadows and smooth interactions
- **Loading States** with skeleton screens
- **Toast Notifications** for user feedback

### Backend
- **RESTful API** with Express.js
- **PostgreSQL Database** for persistence
- **MVC Architecture** for clean code organization
- **CORS Support** for cross-origin requests
- **Error Handling** middleware
- **File Upload Support** for images

## 🛠 Tech Stack

### Frontend
- **React.js** 18.2.0
- **React Router** 6.20.0 - Client-side routing
- **Framer Motion** 10.16.4 - Smooth animations
- **Lucide React Icons** 0.263.1 - Beautiful icons
- **Axios** 1.6.0 - HTTP client
- **Plain CSS** - No Tailwind/Bootstrap
- **Vite** 5.0.0 - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** 4.18.2 - Web framework
- **PostgreSQL** 8.11.3 - Database
- **pg** - PostgreSQL client
- **CORS** 2.8.5 - Cross-origin support
- **Multer** 1.4.5 - File upload handling
- **Dotenv** 16.3.1 - Environment variables

## 📁 Project Structure

```
Gen AI/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategoryCard.css
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectCard.css
│   │   │   ├── Toast.jsx
│   │   │   ├── Toast.css
│   │   │   ├── Loading.jsx
│   │   │   └── Loading.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── CategoryDetail.jsx
│   │   │   ├── CategoryDetail.css
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── ProjectDetail.css
│   │   │   ├── AdminCreate.jsx
│   │   │   └── AdminCreate.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── hooks/
│   │   │   └── useApp.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── routes/
    │   │   └── index.js
    │   ├── controllers/
    │   │   └── index.js
    │   ├── models/
    │   │   └── index.js
    │   ├── middleware/
    │   │   └── index.js
    │   ├── config/
    │   │   └── database.js
    │   └── server.js
    ├── uploads/
    ├── .env
    ├── .env.example
    ├── package.json
    ├── database.sql
    └── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 16.x or higher
- PostgreSQL 12.x or higher
- npm or yarn

### Frontend Installation

```bash
cd frontend
npm install
```

### Backend Installation

```bash
cd backend
npm install
```

## ⚙️ Setup & Configuration

### 1. Database Setup

Create a PostgreSQL database:

```bash
createdb ai_agent_platform
```

Run the database schema:

```bash
psql -U postgres -d ai_agent_platform -f database.sql
```

Or use the SQL script in your PostgreSQL client.

### 2. Backend Configuration

Create `.env` file in backend folder:

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

### 3. Frontend Configuration

Create `.env` file in frontend folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Categories API

#### Get all categories
```http
GET /api/categories
```

Response:
```json
[
  {
    "id": 1,
    "name": "Auto Garage",
    "description": "Automated service management",
    "icon": "Wrench"
  }
]
```

#### Get category by ID
```http
GET /api/categories/:id
```

#### Create category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Category Name",
  "description": "Description",
  "icon": "IconName"
}
```

#### Update category
```http
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated Description",
  "icon": "IconName"
}
```

#### Delete category
```http
DELETE /api/categories/:id
```

### Projects API

#### Get all projects
```http
GET /api/projects
```

#### Get projects by category
```http
GET /api/categories/:categoryId/projects
```

#### Get project by ID
```http
GET /api/projects/:id
```

#### Create project
```http
POST /api/projects
Content-Type: application/json

{
  "categoryId": 1,
  "title": "Project Title",
  "shortDescription": "Short description",
  "problemStatement": "Problem detail",
  "currentChallenges": "Challenges",
  "aiSolution": "Solution",
  "workflowImage": "image_url",
  "githubLink": "https://github.com/...",
  "technologies": ["React", "Node.js"],
  "benefits": "Benefits",
  "futureImprovements": "Future plans"
}
```

#### Update project
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "categoryId": 1,
  "title": "Updated Title",
  ...
}
```

#### Delete project
```http
DELETE /api/projects/:id
```

## 🗄 Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  title VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  current_challenges TEXT NOT NULL,
  ai_solution TEXT NOT NULL,
  workflow_image VARCHAR(255),
  github_link VARCHAR(255),
  technologies TEXT[] NOT NULL,
  benefits TEXT NOT NULL,
  future_improvements TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL
4. Deploy

### Backend Deployment (Render or Railway)

1. Create account on Render.com or Railway.app
2. Connect GitHub repository
3. Set environment variables
4. Configure PostgreSQL database
5. Deploy

### Database Deployment (Neon or Supabase)

1. Create account on Neon.tech or Supabase.com
2. Create PostgreSQL database
3. Run `database.sql` schema
4. Update `DB_HOST` and credentials in backend `.env`

## 📝 Features Detailed

### Homepage
- Hero section with call-to-action buttons
- Category showcase with animated cards
- Responsive grid layout
- Smooth scrolling navigation

### Category Detail Page
- Displays all projects in a category
- Project cards with information preview
- GitHub repository links
- Technology badges

### Project Detail Page
- Comprehensive project documentation
- Problem statement and current challenges
- AI solution explanation
- Workflow visualization with step-by-step process
- Technology stack display
- Benefits and future improvements
- Direct GitHub repository link

### Admin Panel
- Form to create new projects
- Category selection dropdown
- Image upload with preview
- Technology input with comma separation
- Form validation
- Success notifications

## 🎨 Design Highlights

- **Modern SaaS Design**: Clean, minimal interface inspired by Notion, Linear, and Vercel
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Responsive Layout**: Mobile-first responsive design
- **Soft Shadows**: Subtle shadows for depth
- **Professional Typography**: Carefully selected font hierarchy
- **Light Mode**: Clean white background with dark text
- **Accessibility**: WCAG compliant

## 📦 Build & Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend Production
```bash
cd backend
npm start
```

Set `NODE_ENV=production` in `.env`

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

MIT License - feel free to use this project as a starting point.

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and PostgreSQL**
