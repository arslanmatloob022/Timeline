<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div
        style="
          margin-top: 24px;
          color: #fff;
          background: linear-gradient(to right, #17ad37, #98ec2d);
        "
        class="mx-2 mt-0 mb-4 overflow-hidden card card-body blur shadow-blur"
      >
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                :src="workerData.avatar ? workerData.avatar : '/preview.jpeg'"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <div class="d-flex align-items-center">
                <h5 style="color: #fff" class="mb-1">
                  {{ loading ? "Loading..." : workerData.username }}
                </h5>

                <p class="mb-0 text-sm font-weight-bold">
                  ( {{ workerData.role }} )
                </p>
              </div>
              <p class="mb-0 text-sm font-weight-bold">
                {{ loading ? "Loading..." : workerData.email }}
              </p>
              <p class="mb-0 text-sm font-weight-bold">
                Task email alert:
                {{ workerData.is_sentMail ? "Active" : "In-Active" }}
              </p>
            </div>
          </div>
          <div
            class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
          >
            <div class="nav-wrapper position-relative end-0">
              <ul
                class="p-1 bg-transparent nav nav-pills nav-fill"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 40 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>settings</title>
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-2020.000000, -442.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(304.000000, 151.000000)">
                              <polygon
                                class="color-background"
                                opacity="0.596981957"
                                points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                              ></polygon>
                              <path
                                class="color-background"
                                d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                opacity="0.596981957"
                              ></path>
                              <path
                                class="color-background"
                                d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span
                      @click="
                        () => {
                          this.$refs.editProfileModal.openModal();
                          this.editpreview = workerData.avatar;
                        }
                      "
                      class="ms-1"
                      >Edit Profile</span
                    >
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div
          class="card-header p-3"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h6>Worker's Tasks</h6>

          <SoftButtonVue
            v-if="workerData.is_sentMail"
            color="primary"
            @click="sendTasksMailToWorker"
            variant="gradient"
            size="sm"
            >Send Mail</SoftButtonVue
          >
        </div>

        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table v-if="!loading" class="table mb-0 is-responsive">
              <thead>
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Project
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Task
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Status
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Start Date
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tasks" :key="item.id">
                  <td style="width: 23%; white-space: wrap">
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ item.project.title }}</h6>
                        <p class="text-xs text-secondary mb-0">
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                          {{ item.project.address }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style="width: 28%; white-space: wrap">
                    <h6 class="text-xs font-weight-bold mb-0">
                      {{ item.title ? item.title : "No title added" }}
                    </h6>
                    <p class="text-xs font-weight-bold mb-0">
                      {{
                        item.description
                          ? item.description
                          : "No Description added"
                      }}
                    </p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge
                      :color="item.status == 'active' ? 'success' : 'warning'"
                      variant="gradient"
                      size="sm"
                      >{{ item.status }}</soft-badge
                    >
                  </td>

                  <td class="align-middle text-center">
                    <span class="text-xs font-weight-bold mb-0">
                      {{ item.startDate.slice(0, 10) }}
                    </span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">{{
                      item.endDate.slice(0, 10)
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-else
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
              "
            >
              <img src="/loading.gif" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-12 col-md-12 col-sm-12 overflow-auto">
        <div class="mb-6" :class="fullWidthView ? 'fullView' : ''">
          <form id="manger-form" @submit.prevent="changeFilterHandler">
            <div class="flex-between">
              <div>
                <p>Total Tasks: {{ filteredEvents.length }}</p>
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
                <SoftButtonVue
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
                </SoftButtonVue>
              </div>

              <button class="view-button mb-3" @click="showFullView()">
                <i
                  :class="fullWidthView ? 'fa fa-compress' : 'fa fa-expand'"
                ></i>
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

    <custom-modal ref="editProfileModal" :title="modalTitle">
      <form id="manger-form" @submit.prevent="editselfProfile">
        <div>
          <label for="inputField">Full name</label>
          <input
            class="inputField"
            type="text"
            placeholder="First name"
            v-model="workerData.username"
            required
          />
        </div>

        <div class="row">
          <div class="col-6">
            <label for="inputField">Email</label>
            <input
              autocomplete="username"
              class="inputField"
              v-model="workerData.email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="col-6">
            <label for="inputField">Phone No</label>
            <input
              class="inputField"
              v-model="workerData.phoneNumber"
              type="tel"
              required
              placeholder="Phone number"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <label for="inputField">Image</label>
            <input
              class="inputField"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              size="md"
            />
          </div>
          <div class="col-6">
            <div class="mt-4 switch d-flex align-items-center">
              <div>
                <input
                  v-model="workerData.is_sentMail"
                  type="checkbox"
                  id="checkbox1"
                />
                <label for="checkbox1"></label>
              </div>
              <h6>Send Task Notify Email</h6>
            </div>
          </div>

          <div class="col-6">
            <img
              style="width: 200px; border-radius: 100px; margin-top: 20px"
              :src="editpreview ? editpreview : '/preview.jpeg'"
              alt="asdas"
            />
          </div>
        </div>
      </form>
      <template v-slot:actions>
        <soft-button-vue
          @click="editselfProfile()"
          :loading="loading"
          form="manger-form"
          type="submit"
        >
          Save changes
        </soft-button-vue>
      </template>
    </custom-modal>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import useApi from "../supportElements/useAPI";
import SoftBadge from "../components/SoftBadge.vue";
import CustomModal from "./components/CustomModal.vue";
import { convertToFormData } from "../supportElements/common";
import SoftButtonVue from "../components/SoftButton.vue";
// import SoftSwitch from "../components/SoftSwitch.vue";
// import SoftCheckbox from "../components/SoftCheckbox.vue";
const api = useApi();
export default {
  components: {
    FullCalendar,
    SoftBadge,
    SoftButtonVue,
    CustomModal,
    // SoftSwitch,
    // SoftCheckbox,
  },
  data() {
    return {
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
  methods: {
    async sendTasksMailToWorker() {
      try {
        const resp = api.post(`/api/task/worker-mail/`, {
          worker: this.$route.params.id,
        });
        console.log(resp);
        this.$notify({
          type: "success",
          title: "Email Sent",
          text: `List of tasks sent to ${this.workerData.username} successfuly`,
        });
      } catch (err) {
        console.log(err);
      }
    },
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
        const response = await api.get(
          `/api/task/${this.$route.params.id}/worker-tasks/`,
          {}
        );
        this.tasks = response.data;
        console.log("worker tasks", this.tasks);
      } catch (err) {
        this.tasks = [];
      }
    },

    async getWorkerHandler() {
      try {
        this.loading = true;
        const response = await api.get(`/api/users/${this.$route.params.id}`);
        this.workerData = response.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
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
    this.getWorkerHandler();
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
