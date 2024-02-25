<template>
  <div>
    <div class="card mb-4 mt-6">
      <div
        class="card-header pb-0"
        style="display: flex; justify-content: space-between"
      >
        <h6>Completed Projects</h6>
        <!-- <SoftButtonVue @click="openCustomModal"
          ><slot>Add Project</slot></SoftButtonVue
        > -->
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive">
          <table v-if="!loading" class="table align-items-center mb-0">
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
                  Added at
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
              <tr v-for="item in completedProjects" :key="item.id">
                <td @click="this.$router.push(`/projectdetail/${item.id}`)">
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
                        :src="manager.avatar ? manager.avatar : img5"
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
                    item.created.slice(0, 10)
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
                    <!-- <a
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Done</a
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
        </div>
      </div>
    </div>
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
import { mapState } from "vuex";
import SoftButtonVue from "../SoftButton.vue";
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
      projects: [
        {
          title: "",
          description: "",
          image: File | String,
          startDate: "",
          endDate: "",
          status: "",
          is_active: false,
          managers: [],
        },
      ],
      project: {
        title: "",
        description: "",
        image: File | String,
        startDate: "",
        endDate: "",
        status: "",
        is_active: false,
        managers: [],
      },
      managers: [{ id: 0, avatar: "", email: "", username: "" }],
    };
  },
  components: {
    SoftAvatar,
    SoftProgress,
    // CustomModal,
    SoftButtonVue,
    SweetAlert,
  },
  computed: {
    ...mapState(["token"]),
    completedProjects() {
      return this.projects.filter((project) => project.status == "completed");
    },
  },
  methods: {
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
