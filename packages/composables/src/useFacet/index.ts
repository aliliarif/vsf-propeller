import {
  Context,
  useFacetFactory,
  FacetSearchResult,
} from '@vue-storefront/core';
import type { UseFacetSearchParams as SearchParams } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
    const { data } = await context.$propeller.api.products(params.input);

    // console.log('[Result]:', { data });

    return {
      items: data?.category?.products?.items || [],
      total: data?.category?.products?.itemsFound,
      // availableFilters: data?.products?.aggregations,
      category: { id: data?.category?.categoryId },
      // availableSortingOptions,
      // perPageOptions: [10, 20, 50],
      // itemsPerPage,
    };
  },
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
