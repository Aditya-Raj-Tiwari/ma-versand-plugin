<template>
  <div
    v-if="facet.name"
    class="card pt-4 border-0"
    :class="[facet.cssClass, { active: activeTitle === facetName }]"
  >
    <div class="h3 title py-0" @click="toggleActiveTitle(facetName)">
      {{ facetName }}
    </div>

    <div v-if="facet.type === 'price'">
      <item-filter-price></item-filter-price>
    </div>

    <div class="form-check-container" :class="facet.cssClass" v-else>
      <div
        class="form-check-wrapper"
        v-for="value in facets"
        :key="value.id"
        :class="value.cssClass"
      >
        <div class="form-check mb-0 pl-0">
          <div
            class="filterColor white"
            v-if="
              value.cssClass === '#FFFFFF' ||
              value.cssClass === '#FFF' ||
              value.cssClass === '#ffffff' ||
              value.cssClass === '#fff'
            "
            :style="
              'background-color:' +
              value.cssClass +
              '; box-shadow: inset 0px 0px 0px 1px rgb(233 233 233)'
            "
          ></div>
          <div
            class="filterColor"
            v-else-if="
              value.cssClass &&
              !(
                value.cssClass === 'png' ||
                value.cssClass === 'jpg' ||
                value.cssClass === 'svg' ||
                value.cssClass === 'gif'
              )
            "
            :style="'background-color:' + value.cssClass"
          ></div>
          <div
            class="filterPattern"
            v-if="value.cssClass === 'png'"
            :style="
              'background-image: url(/documents/facet/' +
              facet.id +
              '/' +
              value.id +
              '.' +
              value.cssClass +
              ')'
            "
          ></div>
          <div
            class="filterPattern"
            v-else-if="value.cssClass === 'jpg'"
            :style="
              'background-image: url(/documents/facet/' +
              facet.id +
              '/' +
              value.id +
              '.' +
              value.cssClass +
              ')'
            "
          ></div>
          <div
            class="filterPattern"
            v-else-if="value.cssClass === 'gif'"
            :style="
              'background-image: url(/documents/facet/' +
              facet.id +
              '/' +
              value.id +
              '.' +
              value.cssClass +
              ')'
            "
          ></div>
          <div
            class="filterPattern"
            v-else-if="value.cssClass === 'svg'"
            :style="
              'background-image: url(/documents/facet/' +
              facet.id +
              '/' +
              value.id +
              '.' +
              value.cssClass +
              ')'
            "
          ></div>
          <input
            :id="'option-' + value.id + '-' + _uid"
            class="form-check-input d-none"
            type="checkbox"
            :checked="isSelected(value.id)"
            @change="updateFacet(value)"
            :disabled="isLoading || value.count <= 0"
          />
          <label
            :for="'option-' + value.id + '-' + _uid"
            class="form-check-label"
            :class="[paddingClasses, 'option-' + value.id]"
            :style="paddingInlineStyles"
          >
            <div class="d-flex">
              <span class="flex-grow-1">{{ value.name }}</span>
              <span class="filter-badge">{{ value.count }}</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemFilterPrice from "./ItemFilterPrice.vue";

export default {
  name: "item-filter",

  components: {
    ItemFilterPrice,
  },

  props: {
    facet: {
      type: Object,
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
  data() {
    return {
      activeTitle: null,
    };
  },
  computed: {
    facets() {
      return this.facet.values;
    },

    facetName() {
      if (this.facet.translationKey && this.facet.translationKey.length > 0) {
        return this.$translate("Ceres::Template." + this.facet.translationKey);
      }

      return this.facet.name;
    },
    ...mapState({
      selectedFacets: (state) => state.itemList.selectedFacets,
      isLoading: (state) => state.itemList.isLoading,
    }),
  },

  methods: {
    updateFacet(facetValue) {
      const toolbarElements = document.getElementsByClassName("widget-toolbar");

      for (const toolbarElement of toolbarElements) {
        if (toolbarElement.contains(this.$vnode.elm)) {
          window.localStorage.setItem("openFilterToolbar", true);
        }
      }

      this.$store.dispatch("selectFacet", { facetValue });
    },

    isSelected(facetValueId) {
      return (
        this.selectedFacets.findIndex(
          (selectedFacet) => selectedFacet.id === facetValueId
        ) > -1
      );
    },

    toggleActiveTitle(title) {
      if (this.activeTitle === title) {
        this.activeTitle = null;
      } else {
        this.activeTitle = title;
      }
    },
  },
};
</script>
