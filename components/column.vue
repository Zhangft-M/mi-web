<template>
  <div>
    <div class="fly-panel fly-column">
      <div class="layui-container">
        <ul class="layui-clear">
<!--          layui-this为已选中状态-->
          <li class="layui-hide-xs" :class="{'layui-this': isActive === 0}" @click="isActive = 0"><nuxt-link to="/">首页</nuxt-link></li>
          <li :class="{'layui-this': isActive === 1}"  @click="isActive = 1"> <nuxt-link to="/">提问</nuxt-link></li>
          <li :class="{'layui-this': isActive === 2}"  @click="isActive = 2"> <nuxt-link to="/">分享<span class="layui-badge-dot"></span></nuxt-link></li>
          <li :class="{'layui-this': isActive === 3}"  @click="isActive = 3"> <nuxt-link to="/">讨论</nuxt-link></li>
          <li :class="{'layui-this': isActive === 4}"  @click="isActive = 4"> <nuxt-link to="/">建议</nuxt-link></li>
          <li :class="{'layui-this': isActive === 5}"  @click="isActive = 5"> <nuxt-link to="/">公告</nuxt-link></li>
          <li :class="{'layui-this': isActive === 6}"  @click="isActive = 6"> <nuxt-link to="/">动态</nuxt-link></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>

          <!-- 用户登入后显示 -->
          <nuxt-link to="/user"></nuxt-link>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><nuxt-link to="/user">我发表的帖</nuxt-link></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><nuxt-link to="/user/index#collection">我收藏的贴</nuxt-link></li>
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
  name: "column",
  data(){
    return{
      isActive : 0
    }
  }
}
</script>
