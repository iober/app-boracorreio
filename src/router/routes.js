const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/auth",
        component: () => import("pages/Auth.vue"),
        meta: {
          auth: false,
        },
      },
      {
        path: "/index",
        name: "index",
        component: () => import("pages/index.vue"),
        meta: {
          auth: false,
        },
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
