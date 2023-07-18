
<template>
  <div class="dropdown-container" id="seachCategoriesDropdown">
    <div class="dropdown" @click="toggleDropdown('device')">
      <div class="dropdown-selected">
        {{
          selectedDevice
            ? selectedDevice.lang.de.name
            : "Please select a device"
        }}
      </div>
      <transition name="slide-fade">
        <div class="dropdown-options" v-if="showDropdownComp.device">
          <div
            class="dropdown-option"
            v-for="device in devices"
            :key="device.id"
            @click="selectDevice(device)"
          >
            {{ device.lang.de.name }}
          </div>
        </div>
      </transition>
    </div>
    <div
      class="dropdown"
      @click="toggleDropdown('hersteller')"
      :class="{ disabled: !selectedDevice }"
    >
      <div class="dropdown-selected">
        {{
          selectedHersteller
            ? selectedHersteller.lang.de.name
            : "Please select a Hersteller"
        }}
      </div>
      <transition name="slide-fade">
        <div class="dropdown-options" v-if="showDropdownComp.hersteller">
          <div
            class="dropdown-option"
            v-for="hersteller in herstellers"
            :key="hersteller.id"
            @click="selectHersteller(hersteller)"
          >
            {{ hersteller.lang.de.name }}
          </div>
        </div>
      </transition>
    </div>
    <div
      class="dropdown"
      @click="toggleDropdown('model')"
      :class="{ disabled: !selectedHersteller }"
    >
      <div class="dropdown-selected">
        {{
          selectedModel ? selectedModel.lang.de.name : "Please select a Model"
        }}
      </div>
      <transition name="slide-fade">
        <div
          class="dropdown-options"
          v-if="showDropdownComp.model && selectedModel === null"
        >
          <div
            class="dropdown-option"
            v-for="model in models"
            :key="model.id"
            @click="selectModel(model)"
          >
            {{ model.lang.de.name }}
          </div>
        </div>
      </transition>
    </div>
    <a
      :href="selectedModel ? selectedModel.lang.de.url : '#'"
      rel="noopener noreferrer"
    >
      <button :disabled="!selectedModel">Suche</button>
    </a>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "SearchCategories",
  props: {
    initialDeviceId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      devices: [],
      herstellers: [],
      models: [],
      selectedDevice: null,
      selectedHersteller: null,
      selectedModel: null,
      showDropdown: {
        device: false,
        hersteller: false,
        model: false,
      },
      isDeviceDisabled: false,
    };
  },
  async created() {
    const { data } = await axios.get(
      "https://ma-versand.webimpact.app/api/categories/json/root"
    );
    this.devices = data;

    if (this.initialDeviceId) {
      const initialDevice = this.devices.find(
        (device) => device.id === this.initialDeviceId
      );
      if (initialDevice) {
        this.selectedDevice = initialDevice;
        this.isDeviceDisabled = true;
        const { data } = await axios.get(
          `https://ma-versand.webimpact.app/api/categories/json/${this.initialDeviceId}`
        );
        this.herstellers = data;
      }
    }
  },
  methods: {
    toggleDropdown(dropdown) {
      if (this.isDeviceDisabled && dropdown === "device") {
        return;
      }
      this.showDropdown[dropdown] = !this.showDropdown[dropdown];
    },
    resetHerstellerAndModel() {
      this.herstellers = [];
      this.models = [];
      this.selectedHersteller = null;
      this.selectedModel = null;
    },
    async selectDevice(device) {
      if (this.isDeviceDisabled) {
        return;
      }
      if (this.selectedDevice === device) {
        this.resetHerstellerAndModel();
        this.selectedDevice = null;
      } else {
        this.selectedDevice = device;
        const { data } = await axios.get(
          `https://ma-versand.webimpact.app/api/categories/json/${device.id}`
        );
        this.herstellers = data;
        this.models = [];
        this.selectedModel = null;
      }
      this.showDropdown.device = false;
      this.showDropdown.hersteller = false;
      this.showDropdown.model = false;
    },
    resetModels() {
      this.models = [];
      this.selectedModel = null;
    },
    async selectHersteller(hersteller) {
      if (this.selectedHersteller === hersteller) {
        this.resetModels();
        this.selectedHersteller = null;
      } else {
        this.selectedHersteller = hersteller;
        const { data } = await axios.get(
          `https://ma-versand.webimpact.app/api/categories/json/${hersteller.id}`
        );
        this.models = data;
        this.selectedModel = null;
      }
      this.showDropdown.hersteller = false;
      this.showDropdown.model = false;
    },
    selectModel(model) {
      this.selectedModel = this.selectedModel === model ? null : model;
      this.showDropdown.model = false;
    },
  },
  computed: {
    showDropdownComp() {
      return this.showDropdown;
    },
  },
};
</script>
  

  
  
  
  
    