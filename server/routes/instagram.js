'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
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
};
