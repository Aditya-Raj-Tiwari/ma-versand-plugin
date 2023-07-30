<template>
  <div v-if="filterListBulk">
    <item-filter
      v-for="facet in facets"
      :facet="facet"
      :key="facet.id"
      :padding-classes="paddingClasses"
      :padding-inline-styles="paddingInlineStyles"
    >
    </item-filter>
  </div>

  <div v-else class="filter-wrapper" v-show="facets && facets.length > 0">
    <div v-open-filter-toolbar class="filter-collapse">
      <div class="component-loading" :class="{ 'is-loading': isLoading }">
        <div class="device-search-filter-container">
          <item-filter-device-search
            :facet="categoryFacets[0]"
          ></item-filter-device-search>
        </div>
        <div class="container-max mx-auto px-0">
          <div class="filterdrop card-columns">
            <item-filter
              v-for="facet in facets"
              :facet="facet"
              :key="facet.id"
            ></item-filter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemFilter from "./ItemFilter.vue";
import ItemFilterDeviceSearch from "./ItemFilterDeviceSearch.vue";
import { ComponentIdMixin } from "../../../mixins/componentId.mixin";

export default {
  name: "item-filter-list",

  components: {
    ItemFilter,
    ItemFilterDeviceSearch,
  },

  mixins: [ComponentIdMixin], // Experimental mixin, may be removed in the future.

  props: {
    filterListBulk: Boolean,
    facetData: {
      type: Array,
      default() {
        return [];
      },
    },
    allowedFacetsTypes: {
      type: Array,
      default: () => [],
    },
    paddingClasses: {
      type: String,
      default: null,
    },
    paddingInlineStyles: {
      type: String,
      default: null,
    },
  },

  computed: {
    categoryFacets() {
      return this.facetData.filter((facet) => facet.id === "category");
    },
    ...mapState({
      facets(state) {
        if (!this.allowedFacetsTypes.length) {
          return state.itemList.facets;
        }

        return state.itemList.facets.filter(
          (facet) =>
            this.allowedFacetsTypes.includes(facet.id) ||
            this.allowedFacetsTypes.includes(facet.type)
        );
      },

      isLoading: (state) => state.itemList.isLoading,
      selectedFacets: (state) => state.itemList.selectedFacets,
    }),
  },

  created() {
    if (!this.$store.state.itemList.facets?.length) {
      this.$store.commit("addFacets", this.facetData);
    }
  },
};
</script>
