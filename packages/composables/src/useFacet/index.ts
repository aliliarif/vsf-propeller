import {
  Context,
  useFacetFactory,
  FacetSearchResult,
} from '@vue-storefront/core';
import type { UseFacetSearchParams as SearchParams } from '../types';

const constructTextFilterObject = (inputFilters: Object) => {
  const filters = [];

  Object.keys(inputFilters).forEach((key) => {
    filters.push({
      searchId: 'attr_' + key.toLowerCase(),
      values: inputFilters[key][0], // TODO: TEMP only one value, this should be array
    });
  });

  return filters;
};

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const offset = params.input.offset ? params.input.offset : 12;
    const inputFilters = params.input.filters ? params.input.filters : {};
    const categorySlug = params.input.categorySlug;

    const productParams = {
      textFilters: [
        ...constructTextFilterObject({
          ...inputFilters,
        }),
      ],
      // perPage: itemsPerPage,
      offset: offset,
      page: params.input.page,
      // search: params.input.term ? params.input.term : '',
      // sort: constructSortObject(params.input.sort || ''),
    };

    const productSearchParams = {
      offset: productParams.offset,
      // search: productParams.search,
      categorySlug,
      textFilters: productParams.textFilters,
      // sort: productParams.sort,
      // currentPage: productParams.page,
    };

    const { data } = await context.$propeller.api.products(productSearchParams);

    return {
      items: data?.category?.products?.items || [],
      total: data?.category?.products?.itemsFound,
      availableFilters: data?.category?.products?.availableAttributes,
      category: { id: data?.category?.categoryId },
      // availableSortingOptions,
      // perPageOptions: [10, 20, 50],
      // itemsPerPage,
    };
  },
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
