<template>
  <custom-modal
    class="taskModal"
    v-if="isOpen"
    :title="modalTitle"
    @closed="handleModalClosed"
  >
    <!-- submitTaskForm -->
    <form id="project-form" @submit.prevent="editProject">
      <div class="row">
        <div class="col-6">
          <div>
            <label for="inputField">Title: *</label>
            <input
              class="inputField"
              type="text"
              required
              :placeholder="loading ? 'Loading...' : 'Project title'"
              v-model="projectData.title"
            />
          </div>
          <div>
            <label for="inputField">Start Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="Start date"
              v-model="projectData.startDate"
            />
          </div>

          <div>
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              v-model="projectData.endDate"
            />
          </div>
        </div>
        <div class="col-6 justify-conten-center">
          <img
            class="mb-2 ml-5"
            style="
              width: 140px;
              height: 140px;
              border-radius: 50%;
              margin-top: 10px;
            "
            :src="preview ? preview : '/home-placeload.png'"
            alt="asdas"
          />

          <input
            class="inputField"
            type="file"
            accept="image/*"
            @change="handleFileChange"
          />
        </div>
      </div>
      <div class="row d-flex">
        <div class="col-6">
          <div class="mt-1 switch d-flex align-items-center">
            <div>
              <input
                v-model="workwithContractor"
                type="checkbox"
                id="checkbox1"
                name="is_sentMail"
              />
              <label for="checkbox1"></label>
            </div>
            <h6>Work with Contractor</h6>
          </div>
        </div>
        <div
          v-if="workwithContractor"
          class="col-6 justify-conten-center d-flex"
          style="display: flex; justify-content: center"
        >
          <div>
            <div class="">
              <label for="inputField">Contractors : </label>
            </div>
            <select class="inputField" v-model="selectedManagers">
              <option
                class="dropdownOptions"
                v-for="manager in allManagers"
                :key="manager.id"
                :value="manager.id"
              >
                {{ manager.username }}
              </option>
            </select>
          </div>
          <div>
            <SoftButton size="sm">Add New</SoftButton>
          </div>
        </div>
      </div>

      <div>
        <label for="inputField">Address</label>
        <input
          class="inputField"
          type="text"
          :placeholder="loading ? 'Loading...' : 'Project address'"
          v-model="projectData.address"
          size="md"
        />
      </div>

      <div style="width: 100%" class="flex-between">
        <div style="width: 46%">
          <div class="flex-between">
            <label for="inputField">Managers : </label>
          </div>
          <select class="inputField" v-model="selectedManagers" multiple="true">
            <option
              class="dropdownOptions"
              v-for="manager in allManagers"
              :key="manager.id"
              :value="manager.id"
            >
              {{ manager.username }}
            </option>
          </select>
          <span>Press ctrl to selecte multiple</span>
        </div>
        <div style="width: 46%">
          <label for="inputField">Description: *</label>
          <textarea
            rows="3"
            class="inputField"
            type="text"
            required
            placeholder="Project description"
            v-model="projectData.description"
          />
          <span>Press enter to start in new line</span>
        </div>
      </div>

      <div class="button-container">
        <soft-button
          type="button"
          color="danger"
          size="lg"
          @click="
            () => {
              this.$props.isOpen = false;
              this.handleModalClosed();
            }
          "
          >Close</soft-button
        >
        <soft-button type="submit" :loading="loading" color="success" size="lg">
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
    projectId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      workwithContractor: false,
      allManagers: [],
      preview: null,
      selectedManagers: [],
      loading: false,
      // projectStatus: [
      //   { value: "active", name: "Active" },
      //   { value: "pending", name: "Pending" },
      //   { value: "completed", name: "Completed" },
      //   { value: "cancelled", name: "cancelled" },
      // ],
      projectData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        address: "",
        image: File | String | null,
        color: "",
        project: "", // Populate this as needed
        managers: [],
      },
    };
  },
  components: {
    SoftButton,
  },
  computed: {
    modalTitle() {
      return this.projectId ? "Edit Task" : "Add Task";
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.projectId) {
        this.fetchProjectData(this.projectId);
      }
      this.getManagersershandler();
    },
    workwithContractor: "showToggle",
  },
  onMounted() {},
  methods: {
    showToggle() {
      console.log("tree", this.workwithContractor);
    },
    handleFileChange(event) {
      this.projectData.image = event.target.files[0];
    },
    async fetchProjectData() {
      try {
        this.loading = true;
        const response = await api.get(`/api/project/${this.projectId}`);
        this.projectData = response.data;
        this.preview = response.data.image;
        let seeManagers = [];
        response.data.managers.forEach((item) => {
          seeManagers.push(item.id);
        });
        this.selectedManagers = seeManagers;
        console.log("edit prjec", this.projectData);
        console.log("edit manages", this.selectedManagers);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async addNewProject() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.projectData, ["image"]);
        Object.keys(this.projectData).forEach((key) => {
          formData.append(key, this.projectData[key]);
        });
        const response = await api.post("/api/project/", formData);
        this.$notify({
          type: "success",
          title: "Project added",
          text: "Project added succesfuly",
        });
        console.log(response);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text: err,
        });
      } finally {
        this.loading = false;
      }
    },
    async editProject() {
      try {
        this.loading = true;
        this.projectData.managers = this.selectedManagers;
        let formData = convertToFormData(this.projectData, ["image"]);
        if (this.$props.projectId) {
          const resp = await api.patch(
            `/api/project/${this.projectId}/`,
            formData
          );
          console.log("prject data", resp);
        } else {
          const response = await api.post("/api/project/", formData);
          this.$notify({
            type: "success",
            title: "Project added",
            text: "Project added succesfuly",
          });
          console.log("prject data", response);
        }

        this.$notify({
          type: "success",
          title: "Task Updated",
          text: "Task updated succesfuly",
        });
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

    submitTaskForm() {
      // Implement your logic to submit the task form
      // Example:
      // api.post("/api/task/", this.projectData).then(() => {
      //   this.handleModalClosed();
      //   // Additional logic after form submission
      // });
    },

    async getManagersershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/manager/", {});
        this.allManagers = response.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    handleModalClosed() {
      this.projectData = {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        color: "",
        project: "",
        managers: [],
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
