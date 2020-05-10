import Vue from "vue";
import VueRouter from "vue-router";
//路由懒加载
const appCover = () => import("../components/navbar/appCover.vue");
const home = () => import("../components/navbar/home/home.vue");
const login = () => import("../components/navbar/login.vue");
const comment = () => import("../components/navbar/xinliFM/comment.vue");
const search = () => import("../components/navbar/xinliFM/search.vue");
const bodanContent = () => import("../components/navbar/find/boDanContent.vue");
const bodanList = () => import("../components/navbar/find/bodanlist.vue");
const cate = () => import("../components/navbar/xinliFM/cate.vue");
const cateList = () => import("../components/navbar/xinliFM/cateList.vue");
const findzhubo = () => import("../components/sub/findzhubo.vue");
const radioSpeakerDeyial = () => import("../components/sub/zhubidetail.vue");
const communicationPart = ()=> import ("../components/sub/communication/communicationPart.vue")
const communicationDetails =()=> import ("../components/sub/communication/communicationDetails.vue")
const communicationCompile= ()=> import ("../components/sub/communication/communicationCompile.vue")
Vue.use(VueRouter);

const routes = [{
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
    {
        path: '/find/bodanlist/bodancontent',
        component: bodanContent,
        name: "bodanContent"
    },
    {
        path: '/find/bodanlist',
        component: bodanList,
        name: "bodanList"
    },
    {
        path: "/fm/cate/:id",
        component: cate,
        name: "cate",
        redirect: "/fm/cateList/:id",
        children: [{
            path: "/fm/cateList/:id",
            component: cateList,
            name: "cateList"
        }]
    },
    {
        path:"/find/findzhubo",
        component:findzhubo,
        name:"findzhubo"
    },
    {
        path: '/find/radiospeakerdeyial/:id',
        component: radioSpeakerDeyial,
        name: "RadioSpeakerDeyial"
      },
      {
        path: '/fm/communicationPart',
        component: communicationPart,
        name: "communicationPart"
      },
      {
        path: '/fm/communicationPart/communicationDetails/:id',
        component: communicationDetails,
        name: "communicationDetails"
      },
      {
        path: '/fm/communicationPart/communicationCompile',
        component: communicationCompile,
        name: "communicationCompile"
      },
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;