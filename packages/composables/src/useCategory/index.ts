import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams,
} from '@vue-storefront/core';
import type { Category } from '@vue-storefront/propeller-api';
import type { UseCategorySearchParams as SearchParams } from '../types';

const params: UseCategoryFactoryParams<Category, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context, params) => {
    console.log('INSIDE CATEGORY');
    console.log('Mocked: useCategory.categorySearch', params);

    const { data } = await context.$propeller.api.categories();

    console.log('[Category Result]:', { data });

    return data.category.categories || {};
  },
};

export const useCategory = useCategoryFactory<Category, SearchParams>(params);
