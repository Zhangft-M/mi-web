<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <el-image class="animate__animated animate__bounceInDown" style="width: 100px;height: 100px" src="/images/logo/logo-3.png"></el-image>
      <nav class="switch_nav animate__animated animate__bounceInDown" >
        <a href="javascript:void(0)" id="switch_login" class="switch_btn on">登录</a>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px" class="">
        <el-form class="login-register-form" :rules="rules" ref="phoneVerifyCodeForm" :model="phoneLoginData">
          <el-form-item label="手机号" prop="phoneNumber" label-width="80px" class="animate__animated animate__bounceInLeft">
            <el-input type="text" v-model.number="phoneLoginData.phoneNumber" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-mobile"></i>
            </el-input>
          </el-form-item>
            <VerifyCode :type="0" :phoneNumber="phoneLoginData.phoneNumber" ref="verifyCode"></VerifyCode>
          <el-form-item label-width="80px" class="animate__animated animate__bounceInUp">
            <el-button :loading="isLoading" style="width: 300px"
                       @click="login" round>Login
            </el-button>
          </el-form-item>
        </el-form>
        <div class="animate__animated animate__fadeInUp">
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
  </div>
</template>

<script>
import VerifyCode from "../../components/VerifyCode";
import Particles from "../../components/Particles";
import fullScreenLoadingMixin from "../../components/mixin/fullScreenLoadingMixin";
import {mixinAlert} from "../../components/sweetalert/mixinSweetalert";
export default {
  components: {VerifyCode,Particles},
  mixins:[fullScreenLoadingMixin],
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
      this.$refs['phoneVerifyCodeForm'].validate((isValidate)=>{
        if (isValidate){
          this.startLoading()
          this.$store.dispatch('user/verifyCodeLogin',this.phoneLoginData).then(()=>{
            this.$refs.phoneVerifyCodeForm.resetFields()
            this.$refs.verifyCode.resetVerifyCode()
            this.isLoading = false
            this.stopLoading()
            mixinAlert.fire({
              title: '登录成功,即将自动跳转',
              icon: 'success',
              timer: 1500,
            }).then(()=>{
              console.log("登录成功")
              // this.$refs['verify'].reset()
              this.$router.push('/')
            })
          }).catch(()=>{
            this.stopLoading()
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
