<template>
  <div>
    <Particles style="padding-top: 10px;padding-right: 10px"></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <el-image class="animate__animated animate__bounceInDown" style="width: 100px;height: 100px"
                src="/images/logo/logo-4.png"></el-image>
      <nav class="switch_nav animate__animated animate__bounceInDown">
        <nuxt-link to="/login" id="switch_login" class="switch_btn">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn on">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px">
        <el-form class="login-register-form" label-width="auto" :rules="rules" ref="registerForm" :model="registerData"
                 size="medium">
          <el-form-item label="用户名" prop="username" class="animate__animated animate__bounceInLeft">
            <el-input type="text" v-model="registerData.username" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-user-circle" style=""></i>
            </el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName" class="animate__animated animate__bounceInRight">
            <el-input type="text" v-model="registerData.nickName" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-dot-circle-o" style=""></i>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber" class="animate__animated animate__bounceInLeft">
            <el-input type="text" v-model.number="registerData.phoneNumber" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-phone" style=""></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="registerData.phoneNumber" :type="0" ref="verifyCode"></VerifyCode>
          <el-form-item label="密码" prop="password" class="animate__animated animate__bounceInLeft">
            <el-input show-password type="password" v-model="registerData.password" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-lock" style=""></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkedPassword" class="animate__animated animate__bounceInRight">
            <el-input show-password type="password" v-model="registerData.checkedPassword" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-lock" style=""></i>
            </el-input>
          </el-form-item>
          <el-form-item class="animate__animated animate__backInUp">
            <el-button style="width: 300px" round @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Particles from "../../components/Particles";
import VerifyCode from "../../components/VerifyCode";
import {registe} from "../../api/user";
import {encrypt} from "../../utils/rsaEncrypt";
import fullScreenLoadingMixin from "../../components/mixin/fullScreenLoadingMixin";
import {mixinAlert, mixinToast} from "../../components/sweetalert/mixinSweetalert";
import rulesMixin from "../../components/mixin/rulesMixin";

export default {
  components: {VerifyCode, Particles},
  mixins: [fullScreenLoadingMixin, rulesMixin],
  head() {
    return {
      title: '注册',
      script: [],
      link: [
        {rel: 'stylesheet', href: '/login/css/base.css'},
        {rel: 'stylesheet', href: '/login/css/login.css'}
      ]
    }
  },
  data() {
    return {
      registerData: {
        username: '',
        nickName: '',
        phoneNumber: '',
        password: '',
        checkedPassword: '',
        verifyCode: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    register() {
      this.startLoading()
      if (this.registerData.password.trim() !== this.registerData.checkedPassword.trim()) {
        this.$message.error("两次密码不一样")
        this.stopLoading()
        return
      }
      this.registerData.verifyCode = this.$refs.verifyCode.getVerifyCode()
      console.log(this.registerData.verifyCode)
      this.$refs.registerForm.validate((isValidate) => {
        if (isValidate) {
          const encodeUsername = encrypt(this.registerData.username.trim())
          const encodePassword = encrypt(this.registerData.password.trim())
          const registerData = {
            username: encodeUsername,
            nickName: this.registerData.nickName,
            password: encodePassword,
            phoneNumber: this.registerData.phoneNumber,
            verifyCode: this.registerData.verifyCode
          }
          registe(registerData).then(() => {
            mixinAlert.fire({
              title: '注册成功,即将跳转到登录页面',
              icon: 'success'
            }).then(() => {
              this.$router.push({path: '/login', query: {fromPath: '/register'}})
            })
          }).catch(() => {
            this.$message.error("注册失败,请重试")
            this.stopLoading()
          }).finally(() => {
            this.$refs.verifyCode.resetVerifyCode()
            this.$refs.registerForm.resetFields()
            this.stopLoading()
          })
        } else {
          mixinToast.fire({
            title: '错误',
            titleText: '请正确填写表单'
          })
          this.stopLoading()
        }
      })
    }
  }
}
</script>

<style>
.login-register-form input.el-input__inner {
  border-radius: 15px;
  opacity: 0.85;
}
</style>
