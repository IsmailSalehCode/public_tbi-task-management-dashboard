import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/task/:id",
    component: () => import("./views/TaskDetailsPage.vue"),
  },
  {
    path: "/",
    component: () => import("./views/OverviewPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 30,
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
