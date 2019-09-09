import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import { fb } from "@/firebaseConfig.js";
import VueFirestore from "vue-firestore";

Vue.use(VueFirestore);

window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
import "./assets/scss/app.scss";

Vue.component("Navbar", require("./components/NavBar.vue").default);
Vue.config.productionTip = false;

let app = "";
fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
