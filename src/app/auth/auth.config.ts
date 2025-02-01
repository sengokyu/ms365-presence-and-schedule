import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    authWellknownEndpointUrl: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    redirectUrl: window.location.origin + '/callback',
    clientId: CLIENT_ID,
    // 'openid profile offline_access ' + your scopes
    scope: 'openid profile offline_access .default',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    maxIdTokenIatOffsetAllowedInSeconds: 600,
    issValidationOff: false,
    autoUserInfo: false,
    customParamsAuthRequest: {
      prompt: 'select_account', // login, consent
    },
    secureRoutes: ['https://graph.microsoft.com/'],
    logLevel: LogLevel.Debug,
  },
};
