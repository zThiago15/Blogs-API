const express = require('express');
const { createCategory, getCategories } = require('./controllers/category');
const { loginUser, createUser, allUsers, userById } = require('./controllers/user');
const { validateNameField } = require('./middlewares/validateCategory');
const { validateToken } = require('./middlewares/validateToken');
const { validateFieldsLogin, 
  validateFieldsUser, userExists, validateUserById } = require('./middlewares/validateUser');

const app = express();

app.use(express.json());

app.post('/login', validateFieldsLogin, loginUser);
app.post('/user', validateFieldsUser, userExists, createUser);
app.get('/user', validateToken, allUsers);
app.get('/user/:id', validateToken, validateUserById, userById);

app.post('/categories', validateToken, validateNameField, createCategory);
app.get('/categories', validateToken, getCategories);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
