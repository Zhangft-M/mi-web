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
        <el-form class="login-register-form" label-width="55px" :model="loginData">
          <el-form-item label="用户名">
            <el-input type="text" v-model="loginData.username" style="width: 300px">
              <i slot="prefix" class="fa fa-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginData.password" style="width: 300px">
              <i slot="prefix" class="fa fa-unlock-alt"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="验证">
            <Verify @getVerifyData="getVerifyData" ref="verify"></Verify>
          </el-form-item>
          <el-form-item>
            <el-button type="submit" :disabled="isDisable" :loading="isLoading" style="width: 300px" class="submit_btn" @click="login" round>Login</el-button>
          </el-form-item>
        </el-form>
        <div class="states">
          <span class="left"><a href="javascript:;">手机验证码登陆</a></span>
          <span class="right"><a href="javascript:;">无法登陆？</a></span>
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
import Particles from "@/components/Particles";
import Verify from "@/components/Verify";
import {encrypt} from "../../utils/rsaEncrypt";
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
        password: '',
      },
      verifyData:{},
      isDisable: true,
      isLoading: false
    }
  },
  methods:{
    login(){
      this.isLoading = true
      if (this.verifyData == null){
        this.$message.error("请先滑动验证")
        this.isLoading = false
        return;
      }
      // 有验证数据,进行登录的操作
      const encodeUsername = encrypt(this.loginData.password.trim())
      const encodePassword = encrypt(this.loginData.password.trim())
      const requestData = {
        loginData:{
          username: encodeUsername,
          password: encodePassword,
        },
        verifyData: this.verifyData
      }
      this.$store.dispatch('user/login',requestData).then(()=>{
        this.$store.dispatch('user/getInfo').then(()=>{
          this.$store.dispatch('thumbUpList/setThumbUpIds')
          this.$store.dispatch('favoritesPost/getFavoritesPostId')
          this.isLoading = false
          if (window.history.length <= 1){
            this.$router.push('/');
          }else {
            this.$router.go(-1)
          }
        }).catch(()=>{
          this.isLoading = false
          this.$refs['verify'].$emit("reset");
          this.$message.error("系统错误,登录失败")
        })
      }).catch(()=>{
        this.isLoading = false
        this.$refs['verify'].$emit("reset");
        this.$message.error("系统错误,登录失败")
      })
    },
    getVerifyData(payload){
      console.log(payload)
      this.verifyData = payload;
      this.isDisable = false
    }
  }
}
</script>

<style scoped>

</style>
