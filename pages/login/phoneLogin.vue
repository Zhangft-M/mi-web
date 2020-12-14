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
              <i slot="prefix" class="fa fa-mobile"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="getPhoneNumber" :type="0" :email="null" ref="verifyCode"></VerifyCode>
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
  name: "phone",
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
        phoneNumber:[{type: "number",required: true, message: '请输入手机号', trigger: 'blur'}],
        verifyCode: [{type: "number",required: true, message: '验证码为六位数字', trigger: 'blur'}]
      }
    }
  },
  methods:{
    getPhoneNumber(){
      this.$refs.phoneVerifyCodeForm.validateField("phoneNumber", (isValidate) => {
        if (isValidate) {
          return this.phoneLoginData.phoneNumber
        } else {
          this.$message.error("请输入正确的手机号")
          return null;
        }
      })
    },
    login(){
      this.phoneLoginData.verifyCode = this.$refs.verifyCode.getVerifyCode
      this.$refs.phoneVerifyCodeForm.validate((isValidate)=>{
        if (isValidate){
          phoneNumberLogin(this.phoneLoginData).then(()=>{
            this.$refs.phoneVerifyCodeForm.resetFields()
            this.$router.push("/")
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

<style scoped>

</style>
