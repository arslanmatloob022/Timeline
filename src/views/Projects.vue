<template>
  <div class="container-fluid">
    <DashboardProjects></DashboardProjects>
    <CalenderView />

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
import CustomModal from "@/views/components/CustomModal.vue";
import SoftButtonVue from "../components/SoftButton.vue";
import CalenderView from "../components/CalenderView.vue";
// import WorkerCalendarVue from "../components/WorkerCalendar.vue";
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
      managers: [{ id: 0, name: "" }],
    };
  },
  components: {
    SoftButtonVue,
    CustomModal,
    DashboardProjects,
    CalenderView,
    // WorkerCalendarVue,
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
  border: 2px solid #82d616;
  outline: none;
  box-shadow: 0 0 5px #82d61670;
}
.inputField:active {
  background-color: #f8f9fa;
}
.dropdownOptions {
  border-radius: 8px;
}
</style>
