const { generateToken } = require('../helpers/generateToken');
const { User } = require('../database/models');

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

module.exports = { loginUser, createUser, allUsers };