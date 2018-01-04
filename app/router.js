'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/v1/articles', controller.articles.index);
  router.get('/v1/articles/:id', controller.articles.articleById);
  router.post('/v1/article', controller.articles.postArticle);
  router.post('/v1/article_update', controller.articles.updateArticle);
  router.post('/v1/article_delete', controller.articles.deleteArticle);
  router.post('/v1/images', controller.images.upload);
  router.get('/v1/images', controller.images.index);
};
