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
    console.log(token);

    return token;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { loginUser, createUser };