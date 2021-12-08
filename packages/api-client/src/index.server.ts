import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import type { Setttings, Endpoints } from './types';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

// TODO add types here
const getHeaders = () => {
  const headers: any = {};
  // const token = window.localStorage.getItem('propeller-key');
  // if (token) {
  //   headers.authorization = `Bearer ${token}`;
  // }
  headers.tenant = 'cloud2-uj0zb';
  return headers;
};

function onCreate(settings: Setttings) {
  console.log('HELLO VSF AA');

  const link = new HttpLink({
    uri: 'https://dev.api.helice.cloud/graphql',
    fetch,
    headers: getHeaders(),
  });
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
  });

  return {
    config: settings,
    client,
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api,
});

export { createApiClient };
