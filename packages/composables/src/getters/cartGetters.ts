import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute,
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@vue-storefront/propeller-api';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: CartItem): string {
  return 'TODO SKU';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart: Cart): number {
  return 0;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart: Cart): AgnosticDiscount[] {
  return [];
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
