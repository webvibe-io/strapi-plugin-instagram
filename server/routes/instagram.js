'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('plugin::instagram.instagramBasicApi');
module.exports = createCoreRouter('plugin::instagram.insta-config');
