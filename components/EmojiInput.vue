<template>
<div>
  <el-input
    id="emojiInput"
    type="textarea"
    v-model="value"
    :placehoder="placeholder"></el-input>
  <emoji @addEmoji="addEmoji"></emoji>
</div>
</template>

<script>
export default {
  name: "EmojiInput",
  props:['value','placeholder'],
  methods:{
    addEmoji(emoji){
      console.log(emoji)
      const elInput = document.getElementById("emojiInput")
      let txt = elInput.value
      let startPos = elInput.selectionStart // 第0个到光标的字符
      let endPos = elInput.selectionEnd// 选中的字符到最后的字符
      if (startPos === undefined || endPos === undefined) return
      // 将表情添加到选中的光标位置
      let result = txt.substring(0, startPos) + emoji + txt.substring(endPos)
      elInput.value = result// 赋值给input的value
      // 重新定义光标位置
      elInput.focus()
      elInput.selectionStart = startPos + emoji.length
      elInput.selectionEnd = startPos + emoji.length
      this.value = result
      this.emoji = emoji
    }
  }
}
</script>

<style scoped>

</style>
