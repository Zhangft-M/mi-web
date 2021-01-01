<template>
<div style="margin: 20px;padding-left: 20px">
  <el-row class="user-row animate__animated animate__bounceInDown">
    <el-col :offset="10" :span="10">
      <el-tooltip class="item" effect="dark" content="点击更换头像" placement="top">
        <el-link :underline="false" @click="openDialog(0)" alt="点击更换头像">
          <el-avatar :src="userInfo.avatar" alt="点击修改头像" :size="100" @click="openDialog(0)"></el-avatar>
        </el-link>
      </el-tooltip>
    </el-col>

  </el-row>
  <el-row class="user-row animate__animated animate__backInLeft">
    <el-col :offset="6" :span="1" style="margin-top: 7px">
      <p class="label-font">用户名:</p>
    </el-col>
    <el-col :offset="0" :span="9">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-input disabled  v-model="userInfo.username" class="user-input">
            <i slot="prefix" class="el-input__icon fa fa-user-o" style="padding-left: 5px"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <a href="javascript:void(0)" class="hvr-icon-bob"><i class="el-input__icon el-icon-edit hvr-icon" @click="openDialog(1)"></i></a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row class="user-row animate__animated animate__backInRight">
    <el-col :offset="6" :span="1" style="margin-top: 7px">
      <p class="label-font">昵称:</p>
    </el-col>
    <el-col :offset="0" :span="9">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-input disabled  v-model="userInfo.nickName" class="user-input">
            <i slot="prefix" class="el-input__icon fa fa-circle" style="padding-left: 5px"></i>
          </el-input>
        </el-col>
        <el-col :span="1">
          <a href="javascript:void(0)" class="hvr-icon-bob"><i class="el-input__icon fa fa-pencil-square hvr-icon" @click="openDialog(2)"></i></a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="user-row animate__animated animate__backInLeft">
    <el-col :offset="6" :span="1" style="margin-top: 7px">
      <p class="label-font">性别:</p>
    </el-col>
    <el-col :offset="0.5" :span="9">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-radio-group v-model="userInfo.gender" disabled style="padding-left: 10px">
            <el-radio :label= "1"  border>
              <i class="fa fa-mars"></i>
            </el-radio>
            <el-radio :label="0" border>
              <i class="fa fa-venus"></i>
            </el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="1">
          <a href="javascript:void(0)" class="hvr-icon-bob"><i class="el-input__icon fa fa-pencil-square hvr-icon" @click="openDialog(7)"></i></a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="user-row animate__animated animate__backInRight">
    <el-col :offset="6" :span="1" style="margin-top: 7px">
      <p class="label-font">手机号:</p>
    </el-col>
    <el-col :offset="0" :span="9">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-input  v-model="userInfo.phoneNumber" class="user-input" disabled>
            <i slot="prefix" class="el-input__icon fa fa-mobile" style="padding-left: 5px"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <a href="javascript:void(0)" class="hvr-icon-hang"><i class="el-input__icon fa fa-pencil hvr-icon" @click="openDialog(3)"></i></a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="user-row animate__animated animate__backInLeft">
    <el-col :offset="6" :span="1" style="margin-top: 7px">
      <p class="label-font">邮箱:</p>
    </el-col>
    <el-col :offset="0" :span="9">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-input disabled  v-model="userInfo.email" class="user-input">
            <i slot="prefix" class="el-input__icon fa fa-envelope-o" style="padding-left: 5px"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <a href="javascript:void(0)" class="hvr-icon-bob"><i class="el-input__icon fa fa-pencil-square-o hvr-icon" @click="openDialog(4)"></i></a>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row class="user-row animate__animated animate__backInUp">
    <el-col :offset="8" :span="0.5" style="margin-top: 7px">
      <el-button type="primary" @click="openDialog(5)">修改密码</el-button>
    </el-col>
    <el-col :offset="0" :span="10" style="margin-left: 150px;margin-top: 7px">
      <el-tooltip class="item" effect="dark" content="开发中,暂不可以使用" placement="right-start">
        <el-button disabled type="danger" @click="">注销账号</el-button>
      </el-tooltip>
    </el-col>
  </el-row>
  <div>
    <DialogForm :personal-phone="userInfo.phoneNumber" @syncUserInfo="syncUserInfo" :dialogVisible = 'dialogVisible' :formType = 'formType' @cancelChange="cancelChange"></DialogForm>
  </div>
</div>
</template>

<script>
import DialogForm from "../../components/DialogForm";
import {getToken} from "../../utils/auth";
import userInfoMixin from "../../components/mixin/userInfoMixin";
import {getInfoWithNoId} from "../../api/user";

export default {
  components: {DialogForm},
  mixins:[userInfoMixin],
  layout:'userLayout',
  head() {
    return {
      title: '账号设置'
    }
  },
  data(){
    return{
      val:'',
      dialogVisible: false,
      formType : -1
    }
  },
  mounted() {
    if (getToken() == null) {
      this.$router.push('/login')
    }
    getInfoWithNoId().then((data)=>{
      this.userInfo = data
    })
  },
  methods:{
    openDialog(formType){
      console.log(formType)
      this.formType = formType
      this.dialogVisible = true
    },
    cancelChange(){
      this.formType = -1
      this.dialogVisible = false
    },
    syncUserInfo(userInfo){
      this.userInfo = userInfo
    }
  }


}
</script>

<style>
.label-font{
  font-family: "Barlow Condensed Light";
  font-size: 15px;
}
.user-input input.el-input__inner{
  border-radius: 10px;
  margin-left: 10px;
  opacity: 0.75;
  background-color: #282C35;
  font-family: "Arial Black";
}
.user-row{
  padding: 10px;
}
/*解决dialog出现页面抖动情况*/
body{
  padding-right: 0 !important;
  overflow-x: hidden;
}
</style>

<style>

</style>
