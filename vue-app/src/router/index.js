import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Pomodoro from "../pages/Pomodoro.vue";
import Calendar from "../pages/Calendar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/pomodoro", component: Pomodoro },
    { path: "/calendar", component: Calendar },
  ],
});

export default router;
