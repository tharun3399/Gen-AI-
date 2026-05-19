import { Category, Project } from '../models/index.js';

const normalizeProjectPayload = (body = {}) => {
  const technologies = Array.isArray(body.technologies)
    ? body.technologies
    : typeof body.technologies === 'string'
      ? body.technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
      : [];

  return {
    categoryId: Number.parseInt(body.categoryId, 10),
    title: (body.title || '').trim(),
    shortDescription: (body.shortDescription || '').trim(),
    problemStatement: (body.problemStatement || '').trim(),
    currentChallenges: (body.currentChallenges || '').trim(),
    aiSolution: (body.aiSolution || '').trim(),
    workflowImage: (body.workflowImage || '').trim(),
    githubLink: (body.githubLink || '').trim(),
    technologies,
    benefits: (body.benefits || '').trim(),
    futureImprovements: (body.futureImprovements || '').trim()
  };
};

// Category Controllers
export const getCategoryController = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.getCategoryById(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name || !description || !icon) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const category = await Category.createCategory(name, description, icon);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    const category = await Category.updateCategory(id, name, description, icon);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.deleteCategory(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Project Controllers
export const getProjectsByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const projects = await Project.getProjectsByCategory(categoryId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.getProjectById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const projects = await Project.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProjectController = async (req, res) => {
  try {
    const projectInput = normalizeProjectPayload(req.body);

    if (!projectInput.categoryId || !projectInput.title || !projectInput.problemStatement) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['categoryId', 'title', 'problemStatement']
      });
    }

    const project = await Project.createProject({
      ...projectInput,
      shortDescription: projectInput.shortDescription || '',
      currentChallenges: projectInput.currentChallenges || '',
      aiSolution: projectInput.aiSolution || '',
      workflowImage: projectInput.workflowImage || '',
      githubLink: projectInput.githubLink || '',
      technologies: projectInput.technologies,
      benefits: projectInput.benefits || '',
      futureImprovements: projectInput.futureImprovements || ''
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const projectInput = normalizeProjectPayload(req.body);

    const project = await Project.updateProject(id, {
      ...projectInput,
      shortDescription: projectInput.shortDescription || '',
      currentChallenges: projectInput.currentChallenges || '',
      aiSolution: projectInput.aiSolution || '',
      workflowImage: projectInput.workflowImage || '',
      githubLink: projectInput.githubLink || '',
      technologies: projectInput.technologies,
      benefits: projectInput.benefits || '',
      futureImprovements: projectInput.futureImprovements || ''
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.deleteProject(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
