<template>
  <div class="my">
    <Header msg="我的"></Header>
    <div class="my-content">
      <van-icon name="fail" />
    </div>
    <div class="my-info">温馨提示</div>
    <van-cell-group>
      <van-field
        :value="number"
        label="阅读数"
        disabled
      />
    </van-cell-group>
    <van-button type="default" bottom-action @click="addNumber">手动+1</van-button>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  name: 'My',
  data(){
    return {
      number:0
    }
  },
  components:{
    Header
  },
  methods:{
    addNumber(){
      this.number++;
    }
  }
}
</script>

<style scoped>
.my-content{
  text-align: center;
  font-size: 40px;
  padding-top: 60px;
  color: #38f
}
.my-info{
  text-align: center;
  font-size: 16px;
  margin-bottom: 40px;
}
</style>
