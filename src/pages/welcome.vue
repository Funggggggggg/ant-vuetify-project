<template>
  <v-container class="page-container" fluid>
    <v-row class="content-area text-snow text-center mb-5" justify="center" align="center" :style="rowStyle1">
      <div class="background-wrapper">
        <img src="/welcomeBackGround3.png" class="background-image" alt="background" />
      </div>
      <v-col cols="12">
        <div class="text-overlay maintitle d-flex flex-column align-items-end text-end">
          <h1 class="text-abril d-flex flex-column" style="color: #3B6C73;">
            <p
              data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1000"
            class="text-snow text-klee-one maintitle-chi">紀念巢
            </p>
            <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500" class="me-0"> Memorial</div>
            <span class="text-body-1 text-abril " style="color: #3B6C73;" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1700" >
                A secret base for collecting memories.
              </span>
            <!-- &nbsp; -->
            <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000" class="mt-2"> Nest </div>
          </h1>
        </div>
        <!-- 用 Gsap 才可調進入動畫 -->
        <div class="video">
          <video autoplay loop muted>
            <source src="/videos/video-4.mp4" type="video/mp4">
        </video>
      </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="page-container" fluid>
    <v-col class="content-area text-center" justify="center" align="center" :style="rowStyle2">
      <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
        <span style=" color: #C04759; font-weight: 100;">Secret</span>
      </div>
      <div data-aos="fade-right" data-aos-duration="1500" class="subtitle-content text-abril text-klee-one text-h4">
        紀念巢<br>
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
  </v-container>

  <v-container class="page-container" fluid>
    <div class="content-area text-center" justify="center" align="center" :style="rowStyle3">
      <div data-aos="fade-left" data-aos-duration="1500" class="thirdtitle text-abril text-snow">
        <span style=" color: #C04759; font-weight: 100;">Rebirth</span>
      </div>
      <div data-aos="fade-left" data-aos-duration="1500" class="thirdtitle-content text-abril text-klee-one text-h4">
        每一次紀念<br>
        將回憶去蕪存菁<br>
        都是轉化與重生的契機<br>
        透過藝術 賦予生活更深刻的意義<br>
        讓記憶不再是過往<br>
        而是能持續的現在與未來<br>
      </div>
      <!-- 用 Gsap 才可調進入動畫 -->
        <router-link to="/" class="d-flex align-center">
          <v-toolbar-title class="btn-explore text-abril">Explore</v-toolbar-title>
        </router-link>
        <template v-if="!isLoggedIn">
          <router-link to="/login/" class="d-flex align-center">
            <v-toolbar-title class="btn-login text-abril">Login</v-toolbar-title>
          </router-link>
        </template>
        <template v-else>
          <div>
            <img class="antimg" src="/ant.png">
          </div>
        </template>
      </div>
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
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isLoggedIn = userStore.isLoggedIn

import { ref, onMounted } from 'vue'

// 響應式設定 row 的最小高度
const rowStyle1 = ref({ minHeight: '600px' })
const rowStyle2 = ref({ minHeight: '1100px' })
const rowStyle3 = ref({ minHeight: '1050px' })

const updateRowStyle = () => {
  if (window.innerWidth < 768) {
    rowStyle1.value.minHeight = '400px'
    rowStyle2.value.minHeight = '700px'
    rowStyle3.value.minHeight = '650px'
  } else if (window.innerWidth >= 1450) {
    rowStyle1.value.minHeight = '800px'
    rowStyle2.value.minHeight = '1500px'
    rowStyle3.value.minHeight = '1250px'
  } else {
    rowStyle1.value.minHeight = '600px'
    rowStyle2.value.minHeight = '1100px'
    rowStyle3.value.minHeight = '1050px'
  }
}

onMounted(() => {
  updateRowStyle()
  window.addEventListener('resize', updateRowStyle)
})
</script>

<style scoped>

@media (min-width: 576px) {}
@media (min-width: 768px) {}
@media (min-width: 992px) {}
@media (min-width: 1200px) {}

@media (min-width: 1450px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  .text-body-1 {
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    letter-spacing: 0.2em;
    margin-top: 0rem;
  }

  /* 頁面容器：填滿視窗高度 */
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 保證頁面至少填滿視窗高度 */
    padding: 0;
    margin: 0;
    position: relative;
    letter-spacing: 0.2em

    /* background-size: cover; 背景圖片覆蓋整個容器 */
    /* background-position: center; 背景圖片居中 */
    /* background-repeat: no-repeat; 背景圖片不重複 */
  }

  /* 主要內容區域：允許頁面內容擴展 */
  .content-area {
    flex: 1; /* 擴展內容區域以填滿空間 */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* background-color: rosybrown; */
    z-index: 1; /* 確保文字在背景圖片上方 */
    flex-grow: 1; /* 讓主要內容區域填滿可用空間 */
    letter-spacing: 0.2em
  }

  /* 固定在頁面底部的 Footer */
  .antFooter {
    text-align: center;
    padding: 10px 0;
    width: 100%;
    margin-top: auto; /* 確保 footer 在頁面底部 */
    z-index: 1; /* 確保 footer 在文字上方 */
    /* background-color: rgba(0, 0, 0, 0.5); 背景色透明 */
  }

  .antFooter a:hover {
    color: #C04759 !important;
    transition: 0.3s !important;
  }
  /* ---------------------------------------------------------------------------- */
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

  .background-wrapper {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 200px;
  }
  /* ---------------------------------------------------------------------------- */

  .maintitle {
    font-size: 4.7rem;
    font-weight: 700;
    line-height: 0.8;
    position: absolute;
    right: 5rem;
    bottom: 7rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    /* letter-spacing: 0.1rem */
  }

  .maintitle-chi {
    font-size: 5rem !important;
    font-weight: normal;
    position: absolute;
    right: 0rem;
    bottom: 19rem;
  }

  .maintitle-small {
    position: absolute;
    right: 0rem;
    bottom: -2rem;
  }

  .subtitle {
    font-size: 7rem;
    font-weight: 700;
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    position: absolute;
    left: 8rem;
    top: 23rem;
    z-index: 1;
    letter-spacing: 0.1em
    /* color: #C04759; */
    /* background-color: red; */

  }

  .subtitle-content {
    z-index: 1; /* 確保背景圖片在最底層 */
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    position: absolute;
    color: #3B6C73;
    text-align: center;
    width: 40rem;
    top: 28rem;
    left: 28rem;
    z-index: 1;
    letter-spacing: 0.1em
    /* background-color: red; */
  }

  .thirdtitle {
    font-size: 7rem;
    font-weight: 700;
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    position: absolute;
    right: 8rem;
    top: 1rem;
    z-index: 1;
    letter-spacing: 0.1em
    /* color: #C04759; */
    /* background-color: red; */
  }

  .thirdtitle-content {
    z-index: 1; /* 確保背景圖片在最底層 */
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    position: absolute;
    color: #3B6C73;
    text-align: center;
    width: 40rem;
    top: 9rem;
    left: 22rem;
    z-index: 1;
    /* background-color: red; */
  }

  .btn-explore {
    font-size: 3rem;
    line-height: 4rem;
    font-weight: 700;
    color: #C04759;
    /* text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); */
    position: absolute;
    left: 37rem;
    top: 44rem;
    z-index: 2;
    text-decoration: none;
    letter-spacing: 0.1em;
  }

  .btn-explore:hover {
    color: #3B6C73;
    transition: 0.3s;
  }

  .btn-login {
    font-size: 3rem;
    line-height: 4rem;
    font-weight: 700;
    color: #C04759;
    /* text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); */
    position: absolute;
    left: 61rem;
    top: 36rem;
    z-index: 2;
    text-decoration: none;
    letter-spacing: 0.1em;
  }

  .btn-login:hover {
    color: #3B6C73;
    transition: 0.3s;
  }

  .antimg {
    position: absolute;
    width: 10rem;
    left: 61rem;
    top: 36rem;
    z-index: 2;
  }

  /* ----------------------------------------------------- */
  .video {
    mask: url('/mask.png') no-repeat center;
    border-style: none;
    position: absolute;
    top: 33rem;
    left: 22rem;
    transform: translate(-50%, -50%);
    overflow: hidden;
    z-index: 99999;
  }

  .video video {
    position: relative;
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: bottom;
  }

  .video::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #94a1cc6d;
    z-index: 1;
  }


  @keyframes video-animation {
    0%, 33% {
      opacity: 1;
    }
    34%, 66% {
      opacity: 0;
    }
    67%, 100% {
      opacity: 1;
    }
  }
}

/* ------------------------------------------------------------------------------------------------- */
@media (min-width: 1450px) {
  .text-h4 {
    font-size: 1.8rem;
    line-height: 2;
  }

  .text-body-1 {
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    letter-spacing: 0.2em;
    margin-top: 0rem;
  }
  .background-image {
    left: -20rem;
    min-width: 600px;
    min-height: 600px;
  }

  .maintitle {
    font-size: 5.5rem;
    right: 10rem;
    bottom: 5rem;
  }

  .maintitle-chi {
  right: 0rem;
  bottom: 22rem;
}

  .video {
    top: 39rem;
    left: 32rem;
  }

  .subtitle {
    font-size: 10rem;
    left: 12rem;
    top: 32rem;
  }

  .subtitle-content {
    width: 52rem;
    top: 49rem;
    left: 35rem;
  }

  .thirdtitle {
    font-size: 10rem;
    right: 8rem;
    top: 5rem;
  }

  .thirdtitle-content {
    width: 50rem;
    top: 19rem;
    left: 29rem;
  }

  .btn-explore {
    font-size: 4rem;
    line-height: 5rem;
    left: 49rem;
    top: 62rem;
  }

  .btn-login {
    font-size: 4rem;
    line-height: 5rem;
    left: 80rem;
    top: 51rem;
  }

  .antimg {
    width: 10rem;
    left: 85rem;
    top: 53rem;
  }
}

</style>

<route lang="yaml">
  meta:
    layout: empty
    login: false
    admin: false
    title: '歡迎'
</route>
