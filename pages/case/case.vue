<template>
<div>


</div>
</template>

<script>
import {mixinAlert} from "../../components/sweetalert/mixinSweetalert";

export default {
  mounted() {
    mixinAlert.fire({
      title: '提示',
      titleText: '该模块作者努力建设中。。。'
    }).then(()=>{
      if (window.history.length <= 1) {
        this.$router.push('/');
      } else {
        this.$router.go(-1)
      }
    })
  }
}
</script>

<style scoped>

</style>
