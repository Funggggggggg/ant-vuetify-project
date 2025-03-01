<template>
  <v-container class="page-container" fluid>
    <v-row class="content-area text-snow text-center mb-5" justify="center" align="center" style="min-height: 600px; ">
      <div class="background-wrapper">
        <img src="/welcomeBackGround3.png" class="background-image" alt="background" />
      </div>
      <v-col cols="12">
        <div class="text-overlay maintitle d-flex flex-column align-items-end text-end">
          <h1 class="text-abril d-flex flex-column" style="color: #3B6C73;">
              <div> Memorial &nbsp;</div>
              <div> Nest </div>
          </h1>
          <div class="text-h4 mt-2"> 紀念巢</div>
          <p class="text-body-1 text-abril mt-2">A place to remember your loved ones.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="page-container" fluid>
    <div class="content-area text-snow text-center" justify="center" align="center" style="min-height: 1100px;">
      <div class="subtitle text-abril">About</div>
      <div class="subtitle-content text-abril text-h4">Lorvagni incidunt ea eius? Conimi autem eveniet e rsequi animi ut quidem ullam iure dicta aspernatur, tempore consequuntur praesentium quod cum earumas at non necessitatibus minus! Obcaecati blanditiis illo laudantium tempore?</div>
    </div>
  </v-container>
  <v-container class="page-container" fluid>
    <div class="content-area text-center" justify="center" align="center" style="min-height: 1050px;">
      <div class="thirdtitle text-abril">Story</div>
      <div class="thirdtitle-content text-abril text-h4">Lorvagni inciautritatis. Voluptatibus atque repellat corrupti ex sapiente sequi animi ut quidem ullam iure dicta aspernatur, tempore consequuntur praesentium quod cum earumas at non necessitatibus minus! Obcaecati blanditiis illo laudantium tempore?</div>
      <router-link to="/" class="d-flex align-center">
        <v-toolbar-title class="btn-explore text-abril">Explore</v-toolbar-title>
      </router-link>
      <router-link to="/login/" class="d-flex align-center">
        <v-toolbar-title class="btn-login text-abril">Login</v-toolbar-title>
      </router-link>
    </div>
  </v-container>

  <v-footer
    class="text-body-2 d-flex justify-center background-dark text-snow text-abril antFooter" height="50">
    <div>Contact Email:fung.8021@gmail.com</div>
    <div>2025 Memorial Nest 紀念巢</div>
  </v-footer>

</template>

<style scoped>

.text-body-1 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* 頁面容器：填滿視窗高度 */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保證頁面至少填滿視窗高度 */
  padding: 0;
  margin: 0;
  position: relative;
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
}

/* 固定在頁面底部的 Footer */
.antFooter {
  text-align: center;
  padding: 10px 0;
  width: 100%;
  margin-top: auto; /* 確保 footer 在頁面底部 */
  background-color: rgba(0, 0, 0, 0.5); /* 背景色透明 */
  z-index: 1; /* 確保 footer 在文字上方 */
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  /* 使用相對定位 */
  /* position: relative; */
  /* margin-right: 7rem; */
  /* margin-top: 1rem; */
  /* 使用絕對定位  */
  position: absolute;
  right: 7rem;
  bottom: 1rem;
}

.subtitle {
  font-size: 6rem;
  font-weight: 700;
  color: #C04759;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  /* background-color: red; */
  left: 8rem;
  top: 23rem;
  z-index: 1;
}

.subtitle-content {
  z-index: 1; /* 確保背景圖片在最底層 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  /* background-color: red; */
  text-align: center;
  width: 40rem;
  top: 34rem;
  left: 27rem;
  z-index: 1;
}

.thirdtitle {
  font-size: 6rem;
  font-weight: 700;
  color: #C04759;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  /* background-color: red; */
  right: 8rem;
  top: 0rem;
  z-index: 1;
}

.thirdtitle-content {
  z-index: 1; /* 確保背景圖片在最底層 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  /* background-color: red; */
  text-align: center;
  width: 40rem;
  top: 8rem;
  left: 23rem;
  z-index: 1;
}

.btn-explore {
  font-size: 3rem;
  line-height: 4rem;
  font-weight: 700;
  color: #C04759;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 38rem;
  top: 44rem;
  z-index: 2;
  text-decoration: none;
  /* background-color: red; */
}

.btn-login {
  font-size: 3rem;
  line-height: 4rem;
  font-weight: 700;
  color: #C04759;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 61rem;
  top: 36rem;
  z-index: 2;
  text-decoration: none;
  /* background-color: red; */
}

</style>

<route lang="yaml">
  meta:
    layout: empty
    login: false
    admin: false
    title: '歡迎'
</route>
