<template>
  <div class="container-fluid">
    <DashboardProjects></DashboardProjects>
    <CalenderView />
  </div>
</template>

<script>
import DashboardProjects from "../components/models/DashboardProjects.vue";

import { useAPI } from "@/supportElements/useAPI.js";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import setTooltip from "@/assets/js/tooltip.js";
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
// import CustomModal from "@/views/components/CustomModal.vue";
// import SoftButtonVue from "../components/SoftButton.vue";
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
      isProjectFormOpen: false,
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
    // SoftButtonVue,
    // CustomModal,
    // updateProject,
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
