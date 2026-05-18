import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import ProjectDetail from './pages/ProjectDetail';
import AdminCreate from './pages/AdminCreate';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminCreate />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
