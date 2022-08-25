const { User } = require('../database/models');

const userExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findAll({
      where: { email },
    });

    if (user.length !== 0) {
      return res.status(409).json({ message: 'User already registered' });
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

const validateFieldsLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    try {
    const user = await User.findAll({
      where: { email, password },
    });

    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }

  next();
};

const validateFieldsUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const validEmail = regexEmail.test(email);
  if (!validEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = { validateFieldsLogin, validateFieldsUser, userExists };