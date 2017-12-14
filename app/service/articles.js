'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {
  async findAll() {
    const articles = await this.ctx.model.Articles.find({});
    return articles;
  }

  async findOne(id) {
    const article = await this.ctx.model.Articles.findById({ _id: id });
    return article;
  }

  async post(obj) {
    const article = await new this.ctx.model.Articles(obj);
    return article.save((err, data) => data);
  }

  async update(obj) {
    const id = obj._id;
    // findByIdAndUpdate
    // If you set callback params, the querys doc will not return
    // set [options new: bool] - true to return the modified document rather than the original. defaults to false
    const article = await this.ctx.model.Articles.findByIdAndUpdate(id, obj, { new: true });
    return article;
  }

  async delete(id) {
    const article = await this.ctx.model.Articles.findByIdAndRemove(id);
    return article;
  }
}

module.exports = ArticlesService;
