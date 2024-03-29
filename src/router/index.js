import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Projects from "@/views/Projects.vue";
import Managers from "@/views/Managers.vue";
import Workers from "@/views/Workers.vue";
import Projectdetail from "@/views/Projectdetail.vue";
import ProjectTimeline from "@/views/ProjectTimeline.vue";

// import Tables from "@/views/Tables.vue";
// import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import WorkerDetail from "@/views/WorkerDetail.vue";
import WorkerTasks from "@/views/WorkerTasks.vue";
import AddProject from "@/views/AddProject.vue";
import Contractors from "@/views/Contractors.vue";
import Clients from "@/views/Clients.vue";
const routes = [
  {
    path: "/",
    name: "/",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/addproject",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: ProjectTimeline,
  },
  {
    path: "/managers",
    name: "Managers",
    component: Managers,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/contractors",
    name: "Contractors",
    component: Contractors,
  },
  {
    path: "/workers",
    name: "Workers",
    component: Workers,
  },
  {
    path: "/projectdetail/:id",
    name: "Projectdetail",
    component: Projectdetail,
  },
  {
    path: "/workertasks",
    name: "WorkerTasks",
    component: WorkerTasks,
  },
  {
    path: "/workerdetail/:id",
    name: "WorkerDetail",
    component: WorkerDetail,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
