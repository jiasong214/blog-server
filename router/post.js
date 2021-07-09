import express from 'express';
import * as postController from '../controller/post.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

//public api
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

//admin api
router.post('/', isAuth, postController.createPost);
router.put('/:id', isAuth, postController.updatePost);
router.delete('/:id', isAuth, postController.deletePost);

export default router;