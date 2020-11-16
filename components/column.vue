<template>
  <div style="padding-top: 10px;padding-bottom: 30px">
    <div class="fly-panel fly-column" :style="'background: ' + bgColor">
      <div class="layui-container">
        <el-card style="height: 80px">
          <ul class="layui-clear">
            <!--          layui-this为已选中状态-->
            <nuxt-link to="/?categoryId=0" active-class='layui-this' tag="li" exact>
              <a class="nav-font hvr-icon-pulse-grow"><i class="fa fa-home hvr-icon"></i>&nbsp;首页</a>
            </nuxt-link>
            <div>
              <nuxt-link v-for="item in categoryList" :key="item.id" active-class='layui-this' :to=`/jie?categoryId=${item.id}` tag="li" exact>
                <a class="nav-font" :class="item.item.iconClass"><i :class="item.icon"></i>&nbsp;{{item.name}}</a>
              </nuxt-link>
            </div>
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
import {getCategories} from "@/api/category";

export default {
  name: "Column",
  data() {
    return {
      categoryList: []
    }
  },
  props:['bgColor'],
  created() {
     getCategories().then((data)=>{
       this.categoryList = data
       this.$store.dispatch('category/setCategorise',data)
     }).catch(()=>{
       this.$router.push('/other/404')
       this.$notify.error({
         message : '页面加载错误',
         position: "bottom-right"
       })
     })
  }
}
</script>

<style>
.nav-font{
  font-family: 清松手写体2,serif;
  font-size: 20px;
}
</style>
