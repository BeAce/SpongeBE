'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(props) {
    super(props);
    this.validate = {
      abstract: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
      date: { type: 'datetime' },
      author: { type: 'string' },
    };
  }
  // Find article list
  async index() {
    const ctx = this.ctx;
    const data = await ctx.service.articles.findAll();
    ctx.body = {
      data,
      code: 0,
    };
  }

  // Find article by id
  async articleById() {
    try {
      this.ctx.validate({ id: 'string' }, this.ctx.params);
      const id = this.ctx.params.id;
      const data = await this.ctx.service.articles.findOne(id);
      if (data === null) {
        this.ctx.body = {
          data: 'article is not exit',
          code: 404,
        };
      } else {
        this.ctx.body = {
          data,
          code: 0,
        };
      }
    } catch (error) {
      this.ctx.body = {
        code: -1,
        error: error.errors,
      };
    }
  }


  // Post article
  async postArticle() {
    const body = this.ctx.request.body;
    try {
      this.ctx.validate(this.validate, body);
      const data = await this.ctx.service.articles.post(body);
      this.ctx.body = {
        code: 0,
        data,
      };
    } catch (error) {
      this.ctx.body = {
        code: 0,
        error: error.errors,
      };
    }
  }

  // Update article by id
  async updateArticle() {
    const body = this.ctx.request.body;
    const params = Object.assign({}, body, { _id: body.id });
    delete params.id;
    try {
      this.ctx.validate(this.validate, params);
      const data = await this.ctx.service.articles.update(params);
      this.ctx.body = {
        code: 0,
        data,
      };
    } catch (error) {
      this.ctx.body = {
        code: -1,
        error: error.errors,
      };
    }
  }

  async deleteArticle() {
    const body = this.ctx.request.body;
    try {
      this.ctx.validate({ _id: 'string' }, body);
      const data = await this.ctx.service.articles.delete(body._id);
      if (data === null) {
        this.ctx.body = {
          code: 404,
          error: 'article is not exit',
        };
      } else {
        this.ctx.body = {
          code: 0,
          data,
        };
      }
    } catch (error) {
      this.ctx.body = {
        code: -1,
        error: error.errors,
      };
    }
  }
}

module.exports = HomeController;
