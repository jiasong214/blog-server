import express from 'express';
import * as postController from '../controller/post.js';

const router = express.Router();

router.get('/', postController.getCategories);
// router.get('/:category', postController.getPostsByCategory);

export default router;