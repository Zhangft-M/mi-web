<template>
  <div style="background: #23262E">
    <div class="layui-container">
      <Column></Column>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="fly-panel-title fly-filter">
            <el-link @click="filterData(0)" :class="{'layui-this' : filterTypeValue === 0}">综合</el-link>
            <span class="fly-mid"></span>
            <el-link @click="filterData(1)" :class="{'layui-this' : filterTypeValue === 1}">未结</el-link>
            <span class="fly-mid"></span>
            <el-link @click="filterData(2)" :class="{'layui-this' : filterTypeValue === 2}">已结</el-link>
            <span class="fly-mid"></span>
            <el-link @click="filterData(3)" :class="{'layui-this' : filterTypeValue === 3}">精华</el-link>
            <span class="fly-filter-right layui-hide-xs">
              <el-link @click="sortData(0)" :class="{'layui-this' : sortTypeValue === 0}">按最新</el-link>
              <span class="fly-mid"></span>
              <el-link @click="sortData(1)" :class="{'layui-this' : sortTypeValue === 1}">按热议</el-link>
            </span>
          </div>
        </div>
        <div class="layui-row layui-col-space15">
          <div class="layui-col-md6 content-card hvr-grow-shadow card-margin" v-for="postItem in postDatas"
               :key="postItem.id">
            <el-card class="box-card animate__animated animate__lightSpeedInLeft hvr-curl-top-right"
                     shadow="hover">
              <div class="layui-row">
                <div class="fly-list-badge" v-show="postItem.level === 1">
                  <span class="layui-badge layui-bg-black">置顶</span>
                  <!--<span class="layui-badge layui-bg-red">精帖</span>-->
                </div>
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
                          {{ postItem.title| hideTitle() }}
                        </span>
                        </nuxt-link>
                        <!--                  <a href="jie/detail.vue"></a>-->
                      </h2>
                    </div>
                    <div class="layui-col-md12" style="padding-top: 10px">
                      <p class="text-content">
                        {{
                          postItem.content | hideText()
                        }}
                      </p>
                    </div>
                    <div class="layui-col-md12" style="padding-top: 10px">
                      <div class="fly-list-info">
                        <nuxt-link to="/user/home" target="_blank">
                          <i class="fa fa-user"><cite>&nbsp;{{ postItem.username }}</cite></i>
                          <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                          <i class="layui-badge fly-badge-vip">VIP3</i>-->
                        </nuxt-link>
                        <span>{{ postItem.updateTime | parseDate() }}</span>
                        <span class="fly-list-kiss layui-hide-xs" title="悬赏积分"><i
                          class="fa fa-diamond"></i>{{ postItem.reward }}</span>
                        <span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
                        <span class="fly-list-nums">
                          <i class="fa fa-commenting"></i> {{ postItem.commentCount }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
      <div class="layui-row layui-col-space15" style="padding-top: 20px">
        <!-- <div class="fly-none">没有相关数据</div> -->
        <div style="text-align: center">
          <el-pagination
            style="font-size: 50px"
            background
            :page-sizes="[10, 15, 20, 25]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <el-backtop></el-backtop>
    </div>
  </div>
</template>

<script>
import Column from "@/components/column";
import Broadside from "@/components/Broadside";
import {queryData} from "@/api/post"
import {formatTime} from "@/utils"

const defaultQueryParam = {
  page: 0,
  size: 10,
  keyword: null,
  ending: null,
  essence: null,
  sort: ['_id,desc']
}
export default {
  components: {Column, Broadside},
  // components: {Column}
  data() {
    return {
      keyword: '',
      total: 0,
      postDatas: [],
      filterTypeValue: 0,
      sortTypeValue: -1,
      queryParam: {
        page: 0,
        size: 10,
        keyword: null,
        categoryId: null,
        ending: null,
        essence: null,
        sort: ['_id,desc']
      }
    }
  },
  created() {
    // console.log(this.queryParam.keyword)
    this.getData()
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        // console.log(newVal)
        this.queryParam.categoryId = newVal.query.categoryId
        this.filterTypeValue = 0
        this.sortTypeValue = -1
        Object.assign(this.queryParam,defaultQueryParam)
        /*console.log("keyword")
        console.log(this.queryParam.keyword)*/
        this.getData()
      },
      deep: true
    }
  },
  filters: {
    hideTitle: function (val) {
      // console.log(val)
      const length = val.length;
      let result = val;
      if (length > 6) {
        result = val.substr(0, 6).concat('...')
      }
      return result
    },

    hideText: function (val) {
      const length = val.length
      let result = val
      if (length > 10) {
        const hasLength = Math.round(length * Math.random(1));
        // console.log("haslength:" + hasLength)
        result = val.substr(0, 10 + hasLength).concat('...')
      }
      return result
    },

    parseDate: function (val) {
      let date = new Date(Date.parse(val.replace(/-/g, "/")));
      return formatTime(date, null);
    }


  },
  methods: {
    getData() {
      if (this.queryParam.categoryId === null) {
        this.getQueryParam()
      }
      queryData(this.queryParam).then((res) => {
        console.log(res)
        this.postDatas = res.records
        this.total = res.total
      }).catch(() => {
        this.$message.error("加载失败")
      })
      console.log(this.queryParam)
    },
    handleSizeChange(val) {
      this.queryParam.size = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this.getData()
    },
    getQueryParam() {
      // console.log("第一次进入页面，获取查询参数")
      this.queryParam.categoryId = this.$route.query.categoryId
      // console.log(this.keyword)
    },
    filterData(val) {
      switch (val) {
        case 0:
          Object.assign(this.queryParam, defaultQueryParam);
          this.filterTypeValue = 0;
          this.sortTypeValue = -1;
          this.getData()
          break
        case 1:
          Object.assign(this.queryParam, defaultQueryParam);
          this.filterTypeValue = 1;
          this.sortTypeValue = -1;
          this.queryParam.ending = false;
          this.getData();
          break
        case 2:
          Object.assign(this.queryParam, defaultQueryParam);
          this.filterTypeValue = 2;
          this.sortTypeValue = -1;
          this.queryParam.ending = true;
          this.getData();
          break
        case 3:
          Object.assign(this.queryParam, defaultQueryParam);
          this.filterTypeValue = 3;
          this.sortTypeValue = -1;
          this.queryParam.essence = true;
          this.getData();
          break
      }
    },
    sortData(val) {
      switch (val) {
        case 0:
          this.sortTypeValue = 0
          this.queryParam.sort = ['create_time,desc'];
          this.getData();
          break
        case 1:
          this.sortTypeValue = 1;
          this.queryParam.sort = ['comment_count,desc'];
          this.getData();
          break
      }
    },
    getFilterData() {


    }
  }
}
</script>

<style>
.card-margin {
  width: 500px;
  margin-right: 40px;
  /*margin-bottom: 0px;*/
  margin-left: 20px
}

.text-content {
  font-size: 15px;
  font-family: 华文行楷, serif;
  color: rgba(2, 4, 10, 0.59);
  text-indent: 2em;
}

.el-pager li {
  font-size: 20px;
  background: #4F99CF;
}
</style>
