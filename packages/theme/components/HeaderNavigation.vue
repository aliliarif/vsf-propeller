<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug[0].value}`"
      :label="category.name[0].value"
      :link="localePath(`/c/${category.slug[0].value}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug[0].value}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category.name[0].value"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category.slug[0].value}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
// const { path, result: routeData, search: resolveUrl } = useUrlResolver();
import { ref, computed, useRoute, useRouter } from '@nuxtjs/composition-api';
import { categoryGetters, useCategory } from '@vue-storefront/propeller';
import { onSSR } from '@vue-storefront/core';
export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { categories, search } = useCategory(`categoryList`);

    const categoryTree = computed(() =>
      categoryGetters.getTree(categories.value)
    );

    onSSR(async () => {
      await search();
    });

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
