const { generateToken } = require('../helpers/generateToken');

const loginUser = (req, res) => {
  const { email } = req.body;
  const token = generateToken({ email });

  return res.status(200).json({ token });
};

module.exports = { loginUser };