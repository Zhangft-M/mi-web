export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('user/getInfo').then((data) => {
        this.userInfo = data
      })
    },
    resetUserInfo() {
      this.$store.dispatch('user/resetUserInfo').then(() => {
      })
    }
  }
}
