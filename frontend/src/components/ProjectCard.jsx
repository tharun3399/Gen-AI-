import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import './ProjectCard.css';

export const ProjectCard = ({ project, index = 0 }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  const technologies = Array.isArray(project.technologies) 
    ? project.technologies 
    : project.technologies.split(',').map(t => t.trim()).slice(0, 3);

  return (
    <motion.div
      className="project-card card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {project.workflow_image && (
        <div className="project-image">
          <img 
            src={project.workflow_image} 
            alt={project.title}
            loading="lazy"
          />
        </div>
      )}

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        
        <p className="project-description">
          {project.short_description}
        </p>

        <div className="problem-statement">
          <strong>Problem:</strong> {project.problem_statement.substring(0, 100)}...
        </div>

        {technologies.length > 0 && (
          <div className="technologies">
            {technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}

        <div className="project-actions">
          {project.github_link && (
            <a 
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleViewDetails}
          >
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
