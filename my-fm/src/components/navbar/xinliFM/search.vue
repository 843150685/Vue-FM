<template>
  <div class="search-container">
    <header>
      <div class="search_box">   
        <input
          @keyup.enter="search"
          class="search_input"
          ref="input"
          type="search"
          v-model="Word"
          placeholder="搜索节目、主播、播单"
        /><span
          :class="['search_icon iconfont icon-sousuo-px-',{'search_icon_add':addclassFlag}]"
          @click="search"
        ></span>
      </div>
      <span class="cancel" @click="goBack">取消</span>
    </header>
    <!--热搜组件-->
    <hotSearch v-if="show" ></hotSearch>
     <!--搜索结果组件-->
    <searchResult v-else :searchWord="Word" ref="result"></searchResult>
  </div>
</template>

<script>
import hotSearch from "../../sub/hotSearch.vue"
import searchResult from "../../sub/searchResult.vue"
export default {
data() {
    return {
      addclassFlag: false,
      show: true,
      Word: ""
    };
  },
  watch: {
    Word: function(newVal, oleVal) {
      if (newVal != "") {
        this.addclassFlag = true;
      } else {
        this.addclassFlag = false;
        this.show = true;
      }
    }
  },
  methods: {
    search() {
      // 点击搜索图标执行的方法
      // console.log(this.Word);
      if (this.Word.trim() == "") {
        return this.$toast({
          message: "搜索内容不可为空",
          duration: 1500
        });
      }
      this.show = false;
      this.$store.commit("addHstoryWords", this.Word); //使用vuex 添加搜索记录的词
    },
    changeWord(hotWord) {
      console.log(hotWord)
      this.Word = hotWord;
      this.show = false;
      this.$store.commit("addHstoryWords", this.Word);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {
    hotSearch,
    searchResult
  }
}
</script>

<style lang="less" scoped>
.search-container {
  position: relative;
  padding-top: 2.5rem;
  header {
    background-color: #fff;
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    height: 2.5rem;
    .search_box {
      position: absolute;
      top: 0.75rem;
      left: 0.325rem;
      width: 85%;
      height: 1.25rem;
      border-radius: 15px;
      background-color: #f7f7f7;
      color: #cecece;
      overflow: hidden;
      display: flex;
      align-items: center;
      .search_icon {
        margin-left: 0.325rem;
        font-size: 0.55rem;
        transition: all 0.2s;
      }
      .search_icon_add {
        font-size: 0.68rem;
        color: #fa7963;
      }
      .search_input {
        background-color: #f7f7f7;
        color: #000;
        line-height: 1rem;
        width: 90%;
        font-size: 0.55rem;
        caret-color: #fa7963;
        &::-webkit-input-placeholder {
          color: #cecece;
          font-size: 0.45rem;
        }
      }
    }
    .cancel {
      position: absolute;
      top: 0.75rem;
      right: 0.25rem;
      width: 1.2rem;
      height: 1rem;
      color: #444;
      line-height: 1rem;
      text-align: center;
      font-size: 0.5rem;
    }
  }
}
</style>