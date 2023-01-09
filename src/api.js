const swaggerUiExpress = require('swagger-ui-express');
const express = require('express');
const swaggerFile = require('./swagger/swagger.json');

const { createCategory, getCategories } = require('./controllers/category');
const { createPost, getAllPosts, getById, updatePost, 
  deletePost, searchPost } = require('./controllers/post');
const { loginUser, createUser, allUsers, userById, removeUser } = require('./controllers/user');
const { validateNameField } = require('./middlewares/validateCategory');
const { validatePostFields, validatePostExists, 
  validateFieldsToUpdate, validatePostOwner } = require('./middlewares/validatePost');
const { validateToken } = require('./middlewares/validateToken');
const { validateFieldsLogin, 
  validateFieldsUser, userExists, validateUserById } = require('./middlewares/validateUser');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

app.post('/login', validateFieldsLogin, loginUser);
app.post('/user', validateFieldsUser, userExists, createUser);
app.get('/user', validateToken, allUsers);
app.get('/user/:id', validateToken, validateUserById, userById);
app.delete('/user/me', validateToken, removeUser);

app.post('/categories', validateToken, validateNameField, createCategory);
app.get('/categories', validateToken, getCategories);

app.post('/post', validateToken, validatePostFields, createPost);
app.get('/post', validateToken, getAllPosts);
app.get('/post/search', validateToken, searchPost);
app.get('/post/:id', validateToken, validatePostExists, getById);
app.put('/post/:id', validateToken, validateFieldsToUpdate, 
 validatePostOwner, updatePost);
app.delete('/post/:id', validateToken, validatePostExists, validatePostOwner, deletePost);

module.exports = app;
