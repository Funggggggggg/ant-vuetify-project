<template>
  <v-container class="page-container" fluid>
    <v-row class="text-snow text-center content-area ant-section" justify="center" align="center">
      <v-col cols="12">
        <div class="text-overlay">
          <h1 class="text-h4 text-abril">Welcome to Memorial Nest</h1>
          <p class="text-body-1 text-abril">A place to remember your loved ones</p>
        </div>
      </v-col>
      <v-col>
        <div>

        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-footer
    class="text-body-2 d-flex justify-center background-dark text-snow text-abril antFooter" height="50">
      2025 Memorial Nest 紀念巢
  </v-footer>
</template>

<style scoped>
/* 新增背景圖片區域 */
.ant-section {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-image: url('/antNest1.png');
  background-size: contain ;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px; /* 設定區域最小高度 */
  max-width: 1200px; /* 設置最大寬度，避免過大 */
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 避免圖片高度超過畫面，保持適應性 */
@media (max-width: 768px) {
  .ant-section {
    max-width: 90%;
    max-height: 300px;
    background-size: contain;
  }
}

/* 調整文字樣式 */
.text-h4 {
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

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
}

/* 主要內容區域：允許頁面內容擴展 */
.content-area {
  flex: 1; /* 擴展內容區域以填滿空間 */
}

/* 固定在頁面底部的 Footer */
.antFooter {
  color: #f1d87f;
  text-align: center;
  padding: 10px 0;
}
</style>

