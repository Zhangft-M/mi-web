<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-dialog v-loading="isLoading" element-loading-spinner="el-icon-loading" :visible="dialogVisible"
               :style="getStyle" @close="cancelChange" :close-on-click-modal="false"
               custom-class="custom-dialog">
      <el-row v-show="formType === 0" style="height: 50px">
        <el-col :offset="10">
          <div>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadImage"
            >
              <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-form class="custom-form" :model="form" ref="form10" :rules="rules"
               v-show="formType === 1" label-width="85px">
        <el-form-item label="新用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off">
            <i slot="prefix" class="el-input__icon fa fa-user-o" style="padding-left: 5px"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form class="custom-form" :model="form" ref="form20" :rules="rules"
               v-show="formType === 2" label-width="80px">
        <el-form-item label="新昵称:" prop="nickName">
          <el-input v-model="form.nickName" autocomplete="off">
            <i slot="prefix" class="el-input__icon fa fa-circle" style="padding-left: 5px"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div v-show="formType === 3">
        <el-form class="custom-form" :model="form" ref="form30" :rules="rules"
                 label-width="80px">
          <el-form-item label="新手机号" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" autocomplete="off">
              <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="getContact(0)" :email="null" :type="0" ref="verifyCode"></VerifyCode>
        </el-form>
      </div>
      <div v-show="formType === 4">
        <el-form class="custom-form" :model="form" ref="form40" :rules="rules"
                 label-width="80px">
          <el-form-item label="新邮箱:" prop="email">
            <el-input v-model="form.email" autocomplete="off">
              <i slot="prefix" class="el-input__icon fa fa-envelope-o" style="padding-left: 5px"></i>
            </el-input>
          </el-form-item>
          <VerifyCode :phoneNumber="null" :email="getContact(1)" :type="1" ref="verifyCode"></VerifyCode>
        </el-form>
      </div>
      <div v-show="formType === 5">
        <div>
          <el-steps :active="activeIndex" space="1" finish-status="success" simple>
            <el-step title="手机验证" icon="el-icon-edit"></el-step>
            <el-step title="修改密码" icon="el-icon-upload"></el-step>
          </el-steps>
        </div>
        <div v-show="activeIndex === 0" style="margin-top: 10px">
          <el-form class="custom-form" :model="form" label-width="80px" ref="form50"
                   :rules="rules">
            <el-form-item label="手机号:" label-width="" prop="phoneNumber">
              <el-input v-model.number="form.phoneNumber" autocomplete="off">
                <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
              </el-input>
            </el-form-item>
            <VerifyCode style="width: 350px" :phoneNumber="getContact(0)" :email="null" :type="0" ref="verifyCode"></VerifyCode>
          </el-form>
        </div>
        <div v-show="activeIndex === 1" style="margin-top: 10px">
          <el-form class="custom-form" :model="form" label-width="80px" ref="form51"
                   :rules="rules">
            <el-form-item label="新密码:" label-width="" prop="password">
              <el-input :type="showPassword ? 'text' : 'password'" v-model="form.password" autocomplete="off">
                <a slot="suffix" href="javascript:void(0)" @click="showPassword = !showPassword"><i
                  :class="[showPassword ? 'el-input__icon fa fa-eye':'el-input__icon fa fa-eye-slash']"></i></a>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
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
import {changePassword, updateUserInfo} from "../api/user";
import VerifyCode from "./VerifyCode";
import {validateVerifyCode} from "../api/sms";
import {encrypt} from "../utils/rsaEncrypt";
import {uploadImage} from "../api/tool";

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
  data() {
    return {
      customDialog: {
        height: '250px',
        borderRadius: '15px'
      },
      form: {
        username: '',
        password: '',
        nickName: '',
        phoneNumber: '',
        email: '',
        verifyCode: ''
      },
      //formType: null,
      activeIndex: 0,
      //dialogVisible:false,
      imageUrl: '',
      showPassword: false,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        nickName: [{required: true, message: '请输入昵称名', trigger: 'blur'}],
        phoneNumber: [{required: true, message: '请输入手机号', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}],
        verifyCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      isLoading: false,
      formRef: ''
    }
  },
  props: ['formType', 'dialogVisible'],
  updated() {
    this.formRef = 'form' + this.formType + this.activeIndex
  },
  methods: {
    cancelChange() {
      console.log(this.formRef)
      this.isLoading = false
      this.$emit('cancelChange')
      this.$refs[this.formRef].resetFields()
      this.activeIndex = 0
      this.imageUrl = ''
    },
    submit() {
      const _self = this
      const formRef = 'form' + this.formType + this.activeIndex
      if (this.formType === 4 || this.formType === 5) {
        this.$refs.$refs.verifyCode.getVerifyCode()
      }
      this.$refs[formRef].validate((isValidate) => {
        if (isValidate) {
          if (_self.formType === 1) {
            _self.form.username = encrypt(_self.form.username.trim())
          }
          if (_self.formType === 5) {
            _self.form.password = encrypt(_self.form.password.trim())
            _self.changeUserPassword()
            return
          }
          this.isLoading = true
          updateUserInfo(this.form).then((data) => {
            this.$store.dispatch('user/setUserInfo', data)
            this.cancelChange();
            this.$message.success("更新成功")
          }).catch(() => {
            this.cancelChange();
            this.$message.error("更新失败")
          })
        }
      })
    },
    getStyle() {
      switch (this.formType) {
        case 1 || 2:
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
          validateVerifyCode(data).then(() => {
            this.activeIndex = this.activeIndex + 1
          }).catch(() => {
            this.isLoading = false
            this.$message.error("验证码错误")
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
      this.isLoading = true
      changePassword({password}).then(() => {
        this.cancelChange();
        this.$message.success("修改成功")
      }).catch(() => {
        this.cancelChange();
        this.$message.error("修改失败")
      })
    },
    uploadImage(file) {
      const form = new FormData();
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
      form.append("multipartFiles", file);
      this.isLoading = true
      uploadImage(form).then((data) => {
        this.imageUrl = data
        this.$store.state.user.userInfo.avatar = data
        this.isLoading = false
        this.$message.success("上传成功")
      }).catch(() => {
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
