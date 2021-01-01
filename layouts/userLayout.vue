<template>
<div>
  <el-header>
    <UserHeader class="animate__animated animate__bounceInDown" style="z-index: 1000;position: relative;"></UserHeader>
  </el-header>
  <Particles style="padding-top: 10px" @getColor="getColor()"></Particles>
  <div id="wrapper">
    <el-container style="padding-left: 100px;padding-bottom: 20px">
      <el-main>
        <Nuxt/>
      </el-main>
    </el-container>
  </div>
</div>
</template>

<script>

import UserAside from "../components/layout/UserAside";
import Particles from "../components/Particles";
import UserHeader from "../components/layout/UserHeader";
export default {
  name: "userLayout",
  components: {UserHeader,Particles, UserAside},
  mixins: [],
  data(){
    return{
      bgColor: ''
    }
  },
  head(){
    return{
      link: [
        {rel: 'stylesheet', href: '/css/custom.css'},
      ]
    }
  },
  methods:{
    getColor(color){
      this.bgColor = color
    }
  },
  computed:{

  }
}
</script>

<style scoped>
body{
  padding-right: 0 !important;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
