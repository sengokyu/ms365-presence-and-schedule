import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const msAuthConfig: OpenIdConfiguration = {
  authority: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
  authWellknownEndpointUrl: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: CLIENT_ID,
  scope: 'openid email profile .default',
  responseType: 'code',
  silentRenew: true,
  // Azure AD provides refresh token to me
  useRefreshToken: true,
  // Don't use nonce at refresh
  ignoreNonceAfterRefresh: true,
  autoUserInfo: false,
  issValidationOff: true,
  // Necessary for validating id token
  maxIdTokenIatOffsetAllowedInSeconds: 600,
  // Azure AD gives 60 minutes to expiring access token
  tokenRefreshInSeconds: 15,
  customParamsAuthRequest: {
    prompt: 'select_account',
  },
};
