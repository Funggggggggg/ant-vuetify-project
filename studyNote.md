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
| `@media (min-width: 992px)`    | ✅ 桌機寬度設定，**內容良好** |
| `@media (min-width: 1200px)`   | 🟡 空的，**保留 OK** |
| `@media (min-width: 1450px)`   | ✅ 用於背景圖樣式，**OK** |
| `@media (min-width: 1880px)`   | 🟡 空的，**保留 OK** |

---

### 其他更正

#### 第一段 標題文字與影片

- 在使用 `z-index` 時，必須配合 **position: relative/ absolute/ fixed** 才生效。
- ⭐⭐⭐⭐ 影片（.video）會上下飄移！

| 問題類型 | 具體問題現象 | 原因說明 | 解法與實作建議 |
|----------|---------------|-----------|----------------|
| ① 定位錯誤 | `video` 一直「飛到 Secret 上面」或「遮住文字」 | 使用 `position: absolute` 卻沒有相對定位的容器（`relative` parent），或 `top` 設得太靠近內容 | ✅ 為 `video` 包一層 `.video-wrapper`，並確保 `.video-wrapper` 是 `position: relative` 的容器，讓 `top: 450px` 有錨點依附 |
| ② 響應式飄移 | 影片在不同螢幕寬度下會亂飄、左右偏移 | `left: 50% + transform: translate(-50%)` 是相對於 `100vw` 計算，隨視窗縮放位置會變動 | ✅ 改用 `.video-wrapper { left: 0; margin: auto; max-width: 1200px; }` 限制最大寬度，或使用 `left: 50%; transform: translateX(-50%)` 並搭配固定的容器寬度 |
| ③ 無法捲動 / 影片被截斷 | 加了影片卻整頁無法捲動，畫面被截斷 | `.background-defalt` 使用 `position: absolute` + `height: 100vh`，無法撐開空間 | ✅ 加上 `.background-defalt::after { height: 100vh }` 人為撐高空間，或讓 `.video-wrapper` 進入一般文流中 |
| ④ `mask` 沒有效果 | 影片未遮罩、或遮罩只遮了部分 | `mask` 設定錯誤：需設定 `mask-size`, `no-repeat`, `center`，或圖檔本身透明區域不對 | ✅ 確保圖片 `/mask.png` 是白底黑透，並設定 `mask: url('/mask.png') no-repeat center;` 和 `mask-size: contain` |
| ⑤ 影片邊框或亮邊 | `video` 外圍出現亮框或背景色突兀 | `.video` 有預設邊界 / overflow 未處理，或影片尺寸與 `mask` 不合 | ✅ 加上 `border: none; overflow: hidden; background: transparent`，或使用 `clip-path` / container 修正邊緣裁切 |
| ⑥ `object-fit` 沒作用 | 影片沒有自適應容器、拉伸或變形 | 需同時設定 `width: 100%`, `height: 100%`，並加上 `object-fit: cover` 或 `contain` | ✅ `.video video` 設定為 `width: 100%; height: 100%; object-fit: cover` |

---

#### 第二、三段

- 文字調整時出現斷行情形 => 用 css 語法 **word-break: keep-all;** 保持單詞不斷行。
- line-height: 1.8;   跟   line-height: 1.8rem; 有什麼不同？

| 語法 | 代表意思 | 優點 | 缺點 | 用在哪裡？ |
|------|---------|------|-----------|-----|
| line-height: 1.8; | 相對值 → 為「字體大小 × 1.8」的行高 |RWD 彈性好，跟字體一起變 | 較難精準控制對齊 | 內文段落、文章文字（推薦） |
| line-height: 1.8rem; | 絕對值 → 行高固定為「1.8rem（通常是 28.8px）」| 固定排版可控 | 在小字大字切換時會不自然 | 標題、特效、對齊需求精準的區塊 |

---

- `<router-link>`的底線 (`underline`) 消不掉

問題核心是：
Vue Router 會自動在 `<router-link>` 產生預設的 `<a>` 標籤。

而在瀏覽器的預設行為裡，**`<a>` 標籤天生有 `text-decoration: underline;`**
因此，外面 `v-col` 設 `text-decoration: none` ➔ **沒影響裡面的 `<router-link>`**
裡面的 `v-toolbar-title` 也不會直接影響到 `<router-link>` 的 `underline`
所以要控制的是 `a`，不是 `div`、不是 `v-col`
消除須直接針對**直接針對 `<router-link>` 本身加上 `text-decoration: none`**

 HTML 結構如下：

```js
<router-link to="/" class="d-flex align-center">
  <v-toolbar-title class="btn-explore text-abril">Explore</v-toolbar-title>
</router-link>
```

轉成真實 DOM 時，會變成：

```js
<a href="/" class="d-flex align-center router-link-active">
  <div class="v-toolbar-title btn-explore text-abril">Explore</div>
</a>
```

< a > 是真正有底線的，.btn-explore 是套在 < div > 上的，沒有改到 < a >。
最終解法：將放 text-decoration: none !important; 的 class 放到 router-link 上。

---

### 4/28

- 寬度超過 1190px 之後背景圖就停止放大？
因為我在 @media (min-width: 992px) 中設置了 .container { max-width:1200px }

- video 又跑版，還沒調整好。 => vw 單位不適合設置嗎？
  在 764px 時 video 會跟下面的 secret 重疊，為什麼？為什麼會往下掉？而不是乖乖待在指定位置，是否要重設回 position 呢？

- 解決 video 在 776px 之後背景的兩個顏色區域之邊界即現行
    => 改為同一種顏色背景？

- 是否 video 跟第一區塊的背景要用 position 固定高度，同時使用固定單位，才能在縮放時不會飄移？

---

請 ChatGPT 幫我檢查 code 問題：

| 元件        | 正確作法                  | 原本混亂處                     |
|------------|---------------------------|-------------------------------|
| `.background-wrapper` | 背景鋪滿畫面，不受 container 限制 | 背景和 container 混一起，易錯 |
| `.container` | 控制「內容最大寬度」(如 1200px)，居中 | 有時 container 裡又塞背景 |
| `.content-area` | 包裹每個內容區（可用 flex 撐高） | 正常，但 row/col 混在 background 裡 |
| `.video` | 位置絕對、寬度100vw、左50% | 固定 top: rem 容易跑掉，需要優化 |

重點邏輯：

- 背景圖、遮罩、影片這些 ➔ 全放 `.background-wrapper` ➔ 蓋整個畫面。
- 內層 `<v-container>` ➔ 控制最大寬度（1200px），居中排版。
- `<v-row><v-col>` 正常 RWD，負責內文排版。
- **不要在 container 裡面又放絕對定位的東西**（避免背景與內容互相影響）。

---

### 4/29 除錯整理表

| 問題編號 | 問題描述 | 原因分析 | 解法 / 調整說明 |
|----------|-----------|-----------|------------------|
| 1 | 畫面無法滾動 | `.background-defalt` 設定 `height: 100vh`、`position: absolute`，導致內容區域無高度撐開 | 用 `::after` 虛擬元素預留捲動空間：`height: 100vh` |
| 2 | video 跑版、在不同解析度會「亂飄」 | 使用 `position: absolute` 並搭配 `vw` / `vh` 設定會受視窗變化影響，尤其影片沒有容器做定位基準 | 建議影片放入 `.video-wrapper` 容器內，該容器設 `position: relative` 作為定位依附 |
| 3 | `.section-*` 無法置中 | 原本 `.v-container` 有內邊距，section 裡文字沒滿版，無法垂直置中 | 改用 `.section` div 自己負責版面，並使用 `flex + align-items + justify-content` 做置中處理 |
| 4 | `.video` 出現多餘邊框、形狀不對 | 影片未正確被 mask 控制，或 `mask` 設定的 `size/position` 不一致 | 使用 `-webkit-mask` 和 `mask` 指定圖片並設 `no-repeat center`，視需要可再設 `mask-size: contain` |
| 5 | `.video` 蓋到文字或擋住區塊 | `.video` 的 z-index / top 設定不當 | 控制 `.video` 的 `z-index` 為負值，並精確設定 `top`，避免蓋到 `.section-*` 區域 |
| 6 | `.page-wrapper` 刪除會導致排版跑掉 | 原來很多結構依賴 `<v-container>` 排版與 spacing | 改用 `.section` div 時需重新補足 padding / max-width / margin 控制區塊寬度與對齊 |

---
5/4

我不懂 我都用絕對定位了 為什麼會飄?

你用得**沒錯**——你對 `.video-wrapper` 和 `.video` 元素用了 `position: absolute`，**理論上應該固定位置**。但你遇到「影片會隨視窗高度改變而飄移」的情況，這表示「影片的定位 `top: 570px` 是寫死的」，這就是根本問題的來源。

---

## 🧠 問題根源分析（你想「固定」，但實際上它是「寫死」）

```css
.video {
  position: absolute;
  top: 570px; /* ❌ 這是問題所在 */
  left: 50%;
  transform: translateX(-50%);
}
```

這段意思是：

> 無論視窗多高，影片都從 `top = 570px` 的位置開始。

結果是：

- 在大視窗：你覺得位置「正常」。
- 在小視窗：上面空間變少，整體畫面縮短，`top: 570px` 把影片推出畫面，看起來就「飄」了。

---

### ✅ 解法：用「視窗相對高度」而非寫死 px 值

#### ✅ 替代方案：用 `vh` 百分比單位（例如 top: 60vh）

```css
.video {
  position: absolute;
  top: 60vh; /* ✅ 相對於視窗高度 */
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: auto;
  object-fit: cover;
  -webkit-mask: url('/mask.png') no-repeat center;
  mask: url('/mask.png') no-repeat center;
}
```

這樣就會根據 **不同裝置高度** 自動調整影片位置，不會再「飄移」或「太早 / 太晚出現」。

---

#### 🔧 如果你真的想精準微調…

你可以混合 `calc()` 使用，例如：

```css
top: calc(60vh - 100px); /* 根據視窗高度，再微調固定偏移 */
```

---

#### ✅ 總結：你該怎麼改？

改 `.video` 的 `top: 570px`：

```css
.video {
  position: absolute;
  top: 60vh; /* ✅ 重點是不要寫死 pixel */
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 最終版本

一段影片「永遠」出現在某個確切的「畫面位置」，無論螢幕怎麼變動，它就是完全固定在那個點，就像貼死在那裡，不要跟著其他元素走、不要變高變低、不飄移，不被文流、padding、scroll、flex 搞亂。

### 正確做法：用 position: fixed + left/top + transform

```css
.video {
  -webkit-mask: url('/mask.png') no-repeat center;
  mask: url('/mask.png') no-repeat center;
  position: fixed;
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 1800px;
  object-fit: cover;
  z-index: 1000;
}
```

---
整理如下表格，總結你這幾天在調整 `<video>` 元素位置時，遇到的常見問題與對應解法：

---

### 🎬 `<video>` 定位問題與解法整理表

| 問題類型 | 描述 | 原因 | 解決方法 | 重點 CSS |
|----------|------|------|------------|-----------|
| 飛走 / 飄移 | `<video>` 本來好好的，改了別的元素後位置跑掉 | 使用 `position: absolute` 受父層影響，或 layout 變動 | 改用 `position: fixed` 脫離文流 | `position: fixed; top: Ypx; left: 50%; transform: translateX(-50%)` |
| 被裁掉 | 影片本來完整，後來上下被切掉 | 父層或上層元素有 `overflow: hidden` | 讓 `<video>` **不被包在任何有 overflow 的容器內** | `position: fixed;` 並讓其不在被裁範圍內 |
| 不置中 | 視覺上影片偏左或偏右 | `left` 單用會以左上角對齊 | 加上 `transform: translateX(-50%)` | `left: 50%; transform: translateX(-50%)` |
| 被其他元素擋住 | 看不到影片，或影片底下被蓋住 | `z-index` 不夠高，或其他元素有 `position` | 給 `<video>` 加 `z-index: 999`（甚至更高） | `z-index: 1000;` |
| 無法互動（或不該互動） | 點不到 `<video>`，或點影片會擋住下層按鈕 | pointer 事件問題 | 用 `pointer-events: none` 禁止影片遮住點擊 | `pointer-events: none;` |
| 跟著滑動 | 影片不是固定在視窗內，而是滑上滑下 | 用了 `absolute` 或其他 layout 定位 | 改成 `fixed` | `position: fixed;` |
| 重複設定影響結果 | 看似一樣的 CSS 卻有時失效 | 順序錯誤、被 override、選擇器不夠強 | 使用唯一 `.video` class 並確認優先順序 | 使用明確 class 並檢查 DevTools |

---

### ✅ 最推薦配置：

```css
.video {
  position: fixed;
  top: 570px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: auto;
  object-fit: cover;
  z-index: 1000;
  pointer-events: none;
}
```

---

需要我幫你把這些整理成一個 Markdown 或 PDF 方便保存？  
或者要不要我幫你做個 HTML + CSS 的對照 Demo 展示每種錯誤情境？

**a.** 要我幫你做一個錯誤對照 Demo（錯誤 vs 正確）看得更清楚嗎？  
**b.** 要將這份表格存成可下載的 PDF 或 Markdown 文件嗎？