<template>
    <el-form-item label="验证码" label-width="80px">
      <el-input type="text" v-model="verifyCode" style="width: 300px">
        <i slot="prefix" class="fa fa-commenting-o"></i>
        <el-button slot="suffix" size="mini" :disabled="isSend" round @click="senSms">{{
            isSend ? countdown : sendTxt
          }}
        </el-button>
      </el-input>
    </el-form-item>

</template>

<script>
import {sendSms} from "../api/tool";
import {checkEmail, checkPhone} from "../utils/validate";

export default {
  name: "VerifyCode",
  data() {

    return {
      verifyCode: null,
      isSend: false,
      sendTxt: '发送',
      countdown: 60,
    }
  },
  props: ['type','phoneNumber','email'],
  methods: {
    senSms() {
      if (this.type === 0) {
        // 获取手机号
        let isPhone = checkPhone(this.phoneNumber);
        if (!isPhone){
          this.$message.error("请输入正确的手机号")
          return
        }
      } else if (this.type === 1) {
        if (!checkEmail(this.email)){
          this.$message.error("请输入正确的邮箱地址")
          return;
        }
      }
      const contact = this.phoneNumber == null ? this.email : this.phoneNumber;
      const loginData = {
        contact:contact,
        type:this.type
      }
      sendSms(loginData).then(() => {
        this.isSend = true
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            this.isSend = false
            this.countdown = 60
            clearInterval(timer);
          }
        }, 1000);
      }).catch((error)=>{
        console.log(error)
      })
    },
    getVerifyCode() {
      return this.verifyCode;
    },
    resetVerifyCode(){
      this.verifyCode = ''
    }
  }
}
</script>

<style scoped>

</style>
