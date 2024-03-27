<template>
  <div class="container-fluid">
    <!-- submitTaskForm -->
    <h3>Enter project detail below:</h3>
    <form id="project-form" @submit.prevent="addNewProject">
      <div class="row">
        <div class="col-6 col-xl-6 col-md-12 col-sm-12">
          <div class="mb-3">
            <label for="inputField">Title: *</label>
            <input
              class="inputField"
              type="text"
              required
              :placeholder="loading ? 'Loading...' : 'Project title'"
              v-model="projectData.title"
            />
          </div>
          <div class="mb-3">
            <label for="inputField">Start Date *</label>
            <input
              class="inputField"
              type="date"
              placeholder="Start date"
              required
              v-model="projectData.startDate"
            />
          </div>

          <div class="mb-3">
            <label for="inputField">End Date *</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              required
              v-model="projectData.endDate"
            />
          </div>
        </div>
        <div class="col-6 justify-conten-center">
          <img
            class="mb-3 ml-5"
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

      <div class="mb-3">
        <label for="inputField">Address</label>
        <input
          class="inputField"
          type="text"
          :placeholder="loading ? 'Loading...' : 'Project address'"
          v-model="projectData.address"
          size="md"
        />
      </div>

      <div class="mb-3">
        <label for="inputField">Description: *</label>
        <textarea
          rows="3"
          class="inputField"
          type="text"
          required
          placeholder="Project description"
          v-model="projectData.description"
        />
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="flex-between">
            <label for="inputField">Managers : </label>
          </div>
          <select
            class="inputField"
            v-model="projectData.managers"
            multiple="true"
          >
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
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <h3>Client Information:</h3>
        </div>
        <div class="d-flex">
          <button
            id="btn-white"
            type="button"
            class="px-3 mb-2 mr-2 btn ms-2"
            :class="
              isSelectClient == false
                ? 'bg-gradient-success'
                : 'bg-gradient-secondary'
            "
            @click="
              isSelectClient = false;
              projectData.client = '';
            "
          >
            Create new
          </button>
          <button
            id="btn-transparent"
            type="button"
            :variant="isSelectClient == true ? 'gradient' : 'outline'"
            class="px-3 mb-2 btn"
            :class="
              isSelectClient == true
                ? 'bg-gradient-success'
                : 'bg-gradient-secondary'
            "
            @click="isSelectClient = true"
          >
            Select existing
          </button>
        </div>
        <div class="col-6" v-if="isSelectClient == true">
          <div
            class="justify-conten-center d-flex"
            style="display: flex; justify-content: center"
          >
            <label for="inputField">Selecte Client</label>
            <div>
              <select class="inputField" v-model="projectData.client">
                <option disabled selected value="">Select Client</option>
                <option
                  class="dropdownOptions"
                  v-for="client in allClients"
                  :key="client.id"
                  :value="client.id"
                >
                  {{ client.username }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-5 col-xl-6 col-md-12 col-sm-12">
            <div class="mb-3">
              <label for="inputField">Name: *</label>
              <input
                class="inputField"
                type="text"
                required
                :placeholder="loading ? 'Loading...' : 'Contractor name'"
                v-model="projectData.clientInfo.username"
              />
            </div>
            <div class="mb-3">
              <label for="inputField">Email: *</label>
              <input
                required
                class="inputField"
                type="email"
                placeholder="Enter email"
                v-model="projectData.clientInfo.email"
              />
            </div>

            <div class="mb-3">
              <label for="inputField">Phone</label>
              <input
                class="inputField"
                type="text"
                placeholder="Phone number"
                v-model="projectData.clientInfo.phoneNumber"
              />
            </div>
          </div>
          <!-- 
          <div class="col-6 justify-conten-center">
            <img
              class="mb-3 ml-5"
              style="
                width: 140px;
                height: 140px;
                border-radius: 50%;
                margin-top: 10px;
              "
              :src="preview ? preview : './preview.jpeg'"
              alt="asdas"
            />

            <input
              class="inputField"
              type="file"
              accept="image/*"
              @change="handleFileChange"
            />
          </div> -->
          <div class="col-6">
            <label for="inputField">Password</label>
            <input
              class="inputField mb-3"
              v-model="projectData.clientInfo.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
            />
            <div class="flex-between">
              <div
                style="
                  display: flex;
                  gap: 12px;
                  margin: 6px;
                  align-items: center;
                "
              >
                <i
                  @click="togglePasswordVisibility()"
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  class="pointer"
                  aria-hidden="true"
                ></i>
                Show Password
              </div>
            </div>
          </div>
          <div class="col-6">
            <label for="inputField">Cofirm Password</label>
            <input
              class="inputField mb-3"
              v-model="projectData.clientInfo.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
            />
          </div>
        </div>
      </div>

      <div class="mt-1 col-6 switch d-flex align-items-center">
        <div class="mb-2">
          <input
            v-model="workwithContractor"
            type="checkbox"
            id="showcontractor"
            name="showcontractor"
          />
          <label for="showcontractor"></label>
        </div>
        <h6>Work with Contractor</h6>
      </div>

      <div v-if="workwithContractor" class="row mt-5">
        <div class="col-6">
          <h3>Contractor Information:</h3>
        </div>
        <div class="d-flex">
          <button
            id="btn-white"
            type="button"
            class="px-3 mb-2 mr-2 btn ms-2"
            :class="
              isSelectContractor == false
                ? 'bg-gradient-success'
                : 'bg-gradient-secondary'
            "
            @click="
              isSelectContractor = false;
              projectData.contractor = '';
            "
          >
            Create new
          </button>
          <button
            id="btn-transparent"
            type="button"
            :variant="isSelectContractor == true ? 'gradient' : 'outline'"
            class="px-3 mb-2 btn"
            :class="
              isSelectContractor == true
                ? 'bg-gradient-success'
                : 'bg-gradient-secondary'
            "
            @click="isSelectContractor = true"
          >
            Select existing
          </button>
        </div>
        <div v-if="isSelectContractor == true" class="col-12">
          <div class="row">
            <div
              class="col-6 mb-3 justify-conten-center d-flex"
              style="display: flex; justify-content: center"
            >
              <label for="inputField">Selecte Contractor</label>
              <div>
                <select class="inputField" v-model="projectData.contractor">
                  <option disabled selected value="null">
                    Selecte Contractor
                  </option>
                  <option
                    class="dropdownOptions"
                    v-for="contractor in allContractors"
                    :key="contractor.id"
                    :value="contractor.id"
                  >
                    {{ contractor.username }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-5 col-xl-6 col-md-12 col-sm-12">
            <div class="mb-3">
              <label for="inputField">Name: *</label>
              <input
                class="inputField"
                type="text"
                :placeholder="loading ? 'Loading...' : 'Contractor name'"
                v-model="projectData.contractorInfo.username"
              />
            </div>
            <div class="mb-3">
              <label for="inputField">Email: *</label>
              <input
                class="inputField"
                type="email"
                placeholder="Enter email"
                v-model="projectData.contractorInfo.email"
              />
            </div>

            <div class="mb-3">
              <label for="inputField">Phone</label>
              <input
                class="inputField"
                type="text"
                placeholder="Phone number"
                v-model="projectData.contractorInfo.phoneNumber"
              />
            </div>
          </div>
          <!-- <div class="col-6 justify-conten-center">
            <img
              class="mb-3 ml-5"
              style="
                width: 140px;
                height: 140px;
                border-radius: 50%;
                margin-top: 10px;
              "
              :src="preview ? preview : './preview.jpeg'"
              alt="asdas"
            />

            <input
              class="inputField"
              type="file"
              accept="image/*"
              @change="handleFileChange"
            />
          </div> -->
          <div class="col-6">
            <label for="inputField">Password</label>
            <input
              class="inputField mb-3"
              v-model="projectData.contractorInfo.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
            />
            <div class="flex-between">
              <div
                style="
                  display: flex;
                  gap: 12px;
                  margin: 6px;
                  align-items: center;
                "
              >
                <i
                  @click="togglePasswordVisibility()"
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  class="pointer"
                  aria-hidden="true"
                ></i>
                Show Password
              </div>
            </div>
          </div>
          <div class="col-6">
            <label for="inputField">Cofirm Password</label>
            <input
              class="inputField mb-3"
              v-model="projectData.contractorInfo.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
            />
          </div>
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
  </div>
</template>

<script>
import useApi from "../supportElements/useAPI";
import SoftButton from "../components/SoftButton.vue";

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
      isSelectClient: false,
      isSelectContractor: false,
      showPassword: false,
      showContractorFields: false,
      workwithContractor: false,
      allManagers: [],
      allContractors: [],
      allClients: [],
      preview: null,
      selectedManagers: [],
      loading: false,
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
        client: null,
        contractor: null,
        clientInfo: {
          username: "",
          email: "",
          password: "",
        },
        contractorInfo: {
          username: "",
          email: "",
          password: "",
        },
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
  mounted() {
    this.getManagersershandler();
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
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
        let formData = new FormData();

        for (let dataKey in this.projectData) {
          if (dataKey === "clientInfo" || dataKey === "contractorInfo") {
            let jsonData = {};
            for (let previewKey in this.projectData[dataKey]) {
              jsonData[previewKey] = this.projectData[dataKey][previewKey];
            }
            formData.append(dataKey, JSON.stringify(jsonData));
          } else if (
            this.projectData[dataKey] == "" ||
            this.projectData[dataKey] == null
          ) {
            continue;
          } else {
            if (
              dataKey != "image" ||
              typeof this.projectData.image === "object"
            ) {
              let value = this.projectData[dataKey];
              if (dataKey === "managers") {
                value.forEach((item) => {
                  formData.append("managers", item);
                });
              } else {
                formData.append(dataKey, this.projectData[dataKey]);
              }
            }
          }
        }
        console.log("form data", formData);
        const response = await api.post("/api/project/", formData);
        this.$notify({
          type: "success",
          title: "Project added",
          text: "Project added succesfuly",
        });
        console.log(response);
        this.loading = false;
      } catch (err) {
        console.log(err);
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

    async getManagersershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/manager/", {});
        const Clientsresponse = await api.get("/api/users/by-role/client/", {});
        const Contractorsresponse = await api.get(
          "/api/users/by-role/contractor/",
          {}
        );
        this.allManagers = response.data;
        this.allContractors = Contractorsresponse.data;
        this.allClients = Clientsresponse.data;
        console.log("Clients", this.allClients);
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
