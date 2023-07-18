(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "category-image-carousel",
  props: {
    imageUrlsData: {
      type: Array
    },
    itemUrl: {
      type: String
    },
    alt: {
      type: String
    },
    title: {
      type: String
    },
    showDots: {
      type: Boolean,
      default: App.config.item.categoryShowDots
    },
    showNav: {
      type: Boolean,
      default: App.config.item.categoryShowNav
    },
    disableLazyLoad: {
      type: Boolean,
      default: false
    },
    disableCarouselOnMobile: {
      type: Boolean
    },
    enableCarousel: {
      type: Boolean
    },
    template: {
      type: String
    }
  },
  data: function data() {
    return {
      $_enableCarousel: false
    };
  },
  computed: {
    imageUrls: function imageUrls() {
      return this.imageUrlsData;
    }
  },
  mounted: function mounted() {
    var _this = this;
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;
    this.$data.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;
    this.$nextTick(function () {
      if (_this.$data.$_enableCarousel) {
        _this.initializeCarousel();
      }
    });
  },
  methods: {
    initializeCarousel: function initializeCarousel() {
      var _this2 = this;
      $("#owl-carousel-" + this._uid).owlCarousel({
        dots: !!this.showDots,
        items: 1,
        mouseDrag: false,
        loop: this.imageUrls.length > 1,
        lazyLoad: !this.disableLazyLoad,
        margin: 10,
        nav: !!this.showNav,
        navText: ["<i id=\"owl-nav-text-left-".concat(this._uid, "\" class='fa fa-chevron-left' aria-hidden='true'></i>"), "<i id=\"owl-nav-text-right-".concat(this._uid, "\" class='fa fa-chevron-right' aria-hidden='true'></i>")],
        onTranslated: function onTranslated(event) {
          var element = event.target.querySelector(".owl-item.active img");
          if (element && element.dataset.src && !element.src) {
            element.src = element.dataset.src;
            element.removeAttribute("data-src");
          }
        },
        onInitialized: function onInitialized(event) {
          if (_this2.showNav) {
            document.querySelector("#owl-nav-text-left-".concat(_this2._uid)).parentElement.onclick = function (event) {
              return event.preventDefault();
            };
            document.querySelector("#owl-nav-text-right-".concat(_this2._uid)).parentElement.onclick = function (event) {
              return event.preventDefault();
            };
          }
        }
      });
    },
    getAltText: function getAltText(image) {
      var alt = image && image.alternate ? image.alternate : this.alt;
      return alt;
    },
    getTitleText: function getTitleText(image) {
      var title = image && image.name ? image.name : this.title;
      return title;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-store-special",
  props: ["storeSpecial", "recommendedRetailPrice", "variationRetailPrice", "specialOfferPrice", "decimalCount", "bundleType", "itemType"],
  data: function data() {
    return {
      tagClass: "",
      label: "",
      tagClasses: {
        1: "badge-offer badge-danger",
        2: "badge-new badge-primary",
        3: "badge-top badge-success",
        default: "badge-success",
        itemBundle: "badge badge-bundle bg-info",
        itemSet: "badge badge-dark"
      },
      labels: {
        1: this.$translate("Ceres::Template.storeSpecialOffer"),
        2: this.$translate("Ceres::Template.storeSpecialNew"),
        3: this.$translate("Ceres::Template.storeSpecialTop")
      }
    };
  },
  computed: {
    hasLabel: function hasLabel() {
      return this.label && this.label !== "";
    },
    isBundle: function isBundle() {
      return this.bundleType === "bundle";
    },
    isSet: function isSet() {
      return this.itemType === "set";
    }
  },
  created: function created() {
    this.initializeStoreSpecial();
  },
  methods: {
    initializeStoreSpecial: function initializeStoreSpecial() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.storeSpecial)) {
        this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
      } else {
        this.tagClass = this.tagClasses.default;
      }
      this.label = this.getLabel();
    },
    getLabel: function getLabel() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.storeSpecial) && this.storeSpecial.id === 1 && !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.recommendedRetailPrice)) {
        return this.getPercentageSale();
      }
      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.storeSpecial)) {
        return "";
      }
      return this.labels[this.storeSpecial.id] || this.storeSpecial.names.name;
    },
    getPercentageSale: function getPercentageSale() {
      var percent;
      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this.specialOfferPrice)) {
        percent = (1 - this.specialOfferPrice.unitPrice.value / this.variationRetailPrice.unitPrice.value) * -100;
      } else {
        percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value) * -100;
      }
      if (percent < 0) {
        return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
      }
      return "";
    }
  },
  watch: {
    storeSpecial: function storeSpecial() {
      this.initializeStoreSpecial();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.$data.$_enableCarousel ? _c("a", {
    staticClass: "owl-carousel owl-theme",
    attrs: {
      id: "owl-carousel-" + _vm._uid,
      href: _vm.itemUrl,
      role: "listbox",
      "aria-label": _vm.$translate("Ceres::Template.itemImageCarousel")
    }
  }, _vm._l(_vm.imageUrls, function (imageUrl, index) {
    return _c("div", {
      key: index
    }, [index === 0 && !_vm.disableLazyLoad ? _c("lazy-img", {
      ref: "itemLazyImage",
      refInFor: true,
      attrs: {
        "picture-class": "img-fluid",
        "image-url": imageUrl.url,
        alt: _vm.getAltText(imageUrl),
        title: _vm.getTitleText(imageUrl),
        role: "option"
      }
    }) : index !== 0 && !_vm.disableLazyLoad ? _c("img", {
      staticClass: "img-fluid owl-lazy",
      attrs: {
        "data-src": imageUrl.url,
        alt: _vm.getAltText(imageUrl),
        title: _vm.getTitleText(imageUrl),
        role: "option"
      }
    }) : _c("img", {
      staticClass: "img-fluid",
      attrs: {
        src: imageUrl.url,
        alt: _vm.getAltText(imageUrl),
        title: _vm.getAltText(imageUrl),
        role: "option"
      }
    })], 1);
  }), 0) : _c("a", {
    attrs: {
      href: _vm.itemUrl
    }
  }, [!_vm.disableLazyLoad ? _c("lazy-img", {
    ref: "itemLazyImage",
    attrs: {
      "picture-class": "img-fluid",
      "image-url": _vm._f("itemImage")(_vm.imageUrls),
      alt: _vm.getAltText(_vm.imageUrls[0]),
      title: _vm.getTitleText(_vm.imageUrls[0])
    }
  }) : _c("img", {
    staticClass: "img-fluid",
    attrs: {
      src: _vm._f("itemImage")(_vm.imageUrls),
      alt: _vm.getAltText(_vm.imageUrls[0]),
      title: _vm.getTitleText(_vm.imageUrls[0])
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.hasLabel || _vm.isBundle || _vm.isSet ? _c("div", {
    staticClass: "special-tags p-2"
  }, [_vm.hasLabel ? _c("span", {
    staticClass: "badge",
    class: _vm.tagClass
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n    ")]) : _vm.isBundle ? _c("span", {
    class: _vm.tagClasses.itemBundle
  }, [_vm._v("\n        " + _vm._s(_vm.$translate("Ceres::Template.itemBundle")) + "\n    ")]) : _vm.isSet ? _c("span", {
    class: _vm.tagClasses.itemSet
  }, [_vm._v("\n        " + _vm._s(_vm.$translate("Ceres::Template.itemSet")) + "\n    ")]) : _vm._e()]) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryImageCarousel.vue?vue&type=template&id=62e5025e& */ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&");
/* harmony import */ var _CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryImageCarousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/CategoryImageCarousel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CategoryImageCarousel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CategoryImageCarousel.vue?vue&type=template&id=62e5025e& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/ItemStoreSpecial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/helper/getSlotData.js":
/*!****************************************************!*\
  !*** ./resources/js/src/app/helper/getSlotData.js ***!
  \****************************************************/
/*! exports provided: getSlotData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlotData", function() { return getSlotData; });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Return a getter function to read json formatted data from a slot of the component.
 * This can be used to create a dynamic property for a vue component returning the parsed
 * json data from the given slot.
 * Once the data have been parsed, the result is stored on the vm options to avoid parsing the slot again.
 *
 * @param string slotKey The identifier of the slot to parse json data from
 */
function getSlotData(slotKey) {
  return function (vm) {
    vm.$options.slotData = vm.$options.slotData || {};
    if (!vm.$options.slotData.hasOwnProperty(slotKey) && vm.$slots.hasOwnProperty(slotKey)) {
      var slotNode = vm.$slots[slotKey][0];
      if (slotNode.elm) {
        vm.$options.slotData[slotKey] = JSON.parse(slotNode.elm.textContent);
      } else {
        vm.$options.slotData[slotKey] = JSON.parse(slotNode.text);
      }
    }
    return vm.$options.slotData[slotKey];
  };
}

/***/ })

}]);
//# sourceMappingURL=ceres-2.js.map