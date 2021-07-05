import * as postRepository from '../data/post.js';

export async function getPosts(req, res) {
  const data = await postRepository.getAll();

  if (!data) res.status(404).json({ message: "Can't get all posts" });
  res.status(200).json(data);
}

export async function getPostById(req, res) {
  const id = req.params.id;
  const data = await postRepository.getById(id);

  if (!data) res.status(404).json({ message: "Can't get post with Id" });
  res.status(200).json(data);
}

export async function getPostsByCategory(req, res) {
  const { category } = req.params;
  const data = await postRepository.getByCategory(category);

  if (!data) res.status(404).json({ message: "Can't get post with category" });
  res.status(200).json(data);
}

export async function createPost(req, res) {
  const { category, title, text } = req.body;
  const data = await postRepository.create(category, title, text);

  if (!data) res.status(404).json({ message: "Can't create new post" });
  // if() res.sendStatus(403);
  res.status(200).json(data);
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { category, title, text } = req.body;
  const data = await postRepository.getById(id);

  if (!data) res.status(404).json({ message: "Can't find this post" });

  const updatedPost = await postRepository.update(id, category, title, text);

  // if() res.sendStatus(403);
  res.status(200).send(updatedPost);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const data = await postRepository.getById(id);

  //check if post(id) is exist
  if (!data) res.status(404).json({ message: "Can't find this post" });

  await postRepository.remove(id);

  // if() res.sendStatus(403);
  res.sendStatus(204);
}

export async function getCategories(req, res) {
  const data = await postRepository.getCategories();

  if(!data) res.status(404).json({ message: "Can't get category list" });
  res.status(200).json(data);
}

