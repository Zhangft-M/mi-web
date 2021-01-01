export default {
  data(){
    return{
      fullscreenLoading: false,
      loading: null
    }
  },
  mounted() {

  },
  methods:{
    startLoading(){
      // this.fullscreenLoading = true
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    stopLoading(){
      this.loading.close()
    }
  }
}
