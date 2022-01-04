import {
  Context,
  useCartFactory,
  UseCartFactoryParams,
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product,
} from '@propeller-commerce/propeller-api';

// !ASAP TODO: CHANGE THIS
type CartItemTemp = any;
type CartTemp = any;

const params: UseCartFactoryParams<CartTemp, CartItemTemp, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    // TODO: temp
    // get this from settings
    // TODO: store cart in store
    const cartCookieName = 'propeller-vsf-cart';

    const existngCartId =
      context.$propeller.config.app.cookies.get(cartCookieName);

    if (!existngCartId) return {};

    const cart = await context.$propeller.api.cart(existngCartId);

    return cart?.data?.cart;
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
      const { data } = await context.$propeller.api.cartStart();
      existngCartId = data.cartStart.cartId;
      context.$propeller.config.app.cookies.set(cartCookieName, existngCartId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });

      // check if user is already loged in, if so, add user to cart
    }

    const cartAddItemInput = {
      cartId: existngCartId,
      productId: product.classId,
      quantity: quantity,
    };

    const simpleProduct = await context.$propeller.api.cartAddItem(
      cartAddItemInput
    );

    // eslint-disable-next-line consistent-return
    return simpleProduct.data.cartAddItem.cart as unknown as Cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (
    context: Context,
    { currentCart, product, customQuery }
  ) => {
    const cartDeleteItemInput = {
      cartId: currentCart.cartId,
      itemId: product.id,
    };

    const { data } = await context.$propeller.api.cartDeleteItem(
      cartDeleteItemInput
    );

    return data.cartDeleteItem.cart as unknown as Cart;
  },

  // TODO: add type cartUpdateItemInput
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    const cartUpdateItemInput = {
      cartId: currentCart.cartId,
      itemId: product.id,
      quantity,
    };

    const { data } = await context.$propeller.api.cartUpdateItem(
      cartUpdateItemInput
    );

    return data.cartUpdateItem.cart as unknown as Cart;
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
  isInCart: (context: Context, { currentCart, product }) =>
    !!currentCart?.items?.find(
      (cartItem) => cartItem.productId === product.classId
    ),
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
