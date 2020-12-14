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
        <el-form class="login-register-form" label-width="auto" :rules="rules" ref="registerForm" :model="registerData"
                 size="medium">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="registerData.username" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="password">
            <el-input type="text" v-model.number="registerData.phoneNumber" style="width: 300px"></el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="getPhoneNumber" ref="verifyCode"></VerifyCode>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerData.password" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkedPassword">
            <el-input type="password" v-model="registerData.checkedPassword" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" class="submit_btn" style="width: 300px" round @click="register">注册</el-button>
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

export default {
  components: {VerifyCode, Particles},
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
        phoneNumber: '',
        password: '',
        checkedPassword: '',
        verifyCode: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        phoneNumber: [{type: "number",required: true, message: '请输入手机号', trigger: 'blur'}],
        verifyCode: [{type: "number",required: true, message: '验证码为六位数字', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        checkedPassword: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    getPhoneNumber() {
      this.$refs.registerForm.validateField("phoneNumberRule", (isValidate) => {
        if (isValidate) {
          return this.registerData.phoneNumber
        } else {
          this.$message.error("请输入正确的手机号")
          return null;
        }
      })
    },
    register(){
      this.registerData.verifyCode = this.$refs.verifyCode.getVerifyCode
      this.$refs.registerForm.validate((isValidate)=>{
        if (isValidate){
          const {username,phoneNumber,password,verifyCode} = this.registerData
          registe({username,phoneNumber,password,verifyCode}).then(()=>{
            this.$refs.phoneVerifyCodeForm.resetFields()
            this.$message.success("注册成功")
            this.$router.push('/login')
          }).catch((error)=>{
            this.$refs.phoneVerifyCodeForm.resetFields()
            this.$message.error(error)
          })
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
