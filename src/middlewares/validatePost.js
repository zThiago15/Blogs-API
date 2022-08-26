const jwt = require('jsonwebtoken');
const { Category, BlogPost, User } = require('../database/models');
require('dotenv').config();

const validatePostFields = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const findCategories = categoryIds.map(async (category) => Category.findByPk(category));
  const categoriesFound = await Promise.all(findCategories);

  if (!categoryIds || categoriesFound.includes(null)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const validatePostExists = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

const validateFieldsToUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validatePostOwner = async (req, res, next) => {
  const { id } = req.params;
  
  const { authorization } = req.headers;
  const { email } = jwt.verify(authorization, process.env.JWT_SECRET);

  const [{ userId }] = await BlogPost.findAll({ where: { id }, attributes: ['userId'] });

  // verifica se usuário do post possui o mesmo e-mail do token
  const userOwner = await User.findAll({ where: { id: userId, email } });
  if (userOwner.length === 0) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = { 
  validatePostFields, 
  validatePostExists, 
  validateFieldsToUpdate, 
  validatePostOwner };