<template>
  <div style="z-index: -1;padding-right: 50px">
    <client-only>
      <aplayer :autoplay="false" style="opacity: 0.7;float: right"
               :style="{backgroundColor:getColor}"
               :mini="true"
               theme="pic"
               :showLrc="false"
               :music="music"
               :list="musics"
               :float="true"
               :listFolded="true"
      />
    </client-only>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MusicPlayer",
  head(){
    return{
      script:[{src:'https://cdn.jsdelivr.net/npm/colorthief@2.0.2/src/color-thief.js'}]
    }
  },
  data() {
    return {
      color: '',
      musics: [],
      music:{
        title: '',
        artist: '',
        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
        pic: ''
      }
    }
  },
  async asyncData(){
    console.log("获取歌曲")
    await this.$store.dispatch('music/getMusic').then((data)=>{
      return {musics:data}
    })
  },
  mounted() {
    /*if (this.musics.length === 0) {
      console.log("mounted中获取歌曲")
      const musicDatas = this.$store.state.music.musics.slice()
      if (musicDatas.length === 0) {
        this.$store.dispatch('music/getMusic').then((data)=>{
          this.musics = data
        })
      }else {
        // console.log(musicDatas)
        this.musics = musicDatas
      }
    }*/
    this.init()

  },
  computed:{
    getColor(){
      return this.$store.state.bgColor.color
    },
    getMusic(){
      return this.musics[0]
    }
  },
  methods:{
    init(){
      const _self = this
      let musicDatas = [{}]
      // 调用接口获取网易云排行榜的热榜音乐
      axios.get('http://81.70.197.232:4200/playlist/detail?id=3778678').then((res)=>{
        const tracks = res.data.playlist.tracks;
        // console.log(tracks)
        for (let i = 0; i < 10; i++) {
          /*let musicName = tracks[i].name;
          let musicPic = tracks[i].al.picUrl;
          let artistName = tracks[i].ar.name;*/
          let musicId = tracks[i].id;
         //  console.log(tracks[i])
          axios.get(`http://81.70.197.232:4200/song/url?id=${musicId}`).then((res)=>{
           //  console.log(res.data.data[0])
            let music = {
              title: tracks[i].al.name,
              artist: tracks[i].ar[0].name,
              src:res.data.data[0].url,
              pic:tracks[i].al.picUrl
            }
            musicDatas.push(music)
            this.musics.push(music)
            if (i === 0) {
              this.music = music
            }
          })
        }
      })
      // this.music = musicDatas[0]
      // this.musics = musicDatas
      return musicDatas;
    }
  }
}
</script>

<style scoped>

</style>
