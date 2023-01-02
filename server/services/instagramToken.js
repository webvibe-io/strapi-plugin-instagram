"use strict";

const instagramSettings = require("../utils/settings");
const { getPluginSettings, setPluginSettings } = instagramSettings;
const fetchInstagram = require("../utils/fetchInstagram");

module.exports = ({ strapi }) => ({
  async getShortLivedToken(redirect_uri, code, state) {
    const settings = await getPluginSettings();
    if (settings.state != state) {
      return { error: "Instagram token state error", status: 400 };
    }

    const apiResult = await fetchInstagram.callInstagramApi(
      "/oauth/access_token",
      {
        client_id: settings.instagram_app_id,
        client_secret: settings.instagram_app_secret,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
        code: code,
      }
    );

    //settings.state = undefined;
    settings.lastApiResponse = JSON.stringify(apiResult);
    if (apiResult.access_token !== undefined) {
      settings.shortLivedAccessToken = apiResult.access_token;
      settings.userId = apiResult.user_id;
    }

    await setPluginSettings(settings);
    if (apiResult.status != 200) {
      return apiResult;
    } else {
      return this.getLongLivedToken();
    }
  },

  async getLongLivedToken() {
    const settings = await getPluginSettings();
    if (settings.shortLivedAccessToken === undefined) {
      return {
        error:
          "Instagram long lived token error, there is no short lived token!",
        status: 400,
      };
    }

    const apiResult = await fetchInstagram.callInstagramGraph("/access_token", {
      grant_type: "ig_exchange_token",
      client_secret: settings.instagram_app_secret,
      access_token: settings.shortLivedAccessToken,
    });

    settings.lastApiResponse = JSON.stringify(apiResult);
    if (apiResult.access_token !== undefined) {
      settings.longLivedAccessToken = apiResult.access_token;
      settings.shortLivedAccessToken = undefined;
      settings.expiresIn = apiResult.expires_in;
      settings.refreshTime = new Date();
      settings.expiresAt = new Date(
        new Date().getTime() + apiResult.expires_in * 1000
      );
    }
    await setPluginSettings(settings);
    return apiResult;
  },

  async refreshLongLivedToken() {
    const settings = await getPluginSettings();
    if (settings.longLivedAccessToken === undefined) {
      return {
        error: "Instagram refreshLongLivedToken() error, there is no long lived token!",
        status: 400,
      };
    }

    const apiResult = await fetchInstagram.callInstagramGraph(
      "/refresh_access_token",
      {
        grant_type: "ig_refresh_token",
        access_token: settings.longLivedAccessToken,
      }
    );

    settings.lastApiResponse = JSON.stringify(apiResult);
    if (apiResult.access_token !== undefined) {
      settings.longLivedAccessToken = apiResult.access_token;
      settings.expiresIn = apiResult.expires_in;
      settings.refreshTime = new Date();
      settings.expiresAt = new Date(
        new Date().getTime() + apiResult.expires_in * 1000
      );
    }
    await setPluginSettings(settings);
    return apiResult;
  },

  async checkTokenExpiration() {
    const settings = await getPluginSettings();
    if (settings.longLivedAccessToken === undefined) {
      return {
        error: "Instagram checkTokenExpiration() error, there is no long lived token!",
        status: 400,
      };
    }
    
    const msInDay = 1000 * 60 * 60 * 24;
    const dateNow = new Date();
    const dateExpiration = new Date(settings.expiresAt);
    const dateRefreshed = new Date(settings.refreshTime);
    const diffExpiration = Math.ceil(Math.abs(dateNow - dateExpiration) / msInDay);
    const diffRefreshed = Math.ceil(Math.abs(dateNow - dateRefreshed) / msInDay);
    
    // Refresh if token refreshed more than 10 days or 
    // expiration closer than 10 days.
    // Currently expiration days is 60 at the API so
    // refresh time will be true but I check it anyway (for safety)
    if (diffExpiration >= 10 && diffRefreshed <= 10) {
      return { 'refreshed': false };
    } else {
      return this.refreshLongLivedToken();
    }
  }
});
