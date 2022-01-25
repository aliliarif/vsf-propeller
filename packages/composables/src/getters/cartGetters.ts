import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute,
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@propeller-commerce/propeller-api';

// TODO: implement type CartItem[] for returnType and : Cart for variable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(cart) {
  return cart?.items || [{}];
}

// TODO: implement CartItem type for item var
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item): string {
  return item.product.name[0].value;
}

// TODO: implement CartItem type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item): string {
  return item.product.images[0]?.url || '';
}

// TODO: implement CartItem type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item): AgnosticPrice {
  return {
    regular: item.product.price.value,
    // special: 10,
  };
}

// TODO: implement CartItem type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item): number {
  return item.quantity;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(
  item: CartItem,
  filterByAttributeName?: Array<string>
): Record<string, AgnosticAttribute | string> {
  return {
    color: 'red',
  };
}

// TODO: implement CartItem
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item): string {
  return item.product.sku;
}

// TODO: implement Cart type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(cart): AgnosticTotals {
  return {
    total: cart.total.totalGross,
    subtotal: cart.total.subTotal,
    special: cart.total.subTotal,
  };
}

// TODO: implement cart:Cart type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart): number {
  return cart?.postageData?.postage || 0;
}

// TODO: add : Cart type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(cart): number {
  return cart?.items?.length || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoupons(cart: Cart): AgnosticCoupon[] {
  return [];
}

// TODO: add : Cart type
// TODO: implement description/name of discount
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart): AgnosticDiscount[] {
  return [
    {
      id: 'discount',
      name: 'discount',
      description: 'discount',
      value: cart.total.discountGross,
    },
  ];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getFormattedPrice,
  getTotalItems,
  getCoupons,
  getDiscounts,
};
