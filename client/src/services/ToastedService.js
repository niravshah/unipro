import Vue from "vue";

export default {
  showInfo (message, time, action) {

    var params = {
      icon: "info",
      type: "info",
      duration: time
    };

    if (action) {
      params['action'] = action;
    }

    Vue.toasted.show(message, params);
  },
  showError(message, time){
    Vue.toasted.show(message, {
      icon: "error",
      type: "error",
      duration: time
    });
  }
}
