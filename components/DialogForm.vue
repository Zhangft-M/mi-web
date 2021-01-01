<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-dialog v-loading="isLoading" element-loading-spinner="el-icon-loading" :visible="dialogVisible"
               :style="getStyle"  :show-close="false"
               custom-class="custom-dialog animate__animated animate__jackInTheBox animate__fadeOutDown"
               :lock-scroll="false"
    >
      <el-row v-if="formType === 0" style="height: 50px" class="animate__animated animate__bounceInLeft">
        <el-col :offset="7">
          <div>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadImage"
            >
              <el-avatar shape="circle" :size="100" fit="scale-down" v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-form class="custom-form" :model="form" ref="form10" :rules="rules"
               v-if="formType === 1" label-width="85px">
        <el-form-item label="新用户名" prop="username" class="animate__animated animate__bounceInLeft">
          <el-input v-model="form.username" autocomplete="off">
            <i slot="prefix" class="el-input__icon fa fa-user-o" style="padding-left: 5px"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form class="custom-form" :model="form" ref="form20" :rules="rules"
               v-show="formType === 2" label-width="80px">
        <el-form-item label="新昵称:" prop="nickName" class="animate__animated animate__bounceInLeft">
          <el-input v-model="form.nickName" autocomplete="off">
            <i slot="prefix" class="el-input__icon fa fa-circle" style="padding-left: 5px"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div v-if="formType === 3">
        <el-form class="custom-form" :model="form" ref="form30" :rules="rules"
                 label-width="80px">
          <el-form-item label="新手机号" prop="phoneNumber" class="animate__animated animate__bounceInLeft">
            <el-input v-model.number="form.phoneNumber" autocomplete="off">
              <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="form.phoneNumber"  :type="0" ref="verifyCode"></VerifyCode>
        </el-form>
      </div>
      <div v-if="formType === 4">
        <el-form class="custom-form" :model="form" ref="form40" :rules="rules"
                 label-width="80px">
          <el-form-item label="新邮箱:" prop="email" class="animate__animated animate__bounceInLeft">
            <el-input v-model="form.email" autocomplete="off">
              <i slot="prefix" class="el-input__icon fa fa-envelope-o" style="padding-left: 5px"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :email="form.email" :type="1" ref="verifyCode"></VerifyCode>
        </el-form>
      </div>
      <div v-if="formType === 5">
        <div>
          <el-steps :active="activeIndex" space="1" finish-status="success" simple class="animate__animated animate__backInDown">
            <el-step title="手机验证" icon="el-icon-edit"></el-step>
            <el-step title="修改密码" icon="el-icon-upload"></el-step>
          </el-steps>
        </div>
        <div v-if="activeIndex === 0" style="margin-top: 10px">
          <el-form class="custom-form" :model="form" label-width="80px" ref="form50"
                   :rules="rules">
            <el-form-item label="手机号:" label-width="" prop="phoneNumber" class="animate__animated animate__bounceInLeft">
              <el-input disabled v-model.number="form.phoneNumber" autocomplete="off">
                <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
              </el-input>
            </el-form-item>
            <VerifyCode style="width: 350px" :phoneNumber="form.phoneNumber" :type="0" ref="verifyCode"></VerifyCode>
          </el-form>
        </div>
        <div v-if="activeIndex === 1" style="margin-top: 10px">
          <el-form class="custom-form" :model="form" label-width="80px" ref="form51"
                   :rules="rules">
            <el-form-item label="新密码:" label-width="" prop="password" class="animate__animated animate__bounceInLeft">
              <el-input :type="showPassword ? 'text' : 'password'" v-model="form.password" autocomplete="off">
                <a slot="suffix" href="javascript:void(0)" @click="showPassword = !showPassword"><i
                  :class="[showPassword ? 'el-input__icon fa fa-eye':'el-input__icon fa fa-eye-slash']"></i></a>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="formType === 6">
        <el-form class="custom-form" :model="form" ref="form60" :rules="rules"
                 label-width="80px">
          <el-form-item label="手机号" prop="phoneNumber" class="animate__animated animate__bounceInLeft">
            <el-input disabled v-model="form.phoneNumber" autocomplete="off">
              <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="form.phoneNumber"  :type="0" ref="verifyCode"></VerifyCode>
        </el-form>
      </div>
      <div v-if="formType === 7">
        <el-form class="custom-form" label-width="80px" :model="form" ref="form70"
                 :rules="rules">
          <el-form-item label="性别:" label-width="" prop="gender" class="animate__animated animate__bounceInLeft">
            <el-select style="padding-left: 10px;padding-bottom: 20px" v-model="form.gender" placeholder="请选择性别">
              <el-option
                v-for="item in genderItems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </div>
      <el-row>
        <el-col :offset="8">
          <div>
            <el-button size="mini" @click="cancelChange" round>取 消</el-button>
            <el-button size="mini" v-show="activeIndex === 0 && formType === 5" @click="nextStep" round>下一步
            </el-button>
            <el-button size="mini" v-show="activeIndex !== 0 || formType !== 5" type="primary" @click="submit" round>
              提交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {cancelUser, changePassword, updateUserInfo,validatePasswordVerifyCode} from "../api/user";
import VerifyCode from "./VerifyCode";
import {encrypt} from "../utils/rsaEncrypt";
import {uploadImage} from "../api/tool";
import rulesMixin from "./mixin/rulesMixin";
import {mixinToast} from "./sweetalert/mixinSweetalert";

const defaultForm = {
  username: '',
  password: '',
  nickName: '',
  phoneNumber: '',
  email: '',
  verifyCode: ''
}
export default {
  name: "DialogForm",
  components: {VerifyCode},
  mixins:[rulesMixin,VerifyCode],
  data() {
    return {
      customDialog: {
        height: '250px',
        borderRadius: '15px'
      },
      form: {
        username: undefined,
        password: undefined,
        nickName: undefined,
        gender: undefined,
        phoneNumber: undefined,
        email: undefined,
        verifyCode: undefined
      },
      genderItems:[
        {label: '男',value: 1},
        {label: '女',value: 0}
      ],
      //formType: null,
      activeIndex: 0,
      //dialogVisible:false,
      imageUrl: '',
      showPassword: false,
      isLoading: false,
      formRef: ''
    }
  },
  props: ['formType', 'dialogVisible',"personalPhone"],
  updated() {
    this.formRef = 'form' + this.formType + this.activeIndex
    if (this.formType ===5 || this.formType === 6) {
      this.form.phoneNumber = Number.parseInt(this.personalPhone)
    }
  },
  methods: {
    cancelChange() {
      // console.log(this.formRef)
      this.isLoading = false
      console.log("清除信息")
      const type = this.formType
      console.log(type)
      if (type !== 0){
        console.log(this.formRef)
        this.$refs[this.formRef].resetFields()
      }
      if (type === 3 || type ===4 || type === 6){
        this.$refs.verifyCode.resetVerifyCode()
      }
      if (type === 5 && this.activeIndex === 0){
        this.$refs.verifyCode.resetVerifyCode()
      }
      this.$emit('cancelChange')
      this.activeIndex = 0
      this.imageUrl = ''
      this.form.verifyCode = undefined
    },
    submit() {
      const _self = this
      const formRef = 'form' + this.formType + this.activeIndex
      if (this.formType === 3 || this.formType === 4 || this.formType === 6) {
        this.form.verifyCode = this.$refs.verifyCode.getVerifyCode()
      }
      if (this.formType === 0) {
        // 修改头像
        if (this.imageUrl === ''){
          mixinToast.fire({
            titleText: '请先上传头像',
            icon:"warning"
          })
          return
        }
        const data = {avatar:this.imageUrl}
        this.isLoading = true
        this.handlerUpdateInfo(data)
        return;
      }
      this.$refs[formRef].validate((isValidate) => {
        if (isValidate) {
          if (_self.formType === 5) {
            _self.changeUserPassword()
            return
          }
          this.isLoading = true
          if (this.formType === 6){
            cancelUser(this.form).then(()=>{
              this.$store.dispatch('user/resetUserInfo')
              this.isLoading = false
              this.$router.push('/')
            })
          }else {
            this.handlerUpdateInfo(this.form)
          }
        }
      })
    },
    handlerUpdateInfo(requestData){
      updateUserInfo(requestData).then((data) => {
        // this.$store.dispatch('user/setUserInfo', data)
        this.$emit("syncUserInfo",data)
        this.cancelChange();
        this.$message.success("更新成功")
      }).catch(() => {
        this.cancelChange();
        this.$message.error("更新失败")
      }).finally(() =>{
        this.isLoading = false
      })
    },
    getStyle() {
      switch (this.formType) {
        case 1 || 2 || 7:
          return {height: "200px"}
        case 3 || 4 :
          return {height: "300px"}
        case 5 :
          if (this.activeIndex === 0) {
            return {height: "300px"}
          }
          return {height: "200px"}
      }
    },
    nextStep() {
      const _self = this
      this.$refs[this.formRef].validate((isValidate) => {
        if (isValidate) {
          const data = {
            phoneNumber: _self.form.phoneNumber,
            verifyCode: _self.$refs.verifyCode.getVerifyCode()
          }
          this.isLoading = true
          validatePasswordVerifyCode(data).then(() => {
            this.isLoading = false
            this.activeIndex = this.activeIndex + 1
            this.$refs.verifyCode.resetVerifyCode()
          }).catch(() => {
            this.isLoading = false
            this.$message.error("验证码错误")
            this.$refs.verifyCode.resetVerifyCode()
          })
        } else {
         this.$message.error("请正确填写表单哦")
        }
      })
    },
    getContact(val) {
      this.form.type = val
      switch (val) {
        //todo:不能进行单个表单验证
        case 0:
          return this.form.phoneNumber
        case 1:
          return this.form.email
        default:
          this.$message.error("请正确填写联系方式")
          break
      }
    },
    changeUserPassword() {
      const {password} = this.form.password
      const data = {
        password: encrypt(this.form.password.trim())
      }
      this.isLoading = true
      changePassword(data).then(() => {
        this.cancelChange();
        this.$message.success("修改成功,请重新登录")
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      }).catch(() => {
        this.cancelChange();
        this.$message.error("修改失败")
      })
    },
    uploadImage(val) {
      console.log(val)
      const file = val.file
      console.log(file)
      // const form = new FormData();
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return
      }
      const formData = new FormData()
      formData.append("avatar",file);
      this.isLoading = true
      uploadImage(formData).then((data) => {
        this.imageUrl = data
        this.isLoading = false
        mixinToast.fire({
          titleText: '上传成功',
          icon:"success",
          position:"top-end"
        })
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
        this.$message.error("上传失败")
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.custom-dialog {
  width: 420px;
  border-radius: 20px;
  opacity: 0.9;
  background-color: #87adbd;
}

.custom-form input.el-input__inner {
  border-radius: 15px;
  opacity: 0.75;
}

.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
</style>
