<template>
  <div>
    <Column></Column>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <div class="fly-panel">
            <div class="fly-panel-title fly-filter">
              <a>置顶</a>
              <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin"
                 style="color: #FF5722;">去签到</a>
            </div>
            <ul class="fly-list">
              <li>
                <nuxt-link to="/user/home" class="fly-avatar" target="_blank">
                  <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
                </nuxt-link>
                <h2>
                  <a class="layui-badge">动态</a>
                  <nuxt-link to="/jie/detail" target="_blank">基于 layui 的极简社区页面模版</nuxt-link>
                  <!--                  <a href="jie/detail.vue"></a>-->
                </h2>
                <div class="fly-list-info">
                  <nuxt-link to="/user/home" target="_blank">
                    <cite>贤心</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i class="layui-badge fly-badge-vip">VIP3</i>
                  </nuxt-link>
                  <span>刚刚</span>
                  <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
                  <span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
                  <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> 66
              </span>
                </div>
                <div class="fly-list-badge">
                  <!--
                  <span class="layui-badge layui-bg-black">置顶</span>
                  <span class="layui-badge layui-bg-red">精帖</span>
                  -->
                </div>
              </li>
            </ul>
          </div>

          <div class="fly-panel" style="margin-bottom: 0;">

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

            <ul class="fly-list">
              <li>
                <nuxt-link to="/user/home" class="fly-avatar">
                  <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
                </nuxt-link>
                <h2>
                  <a class="layui-badge">分享</a>
                  <nuxt-link to="/jie/detail" target="_blank">基于 layui 的极简社区页面模版</nuxt-link>
                </h2>
                <div class="fly-list-info">\
                  <nuxt-link to="/user/home" target="_blank">
                    <cite>贤心</cite>
                    <!--
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i class="layui-badge fly-badge-vip">VIP3</i>
                    -->
                  </nuxt-link>
                  <!--                  <a href="user/home.html" link>-->
                  <!--                    -->
                  <!--                  </a>-->
                  <span>刚刚</span>

                  <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
                  <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
                  <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> 66
              </span>
                </div>
                <div class="fly-list-badge">
                  <!--<span class="layui-badge layui-bg-red">精帖</span>-->
                </div>
              </li>
            </ul>
            <div style="text-align: center">
              <div class="laypage-main">
                <nuxt-link to="/" class="laypage-next">更多求解</nuxt-link>
                <!--                <a href="jie/index.html" class="laypage-next">更多求解</a>-->
              </div>
            </div>

          </div>
        </div>
        <div class="layui-col-md4">

          <div class="fly-panel">
            <h3 class="fly-panel-title">温馨通道</h3>
            <ul class="fly-panel-main fly-list-static">
              <li>
                <a href="http://fly.layui.com/jie/4281/" target="_blank">layui 的 GitHub 及 Gitee (码云) 仓库，欢迎Star</a>
              </li>
              <li>
                <a href="http://fly.layui.com/jie/5366/" target="_blank">
                  layui 常见问题的处理和实用干货集锦
                </a>
              </li>
              <li>
                <a href="http://fly.layui.com/jie/4281/" target="_blank">layui 的 GitHub 及 Gitee (码云) 仓库，欢迎Star</a>
              </li>
              <li>
                <a href="http://fly.layui.com/jie/5366/" target="_blank">
                  layui 常见问题的处理和实用干货集锦
                </a>
              </li>
              <li>
                <a href="http://fly.layui.com/jie/4281/" target="_blank">layui 的 GitHub 及 Gitee (码云) 仓库，欢迎Star</a>
              </li>
            </ul>
          </div>


          <div class="fly-panel fly-signin">
            <div class="fly-panel-title">
              签到
              <i class="fly-mid"></i>
              <a href="javascript:;" class="fly-link" id="LAY_signinHelp">说明</a>
              <i class="fly-mid"></i>
              <a href="javascript:;" class="fly-link" id="LAY_signinTop">活跃榜<span class="layui-badge-dot"></span></a>
              <span class="fly-signin-days">已连续签到<cite>16</cite>天</span>
            </div>
            <div class="fly-panel-main fly-signin-main">
              <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
              <span>可获得<cite>5</cite>飞吻</span>

              <!-- 已签到状态 -->
              <!--
              <button class="layui-btn layui-btn-disabled">今日已签到</button>
              <span>获得了<cite>20</cite>飞吻</span>
              -->
            </div>
          </div>

          <div class="fly-panel fly-rank fly-rank-reply" id="LAY_replyRank">
            <h3 class="fly-panel-title">回贴周榜</h3>
            <dl>
              <!--<i class="layui-icon fly-loading">&#xe63d;</i>-->
              <dd>
                <nuxt-link to="/user/home" target="_blank">
                  <img
                    src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
                    alt=""><cite>贤心</cite><i>106次回答</i>
                </nuxt-link>
              </dd>
            </dl>
          </div>
          <dl>
            <Broadside></Broadside>
          </dl>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Column from "@/components/column";
import Broadside from "@/components/Broadside";

export default {
  components: {Column, Broadside},
  // components: {Column},
  head() {

  },
  data() {
    return {
      keyword: 'home'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log("获取主页数据")
    }
  }
}
</script>

