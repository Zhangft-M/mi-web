<template>
  <el-form-item label="验证码" prop="verifyCode" label-width="80px">
    <el-input type="text" v-model.number="verifyCode" style="width: 300px">
      <i slot="prefix" class="fa fa-commenting-o"></i>
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
  props: ['phoneNumber', 'email', 'type'],
  methods: {
    senSms() {
      const data = {
        phoneNumber: this.phoneNumber,
        email: this.email,
        type: this.type
      }
      switch (this.type) {
        case 0:
          if (this.phoneNumber == null) {
            this.$message.error("请输入正确的手机号")
            return;
          }
          break
        case 1:
          if (this.email == null) {
            this.$message.error("请输入正确的邮箱地址")
            return;
          }
          break
        default:
          this.$message.error("不知道发送类型")
          return;
      }
      sendSms(data).then(() => {
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
