<template>
<div>
  <el-header style="background-color: #282C35">

  </el-header>
  <el-container style="padding-left: 20px;padding-bottom: 20px">
    <user-aside style="padding-top: 20px"></user-aside>
    <el-main>
      <Nuxt/>
    </el-main>
  </el-container>
  <el-footer style="background-color: #009E94"></el-footer>
</div>
</template>

<script>

import UserAside from "../components/layout/UserAside";
export default {

  name: "userLayout",
  components: {UserAside}
}
</script>

<style scoped>

</style>
