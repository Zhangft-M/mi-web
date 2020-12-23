<template>
  <div style="z-index: 1">
    <div>
      <div id="particles-js" :style="{backgroundColor: chooseParticles.backgroundColor}"></div>
      <script src="/particles/particles.min.js"></script>
    </div>

    <!--    <script src="/particles/js/app.js"></script>-->
    <div>
      <el-row style="height: auto" type="flex" justify="end">
        <el-row :push="22" :span="2">
          <div class="select-div">
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
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import {setTheme, getTheme} from "../utils/theme";

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
          backgroundColor: '#A8A8A8'
        },
        {
          name: '天蓝',
          value: 'blue',
          backgroundColor: '#97FFFF'
        },
        {
          name: '暗黑',
          value: 'dark',
          backgroundColor: '#3B3B3B'
        },
        {
          name: '公主粉',
          value: 'pink',
          backgroundColor: '#FFF68F'
        }
      ],
      chooseParticles: {}
    }
  },
  mounted() {
    if (getTheme() != null) {
      this.chooseParticles = JSON.parse(getTheme())
    } else {
      this.chooseParticles = this.themeItems[1]
      setTheme(this.chooseParticles)
    }
    this.init()
  },
  methods: {
    selectTheme(val) {
      this.chooseParticles = val
      setTheme(this.chooseParticles)
      this.init()
    },
   async init() {
     await window.particlesJS.load('particles-js', '/particles/assets/' + this.chooseParticles.value + '.json', function () {
        // console.log('particles.js loaded - callback');
      });
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
