'use strict';

const Service = require('egg').Service;

class Images extends Service {
  async findAll(obj) {
    const { size, start, order, key } = obj;
    // date -1 new -> old 1 old -> new
    const totalNumber = await this.ctx.model.Images.find({}).count();
    const images = await this.ctx.model.Images.find({})
      .where('filename', { $regex: key, $options: '$i' })
      .sort({ createTime: order })
      .skip((start - 1) * size)
      .limit(size);
    return { data: images, totalNumber };
  }

  async addImages(arr) {
    const images = await new this.ctx.model.Images(arr);
    return images.save((err, data) => data);
  }

}

module.exports = Images;
