<template>
  <div>
    <el-menu
             mode="horizontal"
             text-color="#fff"
             active-text-color="#ffd04b"
             :background-color="getColor"
             style="width: 100%;border-radius: 20px;border-bottom: 0"
    >

      <el-menu-item>
        <template slot="title"><i class="el-icon-s-home"></i>
          <nuxt-link to="/">主页</nuxt-link>
        </template>
      </el-menu-item>
      <el-menu-item>
        <template slot="title"><i class="el-icon-s-home"></i>
          <nuxt-link to="/user">我的主页</nuxt-link>
        </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>用户中心</template>
        <el-menu-item index="1-1">
          <nuxt-link to="/user/set">基本设置</nuxt-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <nuxt-link to="/user/message">我的消息</nuxt-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>我的帖子</template>
        <el-menu-item index="2-1">
          <nuxt-link to="/user/myPost">我发布的</nuxt-link>
        </el-menu-item>
        <el-menu-item index="2-1">
          <nuxt-link to="/user/myComment">我评论的</nuxt-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {getBgColor} from "../../utils/theme";

export default {
  name: "UserHeader",
  data(){
    return{

    }
  },
  computed:{
    getColor(){
      return this.$store.state.bgColor.color
    }
  }
}
</script>

<style scoped>

</style>
