<template>
  <div class="mb-6">
    <form id="manger-form" @submit.prevent="searchProjectHandler">
      <div class="flex-between">
        <div>
          <label for="inputField">Search project</label>
          <br />
          <input
            class="inputField mb-4 px-3 py-2"
            style="
              border: none;
              background-color: white;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              border-radius: 20px;
              outline: none;
              width: 300px;
            "
            type="text"
            placeholder="search ..."
            v-model="query"
            @input="filteredProjects()"
          />
        </div>

        <!-- <div class="tabs-container">
          <button
            @click="filterProject('all')"
            :class="this.filterProjects == 'all' ? 'active' : ''"
          >
            All
          </button>
          <button
            @click="filterProject('active')"
            :class="this.filterProjects == 'active' ? 'active' : ''"
          >
            Active
          </button>
          <button
            @click="filterProject('pending')"
            :class="this.filterProjects == 'pending' ? 'active' : ''"
          >
            Pending
          </button>
          <button
            @click="filterProject('completed')"
            :class="this.filterProjects == 'completed' ? 'active' : ''"
          >
            Completed
          </button>
        </div> -->
      </div>
    </form>
    <div class="card mb-4">
      <div
        class="card-header pb-0"
        style="display: flex; justify-content: space-between"
      >
        <h6>Projects</h6>
        <SoftButtonVue @click="openCustomModal"
          ><slot>Add Project</slot></SoftButtonVue
        >
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive">
          <table v-if="!loading" class="table mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Project
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Managers
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Status
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Completion
                </th>

                <th
                  class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in projects" :key="item.id">
                <td
                  style="width: 23%; white-space: wrap"
                  @click="this.$router.push(`/projectdetail/${item.id}`)"
                >
                  <div style="cursor: pointer" class="d-flex px-2 py-1">
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
                      <p class="mb-0 text-sm">
                        {{ item.description.slice(0, 40) }}...
                      </p>
                      <p class="text-xs text-secondary mb-0">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        {{ item.address }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="avatar-group mt-2">
                    <a
                      v-for="manager in item.managers"
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
                        :src="manager.avatar ? manager.avatar : img4"
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
                  <span class="text-xs font-weight-bold">{{
                    item.status
                  }}</span>
                </td>
                <td class="align-middle">
                  <div class="d-flex align-items-center justify-content-center">
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
                <td class="align-end">
                  <div class="dropdown-container">
                    <a
                      @click="this.$router.push(`/projectdetail/${item.id}`)"
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >View</a
                    >
                    /
                    <!-- @click="
                          this.$router.push(`/projectdetail/${item.id}`)
                        " -->
                    <a
                      @click="this.openCompleteAlert(item.id)"
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Complete</a
                    >
                    /
                    <a
                      @click="this.openDeleteAlert(item.id)"
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Delete</a
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-else
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
            "
          >
            <img src="/loading.gif" alt="" />
          </div>
        </div>
      </div>
    </div>

    <custom-modal ref="customModal" :title="modalTitle">
      <form id="project-form" @submit.prevent="addNewProject">
        <div class="flex-between">
          <div style="width: 60%; margin-right: 12px">
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
        </div>
        <div>
          <label for="inputField">Address: </label>
          <input
            class="inputField"
            type="text"
            required
            placeholder="Site address"
            v-model="project.address"
            size="md"
          />
        </div>
        <div>
          <label for="inputField">Description: *</label>
          <textarea
            class="inputField"
            type="textarea"
            placeholder="Project description"
            v-model="project.description"
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
        <!-- <div>
          <input
            style="width: 40px; width: 40px"
            class="custom-checkbox"
            id="inputField"
            type="checkbox"
            placeholder="Active"
            v-model="project.is_active"
          />
          <label for="inputField">Set Project Active</label>
        </div> -->
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
          @click="
            this.isProjectCompleted
              ? this.completeproject()
              : this.deleteProject()
          "
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
import SoftAvatar from "@/components/SoftAvatar.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import setTooltip from "@/assets/js/tooltip.js";
import SoftProgress from "@/components/SoftProgress.vue";
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
      query: "",
      filterProjects: "all",
      isProjectCompleted: false,
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
        address: "",
        is_active: false,
        managers: [],
      },
      managers: [{ id: 0, avatar: "", email: "", username: "" }],
    };
  },
  components: {
    SoftAvatar,
    SoftProgress,
    CustomModal,
    SoftButtonVue,
    SweetAlert,
  },
  computed: {
    ...mapState(["token"]),
    // filteredProjects() {
    //   if (!this.filterProjects || this.filterProjects == "all") {
    //     return this.projects.filter((project) => project.status != "completed");
    //   } else {
    //     return this.projects.filter(
    //       (project) => project.status == this.filterProjects
    //     );
    //   }
    // },
  },
  methods: {
    filteredProjects() {
      if (this.query) {
        this.projects = this.projects.filter((project) =>
          project.title.toLowerCase().includes(this.query.toLowerCase())
        );
      } else {
        this.getProjectHandler();
      }
    },

    filterProject(filters) {
      this.filterProjects = filters;
    },
    closeProjectModalHandler() {
      this.project.title = "";
      this.project.description = "";
      this.project.image = null;
      this.project.startDate = "";
      this.project.endDate = "";
      this.project.address = "";
      this.project.managers = [];
    },

    openDeleteAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.projectIdDeleteTobe = id;
    },

    openCompleteAlert(id) {
      (this.isProjectCompleted = true), this.$refs.sweetAlert.openModal();
      this.projectIdDeleteTobe = id;
      this.alertData = {
        icon: "fa fa-bell",
        alertTitle: "Alert",
        alertDescription: "Are you sure you have completed this project ?",
      };
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
        console.log("deleted", response);
        this.$notify({
          type: "error",
          title: "Project deleted",
          text: "Selected project deleted successfuly!",
        });
        this.getProjectHandler();
      } catch (err) {
        console.log(err);
        console.log("not deleted");
      } finally {
        this.getProjectHandler();
        this.loading = false;
      }
    },

    async completeproject() {
      try {
        const response = await api.patch(
          `/api/project/${this.projectIdDeleteTobe}/`,
          { status: "completed" }
        );

        console.log(response);
        this.$notify({
          type: "info",
          title: "Project completed",
          text: "Project marked as completed",
        });
        this.$refs.sweetAlert.closeModal();
        this.getProjectHandler();
      } catch (err) {
        console.log(err);
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
