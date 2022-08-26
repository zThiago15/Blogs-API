const { BlogPost, PostCategory } = require('../database/models');

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

module.exports = { createPost };