const userServices = require('../services/user');

const loginUser = (req, res) => {
  const { email } = req.body;

  const token = userServices.loginUser(email);

  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await userServices.createUser({ displayName, email, password, image });
  return res.status(201).json({ token });
};

module.exports = { loginUser, createUser };