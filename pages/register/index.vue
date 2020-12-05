<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-right: 20px">
      <nav class="switch_nav" style="padding-left: 50px">
        <nuxt-link to="/login" id="switch_login" class="switch_btn">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn on">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <el-form label-width="auto" :model="registerData" size="medium">
        <el-form-item label="用户名">
          <el-input type="text" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱或手机号">
          <el-input type="text" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="验证码" style="width: 365px">
          <el-col :span="18">
            <el-input type="text" v-model="registerData.username"></el-input>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button size="mini" round>发送</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="registerData.checkedPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" class="submit_btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";

export default {
  components: {Particles},
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
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        checkedPassword: ''
      }
    }
  }
}
</script>

<style scoped>
.el-input__inner{
  border-radius: 20px;
}
</style>
