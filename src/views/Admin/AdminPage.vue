<script>
import { mapMutations, mapActions } from "vuex";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import AdminProjects from "@/views/Admin/AdminProjects.vue";
import AdminSideNav from "@/views/Admin/AdminSideNav";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

export default {
  name: "adminNavbar",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      showMenu: false,
      textWhite: true,
      minNav: true,
      toggleSidebar: true,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  props: [],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    // toggleSidebar() {
    //   this.toggleSidebarColor("bg-white");
    //   this.navbarMinimize();
    // },
  },
  components: {
    SoftAvatar,
    SoftBadge,
    AdminSideNav,
    AdminProjects,
    MiniStatisticsCard,
    // Navbar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  updated() {
    // const adminNavbar = document.getElementById("navbarBlur");
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY > 10 && this.$store.state.isNavFixed) {
    //     navbar.classList.add("blur");
    //     navbar.classList.add("position-sticky");
    //     navbar.classList.add("shadow-blur");
    //   } else {
    //     navbar.classList.remove("blur");
    //     navbar.classList.remove("position-sticky");
    //     navbar.classList.remove("shadow-blur");
    //   }
    // });
  },
};
</script>
<template>
  <div style="display: flex; flex-direction: column">
    <!-- sidebar -->
    <AdminSideNav
      :custom_class="this.$store.state.mcolor"
      :class="[
        this.$store.state.isTransparent,
        this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
      ]"
      v-if="this.$store.state.showSidenav"
    />
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
    >
      <!-- Topnavbar -->
      <navbar
        :class="[navClasses]"
        :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
        :minNav="navbarMinimize"
        v-if="this.$store.state.showNavbar"
      />

      <!-- stat boxes -->
      <div class="row container-fluid">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="Total Projects"
            value="153"
            :percentage="{
              value: '+505%',
              color: 'text-success',
            }"
            :icon="{
              component: 'ni ni-money-coins',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="New Projects"
            value="230"
            :percentage="{
              value: '+3%',
              color: 'text-success',
            }"
            :icon="{
              component: ' ni ni-world',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <mini-statistics-card
            title="Completed Projects"
            value="62"
            :percentage="{
              value: '-2%',
              color: 'text-danger',
            }"
            :icon="{
              component: 'ni ni-paper-diploma',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>

        <div class="col-xl-3 col-sm-6 mb-xl-0">
          <mini-statistics-card
            title="Canceled"
            value="0"
            :percentage="{
              value: '+5%',
              color: 'text-success',
            }"
            :icon="{
              component: 'ni ni-cart',
              background: iconBackground,
            }"
            direction-reverse
          />
        </div>
      </div>

      <AdminProjects></AdminProjects>
      <!-- Managers table -->
      <div class="card mb-4">
        <div class="card-header pb-0">
          <h6>Managers</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Managers
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    Projects
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img1"
                          size="sm"
                          border-radius="lg"
                          class="me-3"
                          alt="user1"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">John Michael</h6>
                        <p class="text-xs text-secondary mb-0">
                          john@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Manager</p>
                    <p class="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="success" variant="gradient" size="sm"
                      >Online</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >23/04/18</span
                    >
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img2"
                          class="me-3"
                          size="sm"
                          border-radius="lg"
                          alt="user2"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Alexa Liras</h6>
                        <p class="text-xs text-secondary mb-0">
                          alexa@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Programator</p>
                    <p class="text-xs text-secondary mb-0">Developer</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="secondary" variant="gradient" size="sm"
                      >Offline</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >11/01/19</span
                    >
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img3"
                          size="sm"
                          border-radius="lg"
                          class="me-3"
                          alt="user3"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Laurent Perrier</h6>
                        <p class="text-xs text-secondary mb-0">
                          laurent@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Executive</p>
                    <p class="text-xs text-secondary mb-0">Projects</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="success" variant="gradient" size="sm"
                      >Online</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >19/09/17</span
                    >
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img4"
                          class="me-3"
                          size="sm"
                          border-radius="lg"
                          alt="user4"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Michael Levi</h6>
                        <p class="text-xs text-secondary mb-0">
                          michael@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Programator</p>
                    <p class="text-xs text-secondary mb-0">Developer</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="success" variant="gradient" size="sm"
                      >Online</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >24/12/08</span
                    >
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img5"
                          class="me-3"
                          size="sm"
                          border-radius="lg"
                          alt="user5"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Richard Gran</h6>
                        <p class="text-xs text-secondary mb-0">
                          richard@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Manager</p>
                    <p class="text-xs text-secondary mb-0">Executive</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="secondary" variant="gradient" size="sm"
                      >Offline</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >04/10/21</span
                    >
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
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <soft-avatar
                          :img="img6"
                          class="me-3"
                          size="sm"
                          border-radius="lg"
                          alt="user6"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Miriam Eric</h6>
                        <p class="text-xs text-secondary mb-0">
                          miriam@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Programtor</p>
                    <p class="text-xs text-secondary mb-0">Developer</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <soft-badge color="secondary" variant="gradient" size="sm"
                      >Offline</soft-badge
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >14/09/20</span
                    >
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
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
