const express = require('express');
const { loginUser, createUser, allUsers } = require('./controllers/user');
const { validateToken } = require('./middlewares/validateToken');
const { validateFieldsLogin, 
  validateFieldsUser, userExists } = require('./middlewares/validateUser');

const app = express();

app.use(express.json());

app.post('/login', validateFieldsLogin, loginUser);
app.post('/user', validateFieldsUser, userExists, createUser);
app.get('/user', validateToken, allUsers);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
