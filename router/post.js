import express from 'express';
import * as postController from '../controller/post.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:category', postController.getPostsByCategory);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;