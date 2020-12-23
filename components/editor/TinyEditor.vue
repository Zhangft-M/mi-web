<template>
  <div id="TinyEditor">
    <editor style="border-radius: 10px"
      api-key="1cpsqexim82fkf71tga923wcvbouxo95aj8a16u24m31knbv"
      :init="init"
      v-model="content"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import {uploadBase64Image} from "../../api/tool";
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
          const formData = new FormData()
          formData.append("postImage",blobInfo.blob())
          uploadBase64Image(formData).then((data)=>{
            if (data != null){
              success(data)
            }else {
              failure("图片上传失败")
            }
          })

        }
      },
      content: ''
    }
  },
  components: {
    'editor': Editor
  },
  mounted() {
  },
  methods:{
    getContent(){
      return this.content
    }
  }
}
</script>

<style scoped>

</style>
