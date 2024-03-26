<template>
  <div class="py-4 container-fluid">
    <!-- states -->
    <div class="d-flex flex-between align">
      <h5 style="color: #8392ab">
        <span style="color: #82d616">Last schedule sent:</span>
        {{ this.dashboardStats.last_mail_sent.slice(0, 10) }}
      </h5>
      <div class="d-flex align-items-center">
        <h6>Resend schedule <i class="fas fa-mail-bulk"></i></h6>
        <soft-badge
          @click="sendTasksMailToAllWorker"
          size="md"
          class="mb-2 pointer"
          light
          >{{ this.Loading ? "Sending..." : `Send to all` }}</soft-badge
        >
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/managers')"
          title="Contractors"
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
      <div class="col-xl-3 col-md-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          class="pointer"
          @click="this.$router.push('/workers')"
          title="Clients"
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
import SoftBadge from "../components/SoftBadge.vue";

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
      Loading: false,
      dashboardStats: {
        all_project: 0,
        active_projects: 0,
        pending_projects: 0,
        completed_projects: 0,
        workers: 0,
        managers: 0,
        last_mail_sent: "",
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
    SoftBadge,
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
        this.loading = true;
        const response = await api.get("/api/project/dashboard/", {});
        this.dashboardStats = response.data;
        console.log("data", this.usersData);
        this.loading = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async sendTasksMailToAllWorker() {
      try {
        this.Loading = true;
        const resp = api.post(`/api/task/worker-mail/`, {
          worker: "all",
        });
        console.log(resp);
        this.$notify({
          type: "success",
          title: "Email Sent",
          text: `List of tasks sent to all workers successfuly`,
        });
        this.Loading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getManagershandler();
    this.getDashboeardStats();
  },
};
</script>
