module.exports = {
  integrations: {
    propeller: {
      location: '@vue-storefront/propeller-api/server',
      configuration: {
        api: {
          endpoint: 'Propeller GraphQL API endpoint',
          apiKey: 'Propeller API Key',
        },
      },
    },
  },
};
