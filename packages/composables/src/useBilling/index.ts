import {
  Context,
  useBillingFactory,
  UseBillingParams,
} from '@vue-storefront/core';
import type { BillingAddress } from '@propeller-commerce/propeller-api';
import type { UseBillingAddParams as AddParams } from '../types';

// TODO: TEMP
// !Add proper types
type AddParamsTemp = any;
type BillingAddressTemp = any;

const params: UseBillingParams<BillingAddressTemp, AddParamsTemp> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('[Propeller] loadBilling', { customQuery });

    const cartCookieName = 'propeller-vsf-cart';

    const existngCartId =
      context.$propeller.config.app.cookies.get(cartCookieName);

    if (!existngCartId) return {};

    const cart = await context.$propeller.api.cart(existngCartId);

    return cart.data.cart?.invoiceAddress;
    // TODO: store address in store and get it fromt here
    // if (!context.cart.cart?.value?.shipping_addresses) {
    //   await context.cart.load({ customQuery });
    // }

    // return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params, billingDetails, customQuery }) => {
    console.log('Propeller: useBilling.save');

    // TODO: temp
    // get this from settings
    const cartCookieName = 'propeller-vsf-cart';
    const cartId = context.$propeller.config.app.cookies.get(cartCookieName);

    const shippingData = {
      cartId,
      type: 'invoice',
      ...billingDetails,
    };

    await context.$propeller.api.cartUpdateAddress(shippingData);

    return {};
  },
};

export const useBilling = useBillingFactory<BillingAddress, AddParams>(params);
