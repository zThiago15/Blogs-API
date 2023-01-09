const categoryServices = require('../services/category');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const categoryCreated = await categoryServices.createCategory(name);
  return res.status(201).json(categoryCreated);
};

const getCategories = async (req, res) => {
  const categories = await categoryServices.getCategories();
  return res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };