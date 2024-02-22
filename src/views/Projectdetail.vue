<template>
  <div class="container-fluid">
    <div class="Project-info">
      <div class="project-detail">
        <div class="mt-4 row">
          <div class="col-12">
            <div class="mb-4 card">
              <div class="p-3 pb-0 card-header">
                <h6 class="mb-1">Project information</h6>
                <p class="text-sm">
                  Here you can see and update any information of your project
                </p>
              </div>
              <div class="p-3 card-body">
                <div class="row">
                  <default-project-card
                    class="mb-4 col-xl-3 col-md-6 mb-xl-0"
                    :title="projectData.title"
                    :image="projectData.image"
                    :description="projectData.description"
                    :action="{
                      color: 'danger',
                      label: 'Delete Project',
                    }"
                  />

                  <div class="mb-4 ml-3 col-xl-3 col-md-6 mb-xl-0">
                    <div class="card card-blog card-plain">
                      <div class="px-1 pb-0 card-body">
                        <h5>Information</h5>
                        <ul
                          class="show dropdown-menu dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Start date</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-clock me-1"></i>
                                    {{ projectData.startDate }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>

                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >End date</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-clock me-1"></i>
                                    {{ projectData.endDate }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>

                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Total Tasks</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-list me-1"></i>
                                    {{
                                      projectData.total_tasks
                                        ? projectData.total_tasks
                                        : "No"
                                    }}
                                    Tasks
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Complate Tasks</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-list me-1"></i>
                                    1
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4 ml-3 col-xl-3 col-md-6 mb-xl-0">
                    <div class="card card-blog card-plain">
                      <div class="px-1 pb-0 card-body">
                        <h5>Managers</h5>
                        <ul
                          class="show dropdown-menu dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li
                            v-for="manager in projectData.managers"
                            :key="manager.id"
                            class="mb-2"
                          >
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div class="my-auto">
                                  <img
                                    src="@/assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3"
                                    alt="user image"
                                  />
                                </div>
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold">{{
                                      manager.username
                                    }}</span>
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    {{ manager.email }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>

                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div class="my-auto">
                                  <img
                                    src="@/assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3"
                                    alt="user image"
                                  />
                                </div>
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Manager Name</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    manager@gmail.com
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div class="my-auto">
                                  <img
                                    src="@/assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3"
                                    alt="user image"
                                  />
                                </div>
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Manager Name</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    manager@gmail.com
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="mb-2">
                            <a
                              class="dropdown-item border-radius-md"
                              href="javascript:;"
                            >
                              <div class="py-1 d-flex">
                                <div class="my-auto">
                                  <img
                                    src="@/assets/img/team-2.jpg"
                                    class="avatar avatar-sm me-3"
                                    alt="user image"
                                  />
                                </div>
                                <div
                                  class="d-flex flex-column justify-content-center"
                                >
                                  <h6 class="mb-1 text-sm font-weight-normal">
                                    <span class="font-weight-bold"
                                      >Manager Name</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    manager@gmail.com
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="managers-info"></div>
    </div>

    <div class="tasks-info">
      <div class="card mb-4">
        <div
          class="card-header p-3"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h6>Tasks</h6>
          <soft-button-vue><slot>Add Task</slot></soft-button-vue>
        </div>

        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Title
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    Workers
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    End Date
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Status
                  </th>
                  <th class="text-secondary opacity-7">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- v-for="item in managersData" :key="item.id" -->
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img2"
                          size="sm"
                          border-radius="lg"
                          class="me-3"
                          alt="user1"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Title</h6>
                        <p class="text-xs text-secondary mb-0">
                          Description will appear here
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Workers</p>
                    <p class="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="text-secondary text-xs font-weight-bold"
                      >12-34-5678</span
                    >
                  </td>
                  <td class="align-middle text-center">
                    <soft-badge color="warning" variant="gradient" size="sm"
                      >Pending</soft-badge
                    >
                  </td>
                  <td class="align-middle">
                    <div class="dropdown-container">
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Edit</a
                      >
                      |
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Done</a
                      >
                      |
                      <a
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
          </div>
        </div>
      </div>
    </div>
    <div class="project-timeline"></div>
  </div>
</template>
<script>
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
import SoftAvatar from "../components/SoftAvatar.vue";
import SoftButtonVue from "../components/SoftButton.vue";
import SoftBadge from "../components/SoftBadge.vue";
import img2 from "@/assets//img/home-decor-1.jpg";
import useApi from "../supportElements/useAPI";

const api = useApi();
export default {
  name: "ProjectsDetail",
  data() {
    return {
      projectId: this.$route.params.id,
      projectData: {
        id: 0,
        title: "",
        created: "",
        startDate: "",
        endDate: "",
        description: "",
        image: "",
        is_active: null,
        status: "",
        total_tasks: 0,

        managers: [
          {
            id: 0,
            username: "",
            avatar: null,
            email: "",
            role: "",
          },
        ],
      },
      img1,
      img2,
    };
  },

  components: {
    DefaultProjectCard,
    SoftAvatar,
    SoftBadge,
    SoftButtonVue,
  },
  methods: {
    async getProject(projectId) {
      try {
        const resp = await api.get(`/api/project/${projectId}/`);
        this.projectData = resp.data;
        console.log("project data ", this.projectData);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getProject(this.projectId);
  },
};
</script>

<style scoped></style>
