"use strict";

const { createCoreRouter } = require('@strapi/strapi').factories;

// Not working
// Issue: https://github.com/strapi/strapi/issues/15050
//module.exports = createCoreRouter('plugin::instagram.instaimage');

module.exports = {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/images',
        handler: 'instaimage.find', 
        config: {
          //auth: false,
        },
      },
    ],
  }
