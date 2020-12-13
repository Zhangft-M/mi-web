<template>
<div>
  <el-header>
    <el-menu
      default-active=""
      class="el-menu-demo"
      mode="horizontal"
      @select=""
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
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
