
<template>
  <div
    class="dropdown-container row"
    id="seachCategoriesDropdown"
    :class="additionalClass"
  >
    <!-- device name input -->

    <div class="row">
      <div class="input-field col">
        <input
          v-model="deviceName"
          id="device-name-input"
          type="text"
          placeholder="Gerätename eingeben..."
          required
        />
      </div>
      <div class="col">
        <div
          class="dropdown"
          :class="{ open: showDropdown.device }"
          @click="toggleDropdown('device')"
        >
          <div class="dropdown-selected">
            {{
              selectedDevice
                ? selectedDevice.lang.de.name
                : "1.Produktkategorie wählen"
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
                : "2.Hersteller wählen"
            }}
          </div>
          <transition name="slide-fade">
            <div
              class="dropdown-options"
              v-if="showDropdownComp.hersteller && selectedModel === null"
            >
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
            {{ selectedModel ? selectedModel.lang.de.name : "3.Modell wählen" }}
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
      </div>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-primary"
        :disabled="!isFormValid"
        @click="handleUpdateDevice"
      >
        Eingabe speichern
      </button>
    </div>

    <div v-if="!isFormValid" class="alert alert-danger" role="alert">
      Bitte wählen Sie alle Felder vor dem Speichern aus!
    </div>

    <div v-if="isUpdateSuccessful" class="alert alert-success" role="alert">
      Aktualisierung erfolgreich!
    </div>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  name: "device-edit-popup",
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
    disableSearch: {
      type: Boolean,
      required: false,
      default: false,
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
      isUpdateSuccessful: false,
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
    handleUpdateDevice() {
      if (!this.isFormValid) {
        return;
      }
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

      axios
        .put(
          `https://ma-versand.webimpact.app/api/${payload.plenty_customer_id}/my-devices/${this.initialDeviceId}`,
          payload
        )
        .then((response) => {
          console.log(response.data);
          this.isUpdateSuccessful = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.$emit("update-device");
        });
    },
  },
  computed: {
    isFormValid() {
      return (
        this.selectedDevice &&
        this.selectedHersteller &&
        this.selectedModel &&
        this.deviceName
      );
    },
    selectOptions() {
      return {
        device: this.selectedDevice,
        hersteller: this.selectedHersteller,
        modal: this.selectedModel,
      };
    },
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