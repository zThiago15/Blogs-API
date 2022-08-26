const postServices = require('../services/post');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const postCreated = await postServices.createPost({ title, content, categoryIds });

  return res.status(201).json(postCreated);
};

const getAllPosts = async (req, res) => {
  const posts = await postServices.getAllPosts();
  return res.status(200).json(posts);
};

module.exports = { createPost, getAllPosts };