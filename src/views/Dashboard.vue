<template>
  <div class="py-4 container-fluid">
    <!-- states -->
    <div class="row mb-4">
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="All Projects"
          class="pointer"
          @click="this.$router.push('/projects')"
          :value="dashboardStats.all_project"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-building',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/projects')"
          title="Active Projects"
          :value="dashboardStats.active_projects"
          :percentage="{
            value: '+3%',
            color: 'text-success',
          }"
          :icon="{
            component: ' ni ni-bell-55',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/projects')"
          title="Pre Construction Projects"
          :value="dashboardStats.pending_projects"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-building',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/projects')"
          title="Completed Projects"
          :value="dashboardStats.completed_projects"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-building',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/managers')"
          title="Managers"
          :value="dashboardStats.managers"
          :percentage="{
            value: '+5%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-circle-08',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/workers')"
          title="Workers"
          :value="dashboardStats.workers"
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-single-02',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 mb-md-0 mb-4 mt-4">
        <AdminCalenderView></AdminCalenderView>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 mb-md-0 mb-4">
        <dashboard-projects />
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 mb-md-0 mb-4">
        <ManagersVue />
      </div>
    </div> -->
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";

import useApi from "../supportElements/useAPI";
// import ProjectsVue from "../components/models/Projects.vue";
// import ManagersVue from "../components/models/Managers.vue";
import AdminCalenderView from "../components/AdminCalenderView.vue";
// import WorkerCalender from "../components/WorkerCalender.vue";
import DashboardProjects from "../components/models/DashboardProjects.vue";

const api = useApi();
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      loading: false,
      dashboardStats: {
        all_project: 0,
        active_projects: 0,
        pending_projects: 0,
        completed_projects: 0,
        workers: 0,
        managers: 0,
      },
      usersData: [],
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
    };
  },
  components: {
    MiniStatisticsCard,
    // ReportsBarChart,
    // GradientLineChart,
    // TimelineList,
    // TimelineItem,
    // AuthorsTable,
    // ProjectsVue,
    // ManagersVue,
    AdminCalenderView,
    // WorkerCalender,
    DashboardProjects,
  },
  methods: {
    async getManagershandler() {
      try {
        const response = await api.get("/api/users/", {});
        this.usersData = response.data;
        console.log("data", this.usersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async getDashboeardStats() {
      try {
        const response = await api.get("/api/project/dashboard/", {});
        this.dashboardStats = response.data;
        console.log("data", this.usersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getManagershandler();
    this.getDashboeardStats();
  },
};
</script>
