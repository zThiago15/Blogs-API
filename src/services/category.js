const { Category } = require('../database/models');

const createCategory = async (name) => {
  const categoryCreated = Category.create({ name });

  return categoryCreated;
};

module.exports = { createCategory };