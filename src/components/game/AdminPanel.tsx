import React from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Sparkles, Loader2, FileText, Search, Library, Plus, X, Lightbulb } from 'lucide-react';

interface AdminPanelProps {
  appMode: string;
  vocabList: any[];
  setVocabList: (fn: any) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  importText: string;
  setImportText: (v: string) => void;
  handleImport: () => void;
  dictQuery: string;
  setDictQuery: (v: string) => void;
  dictLoading: boolean;
  dictResult: any;
  searchDictionary: () => void;
  addDictWordToVocab: () => void;
  aiTheme: string;
  setAiTheme: (v: string) => void;
  aiLoadingVocab: boolean;
  generateAIVocab: () => void;
  materialText: string;
  setMaterialText: (v: string) => void;
  isExtracting: boolean;
  extractVocabFromMaterial: () => void;
  filteredVocabList: any[];
}

const AdminPanel = ({
  appMode, vocabList, setVocabList, searchTerm, setSearchTerm,
  importText, setImportText, handleImport,
  dictQuery, setDictQuery, dictLoading, dictResult, searchDictionary, addDictWordToVocab,
  aiTheme, setAiTheme, aiLoadingVocab, generateAIVocab,
  materialText, setMaterialText, isExtracting, extractVocabFromMaterial,
  filteredVocabList
}: AdminPanelProps) => {
  const isClassic = appMode === 'classic';

  return (
    <motion.div
      className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Left: Add words */}
      <div className="flex flex-col gap-6">
        {/* AI Dictionary */}
        <div className="game-card border-game-purple/20 p-6 border-t-4 border-t-game-purple">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2 select-none">
            <Library className="text-game-purple" /> AI 英文字典
          </h2>
          <p className="text-muted-foreground mb-4 text-sm font-medium">不確定單字意思嗎？讓 AI 幫你查，還可以一鍵加入單字庫喔！</p>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={dictQuery}
              onChange={(e) => setDictQuery(e.target.value)}
              placeholder="請輸入英文單字..."
              className="flex-grow p-4 bg-muted/50 border border-border rounded-xl focus:border-game-purple focus:bg-card outline-none transition-colors"
              disabled={dictLoading}
              onKeyDown={(e) => e.key === 'Enter' && searchDictionary()}
            />
            <motion.button
              onClick={searchDictionary}
              disabled={dictLoading || !dictQuery.trim()}
              className="px-6 py-3 bg-gradient-to-r from-game-purple to-game-pink text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              whileTap={{ scale: 0.95 }}
            >
              {dictLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              查詢
            </motion.button>
          </div>
          {dictResult && (
            <motion.div
              className="bg-game-purple-light p-5 rounded-2xl border border-game-purple/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{dictResult.emoji}</span>
                  <span className="font-bold text-foreground text-2xl">{dictResult.english}</span>
                  {dictResult.pos && <span className="text-game-purple text-sm font-bold px-3 py-1 bg-game-purple/10 rounded-lg">{dictResult.pos}</span>}
                </div>
                <p className="text-muted-foreground font-medium text-lg">{dictResult.chinese}</p>
              </div>
              <motion.button
                onClick={addDictWordToVocab}
                className="w-full sm:w-auto px-6 py-3 bg-game-purple text-white font-bold rounded-xl shadow-md hover:bg-game-purple/90 transition-all flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} strokeWidth={3} /> 加入字庫
              </motion.button>
            </motion.div>
          )}
        </div>

        {isClassic && (
          <>
            {/* AI Material Extract */}
            <div className="game-card border-game-blue/20 p-6 border-t-4 border-t-game-blue">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText className="text-game-blue" /> 繪本教材抓單字
              </h2>
              <p className="text-muted-foreground mb-4 text-sm font-medium">貼上整段英文繪本或對話稿，讓 AI 自動幫你挑出核心單字並加上詞性！</p>
              <textarea
                value={materialText}
                onChange={(e) => setMaterialText(e.target.value)}
                placeholder="請貼上你要分析的教材內容..."
                className="w-full h-32 p-4 bg-muted/50 border border-border rounded-xl focus:border-game-blue focus:bg-card outline-none resize-none mb-3 transition-colors"
                disabled={isExtracting}
              />
              <motion.button
                onClick={extractVocabFromMaterial}
                disabled={isExtracting || !materialText.trim()}
                className="w-full py-3 bg-gradient-to-r from-game-blue to-game-indigo text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                {isExtracting ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {isExtracting ? "正在閱讀教材並抓取單字..." : "AI 幫我抓出單字"}
              </motion.button>
            </div>

            {/* AI Theme Generation */}
            <div className="game-card border-game-amber/20 p-6 border-t-4 border-t-game-amber">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="text-game-amber" /> AI 魔法主題單字
              </h2>
              <p className="text-muted-foreground mb-4 text-sm font-medium">輸入主題（例如「水果」、「動物」），AI 瞬間幫你生出含詞性與多重解釋的單字！</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiTheme}
                  onChange={(e) => setAiTheme(e.target.value)}
                  placeholder="例如：萬聖節..."
                  className="flex-grow p-4 bg-muted/50 border border-border rounded-xl focus:border-game-amber focus:bg-card outline-none transition-colors"
                  disabled={aiLoadingVocab}
                />
                <motion.button
                  onClick={generateAIVocab}
                  disabled={aiLoadingVocab || !aiTheme.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-game-amber to-game-orange text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                  whileTap={{ scale: 0.95 }}
                >
                  {aiLoadingVocab ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  {aiLoadingVocab ? "生成中" : "施展魔法"}
                </motion.button>
              </div>
            </div>
          </>
        )}

        {/* Manual import */}
        <div className="game-card border-border p-6 border-t-4 border-t-muted-foreground/30">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Upload className="text-muted-foreground" /> 批次快速新增單字
          </h2>
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            格式一：<code className="bg-muted px-1.5 py-0.5 rounded">英文,中文</code><br />
            格式二：<code className="bg-muted px-1.5 py-0.5 rounded">英文,詞性,中文</code>
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="貼上你的單字列表..."
            className="w-full h-32 p-4 bg-muted/50 border border-border rounded-xl focus:border-foreground/30 focus:bg-card outline-none resize-none mb-4 font-mono transition-colors"
          />
          <motion.button
            onClick={handleImport}
            className="w-full py-3 bg-foreground/80 text-card rounded-xl font-bold shadow-md hover:bg-foreground transition-all"
            whileTap={{ scale: 0.95 }}
          >
            立即匯入單字
          </motion.button>
        </div>
      </div>

      {/* Right: Word list */}
      <div className="game-card border-border p-6 border-t-4 border-t-foreground/20 flex flex-col max-h-[1050px]">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="text-foreground/70" />
              目前單字庫 ({appMode === 'toddler' ? '幼兒版' : '進階版'})
            </h2>
            <span className="bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-inner">
              共 {vocabList.length} 字
            </span>
          </div>
          <div className="relative w-full group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋英文單字或中文解釋..."
              className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-2xl focus:border-game-blue focus:bg-card focus:shadow-md outline-none transition-all font-medium text-foreground"
            />
            <Search className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-game-blue transition-colors" size={22} />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground bg-muted hover:bg-border rounded-full p-0.5 transition-colors">
                <X size={18} />
              </button>
            )}
          </div>
          <p className="text-sm text-game-amber bg-game-amber-light p-3 rounded-xl border border-game-amber/20 flex items-start gap-2">
            <Lightbulb className="shrink-0 mt-0.5 text-game-amber" size={18} />
            <span>為保護核心字庫不被誤刪，系統內建單字已隱藏刪除按鈕。只有透過左側「自己新增」的單字才可以刪除喔！</span>
          </p>
        </div>

        <div className="flex-grow overflow-y-auto mb-4 border border-border rounded-2xl p-2 bg-muted/20 relative">
          {vocabList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
              <BookOpen size={48} className="mb-3 opacity-30" />
              <p className="font-medium">目前沒有單字</p>
            </div>
          ) : filteredVocabList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
              <Search size={48} className="mb-3 opacity-30" />
              <p className="font-medium">找不到符合的單字</p>
            </div>
          ) : (
            <ul className="space-y-2 pr-2">
              {filteredVocabList.map((word: any) => {
                const isDefaultWord = word.id.startsWith('moe_');
                return (
                  <li key={word.id} className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-game-blue/30 transition-all group">
                    <div className="flex items-center gap-2 sm:gap-4 w-full min-w-0">
                      <span className="text-muted-foreground/40 text-sm font-bold w-6 sm:w-8 text-right shrink-0">{vocabList.findIndex((w: any) => w.id === word.id) + 1}.</span>
                      <span className="text-2xl w-8 text-center shrink-0">{word.emoji || '✨'}</span>
                      <span className="font-bold text-foreground text-lg sm:w-1/3 shrink-0 break-words pr-2">{word.english}</span>
                      {word.pos && (
                        <span className="text-game-orange text-xs font-bold px-2 py-1 bg-game-orange-light rounded-lg shrink-0 border border-game-orange/20 hidden sm:inline-block">
                          {word.pos}
                        </span>
                      )}
                      <span className="text-muted-foreground font-semibold flex-1 break-words leading-tight pl-2 border-l-2 border-border">{word.chinese}</span>
                    </div>
                    {!isDefaultWord && (
                      <button
                        onClick={() => setVocabList((prev: any[]) => prev.filter((w: any) => w.id !== word.id))}
                        className="text-destructive/60 hover:text-white hover:bg-destructive p-2 ml-2 shrink-0 bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="刪除自訂單字"
                      >
                        <X size={16} strokeWidth={3} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
