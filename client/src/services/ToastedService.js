import Vue from "vue";

export default {
  showInfo (message, time) {
    Vue.toasted.show(message, {
      icon: "info",
      type: "info",
      duration: 6000
    });
  },
  showError(message, time){
    Vue.toasted.show(message, {
      icon: "error",
      type: "error",
      duration: time
    });
  }
}
