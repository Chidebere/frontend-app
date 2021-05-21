import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// const guest = (to, from, next) => {
//   if (!localStorage.getItem("AdminAuthToken")) {
//     return next();
//   } else {
//     return next("/");
//   }
// };
const auth = (to, from, next) => {
  if (localStorage.getItem("AdminAuthToken")) {
    return next();
  } else {
    return next({ name: 'AdminLogin', query: { from: to.fullPath } })
  }
};

const routes = [
  {
    path: "/",
    name: "AdminLogin",
    // beforeEnter: guest,
    component: () =>
      import("../views/AdminLogin.vue")
  },
  {
    path: "/users",
    name: "AdminUserPanel",
    beforeEnter: auth,
    component: () =>
      import("../views/AdminUserPanel.vue")
  },
  {
    path: "/edit/:userId",
    name: "EditUserDetails",
    props: true,
    beforeEnter: auth,
    component: () =>
      import("../views/EditUserDetails.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL + 'admin',
  routes
});

export default router;
