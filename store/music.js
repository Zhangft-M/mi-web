import {setBgColor} from "@/utils/theme";
import axios from "axios";

export const state = () => {
  return {
    musics: []
  }
}

export const mutations = {
  SET_MUSIC(state, data) {
    console.log(data)
    state.musics = data
  }
}

export const actions = {
  getMusic({commit}) {
    return new Promise((resolve, reject) => {
      let musicDatas = []
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
          })
        }
      })
      commit('SET_MUSIC',musicDatas)
      resolve(musicDatas)
    })

  }
}
