<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <nav class="switch_nav">
        <nuxt-link to="/login" id="switch_login" class="switch_btn">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn on">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px">
        <el-form class="login-register-form" label-width="auto" :model="registerData" size="medium">
          <el-form-item label="用户名">
            <el-input type="text" v-model="registerData.username" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input type="text" v-model.number="registerData.phoneNumber" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input type="text" v-model="registerData.username" style="width: 300px">
              <el-button slot="suffix" size="mini" :disabled="isSend" round @click="senSms">{{ isSend ? countdown : sendTxt }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="registerData.password" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="registerData.checkedPassword" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" class="submit_btn" style="width: 300px" round>注册</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";
import {sendSms} from "../../api/sms";

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
        phoneNumber: '',
        password: '',
        checkedPassword: ''
      },
      sendTxt: '发送',
      countdown: 60,
      isSend: false,

    }
  },
  methods: {
    senSms() {
      if (this.registerData.phoneNumber === '') {
        this.$message.error("请输入正确的手机号")
        return
      }
      this.isSend = true
      const auth_timetimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.isSend = false
          this.countdown = 60
          clearInterval(auth_timetimer);
        }
      }, 1000);
      /*sendSms(this.registerData.phoneNumber).then(()=>{
        this.sendTxt = 60
        setInterval(function () {
          _this.sendTxt--
        },1000)
        this.sendTxt = '发送'
      })*/
    }
  }
}
</script>

<style>
.login-register-form input.el-input__inner {
  border-radius: 15px;
}
</style>
