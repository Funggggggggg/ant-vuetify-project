<template>
  <v-container class="container" fluid>
    <div class="content-area-1 text-snow text-center mb-0">
      <div class="background-wrapper">
        <div class="background-defalt"></div>
        <img src="/welcomeBackGround3.png" class="background-image" alt="background"/>
      </div>
      <div class="maintitle d-flex flex-column align-items-end text-end text-abril">
        <h1
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1000"
          class="maintitle-chiness text-snow text-klee-one"> 紀念巢
        </h1>
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500"
          class="me-1"> Memorial
        </div>
        <span
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1700"
          class="text-body-1 text-abril " style="color: #3B6C73;"> A secret base for collecting memories.
        </span>
        <!-- &nbsp; -->
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000"
          class="mt-0"> Nest </div>
      </div>
    </div>
  </v-container>

  <v-container class="container" fluid>
    <div></div>
  </v-container>

  <v-container class="container" fluid>
    <div></div>
  </v-container>
</template>

<script setup>
  // import { useUserStore } from '@/stores/user'
  // const userStore = useUserStore()
</script>

<style scoped>

 /* 頁面容器：填滿視窗高度 */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保證頁面至少填滿視窗高度 */
  padding: 0;
  margin: 0;
  position: relative;
  letter-spacing: 0.2em
}
/* 主要內容區域：允許頁面內容擴展 */
.content-area-1 {
  height: 600px; /* 固定高度 */
  flex: 1; /* 擴展內容區域以填滿空間 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1; /* 確保文字在背景圖片上方 */
  flex-grow: 1; /* 讓主要內容區域填滿可用空間 */
  /* background-color: rosybrown; */
}

.background-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh; /* 確保填滿畫面 */
  background-color: #F1D87F !important;
}

.background-defalt {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 100vw;
  height: 100vh;
  z-index: 0; /* 確保背景圖片在最底層 */
  background-color: #F1D87F !important;
}

.background-image {
  display: none; /* 預設隱藏背景圖片 */
}

.maintitle {
  width: 90%;
  font-size: 4.5rem;
  font-weight: 500 !important;
  line-height: 1.8;
  position: relative;
  z-index: 2;
  right: 1rem;
  bottom: 6rem;
  color: #3B6C73;
  /* background-color: aliceblue; */
  /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
}

.maintitle-chiness {
  font-size: 5rem !important;
  font-weight: normal;
  position: relative;
  right: 0rem;
  bottom: 0rem;
}

.text-h4 {
  font-size: 1.5rem !important;
  }

.text-body-1 {
  /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
  letter-spacing: 0.1em !important;
  line-height: 0;
}

@media (min-width: 576px) {}
@media (min-width: 768px) {}
@media (min-width: 992px) {}
@media (min-width: 1200px) {}
@media (min-width: 1450px) {
  .background-image {
    position: absolute;
    top: 1rem;
    left: -15rem;
    width: 100%;
    min-width: 1200px; /* 設置最小寬度 */
    min-height: 800px; /* 設置最小高度 */
    z-index: -1; /* 確保背景圖片在最底層 */
    background-size: contain; /* 確保背景圖片包含在容器內 */
    background-attachment: fixed; /* 固定背景圖片 */
    background-repeat: no-repeat; /* 背景圖片不重複 */
    background-position: center; /* 背景圖片居中 */
  }
}
@media (min-width: 1880px) {}
</style>

<route lang="yaml">
  meta:
    layout: empty
    login: false
    admin: false
    title: '歡迎'
</route>
