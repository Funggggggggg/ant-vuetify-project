# 專題優化筆記

## 1. welcome 歡迎頁修改成 RWD 版本

- 一開始的版本中，沒有使用到響應式的手法設計網站，因此後續優化的第一步即是從此下手。
- **position 究竟適不適合使用？** => 對網站上需要的 RWD 構思不夠完整。

---

### RWD 觀念複習

| 特徵 | 說明 |
|------|------|
| **寬度**會跟著螢幕變 | `width: 100%` or `max-width: 1200px` |
| 文字會自動縮排換行 | `font-size` / `line-height` 有 RWD 設定 |
| 圖片或卡片會換行 | 用 Grid / Flex / Media Queries 控制 |
| 不用滑橫向卷軸 | 沒有畫面超出右邊的情況 |
| 手機版會疊成一欄 | `flex-direction: column` on mobile |

---

- 為什麼不能用 `position: absolute` 來做 RWD？

| 問題 | 為什麼會發生 |
|------|--------------|
| ❌ 元素固定在某個位置，不會根據螢幕變動 | 因為 `absolute` 是脫離文流，它不會被排版引擎影響 |
| ❌ 無法隨內容長度自動調整 | 你可能 top: 50px、left: 100px 是固定死的 |
| ❌ 內容變多時重疊 | 因為 absolute 無法自動撐開容器 |
| ❌ 無法做到 Grid / Flex 排版的響應排列 | absolute 無法讓元素自然流動換行 |

---

#### 在是否用 position 猶豫許久，最終使用如下

| 區塊名稱                         | 使用方式             | 描述說明                                                                 |
|----------------------------------|----------------------|--------------------------------------------------------------------------|
| `.content-area`（第一區塊）       | `position: relative` + `absolute` | 用來包 `video`，並使用絕對定位來控制遮罩影片的位置                       |
| `.video`                          | `position: absolute` | 使用固定位置 + `translate(-50%, -50%)` 進行遮罩影片的精準對齊             |
| `.maintitle`（紀念巢 + Nest）    | `flex-column` 手動排版 | 使用 `d-flex align-items-end` 但無 `v-row/v-col`，屬於手動排版(**明天調整**)            |
| `.area-second`                   | ✅ `v-row` + `v-col` | 完整使用 Vuetify Grid，且有居中對齊 class                                 |
| `.subtitle` / `.subtitle-content` | ✅ `v-col` 內包元素   | 各自放在 `cols="12"` 的欄位內，已標準化分層排版                           |
| `.area-third`                    | ✅ `v-row` + `v-col` | 同上，標準 Grid 結構，Explore/Login 也都包在 `v-col` 內，排版乾淨易控     |
| `.btn-explore` / `.btn-login`    | ✅ `router-link + v-col` | 屬於 Grid 裡的排版元件，沒有使用 position，完全彈性結構                      |

#### 重點

| 類型                | 建議用法                                                             |
|---------------------|----------------------------------------------------------------------|
| 需要視覺疊層、遮罩、特殊位置的區塊 | ✅ 使用 `position: absolute` + `relative` 搭配，像 `.video` |
| 一般文字、段落、按鈕排版        | ✅ 使用 `<v-row>` + `<v-col>` 最穩定且 RWD 友善            |
| 自訂區塊樣式                  | ✅ `class="d-flex justify-center"` 為補充排版可讀性            |

---

- RWD 推薦用法

| 功能 | 推薦用法 |
|------|-----------|
| 區塊排版 | `display: flex` / `grid` |
| 換行控制 | `flex-wrap` / `media queries` |
| 手機 → 單欄 | `@media (max-width: 768px)` 改為 column |
| 控制對齊 | `margin: auto`, `justify-content`, `align-items` |
| 占滿寬度 | `width: 100%`, `max-width` 搭配 `margin: auto` |

---

### 目前斷點結構整理如下

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

### 其他更正

#### 第一段 標題文字與影片

- 在使用 `z-index` 時，必須配合 **position: relative/ absolute/ fixed** 才生效。
- ⭐⭐⭐⭐ 影片（.video）會上下飄移！
- 原因

| 問題點 | 解釋 |
|--------|------|
| `top: 40rem` | 高度是寫死的（rem 是相對字體大小的單位），但畫面在不同裝置或方向下並不一致，所以會上下飄 |
| 外層容器非固定高度 | `.content-area` 沒有隨螢幕高度自動撐滿，因此 `.video` 不容易有固定參考位置 |
| 多重 `position: absolute` | 沒有使用好 `position: relative` 來限定參考範圍，導致影片以整個 `<body>` 為基準移動 |
| AOS 動畫干擾 | `data-aos="fade"` 加上動畫延遲時間，有時會「重新排版」或觸發一次 `layout shift` |

---

- 解法重點

| 做法 | 詳細 |
|------|------|
| ✅ **將 `.video` 的 `top` 改為 `vh` 單位** | 例如：`top: 50vh`，讓影片位置依照螢幕高度固定下來 |
| ✅ **確保 `.content-area` 或其外層是 `position: relative`** | 這樣 `.video { position: absolute }` 才會釘在這塊內部不亂飛 |
| ✅ **避免在影片容器內用 `AOS` 做 `fade + delay`** | 如果一定要加動畫，建議用 opacity + transition 取代，避免 layout shift |
| ✅ **善用 media query + `transform: translate` 修正各裝置** | 對 `top` 做補救微調很有幫助 |

---

#### 第二、三段

- 文字調整時出現斷行情形 => 用 css 語法 **word-break: keep-all;** 保持單詞不斷行。
- line-height: 1.8;   跟   line-height: 1.8rem; 有什麼不同？

| 語法 | 代表意思 | 優點 | 缺點 | 用在哪裡？ |
|------|---------|------|-----------|-----|
| line-height: 1.8; | 相對值 → 為「字體大小 × 1.8」的行高 |RWD 彈性好，跟字體一起變 | 較難精準控制對齊 | 內文段落、文章文字（推薦） |
| line-height: 1.8rem; | 絕對值 → 行高固定為「1.8rem（通常是 28.8px）」| 固定排版可控 | 在小字大字切換時會不自然 | 標題、特效、對齊需求精準的區塊 |

---
