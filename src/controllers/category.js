const categoryServices = require('../services/category');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const userCreated = await categoryServices.createCategory(name);
  return res.status(201).json(userCreated);
};

module.exports = { createCategory };