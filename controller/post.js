import * as postRepository from '../data/post.js';

export async function getPosts(req, res) {
  const data = await postRepository.getAll();

  if (!data) res.status(404).json({ message: "Can't get all posts" });
  res.status(200).json(data);
}

export async function getPostsByCategory(req, res) {
  const category = req.params.category;
  const data = await postRepository.getByCategory(category);

  if (!data) res.status(404).json({ message: "Can't get posts by category" });
  res.status(200).json(data);
}

export async function createPost(req, res) {
  const { category, title, text } = req.body;
  const post = await postRepository.create(category, title, text);

  if (!post) res.status(404).json({ message: "Can't create new post" });
  // if() res.sendStatus(403);
  res.status(200).json(post);

}

export async function updatePost(req, res) {
  const { id } = req.params.id;
  const { category, text } = req.body;
  const post = await postRepository.update(id, category, text);

  if (!post) res.status(404).json({ message: "Can't update this post" });
  // if() res.sendStatus(403);
  res.status(200).json(post);
}

export async function deletePost(req, res) {
  const { id } = req.params.id;
  const data = await postRepository.remove(id);

  if (!data) res.status(404).json({ message: "Can't delete this post" });
  // if() res.sendStatus(403);
  res.sendStatus(204);
}

