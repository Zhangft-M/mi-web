<template>
  <div>
<!--    <ClickAnime></ClickAnime>-->
    <Header :is-search="false"></Header>
    <Particles></Particles>
    <div id="wrapper">
      <div class="layui-container">
        <Column ref="column"></Column>
        <div class="layui-row layui-col-space12" style="">
          <div class="layui-col-md6" v-for="postItem in postItems" :key="postItem.categoryId">
            <el-card class="hvr-bob">
              <div slot="header" class="clearfix">
                <span style="font-family: 幼圆,serif;color: #5FB878"><i
                  class="fa fa-bullseye"></i>&nbsp;{{ getCategoryName(postItem.categoryId) }}</span>
                <nuxt-link :to="'/jie?categoryId=' + postItem.categoryId" style="float: right; padding: 3px 0">
                  更多
                </nuxt-link>
              </div>
              <div class="content-card" style="width: 500px">
                <ul class="fly-list">
                  <div v-for="postData in postItem.postDatas" :key="postData.id" class="content-card hvr-grow-shadow">
                    <el-card class="box-card animate__animated animate__lightSpeedInLeft hvr-curl-top-right"
                             shadow="hover">
                      <li style="width: 340px">
                        <nuxt-link :to="'/user/home?userId=' + postData.userId" class="fly-avatar" target="_blank">
                          <el-avatar size="large"
                                     :src="postData.userAvatar"
                                     :alt="postData.userNickName"></el-avatar>
                        </nuxt-link>
                        <h2 style="padding-bottom: 15px">
                          <el-link class="layui-badge">动态</el-link>
                          <el-link type="text" @click="toDetail(postData)">
                        <span class="title-font">
                          {{ postData.title }}
                        </span>
                          </el-link>
                          <!--                  <a href="jie/detail.vue"></a>-->
                        </h2>
                        <div class="fly-list-info">
                          <nuxt-link to="/user/home" target="_blank">
                            <cite>{{ postData.userNickName }}</cite>
                            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                            <i class="layui-badge fly-badge-vip">VIP3</i>-->
                          </nuxt-link>
                          <span>{{ postData.updateTime | parseDate() }}</span>
                          <span class="fly-list-kiss layui-hide-xs" title="悬赏积分"><i
                            class="fa fa-diamond"></i> {{ postData.point }}</span>
                          <span v-show="postData.ending" class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
                          <span class="fly-list-nums">
                          <i class="fa fa-commenting"></i> {{ postData.commentCount }}
                        </span>
                        </div>
                        <div class="fly-list-badge">
                          <!--<span class="layui-badge layui-bg-black">置顶</span>
                          <span class="layui-badge layui-bg-red">精帖</span>-->
                        </div>
                      </li>
                    </el-card>
                  </div>
                </ul>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
    <music-player style="margin-bottom: 1px"></music-player>
<!--    <Aplayer></Aplayer>-->
  </div>
</template>
<script>
import {getRecommendData} from "../api/post";
import Broadside from "../components/layout/Broadside";
import Column from "../components/layout/column";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {formatTime} from "../utils"
import Particles from "../components/Particles";
import {getCategory} from "../utils/sessionUtils";
import postMixin from "../components/mixin/postMixin";
import MusicPlayer from "../components/MusicPlayer";
import ClickChangeColor from "@/components/ClickChangeColor";
import categoryMixin from "../components/mixin/categoryMixin";

export default {
  components: {Particles, Column, Footer, Header, Broadside,MusicPlayer},
  mixins: [postMixin],
  head() {
    return {
      title: '首页',
      link: [
        {rel: 'stylesheet', href: '/css/custom.css'},
      ],
    }
  },
  data() {
    return {
      categoryList: [],
      keyword: null,
      postItems: []
    }
  },
  mounted() {
    /*const categoryList = this.$store.state.category.categoryList
    if (categoryList.length === 0){
      this.$store.dispatch('category/setCategorise').then((data)=>{
        this.categoryList = data
      })
    }*/
    // this.getData()
    getCategory().then((data) => {
      this.categoryList = data
      this.getData()
    })

    // console.log(this.category)

  },
  filters: {
    parseDate: function (val) {
      let date = new Date(Date.parse(val.replace(/-/g, "/")));
      return formatTime(date, null);
    }
  },
  methods: {
    getData() {
      // console.log("调用接口获取数据")
      // this.$message.info("测试",)
      getRecommendData().then((res) => {
        // console.log(res)
        this.postItems = res
      }).catch(() => {

      })
      // console.log("获取主页数据")
    },
    getCategoryName(categoryId) {
      if (this.categoryList.length === 0) {
        getCategory().then((data) => {
          this.categoryList = data
        })
      }
      for (let i = 0; i < this.categoryList.length; i++) {
        if (categoryId === this.categoryList[i].id) {
          return this.categoryList[i].name
        }
      }
    },
    getKeyword(val) {
      this.keyword = val
    }
  }
}
</script>

<style scoped>
.content-card {
  padding-top: 10px;
  padding-bottom: 10px;

}

.title-font {
  font-family: 清松手写体2, fantasy;
  font-size: 20px;
  text-align: left;
}

html body {
}
</style>

