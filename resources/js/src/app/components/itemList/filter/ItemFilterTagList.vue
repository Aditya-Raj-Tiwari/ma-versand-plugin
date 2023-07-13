<template>
  <div class="selected-filters clearfix">
    <span
      :class="
        'text-appearance selected-filter filter-' + tag.id + ' ' + marginClasses
      "
      :style="marginInlineStyles"
      v-for="tag in tagList"
      @click="removeTag(tag)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      {{ tag.name }}
    </span>

    <span
      :class="'bg-appearance selected-filter reset-all' + ' ' + marginClasses"
      :style="marginInlineStyles"
      v-if="tagList.length >= 2"
      @click="resetAllTags()"
    >
      {{ $translate("Ceres::Template.itemFilterReset") }}
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: {
    facetData: {
      type: Array,
      default() {
        return [];
      },
    },
    marginClasses: {
      type: String,
      default: null,
    },
    marginInlineStyles: {
      type: String,
      default: null,
    },
  },

  computed: mapState({
    tagList: (state) => state.itemList.selectedFacets,
  }),

  created() {
    if (!this.$store.state.itemList.facets?.length) {
      this.$store.commit("addFacets", this.facetData);
    }
  },

  methods: {
    removeTag(tag) {
      this.selectFacet({ facetValue: tag });
      this.loadItemList();
    },

    resetAllTags() {
      this.resetAllSelectedFacets();
      this.loadItemList();
    },

    ...mapMutations(["resetAllSelectedFacets"]),

    ...mapActions(["selectFacet", "loadItemList"]),
  },
};
</script>
