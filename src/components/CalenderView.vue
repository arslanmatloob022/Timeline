<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import useApi from "../supportElements/useAPI";
import SoftButtonVue from "./SoftButton.vue";
import updateTaskVue from "../views/SupportComponents/updateTask.vue";
import WorkerCalendarVue from "./WorkerCalendar.vue";
import interactionPlugin from "@fullcalendar/interaction";
const api = useApi();
export default {
  components: {
    FullCalendar,
    SoftButtonVue,
    updateTaskVue,
    WorkerCalendarVue,
  },
  data() {
    return {
      projectID: 0,
      selectedWorkerName: "",
      startDate: null,
      selectedWorkerId: 0,
      showworkerchart: true,
      loading: false,
      isTaskFormOpen: false,
      editTaskId: 0,
      dropdownFilters: {
        all: "all",
        active: "active",
        pending: "pending",
        completed: "completed",
      },
      fullWidthView: false,
      activeFilter: "all",
      colors: {
        pending: "#7E90B0",
        active: "#F77337",
        completed: "#48C533",
        canceled: "#344767",
      },
      query: "",
      tasks: [],
      filteredResources: [],
      projects: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin],
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
            slotDuration: { days: 1, hours: 1 }, // Each slot represents 1 hour
            slotLabelFormat: {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            }, // Custom slot label format
          },
        },
        resourceAreaHeaderContent: "Projects",
        resources: this.filteredResources,
        resourceId: this.selectedWorkerId,

        eventDrop: (info) => {
          console.log(info.event);
          if (this.$store.state.user.role === "manager") {
            if (
              !info.event.extendedProps.managers.includes(
                this.$store.state.user.id
              )
            ) {
              info.revert();

              this.$notify({
                type: "error",
                title: "Not allowed.",
                text: `You can modify the task only for the projects for which you are a manager.`,
              });
              return;
            }
          }
          let start = info.event.startStr;

          let end = info.event.end.toISOString().substring(0, 10);
          console.log("resource ids", info.event._def.resourceIds[0]);
          console.log(info.event.extendedProps.project);
          if (
            info.event.extendedProps.project != info.event._def.resourceIds[0]
          ) {
            info.revert();
            return;
          }
          if (
            !confirm(
              `Are you sure you want to update the project ${info.event.title} date  from ${start} to ${end}?`
            )
          ) {
            info.revert();
          } else {
            this.editTask(info.event.id, start, end);
          }
          // info.revert();
        },
        eventResize: (info) => {
          console.log("info", info.event);
          if (this.$store.state.user.role === "manager") {
            if (
              !info.event.extendedProps.managers.includes(
                this.$store.state.user.id
              )
            ) {
              info.revert();

              this.$notify({
                type: "error",
                title: "Not allowed.",
                text: `You can modify the task only for the projects for which you are a manager.`,
              });
              return;
            }
          }
          // alert(info.event.title + " end is now " + info.event.end.toISOString());

          let start = info.event.startStr;

          let end = info.event.end.toISOString().substring(0, 10);

          if (
            !confirm(
              `Are you sure you want to update the project ${info.event.title} date  from ${start} to ${end}?`
            )
          ) {
            info.revert();
          } else {
            this.editTask(info.event.id, start, end);
          }
        },
        dateClick: (info) => {
          this.editTaskId = 0;
          this.projectID = info.resource.id;
          this.startDate = info.dateStr;
          this.isTaskFormOpen = true;
        },
      },
    };
  },
  watch: {
    activeFilter: "changeFilterHandler",
  },
  methods: {
    addOneDayToDate(dateString) {
      let date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      let newDateString = date.toISOString().slice(0, 10);
      return newDateString;
    },
    workerImageClick(worker) {
      window.location.hash = "";
      this.selectedWorkerId = worker.id;
      this.selectedWorkerName = worker.username;
      window.location.hash = "workerCalendar";
    },
    eventClick(info) {
      console.log(info.event);
      if (this.$store.state.user.role === "manager") {
        if (
          !info.event.extendedProps.managers.includes(this.$store.state.user.id)
        ) {
          this.$notify({
            type: "error",
            title: "Not allowed.",
            text: `You can modify the task only for the projects for which you are a manager.`,
          });
          return;
        }
      }
      this.startDate = "";
      this.isTaskFormOpen = true;
      this.projectID = 0;
      this.editTaskId = info.event.id;
    },
    async editTask(id, start, end) {
      try {
        await api.patch(`/api/task/${id}/`, { startDate: start, endDate: end });

        this.$notify({
          type: "success",
          title: "Task Updated",
          text: "Task updated succesfuly",
        });
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Warning",
          text: "Something went wrong",
        });
        console.log(err);
      }
    },

    getManagersById(id) {
      const project = this.projects.find((project) => project.id === id);
      if (project) {
        return project.managers;
      } else {
        return [];
      }
    },
    renderCalender() {
      console.log("calende render");
      console.log(this.tasks);
      const events = this.tasks.map((task) => ({
        id: task.id,
        resourceId: task.project,
        project: task.project,
        start: task.startDate,
        end: this.addOneDayToDate(task.endDate),
        title: task.title,
        color: task.color,
        description: task.description,
        workers: task.workers,
        borderColor: this.colors[task.status],
        managers: this.getManagersById(task.project),
      }));
      const bgEvents = this.projects.map((project) => ({
        id: project.id,
        resourceId: project.id,
        start: project.startDate,
        end: project.endDate,
        title: project.title,
        display: "background",
        color: this.colors[project.status],
      }));
      const allEvents = [...events, ...bgEvents];
      this.calendarOptions.resources = this.projects;
      this.calendarOptions.events = allEvents;
    },
    changeFilterHandler() {
      console.log("func caleed", this.activeFilter);

      if (this.activeFilter != "all") {
        let data = this.projects.filter(
          (project) => project.status == this.activeFilter
        );
        console.log("local data length", data.length);
        this.filteredResources = data;
      } else {
        this.filteredResources = this.projects;
      }
      if (this.query) {
        this.filteredResources = this.projects.filter((project) =>
          project.title.toLowerCase().includes(this.query.toLowerCase())
        );
      }
      this.calendarOptions.resources = this.filteredResources;
      console.log(this.filteredResources);
      console.log(this.filteredResources.length);
      // this.setResources([])
    },
    async getProjectHandler() {
      try {
        this.loading = true;
        console.log("inside all projects fun");
        const response = await api.get("/api/project/projects", {});
        this.projects = response.data;
        this.filteredResources = response.data;
        console.log(this.projects);
        this.loading = false;
      } catch (err) {
        this.projects = [];
      }
    },

    async gettasksHandler() {
      try {
        const response = await api.get("/api/task", {});
        this.tasks = response.data;
      } catch (err) {
        this.tasks = [];
      }
    },

    toggleFullScreen() {
      this.fullWidthView = !this.fullWidthView;
      const fullScreenCalender = document.getElementById("fullCalendarView");
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (fullScreenCalender.requestFullscreen) {
          fullScreenCalender.requestFullscreen();
        } else if (fullScreenCalender.webkitRequestFullscreen) {
          fullScreenCalender.webkitRequestFullscreen();
        } else if (fullScreenCalender.mozRequestFullScreen) {
          fullScreenCalender.mozRequestFullScreen();
        } else if (fullScreenCalender.msRequestFullscreen) {
          fullScreenCalender.msRequestFullscreen();
        }
      }
    },

    async closeTaskForm() {
      this.isTaskFormOpen = false;
      this.editTaskId = null;
      await Promise.all([this.getProjectHandler(), this.gettasksHandler()]);
      this.renderCalender();
    },
  },

  async mounted() {
    await Promise.all([this.getProjectHandler(), this.gettasksHandler()]);
    this.renderCalender();
    this.showworkerchart = true;
  },
};
</script>
<template>
  <div>
    <div
      class="mb-6 mobileWidth"
      id="fullCalendarView"
      style="background-color: white; padding: 12px 20px; border-radius: 12px"
    >
      <div v-if="this.loading" class="calendar-loader"></div>
      <form id="manger-form" @submit.prevent="changeFilterHandler">
        <div class="flex-between">
          <div>
            <!-- <label for="inputField">Search project</label>
          <br /> -->
            <input
              class="inputField mb-4 px-3 py-2"
              style="
                border: none;
                background-color: white;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                border-radius: 20px;
                outline: none;
                width: 300px;
              "
              type="text"
              placeholder="Search projects..."
              v-model="query"
              @input="this.changeFilterHandler()"
            />
            <!-- <div class="mt-1 switch d-flex align-items-center input-group">
              <div>
                <input
                  v-model=""
                  type="checkbox"
                  id="checkbox1"
                  name="is_sentMail"
                />
                <label for="checkbox1"></label>
              </div>
              <h6 style="white-space: nowrap">Schedule mode</h6>
            </div> -->
          </div>
          <button
            class="view-button showmobile"
            @click="toggleLandscapeFullScreen()"
          >
            <i :class="fullWidthView ? 'fa fa-laptop' : 'fa fa-mobile'"></i>
          </button>
          <select
            class="inputField showmobile"
            style="width: fit-content"
            v-model="activeFilter"
          >
            <option selected>Selecte Filter</option>
            <option
              class="dropdownOptions"
              v-for="worker in dropdownFilters"
              :key="worker.key"
              :value="worker"
            >
              {{ worker }}
            </option>
          </select>
          <div class="filter-tabs hidemobile">
            <SoftButtonVue
              @click="
                () => {
                  this.changeFilterHandler();
                  this.activeFilter = 'all';
                }
              "
              :class="this.activeFilter == 'all' ? 'active-btn' : ''"
              color="info"
              variant="gradient"
              size="sm"
              >All</SoftButtonVue
            >

            <SoftButtonVue
              @click="
                () => {
                  this.changeFilterHandler();

                  this.activeFilter = 'active';
                }
              "
              :class="this.activeFilter == 'active' ? 'active-btn' : ''"
              color="warning"
              variant="gradient"
              size="sm"
              >Active</SoftButtonVue
            >

            <SoftButtonVue
              @click="
                () => {
                  this.changeFilterHandler();

                  this.activeFilter = 'pending';
                }
              "
              :class="this.activeFilter == 'pending' ? 'active-btn' : ''"
              color="secondary"
              variant="gradient"
              size="sm"
              >Pre Construction</SoftButtonVue
            >

            <SoftButtonVue
              @click="
                () => {
                  this.changeFilterHandler();

                  this.activeFilter = 'completed';
                }
              "
              :class="this.activeFilter == 'completed' ? 'active-btn' : ''"
              color="success"
              variant="gradient"
              size="sm"
              >Completed</SoftButtonVue
            >
          </div>
          <button class="view-button mb-3" @click="toggleFullScreen()">
            <i :class="fullWidthView ? 'fa fa-compress' : 'fa fa-expand'"></i>
          </button>
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
              style="font-weight: 500; margin-bottom: 0px; padding-left: 10px"
              @click="eventClick(arg)"
            >
              {{ arg.event.title }}
            </p>
            <div class="avatars">
              <div
                class="avatars__item"
                v-for="worker in arg.event.extendedProps.workers"
                :key="worker.id"
              >
                <img
                  v-if="worker.avatar"
                  :src="worker.avatar"
                  alt=""
                  @click="workerImageClick(worker)"
                  :title="worker.username"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  :data-bs-original-title="
                    worker.username ? worker.username : 'Hi'
                  "
                />
                <div
                  v-else
                  @click="workerImageClick(worker)"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  :data-bs-original-title="
                    worker.username ? worker.username : 'Hi'
                  "
                  :title="worker.username"
                  style="
                    width: 100%;
                    height: 100%;
                    background-color: #292f3c;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <h6
                    class="mb-0"
                    style="color: white"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    :data-bs-original-title="
                      worker.username ? worker.username : 'Hi'
                    "
                    :title="worker.username"
                  >
                    {{ worker.username ? worker.username.slice(0, 2) : "AA" }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <!-- <p>{{ arg.event.extendedProps.description }}</p> -->
        </template>
      </FullCalendar>
      <div
        v-if="filteredResources.length == 0"
        style="display: flex; align-items: center; justify-content: center"
      >
        <h4 class="mt-5 mb-5" style="color: darkgray">No project found</h4>
      </div>
      <hr />
    </div>
    <div id="workerCalendar">
      <WorkerCalendarVue
        :id="this.selectedWorkerId"
        :workerName="this.selectedWorkerName"
        class="mt-6"
      />
    </div>

    <update-task-vue
      v-if="isTaskFormOpen"
      :isOpen="isTaskFormOpen"
      :closeModal="closeTaskForm"
      :taskId="editTaskId"
      :projectID="projectID"
      :startDate="startDate"
    />
  </div>
</template>
<style lang="scss" scoped>
.filter-tabs {
  height: 60px;
}
.filter-tabs > button {
  margin-right: 12px;
  border: 5px solid transparent;
}
.fc-h-event {
  border-width: thick !important;
  border-radius: 2px !important;
  margin-bottom: 10px !important;
}

.avatars {
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
}

.avatars:hover .avatars__item {
  margin-right: 10px;
}

.avatars__item {
  background-color: #596376;
  border: 1px solid white;
  border-radius: 100%;
  color: #ffffff;
  display: block;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 100;
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  transition: margin 0.1s ease-in-out;
  overflow: hidden;
  margin-left: -10px;
  transition: all 0.4s ease-in-out;
}

.avatars__item > img {
  width: 100%;
}
</style>
