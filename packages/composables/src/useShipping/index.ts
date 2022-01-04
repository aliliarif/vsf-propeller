import {
  Context,
  useShippingFactory,
  UseShippingParams,
} from '@vue-storefront/core';
import type { ShippingAddress } from '@propeller-commerce/propeller-api';
import type { UseShippingAddParams as AddParams } from '../types';

// TODO: TEMP
// !Add proper types
type AddParamsTemp = any;
type ShippingAddressTemp = any;

const params: UseShippingParams<ShippingAddressTemp, AddParamsTemp> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    // console.log('[Propeller] loadShipping', { customQuery });

    const cartCookieName = 'propeller-vsf-cart';

    const existngCartId =
      context.$propeller.config.app.cookies.get(cartCookieName);

    if (!existngCartId) return {};

    const cart = await context.$propeller.api.cart(existngCartId);

    return cart.data.cart?.deliveryAddress;
    // TODO: store address in store and get it fromt here
    // if (!context.cart.cart?.value?.shipping_addresses) {
    //   await context.cart.load({ customQuery });
    // }

    // return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('Propeller: useShipping.save');

    // TODO: temp
    // get this from settings
    const cartCookieName = 'propeller-vsf-cart';
    const cartId = context.$propeller.config.app.cookies.get(cartCookieName);

    const shippingData = {
      cartId,
      type: 'delivery',
      ...shippingDetails,
    };

    await context.$propeller.api.cartUpdateAddress(shippingData);

    return {};
  },
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(
  params
);
