<template>
  <div class="header-container">
    <header>
      <div class="nvabar">
        <span :class="['my',{'active':select == 0}]" @click="toActive(0)">我的</span>
        <span :class="['fm',{'active':select == 1}]" @click="toActive(1)">聆心FM</span>
        <span :class="['find',{'active':select == 2}]" @click="toActive(2)">发现</span>
      </div>
      <span class="serch-box">
        <a  class="serch iconfont icon-icon-test12" @click.prevent="toSearch"></a>
      </span>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: this.$store.state.swiperInitial
    };
  },
  methods: {
    toActive(num) {
      this.select = num;
      this.$parent.$refs.vanSwiper.swipeTo(num);
    },
    toSearch() {
      this.$router.push({
        name: "search"
      });
    },
  }
};
</script>

<style lang="less" scoped>
header {
  // position: absolute;
  position: fixed;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
  height: 2.2rem;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;

  .nvabar {
    position: relative;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.75rem;
  }

  .nvabar-my,
  .nvabar-xinli_fm,
  .nvabar-find {
    color: #000;
  }

  .active {
    transition: color 0.3s;
    color: #fa7963;
    font-weight: 520;
  }

  .serch-box{
    display: flex;
    align-items: center;
    a {
      margin-left: 0.3125rem;
      font-size: 0.875rem;
      color: black;
    }
    .serch {
      position: absolute;
      right: 0.3125rem;
    }
  }
}
</style>