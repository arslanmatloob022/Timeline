<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="mb-6" :class="fullWidthView ? 'fullView' : ''">
          <form id="manger-form" @submit.prevent="changeFilterHandler">
            <h2>Worker Tasks' Chart</h2>
            <div class="flex-between align-items-center">
              <div class="align-items-center">
                <p class="is-bold-italic">
                  [ {{ this.loading ? "Loading..." : this.workerName }} ]
                </p>
                <p>
                  Tasks:
                  {{ this.loading ? "Loading..." : filteredEvents.length }}
                </p>
              </div>
              <div class="mb-3">
                <select
                  style="padding: 6px; width: 220px"
                  class="inputField"
                  v-model="selectedWorker"
                >
                  <option value="" selected>Select Worker</option>
                  <option
                    class="dropdownOptions"
                    v-for="worker in workers"
                    :key="worker.id"
                    :value="worker"
                  >
                    {{ worker.username }}
                  </option>
                </select>
              </div>

              <div class="filter-tabs">
                <SoftButtonVue
                  @click="
                    () => {
                      activeFilter = 'all';
                      changeFilterHandler();
                    }
                  "
                  :class="this.activeFilter == 'all' ? 'active-btn' : ''"
                  color="info"
                  variant="gradient"
                  size="sm"
                >
                  All
                </SoftButtonVue>
                <SoftButtonVue
                  @click="
                    () => {
                      activeFilter = 'active';
                      changeFilterHandler();
                    }
                  "
                  :class="this.activeFilter == 'active' ? 'active-btn' : ''"
                  color="warning"
                  variant="gradient"
                  size="sm"
                >
                  Active
                </SoftButtonVue>
                <SoftButtonVue
                  @click="
                    () => {
                      activeFilter = 'pending';
                      changeFilterHandler();
                    }
                  "
                  :class="this.activeFilter == 'pending' ? 'active-btn' : ''"
                  color="secondary"
                  variant="gradient"
                  size="sm"
                >
                  Pre Construction
                </SoftButtonVue>
                <!-- <SoftButtonVue
                  @click="
                    () => {
                      activeFilter = 'completed';
                      changeFilterHandler();
                    }
                  "
                  :class="this.activeFilter == 'completed' ? 'active-btn' : ''"
                  color="success"
                  variant="gradient"
                  size="sm"
                >
                  Completed
                </SoftButtonVue> -->
              </div>

              <!-- <button class="view-button mb-3" @click="showFullView()">
                <i
                  :class="fullWidthView ? 'fa fa-compress' : 'fa fa-expand'"
                ></i>
              </button> -->
            </div>
          </form>

          <FullCalendar :options="calendarOptions">
            <template v-slot:eventContent="arg">
              <div
                style="
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <p
                  style="
                    font-weight: 600;
                    margin-bottom: 0px;
                    padding-left: 10px;
                  "
                >
                  {{ arg.event.title }}
                </p>
                <div>
                  <p style="margin-top: 8px; padding-right: 10px">
                    {{ new Date(arg.event.start).toDateString() }} to
                    {{ new Date(arg.event.end).toDateString() }}
                  </p>
                </div>
              </div>
            </template>
          </FullCalendar>

          <div
            v-if="filteredResources.length == 0"
            style="display: flex; align-items: center; justify-content: center"
          >
            <h4 class="mt-5 mb-5" style="color: darkgray">No project found</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import useApi from "../supportElements/useAPI";
// import SoftBadge from "../components/SoftBadge.vue";
// import CustomModal from "./components/CustomModal.vue";
import { convertToFormData } from "../supportElements/common";
import SoftButtonVue from "../components/SoftButton.vue";

const api = useApi();
export default {
  props: {
    id: Number,
    workerName: String,
  },
  components: {
    FullCalendar,
    // SoftBadge,
    SoftButtonVue,
    // CustomModal,
  },

  data() {
    return {
      loading: false,
      selectedWorker: {},
      workers: [],
      modalTitle: "Edit Worker Profile",
      editpreview: null,
      workerData: {},
      fullWidthView: false,
      activeFilter: "all",
      colors: {
        pending: "#fbcf33",
        active: "#82d616",
        completed: "#cb0c9f",
        canceled: "#344767",
      },
      query: "",
      tasks: [],
      filteredResources: [],
      filteredEvents: [],
      projects: [],
      events: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin],
        schedulerLicenseKey: "0965592368-fcs-1694657447",
        initialView: "resourceTimelineMonth",
        height: "auto",
        resourceAreaWidth: "20%",
        selectable: true,
        headerToolbar: {
          left: "today prev,next",
          center: "title",
          right:
            "resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear",
        },
        editable: true,
        views: {
          resourceTimelineWeek: {
            slotDuration: { days: 1, hours: 1 },
            slotLabelFormat: {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            },
          },
        },
        resourceAreaHeaderContent: "Projects",
        resources: this.filteredResources,
      },
    };
  },
  watch: {
    id: "gettasksHandler",
  },
  methods: {
    renderCalender() {
      console.log("calende render");
      console.log(this.tasks);
      this.events = this.tasks.map((task) => ({
        id: task.id,
        resourceId: task.project.id,
        start: task.startDate,
        end: task.endDate,
        title: task.title,
        color: task.color,
        description: task.description,
        workers: task.workers,
        borderColor: this.colors[task.status],
        status: task.status,
      }));
      this.projects = this.tasks.map((task) => ({
        id: task.project.id,
        start: task.project.startDate,
        end: task.project.endDate,
        title: task.project.title,
        address: task.project.address,
        status: task.project.status,
        color: this.colors[task.project.status],
      }));
      this.filteredResources = this.projects;
      this.filteredEvents = this.events;
      this.calendarOptions.resources = this.projects;
      this.calendarOptions.events = this.events;
    },
    changeFilterHandler() {
      console.log("func caleed", this.activeFilter);

      if (this.activeFilter != "all") {
        console.log(this.events);
        let data = this.events.filter(
          (event) => event.status == this.activeFilter
        );
        console.log("local data length", data.length);
        this.filteredEvents = data;
      } else {
        this.filteredEvents = this.events;
      }
      this.calendarOptions.events = this.filteredEvents;
    },

    async gettasksHandler() {
      try {
        this.loading = true;
        const response = await api.get(
          `/api/task/${this.id}/worker-tasks/`,
          {}
        );
        this.tasks = response.data;
        await this.renderCalender();
        console.log("worekrerr".this.id);
        console.log("worker tasks", this.tasks);
        this.loading = false;
      } catch (err) {
        this.tasks = [];
      } finally {
        this.loading = false;
      }
    },
    // async getWorkerHandler() {
    //   try {
    //     const response = await api.get(`/api/users/${this.id}/`);
    //     this.workerData = response.data;
    //     console.log("sedii", this.workerData);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getWorkersHandler() {
    //   try {
    //     const response = await api.get(`/api/users/by-role/worker/`);
    //     this.workers = response.data;
    //     console.log("sedii", this.workers);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    showFullView() {
      this.fullWidthView = !this.fullWidthView;
    },
    async editselfProfile() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.workerData, ["avatar"]);
        const resp = await api.patch(
          `/api/users/${this.workerData.id}/`,
          formData
        );
        this.workerData = resp.data;
        this.$notify({
          type: "success",
          title: "Profile updated",
          text: "Entered information of your profile has beed updated",
        });
        // this.userData = this.$store.state.user;
        this.$refs.editProfileModal.closeModal();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: "error",
          title: "Something went wrong !",
          text: "Something wrong has happened please try again.",
        });
      } finally {
        this.loading = false;
      }
    },
    handleFileChange(event) {
      this.userData.avatar = event.target.files[0];
      this.adminFormData.avatar = event.target.files[0];
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          this.editpreview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
  },

  async mounted() {
    await this.gettasksHandler();
    this.renderCalender();
    this.getWorkersHandler();
  },
};
</script>
<style lang="scss" scoped>
.filter-tabs {
  height: 60px;
}
.filter-tabs > button {
  margin-right: 20px;
  border: 5px solid transparent;
}
</style>
