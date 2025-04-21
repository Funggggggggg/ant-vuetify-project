# 專題優化筆記

## 1. welcome 歡迎頁修改成 RWD 版本

- 一開始的版本中，沒有使用到響應式的手法設計網站，因此後續優化的第一步即是從此下手。
- **position 究竟適不適合使用？** => 對網站上需要的 RWD 構思不夠完整。
- 對使用響應適的**單位**還不夠熟悉，需要確定。

---

## RWD 觀念複習

### ✅ RWD 的核心特色

| 特徵 | 說明 |
|------|------|
| **寬度**會跟著螢幕變 | `width: 100%` or `max-width: 1200px` |
| 文字會自動縮排換行 | `font-size` / `line-height` 有 RWD 設定 |
| 圖片或卡片會換行 | 用 Grid / Flex / Media Queries 控制 |
| 不用滑橫向卷軸 | 沒有畫面超出右邊的情況 |
| 手機版會疊成一欄 | `flex-direction: column` on mobile |

---

### 為什麼不能用 `position: absolute` 來做 RWD？

| 問題 | 為什麼會發生 |
|------|--------------|
| ❌ 元素固定在某個位置，不會根據螢幕變動 | 因為 `absolute` 是脫離文流，它不會被排版引擎影響 |
| ❌ 無法隨內容長度自動調整 | 你可能 top: 50px、left: 100px 是固定死的 |
| ❌ 內容變多時重疊 | 因為 absolute 無法自動撐開容器 |
| ❌ 無法做到 Grid / Flex 排版的響應排列 | absolute 無法讓元素自然流動換行 |

---

### RWD 正確該用什麼？

| 功能 | 推薦用法 |
|------|-----------|
| 區塊排版 | `display: flex` / `grid` |
| 換行控制 | `flex-wrap` / `media queries` |
| 手機 → 單欄 | `@media (max-width: 768px)` 改為 column |
| 控制對齊 | `margin: auto`, `justify-content`, `align-items` |
| 占滿寬度 | `width: 100%`, `max-width` 搭配 `margin: auto` |

---

### 為什麼轉換成橫式時整個跑版？

我是用 `Responsively App` 檢查我的 RWD ，在做最小尺寸的排版，但在轉換成橫式時整個跑版。
奇怪的是，我如果是直接用本機的 3000 埠網站縮放寬度，他並沒有跑掉，只是還要調整而已。為什麼轉換成橫式時整個跑版？
=> 主要是因為用了**固定定位** (absolute + rem) 和缺少對應 RWD 的**補救機制**。

---

你現在的 media query 設定整體來說非常清晰有邏輯 ✅  
我幫你一行一行仔細分析後，下面是詳細建議與整理。

---

## 目前斷點結構整理如下

| Media Query                     | 狀態 |
|--------------------------------|------|
| `@media (orientation: landscape)` | ✅ 手機橫式特別修正 |
| `@media (max-width: 576px)`    | ✅ 小手機版樣式 |
| `@media (min-width: 576px)`    | 寬度小於等於 576px 時生效 |
| `@media (min-width: 768px)`    | 寬度大於等於 576px 時生效 |
| `@media (max-width: 768px)`    | ✅ 手機版樣式 |
| `@media (min-width: 992px)`    | ✅ 桌機寬度設定，**內容良好** |
| `@media (min-width: 1200px)`   | 🟡 空的，**保留 OK** |
| `@media (min-width: 1450px)`   | ✅ 用於背景圖樣式，**OK** |
| `@media (min-width: 1880px)`   | 🟡 空的，**保留 OK** |

---

## 其他更正

### 第一段 標題文字與影片

- 在使用 `z-index` 時，必須配合 **position: relative/ absolute/ fixed** 才生效。

### 第二、三段

- 文字調整時出現斷行情形 => 用 css 語法 **word-break: keep-all;** 保持單詞不斷行。
