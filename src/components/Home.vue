<template>
  <div class="home">
    <Header msg="首页"></Header>
    <van-tabs>
      <van-tab v-for="item in tagList" :key="item.id" :title="item.name">
      </van-tab>
    </van-tabs>
    <van-swipe :autoplay="3000">
      <van-swipe-item  v-for="(item, index) in bannerList" :key="index">
         <img v-lazy="item.pic" class="swipe_image" />
      </van-swipe-item>
    </van-swipe>
    <div class="news_list">
      <div class="news_list-item" v-for="(newsItem,index) in newsList"  :key="index">
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
          {{newsItem.news_from}}
          阅读数：{{newsItem.click}}
        </div>
        </van-card>
      </div>  
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
export default {
  name: "home",
  props: {
    msg: String
  },
  components: {
    Header
  },
  data(){
    return {
      tagList: [],
      bannerList: [],
      newsList: [],
      cid: 0,
      scroller: '',
      pageIndex: 0,
      imageURL:'http://www.ikandian.com.cn/uploads/aImages/Banner_WZ_KD.jpg'
    }
  },
  computed:{
    imagesTest(){
      return [
        'http://www.ikandian.com.cn/uploads/aImages/Banner_KD.jpg',
        'http://www.ikandian.com.cn/uploads/aImages/Banner_WZ_KD.jpg'
      ]
    }
  },
  created() {
    var that=this;
    //获取头部tags信息
    axios({
      method: "get",
      url: "/api/cate/cate_list"
    })
      .then(function(response) {
        if (response.data.code === 0) {
          that.tagList=response.data.data;
          that.cid=response.data.data[0].id
        }
      })
      .then(function() {
        //获取新闻列表信息
        var cid =  that.tagList[0].id;
        axios
          .get("/api/news/news_list?cid=" + cid + "&offset=0")
          .then(function(response) {
            if (response.data.code === 0) {
              if (response.data.data.dataList.length > 0) {
                that.cid=cid;
                that.pageIndex=1;
                that.newsList=response.data.data.dataList;
                console.log(response.data.data.dataList);
              } else {
                that.cid=cid;
              }
            }
          });
      });
    //获取banner广告信息
    axios.get("/api/face/face_list").then(function(response) {
      if (response.data.code === 0) {
        that.bannerList=response.data.data.filter(item => item.is_show === "1")
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swipe_image{
  height: 175px;
  width: 100%;
}
</style>
