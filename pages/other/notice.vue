<template>
  <div>
    <div class="fly-none" style="min-height: 0; padding: 0;">
      <i class="iconfont icon-tishilian"></i>
    </div>

    <div class="notice layui-text">
      非常抱歉，社区正在维护，稍后恢复 <br> <a href="http://www.layui.com/doc/" target="_blank">文档</a> <span
      style="padding:0 5px;"></span> <a href="http://www.layui.com/demo/" target="_blank">示例</a> <span
      style="padding:0 5px;"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "notice",
  head(){
    return {
      title: '故障公告'
    }
  }
}
</script>

<style scoped>
.notice {
  width: 600px;
  margin: 30px auto;
  padding: 30px 15px;
  border-top: 5px solid #009688;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  background-color: #f2f2f2;
}

@media screen and (max-width: 750px) {
  html body {
    margin-top: 0;
  }

  .notice {
    width: auto;
    margin: 20px 15px;
    padding: 30px 0;
  }
}
</style>
