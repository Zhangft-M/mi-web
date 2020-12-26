<template>
  <div>
    <Particles></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <nav class="switch_nav">
        <nuxt-link to="/login" id="switch_login" class="switch_btn on">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px">
        <el-form class="login-register-form" label-width="80px" :rules="rules" :model="loginData" ref="loginForm">
          <el-form-item label="用户名" prop="username" >
            <el-input type="text" v-model="loginData.username" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-unlock-alt"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="验证" style="padding-top: 10px">
            <Verify @getVerifyData="getVerifyData" ref="verify"></Verify>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" :disabled="isDisable" :loading="isLoading" style="width: 300px !important;height: 40px !important;" class="submit_btn"
                       @click="login" round>Login
            </el-button>
          </el-form-item>
        </el-form>
        <div class="states">
          <span class="left">
            <nuxt-link to="/login/phoneLogin">手机验证码登录</nuxt-link>
          </span>
          <a class="right" href="javascript:void(0)" @click="changePassword(5)">忘记密码？</a>
        </div>
        <div class="states">
          <a href="javascript:;" class="social_account">社交账号登陆</a>
          <div class="states three_MinIcon">
          </div>
        </div>
      </div>
    </div>
    <div>
      <DialogForm :dialogVisible = 'dialogVisible' :formType = 'formType' @cancelChange="cancelChange"></DialogForm>
    </div>
  </div>
</template>

<script>
import Particles from "../../components/Particles";
import Verify from "../../components/Verify";
import {encrypt} from "../../utils/rsaEncrypt";
import {mixinToast} from "../../components/sweetalert/mixinSweetalert";
import DialogForm from "../../components/DialogForm";

export default {
  components: {DialogForm, Particles, Verify},
  head() {
    return {
      title: '用户名密码登录',
      script: [],
      link: [
        {rel: 'stylesheet', href: '/login/css/base.css'},
        {rel: 'stylesheet', href: '/login/css/login.css'}
      ]
    }
  },
  data() {
    return {
      loginData: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      verifyData: {},
      isDisable: true,
      isLoading: false,
      dialogVisible: false,
      formType: -1,
    }
  },
  methods: {
    login() {
      this.isLoading = true
      if (this.verifyData == null) {
        mixinToast.fire({
          icon: 'error',
          title: '请先滑动验证'
        })
        this.isLoading = false
        return;
      }
      this.$refs.loginForm.validate((isValidate)=>{
        if (isValidate){
          // 有验证数据,进行登录的操作
          const encodeUsername = encrypt(this.loginData.username.trim())
          const encodePassword = encrypt(this.loginData.password.trim())
          const requestData = {
            loginData: {
              username: encodeUsername,
              password: encodePassword,
            },
            verifyData: this.verifyData
          }
          this.$store.dispatch('user/login', requestData).then(() => {
            this.$store.dispatch('user/getInfo').then(() => {
              this.$refs.loginForm.resetFields()
              this.isLoading = false
              if (window.history.length <= 1) {
                this.$router.push('/');
              } else {
                this.$router.go(-1)
              }
              this.$refs['verify'].reset()
            }).catch(() => {
              this.$refs.loginForm.resetFields()
              this.$refs['verify'].reset()
              this.isLoading = false
              this.isDisable = true
              this.$message.error("系统错误,登录失败")
            })
          }).catch(() => {
            this.$refs.loginForm.resetFields()
            this.$refs['verify'].reset()
            this.isLoading = false
            this.isDisable = true
            this.$message.error("系统错误,登录失败")
          })
        } else {
         this.$message.error("请正确填写用户名和密码")
        }
      })
    },
    getVerifyData(payload) {
      console.log(payload)
      this.verifyData = payload;
      this.isDisable = false
      this.$message.success("验证成功,两分钟内有效")
    },
    changePassword(val) {
      console.log(val)
      this.formType = val
      this.dialogVisible = true
    },
    cancelChange(){
      this.dialogVisible = false
      this.formType = -1
    }
  }
}
</script>

<style>
/*解决dialog出现页面抖动情况*/

</style>
