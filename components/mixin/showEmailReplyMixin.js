import {confirmAlert} from "../sweetalert/mixinSweetalert";

export default {
  data() {
    return {
      showEmailReplyOptions: false
    }
  },
  mounted() {
    this.$store.dispatch('user/getInfo').then((data)=>{
      console.log("用户邮箱校验")
      if (data.email == null) {
        confirmAlert.fire({
          title: '未绑定邮箱',
          titleText: '邮箱未绑定,无法接收评论回复邮件,是否去绑定',
          icon: 'question'
        }).then((result)=>{
          if (result.isConfirmed){
            console.log(result)
            this.$router.push('/user/set')
          }
        }).catch(()=>{

          this.$message.warning("不能接收邮件")
        })
      }else {
        this.showEmailReplyOptions = true
      }
    })
    /*getUserInfo().then((data)=>{

    })*/
  }
}
