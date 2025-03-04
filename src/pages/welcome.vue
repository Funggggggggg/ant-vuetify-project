<template>
  <v-container class="page-container" fluid>
    <v-row class="content-area text-snow text-center mb-5" justify="center" align="center" style="min-height: 600px; ">
      <div class="background-wrapper">
        <img src="/welcomeBackGround3.png" class="background-image" alt="background" />
      </div>
      <v-col cols="12">
        <div data-aos="fade-down" data-aos-duration="1500" class="text-overlay maintitle d-flex flex-column align-items-end text-end">
          <h1 class="text-abril d-flex flex-column" style="color: #3B6C73;">
              <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1000" > Memorial</div>
              <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1500" > Nest </div>
              <p data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2000" class="text-h4 mt-2" style="color: #C04759;">
                紀念巢</p>
          </h1>
          <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="2500" >
            <span class="text-body-1 text-abril" style=" color: #C04759">
              A secret base for collecting memories.
            </span>
          </div>
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
    <div class="content-area text-center" justify="center" align="center" style="min-height: 1100px;">
      <div data-aos="fade-right" data-aos-duration="1500" class="subtitle text-abril text-snow">
        <span style=" color: #C04759; font-weight: 100;">Secret</span>
      </div>
      <div data-aos="fade-right" data-aos-duration="1500" class="subtitle-content text-abril text-h4">
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
    </div>
  </v-container>

  <v-container class="page-container" fluid>
    <div class="content-area text-center" justify="center" align="center" style="min-height: 1050px;">
      <div data-aos="fade-left" data-aos-duration="1500" class="thirdtitle text-abril text-snow">
        <span style=" color: #C04759; font-weight: 100;">Rebirth</span>
      </div>
      <div data-aos="fade-left" data-aos-duration="1500" class="thirdtitle-content text-abril text-h4">
        每一次紀念
        將回憶去蕪存菁<br>
        都是轉化的契機<br>
        一場重生的過程<br>
        透過繪畫、文字與影像<br>
        用藝術賦予生活更深刻的意義<br>
        讓記憶不再是過往<br>
        而是能持續的現在與未來<br>
      </div>
      <!-- 用 Gsap 才可調進入動畫 -->
      <!-- <div data-aos="fade-down" data-aos-duration="1500" > -->
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
    <!-- </div> -->
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
    <div>2025 Memorial Nest 紀念巢</div>
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
</script>

<style scoped>
.text-h4 {
  font-size: 1.5rem !important;
}

.text-body-1 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
/* ---------------------------------------------------------------------------- */
.background-image {
  position: absolute;
  top: 1rem;
  left: -15rem;
  width: 100%;
  min-width: 1200px; /* 設置最小寬度 */
  min-height: 800px; /* 設置最小高度 */
  z-index: -1; /* 確保背景圖片在最底層 */
  /* object-fit: contain */
}

.background-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 200px;
}
/* ---------------------------------------------------------------------------- */

.maintitle {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  /* 使用相對定位 */
  /* position: relative; */
  /* margin-right: 7rem; */
  /* margin-top: 1rem; */
  /* 使用絕對定位  */
  position: absolute;
  right: 7rem;
  bottom: 3rem;
  letter-spacing: 0.1em
}

.subtitle {
  font-size: 7rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
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
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
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
  /* mask: url('/mask1.png') no-repeat center; */
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

</style>

<route lang="yaml">
  meta:
    layout: empty
    login: false
    admin: false
    title: '歡迎'
</route>
