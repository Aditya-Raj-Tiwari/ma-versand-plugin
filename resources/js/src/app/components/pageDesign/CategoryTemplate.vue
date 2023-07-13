<template>
  <div class="category-template faq-page-second">
    <div class="breadcrumb">
      <a href="/"> <i class="fa fa-home"></i></a>
      <span> &gt;&nbsp; </span>
      <span>{{ headerTitle }}</span>
    </div>
    <div class="row first-section d-flex flex-column half">
      <h1>{{ headerTitle }}</h1>
      <p>{{ content }}</p>
    </div>

    <div
      class="row second-section"
      :style="{ backgroundImage: `url(${backgroundPicture})` }"
    >
      <div class="ersatzteilsuche">
        <div class="container"><h5>Suche</h5></div>
      </div>
    </div>

    <div id="accordion" class="col-12 col-md-7 my-5 half" v-if="showFaq">
      <div v-for="(faq, index) in faqs" :key="index" class="card">
        <div class="card-header" :id="'heading' + index">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              :class="{ collapsed: index !== 0 }"
              data-toggle="collapse"
              :data-target="'#collapse' + index"
              aria-expanded="true"
              :aria-controls="'collapse' + index"
            >
              {{ faq.header }}
            </button>
          </h5>
        </div>

        <div
          :id="'collapse' + index"
          class="collapse"
          :class="{ show: index === 0 }"
          :aria-labelledby="'heading' + index"
          data-parent="#accordion"
        >
          <div class="card-body">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>

    <div class="content-thumb-container" v-else>
      <div
        v-for="group in titletemplate"
        :key="Object.keys(group)[0]"
        class="letter-group"
      >
        <h3>{{ Object.keys(group)[0] }}</h3>
        <div
          v-for="item in Object.values(group)[0]"
          :key="item.name"
          class="title-item"
        >
          <a :href="item.link">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "category-template",
  props: {
    headerTitle: String,
    content: String,
    backgroundPicture: String,
    titletemplate: {
      default: () => [],
      type: Array,
    },
    faqs: {
      default: () => [],
      type: Array,
    },
    faqsectionboolean: {
      default: true,
      value: Boolean,
    },
  },
  computed: {
    showFaq() {
      return this.$props.faqsectionboolean;
    },
  },
};
</script>

