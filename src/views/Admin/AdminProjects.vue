<template>
  <div class="container-fluid">
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Projects</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Project
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Budget
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Status
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                >
                  Completion
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-invision.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="spotify"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Spotify</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$2,500</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">working</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">60%</span>
                    <div>
                      <soft-progress
                        color="info"
                        variant="gradient"
                        :percentage="60"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button class="btn btn-link text-secondary mb-0">
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-invision.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="invision"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Invision</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$5,000</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">done</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">100%</span>
                    <div>
                      <soft-progress
                        color="success"
                        variant="gradient"
                        :percentage="100"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    class="btn btn-link text-secondary mb-0"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-jira.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="jira"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Jira</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$3,400</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">canceled</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">30%</span>
                    <div>
                      <soft-progress
                        color="danger"
                        variant="gradient"
                        :percentage="30"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    class="btn btn-link text-secondary mb-0"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-slack.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="slack"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Slack</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$1,000</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">canceled</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">0%</span>
                    <div>
                      <soft-progress
                        color="success"
                        variant="gradient"
                        :percentage="0"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    class="btn btn-link text-secondary mb-0"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-invision.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="webdev"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Webdev</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$14,000</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">working</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">80%</span>
                    <div>
                      <soft-progress
                        color="info"
                        variant="gradient"
                        :percentage="80"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    class="btn btn-link text-secondary mb-0"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex px-2">
                    <div>
                      <img
                        src="../../assets/img/small-logos/logo-xd.svg"
                        class="avatar avatar-sm rounded-circle me-2"
                        alt="xd"
                      />
                    </div>
                    <div class="my-auto">
                      <h6 class="mb-0 text-sm">Adobe XD</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-sm font-weight-bold mb-0">$2,300</p>
                </td>
                <td>
                  <span class="text-xs font-weight-bold">done</span>
                </td>
                <td class="align-middle text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 text-xs font-weight-bold">100%</span>
                    <div>
                      <soft-progress
                        color="success"
                        variant="gradient"
                        :percentage="100"
                      />
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    class="btn btn-link text-secondary mb-0"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
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
    </div>
  </div>
</template>

<script>
import SoftProgress from "@/components/SoftProgress";
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
import DefaultProjectCard from "@/views/components/DefaultProjectCard.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "projects-table",
  components: {
    DefaultProjectCard,
    PlaceHolderCard,
    SoftProgress,
  },
  data() {
    return {
      showMenu: false,
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
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
