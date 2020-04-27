<template>
  <div class="app-container">
    <transition :name="direction" mode="out-in">
      <router-view class="appView"></router-view>
    </transition>
    <footplayer v-show="hideshow"></footplayer>
  </div>
</template>

<script>
import footplayer from "./components/sub/foot-player.vue";
export default {
  name: "App",
  data: () => ({
    direction: "slide-right",
    docmHeight: document.documentElement.clientHeight, //默认屏幕高度
    showHeight: document.documentElement.clientHeight, //实时屏幕高度
    hideshow: false //显示或者隐藏footplayer
  }),

  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },

  components: {
    footplayer
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hideshow = false;
      } else {
        this.hideshow = true;
      }
    },

    $route(to, from) {
      if (to.name == "comment") {
        this.direction = "comment";
        return;
      }
      //根据文件层级关系 判断动画效果
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path == "/") {
        this.direction = "slide-right";
      } else if (from.path == "/") {
        this.direction = "slide-left";
      } else {
        this.direction = toDepth < fromDepth ? "slide-right" : "slide-left";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.appView {
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
  transition: all 0.35s ease;
}

.slide-left-enter {
  transform: translate(0%, 0);
}
.slide-left-leave-active {
  transform: translate(-100%, 0);
}
.slide-right-enter {
  transform: translate(-0%, 0);
}
.slide-right-leave-active {
  transform: translate(100%, 0);
}

.comment-enter {
  transform: translate(100%, 0);
}
.app-container {
  height: 100%;
  overflow: auto;
}
</style>
