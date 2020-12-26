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
                      <el-input-number style="padding-left: 10px" v-model="postData.point" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                  </div>
                  <div v-show="postData.categoryId === '2'">
                    <label class="layui-form-label">阅读积分</label>
                    <el-input-number style="padding-left: 10px" v-model="postData.point" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                  </div>
                  <div style="padding-top: 10px">
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
                    <el-button :loading="isLoading" :disabled="isDisable" class="layui-btn" lay-filter="*" lay-submit @click="submit">立即发布</el-button>
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
export default {
  components: {TinyEditor,Verify},
  mixins: ['Verify'],
  data(){
    return{
      isDisable: true,
      categoryOptions: [],
      value: '',
      verifyData: '',
      isLoading:false,
      postData: {
        title: '',
        content: '',
        point: 0,
        categoryId: '',
        receiveReply: 1
      }
    }
  },
  mounted() {
    getCategory().then((data) => {
      this.categoryOptions = data
      this.categoryOptions.shift()
    })
  },
  methods:{
    getVerifyData(payload) {
      console.log(payload)
      this.verifyData = payload;
      this.isDisable = false
      this.$message.success("验证成功")
    },
    handleChange(){},
    submit(){
      if (this.postData.categoryId === ''){
        this.$message.error("请选择类别")
        return;
      }
      if (this.postData.title === '') {
        this.$message.error("请输入标题")
        return;
      }
      this.postData.content = this.$refs.editor.getContent()
      console.log(this.postData.content)
      if (this.postData.content === '') {
        this.$message.error("请输入正文内容")
        return
      }
      const data = {
        verifyData: this.verifyData,
        postData: this.postData
      }
      this.isLoading = true
      addPost(data).then(()=>{
        this.$message.success("添加成功")
        this.isLoading = false
      }).catch(()=>{
        this.$message.error("添加失败")
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
