<template>
  <div id="TinyEditor">
    <editor
      api-key="1cpsqexim82fkf71tga923wcvbouxo95aj8a16u24m31knbv"
      :init="init"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "TinyEditor",
  data() {
    return {
      init: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | link image | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
        // automatic_uploads: true,
        image_uploadtab: true,
        file_picker_types: 'image',
        images_upload_handler(blobInfo, success,failure){
          console.log(blobInfo.base64())
        }
      }
    }
  },
  components: {
    'editor': Editor
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
