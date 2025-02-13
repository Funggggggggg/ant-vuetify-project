<template>
  <v-card>
    <v-img :src="image" height="200" cover></v-img>
    <v-card-title>
      <router-link :to="'/post/' + _id">{{ title }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ category }}</v-card-subtitle>
    <v-card-subtitle>{{ like }}</v-card-subtitle>
    <v-card-text>{{ content }}</v-card-text>
    <!-- <v-card-text>{{ truncatedContent }}</v-card-text> -->
  </v-card>
</template>

<script setup>
// import { computed } from 'vue'

defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default:''
  },
  like: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
})
// FIXME 計算屬性限制 content 顯示字數，最多顯示 100 字
// const truncatedContent = computed(() => {
//   const maxLength = 100
//   return defineProps.content.length > maxLength ? defineProps.content.slice(0, maxLength) + '...' : defineProps.content
// })

</script>
