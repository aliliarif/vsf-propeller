import { useRoute, useRouter } from '@nuxtjs/composition-api';
import { AgnosticCategoryTree } from '@vue-storefront/core';

const nonFilters = new Set(['page', 'sort', 'term', 'itemsPerPage']);

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.has(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]],
  };
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query } = route.value;

  const getFiltersDataFromUrl = (onlyFilters) =>
    Object.keys(query)
      .filter((f) => (onlyFilters ? !nonFilters.has(f) : nonFilters.has(f)))
      // eslint-disable-next-line unicorn/prefer-object-from-entries
      .reduce(reduceFilters(query), {});

  const getFacetsFromURL = () => ({
    filters: getFiltersDataFromUrl(true),
    categorySlug: route.value.params.slug_1,
    itemsPerPage: Number.parseInt(query.itemsPerPage as string, 10) || 10,
    page: Number.parseInt(query.page as string, 10) || 1,
    sort: (query.sort as string) || '',
    term: query.term as string,
  });

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    console.warn('[VSF] please implement useUiHelpers.getCatLink.');

    return '/';
  };

  // eslint-disable-next-line
  const changeSorting = (sort) => {
    console.warn('[VSF] please implement useUiHelpers.changeSorting.');

    return 'latest';
  };

  // eslint-disable-next-line
  const changeFilters = async (filters: any) => {
    await router.push({
      query: {
        ...getFiltersDataFromUrl(false),
        ...filters,
      },
    });
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  const getAgnosticCatLink = (category: AgnosticCategoryTree): string =>
    `/c${category.slug}`;

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    getAgnosticCatLink,
  };
};

export default useUiHelpers;
