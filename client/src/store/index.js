import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

var vuexStore = new Vuex.Store({
  state: {
    count: 0,
    sidebarMinified: false,
    loggedIn: false,
    heading: "Dashboard",
    trustName: "Demo Trust"
  },
  mutations: {
    sidebar(state, val){
      state.sidebarMinified = val;
    },
    setLoggedIn(state){
      state.loggedIn = true;
    },
    heading(state, val){
      state.heading = val;
    },
    trustName(state, val){
      state.trustName = val;
    }
  },
  plugins: [createPersistedState()]
});

export default vuexStore
