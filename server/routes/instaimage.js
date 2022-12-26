'use strict';

// TODO Not working
// Issue: https://github.com/strapi/strapi/issues/15050
// const { createCoreRouter } = require('@strapi/strapi').factories;
// module.exports = createCoreRouter('plugin::instagram.instaimage');

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/images',
      // If I use Strapi generated controller I can't refresh instagram feed (new images) 
      //handler: 'instaimage.find',
      handler: 'instagramBasicApi.getImages',
      config: {
        auth: false,
      },
    },
  ],
};
