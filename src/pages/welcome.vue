<template>
  <v-container class="background-wrapper" fluid>
    <!-- 背景與影片 -->
    <div class="background-defalt">
      <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500">
        <div class="video">
          <video autoplay loop muted>
            <source src="/videos/video-4.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="background-image" >
        <img src="/welcomeBackGround3.png" alt="background"/>
      </div>
    </div>

    <!-- 第一區 主標題 -->
    <div class="section section-nest text-snow text-center mb-0">
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

    <!-- 第二區 Secret 內容 -->
    <v-row class="section section-secret text-center" style="gap: 3rem;">
      <v-col cols="12" class="d-flex justify-center">
        <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril pt-15">
          <span class="secretWord" style=" color: #C04759;">Secret</span>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500" class="subtitle-content ">
          <span class="secretInside text-abril text-klee-one">
            存放您回憶改造的秘密巢穴<br>
            如螞蟻蒐集著一塊塊記憶碎片<br>
            步步築出自己的窩<br>
            在這裡<br>
            重新思考物與人的關係<br>
            從日復一日的麻木日常中<br>
            重建生活意義<br>
            找回記憶的溫度<br>
          </span>
        </div>
      </v-col>
    </v-row>

    <!-- 第三區 Story + 按鈕 -->
    <v-row class="section section-story text-center justify-space-between">
      <v-col cols="12" class="d-flex justify-center bg-red">
        <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
            <span class="storyWord" style=" color: #C04759">Story</span>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="500" class="subtitle-content text-abril text-klee-one bg-black">
          <span>
            靈感來自對親友的思念<br>
            每一次紀念<br>
            都是回憶的淬鍊<br>
            是轉化與重生的開始<br>
            透過藝術 讓記憶不再只是過去<br>
            而是延續至此刻<br>
            走向未來<br>
          </span>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mb-10" data-aos="fade-right" data-aos-duration="1500" >
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
    <!-- Footer -->
    <v-footer
      class="text-body-2 d-flex justify-center
      text-snow
      text-abril
      ga-3"
      style="background-color: #383431cc;"
      height="50">

      <div> &nbsp;</div>
      <div
      style="color: #F1D87F;"
      class="text-klee-one">2025 Memorial Nest 紀念巢</div>
      <a
      style="color: #F1D87F;"
      href="https://www.instagram.com/fungfung_1995?igsh=am15aHV3ZjBsY2sw" title="fungfung_1995">
        <v-icon icon="mdi-instagram" ></v-icon>
      </a>
      <a
      style="color: #F1D87F;"
      href="mailto:fung.8021@gmail.com" title="fung.8021@gmail.com">
        <v-icon icon="mdi-email"></v-icon>
      </a>
    </v-footer>
  </v-container>
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
.v-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

 /* 頁面容器：填滿視窗高度 */
.section {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.section-nest {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3; /* 確保文字在背景圖片上方 */
  flex-grow: 1; /* 讓主要內容區域填滿可用空間 */
  background-color: #F1D87F ;
}

.section-secret {
  min-height: 800px;
  z-index: 0; /* 確保文字在背景圖片上方 */
  flex-grow: 1; /* 讓主要內容區域填滿可用空間 */
  color: #383431cc;
  background-color: #F1D87F;
}

.section-story {
  min-height: 900px;
  z-index: 1; /* 確保文字在背景圖片上方 */
  flex-grow: 1; /* 讓主要內容區域填滿可用空間 */
  width: 100%;
  background-color: #383431cc !important;
  padding-top: 5rem;
}

.background-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh; /* 確保填滿畫面 */
  overflow: visible;
}

.background-defalt {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  z-index: 2 !important;
  /* background-color:#6366; */
  /* height: 100vh; 這會讓它始終只有一頁高，導致不能捲動 */
}

.background-image {
  display: none;
  /* 預設隱藏背景圖片 */
}

.video {
  -webkit-mask: url('/mask.png') no-repeat center;
  mask: url('/mask.png') no-repeat center;
  position: fixed;
  top: -280px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 1800px;
  object-fit: cover;
  z-index: 1000;
}


.video video {
  position: relative;
  width: 100%;
  height: 100%;
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

.subtitle {
  font-size: 4.5rem !important;
  font-weight: 500 !important;
  z-index: 9999 !important;
}

.subtitle-content {
  width: 100%;
  font-size: 1rem !important;
  font-weight: 500 !important;
  line-height: 3;
  margin-bottom: 3rem;
  max-width: 700px;
  text-align: center;
  word-break: keep-all;
  /* 保持單詞不斷行 */
}

.btn-explore,
.btn-login {
  text-decoration: none !important;
  line-height: 1;
  font-weight: 700;
  color: #C04759;
  z-index: 2;
}

.btn-explore div,
.btn-login div {
  font-size: 2.5rem;
  min-height: 60px; /* 用 min-height 代替 height */
  margin: 1rem;
  padding: 0.5rem 1rem; /* 加一點內距，讓按鈕好看 */
  display: inline-flex; /* 保持內部對齊，又能隨內容大小 */
}

.btn-explore:hover,
.btn-login:hover {
  color: #3B6C73;
  transition: 0.3s;
}

.antimg {
  display: none;
}

/* ------------------------------------------------------------ */
/* ✅ 手機橫向補救 */
/* .video top 太固定 	用 orientation 媒體查詢修正 */
@media (orientation: landscape) and (max-width: 812px) {
  .video {
    top: 80vh;
    transform: translate(-50%, -50%);
  }
}

/* ✅ 小手機（例如 iPhone SE）調整用 */
@media (max-width: 576px) {
  .subtitle {
    font-size: 3rem !important;
  }
  .subtitle-content {
    font-size: 0.9rem;
    line-height: 2;
  }
  .btn-explore div,
  .btn-login div {
    font-size: 2rem;
  }
}

/* 📐 平板起點（可安排兩欄排版） */
/* @media (min-width: 768px) {
    .video {
      TODO: tablet layout 將 subtitle-content 轉為兩欄？
    }
} */

/* ✅ 桌機起點 */
/* @media (min-width: 992px) {
  .container {
    開始放背景片照片 => 設置容器的最大寬度和內邊距
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
} */

/* 📺 大桌機（可加字體放大、主圖） */
/* @media (min-width: 1200px) { */
  /* TODO: 加大 .maintitle-chiness 字體尺寸、行高調整 */
/* } */

/* 🖥 超大桌機背景圖片位置微調 */
@media (min-width: 1450px) {
  .background-image {
    display: block; /* 顯示背景圖片 */
    position: relative;
    width: 1800px;
    background-size: contain; /* 確保背景圖片包含在容器內 */
    background-attachment: fixed; /* 固定背景圖片 */
    background-repeat: no-repeat; /* 背景圖片不重複 */
    background-position: center; /* 背景圖片居中 */
    z-index: -1000;
    overflow: visible;
    transform: translateX(-50%);
    left: 50%;
  }
  .background-image img {
    width: 100%;
    height: 100%;
    margin-top: 100px;
    padding: 32px;
    /* background-color: #C04759; */
  }

  .video {
    top: -220px;
    transform: translateX(-60%);
  }

  .background-wrapper {
    width: 100%;
    text-align: center;
    margin-bottom: 200px;
  }

  .background-wrapper,
  .background-defalt,
  .section-secret,
  .section-story{
    background-color: #383431 !important;
  }

  .section {
    min-height: 1200px;
    background: none;
  }

  .subtitle {
    font-size: 10rem !important;
  }

  .subtitle-content {
    z-index: 3;
    font-size: 1.5rem !important;
  }

  .section-secret {
    /* position: fixed; */
    min-height: 900px;
  }
  .secretWord {
    position: absolute;
    width: 100%;
    top: 80px;
    left: -500px;

  }
  .secretInside {
    position: absolute;
    width: 100%;
    top: -300px;
    left: 220px;
    font-weight: 600 !important;
    /* background-color: #C04759; */
  }

  .section-story {
    /* position: relative; */
    /* top: 100vh; */
    min-height: 900px;
    color: #383431cc;
    background-color: #F1D87F;
    /* z-index: -1001 !important; */
  }
  .storyWord {

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
