<template>
  <div class="device-list">
    <div v-for="device in devices" :key="device.id" class="device-item">
      <div class="device-info">
        <div class="content">
          <h2>{{ device.device_name }}</h2>

          <p><span>Kategorie</span>{{ device.device_type.name }}</p>
          <p>
            <span>Hersteller</span
            >{{
              device.device_brand.name
                ? device.device_brand.name
                : device.fallback.device_brand
            }}
          </p>
          <p>
            <span>Modell</span
            >{{
              device.device_model.name
                ? device.device_model.name
                : device.fallback.device_model
            }}
          </p>
          <a
            :href="
              device.device_model.url
                ? device.device_model.url
                : device.fallback.device_accessories_url
            "
            rel="noopener noreferrer"
          >
            <button class="btn btn-lg btn-primary">Ersatzteil suchen</button>
          </a>
        </div>
      </div>
      <div class="device-actions">
        <button class="btn-edit" @click="editDevice(device.device_id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
          </svg>
        </button>
        <button class="btn-remove" @click="removeDevice(device.device_id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F20000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>

    <div class="overlay" v-if="showModal || deleteDeviceId !== null"></div>

    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
      v-show="showModal"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Gerät bearbeiten</h5>
            <button
              type="button"
              class="close btn-edit"
              @click="closeEditModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <device-edit-popup
              :disableSearch="true"
              :initial-device-id="deviceId"
              @update-device="updateHandler"
              :user-id="$props.userId"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
      v-show="deleteDeviceId !== null"
    >
      <div
        class="modal-dialog modal-dialog-centered delete-modal"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header" style="color: #000000">
            <h5 class="modal-title h1" id="deleteModalLabel">
              Gerät entfernen
            </h5>
            <button
              type="button"
              class="close btn-edit"
              @click="deleteDeviceId = null"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body h6">
            Sind Sie sicher, dass Sie dieses Gerät entfernen möchten?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn delete btn-lg btn-primary"
              @click="confirmRemoveDevice"
            >
              Gerät entfernen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import $ from "jquery";
import DeviceEditPopup from "./DeviceEditPopup.vue";

export default {
  name: "show-devices",
  props: {
    userId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      devices: [],
      showModal: false,
      deviceId: 0,
      deleteDeviceId: null,
    };
  },
  components: {
    "device-edit-popup": DeviceEditPopup,
  },
  created() {
    console.log("show-devices component created");
    this.loadData();
  },
  methods: {
    editDevice(deviceId) {
      this.showModal = true;
      console.log("devices", this.devices);
      console.log(`Editing device with id ${deviceId}`);
      this.deviceId = deviceId;
    },
    removeDevice(deviceId) {
      this.deleteDeviceId = deviceId;
    },
    closeEditModal() {
      this.showModal = false;
    },
    updateHandler() {
      this.showModal = false;
      this.loadData();
    },
    async confirmRemoveDevice() {
      await axios.delete(
        `https://ma-versand.webimpact.app/api/${this.$props.userId}/my-devices/${this.deleteDeviceId}`
      );
      this.deleteDeviceId = null;
      this.loadData();
    },
    async loadData() {
      const { data } = await axios.get(
        `https://ma-versand.webimpact.app/api/${this.$props.userId}/my-devices`
      );
      this.devices = data;
      console.log("devices", this.devices);
    },
  },
};
</script>
  
