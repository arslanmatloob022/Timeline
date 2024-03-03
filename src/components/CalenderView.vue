<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import useApi from "../supportElements/useAPI";
import SoftButtonVue from "./SoftButton.vue";

import updateTaskVue from "../views/SupportComponents/updateTask.vue";
const api = useApi();
export default {
  components: {
    FullCalendar,
    SoftButtonVue,
    updateTaskVue,
  },
  data() {
    return {
      isTaskFormOpen: false,
      editTaskId: 0,
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
      projects: [],
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
        eventClick: (info) => {
          // Using arrow function
          console.log("clicked");
          this.isTaskFormOpen = true;
          this.editTaskId = info.event.id;
        },
      },
    };
  },
  methods: {
    renderCalender() {
      console.log("calende render");
      console.log(this.tasks);
      const events = this.tasks.map((task) => ({
        id: task.id,
        resourceId: task.project,
        start: task.startDate,
        end: task.endDate,
        title: task.title,
        color: task.color,
        description: task.description,
        workers: task.workers,
        borderColor: this.colors[task.status],
      }));
      this.calendarOptions.resources = this.projects;
      this.calendarOptions.events = events;
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
        console.log("inside all projects fun");
        const response = await api.get("/api/project/projects", {});
        this.projects = response.data;
        this.filteredResources = response.data;
        console.log(this.projects);
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
  },
};
</script>
<template>
  <div
    class="mb-6"
    id="fullCalendarView"
    :class="fullWidthView ? 'fullView' : ''"
  >
    <form id="manger-form" @submit.prevent="changeFilterHandler">
      <div class="flex-between">
        <div>
          <label for="inputField">Search project</label>
          <br />
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
            placeholder="search ..."
            v-model="query"
            @input="this.changeFilterHandler()"
          />
        </div>

        <div class="filter-tabs">
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
            >Pending</SoftButtonVue
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
        <button class="view-button" @click="toggleFullScreen()">
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
          <p style="font-weight: 500; margin-bottom: 0px; padding-left: 10px">
            {{ arg.event.title }}
          </p>
          <div class="avatars">
            <div
              class="avatars__item"
              v-for="worker in arg.event.extendedProps.workers"
              :key="worker.id"
            >
              <img v-if="worker.avatar" :src="worker.avatar" alt="" />
              <div
                v-else
                style="
                  width: 100%;
                  height: 100%;
                  background-color: #292f3c;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <h6 class="mb-0" style="color: white">
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

    <update-task-vue
      :isOpen="isTaskFormOpen"
      :closeModal="closeTaskForm"
      :taskId="editTaskId"
    />
  </div>
</template>
<style lang="scss" scoped>
.filter-tabs {
  height: 60px;
}
.filter-tabs > button {
  margin-right: 20px;
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
