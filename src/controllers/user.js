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

const allUsers = async (req, res) => {
  const users = await userServices.allUsers();
  return res.status(200).json(users);
};

module.exports = { loginUser, createUser, allUsers };