const { BlogPost, PostCategory, Category, User } = require('../database/models');

const createPost = async (data) => {
  const { title, content, categoryIds } = data;
  const userId = 1;

  const date = new Date();

  // criar BlogPost
  const blogPostCreated = await BlogPost
    .create({ title, content, userId, published: date, updated: date });

  // criar PostCategory: idPost(criado) e categoryIds
  const postCategoriesCreated = categoryIds.map(async (category) => 
    PostCategory.create({ postId: blogPostCreated.id, categoryId: category }));
  
  await Promise.all(postCategoriesCreated);

  return blogPostCreated;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return posts;
};

module.exports = { createPost, getAllPosts };