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
    this.validatePage = {
      size: { type: 'number' },
      start: { type: 'number' },
    };
  }

  // Find article list by page
  async index() {
    try {
      const { size, start, order, key } = this.ctx.query;
      const queryParams = {
        size: Number(size),
        start: Number(start),
        order: Number(order) > 0 ? 1 : -1,
        key: key || '',
      };
      this.ctx.validate(this.validatePage, queryParams);
      const data = await this.ctx.service.articles.findAll(queryParams);
      this.ctx.body = {
        data: data.data,
        totalNumber: data.totalNumber,
        code: 0,
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: -1,
        error: error.errors,
      };
    }
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
