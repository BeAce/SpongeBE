'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ArticleSchema = new mongoose.Schema(
    {
      abstract: { type: String },
      title: { type: String },
      content: { type: String },
      date: { type: Date },
      author: { type: String },
    },
    { collection: 'articles' }
  );
  return mongoose.model('Article', ArticleSchema);
};
