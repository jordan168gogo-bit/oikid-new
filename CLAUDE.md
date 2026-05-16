# OiKID 單字遊戲 — 專案說明（Claude Code 交接文件）

## 專案定位

- 給 3-12 歲小朋友玩的英文單字學習 web app
- 主要使用者年齡：5-8 歲（重度使用族群）
- 風格：童趣（橘粉漸層、emoji、泡泡圓角、吉祥物）
- 兩個模式：
  - **幼兒啟蒙版**（3-7 歲）：寵物、農場、聽音辨圖
  - **進階實戰版**（8-12 歲）：會考單字、文法、克漏字、閱讀理解

## 技術堆疊

- 前端：React + Vite + TypeScript + Tailwind CSS + framer-motion
- 後端：Supabase（DB + Auth + Edge Functions + Storage）
- 部署：Vercel（專案名 oikid-new-dmgf）
- Repo：GitHub jordan168gogo-bit/oikid-new

## ⚠️ 重要環境限制（請務必遵守）

**使用者的電腦沒有 Node.js，也不會用 Terminal。**

- 🚫 **不要**叫使用者跑 `npm install`、`npm run dev`、`npm run build` 之類的指令
- 🚫 **不要**叫使用者開 Terminal、CMD、PowerShell 做任何事
- 🚫 **不要**請使用者用 `git` 指令；他用 **GitHub Desktop** 處理所有 Git 操作（commit、push、pull）
- ✅ 你（Claude Code）可以直接讀寫 repo 裡的檔案——直接改就好，不要叫使用者複製貼上
- ✅ 部署流程：你改完檔案 → 使用者開 GitHub Desktop 看 diff → 按 Commit + Push → Vercel 自動部署
- ✅ Supabase Edge Function 部署是用 Supabase 後台網頁編輯器，不是 CLI

## Supabase 環境變數（程式碼裡的名稱）

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`（Legacy anon JWT 格式，eyJ... 開頭）

## Edge Functions

- **`ai-vocab`**：純粹的 Gemini 代理。前端傳 prompt + schema 進來，它打 Gemini 2.5 Flash-Lite，回傳結果。真正的題目 prompt 在前端各元件裡組成。
- **`ai-tts`**：Google Cloud TTS，含 Supabase Storage 快取（bucket = `tts-cache`，public）

Edge Function 的 secrets（已設定）：
- `GEMINI_API_KEY`
- `GOOGLE_TTS_API_KEY`

兩個 Edge Function 都已關閉 Verify JWT。

## 資料庫表

- `profiles`, `pets`, `learning_stats`, `achievements`, `login_dates`, `daily_missions`, `check_ins`, `farm_plots`
- `wrong_words`（錯題本：`user_id`, `word`, `chinese`, `wrong_count`, `correct_count`, `mastered`, `app_mode`, `source`）

## 帳號管理規則

- 自助註冊已關閉（前端拿掉註冊 tab + Supabase 後台關閉 sign up）
- 客戶帳號由站長手動在 Supabase Dashboard → Authentication → Users 建立
- 建帳號時要勾 **Auto Confirm User**

---

## 🎯 當前任務：優化「進階實戰版」

使用者要做兩件事，請按順序進行：

### 任務 A：題目品質升級（先做）

**為什麼先做：** 家長付費要的是「我的小孩能應付會考」，題目品質是核心賣點。

**重要先決事實（已調查過）**
- 克漏字題目**不是 AI 生成**，是靜態題庫——存在 `src/data/cloze-passages.ts`。要改題目品質就改這個檔案。
- 進階版的「進階（會考題型）」難度太簡單——例如：「Last Saturday ___ my birthday」（A. is / B. was / C. are / D. were），解析只寫「Last Saturday 過去式用 was」。這是國小高年級程度，對標榜「會考程度」來說落差大。
- 解析過短——沒有考點說明、沒有比較其他選項、沒有片語/同義詞延伸。
- 其他題庫也可能是靜態——請先看 `src/data/` 資料夾，理解現有題庫結構（克漏字、文法、單字卡 1826 字、閱讀理解等）。

**行動方向**
1. 先 **完整盤點 `src/data/` 裡所有題庫資料檔**，告訴使用者每個檔案：題目數量、難度分佈、解析品質。
2. 針對「會考程度」的題目，重寫一批高品質題目：
   - 難度貼齊國中會考 1200 字 / 高頻 2000 字
   - 每題附完整解析：中文翻譯 + 考點說明 + 為什麼不是其他選項 + 例句
   - 干擾選項要有意義（同詞性、相似拼字、易混淆語意）
   - 題型可以多樣化：時態、片語、介系詞、連接詞、同義詞、克漏字、閱讀填空
3. 如果題庫量太少，可以用 AI 一次性大量生成，然後**存進靜態題庫檔案**（不要每次答題都打 Gemini，耗 API 額度）

### 任務 B：UI 從童趣 → 學霸風（後做）

**為什麼後做：** 題目對了 UI 再改，避免做白工。

**重要先決事實**
- 進階版目前**完全沒有獨立視覺**，所有元件都用童趣版的 className：`bg-gradient-to-r from-game-purple to-game-blue`、`rounded-2xl`、`game-card border-t-8`、各種 emoji。對 8-12 歲小孩會顯得幼稚。

**視覺方向（已和使用者確認過）**
- **配色**：橘粉漸層 → 深藍/深紫 + 螢光點綴（電紫、青綠），可選 dark mode
- **字體**：圓潤 → Inter / Noto Sans TC（中性現代）
- **圓角**：`rounded-3xl` → `rounded-xl`（保留柔和但不卡通）
- **Emoji**：大幅減少 → 換成 lucide-react icons
- **動畫**：保留 framer-motion 但更克制（不要 spring 太誇張）
- **遊戲化**：加 XP 條、連勝 streak、難度標籤、解題秒數
- **整體 vibe**：Duolingo / Quizlet 那種「認真學習感」

**行動方向**
1. 看是否要為進階版做獨立的 Tailwind theme（例如 `from-advanced-indigo to-advanced-purple`）
2. 進階版的所有元件（HomeScreen 進階版 tab、ClozeTest、GrammarQuiz、ReadingComprehension、TextQuiz、SentenceBuilder 等）統一改視覺
3. **不要改童趣版**，幼兒啟蒙版維持現有橘粉風格

---

## 對話原則（使用者偏好）

- **用繁體中文回答**
- 不要走迴圈，確認一個事實後就繼續往下
- 有明顯最佳解就直接給步驟，不要列 A/B/C 選項浪費時間
- 使用者講話直接，不用一直道歉，專注解決問題
- 涉及金錢、API key、安全性時明確警告風險
- 改檔案就直接改，不要請使用者複製貼上大段程式碼

## 已完成的功能（不要重做）

- ✅ 童趣版部署到 Vercel（HomeScreen 橘粉漸層那版）
- ✅ AI 單字遊戲（Gemini 2.5 Flash-Lite，閱讀理解動態生成）
- ✅ Google Cloud TTS 語音 + Supabase Storage 快取
- ✅ 錯題本系統（ToddlerSpelling 和 AudioQuiz 會自動寫入）
- ✅ 自助註冊關閉（前端 + 後端雙層）

## 部署流程備忘

1. Claude Code 改檔案 → 存檔
2. 使用者開 GitHub Desktop → 看 diff → 寫 commit message → Push
3. Vercel 自動偵測新 commit → 自動部署
4. 等 1-2 分鐘 → 重新整理網站看結果
5. 如果改的是 Edge Function（在 `supabase/functions/` 底下），使用者要額外到 Supabase Dashboard → Edge Functions → 該 function → Code → 全選貼上新版 → 按 Deploy（GitHub commit 不會自動部署 Edge Function）
