import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { categoriesAPI, projectsAPI } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { Loading, CardSkeleton } from '../components/Loading';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const { setCategories, setProjects, setLoading, loading } = useApp();
  const [categories, setLocalCategories] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesRes = await categoriesAPI.getAll();
        setLocalCategories(categoriesRes.data);
        setCategories(categoriesRes.data);

        const projectsRes = await projectsAPI.getAll();
        setProjects(projectsRes.data);

        // Count projects per category
        const counts = {};
        categoriesRes.data.forEach(cat => {
          counts[cat.id] = projectsRes.data.filter(p => p.category_id === cat.id).length;
        });
        setProjectCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading, setCategories, setProjects]);

  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI Agent Solutions Platform
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real-world business problems solved using AI automation and intelligent agents.
            Discover how automation transforms industry workflows and drives efficiency.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              className="btn btn-primary btn-lg"
              onClick={scrollToCategories}
            >
              Explore Categories
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/admin')}
            >
              Add Project
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-visual-frame">
            <img
              className="hero-visual-image"
              src="/ai-hero.png"
              alt="AI automation illustration"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="categories-section">
        <div className="section-header">
          <h2>Business Categories</h2>
          <p>Explore AI solutions across different industries</p>
        </div>

        {loading ? (
          <div className="grid grid-3">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CategoryCard 
                  category={category}
                  projectCount={projectCounts[category.id] || 0}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
