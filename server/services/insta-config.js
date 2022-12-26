'use strict';

const instagramSettings = require("../utils/settings");
const {setPluginSettings, getPluginSettings } = instagramSettings;

module.exports = ({ strapi }) => ({  
  async getSettings() {
    return getPluginSettings();
  },

  async setSettings(settings) {
    return setPluginSettings(settings);
  },
});
