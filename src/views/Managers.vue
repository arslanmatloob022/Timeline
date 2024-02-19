<template>
  <div>
    <Managers></Managers>

    <workers-vue></workers-vue>
  </div>
</template>

<script>
import img1 from "@/assets/img/team-1.jpg";
import img2 from "@/assets/img/team-3.jpg";
import img3 from "@/assets/img/team-4.jpg";
import img4 from "@/assets/img/team-3.jpg";
import img5 from "@/assets/img/team-2.jpg";
import img6 from "@/assets/img/team-4.jpg";
import useApi from "../supportElements/useAPI";
import Managers from "../components/models/Managers.vue";
import WorkersVue from "../components/models/Workers.vue";
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
    WorkersVue,
    Managers,
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
