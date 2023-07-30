<template>
  <div class="container-max">
    <div class="owl-carousel owl-theme brand-abc-letters-bar">
      <a
        v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
        :key="letter"
        :href="'#' + letter"
        @click.prevent="scrollTo(letter)"
        class="item"
        :class="{ 'not-available': !letters.includes(letter) }"
      >
        {{ letter }}
      </a>
    </div>
    <div class="brand-abc pb-5">
      <div
        v-for="letter in sortedBrandArray"
        :key="letter[0]"
        :id="letter[0]"
        class="brand-abc-inner"
      >
        <div class="d-block h1">{{ letter[0] }}</div>
        <div v-for="brand in letter[1]" :key="brand.id">
          <a class="text-light" :href="brand.lang.de.url">{{
            brand.lang.de.name
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "canonical-categories",
  data() {
    return {
      letters: [],
      brandList: [],
    };
  },
  computed: {
    sortedBrandArray() {
      const brands = this.brandList;
      const groupedBrands = brands.reduce((group, brand) => {
        let words = brand.lang.de.name.split(" ");
        let letter = words[1][0].toUpperCase();

        if (!group[letter]) {
          group[letter] = [];
        }

        group[letter].push(brand);
        return group;
      }, {});

      this.letters = Object.keys(groupedBrands).sort();

      return Object.entries(groupedBrands).sort(([a], [b]) =>
        a.localeCompare(b)
      );
    },
  },
  methods: {
    scrollTo(letter) {
      const targetOffset = document.getElementById(letter).offsetTop;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    },
    initializeCarousel() {
      $(".brand-abc-letters-bar").owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        navText: ["", ""],
        dots: false,
        mouseDrag: true,
        stagePadding: 0,
        responsive: {
          0: { items: 6 },
          600: { items: 13 },
          1000: { items: 26 },
        },
      });
    },
  },
  mounted() {
    axios
      .get("https://ma-versand.webimpact.app/api/categories/json/root")
      .then((response) => {
        this.brandList = response.data;
        this.$nextTick(() => {
          this.initializeCarousel();
        });
      });
  },
};
</script>
