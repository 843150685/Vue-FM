<template>
  <div class="home-container">
    <appheader ref="appheader"></appheader>
    <van-swipe
      @change="onChange"
      ref="vanSwiper"
      :loop="false"
      :initial-swipe="$store.state.swiperInitial"
      :show-indicators="false"
    >
      <van-swipe-item>
        <my-container></my-container>
      </van-swipe-item>
      <van-swipe-item>
        <xinLiFM-container></xinLiFM-container>
      </van-swipe-item>
      <van-swipe-item>
        <find-container></find-container>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import appheader from "../../sub/header.vue";
import myContainer from "../my/my.vue";
import findContainer from "../find/find.vue";
import xinLiFMContainer from "../xinliFM/fm.vue";

export default {
  methods: {
    onChange(index) {
      this.$refs.appheader.select = index;
    }
  },
  components: {
    appheader,
    myContainer,
    findContainer,
    xinLiFMContainer
  },
  //指定返回当前的路由
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$store.commit("setSwiperInitial", this.$refs.appheader.select);
    next();
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  overflow: auto;
  padding: 2.2rem 0;
  box-sizing: border-box;
}
.van-swipe {
  height: 100%;
}
</style>