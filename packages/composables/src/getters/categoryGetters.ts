import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/propeller-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category): AgnosticCategoryTree {
  return category;
  // return {
  //   label: category?.name[0]?.value,
  //   slug: category?.slug[0]?.value,
  //   items: category?.categories || [],
  //   isCurrent: false
  // };
}

// TODO: expand categoryGetters with these functions
// function getLabel(category): string {
//   return category.name[0].value || '';
// }

// function getSlug(category): string {
//   return category.slug[0].value || '';
// }

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
};
