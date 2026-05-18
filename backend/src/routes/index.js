import express from 'express';
import {
  getCategoryController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getProjectsByCategoryController,
  getProjectByIdController,
  getAllProjectsController,
  createProjectController,
  updateProjectController,
  deleteProjectController
} from '../controllers/index.js';

const router = express.Router();

// Category Routes
router.get('/categories', getCategoryController);
router.get('/categories/:id', getCategoryByIdController);
router.post('/categories', createCategoryController);
router.put('/categories/:id', updateCategoryController);
router.delete('/categories/:id', deleteCategoryController);

// Project Routes
router.get('/projects', getAllProjectsController);
router.get('/projects/:id', getProjectByIdController);
router.get('/categories/:categoryId/projects', getProjectsByCategoryController);
router.post('/projects', createProjectController);
router.put('/projects/:id', updateProjectController);
router.delete('/projects/:id', deleteProjectController);

export default router;
