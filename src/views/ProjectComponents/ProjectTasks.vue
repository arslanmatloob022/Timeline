<template>
  <div class="container-fluid">
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
                this.openTaskForm(null);
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
            <table class="table mb-0">
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
                          {{ task.description.slice(0, 42) }}
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
                          :src="manager.avatar ? manager.avatar : spaceImg"
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
                        :style="{
                          color: task.status == 'active' ? '#82d616' : '',
                        }"
                        @click="updateTaskStatus(task.id, 'active')"
                        href="javascript:;"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Active</a
                      >
                      |
                      <a
                        @click="updateTaskStatus(task.id, 'pending')"
                        href="javascript:;"
                        :style="{
                          color: task.status == 'pending' ? '#82d616' : '',
                        }"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Pending</a
                      >
                      |

                      <a
                        href="javascript:;"
                        :style="{
                          color: task.status == 'completed' ? '#82d616' : '',
                        }"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="updateTaskStatus(task.id, 'completed')"
                        >Completed</a
                      >
                      |
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
                        @click="this.openAlert(task.id)"
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
        <soft-button-vue @click="this.deleteTask()" :loading="loading">
          Delete Task
        </soft-button-vue>
      </template>
    </sweetAlert>

    <update-task-vue
      v-if="isTaskFormOpen"
      :projectID="currentProjectId"
      :isOpen="isTaskFormOpen"
      :closeModal="closeTaskForm"
      :taskId="editTaskId"
    />
  </div>
</template>
<script>
import img1 from "@/assets/img/home-decor-1.jpg";
import SoftButtonVue from "../../components/SoftButton.vue";
import img2 from "@/assets//img/home-decor-1.jpg";
import { convertToFormData } from "@/supportElements/common.js";
import useApi from "../../supportElements/useAPI";
import spaceImg from "@/assets/img/team-4.jpg";
import SoftBadge from "../../components/SoftBadge.vue";
import updateTaskVue from "../SupportComponents/updateTask.vue";
// import CustomModal from "../components/CustomModal.vue";
import sweetAlert from "../components/customAlert.vue";

const api = useApi();
export default {
  name: "ProjectsDetail",
  props: {
    projectID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      deleteTaskId: 0,
      activeTasks: 0,
      selectedManagers: [],
      preview: null,
      isProjectFormOpen: false,
      isTaskFormOpen: false,
      editTaskId: "",
      currentProjectId: "",
      editProjectId: null,
      loading: false,
      assignToMore: false,
      Taskstatus: [
        { value: "active", name: "Active" },
        { value: "pending", name: "Pre Construction" },
        { value: "completed", name: "Completed" },
        { value: "cancelled", name: "cancelled" },
      ],
      editmodalTitle: "Edit Project",
      modalTitle: "Add Task",
      alertData: {
        icon: "fa fa-bell",
        alertTitle: "Delete Task ?",
        alertDescription:
          "After deleting this task you will not be able to recover it",
      },
      delteAlertData: {
        icon: "fa fa-warning",
        alertTitle: "Delete Project Permanently?",
        alertDescription:
          "After deleting this Project you will not be able to recover it",
      },
      workersData: [{ id: 0, username: "", email: "", phoneNumber: "" }],

      projectId: this.$props.projectID,
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
      spaceImg,
    };
  },

  components: {
    updateTaskVue,
    sweetAlert,
    SoftBadge,
    SoftButtonVue,
  },
  watch: {
    projectID: "getProjectTasks",
  },
  methods: {
    openDeleteAlert(id) {
      this.$refs.deleteSweetAlert.openModal();
      this.projectIdDeleteTobe = id;
    },
    getActiveTasks() {
      this.activeTasks = this.projectTasks.filter(
        (tasks) => tasks.status == "active"
      );
      this.activeTasks = this.activeTasks.length;
    },
    closeTheModals() {
      this.taskData.title = "";
      this.taskData.description = "";
      this.taskData.startDate = "";
      this.taskData.endDate = "";
      this.taskData.workers = [];
      this.taskData.status = "";
    },

    openAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.deleteTaskId = id;
    },

    async addTaskHandler() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.taskData, []);
        const resp = await api.post("/api/task/", formData);
        this.closeTheModals();
        this.$refs.customModal.closeModal();
        this.getProject();
        this.getProjectTasks();
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
          `api/task/${this.$props.projectID}/project/`
        );
        this.projectTasks = resp.data;
        console.log(resp.data);
        this.getActiveTasks();
      } catch (err) {
        console.log(err);
      }
    },

    openTaskForm(taskId = null) {
      this.isTaskFormOpen = true;
      this.editTaskId = taskId;
      this.currentProjectId = this.$props.projectID;
    },

    closeTaskForm() {
      this.getProjectTasks();
      this.isTaskFormOpen = false;
      this.editTaskId = null; // Reset the editTaskId after closing
    },

    async updateTaskStatus(taskId, taskStatus) {
      try {
        const resp = api.patch(`/api/task/${taskId}/`, {
          status: taskStatus,
        });
        this.taskData.status = taskStatus;
        console.log(resp);
        this.$notify({
          type: "success",
          title: "Task updated",
          text: `Task set to ${taskStatus} succesfuly`,
        });
        this.getProjectTasks();
      } catch (err) {
        console.log(err);
      }
    },

    async deleteTask() {
      try {
        this.loading = true;
        const response = await api.delete(`/api/task/${this.deleteTaskId}/`);
        console.log(response);
        this.$refs.sweetAlert.closeModal();
        this.$notify({
          type: "error",
          title: "Task Deleted",
          text: `Task deleted succesfuly`,
        });
        this.getProjectTasks();
        this.loading = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
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
  },

  mounted() {
    this.projectId = this.$props.projectID;
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

.dropdown-card {
  position: absolute;
  left: 0; /* Adjust as needed */
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
