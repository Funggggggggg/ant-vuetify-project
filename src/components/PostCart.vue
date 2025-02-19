<template>
  <!-- FIXME 加裝飾線條 顏色跟標籤一起變化 -->
  <!-- FIXME 愛心位置變化 -->
  <v-card class="card" @mouseenter="hightlight = true " @mouseleave="hightlight = false">
    {{ CardStore.user }}
      <v-img class="picMask" :class="{ 'hightlight': hightlight }" :src="image" height="200" cover ></v-img>
    <v-row class="info">
      <v-col col="9">
        <v-card-title>
          <router-link :to="'/post/' + _id" style="color: #F1D87F; text-decoration: none; font-weight:500 !important;" class="text-body-1">{{ title }}</router-link>
        </v-card-title>
      </v-col>
      <!-- 綁定按鈕 按了可以放進收藏清單-->
      <v-col cols="3" class="d-flex align-center">
        <v-icon style="color:#F1D87F; font-size: 25px;" left class="ms-1" @click="toggleFavorite">{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-col>
    </v-row>
    <v-card-subtitle class="subtitle">
      {{ category }}
    </v-card-subtitle>
    <!-- <v-card-text>{{ content }}</v-card-text> -->
    <v-card-text class="content">{{ truncatedContent }}</v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCardStore } from '@/stores/card.js'
const hightlight = ref(false)

const CardStore = useCardStore()
const props = defineProps({
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
    type: Boolean,
    default: false
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
// FIXME 收藏
const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

// 計算屬性限制 content 顯示字數，最多顯示 100 字
const truncatedContent = computed(() => {
  const maxLength = 40
  return props.content.length > maxLength ? props.content.slice(0, maxLength) + '...' : props.content
})

</script>

<style scoped>

.info {
  position: relative;
  z-index: 2;
  margin-top: 0px; /* 控制與圖片的距離 */
  padding: 10px 10px 0px 0px;
  font-size: 20px;
  /* background-color: #f1d87f6b; */
}

.subtitle {
  position: relative;
  z-index: 2;
  margin-top: 12px;
  color: #78b6bf;
  /* color: #bd717c; */
  font-weight: 400;
}

.card {
  border-radius: 0px 30px 0px 30px;
  padding: 15px;
  color: #ede5d2;
  width: 100%;
  height: 100%;
}

.card::before {
  content: '';
  position: absolute;
  /* width: 1.5px; */
  /* width: 165px; */
  width:500px;
  /* height: 200px; */
  height: 1px;
  border-radius: 10px;
  /* top: 245px; */
  /* top: 220px; */
  top: 280px;
  /* left: 15px; */
  left: 30px;
  z-index: 3 !important;
  /* background-color: #ede5d23d !important; */
}

.card:hover::before {
  content: '';
  /* background-color: #ede5d2a6 !important; */
  /* background-color: #C04759 !important; */
  /* background-color: #366269 !important; */
  /* background-color: #F1D87F !important; */
  background-color: #f1d87faf !important;
  /* background-color: #f1d87f72 !important; */
  transition: 0.7s;
}

.picMask {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  -webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  height: 100%;
  width: 100%;
  border-radius: 0px 30px 0px 0px;
  transition: all 0.3s ease;
}

.content {
  color: #EDE5D2;
  line-height: 1.7;
}

.hightlight {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  -webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  filter: brightness(1.2);
}

</style>

