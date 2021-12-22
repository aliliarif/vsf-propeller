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
        productAttributes: [
          'EXAMEN_BREEDTE_MM',
          'EXAMEN_COMMERCIELE_BINDWIJZE',
          'EXAMEN_DATUM_EERSTE_DRUK',
          'EXAMEN_DIKTE_MM',
          'EXAMEN_DRUK',
          'EXAMEN_EDITIE',
          'EXAMEN_GEWICHT_GRAM',
          'EXAMEN_LEERGEBIED',
          'EXAMEN_LENGTE_MM',
          'EXAMEN_MERK',
          'EXAMEN_ONDERWIJSTYPE',
          'EXAMEN_PAGINAS',
          'EXAMEN_SCHOOLVAK',
          'EXAMEN_TAAL',
          'EXAMEN_TECHNISCHE_BINDWIJZE',
          'EXAMEN_UITGEVERIJ',
        ],
      },
    },
  },
};
