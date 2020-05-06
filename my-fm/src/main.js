import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";
import vant, {
    Lazyload,
    ImagePreview
} from "vant";
//适配移动端插件
import "lib-flexible";
Vue.use(Lazyload, ImagePreview);
Vue.use(vant);

//swiper插件
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);
//注册全局过滤器
import * as filters from "./tools/filters.js";
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
//阿里字体图标
import "./lib/ali-font-icon/iconfont.css";
//初始化样式
import "./tools/reset.css";
//媒体查询适配
import "./tools/rem.js";
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");