<template>
  <div>
    <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-1">Projects</h6>
            <p class="text-sm">Add and Build dream homes</p>
          </div>
          <div class="p-3 card-body">
            <div class="row">
              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <place-holder-card
                  @click="openCustomModal"
                  :title="{ text: 'New project', variant: 'h5' }"
                />
              </div>

              <default-project-
                v-for="project in projects"
                :key="project.id"
                title="Modern"
                :image="project.image"
                :label="project.title"
                :description="project.description"
                :authors="[
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                ]"
                :action="{
                  color: 'success',
                  label: 'View Project',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <custom-modal ref="customModal" :title="modalTitle">
      <form id="project-form" @submit.prevent="addNewProject">
        <div>
          <label for="inputField">Title: *</label>
          <input
            class="inputField"
            type="text"
            required
            placeholder="Project title"
            v-model="project.title"
            size="md"
          />
        </div>

        <div>
          <label for="inputField">Description: *</label>
          <input
            class="inputField"
            type="text"
            placeholder="Project description"
            v-model="project.description"
            size="md"
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
            size="md"
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
              size="md"
            />
          </div>

          <div>
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              v-model="project.endDate"
              size="md"
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
            multiple="true"
          >
            <option
              class="dropdownOptions"
              v-for="(manager, index) in managers"
              :key="manager.id"
              :value="manager.id"
            >
              <p>{{ index + 1 }}).</p>
              {{ manager.username }}
            </option>
          </select>
        </div>
      </form>
      <template v-slot:actions>
        <SoftButtonVue form="project-form" type="submit" :loading="loading">
          Add Project
        </SoftButtonVue>
        <!-- <button >
          Add Project
        </button> -->
      </template>
    </custom-modal>

    <SweetAlert ref="sweetAlert" :alertData="alertData">
      <template v-slot:actions>
        <soft-button-vue
          color="danger"
          size="md"
          @click="
            () => {
              this.$refs.sweetAlert.closeModal();
            }
          "
        >
          Cancel
        </soft-button-vue>
        <soft-button-vue
          @click="this.deleteProject()"
          size="md"
          :loading="loading"
        >
          Confirm
        </soft-button-vue>
      </template>
    </SweetAlert>
  </div>
</template>

<script>
import SweetAlert from "@/views/components/customAlert.vue";
import { useAPI } from "@/supportElements/useAPI.js";
// import SoftAvatar from "@/components/SoftAvatar.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import setTooltip from "@/assets/js/tooltip.js";
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
import CustomModal from "@/views/components/CustomModal.vue";
import { mapState } from "vuex";
import SoftButtonVue from "../SoftButton.vue";
import { convertToFormData } from "../../supportElements/common";
import useApi from "../../supportElements/useAPI";
const api = useApi();
export default {
  name: "projects-card",
  data() {
    return {
      managerCount: 1,
      projectIdDeleteTobe: 0,
      alertData: {
        icon: "fa fa-warning",
        alertTitle: "Alert",
        alertDescription:
          "After deleting this Project, you will not be able to recover it.",
      },
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
      managers: [{ id: 0, avatar: "", email: "", username: "" }],
    };
  },
  components: {
    // SoftAvatar,
    // SoftProgress,
    CustomModal,
    SoftButtonVue,
    SweetAlert,
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

    openDeleteAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.projectIdDeleteTobe = id;
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

        const response = await api.post("/api/project/", formData);
        this.$notify({
          type: "success",
          title: "Project added",
          text: "Project added succesfuly",
        });
        this.getProjectHandler();
        console.log(response);
        this.loading = false;
        this.saveAndClose();
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
        this.loading = true;
        const response = await api.get("/api/project/", {});
        this.projects = response.data;
        console.log(this.projects);
        this.loading = false;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("");
        this.loading = false;
      }
    },

    async getManagersHandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/manager/", {});
        this.managers = response.data;
        console.log("mangers", this.managers);
        this.loading = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
        console.log("");
      }
    },

    async deleteProject() {
      try {
        this.loading = true;
        const response = api.delete(
          `/api/project/${this.projectIdDeleteTobe}/`
        );
        this.$refs.sweetAlert.closeModal();
        this.getProjectHandler();
        console.log("deleted", response);
      } catch (err) {
        console.log(err);
        console.log("not deleted");
      } finally {
        this.getProjectHandler();
        this.loading = false;
      }
    },
  },
  mounted() {
    this.userToken = this.token;
    setTooltip();
    this.getProjectHandler();
    this.getManagersHandler();
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
  display: flex;
  gap: 16px;
  border-radius: 8px;
}

.zoomout:hover {
  z-index: 1;
}
.dropdownOptions img {
  width: 24px;
  height: 24px;
  border-radius: 30px;
}
</style>
