'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('instagram')
      .service('instaConfig')
      .getWelcomeMessage();
  },
  async count(ctx) {
    ctx.body = await strapi
    .plugin('instagram')
    .service('instaConfig')
    .count();
  },
  async getSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin('instagram')
        .service('instaConfig')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async setSettings(ctx) {
    const { body } = ctx.request;
    try {
      await strapi
        .plugin('instagram')
        .service('instaConfig')
        .setSettings(body);
      ctx.body = await strapi
        .plugin('instagram')
        .service('instaConfig')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
