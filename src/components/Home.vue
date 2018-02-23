<template>
  <div class="home">
    <Header msg="首页"></Header>
    <van-tabs @click="getNewsList">
      <van-tab v-for="item in tagList" :key="item.id" :title="item.name">
      </van-tab>
    </van-tabs>
    <div class="newsListWrapper" ref="newsListWrapper">
      <div>
<van-swipe :autoplay="3000">
        <van-swipe-item  v-for="(item, index) in bannerList" :key="index">
          <img v-lazy="item.pic" class="swipe_image" />
        </van-swipe-item>
      </van-swipe>
      <div class="news_list">
        <div class="news_list-item" v-for="(newsItem,index) in newsList"  :key="index" @click="gotoDetail(newsItem)">
          <van-card
            :thumb="newsItem.litpic.includes('http') ? newsItem.litpic : 'http://211.149.160.35' + newsItem.litpic"
          >
          <div slot="title">
          &nbsp;
          </div>
          <div slot="desc">
            {{newsItem.title}}
          </div>
          <div slot="footer">
            <div class="card_footer">
              <span> {{newsItem.news_from}}</span>    
              <span> 阅读数：{{newsItem.click}}</span>
            </div>
          </div>
          </van-card>
        </div>  
      </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
import BScroll from "better-scroll";

var that;
export default {
  name: "home",
  props: {
    msg: String
  },
  components: {
    Header
  },
  data() {
    return {
      tagList: [],
      bannerList: [],
      newsList: [],
      cid: 0,
      scroller: "",
      pageIndex: 0,
      imageURL: "http://www.ikandian.com.cn/uploads/aImages/Banner_WZ_KD.jpg"
    };
  },
  created() {
    that = this;
    //获取头部tags信息
    axios({
      method: "get",
      url: "/api/cate/cate_list"
    })
      .then(function(response) {
        if (response.data.code === 0) {
          that.tagList = response.data.data;
          that.cid = response.data.data[0].id;
        }
      })
      .then(function() {
        //获取新闻列表信息
        var cid = that.tagList[0].id;
        axios
          .get("/api/news/news_list?cid=" + cid + "&offset=0")
          .then(function(response) {
            if (response.data.code === 0) {
              if (response.data.data.dataList.length > 0) {
                that.cid = cid;
                that.pageIndex = 1;
                that.newsList = response.data.data.dataList;
              } else {
                that.cid = cid;
              }
            }
          });
      });
    //获取banner广告信息
    axios.get("/api/face/face_list").then(function(response) {
      if (response.data.code === 0) {
        that.bannerList = response.data.data.filter(
          item => item.is_show === "1"
        );
      }
    });
  },
  mounted() {
    var that = this;
    var bScroll = that.scroller;
    if (bScroll) {
      bScroll.refresh();
    } else {
      that.scroller = new BScroll(that.$refs.newsListWrapper, {
        click: true,
        scrollbar: {
          fade: true,
          interactive: false
        }
      });
      bScroll = bScroll || that.scroller;
      bScroll.on("scrollEnd", function() {
        if (bScroll.maxScrollY === bScroll.y) {
          //获取选中的标签id
          let tagId = that.cid;
          let offset = that.pageIndex * 10;
          axios
            .get("/api/news/news_list?cid=" + tagId + "&offset=" + offset)
            .then(function(response) {
              if (response.data.code === 0) {
                if (response.data.data.dataList.length > 0) {
                  that.pageIndex = that.pageIndex + 1;
                  that.newsList = that.newsList.concat(
                    response.data.data.dataList
                  );
                }
              }
            });
        }
      });
    }
  },
  methods: {
    getNewsList(index) {
      //获取新闻列表信息
      var cid = that.tagList[index].id;
      axios
        .get("/api/news/news_list?cid=" + cid + "&offset=0")
        .then(function(response) {
          if (response.data.code === 0) {
            if (response.data.data.dataList.length > 0) {
              that.cid = cid;
              that.pageIndex = 1;
              that.newsList = response.data.data.dataList;
            } else {
              that.cid = cid;
            }
          }
        });
    },
    gotoDetail(newsItem) {
      that.$router.push("/detail/" + newsItem.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swipe_image {
  height: 175px;
  width: 100%;
}
.card_footer {
  font-size: 12px;
  color: gray;
}
.newsListWrapper {
  position: absolute;
  overflow: hidden;
  top: 84px;
  bottom: 0;
  left: 0;
  right: 0;
}
.home {
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
