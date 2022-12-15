module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'instaConfig.index',
    config: {
      policies: [],
    },
  },
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
];

