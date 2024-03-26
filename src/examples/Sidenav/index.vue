<template>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="isRTL ? 'me-3 rotate-caret' : 'ms-3'"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/">
        <img :src="logo" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold">Ibex Builders Studio</span>
      </a>
      <i
        style="font-size: 18px; right: 0; position: absolute"
        :style="{ color: this.toggledOn ? '#82d616' : '#8392ab' }"
        @click="toggleSidebar"
        class="fa fa-exchange mb-4 mr-4 pointer"
        aria-hidden="true"
      ></i>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="customClass" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/logo/IBEX_FINAL.png";
import { mapState } from "vuex";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "indexView",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      toggledOn: false,
    };
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggledOn = !this.toggledOn;
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
  },
};
</script>
