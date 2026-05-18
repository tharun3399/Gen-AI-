# Frontend Setup & Documentation

## 🎨 Architecture

### Technology Stack
- **React.js** 18.2.0 - UI library
- **React Router** 6.20.0 - Client-side routing
- **Framer Motion** 10.16.4 - Smooth animations
- **Lucide React** 0.263.1 - Icon library
- **Axios** 1.6.0 - HTTP client
- **Vite** 5.0.0 - Build tool

### Design System
- **Light Mode Only** - Clean white background
- **No Tailwind/Bootstrap** - Custom CSS only
- **SaaS Design** - Modern, minimal aesthetic
- **Responsive** - Mobile-first approach
- **Smooth Animations** - Framer Motion

## 📦 Installation

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Development Server
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Production Build
```bash
npm run build
```

Output: `dist/` folder ready for deployment

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── CategoryCard.jsx / CategoryCard.css
│   │   ├── ProjectCard.jsx / ProjectCard.css
│   │   ├── Toast.jsx / Toast.css
│   │   └── Loading.jsx / Loading.css
│   ├── pages/              # Full page components
│   │   ├── Home.jsx / Home.css
│   │   ├── CategoryDetail.jsx / CategoryDetail.css
│   │   ├── ProjectDetail.jsx / ProjectDetail.css
│   │   └── AdminCreate.jsx / AdminCreate.css
│   ├── services/           # API & external services
│   │   └── api.js          # Axios client & API calls
│   ├── context/            # Global state management
│   │   └── AppContext.jsx  # Global app context
│   ├── hooks/              # Custom React hooks
│   │   └── useApp.js       # App context hook
│   ├── styles/             # Global styles
│   │   └── globals.css     # Base CSS & utilities
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Vite entry point
├── .env                    # Environment variables
├── .env.example            # Env template
├── package.json
├── vite.config.js          # Vite configuration
└── README.md
```

---

## 🎯 Component Documentation

### Navbar
Sticky navigation bar with logo and menu.

**Props:** None

**Features:**
- Sticky positioning
- Mobile hamburger menu
- Navigation links
- Add Project button

**Usage:**
```jsx
<Navbar />
```

### CategoryCard
Card component for displaying categories.

**Props:**
```javascript
{
  category: {
    id: number,
    name: string,
    description: string,
    icon: string
  },
  projectCount: number
}
```

**Features:**
- Hover animation
- Icon display
- Project count
- View Solutions button

### ProjectCard
Card component for displaying projects.

**Props:**
```javascript
{
  project: {
    id: number,
    title: string,
    short_description: string,
    problem_statement: string,
    technologies: array,
    workflow_image: string,
    github_link: string
  },
  index: number
}
```

**Features:**
- Image preview
- Technology badges
- GitHub link
- Staggered animations

### Toast
Notification component.

**Features:**
- Success/Error/Warning/Info types
- Auto dismiss after 3s
- Smooth animations
- Close button

**Usage:**
```jsx
const { showToast } = useApp();
showToast('Message', 'success');
```

### Loading
Loading spinner component.

**Props:**
```javascript
{
  size: 'small' | 'medium' | 'large',
  fullPage: boolean
}
```

---

## 📄 Pages Documentation

### Home Page (`/`)
**Purpose:** Landing page with categories showcase

**Components:**
- Hero section with CTA buttons
- Category cards grid
- Loading skeletons

**Features:**
- Smooth animations
- Responsive grid
- Scroll to categories
- Project count display

### Category Detail Page (`/category/:categoryId`)
**Purpose:** Display all projects in a category

**Components:**
- Header with category info
- Project cards grid
- Back button
- Empty state

**Features:**
- Dynamic data loading
- Responsive layout
- Loading skeleton
- Project links

### Project Detail Page (`/project/:projectId`)
**Purpose:** Full project documentation

**Sections:**
1. Hero image
2. Project title & subtitle
3. Problem statement
4. Current challenges
5. AI solution
6. Workflow visualization
7. Technologies grid
8. Benefits list
9. Future improvements
10. GitHub link

**Features:**
- Smooth animations
- Sticky back button
- Full documentation
- Technology showcase
- GitHub integration

### Admin Create Page (`/admin`)
**Purpose:** Add new projects

**Form Fields:**
- Category (select)
- Title (text)
- Short description (textarea)
- Problem statement (textarea)
- Current challenges (textarea)
- AI solution (textarea)
- Workflow image (file)
- GitHub link (URL)
- Technologies (comma-separated text)
- Benefits (textarea)
- Future improvements (textarea)

**Features:**
- Form validation
- Image preview
- Loading state
- Success notification
- Error handling

---

## 🌐 API Service

### `services/api.js`

Axios client with pre-configured routes.

**Categories API:**
```javascript
categoriesAPI.getAll()
categoriesAPI.getById(id)
categoriesAPI.create(data)
categoriesAPI.update(id, data)
categoriesAPI.delete(id)
```

**Projects API:**
```javascript
projectsAPI.getAll()
projectsAPI.getById(id)
projectsAPI.getByCategory(categoryId)
projectsAPI.create(data)
projectsAPI.update(id, data)
projectsAPI.delete(id)
```

**Example:**
```jsx
import { categoriesAPI } from '../services/api';

const data = await categoriesAPI.getAll();
console.log(data.data); // Array of categories
```

---

## 🎨 Styling System

### CSS Variables (`globals.css`)

**Colors:**
```css
--color-primary: #1a1a1a          /* Main text */
--color-secondary: #666666        /* Secondary text */
--color-tertiary: #999999         /* Tertiary text */
--color-light: #f5f5f5            /* Light bg */
--color-lighter: #fafafa          /* Lighter bg */
--color-white: #ffffff            /* White */
--color-border: #e0e0e0           /* Borders */
--color-hover: #f0f0f0            /* Hover state */

--color-accent: #0066ff           /* Primary accent */
--color-success: #10b981          /* Success */
--color-error: #ef4444            /* Error */
--color-warning: #f59e0b          /* Warning */
```

**Shadows:**
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

**Transitions:**
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Border Radius:**
```css
--border-radius-sm: 4px
--border-radius-md: 8px
--border-radius-lg: 12px
--border-radius-xl: 16px
--border-radius-full: 9999px
```

### Utility Classes

**Grid:**
```css
.grid-2      /* 2 columns on desktop */
.grid-3      /* 3 columns on desktop */
.grid-4      /* 4 columns on desktop */
```

**Spacing:**
```css
.mt-1, .mt-2, .mt-3, .mt-4    /* Margin top */
.mb-1, .mb-2, .mb-3, .mb-4    /* Margin bottom */
.p-1, .p-2, .p-3, .p-4        /* Padding */
```

**Flexbox:**
```css
.flex, .flex-col, .flex-center
.gap-1, .gap-2, .gap-3, .gap-4
.items-center, .items-start, .items-end
.justify-center, .justify-between, .justify-start
```

**Text:**
```css
.text-center, .text-left, .text-right
.text-sm, .text-base, .text-lg, .text-xl
.font-light, .font-normal, .font-medium, .font-bold
```

---

## 🎬 Animations

### Framer Motion

**Component Animation:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

**Hover Effects:**
```jsx
<motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3 }}
>
  Hover me
</motion.div>
```

### CSS Animations

**Fade In:**
```css
.animate-fadeIn {
  animation: fadeIn 300ms ease-in;
}
```

**Slide Up:**
```css
.animate-slideUp {
  animation: slideUp 300ms ease-in;
}
```

---

## 🎨 Color Schemes

### Light Mode (Default)
- Background: White (#ffffff)
- Text: Dark gray (#1a1a1a)
- Accent: Bright blue (#0066ff)
- Borders: Light gray (#e0e0e0)

### Recommended Customizations

**Change Accent Color:**
```css
/* globals.css */
--color-accent: #00d084;  /* Green */
```

**Darker Mode:**
```css
--color-primary: #ffffff;
--color-secondary: #e0e0e0;
--color-light: #2a2a2a;
```

---

## 📱 Responsive Design

### Breakpoints
```css
Desktop: 1025px and above
Tablet: 769px - 1024px
Mobile: 768px and below
```

### Mobile Adjustments
- Single column layouts
- Smaller fonts
- Full-width components
- Simplified navigation (hamburger menu)
- Touch-friendly buttons

---

## 🔄 State Management

### Global Context (`context/AppContext.jsx`)

```javascript
{
  categories: [],
  setCategories: (data) => void,
  projects: [],
  setProjects: (data) => void,
  loading: boolean,
  setLoading: (bool) => void,
  error: null | string,
  setError: (msg) => void,
  toast: null | { message, type },
  showToast: (message, type) => void
}
```

### Usage

```jsx
import { useApp } from '../hooks/useApp';

function MyComponent() {
  const { categories, showToast } = useApp();
  
  return <div>{categories.length}</div>;
}
```

---

## 📊 Performance Optimizations

1. **Lazy Image Loading**
   ```jsx
   <img loading="lazy" src={url} />
   ```

2. **React.memo** for expensive components
3. **Code Splitting** with React Router
4. **CSS Organization** - One file per component
5. **Vite Optimizations** - Fast HMR

---

## 🧪 Testing

### Setup Testing Library
```bash
npm install --save-dev vitest @testing-library/react
```

### Example Test
```jsx
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders home page', () => {
  render(<Home />);
  expect(screen.getByText(/AI Agent/i)).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Vercel (Recommended)

**1. Connect GitHub**
```bash
git push origin main
```

**2. Deploy on Vercel**
- Import repository
- Set environment variables
- Deploy

**3. Custom Domain**
- Add domain in Vercel settings
- Update DNS records

### Build Locally
```bash
npm run build
npm run preview
```

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🔒 Environment Variables

### Development
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

---

## 🐛 Common Issues

### API Not Connecting
- Check backend is running on port 5000
- Verify `VITE_API_BASE_URL` in `.env`
- Check CORS configuration

### Images Not Loading
- Verify workflow_image URL is valid
- Check image paths in backend

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check CSS specificity

### Animations Laggy
- Reduce animation complexity
- Use `transform` instead of `top/left`
- Profile with DevTools

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Vite Guide](https://vitejs.dev)
- [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS)

---

## 📞 Support

For frontend issues:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Ensure backend is running
4. Check environment variables

---

**Happy coding! 🎨✨**
