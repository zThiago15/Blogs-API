const { Category, BlogPost } = require('../database/models');

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

module.exports = { validatePostFields, validatePostExists };