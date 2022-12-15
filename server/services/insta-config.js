'use strict';

const instagramSettings = require("../utils/settings");
const {setPluginSettings, getPluginSettings } = instagramSettings;

module.exports = ({ strapi }) => ({  
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  async count() {
    return await strapi.query('plugin::instagram.instaconfig').findOne();
  },
  async getSettings() {
    return getPluginSettings();
  },

  async setSettings(settings) {
    return setPluginSettings(settings);
  },
});
