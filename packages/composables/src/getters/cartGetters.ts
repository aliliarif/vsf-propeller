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
    regular: item.priceNet,
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
    total: cart.total.totalNet,
    subtotal: cart.total.subTotalNet,
    special: cart.total.subTotalNet,
  };
}

// TODO: implement Cart type and TaxLevels
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAppliedTaxLevels(cart) {
  return cart?.taxLevels;
}

// TODO: implement cart:Cart type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart): number {
  return cart?.postageData?.postageNet || 0;
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

// TODO: implement cart : Cart
function getAppliedCoupon(cart): AgnosticCoupon | null {
  return cart?.actionCode
    ? {
        id: cart.actionCode,
        name: cart.actionCode,
        value: 0,
        code: cart.actionCode,
      }
    : null;
}

// TODO: add : Cart type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart): AgnosticDiscount[] {
  return [
    {
      id: 'discount',
      name: 'discount',
      description: 'discount',
      value: cart.total.discountNet,
    },
  ];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals,
  getAppliedTaxLevels,
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
  getAppliedCoupon,
  getDiscounts,
};
