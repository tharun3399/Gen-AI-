# Backend Setup & API Guide

## 🚀 Backend Architecture

### MVC Pattern
- **Models** (`src/models/`) - Database queries
- **Controllers** (`src/controllers/`) - Business logic
- **Routes** (`src/routes/`) - API endpoints
- **Middleware** (`src/middleware/`) - CORS, error handling

### Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: pg (Node PostgreSQL client)

## 📦 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

### Environment Variables (.env)
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

### Database Setup

**Option 1: PostgreSQL CLI**
```bash
createdb ai_agent_platform
psql -U postgres -d ai_agent_platform -f database.sql
```

**Option 2: psql Interactive**
```bash
psql -U postgres

CREATE DATABASE ai_agent_platform;
\c ai_agent_platform
\i database.sql
```

**Option 3: Using pgAdmin**
- Create database via UI
- Connect and run SQL script

## 🏃 Running Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

## 📚 API Reference

### Response Format

**Success (200):**
```json
{
  "id": 1,
  "name": "Category Name",
  "description": "Description",
  "icon": "IconName",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Error (4xx, 5xx):**
```json
{
  "error": "Error message"
}
```

---

## 📋 Categories API

### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Auto Garage",
    "description": "Automated service management and customer handling",
    "icon": "Wrench"
  },
  {
    "id": 2,
    "name": "Dental Clinic",
    "description": "Patient booking and appointment automation",
    "icon": "Tooth"
  }
]
```

### Get Single Category
```http
GET /api/categories/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Auto Garage",
  "description": "Automated service management and customer handling",
  "icon": "Wrench"
}
```

### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "New Category",
  "description": "Category description",
  "icon": "IconName"
}
```

**Request Body:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | ✓ | Unique category name |
| description | string | ✓ | Detailed description |
| icon | string | ✓ | Icon identifier |

**Response (201):**
```json
{
  "id": 11,
  "name": "New Category",
  "description": "Category description",
  "icon": "IconName",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

### Update Category
```http
PUT /api/categories/1
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "icon": "NewIcon"
}
```

### Delete Category
```http
DELETE /api/categories/1
```

**Response:**
```json
{
  "message": "Category deleted successfully"
}
```

---

## 🗂️ Projects API

### Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
| Parameter | Type | Optional | Notes |
|-----------|------|----------|-------|
| limit | number | ✓ | Limit results |
| offset | number | ✓ | Pagination offset |

**Response:**
```json
[
  {
    "id": 1,
    "category_id": 1,
    "title": "AI-Powered Auto Service Booking",
    "short_description": "Automated service booking system",
    "problem_statement": "Auto garages struggle with manual booking...",
    "current_challenges": "Manual scheduling is time-consuming...",
    "ai_solution": "AI-powered chatbot handles bookings...",
    "workflow_image": "image_url",
    "github_link": "https://github.com/...",
    "technologies": ["Python", "OpenAI", "Node.js"],
    "benefits": "Reduces booking time by 80%",
    "future_improvements": "Add SMS notifications",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Get Projects by Category
```http
GET /api/categories/1/projects
```

**Response:**
```json
[
  {
    "id": 1,
    "category_id": 1,
    "title": "Project Title",
    ...
  }
]
```

### Get Single Project
```http
GET /api/projects/1
```

### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "categoryId": 1,
  "title": "AI Project Title",
  "shortDescription": "Brief description",
  "problemStatement": "Detailed problem",
  "currentChallenges": "Existing issues",
  "aiSolution": "How AI solves it",
  "workflowImage": "image_url_or_base64",
  "githubLink": "https://github.com/...",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "benefits": "Time saved, efficiency improvements",
  "futureImprovements": "Planned features"
}
```

**Request Body:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| categoryId | number | ✓ | Valid category ID |
| title | string | ✓ | Project title |
| shortDescription | string | ✓ | Brief description |
| problemStatement | string | ✓ | Problem details |
| currentChallenges | string | ✗ | Current issues |
| aiSolution | string | ✗ | Solution details |
| workflowImage | string | ✗ | Image URL or base64 |
| githubLink | string | ✗ | GitHub repository URL |
| technologies | array | ✗ | Tech stack array |
| benefits | string | ✗ | Benefits description |
| futureImprovements | string | ✗ | Future plans |

**Response (201):**
```json
{
  "id": 1,
  "category_id": 1,
  "title": "AI Project Title",
  ...,
  "created_at": "2024-01-01T12:00:00Z"
}
```

### Update Project
```http
PUT /api/projects/1
Content-Type: application/json

{
  "categoryId": 1,
  "title": "Updated Title",
  ...
}
```

### Delete Project
```http
DELETE /api/projects/1
```

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

---

## 🔧 Database Schema

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

**Indexes:**
- Primary: `id`
- Unique: `name`

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
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

**Indexes:**
- Primary: `id`
- Foreign: `category_id`
- Created: `created_at` (recommended for sorting)

---

## 🛡️ Middleware

### CORS Middleware
Handles cross-origin requests from frontend.

**Configuration:**
```javascript
origin: process.env.CORS_ORIGIN
credentials: true
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
allowedHeaders: ['Content-Type', 'Authorization']
```

### JSON Parser
Automatically parses JSON request bodies.

**Limit:** 10MB

### Error Handler
Catches and formats errors.

**Response:**
```json
{
  "error": "Error message"
}
```

### 404 Handler
Handles undefined routes.

**Response (404):**
```json
{
  "error": "Route not found"
}
```

---

## 📊 cURL Examples

### Get Categories
```bash
curl http://localhost:5000/api/categories
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": 1,
    "title": "My Project",
    "shortDescription": "Description",
    "problemStatement": "Problem",
    "technologies": ["React", "Node.js"]
  }'
```

### Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

---

## 🗂️ File Structure Explained

```
backend/
├── src/
│   ├── server.js              # Express app setup & start
│   ├── config/
│   │   └── database.js        # PostgreSQL connection pool
│   ├── models/
│   │   └── index.js           # Database queries (Category, Project)
│   ├── controllers/
│   │   └── index.js           # API endpoint handlers
│   ├── routes/
│   │   └── index.js           # API route definitions
│   └── middleware/
│       └── index.js           # CORS & error handlers
├── uploads/                   # Image storage directory
├── database.sql              # Database schema
├── .env                      # Environment variables
├── .env.example              # Template
└── package.json
```

---

## 🧪 Testing Endpoints

### Using Postman
1. Import API collection
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint

### Using Insomnia
- Similar to Postman
- REST client for testing

### Using Thunder Client (VS Code)
- Extension for VS Code
- Easy endpoint testing

---

## 🔍 Logging & Debugging

### Logs
- Console output shows requests
- Errors logged with stack trace

### Debug Mode
```bash
DEBUG=* npm run dev
```

### Database Debugging
```bash
# Connect to database
psql -U postgres -d ai_agent_platform

# List tables
\dt

# Describe table
\d projects

# Query data
SELECT * FROM projects;
```

---

## 🚀 Performance Tips

1. **Use Indexes**: Already set up on primary keys
2. **Pagination**: Add limit/offset for large datasets
3. **Caching**: Add Redis for category caching
4. **Connection Pool**: Already configured in database.js

---

## 📋 Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong database password
- [ ] Configure HTTPS
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Add authentication
- [ ] Set up monitoring
- [ ] Review security headers
- [ ] Test all endpoints
- [ ] Document API changes

---

## 🔐 Security Best Practices

- ✅ Uses pg parameterized queries (prevents SQL injection)
- ✅ Validates input
- ✅ CORS configured
- ✅ Environment variables for secrets
- 🔄 Add: Authentication & authorization
- 🔄 Add: Rate limiting
- 🔄 Add: Request validation middleware

---

## 📞 Support

For API issues, check:
1. Server is running on port 5000
2. Database connection string
3. Environment variables
4. PostgreSQL is running
5. Tables exist in database

---

**Happy coding! 🚀**
