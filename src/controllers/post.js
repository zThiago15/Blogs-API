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

  return res.status(200).json(post[0]);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const postUpdated = await postServices.updatePost({ title, content, id });
  
  return res.status(200).json(postUpdated);
};

module.exports = { createPost, getAllPosts, getById, updatePost };