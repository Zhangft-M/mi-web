<template>
<div>
<el-row :gutter="8">
  <el-col :span="8" v-for="i in 20" :key="i" style="padding: 8px">
    <el-card>
      sssss
    </el-card>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  layout: 'userLayout',
  head() {
    return {
      title: '用户中心'
    }
  }
}
</script>

<style scoped>

</style>
