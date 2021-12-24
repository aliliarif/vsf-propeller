import {
  Context,
  useCartFactory,
  UseCartFactoryParams,
} from '@vue-storefront/core';
import type { Cart, CartItem, Product } from '@vue-storefront/propeller-api';

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Propeller: useCart.load');

    // TODO: temp
    // get this from settings
    const cartCookieName = 'propeller-vsf-cart';

    const existngCartId =
      context.$propeller.config.app.cookies.get(cartCookieName);

    if (!existngCartId) return {};

    return context.$propeller.api.cart(existngCartId);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    // TODO: temp
    // get this from settings
    const cartCookieName = 'propeller-vsf-cart';

    // check if cart is already initiated
    let existngCartId =
      context.$propeller.config.app.cookies.get(cartCookieName);

    if (!existngCartId) {
      // initiate cart
      // existngCartId = await context.$propeller.api.cartStart().then((data) => {
      //   return data.cartStart.cartId;
      // });
      const { data } = await context.$propeller.api.cartStart();
      existngCartId = data.cartStart.cartId;
      context.$propeller.config.app.cookies.set(cartCookieName, existngCartId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
    }

    const cartAddItemInput = {
      cartId: existngCartId,
      productId: product.classId,
      quantity: quantity,
    };

    await context.$propeller.api.cartAddItem(cartAddItemInput);

    // console.log('currentCart');
    // console.log(currentCart);
    // console.log('product');
    // console.log(product);
    // console.log('quantity');
    // console.log(quantity);

    console.log('Mocked: useCart.addItem');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (
    context: Context,
    { currentCart, product, customQuery }
  ) => {
    console.log('Mocked: useCart.removeItem');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    console.log('Mocked: useCart.updateItemQty');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: useCart.clear');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: {},
      updatedCoupon: {},
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: {},
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: useCart.isInCart');
    return false;
  },
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
