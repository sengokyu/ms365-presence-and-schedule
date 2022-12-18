import { ApiConfig, ODataInMemoryCache } from 'angular-odata';

export const msGraphApiConfig: ApiConfig[] = [
  {
    name: 'v1.0',
    serviceRootUrl: 'https://graph.microsoft.com/v1.0',
    default: true,
    cache: new ODataInMemoryCache({ timeout: 60 }),
  },
  {
    name: 'beta',
    serviceRootUrl: 'https://graph.microsoft.com/beta',
  },
];
