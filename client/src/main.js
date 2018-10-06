// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import VueLocalStorage from "vue-localstorage";
import VueJWT from "vuejs-jwt";
import Toasted from "vue-toasted";

import vSelect from "vue-select";
import VueGoodTablePlugin from "vue-good-table";
import vue2Dropzone from "vue2-dropzone";
import JsonExcel from "vue-json-excel";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import VeeValidate from "vee-validate";
import VModal from 'vue-js-modal';

import "vue-good-table/dist/vue-good-table.css";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

import VueTabs from "vue-nav-tabs";
import "vue-nav-tabs/themes/vue-tabs.css";

import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import VueMoment from "vue-moment";



Vue.config.productionTip = false;

Vue.use(VueJWT, {"keyName": "jwt"});
Vue.use(VueLocalStorage, {name: 'ls', bind: true});
Vue.use(Toasted);
Vue.use(VueGoodTablePlugin);
Vue.use(VueTabs);
Vue.use(VeeValidate, {fieldsBagName: 'vvFieldsBag'  });
Vue.use(VueMoment);
Vue.use(VueChartkick, {adapter: Chart});
Vue.use(VModal);

Vue.component('v-select', vSelect);
Vue.component('v-dropzone', vue2Dropzone);
Vue.component('downloadExcel', JsonExcel);
Vue.component('pulse-loader', PulseLoader);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
