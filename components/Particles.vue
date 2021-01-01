<template>
  <div style="z-index: 1">
    <div>
      <div id="particles-js" :style="{backgroundColor: getColor}"></div>
    </div>

    <!--    <script src="/particles/js/app.js"></script>-->
    <div>
      <el-row style="height: auto" type="flex" justify="end">
        <el-row :push="20" :span="4">
          <div class="select-div animate__animated animate__fadeInTopRight">
            <el-select v-model="chooseParticles" :popper-append-to-body="true" placeholder="主题" @change="selectTheme"
                       class="select-item select-form">
              <el-option style="border-radius: 10px"
                         v-for="item in themeItems"
                         :key="item.value"
                         :label="item.name"
                         :value="item">
              </el-option>
            </el-select>
          </div>
          <el-color-picker style="padding-right: 10px" class="animate__animated animate__fadeInTopRight"
            v-model="bgColor"
            show-alpha
            :predefine="predefineColors"
            @change="changeColor">
          </el-color-picker>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import {setTheme, getTheme, setBgColor, getBgColor} from "../utils/theme";

export default {
  name: "Particles",
  head() {
    return {
      link: [
        {rel: 'stylesheet', href: '/particles/css/style.css'},
      ]
    }
  },
  data() {
    return {
      themeItems: [
        {
          name: '无',
          value: 'default',
        },
        {
          name: '雪',
          value: 'blue',
        },
        {
          name: '幻',
          value: 'dark',
        },
        {
          name: '滑稽',
          value: 'pink',
        }
      ],
      chooseParticles: {},
      bgColor: 'rgba(255, 69, 0, 0.68)',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  mounted() {
    if (getTheme() != null) {
      this.chooseParticles = JSON.parse(getTheme())
    } else {
      this.chooseParticles = this.themeItems[1]
      setTheme(this.chooseParticles)
    }
    if (getBgColor() != null) {
      this.bgColor = getBgColor()
    }
    this.$store.dispatch('bgColor/setBgColor',this.bgColor)
    this.init()
  },
  computed:{
    getColor(){
      return this.$store.state.bgColor.color
    }
  },
  methods: {
    selectTheme(val) {
      this.chooseParticles = val
      setTheme(this.chooseParticles)
      this.init()
    },
    init() {
      window.particlesJS.load('particles-js', '/particles/assets/' + this.chooseParticles.value + '.json', function () {
        // console.log('particles.js loaded - callback');
      });
    },
    changeColor(color){
      this.bgColor =color
      this.$store.dispatch('bgColor/setBgColor',this.bgColor)
    }
  }

}
</script>

<style>
.select-item {
  opacity: 0.2;
  width: 100px;
  position: relative;
  border-radius: 20px;
}
.select-div{
  z-index: -1 !important;
  float: right;
}
</style>
