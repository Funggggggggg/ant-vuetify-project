 Lighthouse 報告：

上面的四個分數分別代表：

* **28（Performance）效能分數**：這是唯一偏低的項目，代表你的頁面載入速度與互動流暢度需要優化。
* **92（Accessibility）無障礙設計分數**：整體對不同使用者群體算是友善，但還有小地方可改善。
* **100（Best Practices）最佳實踐分數**：程式碼安全性與現代化程度滿分。
* **91（SEO）搜尋引擎最佳化分數**：整體 SEO 狀況很好，只差一些細節可達滿分。

---

**效能（Performance）問題分析**

1. **Minimize main-thread work（縮短主執行緒工作時間）— 9.7 秒**

   * 主執行緒工作時間過長，通常是因為 JS 檔案過大、計算過多或渲染邏輯太複雜。
   * 解法：拆分 JS、用 lazy loading 載入不立即需要的功能、優化迴圈與 DOM 操作。

2. **Largest Contentful Paint element（最大內容元素繪製時間）— 16.13 秒**

   * 頁面主要內容（可能是圖片、Banner、主要文字）載入非常慢。
   * 解法：壓縮圖片、使用 next-gen 格式（WebP/AVIF）、預載關鍵圖片（`<link rel="preload">`）。

3. **Eliminate render-blocking resources（移除渲染阻塞資源）— 可省 900ms**

   * 有 CSS/JS 檔案在頁面初始載入時阻塞了渲染。
   * 解法：對非關鍵 CSS 用 `media` 屬性延遲載入、將非必要 JS 用 `defer` 或 `async`。

4. **Reduce JavaScript execution time（減少 JS 執行時間）— 3.9 秒**

   * JS 程式碼執行太久。
   * 解法：拆分成多個小模組，延遲載入不立即需要的 JS。

5. **Reduce unused CSS（刪除未使用的 CSS）— 約 528 KiB**

   * 頁面載入了很多沒用到的 CSS（可能是 UI 套件的整包）。
   * 解法：使用工具（PurgeCSS、unCSS）刪掉沒用的樣式，或改成只載入需要的部分。

6. **Reduce unused JavaScript（刪除未使用的 JS）— 約 3,446 KiB**

   * 載入了大量沒用到的 JS。
   * 解法：動態載入需要的功能模組（code splitting）、移除不必要的套件。

7. **Minify CSS / Minify JavaScript（壓縮 CSS/JS）**

   * 還有少量 CSS/JS 沒壓縮，雖然影響不大，但壓縮後檔案會更小。

---

**黃色警告（影響較小）**

* **Serve static assets with an efficient cache policy**

  * 靜態資源快取設定不足，有 13 個資源可以設定更長的快取時間（`Cache-Control` header）。
* **Ensure text remains visible during webfont load**

  * 字型載入時，文字可能會短暫消失（FOIT），可在 CSS 加上 `font-display: swap` 改善。
* **Warning**

  * Lighthouse 沒能檢查 `font-display` 值，可能是跨網域字型檔限制。

---
