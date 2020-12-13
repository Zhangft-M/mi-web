<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-dialog :visible="dialogVisible" :style="getStyle" @close="cancelChange" :close-on-click-modal="false" custom-class="custom-dialog">
      <el-row v-show="formType === 0" style="height: 50px">
        <el-col :offset="10">
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-form class="custom-form" :model="form" v-show="formType === 1" label-width="85px">
        <el-form-item label="新用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="custom-form" :model="form" v-show="formType === 2" label-width="80px">
        <el-form-item label="新昵称:">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div v-show="formType === 3">
        <el-form class="custom-form" :model="form" label-width="80px">
          <el-form-item label="新手机号">
            <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:">
            <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="formType === 4">
        <el-form class="custom-form" :model="form" label-width="80px">
          <el-form-item label="新邮箱:">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" label-width="">
            <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
          </el-form-item>
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
          <el-form class="custom-form" :model="form" label-width="80px">
            <el-form-item label="手机号:" label-width="">
              <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" label-width="">
              <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="activeIndex === 1" style="margin-top: 10px">
          <el-form class="custom-form" :model="form" label-width="80px">
            <el-form-item label="新密码:" label-width="">
              <el-input :type="showPassword ? 'text' : 'password'" v-model="form.password" autocomplete="off">
                <a slot="suffix" href="javascript:void(0)" @click="showPassword = !showPassword"><i :class="[showPassword ? 'fa fa-eye':'fa fa-eye-slash']"></i></a>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-row>
        <el-col :offset="8">
          <div>
            <el-button size="mini" @click="cancelChange" round>取 消</el-button>
            <el-button size="mini" v-show="activeIndex === 0 && formType === 5" @click="activeIndex = 1" round>下一步
            </el-button>
            <el-button size="mini" v-show="activeIndex !== 0 || formType !== 5" type="primary" @click="submit" round>确
              定
            </el-button>
          </div>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
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
      showPassword: false
    }
  },
  props: ['formType', 'dialogVisible'],
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    cancelChange() {
      this.$emit('cancelChange')
      Object.assign(this.form, defaultForm)
      this.activeIndex = 0
      this.imageUrl = ''
    },
    submit() {

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
  width: 400px;
  border-radius: 15px;
  opacity: 0.9;
  background-color: #87adbd;
}

.custom-form input.el-input__inner {
  border-radius: 15px;
  opacity: 0.75;
}
</style>
