const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
require('dotenv').config();

const createPost = async (data, token) => {
  const { title, content, categoryIds } = data;

  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  
  // encontrar ID do usuario
  const [{ id }] = await User.findAll({ where: { email } });

  const date = new Date();

  // criar BlogPost
  const blogPostCreated = await BlogPost
    .create({ title, content, userId: id, published: date, updated: date });

  // criar PostCategory: idPost(criado) e categoryIds
  const postCategoriesCreated = categoryIds.map(async (category) => 
    PostCategory.create({ postId: blogPostCreated.id, categoryId: category }));
  
  await Promise.all(postCategoriesCreated);

  return blogPostCreated;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findAll({
    where: { id },
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
};

const updatePost = async ({ title, content, id }) => {
  await BlogPost.update({ title, content }, { where: { id } });

  const postUpdated = await BlogPost.findAll({ where: { id } }, {
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return postUpdated;
};

module.exports = { createPost, getAllPosts, getById, updatePost };