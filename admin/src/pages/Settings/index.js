// admin/src/pages/Settings/index.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@strapi/design-system/Alert';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Link } from '@strapi/design-system/Link';
import { Stack } from '@strapi/design-system/Stack';
import { TextInput } from '@strapi/design-system/TextInput';
import { ToggleInput } from '@strapi/design-system/ToggleInput';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Typography } from '@strapi/design-system/Typography';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import { Check, Download, Key } from '@strapi/icons';
import Information from '@strapi/icons/Information';
import React, { useEffect, useState } from 'react';
import instagramRequests from '../../api/instagram';
import instagramBasicApiRequest from '../../api/instagramBasicApi';
import pluginId from '../../pluginId';
import generateAuthState from '../../utils/authState';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const toggleNotification = useNotification();
  const [isDevAlertShow, setDevAlertShow] = useState(true);
  const [instagram_app_id, setInstagramAppId] = useState();
  const [instagram_app_secret, setInstagramAppSecret] = useState();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    checkAuthResponse();
    getSettings();
  }, []);

  const getSettings = async () => {
    instagramRequests.getSettings().then((res) => {
      setSettings(res.data);
      setIsLoading(false);
    });
  };
  const checkAuthResponse = async () => {
    if (window.location.pathname.split('/').pop() == 'auth') {
      const urlSearchParameters = new URLSearchParams(window.location.search);
      const authCode = urlSearchParameters.get('code');
      const authState = urlSearchParameters.get('state');
      const error = urlSearchParameters.get('error');
      const errorReason = urlSearchParameters.get('error_reason');
      const errorDescription = urlSearchParameters.get('error_description');

      if (error) {
        toggleNotification({
          type: 'warning',
          message: 'Instagram API error: ' + errorDescription,
        });
      } else {
        setIsAuth(true);
        toggleNotification({
          type: 'info',
          message: 'Auth success, refreshing token in background',
        });
        instagramBasicApiRequest
          .getShortLivedToken({
            redirect_uri: oauth_redirect_url,
            code: authCode,
            state: authState,
          })
          .then((res) => {
            getSettings();
            setIsAuth(false);
            console.log('short lived token answer:');
            console.log(res.data);
          });
      }
    }
  };

  useEffect(() => {
    setInstagramAppId(settings.instagram_app_id);
    setInstagramAppSecret(settings.instagram_app_secret);
  }, [settings]);

  const handleImageDownload = async () => {
    setIsDownloading(true);
    instagramBasicApiRequest
      .downloadImages({
        force: true,
      })
      .then((res) => {
        console.log('download images success:');
        console.log(res.data);
        setIsDownloading(false);
      });
  };

  const canAuthenticate = () => {
    return (
      instagram_app_id != '' &&
      instagram_app_secret != '' &&
      instagram_app_id == settings.instagram_app_id &&
      instagram_app_secret == settings.instagram_app_secret
    );
  };

  const handleAuthenticate = async () => {
    setIsAuth(true);
    openInstagramAuth(
      settings.instagram_app_id,
      oauth_redirect_url,
      settings.state,
    );
    setIsAuth(false);
  };

  const handleDonate = async () => {
    if (typeof window !== 'undefined') window.open('https://www.buymeacoffee.com/ptrkps', '_blank');
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const res = await instagramRequests.setSettings({
      instagram_app_id: instagram_app_id,
      instagram_app_secret: instagram_app_secret,
      state: generateAuthState(),
    });

    setSettings(res.data);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: 'Settings successfully updated',
    });
    console.log(`state: ${settings.state}`);
    console.log(res.data);
  };

  const admin_path = window.location.pathname.split('/')[1];
  const base_redirect_url =
    `${window.location.protocol}` +
    `//${window.location.host}` +
    `/${admin_path}` +
    '/settings' +
    `/${pluginId}`;
  const oauth_redirect_url = `${base_redirect_url}/auth`;
  const deauth_callback_url = `${base_redirect_url}/deauth`;
  const delete_request_url = `${base_redirect_url}/data-delete`;

  const openInstagramAuth = (instagram_app_id, oauth_redirect_url, state) => {
    const instagram_auth_url = 'https://api.instagram.com/oauth/authorize';
    const url =
      `${instagram_auth_url}` +
      `?client_id=${instagram_app_id}` +
      `&redirect_uri=${oauth_redirect_url}` +
      `&scope=user_profile,user_media` +
      `&response_type=code&state=${state}`;
    if (typeof window !== 'undefined') window.open(url, '_self');
  };

  return (
    <>
      <HeaderLayout
        id="title"
        title="Instagram Configuration"
        subtitle="Manage the settings and behaviour of your Instagram plugin"
        primaryAction={
          isLoading ? (
            <></>
          ) : (
            <>
              <Button
                onClick={handleSubmit}
                startIcon={<Check />}
                size="L"
                disabled={isSaving || canAuthenticate()}
                loading={isSaving}
              >
                Save
              </Button>
            </>
          )
        }
        secondaryAction={isLoading ? <></> : <></>}
      ></HeaderLayout>
      {isLoading ? (
        <LoadingIndicatorPage />
      ) : (
        <ContentLayout>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
            marginTop={3}
          >
            <Stack spacing={3}>
              <Typography variant="beta">
                Toss A Coin To Your Witcher
              </Typography>
              <Typography>
                I spent weeks developing and refining this plugin. If you use it
                and like it, invite me for a slice of pizza in exchange for my
                work!
              </Typography>
              <Grid gap={6}>
                <GridItem col={12} s={12}>
                  <Button
                    onClick={handleDonate}
                    startIcon={<FontAwesomeIcon icon="pizza-slice" />}
                    size="L"
                    variant="primary"
                  >
                    Buy me a pizza
                  </Button>
                </GridItem>
              </Grid>
            </Stack>
          </Box>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
            marginTop={3}
          >
            <Stack spacing={3}>
              <Typography>General settings</Typography>
              <Grid gap={6}>
                <GridItem col={12} s={12}>
                  <Button
                    onClick={handleImageDownload}
                    startIcon={<Download />}
                    size="L"
                    disabled={
                      isSaving ||
                      (!settings.longLivedAccessToken &&
                        !settings.shortLivedAccessToken)
                    }
                    loading={isDownloading}
                    variant="default"
                  >
                    Download Images
                  </Button>
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Last image download time"
                    name="last_image_download_time"
                    onChange={() => {}}
                    value={settings.lastDownloadTime}
                    disabled
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Box>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
            marginTop={6}
          >
            <Stack spacing={3}>
              <Typography>
                Instagram API settings for Basic Display API
              </Typography>
              {(window.location.hostname == 'localhost' ||
                window.location.protocol == 'http:') &&
              isDevAlertShow ? (
                <Alert
                  closeLabel="Close alert"
                  title="Development mode"
                  variant="danger"
                  onClose={() => setDevAlertShow(false)}
                >
                  Instagram API callback not working on localhost and http
                  protocol. Use public domain and https to connect your Strapi
                  admin to Instagram API! You can use{' '}
                  <Link href="https://ngrok.com/">ngrok</Link> or similar to
                  generate public domain for your development environment!
                </Alert>
              ) : (
                <Box>
                  <Button
                    onClick={handleAuthenticate}
                    startIcon={<Key />}
                    size="L"
                    disabled={!canAuthenticate()}
                    loading={isAuth}
                    variant="primary"
                  >
                    Authenticate
                  </Button>
                </Box>
              )}
              <Grid gap={6}>
                <GridItem col={12} s={12}>
                  <TextInput
                    placeholder="App ID"
                    label="Instagram App ID"
                    name="instagram_app_id"
                    hint="Instagram App Id from Basic Display tab"
                    error={
                      instagram_app_id == null
                        ? undefined
                        : instagram_app_id.length > 15
                        ? 'Content is too long'
                        : undefined
                    }
                    onChange={(e) => setInstagramAppId(e.target.value)}
                    value={instagram_app_id}
                    labelAction={
                      <Tooltip description="You can find App ID on Meta developer page Basic Display tab">
                        <button
                          aria-label="Information about the App ID"
                          style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent',
                          }}
                        >
                          <Information aria-hidden={true} />
                        </button>
                      </Tooltip>
                    }
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    placeholder="App Secret"
                    label="Instagram App Secret"
                    name="instagram_app_secret"
                    hint="Instagram App Secret from Basic Display tab"
                    error={
                      instagram_app_secret == null
                        ? undefined
                        : instagram_app_secret.length > 32
                        ? 'Content is too long'
                        : undefined
                    }
                    onChange={(e) => setInstagramAppSecret(e.target.value)}
                    value={instagram_app_secret}
                    labelAction={
                      <Tooltip description="You can find App Secret on Meta developer page Basic Display tab right side of App ID">
                        <button
                          aria-label="Information about the App Secret"
                          style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent',
                          }}
                        >
                          <Information aria-hidden={true} />
                        </button>
                      </Tooltip>
                    }
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    placeholder="Valid OAuth Redirect URIs"
                    label="Instagram OAuth Redirect Uri for copy"
                    name="instagram_oauth_redirect_uri"
                    hint="Copy this into 'Valid OAuth Redirect URIs' field"
                    onChange={() => {}}
                    value={oauth_redirect_url}
                    disabled
                    labelAction={
                      <Tooltip description="You must place this URI to 'Valid OAuth Redirect URIs' field on Basic Display tab">
                        <button
                          aria-label="Information about OAuth Redirect URI"
                          style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent',
                          }}
                        >
                          <Information aria-hidden={true} />
                        </button>
                      </Tooltip>
                    }
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    placeholder="Deauthorize callback URL"
                    label="Instagram Deauthorize callback URL for copy"
                    name="instagram_deauthorize_callback_url"
                    hint="Copy this into 'Deauthorize callback URL' field"
                    onChange={() => {}}
                    value={deauth_callback_url}
                    disabled
                    labelAction={
                      <Tooltip description="You must place this URI to 'Deauthorize callback URL' field on Basic Display tab">
                        <button
                          aria-label="Information about Deauthorize callback URL"
                          style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent',
                          }}
                        >
                          <Information aria-hidden={true} />
                        </button>
                      </Tooltip>
                    }
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    placeholder="Data Deletion Request URL"
                    label="Instagram Data Deletion Request URL for copy"
                    name="instagram_data_deletion_request_url"
                    hint="Copy this into 'Data Deletion Request URL' field"
                    onChange={() => {}}
                    value={delete_request_url}
                    disabled
                    labelAction={
                      <Tooltip description="You must place this URI to 'Data Deletion Request URL' field on Basic Display tab">
                        <button
                          aria-label="Information about Data Deletion Request URL"
                          style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent',
                          }}
                        >
                          <Information aria-hidden={true} />
                        </button>
                      </Tooltip>
                    }
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Box>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
            marginTop={6}
          >
            <Stack spacing={3}>
              <Typography>Instagram API token details</Typography>

              <Grid gap={6}>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Instagram User Id"
                    name="instagram_user_id"
                    onChange={() => {}}
                    value={settings.userId}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Short lived token"
                    name="short_lived_token"
                    onChange={() => {}}
                    value={settings.shortLivedAccessToken}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Long lived token"
                    name="long_lived_token"
                    onChange={() => {}}
                    value={settings.longLivedAccessToken}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Long lived token expires in"
                    name="long_lived_token_expires_in"
                    onChange={() => {}}
                    value={settings.expiresIn}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Last Instagram Api response"
                    name="last_instagram_apir_response"
                    onChange={() => {}}
                    value={settings.lastApiResponse}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Token expires at"
                    name="token_expires_at"
                    onChange={() => {}}
                    value={settings.expiresAt}
                    disabled
                  />
                </GridItem>
                <GridItem col={12} s={12}>
                  <TextInput
                    label="Last token refresh time"
                    name="last_token_refresh_time"
                    onChange={() => {}}
                    value={settings.refreshTime}
                    disabled
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Box>
        </ContentLayout>
      )}
    </>
  );
};

export default Settings;
