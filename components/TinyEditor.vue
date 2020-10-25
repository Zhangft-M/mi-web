<template>
  <div id="TinyEditor">
    <editor
      api-key="1cpsqexim82fkf71tga923wcvbouxo95aj8a16u24m31knbv"
      :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "TinyEditor",
  components: {
    'editor': Editor
  }
}
</script>

<style scoped>

</style>
