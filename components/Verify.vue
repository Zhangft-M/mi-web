<template>
  <div id="your-dom-id" class="nc-container"></div>
</template>

<script>
export default {
  head(){
    return{
      script:[{src: 'http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'}]
    }
  },
  name: "Verify",
  mounted() {
    var nc_token = ["FFFF0N000000000098E9", (new Date()).getTime(), Math.random()].join(':');
    var NC_Opt =
      {
        renderTo: "#your-dom-id",
        appkey: "FFFF0N000000000098E9",
        scene: "nc_login",
        token: nc_token,
        customWidth: 225,
        trans:{"key1":"code0"},
        elementID: ["usernameID"],
        is_Opt: 0,
        language: "cn",
        isEnabled: true,
        timeout: 3000,
        times:5,
        apimap: {
          // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
          // 'get_captcha': '//b.com/get_captcha/ver3',
          // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
          // 'get_img': '//c.com/get_img',
          // 'checkcode': '//d.com/captcha/checkcode.jsonp',
          // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
          // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
          // 'umid_serUrl': 'https://g.com/service/um.json'
        },
        callback: function (data) {
          window.console && console.log(nc_token)
          window.console && console.log(data.csessionid)
          window.console && console.log(data.sig)
        }
      }
    var nc = new noCaptcha(NC_Opt)
    nc.upLang('cn', {
      _startTEXT: "请按住滑块，拖动到最右边",
      _yesTEXT: "验证通过",
      _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
      _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
    })
  }
}
</script>

<style scoped>

</style>
