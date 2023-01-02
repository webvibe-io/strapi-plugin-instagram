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
  async getImages(ctx) {
    const { body } = ctx.request;
    try {
      ctx.body = await strapi
        .plugin('instagram')
        .service('instagramToken')
        .checkTokenExpiration();
      ctx.body = await strapi
        .plugin('instagram')
        .service('instaimage')
        .find(body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
