<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <!--          <li class="layui-this">登入</li>-->
            <nuxt-link to="/user/login" tag="li" active-class="layui-this"><a>登入</a></nuxt-link>
            <nuxt-link to="/user/reg" tag="li" active-class="layui-this"><a>注册</a></nuxt-link>
          </ul>
          <div class="layui-form layui-tab-content layui-col-lg-offset5" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">邮箱/手机号</label>
                    <div class="layui-input-inline">
                      <input type="text" id="L_email" name="email" required lay-verify="required" autocomplete="off"
                             class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                      <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off"
                             class="layui-input">
                    </div>
                  </div>
                  <div style="padding-top: 5px;padding-bottom: 10px">
                    <Verify></Verify>
                  </div>
                  <!--                <div class="layui-form-item">-->
                  <!--                  <label for="L_vercode" class="layui-form-label">人类验证</label>-->
                  <!--                  <div class="layui-input-inline">-->
                  <!--                    <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">-->
                  <!--                  </div>-->
                  <!--                  <div class="layui-form-mid">-->
                  <!--&lt;!&ndash;                    验证码&ndash;&gt;-->
                  <!--                    <span style="color: #c00;"></span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <div class="layui-form-item">
                    <button class="layui-btn" lay-filter="*" lay-submit>立即登录</button>
                    <span style="padding-left:20px;">
                  <a href="forget.html">忘记密码？</a>
                </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq"
                       title="QQ登入"></a>
                    <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                       class="iconfont icon-weibo" title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "@/components/Verify";
export default {
  // mixins:[Verify],
  components: {Verify},
  head(){
  },
  data() {
    return {
    }
  },
  created() {
    // this.initVerify()
  },
  mounted() {
    this.initVerify()
  },
  methods: {
    initVerify(){

    }
  }

}
</script>

<style scoped>

</style>
