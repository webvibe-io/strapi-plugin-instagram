'use strict';

module.exports = ({ strapi }) => ({
  async downloadImages(ctx) {
    const { body } = ctx.request;
    try {
      ctx.body = await strapi
        .plugin('instagram')
        .service('instagramBasicApi')
        .downloadImages(body.force);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async getImages(ctx) {
    const { query } = ctx.request;
    try {
      // Token refresh if necessary
      ctx.body = await strapi
        .plugin('instagram')
        .service('instagramToken')
        .checkTokenExpiration();
      // Download new images if necessary
      ctx.body = await strapi
        .plugin('instagram')
        .service('instagramBasicApi')
        .downloadImages(false);
      // Return images from database
      ctx.body = await strapi
        .plugin('instagram')
        .service('instaimage')
        .find(query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
