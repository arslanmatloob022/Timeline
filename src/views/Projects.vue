<template>
  <div class="container-fluid">

    <DashboardProjects></DashboardProjects>
    <!-- <div class="row">
      <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
        <div class="card mb-4">
          <div
            class="card-header pb-0"
            style="display: flex; justify-content: space-between"
          >
            <h6>Projects</h6>
            <add-button-vue @click="openCustomModal"
              ><slot>Add Project</slot></add-button-vue
            >
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Names
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Managers
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Added at
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in projects" :key="item.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="item.image ? item.image : img9"
                            size="sm"
                            class="me-3"
                            alt="xd"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ item.title }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        class="avatar-group mt-2"
                        v-for="manager in item.managers"
                        :key="manager.id"
                      >
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img
                            :src="manager.avatar ? manager.avatar : img5"
                            rounded-circle
                            alt="team4"
                          />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">{{
                        item.created.slice(0, 10)
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">60%</span>
                        <div>
                          <soft-progress
                            color="info"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="60"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <Projects></Projects>


    <!-- <div class="col-12">
      <CalenderView />
    </div> -->
    <!-- <ProjectsCard /> -->
    <completed-projects></completed-projects>
    <custom-modal ref="customModal" :title="modalTitle">
      <form id="project-form" @submit.prevent="addNewProject">
        <div>
          <label for="inputField">Title : *</label>
          <input
            required
            class="inputField"
            type="text"
            placeholder="Project title"
            v-model="project.title"
          />
        </div>

        <div>
          <label for="inputField">Description *</label>
          <input
            required
            class="inputField"
            type="text"
            placeholder="Project description"
            v-model="project.description"
          />
        </div>

        <div>
          <label for="inputField">Image</label>
          <input
            class="inputField"
            id="avatarInput"
            type="file"
            placeholder=""
            @change="handleFileChange"
          />
        </div>

        <div style="display: flex; justify-content: space-between">
          <div>
            <label for="inputField">Start Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="Start date"
              v-model="project.startDate"
            />
          </div>

          <div>
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              v-model="project.endDate"
            />
          </div>
        </div>
        <div>
          <input
            style="width: 40px; width: 40px"
            class="custom-checkbox"
            id="inputField"
            type="checkbox"
            placeholder="Active"
            v-model="project.is_active"
          />
          <label for="inputField">Set Project Active</label>
        </div>
        <div>
          <label for="inputField">Managers : *</label>
          <select
            required
            class="inputField"
            v-model="project.managers"
            multiple="false"
          >
            <option
              class="dropdownOptions"
              v-for="manager in managers"
              :key="manager.id"
              :value="manager.id"
            >
              {{ manager.name }}
            </option>
          </select>
        </div>
      </form>
      <template v-slot:actions>
        <SoftButtonVue form="project-form" type="submit" :loading="loading">
          Add Project
        </SoftButtonVue>
      </template>
    </custom-modal>
  </div>
</template>

<script>
import { useAPI } from "@/supportElements/useAPI.js";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import setTooltip from "@/assets/js/tooltip.js";

import DashboardProjects from "../components/models/DashboardProjects.vue";
// import SoftProgress from "@/components/SoftProgress.vue";

import img4 from "@/assets/img/team-3.jpg";
import img5 from "@/assets/img/team-4.jpg";
import img6 from "@/assets/img/small-logos/logo-atlassian.svg";
import img7 from "@/assets/img/team-2.jpg";
import img8 from "@/assets/img/team-4.jpg";
import img9 from "@/assets/img/small-logos/logo-slack.svg";
import img10 from "@/assets/img/team-3.jpg";
import img11 from "@/assets/img/team-1.jpg";
import img12 from "@/assets/img/small-logos/logo-spotify.svg";
import img13 from "@/assets/img/team-4.jpg";
import img14 from "@/assets/img/team-3.jpg";
import img15 from "@/assets/img/team-4.jpg";
import img16 from "@/assets/img/team-1.jpg";
import img17 from "@/assets/img/small-logos/logo-jira.svg";
import img18 from "@/assets/img/team-4.jpg";
import img19 from "@/assets/img/small-logos/logo-invision.svg";
import img20 from "@/assets/img/team-1.jpg";
import img21 from "@/assets/img/team-4.jpg";
import { mapState } from "vuex";
import { convertToFormData } from "../supportElements/common";
import useApi from "../supportElements/useAPI";

import CompletedProjects from "../components/models/CompletedProjects.vue";
import CustomModal from "@/views/components/CustomModal.vue";
import SoftButtonVue from "../components/SoftButton.vue";

const api = useApi();
export default {
  name: "projects-card",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17,
      img18,
      img19,
      img20,
      img21,
      useAPI,
      modalTitle: "Add New Project",
      inputFieldValue: "",
      loading: false,
      projects: [],
      project: {
        title: "",
        description: "",
        image: File | String,
        startDate: "",
        endDate: "",
        is_active: false,
        managers: [],
      },
      managers: [
        { id: 1, name: "Manager 1" },
        { id: 9, name: "Manager 9" },
      ],
    };
  },
  components: {

    // CalenderView,

    // DefaultProjectCard,
    Projects,

    SoftButtonVue,
    CustomModal,
    CompletedProjects,
    DashboardProjects
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    closeProjectModalHandler() {
      this.project.title = "";
      this.project.description = "";
      this.project.image = null;
      this.project.startDate = "";
      this.project.endDate = "";
      this.project.managers = [];
    },

    openCustomModal() {
      this.closeProjectModalHandler();
      this.$refs.customModal.openModal();
    },

    saveAndClose() {
      console.log("Input Field Value:", this.inputFieldValue);
      this.$refs.customModal.closeModal();
    },

    handleFileChange(event) {
      this.project.image = event.target.files[0];
    },

    async addNewProject() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.project, ["image"]);
        Object.keys(this.project).forEach((key) => {
          formData.append(key, this.project[key]);
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

    async getProjectHandler() {
      try {
        const response = await api.get("/api/project/", {});
        this.projects = response.data;
        console.log(this.projects);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("");
      }
    },

    async getManagers() {
      try {
        const resp = await api.get("/api/users/by-role/admin/", {});
        console.log("managers", resp);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.userToken = this.token;
    setTooltip();
    this.getProjectHandler();
  },
};
</script>
<style scoped>
.custom-checkbox input:checked + .checkmark {
  background-color: #4caf50;
  border-color: #4caf50;
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
  padding: 4px 24px;
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
</style>
