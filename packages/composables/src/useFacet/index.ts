import {
  Context,
  useFacetFactory,
  FacetSearchResult,
} from '@vue-storefront/core';
import type { UseFacetSearchParams as SearchParams } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
    console.log('Propeller: useFacet.search');
    console.log('params');
    console.log(params);    
    
    const { data } = await context.$propeller.api.products(params);

    console.log('[Result]:', { data });

    return {
      items: data?.category?.products?.items || [],
      // total: data?.products?.total_count,
      // availableFilters: data?.products?.aggregations,
      // category: { id: params.input.categoryId },
      // availableSortingOptions,
      // perPageOptions: [10, 20, 50],
      // itemsPerPage,
    };
  },
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
