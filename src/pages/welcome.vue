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
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500"
          class="me-1 "> Memorial
        </div>
        <span
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1700"
          class="text-body-1 text-abril text-to-top"> A secret base for collecting memories.
        </span>
        <div
          data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000"
          class="text-to-top"> Nest </div>
      </div>
    </div>
  </v-container>

  <v-container class="container">
    <v-row class="content-area area-second text-snow text-center" style="gap: 0rem;">
      <v-col cols="12"></v-col> <!-- 排版好看 -->
      <v-col cols="12" class="d-flex justify-center pb-0">
        <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
          <span style=" color: #C04759">Secret</span>
        </div>
      </v-col>

      <v-col cols="12" class="d-flex justify-center pt-0">
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
      </v-col>
      <v-col cols="12"></v-col> <!-- 排版好看 -->
    </v-row>
  </v-container>

  <v-container class="container">
    <v-row class="content-area area-third text-center mb-0 justify-space-between">
      <v-col cols="12" class="d-flex justify-center">
        <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
            <span style=" color: #C04759">Story</span>
        </div>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500" class="subtitle-content text-abril text-klee-one">
          靈感來自對親友的思念<br>
          每一次紀念<br>
          都是回憶的淬鍊<br>
          是轉化與重生的開始<br>
          透過藝術 讓記憶不再只是過去<br>
          而是延續至此刻<br>
          走向未來<br>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mb-10" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
        <router-link to="/" class="btn-explore d-flex align-center ma-3">
          <v-toolbar-title class=" text-abril">Explore</v-toolbar-title>
        </router-link>

        <template v-if="!isLoggedIn">
          <router-link to="/login/" class="btn-login d-flex align-center">
            <v-toolbar-title class=" text-abril">Login</v-toolbar-title>
          </router-link>
        </template>
        <template v-else>
          <div>
            <img class="antimg" src="/ant.png">
          </div>
        </template>

      </v-col>
    </v-row>
  </v-container>

  <v-footer
    class="text-body-2 d-flex justify-center
    background-dark
    text-snow
    text-abril
    antFooter
    ga-3"
    height="50">

    <div> &nbsp;</div>
    <div class="text-klee-one">2025 Memorial Nest 紀念巢</div>
    <a class="text-snow" href="https://www.instagram.com/fungfung_1995?igsh=am15aHV3ZjBsY2sw" title="fungfung_1995">
      <v-icon icon="mdi-instagram" ></v-icon>
    </a>
    <a class="text-snow" href="mailto:fung.8021@gmail.com" title="fung.8021@gmail.com">
      <v-icon icon="mdi-email"></v-icon>
    </a>
  </v-footer>
</template>

<script setup>
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  AOS.init();

  // import { useUserStore } from '@/stores/user'

  // const userStore = useUserStore()
  // const isLoggedIn = computed(() => userStore.isLoggedIn);

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
  height: 600px;
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
  background-color: #F1D87F ;
}

.background-defalt {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 100vw;
  height: 100vh;
  background-color: #F1D87F ;
}

.background-image {
  display: none;
  /* 預設隱藏背景圖片 */
}

.video {
  -webkit-mask: url('/mask.png') no-repeat center;
  mask: url('/mask.png') no-repeat center;
  width: 100vw;
  max-width: 1200px; /* 設置最大寬度 */
  border-style: none;
  overflow: hidden;
  z-index: -2 !important;
  position: absolute;
  transform: translate(-50%, -50%); /* 使 mask 元素居中 */
  top: 80vh;
  /* ❌ top: 40rem; */
  /* 高度是寫死的（rem 是相對字體大小的單位），但畫面在不同裝置或方向下並不一致，所以會上下飄 */
  left: 50%;
  height: auto;
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
  word-break: keep-all; /* 保持單詞不斷行 */
  /* text-shadow: #b4bebf 1px 1px 3px; */
}

.text-h4 {
  font-size: 1.5rem !important;
  }

.text-body-1 {
  /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
  letter-spacing: 0.1em !important;
  line-height: 1.5rem;
}

.area-second {
  width: 100vw;
}

.area-third {
  width: 100vw;
  background-color: #F1D87F !important;
  color: #383431cc;
  /* font-weight: 800 !important ; */
}

.subtitle {
  font-size: 4.5rem !important;
  font-weight: 500 !important;
  z-index: 9999 !important;
  /* position: relative; */
  /* left: 8rem; */
  /* bottom: 13rem; */
}

.subtitle-content {
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 2;
  max-width: 700px;
  text-align: center;
  word-break: keep-all; /* 保持單詞不斷行 */
}

.btn-explore,
.btn-login {
  text-decoration: none !important;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 700;
  color: #C04759;
  z-index: 2;
}
.btn-explore div,
.btn-login

.btn-explore:hover,
.btn-login:hover {
  color: #3B6C73;
  transition: 0.3s;
}

.antimg {
  display: none;
}
/* ✅ 手機橫向補救 */
/* .video top 太固定 	用 orientation 媒體查詢修正 */
/* @media (orientation: landscape) and (max-width: 812px) {
  .video {
    top: 80vh;
    transform: translate(-50%, -50%);
  }
} */

/* ------------------------------------------------------------ */
/* ✅ 小手機（例如 iPhone SE）調整用 */
@media (max-width: 576px) {
  .subtitle {
    font-size: 3rem !important;
  }
  .subtitle-content {
    font-size: 0.9rem;
    line-height: 2;
  }
}

@media (mix-width: 576px) {
  .video {
    width: 100vw;
    top: 13rem;
    /* 手機版往下移，避免卡住畫面上半部 */
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem !important;
    /* 中文主標在小裝置不會爆字、可以置中 */
    text-align: center;
  }

  .subtitle {
    font-size: 4rem !important;
    left: 0.7rem;
    top: 5rem;
    text-align: center;
  }

  .subtitle-content {
    left: 1rem;
    top: -8rem;
    line-height: 2;
    text-align: center;
    padding: 0 1rem;
  }

  .maintitle {
    font-size: 3rem;
    text-align: center;
    bottom: 2rem;
  }

  .area-third {       /* 使其不卡邊緣*/
  padding: 2rem 1rem;
  text-align: center;
  }
}


/* 📐 平板起點（可安排兩欄排版） */
@media (min-width: 768px) {
    /* TODO: tablet layout 將 subtitle-content 轉為兩欄？ */
}

/* ✅ 桌機起點 */
@media (min-width: 992px) {
  .container { /* 開始放背景片照片 => 設置容器的最大寬度和內邊距 */
    max-width: 1200px;
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* 📺 大桌機（可加字體放大、主圖） */
@media (min-width: 1200px) {
  /* TODO: 加大 .maintitle-chiness 字體尺寸、行高調整 */
}

/* 🖥 超大桌機背景圖片位置微調 */
@media (min-width: 1450px) {
  .background-image {
    display: block; /* 顯示背景圖片 */
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

  .background-wrapper,
  .background-defalt,
  .area-third {
    background-color: #383431cc !important;
  }
}

/* 🧠 極大螢幕（視差滾動、特殊背景） */
@media (min-width: 1880px) {
  /* TODO: 增加背景視差動畫？或左右區塊分離設計 */
}

</style>

<route lang="yaml">
  meta:
    layout: empty
    login: false
    admin: false
    title: '歡迎'
</route>
