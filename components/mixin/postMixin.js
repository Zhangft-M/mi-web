import {getToken} from "../../utils/auth";
import {getUserInfo} from "../../utils/sessionUtils";
import {getUserOwnPost} from "../../api/userOwnPost";

export default {
  data(){},
  created() {
  },
  methods:{
    async toDetail(post){
      console.log(post)
      if (getToken() == null) {
       await this.$confirm('登录之后才能查看,是否进行登录','提示',{
          confirmButtonText:'去登陆',
          cancelButtonText:'取消'
        }).then(()=>{
          const router = this.$router.resolve({path:'/login'})
          window.open(router.href,"_blank")
        }).catch(()=>{
          this.$message.error("不能查看")
       })
        return
      }
      const categoryId = post.categoryId
      if (categoryId === '2' && post.point > 0){
        await getUserOwnPost(post.id).then((data)=>{
          console.log("查询是否有权限阅读")
          console.log(data)
          if (!data) {
            this.$confirm(`浏览该文章需要花费${post.point}积分,是否继续`,'提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
              getUserInfo().then((data)=>{
                if (data.point < post.point) {
                  this.$message.error("积分不足,不能查看")
                }else {
                  const router = this.$router.resolve({path: '/jie/detail',query: {postId:post.id}})
                  window.open(router.href,"_blank")
                }
              })
            }).catch(()=>{
              this.$message.error("查看失败")
            })
          }else {
            const router = this.$router.resolve({path: '/jie/detail',query: {postId:post.id}})
            window.open(router.href,"_blank")
          }
        })

      }else {
        const router = this.$router.resolve({path: '/jie/detail',query: {postId:post.id}})
        window.open(router.href,"_blank")
      }
    }
  }
}

