import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
} from '@vue-storefront/core';
import type { Product, ProductFilter } from '@vue-storefront/propeller-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  return product.name[0].value || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  console.log('getSlug', product);
  return 'slug-' + product.classId;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  return {
    regular: product.price.value,
    // special: product.price.value,
  };
}

// TODO: change product struct on product() graphql query
// // function getProductPrice(product): AgnosticPrice {
//   return {
//     regular: product.originalPrice,
//     // special: product.price.value,
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  return [
    {
      small: product.images[0].url,
      normal: product.images[0].url,
      big: product.images[0].url,
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product.images[0].url;
  // return 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: rethink this
// this returns productDetails and should also return product bundles/upsells etc.
// function getFiltered(product: Product) {
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  console.log('filtered', products, filters);

  return products;

  // return [
  //   {
  //     _id: 1,
  //     description: 'Some description2',
  //     _categoriesRef: ['1', '2'],
  //     name: 'Black jacket',
  //     sku: 'black-jacket',
  //     images: [
  //       'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
  //     ],
  //     price: {
  //       original: 12.34,
  //       current: 10.0,
  //     },
  //   },
  // ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(
  products: Product[] | Product,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product.description[0].value;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// : Product
function getId(product: Product): string {
  return `${product.classId}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return 0;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  // getProductPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
};
