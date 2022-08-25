const express = require('express');
const { loginUser, createUser } = require('./controllers/user');
const { validateFieldsLogin, 
  validateFieldsUser, userExists } = require('./middlewares/validateUser');

const app = express();

app.use(express.json());

app.post('/login', validateFieldsLogin, loginUser);
app.post('/user', validateFieldsUser, userExists, createUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
