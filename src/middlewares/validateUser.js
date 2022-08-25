const { User } = require('../database/models');

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

module.exports = { validateFieldsLogin };