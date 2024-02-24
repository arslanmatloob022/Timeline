<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div> -->
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
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <!-- <label>Email</label>
                    <soft-input
                      v-model="username"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <label>Password</label>
                    <soft-input
                      v-model="password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                    /> -->
                    <soft-switch id="rememberMe" name="rememberMe" checked>
                      Remember me
                    </soft-switch>
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
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-5 col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <!-- <app-footer /> -->
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
// import AppFooter from "@/examples/PageLayout/Footer.vue";
// import SoftInput from "@/components/SoftInput.vue";
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import axios from "axios";
// import useApi from "../supportElements/useAPI";
// const api = useApi();

export default {
  name: "SignIn",
  data() {
    return {
      showAlert: false,
      username: "",
      password: "",
      loading: false,
    };
  },
  components: {
    // Navbar,
    // AppFooter,
    SoftSwitch,
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
        const user = response.data;
        console.log("new", response.data.token);
        this.$store.commit("setToken", token);
        this.$store.commit("setUser", user);
        this.loading = false;
        this.$notify({
          type: "success",
          title: "Important message",
          text: "Hello user!",
        });
        this.$router.push("/dashboard");
        console.error("Login success");
      } catch (error) {
        this.$notify({
          group: "auth",
          text: "Wrong credentials, please try again",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
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
