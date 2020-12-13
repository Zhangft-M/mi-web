<template>
  <el-form-item label="验证码" prop="verifyCodeRule" label-width="80px">
    <el-input type="text" v-model.number="verifyCode" style="width: 300px">
      <el-button slot="suffix" size="mini" :disabled="isSend" round @click="senSms">{{
          isSend ? countdown : sendTxt
        }}
      </el-button>
    </el-input>
  </el-form-item>
</template>

<script>
import {sendSms} from "../api/sms";

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
  props: ['phoneNumber'],
  methods: {
    senSms() {
      if (this.phoneNumber === null) {
        this.$message.error("请输入正确的手机号")
        return
      }
      sendSms(this.phoneNumber).then(() => {
        this.isSend = true
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            this.isSend = false
            this.countdown = 60
            clearInterval(timer);
          }
        }, 1000);
      })
    },
    getVerifyCode() {
      return this.verifyCode;
    }
  }
}
</script>

<style scoped>

</style>
