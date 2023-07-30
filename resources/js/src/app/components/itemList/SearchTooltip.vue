<template>
  <div class="search-tool-tip-modal">
    <div class="overlay" v-if="showInfo"></div>
    <button class="enable-search-tooltip btn" @click="showInfo = !showInfo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6b6c6c"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </button>
    <transition name="fade">
      <div class="modal show" v-if="showInfo">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-sm-12">
                    <img
                      src="https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/pexels-lil-artsy-1192333.jpg"
                      alt="Info image"
                    />
                  </div>
                  <div class="col-lg-6 col-sm-12">
                    <h2>Suchbeispiele</h2>
                    <p>
                      Unsere Suchfunktionen bieten Ihnen verschiedene
                      Möglichkeiten zum gewünschten Ergebnis zu kommen.
                    </p>
                    <dl>
                      <dt>Marke mit Modell</dt>
                      <dd>“Dexter HCM450B”</dd>
                      <dt>Art. ID.</dt>
                      <dd>6534990</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-close"
                @click="showInfo = false"
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
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
  
  <script>
export default {
  name: "search-tooltip",
  data() {
    return {
      showInfo: false,
    };
  },
};
</script>