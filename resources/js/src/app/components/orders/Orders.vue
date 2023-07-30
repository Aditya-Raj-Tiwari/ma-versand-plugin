<template>
  <div class="container order-items-page">
    <div class="text-white" v-if="isLoading">
      <h2>Loading...</h2>
      <div class="animation-loading-container">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-4"></div>
        <div class="circle circle-5"></div>
      </div>
    </div>
    <div v-show="entries.length === 0 && !isLoading">
      <h2>No order at the moment</h2>
    </div>
    <div v-show="entriesData.length !== 0">
      <div v-for="(entry, index) in entriesData" :key="index" class="card mb-4">
        <div class="card-header">
          <h1>In der Versandvorbereitung</h1>
          <p><strong>Bestell-Nr.</strong>: {{ entry.order.id }}</p>
          <hr />
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-4 images-col">
              <div
                v-for="(image, index) in getImages(entry.itemImages)"
                :key="index"
              >
                <div
                  v-if="
                    index === 1 && Object.keys(entry.itemImages).length - 2 > 0
                  "
                  class="overlay"
                >
                  <p>+{{ Object.keys(entry.itemImages).length - 2 }}</p>
                </div>
                <img
                  :src="image"
                  class="img-fluid"
                  :class="{ 'img-overlay': index === 1 }"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <p>
                <strong>Bestelldatum : </strong>
                {{ formatDate(entry.order.createdAt) }}
              </p>
              <p>
                <strong>Zahlungsart : </strong> {{ entry.paymentMethodName }}
              </p>
              <p><strong>Status : </strong> {{ getStatus(entry.status) }}</p>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <div class="card mb-4" v-show="entriesData.length !== 0">
            <div class="card-header" :id="`heading-${index}`">
              <h5 class="mb-0">
                <button
                  class="btn btn-link"
                  type="button"
                  @click="entry.expanded = !entry.expanded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f9f9f9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  Details einsehen
                </button>
              </h5>
            </div>

            <div class="details-order" v-show="entry.expanded">
              <div class="card-body row">
                <div class="col-lg-6 col-sm-12">
                  <div class="row">
                    <div class="col-6">
                      <h4 class="pt-5">Zahlungsart</h4>
                      <span>{{ entry.paymentMethodName }} </span>

                      <h4 class="pt-4">VERSANDART</h4>
                      <span
                        >{{ entry.shippingProvider }}-
                        {{ entry.shippingProfileName }}</span
                      >
                      <h4 class="pt-4">Zahlungsstatus</h4>
                      <span>{{ entry.paymentStatus }}</span>
                    </div>
                    <div class="col-6"></div>
                  </div>
                </div>

                <div class="col-lg-6 col-sm-12">
                  <h2>Summe</h2>
                  <dl>
                    <dt>Warenwert (Netto)</dt>
                    <dd>
                      {{ entry.totals.itemSumNet.toFixed(2) }}
                      {{ entry.totals.currency }}
                    </dd>
                    <dt><strong>Warenwert (Brutto)</strong></dt>
                    <dd>
                      <strong
                        >{{ entry.totals.itemSumGross.toFixed(2) }}
                        {{ entry.totals.currency }}</strong
                      >
                    </dd>
                    <dt>Rabatt auf Warenwert</dt>
                    <dd>
                      {{ entry.totals.itemSumRebateGross.toFixed(2) }}
                      {{ entry.totals.currency }}
                    </dd>
                    <dt>Versandkosten (Netto)</dt>
                    <dd>
                      {{ entry.totals.shippingNet.toFixed(2) }}
                      {{ entry.totals.currency }}
                    </dd>
                    <dt><strong>Versandkosten (Brutto)</strong></dt>
                    <dd>
                      <strong
                        >{{ entry.totals.shippingGross.toFixed(2) }}
                        {{ entry.totals.currency }}</strong
                      >
                    </dd>
                    <hr />
                    <dt>Gesamtsumme (Netto)</dt>
                    <dd>
                      {{ entry.totals.totalNet.toFixed(2) }}
                      {{ entry.totals.currency }}
                    </dd>
                    <dt><strong>Gesamtsumme (Brutto)</strong></dt>
                    <dd>
                      <strong
                        >{{ entry.totals.totalGross.toFixed(2) }}
                        {{ entry.totals.currency }}</strong
                      >
                    </dd>
                  </dl>
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
import moment from "moment";
const ApiService = require("../../services/ApiService");

export default {
  name: "Orders",
  data() {
    return {
      data: [],
      entries: [],
      isLoading: true,
      contentLoaded: false,
    };
  },
  computed: {
    entriesData() {
      return this.entries;
    },
  },
  methods: {
    fetchData() {
      ApiService.get("/rest/io/order")
        .done((response) => {
          console.log("response", response);
          this.data = response || [];
          this.entries = response.entries.map((entry) => ({
            ...entry,
            expanded: false,
          }));
          this.contentLoaded = true;
          this.isLoading = false;
        })
        .catch(() => {
          this.entries = [];
          this.isLoading = false;
          this.contentLoaded = true;
          console.log("data", data);
          console.log("entries", entries);
        });
    },

    loadAgain() {
      this.isLoading = true;
      this.contentLoaded = false;
      this.fetchData();
    },

    getImages(itemImages) {
      return Object.values(itemImages).slice(0, 2);
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    getStatus(status) {
      return status.replace(/\[\d+\]\s/, "");
    },
  },
  watch: {
    entries: function () {
      this.isLoading = !this.contentLoaded;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>