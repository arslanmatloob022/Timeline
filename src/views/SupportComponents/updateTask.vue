<template>
  <custom-modal
    class="taskModal"
    v-if="isOpen"
    :title="modalTitle"
    @closed="handleModalClosed"
  >
    <!-- submitTaskForm -->
    <div
      v-if="this.$props.taskId"
      class="delete-icon mb-3"
      @click="deleteTask()"
    >
      <i class="fas fa-trash-alt"></i>
    </div>
    <form id="project-form" @submit.prevent="editTaskHandler">
      <div>
        <label for="inputField">Title: *</label>
        <input
          class="inputField"
          type="text"
          required
          :placeholder="loading ? 'Loading...' : 'Titile'"
          v-model="taskData.title"
          size="md"
        />
      </div>

      <div>
        <label for="inputField">Description: *</label>
        <textarea
          rows="3"
          class="inputField"
          type="text"
          :placeholder="loading ? 'Loading...' : 'Description'"
          v-model="taskData.description"
          size="md"
        />
      </div>

      <div style="display: flex; justify-content: space-between">
        <div>
          <label for="inputField">Start Date</label>
          <input
            class="inputField"
            type="date"
            :placeholder="loading ? 'Loading...' : 'Start date'"
            v-model="taskData.startDate"
            size="md"
          />
        </div>

        <div>
          <label for="inputField">End Date</label>
          <input
            class="inputField"
            type="date"
            :placeholder="loading ? 'Loading...' : 'End date'"
            v-model="taskData.endDate"
            size="md"
          />
        </div>
        <div>
          <label for="inputField">Color</label>
          <input
            class="inputField"
            type="color"
            placeholder="Color"
            v-model="taskData.color"
            size="md"
          />
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div style="width: 100%">
          <label for="inputField">Workers : * </label>
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              font-weight: 500;
              gap: 10px;
              margin-bottom: 10px;
            "
          >
            <!-- Render tags for selected workers -->
            <div
              class="tag"
              v-for="(worker, index) in selectedWorkers"
              :key="index"
              style="position: relative"
            >
              <div
                class="btn mb-0 bg-gradient-info btn-sm null null"
                variant="gradient"
                disabled
                size="sm"
              >
                {{ worker.username }}
                <span
                  class="remove"
                  @click="removeWorker(index)"
                  style="position: absolute; top: 3px; right: 7px"
                  >x</span
                >
              </div>
            </div>
          </div>
          <select
            class="inputField"
            v-model="selectedWorkers"
            multiple
            required
            style="height: 100px"
          >
            <option
              class="dropdownOptions"
              v-for="worker in allWorkers"
              :key="worker.id"
              :value="worker"
            >
              {{ worker.username }}
            </option>
          </select>
          <span>Press ctrl to select multiple</span>
        </div>
      </div>

      <div class="button-container">
        <soft-button
          type="button"
          color="danger"
          size="md"
          @click="handleModalClosed"
          >Close</soft-button
        >
        <soft-button type="submit" :loading="loading" color="success" size="md">
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
    projectID: {
      type: Number,
      default: null,
    },
    startDate: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      allWorkers: [],
      loading: false,
      selectedWorkers: [],

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
        workers: [],
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

  methods: {
    removeWorker(index) {
      this.selectedWorkers.splice(index, 1);
    },
    async fetchTaskData() {
      try {
        this.loading = true;
        const response = await api.get(`/api/task/${this.$props.taskId}`);
        this.taskData = response.data;

        this.selectedWorkers = response.data.workers;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async editTaskHandler() {
      try {
        this.loading = true;
        let workerIDs = [];
        this.selectedWorkers.forEach((item) => {
          workerIDs.push(item.id);
        });
        this.taskData.workers = workerIDs;
        let formData = convertToFormData(this.taskData, []);
        if (this.projectID) {
          formData.append("project", this.projectID);
          await api.post(`/api/task/`, formData);
          this.$notify({
            type: "success",
            title: "Task Add",
            text: "Task added succesfuly",
          });
        } else {
          await api.patch(`/api/task/${this.taskData.id}/`, formData);

          this.$notify({
            type: "success",
            title: "Task Updated",
            text: "Task updated succesfuly",
          });
        }
        this.handleModalClosed();
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

    async deleteTask() {
      try {
        this.loading = true;
        const response = await api.delete(`/api/task/${this.$props.taskId}/`);
        console.log(response);
        this.$notify({
          type: "error",
          title: "Task Deleted",
          text: `Task deleted succesfuly`,
        });
        this.loading = false;
        this.handleModalClosed();
      } catch (err) {
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
        const response = await api.get("/api/users/by-role-option/worker/", {});
        this.allWorkers = response.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    handleModalClosed() {
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
  mounted() {
    console.log("mounted inside");
    if (this.taskId) {
      this.fetchTaskData();
    }
    this.getWorkershandler();

    console.log("start date", this.startDate);
    if (this.startDate) {
      this.taskData.startDate = this.startDate;
      console.log("task data ", this.taskData);
    }
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
  border: 2px solid #82d616;
  /* Change the border color when in focus */
  outline: none;
  /* Remove the default focus outline */
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
  left: -150px;
  /* Adjust as needed */
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
