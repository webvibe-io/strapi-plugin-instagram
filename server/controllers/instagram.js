'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::instagram.insta-config');
module.exports = createCoreController('plugin::instagram.instagramToken');
module.exports = createCoreController('plugin::instagram.instagramBasicApi');
