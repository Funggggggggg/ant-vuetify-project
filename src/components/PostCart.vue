<template>
  <v-card class="card text-abril" @mouseenter="hightlight = true " @mouseleave="hightlight = false">
    <div class="d-flex align-center mb-4">
      <Avatar :size="30" variant="beam" :name="props.account" :title="true" :color="colors"/>
      <div class="ms-4">{{ props.account }}</div>
    </div>
        <v-img class="picMask" :class="{ 'hightlight': hightlight }" :src="image" height="200" cover ></v-img>
    <v-row class="info">
      <v-col col="9">
        <v-card-title>
          <router-link :to="'/post/' + _id" style=" text-decoration: none ; font-weight:500 !important;" class="text-body-1 text-snow">{{ title }}</router-link>
        </v-card-title>
      </v-col>
      <!-- 綁定按鈕 按了可以放進收藏清單-->
      <v-col cols="3" class="d-flex align-center">
        <v-icon
            :style="{ color: isFavorite ? '#C04759' : '#F1D87F', fontSize: '25px' }"
            left
            class="ms-1"
            @click="toggleFavorite"
        >
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
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
import Avatar from "vue-boring-avatars";
// import { useCardStore } from '@/stores/card.js'
const hightlight = ref(false)

// const CardStore = useCardStore()
const props = defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: ''
  },
  account: {
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
  padding: 10px 10px 10px 0px;
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
  /* border-radius: 30px 0px 0px 0px; */
  border-radius: 30px 30px 30px 30px;
  padding: 17px;
  color: #ede5d2;
  width: 100%;
  height: 100%;
  /* background-color: #312E2B; */
  background-color: #403D3A;
  /* border: 0.5px solid #3B6C73; */
  /* border: 0.5px solid #F1D87F77; */
  border: 0.5px solid #EDE5D288;
  /* border: 2px dotted #EDE5D288; */
}
/* <!-- color="#3B6C73" -->
      <!-- color="#C04759" -->
      <!-- color="#3B6C73" -->
      <!-- color="#7D5A2C" --> */

.card::before {
  content: '';
  position: absolute;
  width:500px;
  border-radius: 10px;
  height: 0.5px;
  top: 325px;
  /* top: 270px; */
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
  /* background-color: #f1d87faf !important; */
  background-color: #EDE5D288 !important;
  transition: 0.7s;
}

.picMask {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  -webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  height: 100%;
  width: 100%;
  border-radius: 15px 15px 15px 15px;
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

