import Vue from "vue";
import VueRouter from "vue-router";

//路由懒加载
const appCover = () => import("../components/navbar/appCover.vue");
const home = () => import("../components/navbar/home/home.vue");
const login = () => import("../components/navbar/login.vue");
const comment = () => import("../components/navbar/xinliFM/comment.vue");
const search = () => import("../components/navbar/xinliFM/search.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: appCover,
  },
  {
    path: '/login',
    component: login,
    name: "login"
  },
  {
    path: '/home',
    name: "home",
    component: home,
    meta: {
      keepAlive: true //需要被缓存的组件
    },
  },
  {
    path: "/fm/category/playerpage/comment/:id",
    component: comment,
    name: "comment"
  },
  {
    path: '/fm/find/search',
    component: search,
    name: "search"
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
