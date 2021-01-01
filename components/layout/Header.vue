<template>
  <div class="fly-header" style="z-index: 1000">
    <div class="layui-container">
      <nuxt-link class="fly-logo" to="/" tag="a">
        <el-image style="width: 40px;height: 40px"  class="animate__animated animate__wobble" src="/images/logo/logo.png"></el-image>
      </nuxt-link>
      <ul class="layui-nav fly-nav layui-hide-xs animate__animated animate__fadeInDown" >
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


      <ul class="layui-nav fly-nav-user animate__animated animate__zoomIn">
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
              <el-avatar :src="userInfo.avatar" :size="50"></el-avatar>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="fa fa-database">个人积分&nbsp;:{{userInfo.point}}</i>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/jie/add" target="_blank"><i class="fa fa-pencil" style="margin-left: 2px; font-size: 22px;"></i>发帖</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/home" target="_blank"><i class="fa fa-home" style="margin-left: 2px; font-size: 22px;"></i>我的主页</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/set"><i class="fa fa-sliders" style="margin-left: 2px; font-size: 22px;"></i>基本设置</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/user/message"><i class="fa fa-commenting-o" style="margin-left: 2px; font-size: 22px;"></i>我的消息</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link @click="logout" style="text-align: center;"><i class="fa fa-sign-out" style="margin-left: 2px; font-size: 22px;"></i>退出</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getToken} from "../../utils/auth";
import userInfoMixin from "../mixin/userInfoMixin";
import {confirmAlert, mixinToast} from "../sweetalert/mixinSweetalert";
import {getInfoWithNoId} from "../../api/user";


export default {
  name: "Header",
  mixins:[userInfoMixin],
  data() {
    return {
      keyword: null,
      isLogin: false,
      avatar: '',
      userId: "",
      nickName: "",
      point: ''
    }
  },
  mounted() {
    if (getToken() != null) {
      this.isLogin = true
      /*this.$store.dispatch('user/getInfo').then((data)=>{
        this.userInfo = data
      })*/
      getInfoWithNoId().then((data)=>{
        this.userInfo = data
      })
      // console.log(this.userInfo)
    }
  },
  props: ['isSearch'],
  methods: {
    search() {
      this.$emit("getKeyword", this.keyword)
    },
    logout() {
      confirmAlert.fire({
        title: '退出',
        titleText: '是否退出',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then((result)=>{
        if (result.isConfirmed){
          this.$store.dispatch('user/logout')
          mixinToast.fire({
            titleText:'退出成功',
            icon:'success'
          })
          this.$router.push('/')
        }
      })

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
