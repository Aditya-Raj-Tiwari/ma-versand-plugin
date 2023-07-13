<template>
  <div>
    <i class="fa fa-info-circle" @click="showInfo = !showInfo"></i>
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
                class="btn btn-secondary"
                @click="showInfo = false"
              >
                Close
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