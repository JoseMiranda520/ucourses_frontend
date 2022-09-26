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
    path: "/profile",
    name: "profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/profile.vue") }],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/register.vue") }],
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/courses.vue") },
      {
        path: "/anycourse/:id",
        name: "anycourse",
        component: () => import("pages/anycourse.vue"),
      },
    ],
  },
  {
    path: "/exams",
    name: "exams",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/exams.vue") },
      {
        path: "/basico",
        name: "basico",
        component: () => import("pages/exams/exam-python-basico.vue"),
      },
      {
        path: "/intermedio",
        name: "intermedio",
        component: () => import("pages/exams/exam-python-intermedio.vue"),
      },
      {
        path: "/avanzado",
        name: "avanzado",
        component: () => import("pages/exams/exam-python-avanzado.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
