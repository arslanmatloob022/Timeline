<template>
  <div class="container-fluid">
    <div class="row">
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
                      Budget
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img1"
                            size="sm"
                            class="me-3"
                            alt="xd"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Soft UI XD Version</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Ryan Tompson"
                        >
                          <img :src="img2" rounded-circle alt="team1" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Romina Hadid"
                        >
                          <img :src="img3" alt="team2" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Alexander Smith"
                        >
                          <img :src="img4" alt="team3" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img :src="img5" rounded-circle alt="team4" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">$14,000</span>
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
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img6"
                            size="sm"
                            class="me-3"
                            alt="atlassian"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Add Progress Track</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Romina Hadid"
                        >
                          <img :src="img7" alt="team5" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img :src="img8" alt="team6" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">$3,000</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">10%</span>
                        <div>
                          <soft-progress
                            color="info"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="10"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img9"
                            size="sm"
                            class="me-3"
                            alt="team7"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Fix Platform Errors</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Romina Hadid"
                        >
                          <img :src="img10" alt="team8" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img :src="img11" alt="team9" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">Not set</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">100%</span>
                        <div>
                          <soft-progress
                            color="success"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="100"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img12"
                            class="me-3"
                            size="sm"
                            alt="spotify"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Launch our Mobile App</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Ryan Tompson"
                        >
                          <img :src="img13" alt="user1" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Romina Hadid"
                        >
                          <img :src="img14" alt="user2" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Alexander Smith"
                        >
                          <img :src="img15" alt="user3" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img :src="img16" alt="user4" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">$20,500</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">100%</span>
                        <div>
                          <soft-progress
                            color="success"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="100"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img17"
                            rounded-circle
                            class="me-3"
                            size="sm"
                            alt="jira"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Add the New Pricing Page</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Ryan Tompson"
                        >
                          <img :src="img18" alt="user5" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">$500</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">25%</span>
                        <div>
                          <soft-progress
                            color="info"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="25"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img19"
                            class="me-3"
                            size="sm"
                            alt="invision"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">Redesign New Online Shop</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="avatar-group mt-2">
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Ryan Tompson"
                        >
                          <img :src="img20" alt="user6" />
                        </a>
                        <a
                          href="javascript:;"
                          class="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-original-title="Jessica Doe"
                        >
                          <img :src="img21" alt="user7" />
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="text-xs font-weight-bold">$2,000</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span class="text-xs font-weight-bold mx-2">40%</span>
                        <div>
                          <soft-progress
                            color="info"
                            class="mx-auto"
                            variant="gradient"
                            :percentage="40"
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
    </div>

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
                <!-- <button >open</button> -->
              </div>

              <default-project-card
                title="Modern"
                :image="img1"
                label="Project #2"
                description="As Uber works through a huge amount of internal
                management turmoil."
                :authors="[
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                  {
                    image: team2,
                    name: 'Ryan Milly',
                  },
                  {
                    image: team3,
                    name: 'Nick Daniel',
                  },
                  {
                    image: team4,
                    name: 'Peterson',
                  },
                ]"
                :action="{
                  color: 'success',
                  label: 'View Project',
                }"
              />

              <default-project-card
                title="Scandinavian"
                :image="img2"
                label="Project #1"
                description="Music is something that every person has his or her own
                      specific opinion about."
                :authors="[
                  {
                    image: team3,
                    name: 'Nick Daniel',
                  },
                  {
                    image: team4,
                    name: 'Peterson',
                  },
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                  {
                    image: team2,
                    name: 'Ryan Milly',
                  },
                ]"
                :action="{
                  color: 'success',
                  label: 'View Project',
                }"
              />

              <default-project-card
                title="Minimalist"
                :image="img3"
                label="Project #3"
                description="Different people have different taste, and various types
                      of music."
                :authors="[
                  {
                    image: team4,
                    name: 'Peterson',
                  },
                  {
                    image: team3,
                    name: 'Nick Daniel',
                  },
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                  {
                    image: team2,
                    name: 'Ryan Milly',
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
      <!-- Custom content for the modal -->
      <form @submit.prevent="addNewProject">
        <div>
          <label for="inputField">Title : *</label>
          <input
            class="inputField"
            type="text"
            placeholder="Project title"
            v-model="project.title"
            size="md"
          />
        </div>

        <div>
          <label for="inputField">Description</label>
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
            type="file"
            placeholder="Start date"
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
              placeholder="End date"
              v-model="project.startDate"
              size="md"
            />
          </div>

          <div>
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="Status"
              v-model="project.endDate"
              size="md"
            />
          </div>
        </div>
        <div>
          <label for="inputField">Active</label>
          <input
            class="inputField"
            type="text"
            placeholder="Active"
            v-model="project.is_active"
            size="md"
          />
        </div>
        <div>
          <label for="inputField">Managers : *</label>
          <select class="inputField" v-model="project.managers" multiple="true">
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
        <button class="action-btn" type="submit">Save</button>
      </form>
      <!-- <template v-slot:actions> </template> -->
    </custom-modal>
  </div>
</template>

<script>
import SoftAvatar from "@/components/SoftAvatar.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
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
import axios from "axios";
import { mapState } from "vuex";
import AddButtonVue from "./components/AddButton.vue";
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
      modalTitle: "Add New Project",
      inputFieldValue: "",
      project: {
        title: "",
        description: "",
        image: null | String,
        startDate: "",
        endDate: "",
        status: "",
        managers: [],
      },
      managers: [
        { id: 1, name: "Manager 1" },
        { id: 9, name: "Manager 9" },
      ],
    };
  },
  components: {
    SoftAvatar,
    SoftProgress,
    DefaultProjectCard,
    PlaceHolderCard,
    CustomModal,
    AddButtonVue,
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
      this.project.status = "";
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
        const formData = new FormData();
        Object.keys(this.project).forEach((key) => {
          formData.append(key, this.project[key]);
        });
        const response = await axios.post(
          "https://vecel-practice.vercel.app/api/project/",
          formData,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Token ${this.$store.state.token}`,
            },
          }
        );
        this.$notify({
          type: "success",
          title: "Project added",
          text: "Project added succesfuly",
        });
        console.log(response);
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text: err,
        });
      }
    },
  },
  mounted() {
    this.userToken = this.token;
    setTooltip();
  },
};
</script>
<style scoped>
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
