<template>
  <div class="container-fluid">
    <div class="Project-info">
      <div class="project-detail">
        <div class="mt-4 row">
          <div class="col-12">
            <div class="mb-4 card">
              <div class="p-3 pb-0 card-header">
                <h6 class="mb-1">Project information</h6>
                <!-- <p class="text-sm">
                  Here you can see and update any information of your project
                </p> -->
              </div>
              <div class="p-3 card-body">
                <div class="row">
                  <default-project-card
                    class="mb-4 col-xl-3 col-md-6 mb-xl-0"
                    :title="
                      projectData.title ? projectData.title : 'Project Title'
                    "
                    :image="projectData.image ? projectData.image : img1"
                    :description="
                      projectData.description
                        ? projectData.description
                        : 'Here you can see the description of your project that will briefly describe your project.'
                    "
                    :action="{
                      color: 'danger',
                      label: 'Delete Project',
                    }"
                  />
                  <div class="mb-4 ml-3 col-xl-3 col-md-6 mb-xl-0">
                    <div class="card card-blog card-plain">
                      <div class="px-1 pb-0 card-body">
                        <!-- <h5>Information</h5> -->
                        <div
                          class="show dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Start date</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-clock me-1"></i>
                                    {{ projectData.startDate }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>

                          <div class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >End date</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-clock me-1"></i>
                                    {{ projectData.endDate }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>

                          <div class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Total Tasks</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-list me-1"></i>
                                    {{
                                      projectData.total_tasks
                                        ? projectData.total_tasks
                                        : "No"
                                    }}
                                    Tasks
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Complate Tasks</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-list me-1"></i>
                                    1
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="mb-4 ml-3 col-xl-3 col-md-6 mb-xl-0"
                    style="border-left: 1px solid #898989"
                  >
                    <div class="card card-blog card-plain">
                      <div class="px-1 pb-0 card-body">
                        <h5>Managers</h5>
                        <div
                          class="show dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div v-if="projectData.managers.length > 0">
                            <div
                              v-for="manager in projectData.managers"
                              :key="manager.id"
                              class="mb-2"
                            >
                              <a
                                class="dropdown-item border-radius-md"
                                href="javascript:;"
                              >
                                <div class="py-1 d-flex">
                                  <div class="my-auto">
                                    <img
                                      src="@/assets/img/team-2.jpg"
                                      class="avatar avatar-sm me-3"
                                      alt="user image"
                                    />
                                  </div>
                                  <div
                                    class="d-flex flex-column justify-content-center"
                                  >
                                    <h6 class="mb-1 text-sm font-weight-normal">
                                      <span class="font-weight-bold">{{
                                        manager.username
                                      }}</span>
                                    </h6>
                                    <p class="mb-0 text-xs text-secondary">
                                      <i class="fa fa-envelope me-1"></i>
                                      {{ manager.email }}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div v-else class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div class="my-auto">
                                  <img
                                    src="@/assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3"
                                    alt="user image"
                                  />
                                </div>
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Manager Name</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    manager@email.com
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="managers-info"></div>
    </div>

    <div class="tasks-info">
      <div class="card mb-4">
        <div
          class="card-header p-3"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h6>Tasks</h6>
          <soft-button-vue
            @click="
              () => {
                this.$refs.customModal.openModal();
              }
            "
            size="md"
            variant="gradient"
          >
            <slot>Add Task</slot></soft-button-vue
          >
        </div>

        <!-- tasks -->
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Title
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    Workers
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    End Date
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Status
                  </th>
                  <th class="text-secondary opacity-7">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- v-for="item in managersData" :key="item.id" -->
                <tr v-for="task in projectTasks" :key="task.id">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ task.title }}</h6>
                        <p class="text-xs text-secondary mb-0">
                          {{ task.description }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="avatar-group mt-2">
                      <a
                        v-for="manager in task.workers"
                        :key="manager.id"
                        href="#"
                        class="avatar avatar-xs rounded-circle zoomout"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        :data-bs-original-title="
                          manager.username ? manager.username : 'Hi'
                        "
                      >
                        <img
                          :src="manager.avatar ? manager.avatar : img5"
                          rounded-circle
                          alt="image"
                        />
                        <P style="position: absolute; bottom: 7px">{{
                          manager.username
                        }}</P>
                      </a>
                    </div>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="text-secondary text-xs font-weight-bold">{{
                      task.endDate
                    }}</span>
                  </td>
                  <td class="align-middle text-center">
                    <soft-badge color="warning" variant="gradient" size="sm">{{
                      task.status
                    }}</soft-badge>
                  </td>
                  <td class="align-middle">
                    <div class="dropdown-container">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="this.openTaskForm(task.id)"
                        >Edit</a
                      >
                      |
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Done</a
                      >
                      |
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="this.openAlert()"
                        >Delete</a
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="project-timeline">Project Timeline</div>

    <sweetAlert ref="sweetAlert" :alertData="alertData">
      <template v-slot:actions>
        <soft-button-vue
          color="danger"
          :loading="loading"
          @click="
            () => {
              this.$refs.sweetAlert.closeModal();
            }
          "
        >
          Cancel
        </soft-button-vue>
        <soft-button-vue :loading="loading"> Confirm </soft-button-vue>
      </template>
    </sweetAlert>

    <custom-modal ref="customModal" :title="modalTitle">
      <form id="project-form" @submit.prevent="addTaskHandler">
        <div>
          <label for="inputField">Title: *</label>
          <input
            class="inputField"
            type="text"
            required
            placeholder="Task title"
            v-model="taskData.title"
            size="md"
          />
        </div>

        <div>
          <label for="inputField">Description: *</label>
          <input
            class="inputField"
            type="text"
            placeholder="Task description"
            v-model="taskData.description"
            size="md"
          />
        </div>

        <!-- <div>
          <label for="inputField">Image</label>
          <input
            class="inputField"
            id="avatarInput"
            type="file"
            placeholder=""
            @change="handleFileChange"
            size="md"
          />
        </div> -->

        <div style="display: flex; justify-content: space-between">
          <div>
            <label for="inputField">Start Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="Start date"
              v-model="taskData.startDate"
              size="md"
            />
          </div>

          <div>
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              v-model="taskData.endDate"
              size="md"
            />
          </div>
        </div>
        <div>
          <label for="inputField">Set status</label>
          <select
            required
            class="inputField"
            v-model="taskData.status"
            multiple="false"
          >
            <option
              class="dropdownOptions"
              v-for="task in Taskstatus"
              :key="task.value"
              :value="task.value"
            >
              {{ task.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="inputField">Workers : *</label>
          <select
            required
            class="inputField"
            v-model="taskData.workers"
            multiple="true"
          >
            <option
              class="dropdownOptions"
              v-for="(worker, index) in workersData"
              :key="worker.id"
              :value="worker.id"
            >
              <p>{{ index + 1 }}).</p>
              {{ worker.username }}
            </option>
          </select>
          <span>Press ctrl to selecte multiple</span>
        </div>
      </form>
      <template v-slot:actions>
        <SoftButtonVue form="project-form" type="submit" :loading="loading">
          Add Task
        </SoftButtonVue>
      </template>
    </custom-modal>

    <update-task-vue
      :isOpen="isTaskFormOpen"
      :closeModal="closeTaskForm"
      :taskId="editTaskId"
    />
  </div>
</template>
<script>
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
// import SoftAvatar from "../components/SoftAvatar.vue";
import SoftButtonVue from "../components/SoftButton.vue";
import SoftBadge from "../components/SoftBadge.vue";
import img2 from "@/assets//img/home-decor-1.jpg";
import useApi from "../supportElements/useAPI";
import sweetAlert from "./components/customAlert.vue";
import CustomModal from "./components/CustomModal.vue";
import { convertToFormData } from "@/supportElements/common.js";
import updateTaskVue from "./SupportComponents/updateTask.vue";

const api = useApi();
export default {
  name: "ProjectsDetail",
  data() {
    return {
      isTaskFormOpen: false,
      editTaskId: null,
      loading: false,
      Taskstatus: [
        { value: "active", name: "Active" },
        { value: "pending", name: "Pending" },
        { value: "completed", name: "Completed" },
        { value: "cancelled", name: "cancelled" },
      ],
      modalTitle: "Add Task",
      alertData: {
        icon: "fa fa-bell",
        alertTitle: "Alert",
        alertDescription: "This is Alert Description",
      },
      workersData: [{ id: 0, username: "", email: "", phoneNumber: "" }],

      projectId: this.$route.params.id,
      projectData: {
        id: 0,
        title: "",
        created: "",
        startDate: "",
        endDate: "",
        description: "",
        image: "",
        is_active: null,
        status: "",
        total_tasks: 0,

        managers: [
          {
            id: 0,
            username: "",
            avatar: null,
            email: "",
            role: "",
          },
        ],
      },

      taskData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        project: this.$route.params.id,
        workers: [],
      },

      projectTasks: [
        {
          id: 0,
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          project: 0,
          status: "",
          worker: [{ id: 0, username: "", email: "", role: "", avatar: "" }],
        },
      ],
      img1,
      img2,
    };
  },

  components: {
    CustomModal,
    updateTaskVue,
    sweetAlert,
    DefaultProjectCard,
    // SoftAvatar,
    SoftBadge,
    SoftButtonVue,
  },
  methods: {
    async getProject(projectId) {
      try {
        const resp = await api.get(`/api/project/${projectId}/`);
        this.projectData = resp.data;
        console.log("project data ", this.projectData);
      } catch (err) {
        console.log(err);
      }
    },
    openAlert() {
      this.$refs.sweetAlert.openModal();
    },
    async getWorkershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/worker/", {});
        this.workersData = response.data;
        console.log("data", this.workersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async addTaskHandler() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.taskData, []);
        const resp = await api.post("/api/task/", formData);
        this.$refs.customModal.closeModal();
        this.getProject(this.projectId);
        this.$notify({
          type: "success",
          title: "Task Added",
          text: "Task added succesfuly",
        });
        console.log("task data", resp);
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Warning",
          text: "Something went wrong",
        });
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async getProjectTasks() {
      try {
        const resp = await api.get(
          `api/task/${this.$route.params.id}/project/`
        );
        this.projectTasks = resp.data;
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    },

    openTaskForm(taskId = null) {
      // Open the TaskForm modal
      this.isTaskFormOpen = true;
      this.editTaskId = taskId;
    },
    closeTaskForm() {
      // Close the TaskForm modal
      this.isTaskFormOpen = false;
      this.editTaskId = null; // Reset the editTaskId after closing
    },
  },

  mounted() {
    this.getProject(this.projectId);
    this.getWorkershandler();
    this.getProjectTasks();
  },
};
</script>

<style scoped>
.action-btn {
  background-color: #82d616;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.inputField {
  width: 100%;
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid #cccccc;
}
.inputField:focus {
  border: 2px solid #82d616; /* Change the border color when in focus */
  outline: none; /* Remove the default focus outline */
  box-shadow: 0 0 5px #82d61670;
}
.inputField:active {
  background-color: #f8f9fa;
}
.dropdownOptions {
  border-radius: 8px;
}

/* Add these styles or adjust as needed */
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-card {
  position: absolute;
  left: -150px; /* Adjust as needed */
  top: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  z-index: 1;
}

.dropdown-card button {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-card button:hover {
  background-color: #0056b3;
}
</style>
