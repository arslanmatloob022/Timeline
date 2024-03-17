<template>
  <div class="container-fluid">
    <div class="Project-info">
      <div class="project-detail">
        <div class="mt-4 row">
          <div class="col-12">
            <div class="mb-4 card">
              <div class="p-3 pb-0 card-header d-flex flex-between">
                <div class="align-items-center">
                  <h6 class="mb-1">Project information</h6>
                  <i
                    class="fa fa-pencil-square pointer"
                    @click="this.openProjectForm(this.projectId)"
                    aria-hidden="true"
                  ></i>
                </div>
                <soft-button-vue
                  @click="this.openDeleteAlert(this.projectId)"
                  color="danger"
                  >Delete Project</soft-button-vue
                >
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="mb-4 col-xl-4 col-md-6 mb-xl-0">
                    <div class="card card-blog card-plain">
                      <div class="position-relative">
                        <a class="shadow-xl d-block border-radius-xl">
                          <img
                            :src="projectData.image ? projectData.image : img2"
                            alt="img-blur-shadow"
                            class="shadow img-fluid border-radius-xl"
                          />
                        </a>
                      </div>
                      <div class="px-1 pb-0 card-body">
                        <a href="javascript:;">
                          <h5>{{ projectData.title }}</h5>
                        </a>
                        <p class="mb-4 text-sm">
                          {{ projectData.description }}
                        </p>
                        <div
                          class="d-flex align-items-center justify-content-between"
                        ></div>
                      </div>
                      <div class="project-button">
                        <SoftButtonVue
                          style="padding: 6px 16px"
                          @click="updateProjectStatus('active')"
                          color="warning"
                          :variant="
                            projectData.status == 'active'
                              ? 'gradient'
                              : 'outline'
                          "
                          size="sm"
                        >
                          Active
                        </SoftButtonVue>

                        <SoftButtonVue
                          style="padding: 6px 8px"
                          @click="updateProjectStatus('pending')"
                          color="secondary"
                          :variant="
                            projectData.status == 'pending'
                              ? 'gradient'
                              : 'outline'
                          "
                          size="sm"
                        >
                          Pre Construction
                        </SoftButtonVue>
                        <SoftButtonVue
                          style="padding: 6px 16px"
                          @click="updateProjectStatus('completed')"
                          color="primary"
                          :variant="
                            projectData.status == 'completed'
                              ? 'gradient'
                              : 'outline'
                          "
                          size="sm"
                        >
                          Completed
                        </SoftButtonVue>

                        <!-- <button
                          @click="updateProjectStatus('active')"
                          :class="
                            projectData.status == 'active' ? 'active' : ''
                          "
                        >
                          Active
                        </button>
                        <button
                          @click="updateProjectStatus('pending')"
                          class="project-button"
                          :class="
                            projectData.status == 'pending' ? 'active' : ''
                          "
                        >
                          Pending
                        </button> -->
                        <!-- <button
                          @click="updateProjectStatus('completed')"
                          class="project-button"
                          :class="
                            projectData.status == 'completed' ? 'active' : ''
                          "
                        >
                          Completed
                        </button> -->
                      </div>
                    </div>
                  </div>

                  <div class="mb-4 ml-4 col-xl-4 col-md-6 mb-xl-0">
                    <div class="card card-blog card-plain">
                      <h5>Informations</h5>
                      <div class="px-2 pb-0 card-body">
                        <div
                          class="show dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div class="mb-2">
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
                          </div>

                          <div class="mb-2">
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
                          </div>

                          <div class="mb-2">
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
                          </div>
                          <div class="mb-2">
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
                                      >Active Tasks</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-list me-1"></i>
                                    {{ this.activeTasks }}
                                    Tasks
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div class="mb-2">
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
                                      >Address</span
                                    >
                                  </h6>
                                  <p
                                    style="white-space: wrap"
                                    class="mb-0 text-xs text-secondary"
                                  >
                                    <i class="fa fa-home me-1"></i>
                                    {{ projectData.address }}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="mb-4 ml-3 col-xl-3 col-md-6 mb-xl-0"
                    style="border-left: 1px solid #8989893b"
                  >
                    <div class="card card-blog card-plain">
                      <h5>Managers</h5>
                      <div class="px-1 pb-0 card-body">
                        <div
                          class="show dropdown-menu-end me-sm-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div v-if="projectData.managers.length > 0">
                            <div
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
                            </div>
                          </div>
                          <div v-else class="mb-2">
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
                                      >No Manager Added</span
                                    >
                                  </h6>
                                  <p class="mb-0 text-xs text-secondary">
                                    <i class="fa fa-envelope me-1"></i>
                                    manager@email.com
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <soft-button-vue
            @click="
              () => {
                this.openTaskForm(null, projectData.id);
              }
            "
            size="md"
            variant="gradient"
          >
            <slot>Add Task</slot></soft-button-vue
          >
        </div>

        <!-- tasks -->
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table mb-0">
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
                <tr v-for="task in projectTasks" :key="task.id">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ task.title }}</h6>
                        <p class="text-xs text-secondary mb-0">
                          {{ task.description.slice(0, 42) }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="avatar-group mt-2">
                      <a
                        v-for="manager in task.workers"
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
                          :src="manager.avatar ? manager.avatar : spaceImg"
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
                    <span class="text-secondary text-xs font-weight-bold">{{
                      task.endDate
                    }}</span>
                  </td>
                  <td class="align-middle text-center">
                    <soft-badge color="warning" variant="gradient" size="sm">{{
                      task.status
                    }}</soft-badge>
                  </td>
                  <td class="align-middle">
                    <div class="dropdown-container">
                      <a
                        :style="{
                          color: task.status == 'active' ? '#82d616' : '',
                        }"
                        @click="updateTaskStatus(task.id, 'active')"
                        href="javascript:;"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Active</a
                      >
                      |
                      <a
                        @click="updateTaskStatus(task.id, 'pending')"
                        href="javascript:;"
                        :style="{
                          color: task.status == 'pending' ? '#82d616' : '',
                        }"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        >Pending</a
                      >
                      |

                      <a
                        href="javascript:;"
                        :style="{
                          color: task.status == 'completed' ? '#82d616' : '',
                        }"
                        class="font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="updateTaskStatus(task.id, 'completed')"
                        >Completed</a
                      >
                      |
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="this.openTaskForm(task.id, null)"
                        >Edit</a
                      >
                      |
                      <a
                        href="javascript:;"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        @click="this.openAlert(task.id)"
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

    <sweetAlert ref="sweetAlert" :alertData="alertData">
      <template v-slot:actions>
        <soft-button-vue
          color="danger"
          :loading="loading"
          @click="
            () => {
              this.$refs.sweetAlert.closeModal();
            }
          "
        >
          Cancel
        </soft-button-vue>
        <soft-button-vue @click="this.deleteTask()" :loading="loading">
          Delete Task
        </soft-button-vue>
      </template>
    </sweetAlert>

    <sweetAlert ref="deleteSweetAlert" :alertData="delteAlertData">
      <template v-slot:actions>
        <soft-button-vue
          color="danger"
          :loading="loading"
          @click="
            () => {
              this.$refs.deleteSweetAlert.closeModal();
            }
          "
        >
          Cancel
        </soft-button-vue>
        <soft-button-vue @click="this.deleteProject()" :loading="loading">
          Delete Project
        </soft-button-vue>
      </template>
    </sweetAlert>

    <custom-modal ref="customModal" :title="modalTitle">
      <form id="project-form" @submit.prevent="addTaskHandler">
        <div class="flex-between">
          <div style="width: 100%">
            <label for="inputField">Title: *</label>
            <input
              class="inputField"
              type="text"
              required
              placeholder="Task title"
              v-model="taskData.title"
              size="md"
            />
          </div>
          <!-- <div style="width: 45%">
            <label for="inputField">Set status</label>
            <select
              style="padding: 6px 8px"
              required
              class="inputField"
              v-model="taskData.status"
            >
              <option
                class="dropdownOptions"
                v-for="task in Taskstatus"
                :key="task.value"
                :value="task.value"
              >
                {{ task.name }}
              </option>
            </select>
          </div> -->
        </div>
        <div>
          <label for="inputField">Description: *</label>
          <textarea
            rows="4"
            class="inputField"
            type="text"
            placeholder="Task description"
            v-model="taskData.description"
            size="md"
          />
        </div>

        <div style="display: flex; justify-content: space-between">
          <div style="width: 45%">
            <label for="inputField">Start Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="Start date"
              v-model="taskData.startDate"
              size="md"
            />
          </div>

          <div style="width: 45%">
            <label for="inputField">End Date</label>
            <input
              class="inputField"
              type="date"
              placeholder="End date"
              v-model="taskData.endDate"
              size="md"
            />
          </div>
        </div>
        <div class="flex-between">
          <div style="width: 100%">
            <label for="inputField">Workers : *</label>
            <select
              required
              class="inputField"
              v-model="taskData.workers"
              multiple="true"
            >
              <option
                class="dropdownOptions"
                v-for="(worker, index) in workersData"
                :key="worker.id"
                :value="worker.id"
              >
                <p>{{ index + 1 }}).</p>
                {{ worker.username }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex-between">
          <span>Press ctrl to selecte multiple</span>
        </div>
      </form>
      <template v-slot:actions>
        <SoftButtonVue
          color="success"
          form="project-form"
          type="submit"
          :loading="loading"
        >
          Add Task
        </SoftButtonVue>
      </template>
    </custom-modal>

    <custom-modal ref="editCustomModal" :title="editmodalTitle">
      <form id="project-form" @submit.prevent="editProject">
        <div class="row">
          <div class="col-6">
            <div>
              <label for="inputField">Title: *</label>
              <input
                class="inputField"
                type="text"
                required
                placeholder="Project title"
                v-model="projectData.title"
                size="md"
              />
            </div>
            <div>
              <label for="inputField">Start Date</label>
              <input
                class="inputField"
                type="date"
                placeholder="Start date"
                v-model="projectData.startDate"
                size="md"
              />
            </div>

            <div>
              <label for="inputField">End Date</label>
              <input
                class="inputField"
                type="date"
                placeholder="End date"
                v-model="projectData.endDate"
                size="md"
              />
            </div>
          </div>
          <div class="col-6 justify-conten-center">
            <img
              class="mb-2 ml-5"
              style="
                width: 140px;
                height: 140px;
                border-radius: 50%;
                margin-top: 10px;
              "
              :src="preview ? preview : '/preview.jpeg'"
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
        <div>
          <label for="inputField">Description: *</label>
          <input
            class="inputField"
            type="text"
            placeholder="Project description"
            v-model="projectData.description"
            size="md"
          />
        </div>

        <div style="display: flex; justify-content: space-between"></div>
        <div class="align-items-center">
          <input
            class="custom-checkbox"
            id="inputFieldcheck"
            type="checkbox"
            placeholder="Active"
            v-model="projectData.is_active"
          />
          <label class="mt-2" for="inputFieldcheck">Set Project Active</label>
        </div>
        <div>
          <div class="flex-between">
            <label for="inputField">Managers : </label>
            <i
              style="color: #249c56; font-size: 14px"
              @click="getManagershandler()"
              class="fa fa-plus"
              aria-hidden="true"
              >Add More Manager(s)</i
            >
          </div>
          <select class="inputField" v-model="selectedManagers" multiple="true">
            <option
              class="dropdownOptions"
              v-for="manager in projectData.managers"
              :key="manager.id"
              :value="manager.id"
            >
              {{ manager.username }}
            </option>
          </select>
        </div>
      </form>
      <template v-slot:actions>
        <SoftButtonVue form="project-form" type="submit" :loading="loading">
          Save Project
        </SoftButtonVue>
      </template>
    </custom-modal>
    <updateProject
      :isOpen="isProjectFormOpen"
      :closeModal="closeProjectForm"
      :projectId="editProjectId"
    />
    <update-task-vue
      v-if="isTaskFormOpen"
      :projectID="currentProjectId"
      :isOpen="isTaskFormOpen"
      :closeModal="closeTaskForm"
      :taskId="editTaskId"
    />
  </div>
</template>
<script>
// import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
// import SoftAvatar from "../components/SoftAvatar.vue";
import SoftButtonVue from "../components/SoftButton.vue";
import SoftBadge from "../components/SoftBadge.vue";
import img2 from "@/assets//img/home-decor-1.jpg";
import useApi from "../supportElements/useAPI";
import sweetAlert from "./components/customAlert.vue";
import CustomModal from "./components/CustomModal.vue";
import { convertToFormData } from "@/supportElements/common.js";
import updateTaskVue from "./SupportComponents/updateTask.vue";
import updateProject from "./SupportComponents/updateProject.vue";

import spaceImg from "@/assets/img/team-4.jpg";

const api = useApi();
export default {
  name: "ProjectsDetail",
  data() {
    return {
      deleteTaskId: 0,
      activeTasks: 0,
      selectedManagers: [],
      preview: null,
      isProjectFormOpen: false,
      isTaskFormOpen: false,
      editTaskId: "",
      currentProjectId: "",
      editProjectId: null,
      loading: false,
      assignToMore: false,
      Taskstatus: [
        { value: "active", name: "Active" },
        { value: "pending", name: "Pre Construction" },
        { value: "completed", name: "Completed" },
        { value: "cancelled", name: "cancelled" },
      ],
      editmodalTitle: "Edit Project",
      modalTitle: "Add Task",
      alertData: {
        icon: "fa fa-bell",
        alertTitle: "Delete Task ?",
        alertDescription:
          "After deleting this task you will not be able to recover it",
      },
      delteAlertData: {
        icon: "fa fa-warning",
        alertTitle: "Delete Project Permanently?",
        alertDescription:
          "After deleting this Project you will not be able to recover it",
      },
      workersData: [{ id: 0, username: "", email: "", phoneNumber: "" }],

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
        address: "",
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

      taskData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        project: this.$route.params.id,
        workers: [],
      },

      projectTasks: [
        {
          id: 0,
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          project: 0,
          status: "",
          worker: [{ id: 0, username: "", email: "", role: "", avatar: "" }],
        },
      ],
      img1,
      img2,
      spaceImg,
    };
  },

  components: {
    updateProject,
    CustomModal,
    updateTaskVue,
    sweetAlert,
    SoftBadge,
    SoftButtonVue,
  },
  methods: {
    openDeleteAlert(id) {
      this.$refs.deleteSweetAlert.openModal();
      this.projectIdDeleteTobe = id;
    },
    async deleteProject() {
      try {
        this.loading = true;
        const response = api.delete(
          `/api/project/${this.projectIdDeleteTobe}/`
        );
        this.$refs.deleteSweetAlert.closeModal();
        console.log("deleted", response);
        this.$notify({
          type: "error",
          title: "Project deleted",
          text: "Selected project deleted successfuly!",
        });
        this.$router.push("/projects");
      } catch (err) {
        console.log(err);
        console.log("not deleted");
      } finally {
        this.loading = false;
      }
    },
    getActiveTasks() {
      this.activeTasks = this.projectTasks.filter(
        (tasks) => tasks.status == "active"
      );
      this.activeTasks = this.activeTasks.length;
    },
    closeTheModals() {
      this.taskData.title = "";
      this.taskData.description = "";
      this.taskData.startDate = "";
      this.taskData.endDate = "";
      this.taskData.workers = [];
      this.taskData.status = "";
    },

    async getProject() {
      try {
        const resp = await api.get(`/api/project/${this.projectId}/`);
        this.projectData = resp.data;
        this.preview = resp.data.image;

        console.log("project data ", this.projectData);
        this.getProjectTasks();
      } catch (err) {
        console.log(err);
      }
    },
    openAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.deleteTaskId = id;
    },
    async getWorkershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/worker/", {});
        this.workersData = response.data;
        console.log("data", this.workersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async addTaskHandler() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.taskData, []);
        const resp = await api.post("/api/task/", formData);
        this.closeTheModals();
        this.$refs.customModal.closeModal();
        this.getProject();
        this.getProjectTasks();
        this.$notify({
          type: "success",
          title: "Task Added",
          text: "Task added succesfuly",
        });
        console.log("task data", resp);
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Warning",
          text: "Something went wrong",
        });
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async getProjectTasks() {
      try {
        const resp = await api.get(
          `api/task/${this.$route.params.id}/project/`
        );
        this.projectTasks = resp.data;
        console.log(resp.data);
        this.getActiveTasks();
      } catch (err) {
        console.log(err);
      }
    },

    async getManagershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/manager/", {});
        this.projectData.managers = response.data;
        console.log("data", this.managersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    handleFileChange(event) {
      this.projectData.image = event.target.files[0];
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    async editProject() {
      try {
        this.projectData.managers = this.selectedManagers;
        let formData = convertToFormData(this.projectData, ["image"]);
        const resp = await api.patch(
          `/api/project/${this.$route.params.id}/`,
          formData
        );
        console.log(resp);
        this.$refs.editCustomModal.closeModal();
        this.$notify({
          type: "success",
          title: "Project updated",
          text: "Project updated succesfuly",
        });
        this.getProject(this.projectId);
      } catch (err) {
        console.log(err);
      }
    },

    openProjectForm(projectId) {
      this.isProjectFormOpen = true;
      this.editProjectId = projectId;
    },

    closeProjectForm() {
      this.getProject();
      this.isProjectFormOpen = false;
      this.editProjectId = null; // Reset the editTaskId after closing
    },

    openTaskForm(taskId = null, projectId = null) {
      this.isTaskFormOpen = true;
      this.editTaskId = taskId;
      this.currentProjectId = projectId;
    },

    closeTaskForm() {
      this.getProjectTasks();
      this.isTaskFormOpen = false;
      this.editTaskId = null; // Reset the editTaskId after closing
    },

    async updateTaskStatus(taskId, taskStatus) {
      try {
        const resp = api.patch(`/api/task/${taskId}/`, {
          status: taskStatus,
        });
        this.taskData.status = taskStatus;
        console.log(resp);
        this.$notify({
          type: "success",
          title: "Task updated",
          text: `Task set to ${taskStatus} succesfuly`,
        });
        this.getProject(this.projectId);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteTask() {
      try {
        this.loading = true;
        const response = await api.delete(`/api/task/${this.deleteTaskId}/`);
        console.log(response);
        this.$refs.sweetAlert.closeModal();
        this.$notify({
          type: "error",
          title: "Task Deleted",
          text: `Task deleted succesfuly`,
        });
        this.getProjectTasks();
        this.loading = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async updateProjectStatus(projectStatus) {
      try {
        const resp = api.patch(`/api/project/${this.projectId}/`, {
          status: projectStatus,
        });
        this.projectData.status = projectStatus;
        console.log(resp);
        this.projectData.status = projectStatus;
        this.$notify({
          type: "success",
          title: "Task updated",
          text: `Task set to ${
            projectStatus == "pending" ? "Pre Construction" : projectStatus
          } succesfuly`,
        });
        this.getProject();
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.projectId = this.$route.params.id;
    this.getProject(this.projectId);
    this.getWorkershandler();
    this.getProjectTasks();
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

.dropdown-card {
  position: absolute;
  left: 0; /* Adjust as needed */
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
