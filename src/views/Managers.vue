<template>
  <div>
    <div class="card mb-4">
      <div
        class="card-header p-3"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h6>Mangers</h6>
        <add-button-vue @click="openCustomModal"
          ><slot>Add Manager</slot></add-button-vue
        >
      </div>

      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Name
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Function
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Status
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Employed
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredManagers" :key="item.id">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <soft-avatar
                        :img="item.avatar ? item.avatar : img2"
                        size="sm"
                        border-radius="lg"
                        class="me-3"
                        alt="user1"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ item.username }}</h6>
                      <p class="text-xs text-secondary mb-0">
                        {{ item.email }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ item.role }}</p>
                  <p class="text-xs text-secondary mb-0">Organization</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <soft-badge color="success" variant="gradient" size="sm">{{
                    item.is_active ? "Active" : "In-Active"
                  }}</soft-badge>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{
                    item.date_joined.slice(0, 10)
                  }}</span>
                </td>
                <td class="align-middle">
                  <a
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div
        class="card-header p-3"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h6>Workers</h6>
        <add-button-vue @click="openCustomModal"
          ><slot>Add Worker</slot></add-button-vue
        >
      </div>

      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Name
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Function
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Status
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Employed
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredWorkers" :key="item.id">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <soft-avatar
                        :img="item.avatar ? item.avatar : img2"
                        size="sm"
                        border-radius="lg"
                        class="me-3"
                        alt="user1"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ item.username }}</h6>
                      <p class="text-xs text-secondary mb-0">
                        {{ item.email }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ item.role }}</p>
                  <p class="text-xs text-secondary mb-0">Organization</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <soft-badge color="success" variant="gradient" size="sm">{{
                    item.is_active ? "Active" : "In-Active"
                  }}</soft-badge>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{
                    item.date_joined.slice(0, 10)
                  }}</span>
                </td>
                <td class="align-middle">
                  <a
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- add manager modal -->
    <custom-modal ref="customModal" :title="modalTitle">
      <!-- Custom content for the modal -->
      <form id="manger-form" @submit.prevent="addNewManger">
        <div>
          <label for="inputField">Full name</label>
          <input
            class="inputField"
            type="text"
            placeholder="First name"
            v-model="userData.username"
          />
        </div>

        <div>
          <label for="inputField">Email</label>
          <input
            class="inputField"
            v-model="userData.email"
            type="email"
            placeholder="Email"
          />
        </div>
        <!-- <div>
          <label for="inputField">Image</label>
          <input
            class="inputField"
            type="file"
            placeholder="Start date"
            @change="handleFileChange"
            size="md"
          />
        </div> -->
        <div>
          <label for="inputField">Role</label>
          <select class="inputField" v-model="userData.role">
            <option value="manager" selected>Select Manger</option>
            <option
              class="dropdownOptions"
              v-for="manager in roles"
              :key="manager.id"
              :value="manager.value"
            >
              {{ manager.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="inputField">Password</label>
          <input
            class="inputField"
            type="password"
            placeholder="Password"
            v-model="userData.password"
          />
        </div>
      </form>
      <template v-slot:actions>
        <soft-button-vue form="manger-form" type="submit">
          Add Manager
        </soft-button-vue>
      </template>
    </custom-modal>
  </div>
</template>

<script>
// import axios from "axios";
import AddButtonVue from "./components/AddButton.vue";
import CustomModal from "@/views/components/CustomModal.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
// import img1 from "@/assets/img/team-2.jpg";
import img1 from "@/assets/img/team-1.jpg";
import img2 from "@/assets/img/team-3.jpg";
import img3 from "@/assets/img/team-4.jpg";
import img4 from "@/assets/img/team-3.jpg";
import img5 from "@/assets/img/team-2.jpg";
import img6 from "@/assets/img/team-4.jpg";
import useApi from "../supportElements/useAPI";
import SoftButtonVue from "../components/SoftButton.vue";
const api = useApi();
export default {
  name: "authors-table",
  data() {
    return {
      modalTitle: "Add New Manager",
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      inputFieldValue: "",
      managersData: [],
      project: {
        title: "",
        description: "",
        image: File | null | String,
        startDate: "",
        endDate: "",
        status: "",
        managers: [],
      },
      userData: {
        username: "",
        email: "",
        password: "",
        status: "",
        role: "",
        // avatar: null,
      },
      roles: [
        { id: 1, value: "admin", name: "Admin" },
        { id: 2, value: "manager", name: "Manager" },
        { id: 3, value: "worker", name: "Worker" },
      ],
    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
    CustomModal,
    AddButtonVue,
    SoftButtonVue,
  },
  methods: {
    closeUserModalHandler() {
      (this.userData.username = ""),
        (this.userData.email = ""),
        (this.userData.password = ""),
        (this.userData.status = ""),
        (this.userData.role = "");
    },

    openCustomModal() {
      this.closeUserModalHandler();
      this.$refs.customModal.openModal();
    },
    saveAndClose() {
      this.$refs.customModal.closeModal();
    },

    handleFileChange(event) {
      this.userData.avatar = event.target.files[0];
    },

    async getManagershandler() {
      try {
        const response = await api.get("/api/users/", {});
        this.managersData = response.data;
        console.log("data", this.managersData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async addNewManger() {
      try {
        const formData = new FormData();
        Object.keys(this.userData).forEach((key) => {
          formData.append(key, this.userData[key]);
        });
        // formData.append("avatar", this.userData.avatar);

        const response = await api.post("/api/users/", formData);
        this.$notify({
          type: "success",
          title: "Manager Added",
          text: "Manager added succesfuly",
        });
        this.saveAndClose();
        console.log(response);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text: "Enter the information carefuly and try again",
        });
      }
    },
  },
  mounted() {
    this.getManagershandler();
  },
  computed: {
    filteredManagers() {
      return this.managersData.filter((item) => item.role === "manager");
    },

    filteredWorkers() {
      return this.managersData.filter((item) => item.role === "worker");
    },
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
  padding: 4px 14px;
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
