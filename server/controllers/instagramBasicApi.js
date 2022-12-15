'use strict';

module.exports = ({ strapi }) => ({
  async downloadImages(ctx) {
    const { body } = ctx.request;
    try {
      ctx.body = await strapi
        .plugin('instagram')
        .service('instagramBasicApi')
        .downloadImages();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
