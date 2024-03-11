<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from '@fullcalendar/interaction'
import useApi from "../supportElements/useAPI";
import updateProject from "../views/SupportComponents/updateProject.vue";
import SoftButtonVue from "./SoftButton.vue";
const api = useApi();

export default {
  components: {
    FullCalendar,
    SoftButtonVue,
    updateProject,
  },
  data() {
    return {
      loading: false,
      isProjectFormOpen: false,
      editProjectId: 0,
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
        plugins: [resourceTimelinePlugin, interactionPlugin],
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
        eventClick: (info) => {
          if (this.$store.state.user.role === "manager") {
            if (
              !info.event.extendedProps.managers.some(
                (item) => item.id === this.$store.state.user.id
              )
            ) {
              this.$notify({
                type: "error",
                title: "Not allowed.",
                text: `You can edit the projects only on wich you are assigned`,
              });
              return;
            }
          }
          this.isProjectFormOpen = true;
          this.editProjectId = info.event.id;
        },
        eventDrop: (info)=> {
          info.revert();
        },
        eventResize: (info)=> {
          // alert(info.event.title + " end is now " + info.event.end.toISOString());
          let start = info.event.start.toISOString().substring(0, 10)
          let end = info.event.end.toISOString().substring(0, 10)
          if (!confirm(`Are you sure you want to update the project ${info.event.title} date  from ${start} to ${end}?`)) {
              info.revert();
          }else{
            this.editProject(info.event.id,start,end )
          }
        }


      },
    };
  },
  methods: {
  
    async editProject(id, start, end) {
      try {
        await api.patch(
          `/api/project/${id}/`,
          {startDate:start, endDate:end}
        );

        this.$notify({
          type: "success",
          title: "Project Updated",
          text: "Project updated succesfuly",
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
        borderColor: this.colors[project.status],
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
        this.loading = true;
        console.log("inside all projects fun");
        const response = await api.get("/api/project/", {});
        this.projects = response.data;
        console.log(this.projects);
        this.loading = false;
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

    openProjectForm(projectId = null) {
      if (this.$store.state.user.role == "admin") {
        this.isProjectFormOpen = true;
        // condtion to set the manager role to update the project,
        // so that manager can update only those project thar are assigned to him
      } else if (this.$store.state.user.role == "admin") {
        this.editProjectId = projectId;
      } else {
        this.$notify({
          type: "error",
          title: "Not allowed",
          text: "You are not allowed to perform this action",
        });
      }
    },

    async closeProjectForm() {
      this.isProjectFormOpen = false;
      this.editProjectId = null;
      await this.getProjectHandler();
      this.renderCalender();
    },
  },
  async mounted() {
    await Promise.all([this.getProjectHandler()]);
    this.renderCalender();
  },
};
</script>
<template>
  <div id="fullCalendarView" class="mb-6">
    <div v-if="this.loading" class="calendar-loader"></div>
    <form id="manger-form" @submit.prevent="changeFilterHandler">
      <div class="flex-between align-items-center mb-3">
        <div>
          <!-- <label for="inputField">Search project</label> -->
          <!-- <br /> -->
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
            @input="changeFilterHandler()"
          />
        </div>

        <div class="filter-tabs">
          <SoftButtonVue
            @click="
              () => {
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
          <div>
            <span
              @click="() => {}"
              style="font-weight: 500; margin-bottom: 0px; padding-left: 10px"
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

    <updateProject
      :isOpen="isProjectFormOpen"
      :closeModal="closeProjectForm"
      :projectId="editProjectId"
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
