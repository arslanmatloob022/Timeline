<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import useApi from "../supportElements/useAPI";
const api = useApi();
export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      fullWidthView: false,
      query: "",
      tasks: [],
      projects: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin],
        schedulerLicenseKey: "0965592368-fcs-1694657447",
        initialView: "resourceTimelineYear",
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
        resources: [],
      },
    };
  },
  methods: {
    renderCalender() {
      console.log("calende render");
      console.log(this.projects);
      const events = this.projects.map((project) => ({
        id: project.id,
        resourceId: project.id,
        start: project.startDate,
        end: project.endDate,
        title: project.title,
        description: project.description,
        total_tasks: project.total_tasks,
        managers: project.managers,
      }));
      this.calendarOptions.resources = this.projects;
      this.calendarOptions.events = events;
    },

    async getProjectHandler() {
      try {
        console.log("inside all projects fun");
        const response = await api.get("/api/project/", {});
        this.projects = response.data;
        console.log(this.projects);
      } catch (err) {
        this.projects = [];
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
  },
  async mounted() {
    await Promise.all([this.getProjectHandler()]);
    this.renderCalender();
  },
};
</script>
<template>
  <div class="mb-6" :class="fullWidthView ? 'fullView' : ''">
    <form id="manger-form" @submit.prevent="searchProjectHandler">
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
          />
        </div>

        <div class="tabs-container">
          <button class="active">All</button>
          <button>Active</button>
          <button>Pending</button>
          <button>Completed</button>
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
          <div>
            <span
              style="font-weight: 600; margin-bottom: 0px; padding-left: 10px"
              >{{ arg.event.title }}
            </span>
            <span> -- tasks ({{ arg.event.extendedProps.total_tasks }})</span>
          </div>
          <div class="avatars">
            <div
              class="avatars__item"
              v-for="worker in arg.event.extendedProps.managers"
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
  </div>
</template>
<style scss>
.fc-h-event {
  border-radius: 10px !important;
}

.avatars {
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
}

.avatars:hover .avatars__item {
  margin-right: 30px;
}

.avatars__item {
  background-color: #596376;
  border: 2px solid white;
  border-radius: 100%;
  color: #ffffff;
  display: block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 100;
  height: 35px;
  width: 35px;
  line-height: 35px;
  text-align: center;
  transition: margin 0.1s ease-in-out;
  overflow: hidden;
  margin-left: -20px;
  transition: all 0.4s ease-in-out;
}

.avatars__item > img {
  width: 100%;
}
</style>
