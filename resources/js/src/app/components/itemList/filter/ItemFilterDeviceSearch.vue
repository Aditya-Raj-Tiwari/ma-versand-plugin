<template>
  <div
    class="category-heroshot deviceSearch-heroshot variation-heroshot lozad"
    data-background-image="https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/images/cat_bg_dummy_6.jpg"
    data-loaded="true"
    role="img"
    style="
      background-image: url('https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/images/cat_bg_dummy_6.jpg');
    "
  >
    <div class="container-max">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-10 col-lg-9">
          <div class="category-heroshot-container">
            <h2 class="d-block h2 mb-3 mb-lg-4 pb-0">
              Wählen Sie hier Ihr Ersatzteil
            </h2>
            <span
              class="d-block heroshot-description mb-3 mb-lg-5 font-weight-normal"
              >Blitzschnell das passende Ersatzteil finden</span
            >
            <div class="dropdown-container" id="seachCategoriesDropdown">
              <div
                class="dropdown pt-4 border-0"
                :class="[facet.id, { active: activeTitle === facetName }]"
                v-if="facet.name"
              >
                <div
                  class="h3 title py-0"
                  @click="toggleActiveTitle(facetName)"
                >
                  {{ facetName }}
                </div>

                <div
                  class="form-check-container"
                  v-show="activeTitle === facetName"
                >
                  <div
                    class="form-check-wrapper"
                    v-for="value in facet.values"
                    :key="value.id"
                  >
                    <div class="form-check mb-0 pl-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";

export default {
  name: "ItemFilterDeviceSearch",

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
    facetName() {
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
  