<template>
  <custom-modal
    class="taskModal"
    v-if="isOpen"
    :title="modalTitle"
    @closed="handleModalClosed"
  >
    <!-- submitTaskForm -->
    <form id="project-form" @submit.prevent="editTaskHandler">
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
        <div>
          <label for="inputField">Color</label>
          <input
            class="inputField"
            type="color"
            placeholder="End date"
            v-model="taskData.color"
            size="md"
          />
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div style="width: 45%">
          <label for="inputField">Set status</label>
          <select class="inputField" v-model="taskData.status" multiple="false">
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
        <div style="width: 45%">
          <label for="inputField"
            >Workers : *
            <i
              style="margin-left: 26px; paddind: 4px 2px; color: #249c56"
              @click="getWorkershandler()"
              class="fa fa-plus"
              aria-hidden="true"
              >Add More worker(s)</i
            ></label
          >
          <select class="inputField" v-model="taskData.workers" multiple="true">
            <option
              class="dropdownOptions"
              v-for="worker in taskData.workers"
              :key="worker.id"
              :value="worker.id"
            >
              {{ worker.username }}
            </option>
          </select>
          <span>Press ctrl to selecte multiple</span>
        </div>
      </div>
      <div class="button-container">
        <soft-button
          type="button"
          color="danger"
          size="lg"
          @click="handleModalClosed"
          >Close</soft-button
        >
        <soft-button type="submit" color="success" size="lg">
          Save
        </soft-button>
      </div>
    </form>
  </custom-modal>
</template>

<script>
import useApi from "../../supportElements/useAPI";
import SoftButton from "../../components/SoftButton.vue";
import { convertToFormData } from "../../supportElements/common";
const api = useApi();
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    taskId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      Taskstatus: [
        { value: "active", name: "Active" },
        { value: "pending", name: "Pending" },
        { value: "completed", name: "Completed" },
        { value: "cancelled", name: "cancelled" },
      ],
      taskData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        color: "",
        project: "", // Populate this as needed
        workers: [
          {
            id: 0,
            username: "",
            email: "",
            role: "worker",
            avatar: null | String,
          },
        ],
      },
    };
  },
  components: {
    SoftButton,
  },
  computed: {
    modalTitle() {
      return this.taskId ? "Edit Task" : "Add Task";
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.taskId) {
        // Fetch task data when the modal is opened and taskId is available
        this.fetchTaskData();
      }
    },
  },
  methods: {
    async fetchTaskData() {
      try {
        const response = await api.get(`/api/task/${this.taskId}`);
        this.taskData = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async editTaskHandler() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.taskData, []);
        const resp = await api.patch(
          `/api/task/${this.taskData.id}/`,
          formData
        );
        // this.$refs.customModal.closeModal();
        // this.getProject(this.projectId);
        this.$notify({
          type: "success",
          title: "Task Updated",
          text: "Task updated succesfuly",
        });
        this.handleModalClosed();
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

    submitTaskForm() {
      // Implement your logic to submit the task form
      // Example:
      // api.post("/api/task/", this.taskData).then(() => {
      //   this.handleModalClosed();
      //   // Additional logic after form submission
      // });
    },

    async getWorkershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/worker/", {});
        this.taskData.workers = response.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    handleModalClosed() {
      // Reset form data and notify the parent to close the modal
      this.taskData = {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        color: "",
        project: "",
        workers: [],
      };
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.taskModal {
  background-color: #fff;
  box-shadow: 0px 0px 20px 1px #787878;
  border-radius: 24px;
  padding: 26px 20px;
  position: fixed;
  width: 60dvw;
  height: max-content;
  top: 10px;
  left: 24%;
  z-index: 99999;
}
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
