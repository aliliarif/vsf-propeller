import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
} from '@vue-storefront/core';
import type { Product, ProductFilter } from '@propeller-commerce/propeller-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  return product?.name?.[0].value || '';
}

// TODO add product:Product
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product): string {
  return product?.slug?.[0].value || '';
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
  return product?.images?.[0]?.url || '';
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
  const isSingleProduct = !Array.isArray(products);
  const productList = isSingleProduct ? [products] : products; // TODO: add product type

  if (!products || !products?.attributes || productList.length === 0) {
    return {} as any;
  }

  const formatAttributes = (product: any): AgnosticAttribute[] =>
    formatAttributeList(product.attributes).filter((attribute) =>
      filterByAttributeName
        ? filterByAttributeName.includes(attribute.name)
        : attribute
    );

  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some(
      (el) => el.name === curr.name && el.value === curr.value
    );

    if (!isAttributeExist) {
      return [...prev, curr];
    }

    return prev;
  };

  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, []);
}

const formatAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    return {
      name: attr.name,
      value: attr.textValue?.[0].values.toString() || '',
      label: attr.description?.[0].value || '', // TODO: support for different types of attributes,
    };
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product?.description?.[0].value || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShortDescription(product: Product): string {
  return product?.shortDescription?.[0].value || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return [];
}

// TODO: add type product: Product
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product): string {
  return product.classId;
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

// TODO: add type product: Product
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(product): string {
  return product?.status || '';
}

// TODO: add type product: Product and return type BundleProducts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBundleProducts(product) {
  return product?.bundles || [];
}

// TODO: add type product: Product, types: CrossupsellTypes and return type Crossupsells[]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCrossupsellProducts(product, types) {
  return (
    product?.crossupsells.filter((crossupsell) =>
      types ? types.includes(crossupsell.type) : crossupsell
    ) || []
  );
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
  getShortDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
  getStatus,
  getBundleProducts,
  getCrossupsellProducts,
};
