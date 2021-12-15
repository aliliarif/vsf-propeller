module.exports = {
  integrations: {
    propeller: {
      location: '@vue-storefront/propeller-api/server',
      configuration: {
        api: {
          endpoint: process.env.PROPELLER_ENDPOINT,
          apiKey: process.env.PROPELLER_APIKEY,
        },
        catalogueRoot: 100092,
      },
    },
  },
};
