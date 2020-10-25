<template>
  <div>
    <div class="fly-panel fly-column">
      <div class="layui-container">
        <ul class="layui-clear">
          <!--          layui-this为已选中状态-->
          <nuxt-link to="/" active-class='layui-this' tag="li" exact>
            <a>首页</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=question" active-class='layui-this' tag="li" exact>
            <a>提问</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=share" active-class='layui-this' tag="li" exact>
            <a>分享</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=discuss" active-class='layui-this' tag="li" exact>
            <a>讨论</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=suggestion" active-class='layui-this' tag="li" exact>
            <a>建议</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=notice" active-class='layui-this' tag="li" exact>
            <a>公告</a>
          </nuxt-link>
          <nuxt-link to="/jie?keyword=dynamic" active-class='layui-this' tag="li" exact>
            <a>动态</a>
          </nuxt-link>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>

          <!-- 用户登入后显示 -->
          <nuxt-link to="/user"></nuxt-link>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <nuxt-link to="/user">我发表的帖</nuxt-link>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <nuxt-link to="/user/index#collection">我收藏的贴</nuxt-link>
          </li>
        </ul>

        <div class="fly-column-right layui-hide-xs">
          <span class="fly-search"><i class="layui-icon"></i></span>
          <nuxt-link to="/jie/add">发表新帖</nuxt-link>
        </div>
        <div class="layui-hide-sm layui-show-xs-block"
             style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <nuxt-link to="/jie/add">发表新帖</nuxt-link>
        </div>
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
