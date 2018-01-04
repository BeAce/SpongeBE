'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ImageSchema = new mongoose.Schema(
    {
      filename: { type: String },
      url: { type: String },
      createTime: { type: Number },
    },
    { collection: 'images' }
  );
  return mongoose.model('Image', ImageSchema);
};
