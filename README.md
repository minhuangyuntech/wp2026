# WP2026 — WordPress 完整教學課程網站

> 從零開始打造你的 WordPress 網站。系統化的 WordPress 教學課程，涵蓋安裝、Theme / Plugin 開發、SEO 與效能優化。

純 HTML / CSS / JavaScript 製作，可直接部署到 **GitHub Pages**，無需任何 build step。

---

## 線上預覽

部署完成後可在以下網址瀏覽：

```
https://minhuangyuntech.github.io/wp2026/
```

---

## 專案結構

```
wp2026/
├── index.html              # 首頁 (Hero + 課程概覽)
├── lessons.html            # 所有課程列表 (含分類篩選)
├── lessons/                # 個別教學內容頁
│   ├── 01-introduction.html
│   ├── 02-installation.html
│   ├── 03-dashboard.html
│   ├── 04-content.html
│   └── 05-themes-plugins.html
├── css/
│   └── style.css           # 全站樣式 (含深色模式)
├── js/
│   └── main.js             # 互動功能 (主題切換、TOC、進度條、篩選)
├── images/                 # 圖片資源 (預留)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions Pages 部署設定
├── .nojekyll               # 告訴 Pages 不使用 Jekyll
├── .gitignore
└── README.md
```

---

## 主要功能

- 響應式 (Responsive) 排版，桌機 / 平板 / 手機皆適用
- 深色 / 淺色模式切換 (記憶到 localStorage)
- 文章閱讀進度條
- 文章右側目錄 (TOC) + Scroll Spy
- 課程列表分類篩選（入門 / 進階 / 高階）
- 純靜態，無任何後端依賴
- 載入快、無 build step

---

## 上傳到 GitHub 並啟用 GitHub Pages

### 步驟 1：在 GitHub 建立 Repository

1. 登入 [GitHub](https://github.com/)，到組織 / 帳號 `minhuangyuntech` 頁面。
2. 點 **New repository**。
3. Repository name 填 `wp2026`。
4. 設定為 **Public**（GitHub Pages 免費版需要 Public repo）。
5. **不要** 勾選 "Initialize this repository with a README"（因為我們已經有檔案）。
6. 點 **Create repository**。

### 步驟 2：將本機檔案推送到 GitHub

在 `wp2026` 資料夾中開啟終端機（PowerShell / CMD / Git Bash），執行：

```bash
# 初始化 Git
git init
git branch -M main

# 加入遠端 repository
git remote add origin https://github.com/minhuangyuntech/wp2026.git

# 加入所有檔案並 commit
git add .
git commit -m "Initial commit: WP2026 WordPress tutorial site"

# 推送到 GitHub
git push -u origin main
```

> 若已安裝 GitHub Desktop，也可以直接拖曳資料夾、commit 後 push。

### 步驟 3：啟用 GitHub Pages

1. 進入 `minhuangyuntech/wp2026` repository 頁面。
2. 點 **Settings** → 左側選單 **Pages**。
3. 在 **Build and deployment** 區塊：
   - **Source**：選擇 **GitHub Actions**（不要選 Deploy from a branch）。
4. 儲存後，GitHub 會自動偵測 `.github/workflows/deploy.yml`。

### 步驟 4：自動部署

每當你 push 到 `main` 分支，Actions 就會自動執行：

1. 檢出程式碼
2. 將整個 repository 打包成 Pages artifact
3. 部署到 `https://minhuangyuntech.github.io/wp2026/`

可以在 repository 的 **Actions** 頁籤看到部署狀態。第一次部署約需 1–2 分鐘。

---

## 本地預覽

由於是純靜態網站，最簡單的方法是直接用瀏覽器開啟 `index.html`。
若想模擬伺服器環境（避免相對路徑問題），可在 `wp2026` 資料夾執行：

```bash
# 使用 Python 內建伺服器
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000
```

接著瀏覽 `http://localhost:8000`。

---

## 自訂與擴充

### 新增一個教學單元

1. 複製 `lessons/01-introduction.html` 為新檔名，例如 `lessons/06-block-theme.html`。
2. 修改 `<title>`、`<h1>`、文章內容、目錄與「上一單元 / 下一單元」連結。
3. 在 `index.html` 與 `lessons.html` 中對應的 `<article class="module-card">` 加入連結。

### 修改主題顏色

打開 `css/style.css`，找到 `:root` 區塊：

```css
:root {
  --color-primary: #2563eb;       /* 主色：藍 */
  --color-accent: #7c3aed;        /* 強調色：紫 */
  /* … */
}
```

調整這些 CSS 變數即可改變整站配色，包含深色模式。

---

## 授權

MIT License。歡迎 fork、修改、用於個人或商業用途。

---

## 作者

[minhuangyuntech](https://github.com/minhuangyuntech)
