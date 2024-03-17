<template>
  <div class="mb-6">
    <div class="flex-between mb-1 px-1 py-2">
      <form id="manger-form" @submit.prevent="filterProject(null)">
        <div>
          <!-- <label for="inputField">Search project</label>
          <br /> -->
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
            placeholder="Search projects..."
            v-model="query"
          />
        </div>
      </form>

      <div class="filter-tabs">
        <SoftButtonVue
          @click="filterProject('all')"
          :class="this.activeFilter == 'all' ? 'active-btn' : ''"
          color="info"
          variant="gradient"
          size="sm"
          >All</SoftButtonVue
        >

        <SoftButtonVue
          @click="filterProject('active')"
          :class="this.activeFilter == 'active' ? 'active-btn' : ''"
          color="warning"
          variant="gradient"
          size="sm"
          >Active</SoftButtonVue
        >

        <SoftButtonVue
          @click="filterProject('pending')"
          :class="this.activeFilter == 'pending' ? 'active-btn' : ''"
          color="secondary"
          variant="gradient"
          size="sm"
          >Pre Construction</SoftButtonVue
        >

        <SoftButtonVue
          @click="filterProject('completed')"
          :class="this.activeFilter == 'completed' ? 'active-btn' : ''"
          color="success"
          variant="gradient"
          size="sm"
          >Completed</SoftButtonVue
        >
      </div>
    </div>

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
              <tr v-for="item in filteredProjects" :key="item.id">
                <td @click="this.$router.push(`/projectdetail/${item.id}`)">
                  <div style="cursor: pointer" class="d-flex px-2 py-1">
                    <div>
                      <soft-avatar
                        :img="item.image ? item.image : img9"
                        size="sm"
                        class="me-3"
                        alt="xd"
                        borderRadius="sm"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ item.title }}</h6>
                      <p class="mb-0 text-sm">
                        {{ item.description.slice(0, 40) }}...
                      </p>
                      <p class="text-xs text-secondary mb-0">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        {{ item.address ? item.address : "No address added" }}
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
                      :title="manager.username"
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
                  <span class="text-xs font-weight-bold">
                    <soft-badge
                      :color="ProjectStatuscolor[item.status]"
                      variant="gradient"
                      size="sm"
                      >{{ this.getProjectStatus[item.status] }}</soft-badge
                    >
                    -- Total tasks {{ item.total_tasks }}</span
                  >
                </td>
                <td class="align-middle">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="text-xs font-weight-bold mx-2"
                      >{{ item.percentage.toFixed(2) }}%</span
                    >
                    <div>
                      <soft-progress
                        color="info"
                        class="mx-auto"
                        variant="gradient"
                        :percentage="item.percentage"
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
                    <!-- <a
                      @click="this.openCompleteAlert(item.id)"
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Complete</a
                    >
                    / -->
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
          <div
            v-if="!loading && filteredProjects.length == 0"
            style="display: flex; align-items: center"
          >
            <h3 class="mt-5 mb-5" style="margin: auto">No project found</h3>
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
          <label for="inputField">Description: *</label>
          <textarea
            rows="3"
            class="inputField"
            type="text"
            placeholder="Project description"
            v-model="project.description"
            size="md"
          />
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
import SoftBadge from "@/components/SoftBadge.vue";
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

import SoftButtonVue from "../SoftButton.vue";
import { convertToFormData } from "../../supportElements/common";
import useApi from "../../supportElements/useAPI";
const api = useApi();
export default {
  name: "projects-card",
  data() {
    return {
      ProjectStatuscolor: {
        pending: "secondary",
        active: "warning",
        completed: "success",
      },
      query: "",
      getProjectStatus: {
        pending: "Pre Construction",
        active: "Active",
        completed: "Completed",
      },
      filteredProjects: [],
      activeFilter: "all",
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
    SoftBadge,
  },

  methods: {
    filterProject(filterType) {
      console.log(this.query);
      if (this.query && filterType == null) {
        this.activeFilter = "all";
        this.filteredProjects = this.projects.filter((project) =>
          project.title.toLowerCase().includes(this.query.toLowerCase())
        );
        return;
      } else if (!this.query && filterType == null) {
        console.log("inside empty wuery");
        this.filteredProjects = this.projects;
        return;
      } else {
        this.query = "";
        console.log("else");
      }
      this.activeFilter = filterType;
      if (this.activeFilter != "all") {
        let data = this.projects.filter(
          (project) => project.status == this.activeFilter
        );
        this.filteredProjects = data;
      } else {
        this.filteredProjects = this.projects;
      }
    },
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
        const response = await api.get(
          "/api/project/my-projects-or-admin/",
          {}
        );
        this.projects = response.data;
        this.filteredProjects = response.data;
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

    async completeproject() {
      try {
        const response = await api.patch(
          `/api/project/${this.projectIdDeleteTobe}/`,
          { status: "completed" }
        );

        console.log(response);
        this.$notify({
          type: "error",
          title: "Project completed",
          text: "Project marked as completed",
        });
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
.filter-tabs {
  height: 60px;
}
.filter-tabs > button {
  margin-right: 20px;
  border: 5px solid transparent;
}
.active-btn {
  border-bottom: 5px solid rgb(5, 34, 250) !important;
  border-top: 5px solid rgb(5, 34, 250) !important;
}
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
