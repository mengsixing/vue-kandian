<template>
<div>
  <div class="header">{{msg}}</div>
</div>
</template>

<script>
export default {
  props:{
    msg:String
  }
}
</script>

 <style scoped>
 .header{
   background-color: #38f;
   text-align: center;
   line-height: 40px;
   color: white
 }
 </style>
 

