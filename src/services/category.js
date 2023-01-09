const { Category } = require('../database/models');

const createCategory = async (name) => {
  const categoryCreated = Category.create({ name });

  return categoryCreated;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { createCategory, getCategories };