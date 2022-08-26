const postServices = require('../services/post');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const postCreated = await postServices.createPost({ title, content, categoryIds }, token);

  return res.status(201).json(postCreated);
};

const getAllPosts = async (req, res) => {
  const posts = await postServices.getAllPosts();
  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await postServices.getById(id);

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const postUpdated = await postServices.updatePost({ title, content, id });
  
  return res.status(200).json(postUpdated);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postServices.deletePost(id);

  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const foundedPosts = await postServices.searchPost(q);

  return res.status(200).json(foundedPosts);
};

module.exports = { createPost, getAllPosts, getById, updatePost, deletePost, searchPost };