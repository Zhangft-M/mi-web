<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <nav class="switch_nav" style="padding-left: 50px">
        <nuxt-link to="/login" id="switch_login" class="switch_btn on">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="margin-right: 20px">
        <el-form label-width="55px" :model="loginData">
          <el-form-item label="用户名">
            <el-input type="text" v-model="loginData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginData.password"></el-input>
          </el-form-item>
          <el-form-item label="验证">
            <Verify></Verify>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" class="submit_btn" @click="login">Login</el-button>
          </el-form-item>
        </el-form>
        <!--<form method="post" action="">
          <ul class="group_input">
            <li>
              <el-input type="text" placeholder="手机号或者邮箱"></el-input>
              &lt;!&ndash;						<input type="text" class="mobile required" id="mobile" placeholder="手机号或邮箱" />&ndash;&gt;
            </li>
            <li>
              <el-input type="password" placeholder="密码"></el-input>
              &lt;!&ndash;						<input type="password" class="psd required" id="psd" placeholder="密码" />&ndash;&gt;
            </li>
          </ul>
          <button type="submit" class="submit_btn" id="btnSubmit">登陆</button>
        </form>-->
        <div class="states">
          <span class="left"><a href="javascript:;">手机验证码登陆</a></span>
          <span class="right"><a href="javascript:;">无法登陆？</a></span>
        </div>
        <div class="states">
          <a href="javascript:;" class="social_account">社交账号登陆</a>
          <div class="states three_MinIcon">
            <!--            <a href="javascript:;" class="MinIcon_weixin"><img src="../assets/img/icon_weixin.jpg"-->
            <!--                                                               style="width:20px;height:18px"/></a>-->
            <!--            <a href="javascript:;" class="MinIcon_weibo"><img src="../assets/img/icon_weibo.jpg"-->
            <!--                                                              style="width:20px;height:18px"/></a>-->
            <!--            <a href="javascript:;" class="MinIcon_qq"><img src="../assets/img/icon_qq.jpg"-->
            <!--                                                           style="width:20px;height:18px"/></a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";
import Verify from "@/components/Verify";
export default {
  components: {Particles,Verify},
  head() {
    return {
      script: [
        {src: '/login/libs/sweetalert2/sweetalert2.min.js'}],
      link: [
        {rel: 'stylesheet', href: '/login/css/base.css'},
        {rel: 'stylesheet', href: '/login/css/login.css'},
        {rel: 'stylesheet', href: '/login/libs/sweetalert2/sweetalert2.min.css'}
      ]
    }
  },
  data(){
    return{
      loginData:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
    login(){

    }
  }
}
</script>

<style scoped>

</style>
