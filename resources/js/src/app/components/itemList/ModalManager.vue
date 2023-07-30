
<template>
  <div class="modal-manager-container">
    <div v-if="userInfo !== null">
      <new-device-create :reloadData="loadData" :userId="userInfo.id" />
      <show-devices ref="showDevicesRef" :userId="userInfo.id" />
    </div>
    <div v-else><h1>Please login to continue</h1></div>
  </div>
</template>
  <script>
import axios from "axios";
import NewDeviceCreate from "./components/NewDeviceCreate.vue";
import ShowDevices from "./components/ShowDevices.vue";
import { mapState } from "vuex";

export default {
  name: "modal-manager",
  props: {
    initialDeviceId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  components: {
    "new-device-create": NewDeviceCreate,
    ShowDevices,
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
      customerId: null,
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
    loadData() {
      this.$refs.showDevicesRef.loadData();
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
    ...mapState({
      userInfo: (state) => state.user.userData,
    }),
  },
};
</script>
  
    
      