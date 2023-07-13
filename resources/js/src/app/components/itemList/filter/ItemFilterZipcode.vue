<template>
  <div class="zip-code-filter">
    <div class="d-block">
      <input
        type="text"
        ref="get_zipcode"
        class="filter-form-control_input ml-2 form-control form-control-lg"
        placeholder="Postleitzahl eingeben"
        maxlength="5"
        @change="checkifNumber($event)"
        v-model="inputCheck"
      />
      <select
        name="LeaveType"
        class="filter-form-control select border custom-select-lg"
        v-model="requestedCode"
      >
        <option value="10">+10km</option>
        <option value="20" selected="true">+20km</option>
        <option value="50">+50km</option>
        <option value="100">+100km</option>
      </select>
      <button class="search-button btn btn-primary btn-lg" @click="getZipCode">
        Suchen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "item-filter-zipcode",

  props: {
    facet: {
      type: Array,
    },
  },
  data() {
    return {
      getResult: [],
      baseURL: "https://webimpact.app/api/radius-search",
      facetVal: [],
      requestedCode: "20",
      inputCheck: "",
    };
  },
  computed: {
    facets() {
      return this.facet[3].values;
    },

    facetName() {
      if (this.facet.translationKey && this.facet.translationKey.length > 0) {
        return this.$translate("Ceres::Template." + this.facet.translationKey);
      }

      return this.facet.name;
    },
    errorComp() {
      return this.error;
    },
  },

  methods: {
    checkifNumber(e) {
      if (isNaN(e.target.value)) {
        this.inputCheck = "";
        window.CeresNotification.error("Bitte eine gültige PLZ eingeben.");
      }
    },
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    async getZipCode() {
      const id = this.$refs.get_zipcode.value;
      const radius = this.requestedCode;

      if (id && this.requestedCode !== "") {
        try {
          const res = await fetch(
            this.baseURL +
              `?plz=${id}&radius=${radius}&hash=p56ypGNZj8Sm58Wr5T7VEo8Vj`
          );

          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }

          const data = await res.json();

          const result = {
            data: data,
            status: res.status,
            statusText: res.statusText,
            headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
            },
          };

          this.getResult = result.data.data;
          this.changeFacetValue();
        } catch (err) {
          this.getResult = err.message;
          window.CeresNotification.error(
            "Keine Kurse in ihrer Umgebung gefunden."
          );
          document.getElementById("campsfound").innerHTML =
            "⚽ Es wurden 0 Camps in Deiner Umgebung gefunden.";
          document
            .getElementById("infin-scroller-template")
            .classList.add("d-none");
        }
      }
    },
    changeFacetValue() {
      let commonElements = [];
      for (let i = 0; i < this.getResult.length; i++) {
        for (let j = 0; j < this.facets.length; j++) {
          if (this.getResult[i].plz === this.facets[j].name) {
            commonElements.push(this.facets[j]);
            break;
          }
        }
      }
      this.facetVal = commonElements;
      if (this.facetVal.length === 0) {
        window.CeresNotification.error(
          "Keine Kurse in ihrer Umgebung gefunden."
        );
        document.getElementById("campsfound").innerHTML =
          "⚽ Es wurden 0 Camps in Deiner Umgebung gefunden.";
        document
          .getElementById("infin-scroller-template")
          .classList.add("d-none");
      }

      if (window.location.href.indexOf("Leave") > -1) {
        window.location.href =
          window.location.href.split("?")[0] + "?facets=" + this.facetVal[0].id;
      } else if (this.facetVal.length > 0) {
        if (window.location.href.indexOf("?") > -1) {
          if (window.location.href.indexOf("Leave") > -1) {
            window.location.href =
              window.location.href + "&facets=" + this.facetVal[0].id;
          } else {
            window.location.href =
              window.location.href + "%2C" + this.facetVal[0].id;
          }
        } else {
          window.location.href =
            window.location.href + "?facets=" + this.facetVal[0].id;
        }
      }
    },
    isSelected(facetValueId) {
      return (
        this.selectedFacets.findIndex(
          (selectedFacet) => selectedFacet.id === facetValueId
        ) > -1
      );
    },
  },
  mounted() {
    if (window.location.href.indexOf("Leave") > -1) {
      this.error = true;
    }
  },
};
</script>
