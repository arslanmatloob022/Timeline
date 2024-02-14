<template>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="isRTL ? 'me-3 rotate-caret' : 'ms-3'"
    id="sidenav-main"
    style="background-color: #ffffff"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/">
        <img :src="logo" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold">Soft UI Dashboard PRO</span>
      </a>
    </div>

    <hr class="mt-0 horizontal dark" />
    <div
      class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <div
            @click="selectComponent('Dashboard')"
            class="nav-link"
            v-bind="$attrs"
            :class="selectedComponent == 'Dashboard' ? 'isActive' : ''"
          >
            <div
              class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
              :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
              :cardBg="customClass"
            >
              <shop name="icon" />
            </div>
            <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
              >Dashboard</span
            >
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-link" @click="selectComponent('AdminProjects')">
            <div
              class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
              :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
            >
              <office />
            </div>
            <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
              >Projects</span
            >
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-link" @click="selectComponent('ManagersView')">
            <div
              class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
              :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
            >
              <office />
            </div>
            <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
              >Managers</span
            >
          </div>
        </li>

        <li class="nav-item">
          <sidenav-collapse
            navText="Virtual Reality"
            :to="{ name: 'Virtual Reality' }"
          >
            <template #icon>
              <box3d />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="RTL" :to="{ name: 'Rtl' }">
            <template #icon>
              <settings />
            </template>
          </sidenav-collapse>
        </li>
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
            :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
            PAGES
          </h6>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="Profile" :to="{ name: 'Profile' }">
            <template #icon>
              <customer-support />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="Sign In" :to="{ name: 'Sign In' }">
            <template #icon>
              <document />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="Sign Up" :to="{ name: 'Sign Up' }">
            <template #icon>
              <spaceship />
            </template>
          </sidenav-collapse>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import logo from "@/assets/img/logo-ct.png";
import { mapState } from "vuex";
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Office from "@/components/Icon/Office.vue";
// import CreditCard from "@/components/Icon/CreditCard.vue";
import Box3d from "@/components/Icon/Box3d.vue";
import CustomerSupport from "@/components/Icon/CustomerSupport.vue";
import Document from "@/components/Icon/Document.vue";
import Spaceship from "@/components/Icon/Spaceship.vue";
import Settings from "@/components/Icon/Settings.vue";
import Shop from "@/components/Icon/Shop.vue";

export default {
  name: "indexPage",
  components: {
    SidenavCollapse,
    // SidenavCard,
    Office,
    // CreditCard,
    Shop,
    Box3d,
    CustomerSupport,
    Document,
    Spaceship,
    Settings,
  },
  data() {
    return {
      logo,
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      selectedComponent: "Dashboard",
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
    selectComponent(componentName) {
      this.selectedComponent = componentName;
      this.$emit("selectComponent", componentName);
      console.log("calling" + componentName);
    },
  },
};
</script>
<style scoped>
.isActive {
  border: 1px solid black;
}
</style>
