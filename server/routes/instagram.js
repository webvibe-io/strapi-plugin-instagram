'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

//module.exports = createCoreRouter('plugin::instagram.instagramBasicApi');
//module.exports = createCoreRouter('plugin::instagram.insta-config');
//module.exports = createCoreRouter('api::instagram.instagram');

/*module.exports = {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/images',
        handler: 'instagramBasicApi.getImages',
        config: {
          auth: false,
        },
      },
    ],
  };*/
  module.exports = {
    'type': 'admin',
    'routes': [
    {
      method: 'GET',
      path: '/settings',
      handler: 'instaConfig.getSettings',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/settings',
      handler: 'instaConfig.setSettings',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/getShortLivedToken',
      handler: 'instagramToken.getShortLivedToken',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/downloadImages',
      handler: 'instagramBasicApi.downloadImages',
      config: {
        policies: [],
      },
    },
  ],
}