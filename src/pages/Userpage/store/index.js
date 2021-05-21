import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import createpersistedstate from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[createpersistedstate ()],
  state: {
    errors: []
  },

  getters: {
    errors: state => state.errors
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    }
  },

  actions: {},

  modules: {
    auth
  }
});
