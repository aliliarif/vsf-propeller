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
      values: inputFilters[key],
    });
  });

  return filters;
};

const constructSortObject = (sortData: string) => {
  const baseData = sortData.split(/_/gi);
  let data = null;

  if (baseData.length == 2)
    data = {
      field: baseData[0].toLowerCase(),
      order: baseData[1].toLowerCase(),
    };

  return data;
};

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const offset = params.input.offset ? params.input.offset : 12;
    const page = params.input.page ? params.input.page : 1;
    const inputFilters = params.input.filters ? params.input.filters : {};
    const categorySlug = params.input.categorySlug;

    const productParams = {
      textFilters: [
        ...constructTextFilterObject({
          ...inputFilters,
        }),
      ],
      offset,
      page,
      sort: constructSortObject(params.input.sort || ''),
      // search: params.input.term ? params.input.term : '',
    };

    const productSearchParams = {
      offset: productParams.offset,
      page: productParams.page,
      categorySlug,
      textFilters: productParams.textFilters,
      sort: productParams.sort,
      // search: productParams.search,
    };

    const { data } = await context.$propeller.api.products(productSearchParams);

    return {
      items: data?.category?.products?.items || [],
      total: data?.category?.products?.itemsFound,
      availableFilters: data?.category?.products?.availableAttributes,
      category: { id: data?.category?.categoryId },
      itemsPerPage: data?.category?.products?.offset,
      page: data?.category?.products?.page,
      pages: data?.category?.products?.pages,
      // availableSortingOptions,
      // perPageOptions: [10, 20, 50],
      // itemsPerPage,
    };
  },
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
