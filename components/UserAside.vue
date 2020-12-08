<template>
  <el-menu>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>
        <nuxt-link to="/user/index">我的主页</nuxt-link>
      </template>
    </el-submenu>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>用户中心</template>
      <el-menu-item index="1-1">
        <nuxt-link to="/user/home">个人信息</nuxt-link>
      </el-menu-item>
      <el-menu-item index="1-1">
        <nuxt-link to="/user/set">基本设置</nuxt-link>
      </el-menu-item>
      <el-menu-item index="1-2">
        <nuxt-link to="/user/message">我的消息</nuxt-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>我的帖子</template>
      <el-menu-item index="2-1"><nuxt-link to="/user/myPost">我发布的</nuxt-link></el-menu-item>
      <el-menu-item index="2-1"><nuxt-link to="/user/myComment">我评论的</nuxt-link></el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
name: "UserAside"
}
</script>

<style scoped>

</style>
