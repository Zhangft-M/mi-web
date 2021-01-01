<template>
  <div style="padding-bottom: 30px">
    <div class="fly-panel fly-column animate__animated animate__swing">
      <div class="" style="">
        <el-card style="height: 80px;border-radius: 10px;opacity: 0.8">
          <ul class="layui-clear">
            <nuxt-link v-for="item in categoryList" :key="item.id" active-class='layui-this' :to="item|filterPath()"
                       tag="li" exact>
              <a class="nav-font animate__animated" :class="item.iconClass"><i :class="item.icon"></i>&nbsp;{{ item.name }}</a>
            </nuxt-link>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {getCategory, setCategory} from "../../utils/sessionUtils";
import {getCategories} from "../../api/category";

const homePath = '/';
const otherPath = '/jie?categoryId=';
export default {
  name: "Column",
  data() {
    return {
      categoryList: []
    }
  },
  mounted() {
    getCategories().then((data)=>{
      this.categoryList = data
      setCategory(data)
    })
    /*getCategory().then((data) => {
      this.categoryList = data
    })*/
  },
  filters: {
    filterPath(val) {
      if (val.orderNum === 0) {
        return homePath
      }
      return otherPath + val.id
    }
  },
  methods:{
    getCategory(){
      return this.categoryList;
    }
  }
}
</script>

<style>
.nav-font {
  font-family: 清松手写体2, serif;
  font-size: 20px;
}
</style>
