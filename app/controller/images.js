'use strict';
const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
class ImagesController extends Controller {
  async index() {
    try {
      const { size, start, order, key } = this.ctx.query;
      const queryParams = {
        size: Number(size),
        start: Number(start),
        order: Number(order) > 0 ? 1 : -1,
        key: key || '',
      };
      const data = await this.ctx.service.images.findAll(queryParams);
      this.ctx.body = {
        data: data.data,
        totalNumber: data.totalNumber,
      };
    } catch (err) {
      this.ctx.body = {
        code: -1,
        error: err,
      };
    }
  }

  /**
   * upload files
   */
  async upload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
        // 需要做出处理，例如给出错误提示消息
        console.log(stream + '\n');
        return;
      }
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        this.ctx.body = {
          code: 0,
          error: err,
        };
      }
      files.push({
        filename,
        url: `http://127.0.0.1:7001/static/${filename}`,
        createTime: Date.now(),
      });
      try {
        await this.ctx.service.images.addImages(files);
        this.ctx.body = {
          code: 0,
          data: files,
        };
      } catch (err) {
        this.ctx.body = {
          code: 0,
          error: err,
        };
      }

    }
  }
}

module.exports = ImagesController;
