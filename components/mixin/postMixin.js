import {getToken} from "../../utils/auth";
import {getUserInfo} from "../../utils/sessionUtils";
import {getUserOwnPost} from "../../api/userOwnPost";
import {confirmAlert, mixinToast} from "../sweetalert/mixinSweetalert";
import {getInfoWithNoId} from "../../api/user";

export default {
  data() {
  },
  created() {
  },
  methods: {
    async toDetail(post) {
      console.log(post)
      if (getToken() == null) {
        await confirmAlert.fire({
          title: '登录',
          titleText: '登录之后才能查看,是否进行登录',
          confirmButtonText: '去登陆'
        }).then((result)=>{
          if (result.isConfirmed) {
            const router = this.$router.resolve({path: '/login'})
            window.open(router.href, "_blank")
          }
        }).catch(()=>{
          mixinToast.fire({
            title: '错误',
            titleText: '未登录不能查看'
          })
        })
        return
      }
      const categoryId = post.categoryId
      if (categoryId === '2' && post.point > 0) {
        await getUserOwnPost(post.id).then((data) => {
          console.log("查询是否有权限阅读")
          console.log(data)
          if (!data) {
            confirmAlert.fire({
              title: `浏览该文章需要花费${post.point}积分,是否继续`,
              icon: 'question'
            }).then((result) => {
              if (result.isConfirmed){
                getInfoWithNoId().then((userInfo)=>{
                  if (userInfo.point < post.point){
                    this.$message.error("积分不足,不能查看")
                  }else {
                    const router = this.$router.resolve({path: '/jie/detail', query: {postId: post.id}})
                    window.open(router.href, "_blank")
                  }
                })
              }
            }).catch(() => {
              mixinToast.fire({
                title: '查看失败'
              })
            })
          } else {
            const router = this.$router.resolve({path: '/jie/detail', query: {postId: post.id}})
            window.open(router.href, "_blank")
          }
        })

      } else {
        const router = this.$router.resolve({path: '/jie/detail', query: {postId: post.id}})
        window.open(router.href, "_blank")
      }
    }
  }
}

