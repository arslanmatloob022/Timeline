<script>
import { mapMutations, mapActions } from "vuex";
import AdminProjects from "@/views/Admin/AdminProjects.vue";
import AdminSideNav from "@/views/Admin/AdminSideNav";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ManagersView from "./Mangers/ManagersView.vue";
import AdminOwnProjects from "@/views/Admin/Projects/AdminProjects.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

export default {
  name: "adminNavbar",
  data() {
    return {
      selectedComponent: null,
      iconBackground: "bg-gradient-success",
      showMenu: false,
      textWhite: true,
      minNav: true,
      toggleSidebar: true,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  props: [],
  created() {
    this.minNav;
  },
  methods: {
    handleSelectComponent(componentName) {
      this.selectedComponent = componentName;
      console.log("called");
    },

    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),
  },
  components: {
    AdminSideNav,
    AdminProjects,
    AdminOwnProjects,
    MiniStatisticsCard,
    ManagersView,
    // Navbar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  updated() {},
};
</script>
<template>
  <div style="display: flex; flex-direction: column">
    <!-- sidebar -->
    <AdminSideNav
      @selectComponent="handleSelectComponent"
      :custom_class="this.$store.state.mcolor"
      :class="[
        this.$store.state.isTransparent,
        this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
      ]"
      v-if="this.$store.state.showSidenav"
    />

    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
    >
      <!-- Topnavbar -->
      <navbar
        :class="[navClasses]"
        :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
        :minNav="navbarMinimize"
        v-if="this.$store.state.showNavbar"
      />

      <!-- stat boxes -->
      <div class="row container-fluid">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="Total Projects"
            value="153"
            :percentage="{
              value: '+505%',
              color: 'text-success',
            }"
            :icon="{
              component: 'ni ni-money-coins',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="New Projects"
            value="230"
            :percentage="{
              value: '+3%',
              color: 'text-success',
            }"
            :icon="{
              component: ' ni ni-world',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="Completed Projects"
            value="62"
            :percentage="{
              value: '-2%',
              color: 'text-danger',
            }"
            :icon="{
              component: 'ni ni-paper-diploma',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>

        <div class="col-xl-3 col-sm-6 mb-xl-0">
          <mini-statistics-card
            title="Canceled"
            value="0"
            :percentage="{
              value: '+5%',
              color: 'text-success',
            }"
            :icon="{
              component: 'ni ni-cart',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
      </div>

      <AdminOwnProjects />

      <AdminProjects
        v-if="selectedComponent == 'AdminProjects'"
      ></AdminProjects>
      <!-- Managers table -->
      <ManagersView v-if="selectedComponent == 'ManagersView'" />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
