<template>
  <div
    class="card px-4 border-0"
    v-if="shownProperties && shownProperties.length"
  >
    <ul
      class="order-property-list list-unstyled row d-flex justify-content-between p-3 mb-0"
      data-testing="order-property-list"
    >
      <li v-if="dateComp">
        <span class="d-block">
          <strong> Geburtstag : </strong>
          <span>
            <span> {{ dateComp }} </span>
          </span>
        </span>
      </li>
      <order-property-value-list-item
        v-for="property in shownProperties"
        :key="property.propertyId"
        :property="property"
      ></order-property-value-list-item>
    </ul>
  </div>
</template>

<script>
import { isDefined } from "../../helper/utils";
import OrderPropertyValueListItem from "./OrderPropertyValueListItem.vue";

export default {
  name: "order-property-value-list",

  components: {
    OrderPropertyValueListItem,
  },
  props: {
    basketItem: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      date: "",
    };
  },
  computed: {
    shownProperties() {
      let shownProperties = [];

      this.basketItem.variation.data.properties.forEach((property) => {
        const filledProperty = this.basketItem.basketItemOrderParams.find(
          (prop) => {
            return parseInt(prop.propertyId) === property.propertyId;
          }
        );

        if (isDefined(filledProperty)) {
          if (filledProperty.type === "selection") {
            property.property.value =
              property.property.selectionValues[filledProperty.value].name;
          } else {
            property.property.value = filledProperty.value;
          }
        }

        if (
          isDefined(filledProperty) ||
          this.isPropertyWithAdditionalCosts(property)
        ) {
          shownProperties.push(property);
        }
      });
      const requiredPropertyIds = [82, 83, 84];
      const foundProperties = shownProperties.filter((property) =>
        requiredPropertyIds.includes(property.propertyId)
      );
      let dateString = "";

      if (foundProperties.length === 3) {
        foundProperties.sort((a, b) => a.propertyId - b.propertyId);
        dateString = foundProperties
          .map((property) => property.property.value)
          .join(".");
      }
      this.date = dateString;

      const excludedPropertyIds = [2, 3, 4, 9, 82, 83, 84, 70];
      let filteredProp = shownProperties.filter(
        (property) => !excludedPropertyIds.includes(property.propertyId)
      );

      return filteredProp;
    },
    dateComp() {
      return this.date;
    },
  },

  methods: {
    isPropertyWithAdditionalCosts(property) {
      return (
        property.property &&
        property.property.isShownAtCheckout &&
        property.property.isShownAsAdditionalCosts &&
        !property.property.isOderProperty
      );
    },
  },
};
</script>
