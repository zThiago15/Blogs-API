const { Category } = require('../database/models');

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

module.exports = { validatePostFields };