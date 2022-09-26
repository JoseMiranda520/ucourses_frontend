const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("pages/login.vue"),
    // children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/index",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/index.vue") }],
    beforeEnter: (to, from) => {
      console.log("TO: ", to);
      console.log("FROM: ", from);

      // return false;
    },
  },
  {
    path: "/viajes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/viajes.vue") }],
    beforeEnter: (to, from) => {
      console.log("TO: ", to);
      console.log("FROM: ", from);

      // return false;
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/register.vue") }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
