import { PassedInitialConfig } from 'angular-odata';

/**
 * angular-odata config
 */
export const odataConfig: PassedInitialConfig = {
  config: [
    {
      name: 'MicrosoftGraph',
      serviceRootUrl: 'https://graph.microsoft.com/v1.0/',
      options: {
        stringAsEnum: true,
        stripMetadata: 'minimal',
        accept: {
          metadata: 'minimal',
        },
        prefer: {
          return: 'representation',
        },
      },
    },
  ],
};
