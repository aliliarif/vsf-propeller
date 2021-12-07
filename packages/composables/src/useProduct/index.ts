import {
  Context,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/propeller-api';
import type { UseProductSearchParams as SearchParams } from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    console.log('Propeller: useProduct.productsSearch');

    console.log(params);
    if (params.id) {
      console.log('JAJAJ');
      const { data } = await context.$propeller.api.productDetail(params);

      console.log('[Product Result]:', { data });

      return data?.product || {};
    }

    return {};
  },
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
