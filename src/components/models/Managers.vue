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
        <h6>Managers</h6>
        <soft-button-vue @click="openCustomModal()"
          ><slot>Add Manager</slot></soft-button-vue
        >
      </div>

      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table v-if="!loading" class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Name
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Phone no
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
                  Joined from
                </th>
                <th class="text-secondary opacity-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in managersData" :key="item.id">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <soft-avatar
                        :img="item.avatar ? item.avatar : '/preview.jpeg'"
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
                  <p class="text-xs font-weight-bold mb-0">
                    {{ item.phoneNumber ? item.phoneNumber : "---" }}
                  </p>
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
                  <div class="dropdown-container">
                    <a
                      @click="openCustomModal(true, item)"
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Edit</a
                    >

                    /

                    <a
                      @click="this.openAlert(item.id)"
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
            required
          />
        </div>

        <div class="row">
          <div class="col-6">
            <label for="inputField">Email</label>
            <input
              autocomplete="username"
              class="inputField"
              v-model="userData.email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="col-6">
            <label for="inputField">Phone No</label>
            <input
              class="inputField"
              v-model="userData.phoneNumber"
              type="tel"
              required
              placeholder="Phone number"
            />
          </div>
        </div>
        <div>
          <label for="inputField">Password</label>
          <input
            required
            class="inputField"
            type="password"
            placeholder="Password"
            v-model="userData.password"
          />
        </div>
        <div class="row">
          <div class="col-6">
            <label for="inputField">Image</label>
            <input
              class="inputField"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              size="md"
            />
          </div>
          <div class="col-6">
            <img
              style="width: 200px; border-radius: 100px; margin-top: 20px"
              :src="preview ? preview : '/preview.jpeg'"
              alt="asdas"
            />
          </div>
        </div>
      </form>
      <template v-slot:actions>
        <soft-button-vue :loading="loading" form="manger-form" type="submit">
          {{ editModeId ? "Save Manager" : "Add Manager" }}
        </soft-button-vue>
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
        <soft-button-vue size="md" @click="this.deletUser()" :loading="loading">
          Confirm
        </soft-button-vue>
      </template>
    </SweetAlert>
  </div>
</template>

<script>
// import axios from "axios";
import CustomModal from "@/views/components/CustomModal.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import useApi from "../../supportElements/useAPI";
import SoftButtonVue from "../SoftButton.vue";
import { convertToFormData } from "../../supportElements/common";
import SweetAlert from "@/views/components/customAlert.vue";
const api = useApi();
export default {
  name: "authors-table",
  data() {
    return {
      alertData: {
        icon: "fa fa-warning",
        alertTitle: "Alert",
        alertDescription:
          "After deleting this Manager, you will not be able to recover it.",
      },
      selectedUserId: null,
      showDropDown: false,
      loading: false,
      modalTitle: "Add Manager",

      managersData: [],
      userData: {
        username: "",
        email: "",
        password: "",
        status: "",
        role: "manager",
        phoneNumber: "",
        avatar: File | null | String,
      },

      editModeId: 0,
      preview: null,
      selectedIdToDelete: 0,
    };
  },
  components: {
    SoftAvatar,
    SweetAlert,
    SoftBadge,
    CustomModal,
    SoftButtonVue,
  },
  methods: {
    // openDeleteModal(item.id);
    openAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.selectedIdToDelete = id;
    },
    closeUserModalHandler() {
      (this.userData.username = ""),
        (this.userData.email = ""),
        (this.userData.password = ""),
        (this.userData.status = ""),
        (this.preview = null);
      this.phoneNumber = "";
    },

    // openDeleteModal(id) {
    //   this.selectedIdToDelete = id;
    //   this.$refs.deleteModal.openModal();
    // },
    async deletUser() {
      try {
        this.loading = true;
        await api.delete(`/api/users/${this.selectedIdToDelete}/`, {});
        this.getManagershandler();
        this.$notify({
          type: "warning",
          title: "Manager",
          text: "Manager deleted succesfuly",
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text: "Error while deleteing",
        });
      } finally {
        this.$refs.sweetAlert.closeModal();
        this.loading = false;
      }
    },
    openCustomModal(isEdit = false, manager = {}) {
      this.closeUserModalHandler();
      if (isEdit) {
        console.log("inside is edit", isEdit);
        this.editModeId = manager.id;
        this.modalTitle = "Edit Manager";
        this.userData.username = manager.username;
        this.userData.email = manager.email;
        this.userData.password = manager.password;
        this.userData.avatar = manager.avatar;
        this.preview = manager.avatar;
        this.userData.phoneNumber = manager.phoneNumber;
      } else {
        this.editModeId = 0;
        this.modalTitle = "Add Manager";
      }

      this.$refs.customModal.openModal();
    },
    saveAndClose() {
      this.$refs.customModal.closeModal();
    },

    handleFileChange(event) {
      this.userData.avatar = event.target.files[0];
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

    async getManagershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/manager/", {});
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
        this.loading = true;

        let formData = convertToFormData(this.userData, ["avatar"]);

        const response = this.editModeId
          ? await api.patch(`/api/users/${this.editModeId}/`, formData)
          : await api.post("/api/users/", formData);
        this.$notify({
          type: "success",
          title: "Manager",
          text: "Manager added or updated succesfuly",
        });

        this.saveAndClose();
        this.getManagershandler();
        console.log(response);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text:
            "Enter the information carefuly and try again OR user with email already exist",
        });
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getManagershandler();
  },
  computed: {},
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

/* Add these styles or adjust as needed */
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-card {
  position: absolute;
  left: -150px; /* Adjust as needed */
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
