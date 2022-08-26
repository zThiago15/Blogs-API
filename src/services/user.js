const { generateToken } = require('../helpers/generateToken');
const { User } = require('../database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = (email) => {
  const token = generateToken({ email });

  return token;
};

const createUser = async (data) => {
  const { displayName, email, password, image } = data;

  try {
    await User.create({ displayName, email, password, image });
    const token = generateToken({ email });

    return token;
  } catch (err) {
    console.error(err);
  }
};

const allUsers = async () => {
  const users = await User.findAll();
  const usersUpdated = users
    .map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
  
  return usersUpdated;
};

const userById = async (userId) => {
  const { id, displayName, email, image } = await User.findByPk(userId);

  return { id, displayName, email, image };
};

const removeUser = async (token) => {
  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const [{ id }] = await User.findAll({ where: { email } });
  
  await User.destroy({ where: { id } });
  return true;
};

module.exports = { loginUser, createUser, allUsers, userById, removeUser };