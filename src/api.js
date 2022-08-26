const express = require('express');
const { createCategory, getCategories } = require('./controllers/category');
const { createPost, getAllPosts, getById, updatePost, deletePost } = require('./controllers/post');
const { loginUser, createUser, allUsers, userById } = require('./controllers/user');
const { validateNameField } = require('./middlewares/validateCategory');
const { validatePostFields, validatePostExists, 
  validateFieldsToUpdate, validatePostOwner } = require('./middlewares/validatePost');
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

app.post('/post', validateToken, validatePostFields, createPost);
app.get('/post', validateToken, getAllPosts);
app.get('/post/:id', validateToken, validatePostExists, getById);
app.put('/post/:id', validateToken, validateFieldsToUpdate, 
 validatePostOwner, updatePost);
app.delete('/post/:id', validateToken, validatePostExists, validatePostOwner, deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
