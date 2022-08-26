const { Category } = require('../database/models');

const createCategory = async (name) => {
  const categoryCreated = Category.create({ name });

  return categoryCreated;
};

const getCategories = async () => {
  const users = await Category.findAll();
  return users;
};

module.exports = { createCategory, getCategories };