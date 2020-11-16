<template>
  <div style="text-align: center">
    <el-pagination
      style="font-size: 50px"
      background
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomPage",
  data() {
    return{

    }
  },
  props:['total'],
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  },
}
</script>

<style scoped>

</style>
