<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <nav class="switch_nav">
        <a href="javascript:void(0)" id="switch_login" class="switch_btn on">登录</a>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px">
        <el-form class="login-register-form" :rules="rules" ref="phoneVerifyCodeForm" :model="phoneLoginData">
          <el-form-item label="手机号" prop="phoneNumber" label-width="80px">
            <el-input type="text" v-model.number="phoneLoginData.phoneNumber" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-mobile"></i>
            </el-input>
          </el-form-item>
            <VerifyCode :type="0" :phoneNumber="phoneLoginData.phoneNumber" ref="verifyCode"></VerifyCode>
          <el-form-item label-width="80px">
            <el-button type="submit" :loading="isLoading" style="width: 300px" class="submit_btn"
                       @click="login" round>Login
            </el-button>
          </el-form-item>
        </el-form>
        <div class="states">
          <span class="left">
            <nuxt-link to="/login">账号密码登录</nuxt-link>
          </span>
        </div>
        <div class="states">
          <a href="javascript:;" class="social_account">社交账号登陆</a>
          <div class="states three_MinIcon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerifyCode from "../../components/VerifyCode";
import Particles from "../../components/Particles";
import {phoneNumberLogin} from "../../api/user";
export default {
  components: {VerifyCode,Particles},
  head() {
    return {
      title: '手机号登录',
      script: [],
      link: [
        {rel: 'stylesheet', href: '/login/css/base.css'},
        {rel: 'stylesheet', href: '/login/css/login.css'},
      ]
    }
  },
  data(){
    return{
      phoneLoginData:{
        phoneNumber: '',
        verifyCode: ''
      },
      isLoading: false,
      rules:{
        phoneNumber:[{type: "number",required: true, message: '请输入手机号', trigger: 'blur'}]
      }
    }
  },
  methods:{
    getPhoneNumber(){
      // console.log(this.$refs[val])
      this.$refs['phoneVerifyCodeForm'].validateField("phoneNumber",errorMessage => {
        if (!errorMessage){
          console.log(this.phoneLoginData.phoneNumber)
          return this.phoneLoginData.phoneNumber;
        }
        this.$message.error(errorMessage)
        return null;
      })
    },
    login(){
      this.phoneLoginData.verifyCode = this.$refs.verifyCode.getVerifyCode()
      const code = this.phoneLoginData.verifyCode + '';
      if (code === ''){
        this.$message.error("请输入验证码")
        return;
      }else if (code.length !== 6){
        this.$message.error("验证码为六位数字")
        return
      }
      this.$refs.phoneVerifyCodeForm.validate((isValidate)=>{
        if (isValidate){
          this.$store.dispatch('user/verifyCodeLogin',this.phoneLoginData).then(()=>{
            this.$store.dispatch('user/getInfo').then(()=>{
              this.$refs.phoneVerifyCodeForm.resetFields()
              this.$refs.verifyCode.resetVerifyCode()
              if (window.history.length <= 1) {
                this.$router.push('/');
              } else {
                this.$router.go(-2)
              }
            })
          }).catch(()=>{
            this.$refs.phoneVerifyCodeForm.resetFields()
            this.$refs.verifyCode.resetVerifyCode()
            this.$message.error('登录失败')
          })
        }else {
          this.$message.error("请正确填写信息")
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
