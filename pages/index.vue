<template>
  <div style="background: #92B8B1">
    <div class="layui-container">
      <Column></Column>
      <div class="layui-row layui-col-space12" style="padding-left: 20px">
        <div class="layui-col-md6" v-for="postItem in postItems" :key="postItem.categoryId">
          <el-card class="hvr-bob">
            <div slot="header" class="clearfix">
              <span style="font-family: 幼圆,serif;color: #5FB878"><i class="fa fa-bullseye"></i>&nbsp;卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <div class="content-card" style="width: 500px">
              <ul class="fly-list">
                <div v-for="postData in postItem.postDatas" :key="postData.id" class="content-card hvr-grow-shadow">
                  <el-card class="box-card animate__animated animate__lightSpeedInLeft hvr-curl-top-right"
                           shadow="hover">
                    <li style="width: 340px">
                      <nuxt-link to="/user/home" class="fly-avatar" target="_blank">
                        <el-avatar size="large"
                                   src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                                   alt="贤心"></el-avatar>
                      </nuxt-link>
                      <h2>
                        <a class="layui-badge">动态</a>
                        <nuxt-link to="/jie/detail" target="_blank">
                        <span class="title-font">
                          {{ postData.title }}
                        </span>
                        </nuxt-link>
                        <!--                  <a href="jie/detail.vue"></a>-->
                      </h2>
                      <div class="fly-list-info">
                        <nuxt-link to="/user/home" target="_blank">
                          <cite>贤心</cite>
                          <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                          <i class="layui-badge fly-badge-vip">VIP3</i>
                        </nuxt-link>
                        <span>刚刚</span>
                        <span class="fly-list-kiss layui-hide-xs" title="悬赏积分"><i class="fa fa-diamond"></i> 60</span>
                        <span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
                        <span class="fly-list-nums">
                          <i class="fa fa-commenting"></i> 66
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
</template>
<script>
import {getRecommendData} from "@/api/post";
import Broadside from "../components/Broadside";
import Column from "../components/column";

export default {
  components: {Column, Broadside},
  // components: {Column},
  head() {

  },
  data() {
    return {
      keyword: 'home',
      bgColor: '#92B8B1',
      category: [],
      postItems: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // console.log("调用接口获取数据")
      // this.$message.info("测试",)
      getRecommendData().then((res) => {
        console.log(res)
        this.postItems = res
      }).catch(() => {

      })
      console.log("获取主页数据")
    }
  }
}
</script>

<style>
.content-card {
  padding-top: 10px;
  padding-bottom: 10px;

}

.title-font {
  font-family: 清松手写体2, fantasy;
  font-size: 20px;
}
</style>

