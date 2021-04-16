<template>
  <client-only>
    <emoji-picker
      :emojiData="emojiDataAll"
      :emojiGroups="emojiGroups"
      :skinsSelection="false"
      @emojiUnicodeAdded="getSelectEmojiUniCode"
      @emojiImgAdded="getSelectEmojiTag"
      :searchEmojisFeat="true"
      searchEmojiPlaceholder="Search here."
      searchEmojiNotFound="Emojis not found."
      isLoadingLabel="Loading..."
    >
    </emoji-picker>
  </client-only>
</template>

<script>
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiDataAnimalsNature from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-animals-nature.json';
import EmojiDataFoodDrink from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-food-drink.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';
export default {
  name: "Emoji",
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  methods:{
    getSelectEmojiUniCode(emoji){
      // console.log(emoji)
      this.$emit("addEmoji",emoji)
    },
    getSelectEmojiTag(emojiTag){
      console.log(emojiTag)
    }
  }
}
</script>

<style scoped>

</style>
