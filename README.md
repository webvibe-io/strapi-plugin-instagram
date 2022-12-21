# Strapi instagram plugin
![strapi-plugin-instagram](https://user-images.githubusercontent.com/531009/208746882-a3e581d9-0970-41ec-93de-bf482261b7ae.png)

This is a Plugin for [Strapi headless CMS](https://strapi.io/) to download image links (or images in Pro version) from Instagram. 

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## Features
- Download last 20 image URLs from Instagram
- Can download images from Carousel Albums
- Instagram Basic Authentication Implemented with long lived token
- Every config parameter is editable on Strapi Configuration Screen
- Image links stored in DB and provided throught standard API
- You can disable images by Strapi 'Draft' function

### Pro version
I developed a Pro payed version with the following features. If you interested just drop me an email to `dev at webvibe dot io`.
- Download images into Media Library in a separate 'Instagram' folder.
- Download all images from your profile (not just the last 20)
- Download process runs in background with a pre specified intervall. Don't need to push "Download button"

If you have any other request just let me know!

## Installation
```bash
npm i @webvibe-io/strapi-plugin-instagram
```

## Configuration
__Important! Instagram authentication will not work on `localhost` due API need to redirect into a public domain!__

If you don't have a public domain (in a developer environment for example) you will need to create one. I prefer [ngrok](https://ngrok.com/) for this but you can use any other solution.


### Configuration steps
After you have a public domain please follow this steps:
1. You can find configuration screen in Strapi at `Settings` menu. Open it and leave it. You will need it to fill App Id and Secret.
2. Create an App at [Meta Developer tools platform](https://developers.facebook.com/apps/)
3. In the _"App settings"_ you will find _"Basic Display"_ menu. Open it and look for _"Instagram App ID"_ and _"Instagram App Secret"_.
4. Copy App Id and Secret fields from Meta Platform to Strapi configuration screen.
5. Save the changes on configuration screen.
6. Copy the three callback URL from configration to Basic Authentication screen and save changes
7. If everything configured you can push `Authenticate` button and authenticate the plugin with Instagram.
8. After a seccessfull configuration the plugin have the necessary tokens what you can check on the configuration screen.
9. Now you can use `Download Images` button to download Instagrams
10. Check Strapi's public role configuration for Instagram API access! Allow access to `find` for download instagram images!
11. You can check `Content manager` for downloaded `Instagram Images`

### Configuration screen after seccessfull configuration
![strapi-plugin-instagram-1](https://user-images.githubusercontent.com/531009/207862543-eceb8355-e6be-46b2-bef5-79021eba9233.png)

## API
If your configuration done you can reach Instagram images with standard API request like
```
http://localhost:1337/api/instagram/images
```
This is a standard [Strapi REST API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#endpoints) so you can use any feature like filter.

## Troubleshooting
If you have any error in the authentication process or the plugin don't have short or long lived token you should check `Last Instagram Api response` and developer tool's console for error messages.

#### Most common errors
- With wrong callback URLs Instagram can't forward the token to Strapi. Please check the URLs and check that your public domain is working properly!
- If you don't change enything on the configuration screen you can't push `Save` button. Please cahange App Id or Secret to save changes!
- You can't download images when there is no token. Please check your tokens on the configuration screen!

#### Issues
If you think you found a problem or bug feel free to [open an Issue at Github](https://github.com/webvibe-io/strapi-plugin-instagram/issues)


## Security
- Strapi Instagram Plugin stores authentication tokens in Strapi's database. I think this has low risk.
- With public access to REST API endpoints you may have a risk somebody have access your Instagram pictures and comments. You can avoid this if you use some kind of firewall to protect you URLs and allow only your frontend to reach API.