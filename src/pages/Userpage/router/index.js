import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};
const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")) {
    return next();
  } else {
    return next({ name: 'Login', query: { from: to.fullPath } })
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: guest,
    component: () =>
      import("../views/Auth/Login.vue")
  },
  // {
  //   path: "/admin",
  //   name: "AdminLogin",
  //   beforeEnter: guest,
  //   component: () =>
  //     import("../views/AdminLogin.vue")
  // },
  {
    path: "/register",
    name: "Register",
    beforeEnter: guest,
    component: () =>
      import("../views/Auth/Register.vue")
  },
  {
    path: "/verify-account",
    name: "VerifyAwaiting",
    beforeEnter: guest,
    component: () =>
      import("../views/Auth/VerifyAwaiting.vue")
  },
  {
    path: "/verify/:hash",
    name: "Verify",
    beforeEnter: auth,
    props: true,
    component: () =>
      import("../views/Auth/Verify.vue")
  },
  {
    path: "/panel/home",
    name: "UserPanel",
    beforeEnter: auth,
    component: () =>
      import("../views/UserPanel.vue")
  },
  {
    path: "/:username",
    name: "ProfileDetail",
    props: true,
    // beforeEnter: auth,
    component: () =>
      import("../views/ProfileDetail.vue")
  },
  {
    path: "/:username",
    name: "AuthProfileDetail",
    beforeEnter: auth,
    component: () =>
      import("../views/AuthProfileDetail.vue")
  },
  {
    path: "/panel/profile",
    name: "UserProfile",
    // props: true,
    beforeEnter: auth,
    component: () =>
      import("../views/UserProfile.vue")
  },
  {
    path: "/panel/profile/upload",
    name: "UploadPhoto",
    beforeEnter: auth,
    component: () =>
      import("../views/UploadPhoto.vue")
  },
  {
    path: "/panel/profile/change-password",
    name: "ChangePassword",
    beforeEnter: auth,
    component: () =>
      import("../views/ChangePassword.vue")
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
