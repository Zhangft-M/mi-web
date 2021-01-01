<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <!--<div class="fly-none">没有权限</div>-->
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div class="layui-input-block" style="padding-left: 5px">
                      <el-select v-model="postData.categoryId" placeholder="请选择">
                        <el-option
                          v-for="item in categoryOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                    <el-input placeholder="请输入内容" v-model="postData.title">
                      <template slot="prepend">标题</template>
                    </el-input>
                  </div>
                </div>
                <div class="layui-form-item layui-form-text">
                  <div class="layui-input-block">
                    <TinyEditor ref="editor"></TinyEditor>
                  </div>
                </div>
                <div v-show="postData.categoryId === '1'">
                  <label class="layui-form-label">悬赏积分</label>
                  <el-input-number style="padding-left: 10px" v-model="postData.point" @change="handleChange" :min="0"
                                   :max="100" label="描述文字"></el-input-number>
                </div>
                <div v-show="postData.categoryId === '2'">
                  <label class="layui-form-label">阅读积分</label>
                  <el-input-number style="padding-left: 10px" v-model="postData.point" @change="handleChange" :min="0"
                                   :max="100" label="描述文字"></el-input-number>
                </div>
                <div style="padding-top: 10px" v-show="showEmailReplyOptions">
                  <label class="layui-form-label" style="text-overflow: inherit">接收回复邮件:</label>
                  <el-radio-group style="padding-left: 10px" v-model="postData.receiveReply">
                    <el-radio :label="1" border>是</el-radio>
                    <el-radio :label="0" border>否</el-radio>
                  </el-radio-group>
                </div>
                <div style="padding-top: 10px">
                  <Verify @getVerifyData="getVerifyData" ref="verify"></Verify>
                </div>
                <div class="layui-form-item" style="float: right">
                  <el-button :disabled="isDisable"
                             @click="submit">立即发布
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TinyEditor from "../../components/editor/TinyEditor";
import Verify from "../../components/Verify";
import {getCategory} from "../../utils/sessionUtils";
import {addPost} from "../../api/post";
import fullScreenLoadingMixin from "../../components/mixin/fullScreenLoadingMixin";
import {confirmAlert, mixinAlert, mixinToast} from "../../components/sweetalert/mixinSweetalert";
import showEmailReplyMixin from "../../components/mixin/showEmailReplyMixin";
import {getToken} from "../../utils/auth";
import userInfoMixin from "../../components/mixin/userInfoMixin";

export default {
  components: {TinyEditor, Verify},
  mixins: [fullScreenLoadingMixin, showEmailReplyMixin,userInfoMixin],
  data() {
    return {
      isDisable: true,
      categoryOptions: [],
      value: '',
      verifyData: '',
      postData: {
        title: '',
        content: '',
        point: 0,
        categoryId: '',
        receiveReply: 0
      }
    }
  },
  mounted() {
    const token = getToken()
    if (token == null) {
      confirmAlert.fire({
        title: '不能访问',
        titleText: '未登录不能添加帖子,是否去登录'
      }).then((result)=>{
        if (result.isConfirmed) {
          this.$router.push('/login')
        }else {
          this.$router.go(-1)
        }
      })
    }
    getCategory().then((data) => {
      this.categoryOptions = data
      this.categoryOptions.shift()
    })
  },
  methods: {
    getVerifyData(payload) {
      console.log(payload)
      this.verifyData = payload;
      this.isDisable = false
      this.$message.success("验证成功,两分钟内有效")
    },
    handleChange() {
    },
    submit() {
      confirmAlert.fire({
        title: '提示',
        titleText: '确定提交吗?',
        icon: 'question',
      }).then((result) => {
          if (result.isConfirmed) {
            this.startLoading()
            if (this.postData.categoryId === '') {
              this.$message.error("请选择类别")
              this.stopLoading()
              return;
            }
            if (this.postData.title === '') {
              this.$message.error("请输入标题")
              this.stopLoading()
              return;
            }
            this.postData.content = this.$refs.editor.getContent()
            // console.log(this.postData.content)
            if (this.postData.content === '') {
              this.$message.error("请输入正文内容")
              this.stopLoading()
              return
            }
            const data = {
              verifyData: this.verifyData,
              postData: this.postData
            }
            // this.fullscreenLoading = true
            addPost(data).then(() => {
              mixinAlert.fire({
                title: '成功',
                titleText: '添加成功',
                icon: 'success',
                timer: 1000
              }).then(() => {

              })
              // this.$message.success("添加成功")
              // this.fullscreenLoading = false
              if (data.point > 0) {
                this.resetUserInfo()
              }
            }).catch(() => {
              this.$message.error("添加失败")
              // this.fullscreenLoading = false
            }).finally(() => {
              this.stopLoading()
            })
          }
        }
      ).catch(() => {
        mixinToast.fire({
          title: '错误',
          icon: 'error',
          titleText: '提交错误'
        })
      })
    }

  }
}
</script>

<style scoped>

</style>
