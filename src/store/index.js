import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { String } from "core-js/js";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
    notification: null,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || {
      id: "",
      is_superuser: Boolean,
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      username: "",
      password: "",
      avatar: null | File | String,
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },

    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout(state) {
      state.token = null;
      state.user = {
        id: "",
        is_superuser: false,
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        username: "",
        password: "",
        avatar: null,
      };
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },

    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },

    sidebarType(state, payload) {
      state.isTransparent = payload;
    },

    cardBackground(state, payload) {
      state.color = payload;
    },

    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },

    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },

    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },

    setNotification(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    showNotification({ commit }, notification) {
      commit("setNotification", notification);
      setTimeout(() => {
        commit("setNotification", null);
      }, notification.duration || 3000);
    },
  },
  getters: {},
});
