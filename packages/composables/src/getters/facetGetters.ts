import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet,
} from '@vue-storefront/core';
import type { Facet, FacetSearchCriteria } from '@vue-storefront/propeller-api';
import {
  buildFacets,
  reduceForGroupedFacets,
  // reduceForFacets,
} from '../useFacet/_utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(
  params: FacetSearchResult<Facet>,
  criteria?: FacetSearchCriteria
): AgnosticFacet[] {
  return [
    {
      type: 'string',
      id: '123',
      value: 'AA',
      attrName: 'fff',
      count: 3,
      selected: false,
      metadata: 'any',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] =>
  buildFacets(searchData, 'reduceForGroupedFacets', criteria)?.filter(
    (facet) => facet.options && facet.options.length > 0
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
  return {
    options: [],
    selected: '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(
  params: FacetSearchResult<Facet>
): AgnosticCategoryTree {
  return {
    label: '',
    slug: '',
    items: null,
    isCurrent: false,
    count: 0,
  };
}

const getProducts = (searchData): any => {
  if (!searchData || !searchData.data || !searchData.data.items) {
    return [];
  }
  return searchData.data.items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    itemsPerPage: 10,
    pageOptions: [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(
  params: FacetSearchResult<Facet>
): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination,
};
