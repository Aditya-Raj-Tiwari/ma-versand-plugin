
<template>
  <div
    class="dropdown-container"
    id="seachCategoriesDropdown"
    :class="additionalClass"
  >
    <div
      class="dropdown"
      :class="{ open: showDropdown.device }"
      @click="toggleDropdown('device')"
      v-if="$props.initialDeviceId === null"
    >
      <div class="dropdown-selected">
        {{
          selectedDevice
            ? selectedDevice.lang.de.name
            : "Produktkategorie wählen"
        }}
      </div>
      <transition name="slide-fade">
        <div class="dropdown-options" v-if="showDropdownComp.device">
          <input
            v-model="deviceSearch"
            type="text"
            placeholder="Produkt suchen..."
            @click.stop
          />
          <div
            class="dropdown-option"
            v-for="device in filteredDevices"
            :key="device.id"
            @click="selectDevice(device)"
          >
            {{ device.lang.de.name }}
          </div>
        </div>
      </transition>
    </div>

    <!-- hersteller dropdown -->
    <div
      class="dropdown"
      @click="toggleDropdown('hersteller')"
      :class="{ open: showDropdown.hersteller, disabled: !selectedDevice }"
    >
      <div class="dropdown-selected">
        {{
          selectedHersteller
            ? selectedHersteller.lang.de.name
            : "Hersteller wählen"
        }}
      </div>
      <transition name="slide-fade">
        <div class="dropdown-options" v-if="showDropdownComp.hersteller">
          <input
            v-model="herstellerSearch"
            type="text"
            placeholder="Hersteller suchen..."
            @click.stop
          />
          <div
            class="dropdown-option"
            v-for="hersteller in filteredHerstellers"
            :key="hersteller.id"
            @click="selectHersteller(hersteller)"
          >
            {{ hersteller.lang.de.name }}
          </div>
        </div>
      </transition>
    </div>

    <!-- model dropdown -->
    <div
      class="dropdown"
      @click="toggleDropdown('model')"
      :class="{ open: showDropdown.model, disabled: !selectedHersteller }"
    >
      <div class="dropdown-selected">
        {{ selectedModel ? selectedModel.lang.de.name : "Modell wählen" }}
      </div>
      <transition name="slide-fade">
        <div
          class="dropdown-options"
          v-if="showDropdownComp.model && selectedModel === null"
        >
          <input
            v-model="modelSearch"
            type="text"
            placeholder="Model suchen..."
            @click.stop
          />
          <div
            class="dropdown-option"
            v-for="model in filteredModels"
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
      <button class="btn btn-lg btn-primary" :disabled="!selectedModel">
        Ersatzteil suchen
      </button>
    </a>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "new-comp",
  props: {
    initialDeviceId: {
      type: Number,
      required: false,
      default: null,
    },
    additionalClass: {
      type: String,
      required: false,
      default: "",
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
      deviceSearch: "",
      herstellerSearch: "",
      modelSearch: "",
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
      if (
        (this.isDeviceDisabled && dropdown === "device") ||
        (dropdown === "hersteller" && !this.selectedDevice) ||
        (dropdown === "model" && !this.selectedHersteller)
      ) {
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
    sanitizeInput(input) {
      return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
  },
  computed: {
    showDropdownComp() {
      return this.showDropdown;
    },
    filteredDevices() {
      let regex = new RegExp(this.sanitizeInput(this.deviceSearch), "i");
      return this.devices.filter((device) =>
        regex.test(this.sanitizeInput(device.lang.de.name))
      );
    },
    filteredHerstellers() {
      let regex = new RegExp(this.sanitizeInput(this.herstellerSearch), "i");
      return this.herstellers.filter((hersteller) =>
        regex.test(this.sanitizeInput(hersteller.lang.de.name))
      );
    },
    filteredModels() {
      let regex = new RegExp(this.sanitizeInput(this.modelSearch), "i");
      return this.models.filter((model) =>
        regex.test(this.sanitizeInput(model.lang.de.name))
      );
    },
  },
};
</script>


  
  
  
  
    