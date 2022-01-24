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
  return product.images?.[0].url || '';
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

  // const reduceByAttributeName = (prev, curr) => ({
  //   ...prev,
  //   [curr.name]: isSingleProduct
  //     ? curr.value
  //     : [
  //         ...(prev[curr.name] || []),
  //         {
  //           value: curr.value,
  //           label: curr.label,
  //         },
  //       ],
  // });

  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, []);
  // .reduce(reduceByAttributeName, {});
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
