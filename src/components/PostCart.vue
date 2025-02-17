<template>
  <!-- FIXME 加裝飾線條 顏色跟標籤一起變化 -->
  <!-- FIXME 愛心位置變化 -->
  <v-card class="card">
    <div class="picMask">
      <v-img :src="image" height="200" cover>
        <template #placeholder>
        </template>
      </v-img>
    </div>
    <v-card-title style="line-height: 55px; font-size: 20px;">
      <router-link :to="'/post/' + _id" style="color: inherit; text-decoration: none;">{{ title }}</router-link>
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="9">{{ category }}</v-col>
        <!-- 綁定按鈕 按了可以放進收藏清單-->
        <v-col cols="3" class="d-flex align-center">
          <v-icon style="color:#F1D87F;" left class="ms-1" @click="toggleFavorite">{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <!-- <v-card-text>{{ content }}</v-card-text> -->
    <v-card-text>{{ truncatedContent }}</v-card-text>
  </v-card>
</template>

<script setup>
import { ref,computed } from 'vue'

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
  const maxLength = 60
  return props.content.length > maxLength ? props.content.slice(0, maxLength) + '...' : props.content
})

</script>

<style scoped>

.card:hover {
  box-shadow: 0px 0px 1px 0.32px #ede5d2;
  transition: 0.2s;
}

.card {
  border-radius: 0px 30px 0px 30px;
  padding: 10px;
  color: #ede5d2;
}

.picMask {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
-webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  height: 100%;
  width: 100%;
  border-radius: 0px 30px 0px 30px;
}
</style>

