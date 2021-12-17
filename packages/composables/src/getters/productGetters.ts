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
  return 'slug-' + product.classId;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  return {
    regular: product.price.value,
    // special: product.price.value,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  const images = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const galleryItem of product.images) {
    images.push({
      small: galleryItem.url,
      normal: galleryItem.url,
      big: galleryItem.url,
    });
  }

  return images;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product.images[0]?.url || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: rethink this
// this returns productDetails and should also return product bundles/upsells etc.
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  return products;
}

// TODO: add type : Product[] | Product,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(
  products,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> {
  if (!products || !products?.attributes) {
    return {};
  }

  const attributes = {};

  for (const attribute of products.attributes) {
    attributes[attribute.searchId] = {
      name: attribute.searchId,
      label: attribute.description[0]?.value || '',
      // value: attribute.textValue.map((value) => {
      //   const obj = {};
      //   obj[value] = value;
      //   return obj;
      // }),
      value: attribute.textValue[0]?.values.toString() || '', // TODO: support for different types of attributes
    } as AgnosticAttribute;
  }

  return attributes;
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
