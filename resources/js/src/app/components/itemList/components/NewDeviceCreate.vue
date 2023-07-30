<template>
  <div class="dropdown-container" id="seachCategoriesDropdown">
    <h1>Neues Gerät anlegen</h1>
    <p>
      Geben Sie eine individuelle Gerätebezeichung an, wählen Sie ihr Gerät aus
      der Liste und speichern Sie anschließend. So können Sie beim nächsten Mal
      bequem nach Ersatzteilen für Ihre Maschine suchen.
    </p>

    <hr />
    <div class="row" selection-section>
      <div class="col">
        <input
          v-model="deviceName"
          type="text"
          placeholder="Gerätename eingeben..."
        />
      </div>
      <div class="col">
        <!-- device dropdown -->
        <div
          class="dropdown"
          :class="{ open: showDropdown.device }"
          @click="toggleDropdown('device')"
        >
          <div class="dropdown-selected">
            {{
              selectedDevice
                ? selectedDevice.lang.de.name
                : "Please select a device"
            }}
          </div>
          <transition name="slide-fade">
            <div class="dropdown-options" v-if="showDropdownComp.device">
              <input
                v-model="deviceSearch"
                type="text"
                placeholder="Search devices..."
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
                : "Please select a Hersteller"
            }}
          </div>
          <transition name="slide-fade">
            <div class="dropdown-options" v-if="showDropdownComp.hersteller">
              <input
                v-model="herstellerSearch"
                type="text"
                placeholder="Search herstellers..."
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
            {{
              selectedModel
                ? selectedModel.lang.de.name
                : "Please select a Model"
            }}
          </div>
          <transition name="slide-fade">
            <div
              class="dropdown-options"
              v-if="showDropdownComp.model && selectedModel === null"
            >
              <input
                v-model="modelSearch"
                type="text"
                placeholder="Search models..."
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
      </div>
    </div>
    <button
      class="btn btn-lg btn-primary"
      :disabled="!selectedModel"
      @click="saveDevice"
    >
      Speichern
    </button>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "new-device-create",
  props: {
    initialDeviceId: {
      type: Number,
      required: false,
      default: null,
    },
    reloadData: {
      required: false,
    },
    userId: {
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
      deviceSearch: "",
      herstellerSearch: "",
      modelSearch: "",
      deviceName: "",
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
      console.log("edit modal");
    },
    sanitizeInput(input) {
      return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    async saveDevice() {
      const payload = {
        lang: "de",
        plenty_customer_id: this.$props.userId,
        device_name: this.deviceName || "Unbekannt",
        device_type_cat_id: this.selectedDevice.id,
        device_brand_cat_id: this.selectedHersteller.id,
        device_model_cat_id: this.selectedModel.id,
        device_type_cat_name: this.selectedDevice.lang.de.name,
        device_brand_cat_name: this.selectedHersteller.lang.de.name,
        device_model_cat_name: this.selectedModel.lang.de.name,
        device_accessories_url: this.selectedModel.lang.de.url,
      };

      try {
        await axios.post(
          `https://ma-versand.webimpact.app/api/${this.$props.userId}/my-devices`,
          payload
        );
        this.reloadData();
        this.selectedDevice = null;
        this.selectedHersteller = null;
        this.selectedModel = null;
        this.showDropdown.model = false;
      } catch (error) {
        console.error("Error saving device:", error);
      }
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
  