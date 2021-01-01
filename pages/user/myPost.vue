<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8" v-for="post in postDatas" :key="post.id" style="padding: 8px">
        <el-card>
          <el-row>
            <el-tag>{{post.categoryId | getCategoryName}}</el-tag>
          </el-row>
          <el-row>
            <el-col>
              <el-link>{{ post.title }}</el-link>
            </el-col>
          </el-row>
          <el-row>
            <p>{{ post.content }}</p>
          </el-row>
          <el-row>
            <el-col :span="5"><i class="fa fa-thumbs-up">点赞量:&nbsp;{{ post.voteUp }}</i></el-col>
            <el-col :span="5"><i class="fa fa-eye">浏览量:&nbsp;{{ post.viewCount }}</i></el-col>
            <el-col :span="5"><i class="fa fa-star">收藏量:&nbsp;{{ post.collectCount }}</i></el-col>
            <el-col :span="5"><i class="fa fa-database">阅读积分:&nbsp;{{ post.point }}</i></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-button icon="el-icon-edit" circle></el-button>
            </el-col>
            <el-col :span="5">
              <el-button icon="el-icon-delete" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import categoryMixin from "../../components/mixin/categoryMixin";

export default {
  layout: 'userLayout',
  mixins: [categoryMixin],
  head() {
    return {
      title: '用户中心'
    }
  },
  data() {
    return {
      postDatas: []
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
