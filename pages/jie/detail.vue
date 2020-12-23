<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
          <el-card>
            <div class="fly-panel detail-box">
              <h1>{{ postDetails.title }}</h1>
              <div class="fly-detail-info">
                <el-tag v-show="postDetails.recommend" type="success" effect="dark" color="greed">推荐</el-tag>
                <el-tag v-show="postDetails.top" type="info" effect="dark">置顶</el-tag>
                <el-tag v-show="postDetails.essence" type="warning" effect="dark">精华</el-tag>
                <span class="fly-list-nums">
                  <a href="javascript:void(0)" @click="addCollectPost(postDetails)">
                            <i class="fa"
                               :class="userCollectionPosts.indexOf(postDetails.id) > -1 ? 'fa-star': 'fa-star-o'"
                              :style="userCollectionPosts.indexOf(postDetails.id) > -1 ? {color: '#FFB800'} : ''"></i>
                    </a>
                    <a href="javascript:void(0)" type="zan" @click="thumbUp(postDetails)">
                            <i class="fa"
                               :class="thumbUpList.indexOf(postDetails.id) > -1 ? ' fa-thumbs-up thumb-up-color': 'fa-thumbs-o-up'"
                                :style="thumbUpList.indexOf(postDetails.id) > -1 ? {color: '#5FB878'} : ''"></i>
                            <em>{{ postDetails.voteUp }}</em>
                    </a>
                    <a href="javascript:void(0)"><i class="iconfont" title="回答">&#xe60c;</i>{{ postDetails.commentCount }}</a>
                    <i class="iconfont" title="浏览量">&#xe60b;</i> {{ postDetails.viewCount }}
                  </span>
              </div>
              <div class="detail-about">
                <nuxt-link :to="'/user/home?userId=' + postDetails.userId" class="fly-avatar" target="_blank">
                  <el-avatar size="large"
                             :src="postDetails.userAvatar"
                             :alt="postDetails.userNickName"></el-avatar>
                </nuxt-link>
                <div class="fly-detail-user">
                  <nuxt-link :to="'/user/home?userId=' + postDetails.userId" target="_blank" class="fly-link">
                    <cite>{{ postDetails.userNickName }}</cite>
                  </nuxt-link>
                  <span>{{ postDetails.updateTime }}</span>
                </div>
                <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
                  <span style="padding-right: 10px; color: #FF7200">悬赏：{{ postDetails.point }}积分</span>
                </div>
              </div>
              <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
              <div class="detail-body photos">
                <p class="text-content" v-html="postDetails.content"></p>
              </div>
            </div>
          </el-card>
          <el-card style="margin-top: 20px">
            <div class="fly-panel detail-box" id="flyReply">
              <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
                <legend>回帖</legend>
              </fieldset>
            </div>
            <el-card style="margin-top: 20px" v-for="comment in commentData" :key="comment.id">
              <div>
                <ul class="jieda" id="jieda">
                  <li data-id="111" class="jieda-daan">
                    <a name="item-1111111111"></a>
                    <div class="detail-about detail-about-reply">
                      <nuxt-link to="/user/home" class="fly-avatar" target="_blank">
                        <el-avatar size="large"
                                   :src="comment.userAvatar"
                                   :alt="comment.userNickName"></el-avatar>
                      </nuxt-link>
                      <div class="fly-detail-user">
                        <a href="javascript:void(0)" class="fly-link">
                          <cite>{{ comment.userNickName }}</cite>
                        </a>
                        <span v-show="comment.userId === postDetails.userId">(作者)</span>
                      </div>

                      <div class="detail-hits">
                        <span>{{ comment.updateTime }}</span>
                      </div>

                      <i v-show="comment.hasAdoption" class="iconfont icon-caina" title="最佳答案"></i>
                    </div>
                    <div class="detail-body jieda-body photos">
                      <p>
                        <span v-html="comment.content"></span>
                      </p>
                    </div>
                    <div class="jieda-reply">
                    <span class="jieda-zan zanok" type="zan">
                        <a href="javascript:void(0)" @click="thumbUp(comment)">
                            <i class="fa"
                               :class="thumbUpList.indexOf(comment.id) > -1 ? 'fa-thumbs-up thumb-up-color': 'fa-thumbs-o-up'"></i>
                            <em>{{ comment.voteUp }}</em>
                    </a>
                    </span>
                      <span>
                      <i class="fa fa-commenting-o"><el-link :underline="false" @click="showReplyDialog(comment,null)">回复</el-link></i>
                    </span>
                      <div class="jieda-admin">
                        <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                        <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                      </div>
                    </div>
                  </li>
                  <el-divider>
                    <el-link :underline="false" @click="showReply(comment.id)">
                      {{ showReplayList.indexOf(comment.id) > -1 ? '隐藏' : '显示' }}
                    </el-link>
                  </el-divider>
                  <ul v-show="showReplayList.indexOf(comment.id) > -1" class="animate__animated animate__slideInDown">
                    <li style="margin-top: 5px" v-for="child in comment.children">
                      <div>
                        <a href="javascript:void(0)" style="float: right" type="zan" @click="thumbUp(child)">
                          <i class="fa"
                             :class="thumbUpList.indexOf(child.id) > -1 ? 'fa-thumbs-up thumb-up-color': 'fa-thumbs-o-up'"></i>
                          <em>{{ child.voteUp }}</em>
                        </a>
                        <el-tag effect="plain" type="info" size="mini"><span
                          style="color: chartreuse">{{ child.username }}</span><span
                          v-show="child.parentId === comment.id">(楼主)</span></el-tag>&nbsp;<span
                        style="color: #FFB800">回复</span>&nbsp;<el-tag effect="plain" type="info" size="mini"><span
                        style="color: #eb7350">{{
                          child.parentNickName === null ? '' : child.parentNickName
                        }}</span><span v-show="child.parentId === comment.id">(楼主)</span></el-tag>&nbsp;:&nbsp;<el-link
                        @click="showReplyDialog(child,comment)"
                        :underline="false" style="margin-top: 5px"><p
                        class="text-content">{{ child.content }}</p></el-link>
                      </div>
                    </li>
                  </ul>
                  <!-- 无数据时 -->
                  <!-- <li class="fly-none">消灭零回复</li> -->
                </ul>
              </div>
            </el-card>
            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            <el-card>
              <div class="layui-form layui-form-pane">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="text">
                </el-input>
                <el-button :disabled="text.length<=0" style="float: right;margin-top: 10px" @click="submit()">提交
                </el-button>
              </div>
            </el-card>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog :title="'回复'+ replyData.toUserNickName" :visible.sync="isShowReplyDialog"
               @close="isShowReplyDialog = false">
      <div style="height: 90px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          :placeholder="'@'+replyData.toUserNickName + ':'"
          v-model="replyData.content">
        </el-input>
        <el-button style="float: right;margin-top: 10px" size="mini" @click="submitReply()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getDataById} from "../../api/post";
import {addComment, getCommentDataByPostId} from "../../api/comment";
import {getThumbUpList, thumbUp} from "../../api/thumbUp";
import {getToken} from "../../utils/auth";
import {addUserCollections, getUserCollections} from "../../api/userCollections";

const defaultReplyData = {
  content: '',
  parentId: '',
  toUserNickName: '',
  postId: ''
}
export default {
  data() {
    return {
      text: '',
      isThumbUp: false,
      showReplayList: [],
      thumbUpList: [],
      userCollectionPosts: [],
      isShow: false,
      postDetails: {},
      commentData: [],
      isShowReplyDialog: false,
      chooseData: null, // 当前评论的数据节点
      replyData: {
        content: '',
        toUserNickName: '',
        parentId: '',
        postId: '',
      }
    }
  },
  created() {
    this.initData()
    getThumbUpList().then((data)=>{
      this.thumbUpList = data
    })
    getUserCollections().then((data) => {
      this.userCollectionPosts = data
    })
  },
  methods: {
    async initData() {
      const postId = this.$route.query.postId;
      if (postId === null || postId === '') {
        await this.$router.push('other/404')
      }
      await getDataById(postId).then((res) => {
        this.postDetails = res
        getCommentDataByPostId(postId).then((res) => {
          this.commentData = res
        }).catch(() => {
          // 评论加载失败
        })
      }).catch(() => {
        // 数据详情加载失败,路由到404页面
      })
    },
    showReply(val) {
      // this.isShow = !this.isShow
      if (this.showReplayList.indexOf(val) > -1) {
        const index = this.showReplayList.indexOf(val)
        this.showReplayList.splice(index, 1)
      } else {
        this.showReplayList.push(val)
      }
    },
    thumbUp(data) {
      if (getToken() == null) {
        // 未登录,跳转到登录页
        this.toLogin()
        return
      }
      // console.log("点赞的对象")
      // console.log(data)
      // this.isThumbUp = !this.isThumbUp
      const thumbUpData = {
        userId: null,
        contentId: data.id
      }
      if (this.thumbUpList.indexOf(data.id) > -1) {
        // this.isThumbUp = false
        // this.thumbUpList.splice(this.thumbUpList.indexOf(data.id), 1);
        thumbUpData.type = -1
        thumbUp(thumbUpData).then(() => {
          // data.voteUp -= 1
          // 取消点赞
          data.voteUp -= 1
          const index = this.thumbUpList.indexOf(data)
          this.thumbUpList.splice(index, 1)
        })
      } else {
        // 点赞
        // this.isThumbUp = true
        // this.thumbUpList.push(data.id)
        thumbUpData.type = 1
        thumbUp(thumbUpData).then(() => {
          data.voteUp += 1
          this.thumbUpList.push(data.id);
        })
      }
    },
    async addCollectPost(post){
      let type = 1;
      if (this.userCollectionPosts.indexOf(post.id) > -1) {
        type = 0
      }
      const data = {
        postId: post.id,
        type: type
      }
      await addUserCollections(data).then(()=>{
        if (type === 1) {
          this.userCollectionPosts.push(data.postId)
          this.$message.success("收藏成功")
        }else if (type === 0) {
          this.$message.success("取消收藏成功")
          const index = this.userCollectionPosts.indexOf(data.id)
          this.userCollectionPosts.splice(index,1)
        }
      }).catch(()=>{
        this.$message.error(`${type === 0 ? "取消" : ""} 收藏成功`)
        })

    },
    submit() {
      // const _this = this
      if (getToken() == null) {
        // 未登录,跳转到登录页
        this.toLogin()
        return
      }
      const commentData = {
        content: this.text,
        postId: this.postDetails.id,
      }
      addComment(commentData).then((data) => {
        // 添加成功
        this.commentData.push(data)
      }).catch(() => {
        // 添加失败
      }).finally(() => {
        this.text = ''
      })
    },
    // 打开回复框
    showReplyDialog(data, parentData) {
      if (getToken() == null) {
        // 未登录,跳转到登录页
        this.toLogin()
        return
      }
      this.chooseData = parentData == null ? data : parentData
      this.isShowReplyDialog = true
      // todo: 之后需要改为昵称nickName
      this.replyData.toUserNickName = data.userNickName
      this.replyData.parentId = data.id
      this.replyData.postId = this.postDetails.id
    },
    submitReply() {
      if (getToken() == null) {
        // 未登录,跳转到登录页
        this.toLogin()
        return
      }
      addComment(this.replyData).then((data) => {
        const index = this.commentData.indexOf(this.chooseData)
        this.commentData[index].children.push(data)
      }).catch(() => {
        this.$message.error("添加失败")
      }).finally(() => {
        Object.assign(this.replyData, defaultReplyData)
        this.isShowReplyDialog = false
        this.chooseData = null
      })

    },
    toLogin() {
      this.$confirm('未登录,是否去登录?').then(() => {
        this.$router.push('/login')
      }).catch(() => {

      })
    }

  }
}
</script>

<style scoped>
.text-content {
  font-size: 15px;
  font-family: 华文行楷, serif;
  color: rgba(2, 4, 10, 0.59);
  text-indent: 2em;
}

.thumb-up-color {
  color: #5FB878;
}
.favorite-color {
  color: #FFB800;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: #8FCDA0;
}

html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
  display: block;
  vertical-align: bottom;
}


</style>
