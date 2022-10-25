const createFacetsFromOptions = (facet) => {
  const options = facet.textFilter || [];

  return options.map(({ value, count }) => ({
    type: 'string',
    id: value,
    attrName: value,
    value,
    // selected: selectedList.includes(value),
    selected: false,
    count,
  }));
};

export const reduceForGroupedFacets = (facets, filters) => (prev, curr) => {
  return [
    ...prev,
    {
      id: curr,
      label: curr,
      options: [],
      count: null,
    },
  ];
};

export const buildFacets = (searchData, reduceFn, criteria?: string[]) => {
  // filters are constructed as
  // {TYPE}:{ATTRIBUTE_ID}={ATTRIBUTE_VALUE}

  if (!searchData?.data?.availableFilters) {
    return [];
  }

  const {
    data: { availableFilters },
    input: { filters },
  } = searchData;

  return availableFilters
    .filter(({ isSearchable }) => isSearchable)
    .map((filter) => ({
      id: filter.type + ':' + filter.id.toLowerCase(),
      label: filter.description,
      count: 1,
      type: filter.type,
      attrName: 'filterKey',
      // value,
      selected: false,
      options: createFacetsFromOptions(filter),
    }));
};
