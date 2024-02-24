<script>
import FullCalendar from '@fullcalendar/vue3'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import useApi from "../supportElements/useAPI";
const api = useApi();
export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      tasks: [],
      projects: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin],
        schedulerLicenseKey: '0965592368-fcs-1694657447',
        initialView: 'resourceTimelineMonth',
        height: "auto",
        resourceAreaWidth: '20%',
        selectable: true,
        headerToolbar: {
          left: 'today prev,next',
          center: 'title',
          right: 'resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear'
        },
        editable: true,
        views: {
          resourceTimelineWeek: {
          slotDuration: { days: 1, hours: 1 }, // Each slot represents 1 hour
          slotLabelFormat: { weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric' } // Custom slot label format
          }
        },
        resourceAreaHeaderContent: 'Projects',
        resources: [],
      }

    }
  },
  methods: {
    renderCalender() {
      console.log("calende render")
      console.log(this.tasks)
      const events = this.tasks.map((task) => ({
        id: task.id,
        resourceId: task.project,
        start: task.startDate,
        end: task.endDate,
        title: task.title,
        color: task.eventColor,
        description: task.description,
        workers: task.workers
      }));
      this.calendarOptions.resources = this.projects
      this.calendarOptions.events = events
    },

    async getProjectHandler() {
      try {
        console.log("inside all projects fun")
        const response = await api.get("/api/project/projects", {});
        this.projects = response.data;
        console.log(this.projects)
      } catch (err) {
        this.projects = []
      }
    },
    async gettasksHandler() {
      try {
        const response = await api.get("/api/task", {});
        this.tasks = response.data;
      } catch (err) {
        this.tasks = []
      }
    },


  },
  async mounted() {
    await Promise.all([this.getProjectHandler(), this.gettasksHandler()]);
    this.renderCalender();
  },

}
</script>
<template>

  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg'>
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
        <p style="font-weight: 600; margin-bottom: 0px; padding-left: 10px;">{{ arg.event.title }} </p>
        <div class="avatars">

          <div class="avatars__item" v-for="worker in arg.event.extendedProps.workers">
            <img v-if="worker.avatar" 
               :src="worker.avatar" alt="">
            <div v-else
              style="width: 100%; height: 100%; background-color: #292f3c;  display: flex;align-items: center; justify-content: center;">
              <h6 class="mb-0" style="color: white;">{{ worker.username ? worker.username.slice(0, 2) : 'AA' }}</h6>
            </div>
          </div>
        </div>
      </div>
      <!-- <p>{{ arg.event.extendedProps.description }}</p> -->
    </template>
  </FullCalendar>
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

.avatars__item>img {
  width: 100%;

}</style>