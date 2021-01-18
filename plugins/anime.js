import anime from 'animejs';
import Vue from 'vue';

const VueAnime = {
  install (Vue, options) {
    Vue.prototype.$anime = anime;
  }
}
Vue.use(VueAnime);
