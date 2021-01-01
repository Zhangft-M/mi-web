export default {
 data(){
   return{
     rules: {
       username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
       password: [{required: true, message: '请输入密码', trigger: 'blur'}],
       phoneNumber:[{type: "number",required: true, message: '请输入手机号', trigger: 'blur'}],
       nickName:[{required: true, message: '请输入昵称', trigger: 'blur'}],
       verifyCode: [{type: "number",required: true, message: '验证码为六位数字', trigger: 'blur'}],
       checkedPassword: [{required: true, message: '请输入密码', trigger: 'blur'}],
       gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
     },
   }
 }
}
