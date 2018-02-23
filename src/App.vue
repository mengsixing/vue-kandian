<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="xxx">
      <van-tabbar-item icon="home">首页</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data(){
    return {
      active: 0
    }
  },
  methods:{
    xxx(active){
      switch(active){
        case 0: this.$router.push('home');break;
        case 1: this.$router.push('my');break;
      }
    }
  }
};
</script>

<style>
.content{
  margin-bottom: 50px;
  background-color: deeppink
}
.router-link-active{
  color:#38f!important
}
.van-tabbar-item__text > a{
  color:black
}
.van-tab--active{
  color: #38f!important;
}
.van-tabs__nav-bar{
      background-color: #38f!important;
}

</style>
