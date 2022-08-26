const categoryServices = require('../services/category');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const userCreated = await categoryServices.createCategory(name);
  return res.status(201).json(userCreated);
};

const getCategories = async (req, res) => {
  const users = await categoryServices.getCategories();
  return res.status(200).json(users);
};

module.exports = { createCategory, getCategories };