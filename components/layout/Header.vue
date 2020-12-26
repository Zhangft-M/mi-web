<template>
  <div class="fly-header" style="z-index: 1000">
    <div class="layui-container">
      <nuxt-link class="fly-logo" to="/">
        <el-image src=""></el-image>
      </nuxt-link>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item">
          <nuxt-link to="/" target="_blank"><i class="iconfont icon-jiaoliu"></i>交流</nuxt-link>
        </li>
        <li class="layui-nav-item">
          <nuxt-link to="/case/case" target="_blank"><i class="iconfont icon-iconmingxinganli"></i>案例</nuxt-link>
        </li>
        <li class="layui-nav-item" v-show="isSearch" style="padding-left: 50px">
          <div class="layui-hide-xs" style="position: center">
            <el-input placeholder="请输入内容" class="el-input--medium search-input" v-model="keyword" style="border-radius: 20px">
              <el-button style="opacity: 0.85" slot="suffix" icon="el-icon-search" size="mini" circle @click="search"></el-button>
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
              <el-avatar :src="avatar" :size="50"></el-avatar>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link to="/jie/add" target="_blank"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>发帖</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/home"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/set"><i class="layui-icon">&#xe620;</i>基本设置</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/message"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</nuxt-link>
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
import {getToken} from "../../utils/auth";
import {getUserInfo} from "../../utils/sessionUtils";
import {getInfo} from "../../api/user";

export default {
  name: "Header",
  data() {
    return {
      keyword: null,
      isLogin: false,
      avatar: '',
      userId: "",
      nickName: "",
    }
  },
  mounted() {
    if (getToken() != null) {
      this.isLogin = true
      getUserInfo().then((data) => {
        this.userId = data.id
        this.nickName = data.nickName
        this.avatar = data.avatar
      })
      // console.log(userInfo)
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

<style>
.search-input input.el-input__inner {
  border-radius: 15px;
  opacity: 0.85;
}
</style>
