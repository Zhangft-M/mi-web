<template>
  <div>
    <div class="layui-container">
      <Column></Column>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="fly-panel-title fly-filter">
            <a href="" class="layui-this">综合</a>
            <span class="fly-mid"></span>
            <a href="">未结</a>
            <span class="fly-mid"></span>
            <a href="">已结</a>
            <span class="fly-mid"></span>
            <a href="">精华</a>
            <span class="fly-filter-right layui-hide-xs">
              <a href="" class="layui-this">按最新</a>
              <span class="fly-mid"></span>
              <a href="">按热议</a>
            </span>
          </div>
        </div>
        <div class="layui-row layui-col-space15">
          <!--<div class="layui-col-md6 content-card hvr-grow-shadow" v-for="postItem in 3" :key="postItem">
            <el-card class="box-card animate__animated animate__lightSpeedInLeft"
                     shadow="hover">
              <ul class="fly-list">
                <li>
                  <nuxt-link to="/user/home" class="fly-avatar" target="_blank">
                    <el-avatar size="large"
                               src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                               alt="贤心"></el-avatar>
                  </nuxt-link>
                  <h2>
                    <a class="layui-badge">分享</a>
                    <nuxt-link to="/jie/detail" target="_blank">
                        <span class="title-font">
                          测试测试测试测试测试测试测测 测试测试测试测试测试测试测测
                        </span>
                    </nuxt-link>
                    &lt;!&ndash;                  <a href="jie/detail.vue"></a>&ndash;&gt;
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
                    <span class="layui-badge layui-bg-black">置顶</span>
                    &lt;!&ndash;<span class="layui-badge layui-bg-red">精帖</span>&ndash;&gt;
                  </div>
                </li>
              </ul>
            </el-card>

          </div>-->
          <div class="layui-col-md6 content-card hvr-grow-shadow card-margin" v-for="postItem in 20" :key="postItem">
            <el-card class="box-card animate__animated animate__lightSpeedInLeft hvr-curl-top-right"
                     shadow="hover">
              <div class="layui-row">
                <div class="layui-col-md2">
                  <nuxt-link to="/user/home" class="fly-avatar" target="_blank">
                    <el-avatar size="large"
                               src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                               alt="贤心"></el-avatar>
                  </nuxt-link>
                </div>
                <div class="layui-col-md10 layui-col-md-offset2">
                  <div class="layui-row">
                    <div class="layui-col-md12">
                      <h2>
                        <a class="layui-badge">分享</a>
                        <nuxt-link to="/jie/detail" target="_blank">
                        <span class="title-font text-title">
                          {{' 测试测试测试测试测试测试测测 测试测试测试测试测试测试测测'| hideTitle()}}
                        </span>
                        </nuxt-link>
                        <!--                  <a href="jie/detail.vue"></a>-->
                      </h2>
                    </div>
                    <div class="layui-col-md12">
                      <p>
                        {{'该模版由 layui官方社区倾情提供，只为表明我们对 layui执着的信念、以及对未来持续加强的承诺。' +
                        '该模版基于 layui 搭建而成，可作为极简通用型社区的页面支撑该模版由 layui官方社区倾情提供，只为表'+
                        '明我们对 layui执着的信念、以及对未来持续加强的承诺。明我们对 layui执着的信念、以及对未来持续加强的承诺。' | hideText()}}
                      </p>
                    </div>
                    <div class="layui-col-md12">
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
                        <span class="layui-badge layui-bg-black">置顶</span>
                        <!--<span class="layui-badge layui-bg-red">精帖</span>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
      <!--<div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
          <div class="fly-panel" style="margin-bottom: 0;">
            <ul class="fly-list">
              <li>

              </li>
            </ul>

            &lt;!&ndash; <div class="fly-none">没有相关数据</div> &ndash;&gt;

            <div style="text-align: center">
              <div class="laypage-main"><span class="laypage-curr">1</span><a href="/jie/page/2/">2</a><a
                href="/jie/page/3/">3</a><a href="/jie/page/4/">4</a><a href="/jie/page/5/">5</a><span>…</span><a
                href="/jie/page/148/" class="laypage-last" title="尾页">尾页</a><a href="/jie/page/2/" class="laypage-next">下一页</a>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Column from "@/components/column";
import Broadside from "@/components/Broadside";

export default {
  components: {Column, Broadside},
  // components: {Column}
  data() {
    return {
      keyword: ''
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.keyword = newVal.query.keyword
        this.getData()
        console.log(this.keyword)
      },
      deep: true
    }
  },
  filters:{
    hideTitle: function (val) {
      console.log(val)
      const length = val.length;
      let result = val;
      if (length > 6){
        result = val.substr(0,6).concat('...')
      }
      return result
    },

    hideText: function (val) {
      const  length = val.length
      let  result = val
      if (length > 10){
        const  hasLength =Math.round(length * Math.random(1));
        console.log("haslength:"+ hasLength)
        result = val.substr(0,10 + hasLength).concat('...')
      }
      return result
    }


  },
  methods: {
    getData() {
      if (this.keyword === '') {
        this.getQueryParam()
      }
    },

    getQueryParam() {
      // console.log("第一次进入页面，获取查询参数")
      this.keyword = this.$route.query.keyword
      console.log(this.keyword)
    }
  }
}
</script>

<style scoped>
.card-margin{
  width: 500px;
  margin-right: 40px;
  /*margin-bottom: 0px;*/
  margin-left: 20px
}
</style>
