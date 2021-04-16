<template>
  <div>
    <Particles style="padding-top: 10px"></Particles>
    <div id="wrapper" style="padding-left: 100px">
      <el-image class="animate__animated animate__bounceInDown" style="width: 100px;height: 100px"
                src="/images/logo/logo-2.png"></el-image>
      <nav class="switch_nav animate__animated animate__bounceInDown">
        <nuxt-link to="/login" id="switch_login" class="switch_btn on">登录</nuxt-link>
        <nuxt-link to="/register" id="switch_signup" class="switch_btn">注册</nuxt-link>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div style="float:right;padding-left: 50px">
        <el-form class="login-register-form" label-width="80px" :rules="rules" :model="loginData" ref="loginForm">
          <el-form-item class="animate__animated animate__bounceInLeft" label="用户名" prop="username">
            <el-input type="text" v-model="loginData.username" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="animate__animated animate__bounceInRight">
            <el-input show-password type="password" v-model="loginData.password" style="width: 300px">
              <i slot="prefix" class="el-input__icon fa fa-unlock-alt"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="animate__animated animate__bounceInUp" label="验证" style="padding-top: 10px">
            <Verify @getVerifyData="getVerifyData" ref="verify"></Verify>
          </el-form-item>
          <el-form-item class="animate__animated animate__fadeInUp">
            <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="isDisable" :loading="isLoading"
                       style="width: 300px !important;height: 40px !important;"
                       @click="login" round>Login
            </el-button>
          </el-form-item>
        </el-form>
        <div class="animate__animated animate__bounceInUp">
          <div class="states">
          <span class="left">
            <nuxt-link to="/login/phoneLogin?fromPath=/phoneLogin">手机验证码登录</nuxt-link>
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
    </div>
    <div>
      <DialogForm :dialogVisible='dialogVisible' :formType='formType' @cancelChange="cancelChange"></DialogForm>
    </div>
  </div>
</template>

<script>
import Particles from "../../components/Particles";
import Verify from "../../components/Verify";
import {encrypt} from "../../utils/rsaEncrypt";
import fullScreenLoadingMixin from "../../components/mixin/fullScreenLoadingMixin";
import DialogForm from "../../components/DialogForm";
import {mixinAlert, mixinToast} from "../../components/sweetalert/mixinSweetalert";

export default {
  components: {DialogForm, Particles, Verify},
  mixins: [fullScreenLoadingMixin],
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
  mounted() {
    mixinToast.fire({
      title: '提示',
      titleText: '如果验证器未加载出来,请刷新页面'
    })
  },
  methods: {
    login() {
      this.startLoading()
      this.isLoading = true
      if (this.verifyData == null) {
        this.$message.warning("请先滑动验证")
        this.isLoading = false
        return;
      }
      this.$refs.loginForm.validate((isValidate) => {
        if (isValidate) {
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
            this.$refs.loginForm.resetFields()
            this.isLoading = false
            this.stopLoading()
            mixinAlert.fire({
              title: '登录成功,即将自动跳转',
              icon: 'success',
              timer: 1500,
            }).then(() => {
              console.log("登录成功")
              // this.$refs['verify'].reset()
              this.$router.push('/')
            })
          }).catch(() => {
            this.isLoading = false
            this.stopLoading()
            this.$refs.loginForm.resetFields()
            this.$refs.verify.reset()
            this.isDisable = true
          })
        } else {
          this.$message.error("请正确填写用户名和密码")
        }
      })
    },
    getVerifyData(payload) {
      // console.log(payload)
      this.verifyData = payload;
      this.isDisable = false
      this.$message.success("验证成功,两分钟内有效")
    },
    changePassword(val) {
      console.log(val)
      this.formType = val
      this.dialogVisible = true
    },
    cancelChange() {
      this.dialogVisible = false
      this.formType = -1
    }
  }
}
</script>

<style>
/*解决dialog出现页面抖动情况*/
body {
  padding-right: 0 !important;
}
</style>
