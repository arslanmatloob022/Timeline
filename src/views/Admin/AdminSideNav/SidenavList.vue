<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li @click="selectComponent('Dashboard')" class="nav-item">
        <div
          class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
          :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
        >
          <slot name="icon"></slot>
        </div>
        <span
          class="nav-link-text"
          :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
          >{{ navText }}</span
        >
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
  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
      route="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
      label="Documentation"
      icon="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div> -->
</template>
<script lang="js">
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Office from "@/components/Icon/Office.vue";
// import CreditCard from "@/components/Icon/CreditCard.vue";
import Box3d from "@/components/Icon/Box3d.vue";
import CustomerSupport from "@/components/Icon/CustomerSupport.vue";
import Document from "@/components/Icon/Document.vue";
import Spaceship from "@/components/Icon/Spaceship.vue";
import Settings from "@/components/Icon/Settings.vue";

export default {
  // name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Office,
    // CreditCard,
    Box3d,
    CustomerSupport,
    Document,
    Spaceship,
    Settings,
  },
  methods: {
    selectComponent(componentName) {
          this.$emit('selectComponent', componentName);
          console.log('calling'+ componentName)
        },
  },
};
</script>
