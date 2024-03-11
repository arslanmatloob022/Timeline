<template>
  <div>
    <div class="container-fluid">
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                :src="this.userData.avatar ? this.userData.avatar : team1"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{ userData.username }}</h5>
              <p class="mb-0 text-sm font-weight-bold">
                {{ this.userData.role }}
              </p>
            </div>
          </div>
          <div
            class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
          >
            <div class="nav-wrapper position-relative end-0">
              <ul
                class="p-1 bg-transparent nav nav-pills nav-fill"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link active"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-2319.000000, -291.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(603.000000, 0.000000)">
                              <path
                                class="color-background"
                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                              ></path>
                              <path
                                class="color-background"
                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                opacity="0.7"
                              ></path>
                              <path
                                class="color-background"
                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                opacity="0.7"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span
                      @click="
                        () => {
                          this.$refs.editPasswordModal.openModal();
                        }
                      "
                      class="ms-1"
                      >Change password</span
                    >
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 40 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <title>settings</title>
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(-2020.000000, -442.000000)"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(304.000000, 151.000000)">
                              <polygon
                                class="color-background"
                                opacity="0.596981957"
                                points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                              ></polygon>
                              <path
                                class="color-background"
                                d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                opacity="0.596981957"
                              ></path>
                              <path
                                class="color-background"
                                d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span
                      @click="
                        () => {
                          this.$refs.editProfileModal.openModal();
                          this.editpreview = userData.avatar;
                        }
                      "
                      class="ms-1"
                      >Edit Profile</span
                    >
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="mt-3 row">
        <!-- <div class="col-12 col-md-6 col-xl-6">
          <div class="card h-100">
            <div class="p-3 pb-0 card-header">
              <h6 class="mb-0">Platform Settings</h6>
            </div>
            <div class="p-3 card-body">
              <h6 class="text-xs text-uppercase text-body font-weight-bolder">
                Account
              </h6>
              <ul class="list-group">
                <li class="px-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault"
                    name="email"
                    class="ps-0 ms-auto"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    checked
                    >Email me when someone follows me</soft-switch
                  >
                </li>
                <li class="px-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault1"
                    name="Email"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    class="ps-0 ms-auto"
                    >Email me when someone answers on my post</soft-switch
                  >
                </li>

                <li class="px-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault2"
                    name="Email"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    class="ps-0 ms-auto"
                    checked
                    >Email me when someone mentions me</soft-switch
                  >
                </li>
              </ul>
              <h6
                class="mt-4 text-xs text-uppercase text-body font-weight-bolder"
              >
                Application
              </h6>
              <ul class="list-group">
                <li class="px-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault3"
                    name="Project Launch"
                    class="ps-0 ms-auto"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    >New launches and projects</soft-switch
                  >
                </li>
                <li class="px-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault4"
                    name="Product Update"
                    class="ps-0 ms-auto"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    checked
                    >Monthly product updates</soft-switch
                  >
                </li>
                <li class="px-0 pb-0 border-0 list-group-item">
                  <soft-switch
                    id="flexSwitchCheckDefault5"
                    name="Newsletter"
                    class="ps-0 ms-auto"
                    label-class="mb-0 text-body ms-3 text-truncate w-80"
                    >Subscribe to newsletter</soft-switch
                  >
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <div
          :class="
            this.$store.state.user.role === 'admin'
              ? 'col-xl-6 mt-4 col-12 col-md-6 mt-md-0'
              : 'col-xl-12 mt-4 col-12 col-md-6 mt-md-0'
          "
        >
          <profile-info-card
            title="Profile Information"
            :description="`Hi ${this.userData.username}! Your journey starts here. Celebrate achievements, set new goals, and track progress. Every effort counts, no matter how small. Stay focused, and know that we're here to support you.`"
            :info="{
              fullName: this.userData.username,
              mobile: this.userData.phoneNumber,
              email: this.userData.email,
              location: 'USA',
            }"
            :social="[]"
            :action="{}"
          />
        </div>
        <div
          v-if="this.$store.state.user.role == 'admin'"
          style="max-height: 420px; overflow-y: auto"
          class="mt-4 col-12 col-xl-6 h-40 mt-xl-0"
        >
          <div class="card">
            <div
              style="align-items: center; justify-content: space-between"
              class="p-3 pb-0 card-header d-flex"
            >
              <h6 class="mb-0">Admins</h6>
              <i
                class="fa fa-user-plus pointer"
                @click="
                  () => {
                    this.$refs.customAdminModal.openModal();
                  }
                "
              ></i>
            </div>
            <div class="p-3 card-body">
              <ul class="list-group">
                <li
                  v-for="admin in adminsData"
                  :key="admin.id"
                  class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
                >
                  <soft-avatar
                    class="me-3"
                    :img="admin.avatar ? admin.avatar : team4"
                    alt="kal"
                    shadow="regular"
                    circular
                    size="md"
                  />
                  <div
                    class="d-flex align-items-start flex-column justify-content-center"
                  >
                    <h6 class="mb-0 text-sm">{{ admin.username }}</h6>
                    <p class="mb-0 text-xs">{{ admin.email }}</p>
                  </div>
                  <a
                    v-if="this.$store.state.user.role == 'admin'"
                    class="mb-0 btn btn-link pe-0 ps-0 ms-auto"
                    href="javascript:;"
                    @click="this.openStatusAlert(admin)"
                    >{{ admin.is_active ? "In-Active" : "Active" }}</a
                  >/
                  <a
                    v-if="this.$store.state.user.role == 'admin'"
                    class="mb-0 btn btn-link pe-3 ps-0 ms-0"
                    href="javascript:;"
                    @click="this.opendelteAlert(admin.id)"
                    >Delete</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-4 row">
        <div class="col-12">
          <div class="mb-4 card">
            <div class="p-3 pb-0 card-header">
              <h6 class="mb-1">Projects</h6>
              <p class="text-sm">Architects design houses</p>
            </div>
            <div class="p-3 card-body">
              <div class="row">
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

                <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                  <place-holder-card
                    :title="{ text: 'New project', variant: 'h5' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
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
          size="md"
          @click="this.deletAdmin()"
          :loading="loading"
        >
          Confirm
        </soft-button-vue>
      </template>
    </SweetAlert>

    <SweetAlert ref="statusSweetAlert" :alertData="statusAlertData">
      <template v-slot:actions>
        <soft-button-vue
          color="danger"
          size="md"
          @click="
            () => {
              this.$refs.statusSweetAlert.closeModal();
            }
          "
        >
          Cancel
        </soft-button-vue>
        <soft-button-vue
          size="md"
          @click="this.changeUserStatus()"
          :loading="loading"
        >
          Confirm
        </soft-button-vue>
      </template>
    </SweetAlert>

    <!-- add manager modal -->
    <custom-modal ref="customAdminModal" :title="modalTitle">
      <!-- Custom content for the modal -->
      <form id="manger-form" @submit.prevent="addNewAdmin">
        <div>
          <label for="inputField">Full name</label>
          <input
            class="inputField"
            type="text"
            placeholder="First name"
            v-model="adminFormData.username"
            required
          />
        </div>

        <div class="row">
          <div class="col-6">
            <label for="inputField">Email</label>
            <input
              autocomplete="username"
              class="inputField"
              v-model="adminFormData.email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="col-6">
            <label for="inputField">Phone No</label>
            <input
              class="inputField"
              v-model="adminFormData.phoneNumber"
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
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="adminFormData.password"
          />
        </div>
        <div style="display: flex; gap: 12px; margin: 6px; align-items: center">
          <i
            @click="togglePasswordVisibility()"
            :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
            class="pointer"
            aria-hidden="true"
          ></i>
          Show Password
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
          Add Admin
        </soft-button-vue>
      </template>
    </custom-modal>

    <custom-modal ref="editProfileModal" :title="editmodalTitle">
      <form id="manger-form" @submit.prevent="editselfProfile">
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
              :src="editpreview ? editpreview : '/preview.jpeg'"
              alt="asdas"
            />
          </div>
        </div>
      </form>
      <template v-slot:actions>
        <soft-button-vue :loading="loading" form="manger-form" type="submit">
          Save changes
        </soft-button-vue>
      </template>
    </custom-modal>

    <custom-modal
      ref="editPasswordModal"
      size="small"
      :title="passwordmodalTitle"
    >
      <form id="password-form" @submit.prevent="changePassword">
        <div class="row">
          <div class="col-12">
            <label for="inputField">Password</label>
            <input
              autocomplete="username"
              class="inputField"
              v-model="Password.newPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="New Password"
            />
          </div>
          <div class="col-12">
            <label for="inputField">Confirm Password</label>
            <input
              class="inputField"
              v-model="Password.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Confirm Password"
            />
          </div>
          <div
            style="display: flex; gap: 12px; margin: 6px; align-items: center"
          >
            <i
              @click="togglePasswordVisibility()"
              :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
              class="pointer"
              aria-hidden="true"
            ></i>
            Show Password
          </div>
        </div>
      </form>
      <template v-slot:actions>
        <soft-button-vue :loading="loading" form="password-form" type="submit">
          Save Password
        </soft-button-vue>
      </template>
    </custom-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomModal from "@/views/components/CustomModal.vue";
import SoftButtonVue from "@/components/SoftButton.vue";
// import SoftSwitch from "@/components/SoftSwitch.vue";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
// import DefaultProjectCard from "./components/DefaultProjectCard.vue";
// import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import useApi from "../supportElements/useAPI";
import SweetAlert from "@/views/components/customAlert.vue";
import { convertToFormData } from "../supportElements/common.js";

const api = useApi();
export default {
  name: "ProfileOverview",
  components: {
    CustomModal,
    SoftButtonVue,
    // SoftSwitch,
    ProfileInfoCard,
    SoftAvatar,
    // DefaultProjectCard,
    // PlaceHolderCard,
    SweetAlert,
  },
  data() {
    return {
      selectedIdToChangeStatus: null,
      selectedStatus: true,
      showPassword: false,
      loading: false,
      preview: null,
      editmodalTitle: "Edit Profile",
      passwordmodalTitle: "Change Password",
      editpreview: null,
      selectedIdToDelete: 0,
      alertData: {
        icon: "fa fa-warning",
        alertTitle: "Alert",
        alertDescription:
          "After deleting this Admin, you will not be able to recover it.",
      },
      statusAlertData: {
        icon: "fa fa-warning",
        alertTitle: "Change user status",
        alertDescription:
          "As you set the user to In-Active then user will not be able to sign-in in system and perform any action",
      },
      adminsData: [],
      showMenu: false,
      modalTitle: "Add Admin",
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
      userData: {
        id: 0,
        username: "",
        email: "",
        is_active: true,
        phoneNumber: "",
        avatar: File | null | String,
      },
      adminFormData: {
        username: "",
        email: "",
        password: "",
        status: "",
        role: "admin",
        phoneNumber: "",
        avatar: File | null | String,
      },
      Password: {
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    user() {
      return this.getUser;
    },
  },
  methods: {
    closeAdminModal() {
      this.adminFormData.username = "";
      this.adminFormData.email = "";
      this.adminFormData.password = "";
      this.adminFormData.phoneNumber = "";
      this.adminFormData.avatar = null;
    },
    openStatusAlert(user) {
      this.$refs.statusSweetAlert.openModal();
      this.selectedIdToChangeStatus = user.id;
      this.selectedStatus = user.is_active;
    },
    async changeUserStatus() {
      try {
        const resp = await api.patch(
          `/api/users/${this.selectedIdToChangeStatus}/`,
          {
            is_active: !this.selectedStatus,
          }
        );
        // this.user.is_active = this.selectedStatus;
        this.getManagershandler();
        this.$notify({
          type: !this.selectedStatus ? "success" : "error",
          title: "Manager",
          text: !this.selectedStatus
            ? "Manager set active successfully"
            : "Manager set Inactive successfully",
        });

        console.log(resp);
        this.$refs.statusSweetAlert.closeModal();
      } catch (err) {
        console.log(err);
      }
    },
    closePasswordModal() {
      this.Password.newPassword = "";
      this.Password.confirmPassword = "";
    },
    async getManagershandler() {
      try {
        this.loading = true;
        const response = await api.get("/api/users/by-role/admin/", {});
        this.adminsData = response.data;
        console.log("data", this.adminsData);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    opendelteAlert(id) {
      this.$refs.sweetAlert.openModal();
      this.selectedIdToDelete = id;
    },
    async deletAdmin() {
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

    handleFileChange(event) {
      this.userData.avatar = event.target.files[0];
      this.adminFormData.avatar = event.target.files[0];
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          this.editpreview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    async addNewAdmin() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.adminFormData, ["avatar"]);
        const response = await api.post("/api/users/", formData);
        this.$notify({
          type: "success",
          title: "Admin Added ",
          text: "Admin added  succesfuly",
        });

        this.$refs.customAdminModal.closeModal();
        this.getManagershandler();
        console.log(response);
        this.closeAdminModal();
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

    async editselfProfile() {
      try {
        this.loading = true;
        let formData = convertToFormData(this.userData, ["avatar"]);
        const resp = await api.patch(
          `/api/users/${this.userData.id}/`,
          formData
        );
        this.$store.commit("setUser", resp.data);
        this.userData = resp.data;
        this.$notify({
          type: "success",
          title: "Profile updated",
          text: "Entered information of your profile has beed updated",
        });
        this.userData = this.$store.state.user;
        this.$refs.editProfileModal.closeModal();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: "error",
          title: "Something went wrong !",
          text: "Something wrong has happened please try again.",
        });
      } finally {
        this.loading = false;
      }
    },

    async changePassword() {
      try {
        if (this.Password.newPassword == this.Password.confirmPassword) {
          const response = api.patch(`/api/users/${this.userData.id}/`, {
            password: this.Password.confirmPassword,
          });
          this.$notify({
            type: "success",
            title: "Password changed",
            text: "Your password changed successfuly.",
          });
          console.log(response);
          this.$refs.editPasswordModal.closeModal();
          this.closePasswordModal();
        } else {
          this.$notify({
            type: "error",
            title: "Passwords mismatches",
            text: "New password and confirm password are not same.",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    this.userData = this.$store.state.user;
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getManagershandler();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
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
