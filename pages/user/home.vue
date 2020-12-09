<template>
  <div>
    <particles></particles>
    <div id="wrapper">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-card class="fly-home fly-panel myHome">
            <el-avatar shape="circle" :size="100" fit="cover" :src="userInfo.avatar"></el-avatar>
            <i class="iconfont icon-renzheng" title="Fly社区认证"></i>
            <h1>
              {{ userInfo.nickName }}
              <i class="iconfont icon-nan"></i>
              <!-- <i class="iconfont icon-nv"></i>  -->
              <!--
              <span style="color:#c00;">（管理员）</span>
              <span style="color:#5FB878;">（社区之光）</span>
              <span>（该号已被封）</span>
              -->
            </h1>
            <p class="fly-home-info">
              <i class="iconfont icon-shijian"></i><span>{{ userInfo.createTime }} 加入</span>
            </p>

            <p class="fly-home-sign">{{ userInfo.sign }}</p>

            <div class="fly-sns" data-user="">
              <a href="javascript:;" class="layui-btn layui-btn-primary fly-imActive" data-type="addFriend">加为好友</a>
              <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="padding-top: 20px">
        <el-col :span="9" :offset="2">
          <el-card>
            <div class="fly-panel">
              <h3 class="fly-panel-title">{{ userInfo.nickName }} 最近发的帖子</h3>
              <ul class="jie-row">
                <li v-for="item in myPost" :key="item.id">
                  <span v-show="item.essence" class="fly-jing">精</span>
                  <nuxt-link target="_blank" :to="'/jie/detail?postId=' + item.id">{{ item.title }}</nuxt-link>
                  <i>{{ item.createTime | parseDate }}</i>
                  <em class="layui-hide-xs">{{ item.viewCount }}阅/{{ item.commentCount }}答</em>
                </li>
                <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div> -->
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-card>
            <div class="fly-panel">
              <h3 class="fly-panel-title">{{ userInfo.nickName }} 最近的收藏</h3>
              <ul class="home-jieda">
                <li v-for="item in myFavorites" :key="item.id">
                  <span v-show="item.essence" class="fly-jing">精</span>
                  <nuxt-link target="_blank" :to="'/jie/detail?postId=' + item.id">{{ item.title }}</nuxt-link>
                  <i>{{ item.createTime | parseDate }}</i>
                  <em class="layui-hide-xs">{{ item.viewCount }}阅/{{ item.commentCount }}答</em>
                </li>
                <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div> -->
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Particles from "../../components/Particles";
import {getInfo} from "../../api/user";
import {getByUserId, getUserFavorites} from "../../api/post";
import {formatTime} from "../../utils";

export default {
  components: {Particles},
  head() {
    return {
      title: '用户主页',
      link: [
        {rel: 'stylesheet', href: '/css/custom.css'},
      ]
    }
  },
  data() {
    return {
      userInfo: {},
      myPost: [],
      myFavorites: [],
    }
  },
  created() {
    const userId = this.$route.query.userId
    getInfo(userId).then((data) => {
      this.userInfo = data
    }).catch(() => {
      this.$message.error('出错啦,获取失败');
    })
    getByUserId(userId).then((data) => {
      this.myPost = data
    }).catch(() => {
      this.$message.error('出错啦,获取该用户发的帖子失败')
    })
    getUserFavorites(userId).then((data) => {
      this.myFavorites = data
    }).catch(() => {
      this.$message.error('出错啦,获取用户收藏的帖子失败')
    })
  },
  filters: {
    parseDate: function (val) {
      let date = new Date(Date.parse(val.replace(/-/g, "/")));
      return formatTime(date, null);
    },
  }
}
</script>

<style scoped>
.myHome {
  background-image: url("https://usms-news-pic.oss-cn-beijing.aliyuncs.com/images/2020/05/27/15905787747671265605228987219970.jpg");
  opacity: 0.7;
  background-size: cover
}

</style>
