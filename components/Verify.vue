<template>
  <!--  <div id="nc"></div>-->
  <div class="g-recaptcha" style="width: 10px"
       data-sitekey="6LdCuPwZAAAAAEf2DBwddyd-udY43_6AgOqt00gP"
       data-callback="successCallback"
       data-expired-callback="expireCallback"
       data-error-callback="errorCallback"></div>
  <!--  <div
      id="grecaptcha">
    </div>-->
</template>

<script>
// FFFF0N000000000098E9
// nc_login
export default {
  head() {
    return {
      script: [{src: 'https://www.recaptcha.net/recaptcha/api.js'}]
    }
  },
  data() {
    return {
      recaptcha: null
    }
  },
  name: "Verify",
  mounted() {
    const self = this
    this.recaptcha = window.grecaptcha
    window.successCallback = function (args) {
      //console.log("人机验证")
      // console.log(args)
      self.$emit("getVerifyData", args)
    };
    window.expireCallback = function () {
      window.grecaptcha.reset()
    };
    window.errorCallback = function () {
      window.grecaptcha.reset()
    };
  },
  methods: {
    reset() {
      this.recaptcha.reset()
    }
  }
}
</script>

<style scoped>

</style>
