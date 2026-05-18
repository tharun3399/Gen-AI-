import pool from '../config/database.js';

export const Category = {
  getAllCategories: async () => {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  },

  getCategoryById: async (id) => {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  },

  createCategory: async (name, description, icon) => {
    const result = await pool.query(
      'INSERT INTO categories (name, description, icon) VALUES ($1, $2, $3) RETURNING *',
      [name, description, icon]
    );
    return result.rows[0];
  },

  updateCategory: async (id, name, description, icon) => {
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2, icon = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, description, icon, id]
    );
    return result.rows[0];
  },

  deleteCategory: async (id) => {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

export const Project = {
  getProjectsByCategory: async (categoryId) => {
    const result = await pool.query(
      'SELECT * FROM projects WHERE category_id = $1 ORDER BY created_at DESC',
      [categoryId]
    );
    return result.rows;
  },

  getProjectById: async (id) => {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  },

  getAllProjects: async () => {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    return result.rows;
  },

  createProject: async (projectData) => {
    const {
      categoryId, title, shortDescription, problemStatement,
      currentChallenges, aiSolution, workflowImage, githubLink,
      technologies, benefits, futureImprovements
    } = projectData;

    const result = await pool.query(
      `INSERT INTO projects 
      (category_id, title, short_description, problem_statement, current_challenges, 
       ai_solution, workflow_image, github_link, technologies, benefits, future_improvements)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [categoryId, title, shortDescription, problemStatement, currentChallenges,
       aiSolution, workflowImage, githubLink, technologies, benefits, futureImprovements]
    );
    return result.rows[0];
  },

  updateProject: async (id, projectData) => {
    const {
      categoryId, title, shortDescription, problemStatement,
      currentChallenges, aiSolution, workflowImage, githubLink,
      technologies, benefits, futureImprovements
    } = projectData;

    const result = await pool.query(
      `UPDATE projects SET 
       category_id = $1, title = $2, short_description = $3, problem_statement = $4,
       current_challenges = $5, ai_solution = $6, workflow_image = $7, github_link = $8,
       technologies = $9, benefits = $10, future_improvements = $11, updated_at = CURRENT_TIMESTAMP
       WHERE id = $12 RETURNING *`,
      [categoryId, title, shortDescription, problemStatement, currentChallenges,
       aiSolution, workflowImage, githubLink, technologies, benefits, futureImprovements, id]
    );
    return result.rows[0];
  },

  deleteProject: async (id) => {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};
