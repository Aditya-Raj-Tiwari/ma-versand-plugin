<template>
  <div ref="mfp" class="white-popup mfp-hide">
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <img
          src="https://cdn02.plentymarkets.com/ocqgl0v083vy/frontend/website_relaunch/newsletter/newsletter-image.jpg"
          alt="newsletter popup"
        />
      </div>
      <div class="col-lg-6 col-sm-12">
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <form
          ref="newsletterForm"
          :id="'newsletter-input-form_' + _uid"
          method="post"
          @submit.prevent="validateData"
        >
          <div class="row">
            <div class="col-6" v-if="showNameInputs">
              <div class="input-unit" data-validate="!regex">
                <label :for="'first-name-input_' + _uid">{{
                  $translate("Ceres::Template.newsletterFirstName")
                }}</label>
                <input
                  type="text"
                  data-validate-ref="/[.:\/\d]/g"
                  :id="'first-name-input_' + _uid"
                  v-model="firstName"
                  data-testing="nl-first-name"
                />
              </div>
            </div>
            <div class="col-6 pl-0" v-if="showNameInputs">
              <div class="input-unit" data-validate="!regex">
                <label :for="'last-name-input_' + _uid">{{
                  $translate("Ceres::Template.newsletterLastName")
                }}</label>
                <input
                  type="text"
                  data-validate-ref="/[.:\/\d]/g"
                  :id="'last-name-input_' + _uid"
                  v-model="lastName"
                  data-testing="nl-last-name"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-unit" data-validate="mail">
                  <label :for="'email-input-id_' + _uid"
                    >{{ $translate("Ceres::Template.newsletterEmail") }}
                    {{
                      $translate("Ceres::Template.newsletterIsRequiredFootnote")
                    }}</label
                  >
                  <input
                    @focus="loadRecaptcha = true"
                    type="email"
                    autocomplete="email"
                    :id="'email-input-id_' + _uid"
                    v-model="email"
                    data-testing="nl-mail"
                  />
                </div>
                <input
                  autocomplete="none"
                  class="honey"
                  type="text"
                  name="username"
                  tabindex="-1"
                  v-model="honeypot"
                />
              </div>
            </div>

            <div class="col-12" v-if="showPrivacyPolicyCheckbox">
              <div class="form-check small" data-validate>
                <input
                  type="checkbox"
                  class="form-check-input"
                  :id="'privacy-policy-accept-id_' + _uid"
                  name="privacy-policy-accept"
                  v-model="privacyPolicyValue"
                  data-testing="nl-policy"
                />
                <label
                  :for="'privacy-policy-accept-id_' + _uid"
                  class="form-check-label"
                  v-html="privacyPolicyText"
                ></label>
              </div>
            </div>

            <div class="col-12 mt-3">
              <div class="input-group-btn">
                <button
                  type="button"
                  class="btn btn-block btn-primary btn-appearance"
                  @click="validateData"
                  :disabled="isDisabled"
                  :class="buttonSizeClass"
                  data-testing="nl-send"
                >
                  {{
                    $translate("Ceres::Template.newsletterSubscribeButtonLabel")
                  }}
                </button>
              </div>
            </div>

            <div class="col-12 text-left small mt-2">
              {{ $translate("Ceres::Template.newsletterIsRequiredFootnote") }}
              {{ $translate("Ceres::Template.newsletterIsRequired") }}
            </div>
          </div>
          <recaptcha
            v-if="!!$ceres.config.global.googleRecaptchaApiKey && loadRecaptcha"
          ></recaptcha>
        </form>

        <p class="text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <button @click="closePopup" class="close-button">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ApiService from "../../services/ApiService";
import NotificationService from "../../services/NotificationService";
import ValidationService from "../../services/ValidationService";
import { executeReCaptcha } from "../../helper/executeReCaptcha";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

export default {
  name: "newsletter-pop-up",
  mixins: [ButtonSizePropertyMixin],

  props: {
    showNameInputs: {
      type: Boolean,
      default: false,
    },
    showPrivacyPolicyCheckbox: {
      type: Boolean,
      default: true,
    },
    emailFolder: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      isDisabled: false,
      privacyPolicyValue: false,
      honeypot: "",
      loadRecaptcha: false,
    };
  },
  computed: {
    privacyPolicyText() {
      const link =
        '<a href="' +
        App.urls.privacyPolicy +
        '" target="_blank"><span class="text-primary text-appearance">' +
        this.$translate("Ceres::Template.checkoutPrivacyPolicy", {
          hyphen: "&shy;",
        }) +
        "</span></a>";

      return (
        this.$translate("Ceres::Template.newsletterAcceptPrivacyPolicy", {
          policy: link,
        }) + this.$translate("Ceres::Template.newsletterIsRequiredFootnote")
      );
    },
  },
  methods: {
    validateData() {
      this.isDisabled = true;

      ValidationService.validate($("#newsletter-input-form_" + this._uid))
        .done(() => {
          this.save();
        })
        .fail((invalidFields) => {
          ValidationService.markInvalidFields(invalidFields, "error");

          invalidFields
            .filter((field) => {
              return field.dataset.validate !== null;
            })
            .map((field) => {
              return {
                type: field.dataset.validate,
                name: field.innerText,
              };
            })
            .forEach((field) => {
              if (field.type === "!regex") {
                NotificationService.error(
                  this.$translate(
                    "Ceres::Template.newsletterNotAllowedCharacters",
                    { name: field.name }
                  )
                );
              }
            });

          this.isDisabled = false;
        });
    },

    save() {
      const recaptchaEl = this.$el.querySelector("[data-recaptcha]");

      if (
        App.config.global.googleRecaptchaApiKey &&
        (!window.grecaptcha || !recaptchaEl)
      ) {
        NotificationService.error(
          this.$translate("Ceres::Template.newsletterAcceptRecaptchaCookie")
        );
        this.isDisabled = false;
        return;
      }

      executeReCaptcha(this.$el).then((recaptchaToken) => {
        ApiService.post("/rest/io/customer/newsletter", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          emailFolder: this.emailFolder,
          honeypot: this.honeypot,
          recaptcha: recaptchaToken,
        })
          .done((data) => {
            if (!!data.containsHoneypot) {
              NotificationService.warn(
                this.$translate("Ceres::Template.newsletterHoneypotWarning")
              );
            } else {
              NotificationService.success(
                this.$translate("Ceres::Template.newsletterSuccessMessage")
              ).closeAfter(3000);
            }
            this.resetInputs();
          })
          .fail(() => {
            NotificationService.error(
              this.$translate("Ceres::Template.newsletterErrorMessage")
            ).closeAfter(5000);
          })
          .always(() => {
            this.isDisabled = false;
            this.resetRecaptcha();
          });
      });
    },

    resetInputs() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.privacyPolicyValue = false;
    },

    resetRecaptcha() {
      if (App.config.global.googleRecaptchaVersion === 2 && window.grecaptcha) {
        const recaptchaId = this.$el.querySelector("[data-recaptcha]");

        window.grecaptcha.reset(recaptchaId);
      }
    },
    openPopup() {
      this.$refs.mfp.style.display = "flex";
    },
    closePopup() {
      this.$refs.mfp.style.display = "none";
    },
    initPopup() {
      let lastPopup = localStorage.getItem("lastPopup");
      if (!lastPopup || Date.now() - lastPopup > 86400000) {
        setTimeout(() => {
          this.openPopup();
        }, 5000);
      }
    },
  },
  mounted() {
    this.initPopup();
  },
};
</script>
