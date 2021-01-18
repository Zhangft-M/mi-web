<template>
  <client-only>
    <el-dialog v-loading="isLoading" :visible="isShow" lock-scroll :append-to-body="true">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="image"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :mode="option.mode">
          </vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="upload">上 传<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </el-dialog>
  </client-only>
</template>

<script>
import {uploadImage} from "@/api/tool";
import {mixinToast} from "@/components/sweetalert/mixinSweetalert";

export default {
  name: "ImageCropper",
  components: {},
  data() {
    return {
      // 裁剪组件的基础配置option
      isLoading: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 500, // 默认生成截图框宽度
        autoCropHeight: 500, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [25, 6], // 截图框的宽高比例
        // full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: 'cover',    // cover  图片铺满容器
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
    }
  },
  props: ['isShow', 'image'],
  mounted() {
    console.log(this.image)
  },
  computed: {
    getImg() {
      // console.log(this.image)
      return this.image
    }
  },
  watch: {},
  methods: {
    getCropData() {
      this.$refs.cropper.getCropData(data => {
        console.log(data)
        return data
      })
    },
    upload() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
        const formData = new FormData()
        formData.append("avatar", data);
        this.isLoading = true
        uploadImage(formData).then((data) => {
          // this.imageUrl = data
          this.$emit("successUpload", data)
          this.isLoading = false
          mixinToast.fire({
            titleText: '上传成功',
            icon: "success",
            position: "top-end"
          })
        }).catch((error) => {
          console.log(error)
          this.isLoading = false
          this.$message.error("上传失败")
        })
        return data
      })
    },
    closeDialog() {
      this.$emit("closeImageCropperDialog")
    }
  }
}
</script>

<style scoped>
.cropper-content {
  width: 100%;
  height: 300px;
}

.cropper {
  width: 100%;
  height: 300px;
}
</style>
