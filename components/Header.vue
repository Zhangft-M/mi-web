<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <nuxt-link class="fly-logo" to="/">
        <el-image src="../static/images/logo.png"></el-image>
      </nuxt-link>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item">
          <nuxt-link to="/" target="_blank"><i class="iconfont icon-jiaoliu"></i>交流</nuxt-link>
        </li>
        <li class="layui-nav-item">
          <nuxt-link to="/case/case" target="_blank"><i class="iconfont icon-iconmingxinganli"></i>案例</nuxt-link>
        </li>
        <li class="layui-nav-item" v-show="isSearch">
          <div class="layui-hide-xs" style="position: center">
            <el-input placeholder="请输入内容" class="el-input--medium" v-model="keyword" style="border-radius: 20px">
              <el-button slot="append" icon="el-icon-search" circle @click="search"></el-button>
            </el-input>
          </div>
        </li>
      </ul>


      <ul class="layui-nav fly-nav-user">

        <!-- 未登入的状态 -->
        <li class="layui-nav-item" v-show="!isLogin">
          <nuxt-link class="iconfont icon-touxiang layui-hide-xs" to="/login"></nuxt-link>
          <!--            <a class="iconfont icon-touxiang layui-hide-xs" href="user/login.html"></a>-->
        </li>
        <li class="layui-nav-item" v-show="!isLogin">
          <nuxt-link to="/login">登录</nuxt-link>
          <!--            <a href="user/login.html">登入</a>-->
        </li>
        <li class="layui-nav-item" v-show="!isLogin">
          <nuxt-link to="/register">注册</nuxt-link>
          <!--            <a href="user/reg.html">注册</a>-->
        </li>
        <!-- 登入后的状态 -->
        <li v-show="isLogin" style="padding-top: 9px;padding-right: 20px">
          <el-dropdown >
            <span class="el-dropdown-link">
              <el-avatar class="fly-nav-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link :to="'/user/set?userId=' + userId"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link :to="'/user/set?userId=' + userId"><i class="layui-icon">&#xe620;</i>基本设置</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link :to="'/user/set?userId=' + userId"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="javascript:void(0)" @click="logout" style="text-align: center;">退出</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
<!--          <dl class="layui-nav-child">
            <dd>
              <nuxt-link :to="'/user/set?userId=' + userId"><i class="layui-icon">&#xe620;</i>基本设置</nuxt-link>
            </dd>
            <dd>
              <nuxt-link :to="'/user/set?userId=' + userId"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息
              </nuxt-link>
            </dd>
            <dd>
              <nuxt-link :to="'/user/set?userId=' + userId"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</nuxt-link>
            </dd>
            <hr style="margin: 5px 0;">
            <dd><a href="javascript:void(0)" @click="logout" style="text-align: center;">退出</a></dd>
          </dl>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: null,
      isLogin: true,
      userId: this.$store.state.user.userInfo.userId,
      nickName: this.$store.state.user.userInfo.nickName
    }
  },
  mounted() {
    if (this.$store.state.token != null) {
      this.isLogin = true
    }
  },
  props: ['isSearch'],
  methods: {
    search() {
      this.$emit("getKeyword", this.keyword)
    },
    logout() {

    }
  }
}
</script>

<style scoped>

</style>
