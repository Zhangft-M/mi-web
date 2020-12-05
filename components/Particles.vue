<template>
  <div>
    <div id="particles-js"></div>
    <script src="/particles/particles.min.js"></script>
    <script src="/particles/js/app.js"></script>
  </div>
</template>

<script>
export default {
  name: "Particles",
  head(){
    return{
      link: [
        {rel: 'stylesheet', href: '/particles/css/style.css'},
      ]
    }
  },

}
</script>

<style scoped>

</style>
