<template>
  <div class="homepage-carousel owl-carousel owl-theme" ref="carousel">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="products-overview"
      :class="zoomClass(index)"
    >
      <img :src="item.image" :alt="item.alt" width="200px" />
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      items: [
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Ra_der.png",
          alt: "reifen",
          text: "Reifen",
        },
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Motor.png",
          alt: "motoren",
          text: "Motoren",
        },
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Kettensa_ge.png",
          alt: "Sägeketten",
          text: "Sägeketten",
        },
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Keilriemen.png",
          alt: "Keilriemen",
          text: "Keilriemen",
        },
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Seilzugstarter.png",
          alt: "Seilzugstarter",
          text: "Seilzugstarter",
        },
        {
          image:
            "https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/homepage/Ma_hmesser.png",
          alt: "mahmesser",
          text: "Mähmesser",
        },
      ],
      activeIndex: 0,
    };
  },
  mounted() {
    const owl = $(this.$refs.carousel);
    owl.owlCarousel({
      items: 5,
      center: false,
      loop: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          center: false,
        },
        600: {
          items: 3,
          center: false,
        },
        1000: {
          items: 5,
        },
      },
    });
  },
  methods: {
    zoomClass(index) {
      return {
        zoom: this.activeIndex === index,
      };
    },
  },
};
</script>