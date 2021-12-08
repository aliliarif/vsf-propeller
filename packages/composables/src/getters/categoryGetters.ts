import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/propeller-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category): AgnosticCategoryTree {
  return category;
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
};
