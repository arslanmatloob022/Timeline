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
      activeFilter:'all',
      colors:{
        'pending':'#fbcf33',
        'active':'#82d616',
        'completed':'#cb0c9f',
        'canceled':'#344767'
      },
      query: "",
      tasks: [],
      filteredResources: [],
      filteredEvents:[],
      projects: [],
      events :[],
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
      },
    };
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
        borderColor:this.colors[task.status],
        status:task.status
      }));
      this.projects = this.tasks.map((task) => ({
        id: task.project.id,

        start: task.project.startDate,
        end: task.project.endDate,
        title: task.project.title,
        address: task.project.address,
        status: task.project.status,
        color:this.colors[task.project.status]
      }));
      this.filteredResources = this.projects
      this.filteredEvents  = this.events
      this.calendarOptions.resources = this.projects;
      this.calendarOptions.events = this.events;
    },
    changeFilterHandler (){
      console.log("func caleed", this.activeFilter)
     
      if(this.activeFilter!='all'){
        console.log(this.events)
        let data  = this.events.filter((event) =>
          event.status==this.activeFilter
        );
        console.log("local data length", data.length)
        this.filteredEvents= data
      } else {
        this.filteredEvents = this.events;
      }

      this.calendarOptions.events = this.filteredEvents

      // this.setResources([])
    },

    async gettasksHandler() {
      try {
        const response = await api.get("/api/task/36/worker-tasks/", {});
        this.tasks = response.data;
      } catch (err) {
        this.tasks = [];
      }
    },
    showFullView() {
      this.fullWidthView = !this.fullWidthView;
    },
  },

  async mounted() {
    await this.gettasksHandler()
    this.renderCalender();
  },
};
</script>
<template>
  <div class="mb-6" :class="fullWidthView ? 'fullView' : ''">
    <form id="manger-form" @submit.prevent="changeFilterHandler">
      <div class="flex-between">
        <div>
            <p>Total Tasks: {{ filteredEvents.length  }}</p>
        </div>

        <div class="tabs-container">
          <button @click="()=>{activeFilter='all'; changeFilterHandler();}" :class="activeFilter=='all'&&'active'">All</button>
          <button @click="()=>{activeFilter='active';changeFilterHandler();}" :class="activeFilter=='active'&&'active'">Active</button>
          <button @click="()=>{activeFilter='pending';changeFilterHandler();}" :class="activeFilter=='pending'&&'active'">Pending</button>
          <button @click="()=>{activeFilter='completed'; changeFilterHandler();}" :class="activeFilter=='completed'&&'active'">Completed</button>
        </div>
        <button class="view-button" @click="showFullView()">
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
          <p style="font-weight: 600; margin-bottom: 0px; padding-left: 10px">
            {{ arg.event.title }}
          </p>
          <div>
           <p style="margin-top: 8px; padding-right: 10px;"> {{ new Date(arg.event.start).toDateString() }} to {{ new Date(arg.event.end).toDateString() }}</p>
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
  </div>
</template>
<style scss >
.fc-h-event {
  border-width: thick !important;
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
