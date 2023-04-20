import { createRouter, createWebHistory } from "vue-router";
import UserLocationComponent from "../components/UserLocationComponent";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: UserLocationComponent,
    },
    {
      path: "/profile",
      component: () => import("../components/TimeLine.vue"),
    },
    {
      path: "/profile/:username",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/user/:username",
      component: () => import("../views/Calendar.vue"),
    },
    {
      path: "/form",
      component: () => import("../components/UserFormComponent.vue"),
    },
    {
      path: "/about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/appointment/:doctor/:id/:username",
      component: () => import("../components/AppointmentComponent.vue"),
    },
  ],
});

export default router;
