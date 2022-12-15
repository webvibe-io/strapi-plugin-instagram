"use strict";

const getPluginStore = () => {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "instagram",
  });
};

module.exports = {
  async getPluginSettings() {
    let value = await getPluginStore().get({ key: 'settings' });
    return value;
  },

  async setPluginSettings(value) {
    return await getPluginStore().set({ key: 'settings', value });
  },
};
