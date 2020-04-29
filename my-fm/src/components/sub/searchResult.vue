<template>
  <div class="searchResult-container">
    <div class="result_title">搜索结果</div>
    <div class="result_box">
      <van-list v-model="loading" :finished="finished" finished-text="我是一个有底线的人" @load="onLoad">
        <ul>
          <li
            class="item"
            v-for="(item, index) in searchResultList"
            :key="index"
            @click="toPlayerPage(item.id)"
          >
            <div class="content_box">
              <p class="title">{{ item.title }}</p>
              <p class="p_name">
                {{ item.speak }}
                <span class="listen_num iconfont icon-yixianshi-"></span>
                <span>{{ item.viewnum | numFormat }}</span>
                <span class="iconfont icon-wodeshoucang"></span>
                <span>{{ item.favnum }}</span>
              </p>
            </div>
            <div class="control_box">
              <van-icon name="ellipsis" class="control_box_icon" @click.stop="radioOperate(item)" />
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import sc from "../../tools/sc-axios"
export default {
  data() {
    return {
      loading: false,
      finished: false,
      offset: 0,
      rows: 20,
      searchResultList: [],
      newWord: ""
    };
  },
  methods: {
   async getSearchResult() {
     let result =await sc("GET", `http://bapi.xinli001.com/fm2/broadcast_list.json/?q=${this.searchWord}&offset=${this.offset}&speaker_id=0&rows=${this.rows}&key=046b6a2a43dc6ff6e770255f57328f89`)
         //console.log(result.data.data)
         if(result.status==200){
           let Data= result.data.data;
           this.searchResultList=[...this.searchResultList,...Data];
           this.offset=this.offset+this.rows;
           this.loading=false;
           if(Data.length<this.rows){
              this.finished=true;
           }
         }
         else{
             this.$toast("加载失败，请返回")
           }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 异步更新数据
        this.getSearchResult();
      }, 800);
    },
    radioOperate(radio) {
      this.$store.commit("setRadioPopupShow", true);
      this.$store.commit("setRadioObj", radio);
    },
    toPlayerPage(id) {
      this.$store.commit("setFullScreen", true);
      this.$store.commit("setMediaUrlId", id);
      let newlist = JSON.parse(JSON.stringify(this.searchResultList)); //利用json转换深拷贝
      this.$store.commit("setPlayerList", newlist);
    }
  },
  props: {
    searchWord: String
  }
};
</script>

<style lang="less" scoped>
.searchResult-container {
  height: 100%;
  padding: 1.8rem 0 2.5rem;
  .result_title {
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.7rem;
    width: 100%;
    background: #fff;
    position: fixed;
    z-index: 10;
    top: 2.2rem;
    padding-left: 0.75rem;
    color: #fa7963;
    border-bottom: 1px solid #f7f7f7;
  }
  .item {
    overflow: hidden;
    position: relative;
    margin-left: 0.5rem;
    padding: 0.35rem 0;
    border-bottom: 1px solid #f4f4f4;
    .cover_box {
      height: 1.8rem;
      width: 1.8rem;
      float: left;
      img {
        width: 100%;
      }
    }
    .content_box {
      float: left;
      width: 11.5rem;
      margin-left: 0.25rem;
      padding-top: 0.2rem;
      .title {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1.2;
        overflow-x: hidden;
        // overflow: hidden;
        font-size: 0.55rem;
      }
      .p_name {
        margin-top: 0.25rem;
        font-size: 0.45rem;
        color: #b1b5b8;
        font-weight: normal;
      }
    }
    .control_box {
      position: absolute;
      height: 1rem;
      line-height: 1rem;
      width: 1rem;
      right: 0;
      top: 55%;
      transform: translate(-20%, -50%);
      .control_box_icon {
        font-size: 0.8rem;
        color: #ccc;
      }
    }
  }
}
</style>