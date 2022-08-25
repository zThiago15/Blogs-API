const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  const jwtConfig = {
    expiresIn: '2h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = { generateToken };