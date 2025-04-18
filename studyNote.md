# 專題優化筆記

## 1. welcome 歡迎頁修改成 RWD 版本

一開始的版本中，沒有使用到響應式的手法設計網站，因此後續優化的第一步即是從此下手。

### 第一段 標題文字與影片

- 在文字位置及字型大小上花費了一些時間
- 在使用 z-index 時，必須配合 **position: relative/ absolute/ fixed** 才生效。

### 第二段 Secret

- 文字調整時出現斷行情形 => 用 css 語法 **word-break: keep-all;** 保持單詞不斷行。

### 第三段 Rebirth
