import {
  Context,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import type { Product } from '@propeller-commerce/propeller-api';
import type { UseProductSearchParams as SearchParams } from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    console.log('Propeller: useProduct.productsSearch');

    if (params.id) {
      const { data } = await context.$propeller.api.productDetail(params);

      return data?.product || {};
    }

    return {};
  },
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
