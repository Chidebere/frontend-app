import axios from "axios";

export default {
  namespaced: true,

  state: {
    UserData: null
  },

  getters: {
    adminUser: state => state.UserData
  },

  mutations: {
    setUserData(state, adminUser) {
      state.UserData = adminUser;
    }
  },

  actions: {
    getUserData({ commit }) {
      axios
        .get(process.env.VUE_APP_API_URL + "admin_user")
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          localStorage.removeItem("AdminAuthToken");
        });
    },
    sendAdminLoginRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_API_URL + "admin_login", data)
        .then(response => {
          console.log(response);
          commit("setUserData", response.data.user);
          localStorage.setItem("AdminAuthToken", response.data.token);
        });
    },
    sendCreateUserRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_API_URL + "allusers", data)
        .then(response => {
          commit("setUserData", response.data.user);
          // localStorage.setItem("AdminAuthToken", response.data.token);
        });
    },
    
    sendAdminLogoutRequest({ commit }) {
      axios.post(process.env.VUE_APP_API_URL + "admin_logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("AdminAuthToken");
      });
    }
  }
};
