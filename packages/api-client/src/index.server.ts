import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import type { Endpoints } from './types';
import type { Settings } from './types/settings';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

function onCreate(settings: Settings) {
  const link = new HttpLink({
    uri: settings.api.endpoint,
    fetch,
    headers: {
      apiKey: settings.api.apiKey,
    },
  });
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
    ssrMode: true,
  });

  return {
    config: settings,
    client,
    cookies: settings.cookies,
  };
}

const { createApiClient } = apiClientFactory<Settings, Endpoints>({
  onCreate,
  api,
});

export { createApiClient };
