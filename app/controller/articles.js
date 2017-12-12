'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // Find article list
  async index() {
    const ctx = this.ctx;
    const data = await ctx.model.Articles.find({});
    ctx.body = {
      data,
      code: 0,
    };
  }

  // Find article by id
  async articleById() {
    const id = this.ctx.params.id;
    const data = await this.ctx.model.Articles.findById({ _id: id });
    this.ctx.body = {
      data,
      code: 0,
    };
  }

  // Post article
  async postArticle() {
    const body = this.ctx.request.body;
    console.log(body);
    // const data = await this.ctx.model.Articles.findById({ _id: id });
    this.ctx.body = {
      code: 0,
    };
  }
}

module.exports = HomeController;
