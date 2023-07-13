<template>
  <div>
    <div>
      <div v-if="!basketItems.length > 0">
        <div class="h5 py-3">
          <h1>Ihr Warenkorb ist leer</h1>
          <img
            src="https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/icons/Warenkorb_leer.png"
            alt="warenkorb leer"
          />
          <p>Entdecken Sie jetzt mehr als 300.000 Ersatzteile!</p>
          <a href="/">Zum Shop</a>
        </div>
      </div>
      <transition-group name="list-transition" tag="div">
        <template v-for="basketItem in basketItems">
          <basket-list-item
            :key="basketItem.id"
            :basket-item="basketItem"
            :is-preview="isPreview"
            :basket-details-data="basketDetailsData"
          >
            <template #before-basket-item>
              <slot name="before-basket-item"></slot>
            </template>
            <template #after-basket-item>
              <slot name="after-basket-item"></slot>
            </template>
          </basket-list-item>
        </template>
      </transition-group>
    </div>

    <loading-animation
      v-if="!isBasketInitiallyLoaded"
      class="d-table w-100"
    ></loading-animation>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BasketListItem from "./BasketListItem.vue";

export default {
  name: "basket-list",

  components: {
    BasketListItem,
  },

  props: {
    template: {
      type: String,
      default: "#vue-basket-list",
    },
    basketDetailsData: {
      type: Array,
      default: () => [],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },

  computed: mapState({
    basketItems: (state) => state.basket.items,
    isBasketInitiallyLoaded: (state) => state.basket.isBasketInitiallyLoaded,
  }),
  mounted() {
    if (!this.basketItems.length) {
      $(".basket .row .col-5").hide();
      $(".basket .row .col-md-7").css("width", "100%");
    }
  },
};
</script>