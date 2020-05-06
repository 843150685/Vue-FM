import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let historyWordsList = JSON.parse(localStorage.getItem('historyWordsList') || '[]'); //取出本地储存的搜索记录
export default new Vuex.Store({
    state: {
        key: "&key=046b6a2a43dc6ff6e770255f57328f89", //配置请求的key
        token: "b845588abcf58804c99d289584cd6068", //用户的token
        swiperInitial: 1, //首页大录播图 默认显示页面
        mediaUrlId: "", //歌曲播放的id
        selectIndex: 0, //当前正在播放歌曲在列表里的的索引
        historyWordsList, //搜索框的历史纪录词
        radioPopupShow: false, //控制底部radioPopup的显示与隐藏
        radioObj: {}, //radioPopup的内容
        //-----播发器控制部分-------------------------
        fullScreen: false, // 播放页面的展开收起
        playing: true, // 控制音频播放和暂停
        playerList: [], //footer-play中的播放列表
        playerMode: 1, //1顺序播放 2单曲循环 3随机播放
        footerShow: true, //进入appCover页面时使底部盒子影藏
        bodanConfig: {} //解决播单内容加载刷新
    },
    mutations: {
        //-------设置播放器是否全屏---------
        setFullScreen(state, flag) {
            state.fullScreen = flag;
        },
        //-------设置播放和暂停---------
        setPlaying(state, flag) {
            state.playing = flag;
        },
        //-------设置播放模式---------
        setPlayerMode(state, modeNum) {
            state.playerMode = modeNum;
        },
        //-------选择歌曲---------
        setMediaUrlId(state, id) {
            state.mediaUrlId = id;
        },
        //-------删除歌单中的歌曲---------
        removeOnePlayerList(state, radioIndex) {
            state.playerList.splice(radioIndex, 1);
        },
        //--------footer-player 播放列表---------
        setPlayerList(state, list) {
            state.playerList = list
        },
        setSelectIndex(state, index) {
            state.selectIndex = index
        },
        //设置底部radioPopup的显示与隐藏
        setRadioPopupShow(state, flag) {
            state.radioPopupShow = flag
        },
        //-----进入appCover页面时使底部盒子影藏-----
        setFooterShow(state, flag) {
            state.footerShow = flag;
        },
        //设置首页轮播页面 回退时是之前进入时的页面
        setSwiperInitial(state, num) {
            state.swiperInitial = num;
        },
        // 设置搜索页面历史词记录
        addHstoryWords(state, searchWord) {
            if (state.historyWordsList.indexOf(searchWord) != -1) {
                let index = state.historyWordsList.indexOf(searchWord);
                state.historyWordsList.splice(index, 1);
            }
            state.historyWordsList.unshift(searchWord);
            localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
        },
        //删除单个搜索记录
        removeThisHstoryWords(state, index) {
            state.historyWordsList.splice(index, 1);
            localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
        },
        //删除所有搜索记录
        removeAllHstoryWords(state) {
            state.historyWordsList = [];
            localStorage.setItem('historyWordsList', JSON.stringify(state.historyWordsList));
        },
        //设置底部radioPopup里的内容
        setRadioObj(state, obj) {
            state.radioObj = obj
        },
        //解决播单内容加载刷新无内容
        setBodanConfig(state, obj) {
            state.bodanConfig = obj
        },
    },
    getters: {
        footerShow: state => state.footerShow,
        fullScreen: state => state.fullScreen,
        mediaUrlId: state => state.mediaUrlId,
        playing: state => state.playing,
        playerList: state => state.playerList,
        playerMode: state => state.playerMode,
        swiperInitial: state => state.swiperInitial,
        // selectIndex: state => state.selectIndex,
        selectIndex(state) {
            let index = state.playerList.findIndex((item, index) => {
                return item.id === state.mediaUrlId;
            })
            return index;
        }
    }
});