<template>
  <div class="row">
    <div class="accordion w-100 col-12" id="jobsAccordion">
      <div class="card mb-3">
        <div
          class="card-header arrow_box d-flex align-items-center"
          id="headingOne"
          :style="{
            'background-image': `url(${item.images.all[0].urlMiddle})`,
          }"
        >
          <div>
            <h2 class="card-headline mb-0">
              {{ item.texts.name1 }}
            </h2>
            <button
              class="btn btn-block text-left btn-more text-white text-small"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Mehr erfahren
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#jobsAccordion"
        >
          <div class="card-body">
            <div v-html="item.texts.description"></div>
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-4">
                <a
                  target="_blank"
                  class="btn btn-primary btn-block text-white"
                  :href="jobLink"
                >
                  Jetzt bewerben
                </a>
              </div>
              <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-4">
                <a
                  target="_blank"
                  class="btn btn-secondary btn-block text-white"
                  :href="pdfLink"
                >
                  Stellenanzeige PDF
                </a>
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
import CategoryImageCarousel from "./CategoryImageCarousel.vue";
import ItemStoreSpecial from "./ItemStoreSpecial.vue";
import { getSlotData } from "../../helper/getSlotData";

export default {
  name: "CategoryJobs",
  components: {
    CategoryImageCarousel,
    ItemStoreSpecial,
  },

  props: {
    decimalCount: {
      type: Number,
      default: 0,
    },
    imageUrlAccessor: {
      type: String,
      default: "urlMiddle",
    },
    itemData: {
      type: Object,
    },
    disableCarouselOnMobile: {
      type: Boolean,
    },
    paddingClasses: {
      type: String,
      default: null,
    },
    paddingInlineStyles: {
      type: String,
      default: null,
    },
    forceUrlWithVariationId: {
      type: Boolean,
      default: false,
    },
  },

  jsonDataFields: ["itemDataRef"],

  computed: {
    item() {
      return this.itemData || this.itemSlotData || this.itemDataRef;
    },

    itemSlotData: getSlotData("item-data"),

    /**
     * returns itemData.item.storeSpecial
     */
    storeSpecial() {
      return this.item.item.storeSpecial;
    },

    /**
     * returns itemData.texts
     */
    texts() {
      return this.item.texts;
    },

    itemPrice() {
      return this.$options.filters.specialOffer(
        this.item.prices.default.unitPrice.formatted,
        this.item.prices,
        "unitPrice",
        "formatted"
      );
    },
    jobLink() {
      let property = this.item.variationProperties[0].properties.find(
        (prop) => prop.id === 10
      );

      return property ? property.values.value : null;
    },
    pdfLink() {
      let property = this.item.variationProperties[0].properties.find(
        (prop) => prop.id === 11
      );

      return property ? property.values.value : null;
    },

    basePrice() {
      return this.item.prices.default.basePrice;
    },

    itemPriceGraduated() {
      let unitPrice;
      if (App.config.item.enableGraduatedPrices) {
        unitPrice =
          this.item.prices.graduatedPrices.length > 0
            ? this.item.prices.graduatedPrices[0].unitPrice
            : this.item.prices.default.unitPrice;
      } else {
        unitPrice = this.item.prices.default.unitPrice;
      }

      return this.$options.filters.specialOffer(
        unitPrice.formatted,
        this.item.prices,
        "unitPrice",
        "formatted"
      );
    },

    itemGraduatedPriceisCheapestSorting() {
      return (
        !!this.item.item &&
        this.item.item.salableVariationCount > 1 &&
        !!this.$ceres.isCheapestSorting
      );
    },

    itemGraduatedPricesalableVariationCount() {
      return (
        !!this.item.item &&
        this.item.item.salableVariationCount == 1 &&
        this.item.prices.graduatedPrices.length > 1 &&
        App.config.item.enableGraduatedPrices
      );
    },

    itemSetPrice() {
      return this.$options.filters.currency(
        this.item.prices.default.price.value,
        this.item.prices.default.currency
      );
    },

    urlWithVariationId() {
      return (
        !this.$ceres.config.item.showPleaseSelect ||
        this.$ceres.initialPleaseSelect == 0 ||
        this.forceUrlWithVariationId
      );
    },
    canBeAddedToBasket() {
      return (
        this.item.filter.isSalable &&
        !this.item.filter.hasChildren &&
        this.item.filter.isSalableAndActive
      );
    },
    hasCrossPrice() {
      const hasRrpPrice =
        !!this.item.prices.rrp &&
        this.item.prices.rrp.unitPrice.value >
          this.item.prices.default.unitPrice.value;

      const hasBeforePrice =
        !!this.item.prices.specialOffer &&
        !!this.item.prices.default &&
        this.item.prices.default.unitPrice.value >
          this.item.prices.specialOffer.unitPrice.value;

      return hasRrpPrice || hasBeforePrice;
    },
    isLoading() {
      return (
        this.$store.state.items.isAddToBasketLoading === this.variationId ||
        this.$store.state.items.isSetLoading
      );
    },
    itemImage() {
      return this.item.images.all[0];
    },

    ...mapState({
      showNetPrices: (state) => state.basket.showNetPrices,
    }),
  },
};
</script>
  