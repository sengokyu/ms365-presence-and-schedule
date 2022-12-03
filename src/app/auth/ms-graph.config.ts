import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const msGraphConfig: OpenIdConfiguration = {
  authority: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
  authWellknownEndpointUrl: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: CLIENT_ID,
  scope: 'openid email profile https://graph.microsoft.com/.default',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  autoUserInfo: false,
  issValidationOff: true,
  // Necessary for validating id token
  maxIdTokenIatOffsetAllowedInSeconds: 600,
  customParamsAuthRequest: {
    prompt: 'select_account',
  },
};
