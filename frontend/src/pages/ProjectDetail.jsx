import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Trash2 } from 'lucide-react';
import { projectsAPI } from '../services/api';
import { Loading } from '../components/Loading';
import './ProjectDetail.css';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(location.state?.project || null);
  const [loading, setLoading] = useState(!project);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!project) {
      const fetchProject = async () => {
        try {
          const response = await projectsAPI.getById(projectId);
          setProject(response.data);
        } catch (error) {
          console.error('Error fetching project:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId, project]);

  if (loading) {
    return <Loading fullPage={true} />;
  }

  if (!project) {
    return (
      <div className="error-state">
        <h2>Project not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies.split(',').map(t => t.trim());

  const benefits = Array.isArray(project.benefits)
    ? project.benefits
    : [project.benefits];

  const improvements = Array.isArray(project.future_improvements)
    ? project.future_improvements
    : [project.future_improvements];

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await projectsAPI.delete(project.id);
      navigate(project.category_id ? `/category/${project.category_id}` : '/');
    } catch (error) {
      console.error('Error deleting project:', error);
      window.alert('Failed to delete the project. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="project-detail">
      <div className="project-detail-topbar">
        <button 
          className="btn btn-ghost sticky-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <button
          className="btn btn-danger sticky-delete"
          onClick={handleDelete}
          disabled={deleting}
        >
          <Trash2 size={18} />
          {deleting ? 'Deleting...' : 'Delete Project'}
        </button>
      </div>

      <div className="project-detail-container">
        {/* Hero Section */}
        {project.workflow_image && (
          <motion.div
            className="project-hero"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={project.workflow_image} 
              alt={project.title}
              className="hero-image"
            />
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          className="project-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Title Section */}
          <div className="title-section">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-short-desc">{project.short_description}</p>
            <div className="title-actions">
              {project.github_link && (
                <a 
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={18} />
                  GitHub Repository
                </a>
              )}
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 size={18} />
                {deleting ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>

          {/* Problem Statement */}
          <section className="section">
            <h2 className="section-title">Business Problem Statement</h2>
            <p className="section-text">{project.problem_statement}</p>
          </section>

          {/* Current Challenges */}
          <section className="section">
            <h2 className="section-title">Current Challenges</h2>
            <p className="section-text">{project.current_challenges}</p>
          </section>

          {/* AI Solution */}
          <section className="section">
            <h2 className="section-title">AI Solution</h2>
            <p className="section-text">{project.ai_solution}</p>
          </section>

          {/* Workflow Section */}
          <section className="section workflow-section">
            <h2 className="section-title">Workflow & Architecture</h2>
            {project.workflow_image && (
              <div className="workflow-image">
                <img 
                  src={project.workflow_image} 
                  alt="Workflow" 
                />
              </div>
            )}
            <p className="workflow-description">
              The solution follows a streamlined process:
            </p>
            <div className="workflow-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span>Customer Request</span>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <span className="step-number">2</span>
                <span>AI Processing</span>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <span className="step-number">3</span>
                <span>Automation</span>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <span className="step-number">4</span>
                <span>Database</span>
              </div>
              <div className="arrow">→</div>
              <div className="step">
                <span className="step-number">5</span>
                <span>Business Action</span>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="section">
            <h2 className="section-title">Technologies Used</h2>
            <div className="technologies-grid">
              {technologies.map((tech, idx) => (
                <div key={idx} className="tech-card">
                  <div className="tech-icon">⚙️</div>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="section">
            <h2 className="section-title">Key Benefits</h2>
            <ul className="benefits-list">
              {benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </section>

          {/* Future Improvements */}
          <section className="section">
            <h2 className="section-title">Future Improvements</h2>
            <ul className="improvements-list">
              {improvements.map((improvement, idx) => (
                <li key={idx}>{improvement}</li>
              ))}
            </ul>
          </section>

          {/* Repository Section */}
          {project.github_link && (
            <section className="section github-section">
              <h2 className="section-title">Repository</h2>
              <div className="github-card">
                <Github size={32} />
                <div>
                  <h3>GitHub Repository</h3>
                  <p>Access the complete source code and documentation</p>
                </div>
                <a 
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View on GitHub
                  <ExternalLink size={18} />
                </a>
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
