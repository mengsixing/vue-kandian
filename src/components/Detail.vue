<template>
  <div class="detail">
    <div class="detail-header">
      <span @click="goback"> &lt;&nbsp;返回</span>
    </div>
    <div class="detail-news" ref="listWrapper">
        <div class="scroller">
            <div class="detail-news-body">
                <div class="detail-news-cover">
                    <img :src="newsDetail.litpic" alt="img" />
                </div>
                <div class="detail-news-content">
                    <div class="detail-news-tag">
                      {{newsDetail.cate_name}}
                    </div>
                    <div class="detail-news-title">
                      {{newsDetail.title}}
                    </div>
                    <div class="detail-news-tags">
                        <span class="detail-news-tags-from">
                        </span>
                        <span>
                            <span class="detail-news-tags-price">
                              {{newsDetail.price}}
                                K币
                        </span>
                            <span class="detail-news-tags-read">
                                阅读：{{newsDetail.click}}
                            </span>
                        </span>
                    </div>
                    <div class="detail-news-content-text">
                        <p v-html="newsDetail.content"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
import { Base64 } from "js-base64";
var that;
export default {
  data() {
    return {
      newsDetail: {},
      scroller: ""
    };
  },
  created() {
    that = this;
    that.getDetail();
  },
  mounted() {
    if (that.scroller) {
      that.scroller.refresh();
    } else {
      that.scroller = new BScroll(that.$refs.listWrapper, {
        click: true,
        scrollbar: {
          fade: true,
          interactive: false
        }
      });
      setTimeout(function() {
        that.scroller.refresh();
      }, 2000);
    }
  },
  methods: {
    //获取详情信息
    getDetail() {
      axios
        .get("/api/news/news_detail?id=" + that.$route.params.id)
        .then(function(response) {
          let newsDetail = response.data.data;
          newsDetail.content = Base64.decode(newsDetail.content);
          that.newsDetail = newsDetail;
        });
    },
    goback() {
      that.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.return-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail {
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.detail-header {
  color: #ff9900;
  line-height: 40px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  padding-left: 10px;
}
.detail-news {
  top: 0px;
  bottom: 49px;
  position: absolute;
  left: 0px;
  right: 0px;
  font-size: 12px;
  overflow: hidden;
}

.detail-news-body {
  background-color: #f9f9f9;
}

.detail-news-content {
  padding: 0px 15px;
}

.detail-news-tag {
  color: white;
  background-color: #4285f4;
  line-height: 16px;
  font-size: 10px;
  height: 16px;
  width: 31px;
  text-align: center;
  margin-top: 6px;
}

.detail-news-title {
  margin-top: 10px;
  margin-bottom: 11px;
  font-size: 16px;
  line-height: 24px;
}

.detail-news-tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-news-tags {
  margin-bottom: 25px;
}

.detail-news-tags-from {
  color: #999999;
}

.detail-news-tags-price {
  color: #999999;
  margin-right: 20px;
}

.detail-news-tags-read {
  color: #999999;
  margin-right: 10px;
}

.detail-news-cover {
  margin: 0px;
}

.detail-news-cover > img {
  width: 100%;
  height: 239px;
}

.detail-news-content-text {
  margin: 10px 0px;
  padding-bottom: 10px;
  line-height: 1.5em;
  font-size: 14px;
  color: #666666;
}

.detail-news-content-text-point {
  position: absolute;
  color: #4285f4;
  font-size: 30px;
  text-indent: 0px;
  line-height: 10px;
}

.detail-news-content-text img {
  max-width: 100%;
}
</style>


