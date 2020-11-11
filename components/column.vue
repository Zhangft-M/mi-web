<template>
  <div style="padding-top: 10px;padding-bottom: 30px">
    <div class="fly-panel fly-column" style="background: #92B8B1">
      <div class="layui-container">
        <el-card style="height: 80px">
          <ul class="layui-clear">
            <!--          layui-this为已选中状态-->
            <nuxt-link to="/" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-pulse-grow"><i class="fa fa-home hvr-icon"></i>&nbsp;首页</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=question" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-grow-rotate"><i class="fa fa-question-circle-o hvr-icon"></i>&nbsp;提问</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=share" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-buzz"><i class="fa fa-share-alt-square hvr-icon"></i>&nbsp;分享</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=discuss" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-float-away"><i class="fa fa-road hvr-icon"></i>&nbsp;讨论</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=suggestion" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-bob"><i class="fa fa-compass hvr-icon"></i>&nbsp;建议</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=notice" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-bounce"><i class="fa fa-bullhorn hvr-icon"></i>&nbsp;公告</a>
            </nuxt-link>
            <nuxt-link to="/jie?keyword=dynamic" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-pulse"><i class="fa fa-bookmark hvr-icon"></i>&nbsp;动态</a>
            </nuxt-link>
<!--            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>-->

            <!-- 用户登入后显示 -->
            <nuxt-link to="/user"></nuxt-link>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <nuxt-link to="/user">我发表的帖</nuxt-link>
            </li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <nuxt-link to="/user/index#collection">我收藏的贴</nuxt-link>
            </li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block fly-right">
              <nuxt-link to="/user/index#collection">我收藏的贴</nuxt-link>
            </li>
          </ul>
          <div class="layui-hide-sm layui-show-xs-block"
               style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
            <nuxt-link to="/jie/add">发表新帖</nuxt-link>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Column",
  data() {
    return {
    }
  }
}
</script>

<style>
.nav-font{
  font-family: 清松手写体2,serif;
  font-size: 20px;
}
</style>
