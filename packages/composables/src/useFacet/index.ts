import {
  Context,
  useFacetFactory,
  FacetSearchResult,
} from '@vue-storefront/core';
import type { UseFacetSearchParams as SearchParams } from '../types';

const availableSortingOptions = [
  {
    label: 'Default',
    value: '',
  },
  {
    label: 'Relevance A-Z',
    value: 'RELEVANCE_ASC',
  },
  {
    label: 'Relevance Z-A',
    value: 'RELEVANCE_DESC',
  },
  {
    label: 'Name A-Z',
    value: 'NAME_ASC',
  },
  {
    label: 'Name Z-A',
    value: 'NAME_DESC',
  },
  {
    label: 'Product SKU A-Z',
    value: 'SKU_ASC',
  },
  {
    label: 'Product SKU Z-A',
    value: 'SKU_DESC',
  },
  {
    label: 'Price from low to high',
    value: 'PRICE_ASC',
  },
  {
    label: 'Price from high to low',
    value: 'PRICE_DESC',
  },
];

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
    const hasBundle = params.input.hasBundle || null;

    const productParams = {
      textFilters: [
        ...constructTextFilterObject({
          ...inputFilters,
        }),
      ],
      offset,
      page,
      sort: constructSortObject(params.input.sort || ''),
    };

    const productSearchParams = {
      offset: productParams.offset,
      page: productParams.page,
      categorySlug,
      textFilters: productParams.textFilters,
      sort: productParams.sort,
      hasBundle,
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
      availableSortingOptions,
      perPageOptions: [12, 36, 108],
    };
  },
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
