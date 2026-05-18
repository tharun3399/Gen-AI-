import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projectsAPI } from '../services/api';
import { useApp } from '../hooks/useApp';
import ProjectCard from '../components/ProjectCard';
import { Loading, CardSkeleton } from '../components/Loading';
import './CategoryDetail.css';

export const CategoryDetail = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading, loading } = useApp();
  
  const [category, setCategory] = useState(location.state?.category || null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await projectsAPI.getByCategory(categoryId);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryId, setLoading]);

  return (
    <div className="category-detail">
      <div className="category-detail-container">
        {/* Header */}
        <div className="category-detail-header">
          <button 
            className="btn btn-ghost"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="page-title">{category.name}</h1>
              <p className="page-subtitle">{category.description}</p>
            </motion.div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="projects-section">
          <div className="section-header">
            <h2>Case Studies</h2>
            <p>Real-world AI automation solutions for {category?.name}</p>
          </div>

          {loading ? (
            <div className="grid grid-2">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-2">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>No projects yet</h3>
              <p>This category doesn't have any projects yet.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
