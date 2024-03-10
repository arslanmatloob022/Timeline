<template>
  <div>
    <div
      class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li v-if="this.$store.state.user.role == 'admin'" class="nav-item">
          <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
            <template #icon>
              <shop />
            </template>
          </sidenav-collapse>
        </li>
        <li
          v-if="
            this.$store.state.user.role == 'admin' ||
            this.$store.state.user.role == 'manager'
          "
          class="nav-item"
        >
          <sidenav-collapse navText="Projects" :to="{ name: 'Projects' }">
            <template #icon>
              <office />
            </template>
          </sidenav-collapse>
        </li>

        <!-- <li class="nav-item" v-if="this.$store.state.user.role == 'admin'">
          <sidenav-collapse
            navText="Projects Timeline"
            :to="{ name: 'Timeline' }"
          >
            <template #icon>
              <MultiUsers />
            </template>
          </sidenav-collapse>
        </li> -->
        <li class="nav-item" v-if="this.$store.state.user.role == 'admin'">
          <sidenav-collapse navText="Managers" :to="{ name: 'Managers' }">
            <template #icon>
              <credit-card />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item" v-if="this.$store.state.user.role == 'worker'">
          <sidenav-collapse navText="My Tasks" :to="{ name: 'WorkerTasks' }">
            <template #icon>
              <credit-card />
            </template>
          </sidenav-collapse>
        </li>

        <li
          class="nav-item"
          v-if="
            this.$store.state.user.role == 'admin' ||
            this.$store.state.user.role == 'manager'
          "
        >
          <sidenav-collapse navText="Workers" :to="{ name: 'Workers' }">
            <template #icon>
              <customer-support />
            </template>
          </sidenav-collapse>
        </li>

        <li class="nav-item">
          <sidenav-collapse navText="Profile" :to="{ name: 'Profile' }">
            <template #icon>
              <settings />
            </template>
          </sidenav-collapse>
        </li>

        <li class="nav-item">
          <div @click="handleLogout" class="nav-link" v-bind="$attrs">
            <div
              class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
              :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
            >
              <spaceship />
            </div>
            <span
              class="nav-link-text"
              :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
              >Logout</span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";
import Settings from "../../components/Icon/Settings.vue";
// import MultiUsers from "../../components/Icon/MultiUsers.vue";
export default {
  name: "SidenavList",
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
    // MultiUsers,
    Shop,
    Office,
    CreditCard,
    CustomerSupport,
    Spaceship,
    Settings,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    handleLogout() {
      this.$store.commit("logout");
      this.$router.push("/");
      this.$notify({
        type: "error",
        title: "Logged out!",
        text: "Thanks for working with use!",
      });
    },
  },
};
</script>
