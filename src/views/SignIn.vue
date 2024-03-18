<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form
                    role="form"
                    @submit.prevent="handleLogin"
                    class="text-start"
                  >
                    <div>
                      <label for="inputField">User name</label>
                      <input
                        class="inputField mb-2"
                        type="text"
                        placeholder="Email"
                        v-model="username"
                      />
                    </div>

                    <div>
                      <label for="inputField">Password</label>
                      <input
                        class="inputField mb-3"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Password"
                      />
                    </div>

                    <div class="flex-between">
                      <div
                        style="
                          display: flex;
                          gap: 12px;
                          margin: 6px;
                          align-items: center;
                        "
                      >
                        <i
                          @click="togglePasswordVisibility()"
                          :class="
                            showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                          "
                          class="pointer"
                          aria-hidden="true"
                        ></i>
                        Show Password
                      </div>
                      <!-- <soft-switch id="rememberMe" name="rememberMe" checked>
                        Remember me
                      </soft-switch> -->
                    </div>

                    <div class="text-center">
                      <soft-button
                        :loading="loading"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        type="submit"
                        full-width
                        >Sign in
                      </soft-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-5 col-md-6 mt-n9">
              <img style="width: 100%; height: auto" src="@/assets/Ibex1.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import SoftSwitch from "@/components/SoftSwitch.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import axios from "axios";
import SoftButton from "../components/SoftButton.vue";

export default {
  name: "SignIn",
  data() {
    return {
      showPassword: false,
      showAlert: false,
      username: "",
      password: "",
      loading: false,
    };
  },
  components: {
    // Navbar,
    // AppFooter,
    // SoftSwitch,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),

    async handleLogin() {
      try {
        this.loading = true;
        // eslint-disable-next-line no-undef
        const response = await axios.post(
          "https://vecel-practice.vercel.app/api/auth/login/",
          {
            email: this.username,
            password: this.password,
          }
        );
        const token = response.data.token;
        const user = response.data.user;
        console.log("new", response.data.token);
        this.$store.commit("setToken", token);
        this.$store.commit("setUser", user);
        this.$store.dispatch("login", { isAuthenticated: true });
        this.loading = false;
        if (response.data.user.is_active) {
          this.$notify({
            type: "success",
            title: "Welcome Back.",
            text: `Hello ${response.data.user.username} !`,
          });
        }

        if (
          this.$store.state.user.role == "admin" &&
          this.$store.state.user.is_active == true
        ) {
          this.$router.push("/dashboard");
        } else if (
          this.$store.state.user.role == "manager" &&
          this.$store.state.user.is_active == true
        ) {
          this.$router.push("/projects");
        } else if (
          this.$store.state.user.role == "worker" &&
          this.$store.state.user.is_active == true
        ) {
          this.$router.push(`/workertasks`);
        } else {
          this.$notify({
            group: "auth",
            type: "error",
            text: "You're not allowed to sign-in inot the system.",
          });
        }

        console.error("Login success");
      } catch (error) {
        this.$notify({
          group: "auth",
          type: "error",
          text: "Wrong credentials, please try again",
        });
      } finally {
        this.loading = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
<style scoped>
.ibex-img {
  background-image: url("/@assets/Ibex1.png");
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
</style>
