import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { categoriesAPI, projectsAPI } from '../services/api';
import { useApp } from '../hooks/useApp';
import './AdminCreate.css';

export const AdminCreate = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    shortDescription: '',
    problemStatement: '',
    currentChallenges: '',
    aiSolution: '',
    workflowImage: '',
    githubLink: '',
    technologies: '',
    benefits: '',
    futureImprovements: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (error) {
        showToast('Failed to load categories', 'error');
      }
    };

    fetchCategories();
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          workflowImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      workflowImage: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.categoryId || !formData.title) {
      showToast('Please fill in required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const technologiesArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean);

      const projectPayload = {
        categoryId: parseInt(formData.categoryId),
        title: formData.title,
        shortDescription: formData.shortDescription,
        problemStatement: formData.problemStatement,
        currentChallenges: formData.currentChallenges,
        aiSolution: formData.aiSolution,
        workflowImage: formData.workflowImage,
        githubLink: formData.githubLink,
        technologies: technologiesArray,
        benefits: formData.benefits,
        futureImprovements: formData.futureImprovements
      };

      await projectsAPI.create(projectPayload);
      showToast('Project created successfully!', 'success');
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      showToast('Failed to create project', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-create">
      <div className="admin-container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Add New Project</h1>
          <p>Create a new AI automation case study</p>
        </motion.div>

        <motion.form
          className="admin-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Category & Title Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select 
                className="form-select"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input 
                type="text"
                className="form-input"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea 
              className="form-textarea"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Brief description of the project"
              rows="3"
            ></textarea>
          </div>

          {/* Problem & Challenges Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Problem Statement *</label>
              <textarea 
                className="form-textarea"
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                placeholder="Describe the business problem"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Current Challenges</label>
              <textarea 
                className="form-textarea"
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleInputChange}
                placeholder="Existing workflow issues"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* AI Solution */}
          <div className="form-group">
            <label className="form-label">AI Solution</label>
            <textarea 
              className="form-textarea"
              name="aiSolution"
              value={formData.aiSolution}
              onChange={handleInputChange}
              placeholder="How AI solves the problem"
              rows="4"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">Workflow Image</label>
            <div className="image-upload-area">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button"
                    className="remove-image"
                    onClick={removeImage}
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <Upload size={24} />
                  <span>Click to upload or drag and drop</span>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* GitHub & Technologies Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">GitHub Repository Link</label>
              <input 
                type="url"
                className="form-input"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                placeholder="https://github.com/example"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technologies (comma separated)</label>
              <input 
                type="text"
                className="form-input"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
          </div>

          {/* Benefits & Future */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Benefits</label>
              <textarea 
                className="form-textarea"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="Time saved, efficiency gains, etc."
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Future Improvements</label>
              <textarea 
                className="form-textarea"
                name="futureImprovements"
                value={formData.futureImprovements}
                onChange={handleInputChange}
                placeholder="Planned features and improvements"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AdminCreate;
