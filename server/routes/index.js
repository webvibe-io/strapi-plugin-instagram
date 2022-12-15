module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'instaConfig.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/count',
    handler: 'instaConfig.count',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'instaConfig.getSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'instaConfig.setSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/getShortLivedToken',
    handler: 'instagramToken.getShortLivedToken',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/downloadImages',
    handler: 'instagramBasicApi.downloadImages',
    config: {
      policies: [],
      auth: false,
    },
  },
];

