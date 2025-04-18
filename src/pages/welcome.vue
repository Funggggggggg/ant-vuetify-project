<template>
  <v-container class="container">
    <div class="content-area text-snow text-center mb-0">
      <div class="background-wrapper">
        <div class="background-defalt">
              <!-- <div class="video" data-aos="fade" data-aos-duration="1000" data-aos-delay="800"> -->
          <div data-aos="fade" data-aos-duration="1000" data-aos-delay="1500">
            <div class="video">
              <video autoplay loop muted>
                <source src="/videos/video-4.mp4" type="video/mp4">
              </video>
            </div>
          </div>
        <img src="/welcomeBackGround3.png" class="background-image" alt="background"/>
        </div>
      </div>
      <div class="maintitle d-flex flex-column align-items-end text-end text-abril">
        <h1
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1000"
          class="maintitle-chiness text-klee-one" style="color: #3B6C73;"> 紀念巢
        </h1>
        <!-- class="maintitle-chiness text-klee-one" style="color: #383431cc;"> 紀念巢 -->
        <!-- class="maintitle-chiness text-klee-one text-snow"> 紀念巢 -->
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500"
          class="me-1 "> Memorial
        </div>
        <span
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1700"
          class="text-body-1 text-abril text-to-top"> A secret base for collecting memories.
        </span>
        <!-- &nbsp; -->
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000"
          class="text-to-top"> Nest </div>
      </div>
    </div>
  </v-container>

  <v-container class="container">
    <div class="content-area area-second text-snow text-center mb-0">
      <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
          <span style=" color: #C04759">Secret</span>
      </div>
      <div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500" class="subtitle-content text-abril text-klee-one">
          存放您回憶改造的秘密巢穴<br>
          如螞蟻蒐集著一塊塊記憶碎片<br>
          步步築出自己的窩<br>
          在這裡<br>
          重新思考物與人的關係<br>
          從日復一日的麻木日常中<br>
          重建生活意義<br>
          找回記憶的溫度<br>
      </div>
    </div>
  </v-container>

  <v-container class="container">
    <div class="content-area area-third text-snow text-center mb-0">

    </div>
    <div></div>
  </v-container>
</template>

<script setup>
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  AOS.init();
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
.content-area {
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
  background-color: #F1D87F !important;
}

.background-image {
  display: none;
  /* 預設隱藏背景圖片 */
}

.video {
  -webkit-mask: url('/mask.png') no-repeat center;
  mask: url('/mask.png') no-repeat center;
  width: 120%;
  border-style: none;
  position: absolute;
  /* top: 33rem; */
  top: 40rem;
  /* top: 35rem; */
  left: 12rem;
  transform: translate(-50%, -50%); /* 使 mask 元素居中 */
  overflow: hidden;
  z-index: -2 !important;
  /* animation: video-animation 3s infinite;  */
  /* background-color: red; */
}

.video video {
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: bottom;
  z-index: -2;
}

.video::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #b8c9ff85;
  /* background-color: rgba(184, 201, 255, 0.3); */
  z-index: -1;
}

.maintitle {
  width: 90%;
  font-size: 4.5rem;
  font-weight: 500 !important;
  line-height: 1.8;
  position: relative;
  z-index: 9999 !important;
  right: 1rem;
  bottom: 6rem;
  color: #383431cc !important;
  /* color: #3B6C73 !important; */
  /* background-color: aliceblue; */
  /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
}

.text-to-top {
  position: relative;
  z-index: 99999999999999 !important;
}

.maintitle-chiness {
  font-size: 5rem !important;
  font-weight: normal;
  position: relative;
  right: 0rem;
  bottom: -1rem;
  /* text-shadow: #b4bebf 1px 1px 3px; */
}

.text-h4 {
  font-size: 1.5rem !important;
  }

.text-body-1 {
  /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
  letter-spacing: 0.1em !important;
  line-height: 0;
}

.area-second {
  width: 100%;
}

.area-third {
  width: 100%;
  background-color: #F1D87F !important;
}

.subtitle {
  font-size: 4.5rem !important;
  font-weight: 500 !important;
  position: relative;
  z-index: 9999 !important;
  left: 8rem;
  bottom: 13rem;
}

.subtitle-content {
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 2.5rem;
  position: relative;
  z-index: 9999 !important;
  right: 6rem;
  bottom: -5rem;
  word-break: keep-all; /* 保持單詞不斷行 */
}

@media (min-width: 576px) {}
@media (min-width: 768px) {}
@media (min-width: 992px) {
  .container { /* 開始放背景片照片 => 設置容器的最大寬度和內邊距 */
    width: 100%;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
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
