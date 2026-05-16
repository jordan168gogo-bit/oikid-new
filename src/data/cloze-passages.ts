export interface ClozePassage {
  id: number;
  title: string;
  passage: string;
  blanks: {
    index: number;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  difficulty: 'beginner' | 'advanced';
}

export const CLOZE_BANK: ClozePassage[] = [
  // =============================================
  // ===== 初級 (beginner) — 16 篇 =====
  // =============================================
  {
    id: 1, difficulty: 'beginner', title: 'My Pet Dog',
    passage: 'I have a pet dog. __(1)__ name is Lucky. He __(2)__ very cute. Every morning, I take him __(3)__ a walk. He likes __(4)__ in the park.',
    blanks: [
      { index: 1, options: ['He', 'His', 'Him', 'Her'], correctIndex: 1, explanation: '名詞前面用所有格 His。' },
      { index: 2, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'He 是第三人稱單數，用 is。' },
      { index: 3, options: ['to', 'for', 'in', 'at'], correctIndex: 1, explanation: 'take someone for a walk 是固定用法。' },
      { index: 4, options: ['run', 'runs', 'running', 'ran'], correctIndex: 2, explanation: 'likes + V-ing（喜歡跑步）。' },
    ],
  },
  {
    id: 2, difficulty: 'beginner', title: 'My School Day',
    passage: 'I __(1)__ up at seven every day. After breakfast, I go to school __(2)__ bus. My favorite subject __(3)__ English. I __(4)__ my homework after dinner.',
    blanks: [
      { index: 1, options: ['get', 'gets', 'got', 'getting'], correctIndex: 0, explanation: '主詞 I 現在簡單式用原形 get。' },
      { index: 2, options: ['by', 'on', 'in', 'at'], correctIndex: 0, explanation: '搭乘交通工具用 by。' },
      { index: 3, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: '主詞 subject 是單數，用 is。' },
      { index: 4, options: ['do', 'does', 'did', 'doing'], correctIndex: 0, explanation: '主詞 I 用 do。' },
    ],
  },
  {
    id: 3, difficulty: 'beginner', title: 'At the Zoo',
    passage: 'Yesterday, we __(1)__ to the zoo. There __(2)__ many animals. I saw two __(3)__. They were __(4)__ bamboo.',
    blanks: [
      { index: 1, options: ['go', 'goes', 'went', 'going'], correctIndex: 2, explanation: 'yesterday 用過去式 went。' },
      { index: 2, options: ['is', 'are', 'was', 'were'], correctIndex: 3, explanation: 'many animals 是複數，過去式用 were。' },
      { index: 3, options: ['panda', 'pandas', 'panda\'s', 'pandaes'], correctIndex: 1, explanation: 'two + 複數名詞 pandas。' },
      { index: 4, options: ['eat', 'eats', 'eating', 'ate'], correctIndex: 2, explanation: 'were + V-ing 過去進行式。' },
    ],
  },
  {
    id: 4, difficulty: 'beginner', title: 'My Family',
    passage: 'There __(1)__ five people in my family. My father __(2)__ a teacher. My mother works __(3)__ a hospital. I have __(4)__ younger sister.',
    blanks: [
      { index: 1, options: ['is', 'are', 'was', 'were'], correctIndex: 1, explanation: 'five people 是複數，用 are。' },
      { index: 2, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'My father 第三人稱單數，用 is。' },
      { index: 3, options: ['in', 'on', 'at', 'to'], correctIndex: 2, explanation: '在醫院工作用 at a hospital。' },
      { index: 4, options: ['a', 'an', 'the', '—'], correctIndex: 0, explanation: '第一次提到用不定冠詞 a。' },
    ],
  },
  {
    id: 5, difficulty: 'beginner', title: 'A Rainy Day',
    passage: 'It __(1)__ raining this morning. I __(2)__ bring my umbrella. I got very __(3)__. When I got home, Mom gave __(4)__ a warm towel.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: 'this morning（已過去），用 was。' },
      { index: 2, options: ['don\'t', 'doesn\'t', 'didn\'t', 'wasn\'t'], correctIndex: 2, explanation: '過去式否定用 didn\'t。' },
      { index: 3, options: ['wet', 'wetting', 'wetter', 'wetly'], correctIndex: 0, explanation: 'got + 形容詞 wet。' },
      { index: 4, options: ['I', 'my', 'me', 'mine'], correctIndex: 2, explanation: '動詞後面用受格 me。' },
    ],
  },
  {
    id: 6, difficulty: 'beginner', title: 'Shopping',
    passage: 'Mom and I went __(1)__ yesterday. She bought __(2)__ apples and some milk. The apples __(3)__ very fresh. I __(4)__ Mom carry the bags.',
    blanks: [
      { index: 1, options: ['shop', 'shopped', 'shopping', 'shops'], correctIndex: 2, explanation: 'go shopping 是固定用法。' },
      { index: 2, options: ['a', 'an', 'some', 'any'], correctIndex: 2, explanation: '肯定句用 some。' },
      { index: 3, options: ['is', 'was', 'are', 'were'], correctIndex: 3, explanation: 'apples 複數過去式用 were。' },
      { index: 4, options: ['help', 'helped', 'helps', 'helping'], correctIndex: 1, explanation: '過去式用 helped。' },
    ],
  },
  {
    id: 7, difficulty: 'beginner', title: 'My Best Friend',
    passage: 'Amy is my best friend. She is __(1)__ than me. She __(2)__ long hair and big eyes. We always play __(3)__ after school. She is good __(4)__ math.',
    blanks: [
      { index: 1, options: ['tall', 'taller', 'tallest', 'more tall'], correctIndex: 1, explanation: '兩者比較用比較級 taller。' },
      { index: 2, options: ['have', 'has', 'had', 'having'], correctIndex: 1, explanation: 'She 第三人稱單數用 has。' },
      { index: 3, options: ['together', 'today', 'tomorrow', 'total'], correctIndex: 0, explanation: '一起玩用 together。' },
      { index: 4, options: ['in', 'on', 'at', 'of'], correctIndex: 2, explanation: 'be good at 擅長。' },
    ],
  },
  {
    id: 8, difficulty: 'beginner', title: 'The Weather',
    passage: 'Today is a __(1)__ day. The sun is __(2)__ brightly. It is __(3)__ than yesterday. Let\'s go to the __(4)__ and swim!',
    blanks: [
      { index: 1, options: ['sun', 'sunny', 'sunning', 'sunned'], correctIndex: 1, explanation: '修飾名詞 day 用形容詞 sunny。' },
      { index: 2, options: ['shine', 'shines', 'shining', 'shone'], correctIndex: 2, explanation: 'is + V-ing 現在進行式。' },
      { index: 3, options: ['hot', 'hotter', 'hottest', 'more hot'], correctIndex: 1, explanation: '兩者比較用 hotter。' },
      { index: 4, options: ['pool', 'school', 'library', 'church'], correctIndex: 0, explanation: '去游泳當然是去 pool（游泳池）。' },
    ],
  },
  {
    id: 9, difficulty: 'beginner', title: 'My Room',
    passage: 'I have __(1)__ own room. There is a bed __(2)__ a desk in it. My books are __(3)__ the shelf. I always keep my room __(4)__.',
    blanks: [
      { index: 1, options: ['I', 'me', 'my', 'mine'], correctIndex: 2, explanation: '名詞前面用所有格 my。' },
      { index: 2, options: ['and', 'but', 'or', 'so'], correctIndex: 0, explanation: '「和」用 and。' },
      { index: 3, options: ['in', 'on', 'at', 'under'], correctIndex: 1, explanation: '在架子上用 on。' },
      { index: 4, options: ['clean', 'cleaning', 'cleaned', 'cleans'], correctIndex: 0, explanation: 'keep + 受詞 + 形容詞。' },
    ],
  },
  {
    id: 10, difficulty: 'beginner', title: 'Breakfast',
    passage: 'I usually __(1)__ breakfast at 7:30. I like __(2)__ eggs and toast. My sister __(3)__ like eggs. She eats cereal __(4)__.',
    blanks: [
      { index: 1, options: ['eat', 'eats', 'ate', 'eating'], correctIndex: 0, explanation: '主詞 I 現在式用原形 eat。' },
      { index: 2, options: ['eat', 'eats', 'eating', 'ate'], correctIndex: 2, explanation: 'like + V-ing。' },
      { index: 3, options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 1, explanation: '第三人稱單數否定用 doesn\'t。' },
      { index: 4, options: ['instead', 'also', 'too', 'already'], correctIndex: 0, explanation: '改吃穀片「代替」用 instead。' },
    ],
  },
  {
    id: 11, difficulty: 'beginner', title: 'The Park',
    passage: 'There __(1)__ a beautiful park near my house. Many children __(2)__ there every weekend. I like to __(3)__ my bike there. The flowers in the park __(4)__ very pretty.',
    blanks: [
      { index: 1, options: ['is', 'are', 'was', 'were'], correctIndex: 0, explanation: 'a park 單數用 There is。' },
      { index: 2, options: ['play', 'plays', 'played', 'playing'], correctIndex: 0, explanation: '複數主詞現在式用原形 play。' },
      { index: 3, options: ['ride', 'rides', 'riding', 'rode'], correctIndex: 0, explanation: 'like to + 原形動詞。' },
      { index: 4, options: ['is', 'are', 'was', 'were'], correctIndex: 1, explanation: 'flowers 複數用 are。' },
    ],
  },
  {
    id: 12, difficulty: 'beginner', title: 'A Birthday Party',
    passage: 'Last Saturday __(1)__ my birthday. My mom __(2)__ a cake for me. Many friends __(3)__ to my party. We __(4)__ a great time together.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: 'Last Saturday 過去式用 was。' },
      { index: 2, options: ['make', 'makes', 'made', 'making'], correctIndex: 2, explanation: '過去式用 made。' },
      { index: 3, options: ['come', 'comes', 'came', 'coming'], correctIndex: 2, explanation: '過去式用 came。' },
      { index: 4, options: ['have', 'has', 'had', 'having'], correctIndex: 2, explanation: '過去式用 had。' },
    ],
  },
  {
    id: 13, difficulty: 'beginner', title: 'My Teacher',
    passage: 'My English teacher is Ms. Wang. She __(1)__ very kind. She always __(2)__ us interesting stories. We all __(3)__ her class. She __(4)__ us learn English is fun.',
    blanks: [
      { index: 1, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'She 第三人稱單數用 is。' },
      { index: 2, options: ['tell', 'tells', 'told', 'telling'], correctIndex: 1, explanation: '第三人稱單數現在式加 -s。' },
      { index: 3, options: ['like', 'likes', 'liked', 'liking'], correctIndex: 0, explanation: '主詞 We 用原形 like。' },
      { index: 4, options: ['make', 'makes', 'made', 'making'], correctIndex: 1, explanation: '第三人稱 makes us learn。' },
    ],
  },
  {
    id: 14, difficulty: 'beginner', title: 'Going to the Movies',
    passage: 'My brother and I __(1)__ going to see a movie tomorrow. We will __(2)__ the 3 o\'clock show. I am very __(3)__ about it. I hope the movie __(4)__ good.',
    blanks: [
      { index: 1, options: ['am', 'is', 'are', 'be'], correctIndex: 2, explanation: '複數主詞用 are。' },
      { index: 2, options: ['watch', 'watches', 'watched', 'watching'], correctIndex: 0, explanation: 'will + 原形動詞。' },
      { index: 3, options: ['excite', 'excited', 'exciting', 'excitedly'], correctIndex: 1, explanation: '人的感受用 excited。' },
      { index: 4, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'the movie 單數用 is。' },
    ],
  },
  {
    id: 15, difficulty: 'beginner', title: 'My Cat',
    passage: 'I have a cat __(1)__ Mimi. She __(2)__ to sleep on my bed. __(3)__ tail is long and fluffy. She is the __(4)__ pet in the world.',
    blanks: [
      { index: 1, options: ['name', 'named', 'names', 'naming'], correctIndex: 1, explanation: '「名叫」用 named。' },
      { index: 2, options: ['like', 'likes', 'liked', 'liking'], correctIndex: 1, explanation: '第三人稱單數用 likes。' },
      { index: 3, options: ['She', 'Her', 'Hers', 'She\'s'], correctIndex: 1, explanation: '名詞前面用所有格 Her。' },
      { index: 4, options: ['cute', 'cuter', 'cutest', 'cutely'], correctIndex: 2, explanation: '最高級 the cutest。' },
    ],
  },
  {
    id: 16, difficulty: 'beginner', title: 'Helping at Home',
    passage: 'Every Saturday, I help my parents __(1)__ the house. I __(2)__ the dishes after lunch. My sister __(3)__ the floor. We __(4)__ happy when the house is clean.',
    blanks: [
      { index: 1, options: ['clean', 'cleans', 'cleaned', 'cleaning'], correctIndex: 0, explanation: 'help + 受詞 + 原形動詞。' },
      { index: 2, options: ['wash', 'washes', 'washed', 'washing'], correctIndex: 0, explanation: '主詞 I 現在式用原形。' },
      { index: 3, options: ['sweep', 'sweeps', 'swept', 'sweeping'], correctIndex: 1, explanation: '第三人稱單數加 -s。' },
      { index: 4, options: ['feel', 'feels', 'felt', 'feeling'], correctIndex: 0, explanation: '主詞 We 用原形 feel。' },
    ],
  },

  // =============================================
  // ===== 進階 (advanced) — 16 篇 =====
  // =============================================
  {
    id: 101, difficulty: 'advanced', title: 'A Trip to Japan',
    passage: 'Last summer, my family __(1)__ to Japan. We __(2)__ there for a week. The food __(3)__ delicious, and the people were very __(4)__. I hope I can go there again.',
    blanks: [
      { index: 1, options: ['go', 'goes', 'went', 'have gone'], correctIndex: 2, explanation: `🌐 句意：去年夏天，我們全家去了日本。
🎯 考點：Last summer 是明確過去時間 → 過去式 went。
❌ 為什麼不選：
  • go — 原形現在式，與 Last summer 衝突。
  • goes — 第三人稱單數現在式。
  • have gone — 現在完成式不搭明確過去時間。
💡 延伸：明確過去時間（yesterday / last + 時段 / in + 過去年份 / ago）只能搭過去式，不可搭完成式。` },
      { index: 2, options: ['stay', 'stayed', 'have stayed', 'were staying'], correctIndex: 1, explanation: `🌐 句意：我們在那裡待了一週。
🎯 考點：與前一句時態一致（Last summer），用過去式 stayed。
❌ 為什麼不選：
  • stay — 原形不合時態。
  • have stayed — 完成式不搭明確過去時間。
  • were staying — 過去進行式強調「正在進行被打斷」，本句只敘述完整事件。
💡 延伸：for + 時段（for a week）可搭過去式（過去完成的時段）或完成式（持續到現在）。` },
      { index: 3, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: `🌐 句意：食物很好吃。
🎯 考點：與全段時態一致（過去式描述），food 不可數視為單數 → was。
❌ 為什麼不選：
  • is / are — 現在式時態錯。
  • were — 用於複數主詞。
💡 延伸：food 是不可數名詞，動詞用單數；複數時用 foods（指多種食物）。` },
      { index: 4, options: ['friend', 'friendly', 'friends', 'friendship'], correctIndex: 1, explanation: `🌐 句意：人們非常友善。
🎯 考點：were（be 動詞）後接形容詞當主詞補語；「友善的」= friendly（注意是形容詞，不是副詞）。
❌ 為什麼不選：
  • friend — 名詞「朋友」，但 people are friend 不通順（應為 friends 複數）。
  • friends — 名詞複數，但題意是描述特性「友善」。
  • friendship — 名詞「友誼」，語意不通。
💡 延伸：-ly 結尾通常是副詞，但 friendly / lovely / lonely / lively / silly 是少數的「形容詞」，會考易誤判。` },
    ],
  },
  {
    id: 102, difficulty: 'advanced', title: 'Studying English',
    passage: 'English __(1)__ spoken all over the world. If you want to speak it __(2)__, you should practice every day. __(3)__ is important to read and listen as much as possible. The more you practice, the __(4)__ you will become.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'be'], correctIndex: 0, explanation: `🌐 句意：英文在世界各地被使用。
🎯 考點：表「一般事實」用現在式被動 is + p.p.；English 單數 → is spoken。
❌ 為什麼不選：
  • was — 過去式不符「現在普遍使用」的事實。
  • are — 用於複數主詞。
  • be — 原形不能獨立形成完整動詞。
💡 延伸：be spoken / be used / be known 都是描述客觀事實的高頻被動句型。` },
      { index: 2, options: ['good', 'well', 'better', 'best'], correctIndex: 1, explanation: `🌐 句意：如果你想說得流利，就應該天天練習。
🎯 考點：修飾動詞 speak 要用副詞 well。
❌ 為什麼不選：
  • good — 形容詞不能修飾動詞。
  • better / best — 比較級或最高級需有比較對象。
💡 延伸：good vs well — good 是形容詞（a good speaker）/ well 是副詞（speak well），會考超高頻。` },
      { index: 3, options: ['He', 'She', 'It', 'They'], correctIndex: 2, explanation: `🌐 句意：盡量多讀多聽很重要。
🎯 考點：It is + 形容詞 + to V = 虛主詞句型；It 代替後面的 to read and listen。
❌ 為什麼不選：
  • He / She / They — 都不能當虛主詞。
💡 延伸：It is + adj + (for sb) + to V 是會考超高頻句型；It is + adj + that 子句也是類似結構。` },
      { index: 4, options: ['good', 'well', 'better', 'best'], correctIndex: 2, explanation: `🌐 句意：你越練習，就會變得越好。
🎯 考點：The + 比較級 ..., the + 比較級 ... = 「越…越…」固定句型，兩邊都用比較級。
❌ 為什麼不選：
  • good — 原級不合此句型。
  • well — 原級副詞，前面已有 The，需用比較級。
  • best — 最高級不合此句型。
💡 延伸：經典例句 = The more, the merrier.（人越多越開心）；The harder you work, the more you earn.` },
    ],
  },
  {
    id: 103, difficulty: 'advanced', title: 'The Environment',
    passage: 'We should take care of our environment. If we __(1)__ recycle, there will be too much trash. Everyone __(2)__ help protect the Earth. Trees __(3)__ cut down every day, and this makes the air __(4)__.',
    blanks: [
      { index: 1, options: ['don\'t', 'doesn\'t', 'didn\'t', 'won\'t'], correctIndex: 0, explanation: `🌐 句意：如果我們不回收，就會有太多垃圾。
🎯 考點：第一類條件句，if 子句現在式；主詞 we → don't（不可數加 will）。
❌ 為什麼不選：
  • doesn't — 用於第三人稱單數。
  • didn't — 過去式，不符未來語境。
  • won't — if 子句不可用 will。
💡 延伸：if 子句絕對不可用 will（鐵則），主句才用 will + 原形。` },
      { index: 2, options: ['can', 'may', 'should', 'would'], correctIndex: 2, explanation: `🌐 句意：每個人都應該幫忙保護地球。
🎯 考點：表「建議/應該」用 should，後接原形動詞。
❌ 為什麼不選：
  • can — 表能力（能夠），不是建議。
  • may — 表許可或可能性。
  • would — 表假設或委婉的請求。
💡 延伸：情態助動詞語意對比 = can（能力）/ may（許可）/ should（建議）/ must（必要）/ would（假設）。` },
      { index: 3, options: ['is', 'are', 'was', 'were'], correctIndex: 1, explanation: `🌐 句意：樹木每天被砍下。
🎯 考點：被動語態 = be + p.p.；複數主詞 Trees + 現在普遍事實 → are cut down。
❌ 為什麼不選：
  • is — 用於單數主詞。
  • was / were — 過去式不符「每天」這個習慣性語境。
💡 延伸：every day 是現在簡單式的標誌詞。cut 三態同形 = cut / cut / cut。` },
      { index: 4, options: ['dirty', 'dirtily', 'dirtier', 'dirtiest'], correctIndex: 2, explanation: `🌐 句意：這讓空氣變得更髒。
🎯 考點：make + 受詞 + 形容詞補語；表「變得更…」用比較級 dirtier。
❌ 為什麼不選：
  • dirty — 原級無法表「變化」。
  • dirtily — 副詞，不能在 make 後當受詞補語。
  • dirtiest — 最高級需有比較範圍。
💡 延伸：make + O + 形容詞（使…變得…）是會考高頻句型，後接形容詞而非副詞。` },
    ],
  },
  {
    id: 104, difficulty: 'advanced', title: 'A Famous Scientist',
    passage: 'Marie Curie was a famous scientist __(1)__ discovered radium. She was born in Poland __(2)__ later moved to France. Although she __(3)__ many difficulties, she never gave up. She __(4)__ the Nobel Prize twice.',
    blanks: [
      { index: 1, options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: `🌐 句意：Marie Curie 是發現鐳的著名科學家。
🎯 考點：關係代名詞看「先行詞 + 子句中位置」。先行詞 scientist 是人 + 子句中當主詞 → who。
❌ 為什麼不選：
  • which — 用於物。
  • whose — 後面要接名詞。
  • whom — 受格用法。
💡 延伸：who 後直接接動詞時，動詞要與先行詞單複數一致（scientist 單數 → discovered 也用單數）。` },
      { index: 2, options: ['and', 'but', 'or', 'so'], correctIndex: 0, explanation: `🌐 句意：她在波蘭出生，後來搬到法國。
🎯 考點：表「前後順序」的並列用 and（兩個事件接續發生）。
❌ 為什麼不選：
  • but — 表轉折，但兩件事無對比關係。
  • or — 表選擇。
  • so — 表結果，但搬家不是出生的結果。
💡 延伸：四大基本連接詞 = and（並列）/ but（轉折）/ or（選擇）/ so（結果）。` },
      { index: 3, options: ['face', 'faces', 'faced', 'facing'], correctIndex: 2, explanation: `🌐 句意：雖然她面臨許多困難，但她從不放棄。
🎯 考點：Although 引導子句，需配時態。後一句 never gave up 是過去式，這裡也用過去式 faced。
❌ 為什麼不選：
  • face — 原形需主詞變化。
  • faces — 現在式單數，與全段過去式衝突。
  • facing — 進行式須搭 be 動詞。
💡 延伸：Although 與 but 不可並用 → ✗ Although she faced ..., but she never gave up.（中式英語常見錯誤）。` },
      { index: 4, options: ['win', 'wins', 'won', 'winning'], correctIndex: 2, explanation: `🌐 句意：她兩次獲得諾貝爾獎。
🎯 考點：與全段時態一致（過去事實），用過去式 won。win 三態 = win / won / won。
❌ 為什麼不選：
  • win — 原形不合過去時態。
  • wins — 現在式單數，時態錯。
  • winning — 進行式須搭 be 動詞。
💡 延伸：win the Nobel Prize / receive the Nobel Prize / be awarded the Nobel Prize 都可。` },
    ],
  },
  {
    id: 105, difficulty: 'advanced', title: 'Social Media',
    passage: 'Social media __(1)__ become very popular. Many teenagers spend too __(2)__ time on their phones. __(3)__ they enjoy chatting online, they should also talk to people face to face. It is important to find a good __(4)__ between online and offline life.',
    blanks: [
      { index: 1, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: `🌐 句意：社群媒體已變得非常流行。
🎯 考點：現在完成式 have/has + p.p. 表「從過去發展到現在的變化」。Social media 視為單數 → has become。
❌ 為什麼不選：
  • have — 用於複數主詞。
  • had — 過去完成式須有「過去更早」的時間參照。
  • is — 後不能接 become 的 p.p.。
💡 延伸：media 雖然字尾 -a 像複數，但通常視為單數（the media is）。` },
      { index: 2, options: ['many', 'much', 'more', 'most'], correctIndex: 1, explanation: `🌐 句意：許多青少年花太多時間在手機上。
🎯 考點：time 是不可數名詞，要用 much 修飾（too much time = 太多時間）。
❌ 為什麼不選：
  • many — 用於可數複數名詞。
  • more / most — 比較級或最高級不合「太多」的語意。
💡 延伸：可數用 many / few、不可數用 much / little；可數與不可數通用用 a lot of / lots of / plenty of。` },
      { index: 3, options: ['Because', 'Although', 'Unless', 'Until'], correctIndex: 1, explanation: `🌐 句意：雖然他們喜歡線上聊天，但也應該面對面與人交談。
🎯 考點：前後子句語意「相反/讓步」→ 用 Although。
❌ 為什麼不選：
  • Because — 表原因不合（不能說因為喜歡所以該面對面）。
  • Unless — 「除非」語意不通。
  • Until — 「直到」語意不通。
💡 延伸：Although = Though = Even though = While（讓步連接詞家族）。` },
      { index: 4, options: ['balance', 'chance', 'choice', 'difference'], correctIndex: 0, explanation: `🌐 句意：找到線上和線下生活之間的良好平衡很重要。
🎯 考點：詞彙題。「線上 vs 線下」之間需要的是「平衡」(balance)。
❌ 為什麼不選：
  • chance — 機會。
  • choice — 選擇（二選一感）。
  • difference — 差異。
💡 延伸：find a balance between A and B = 「在 A 和 B 之間找到平衡」固定搭配。` },
    ],
  },
  {
    id: 106, difficulty: 'advanced', title: 'Healthy Eating',
    passage: 'Eating healthy food is important for our body. We should eat __(1)__ fruits and vegetables every day. Junk food, __(2)__ tastes good, is not good for us. If we __(3)__ a balanced diet, we will feel much __(4)__.',
    blanks: [
      { index: 1, options: ['much', 'many', 'a lot', 'plenty of'], correctIndex: 3, explanation: `🌐 句意：我們每天應該吃大量的蔬果。
🎯 考點：plenty of 可修飾可數或不可數名詞，且後可接複數。
❌ 為什麼不選：
  • much — 用於不可數名詞，fruits 是可數複數。
  • many — 文法可，但若 fruits and vegetables 視為混合，plenty of 更通用。
  • a lot — 後接 of 才完整（a lot of），單獨 a lot 不能修飾名詞。
💡 延伸：a lot of = lots of = plenty of（都接可數複數或不可數）。many → 可數複數；much → 不可數。` },
      { index: 2, options: ['who', 'which', 'that', 'whose'], correctIndex: 1, explanation: `🌐 句意：垃圾食物雖然好吃，但對我們不好。
🎯 考點：補述用法（兩邊用逗號隔開），先行詞是物（Junk food）→ 用 which，不可用 that。
❌ 為什麼不選：
  • who — 用於人。
  • that — 補述用法不可用 that，是會考必考規則。
  • whose — 後接名詞。
💡 延伸：限定（無逗號）vs 補述（有逗號）— 補述強制使用 who / which，不可用 that。` },
      { index: 3, options: ['eat', 'eats', 'ate', 'eating'], correctIndex: 0, explanation: `🌐 句意：如果我們吃均衡飲食，我們會感覺好得多。
🎯 考點：第一類條件句，if 子句現在式；主詞 we → 原形 eat。
❌ 為什麼不選：
  • eats — 主詞 we 不加 -s。
  • ate — 過去式不合未來預測語境。
  • eating — 動名詞，須搭 be 動詞或介系詞。
💡 延伸：if 子句現在式 + 主句 will + 原形（第一類條件句鐵則）。` },
      { index: 4, options: ['good', 'well', 'better', 'best'], correctIndex: 2, explanation: `🌐 句意：我們會感覺好得多。
🎯 考點：much + 比較級 = 強化「好得多」的語感。feel + 比較級（如形容詞補語）。
❌ 為什麼不選：
  • good — 原級無法表變化。
  • well — 原級副詞，可表「健康」但前有 much 應用比較級。
  • best — 最高級需比較範圍。
💡 延伸：強化比較級的副詞家族 = much / far / a lot / even / still / a little。` },
    ],
  },
  {
    id: 107, difficulty: 'advanced', title: 'A Letter to My Future Self',
    passage: 'Dear Future Me, I __(1)__ this letter because I want to remember what my life is like now. By the time you read this, you __(2)__ graduated from high school. I hope you __(3)__ achieved your dreams. No matter what happens, don\'t forget __(4)__ kind to others.',
    blanks: [
      { index: 1, options: ['write', 'wrote', 'am writing', 'have written'], correctIndex: 2, explanation: `🌐 句意：我正在寫這封信。
🎯 考點：「此刻正在進行」用現在進行式 am + V-ing。主詞 I → am writing。
❌ 為什麼不選：
  • write — 現在簡單式表習慣（每天寫）。
  • wrote — 過去式不合「現在正在做」。
  • have written — 完成式表已完成，但本句強調「正在寫的當下」。
💡 延伸：寫信的開頭句常見句型 = I'm writing to tell you ... / I'm writing because ...。` },
      { index: 2, options: ['will', 'will have', 'would', 'had'], correctIndex: 1, explanation: `🌐 句意：等到你讀這封信時，你應該已經高中畢業了。
🎯 考點：By the time + 現在式（you read）→ 主句用未來完成式 will have + p.p.，表「在那之前就已發生」。
❌ 為什麼不選：
  • will — 只是未來式，缺乏「在那時之前完成」的時間感。
  • would — 假設語氣或過去未來式。
  • had — 過去完成式，與未來時間衝突。
💡 延伸：未來完成式 = will have + p.p.；常搭 by + 未來時間 / by the time + 子句。` },
      { index: 3, options: ['will', 'have', 'had', 'would'], correctIndex: 1, explanation: `🌐 句意：我希望你已經達成你的夢想。
🎯 考點：hope + 子句；「已經達成」用現在完成式 have + p.p.。主詞 you → have achieved。
❌ 為什麼不選：
  • will — 未來式無法表「已經完成」。
  • had — 過去完成式，與 hope（現在）時態不一致。
  • would — 假設語氣不合語境。
💡 延伸：I hope + 現在式 / 完成式 / 未來式都可，依時間語境決定。` },
      { index: 4, options: ['be', 'to be', 'being', 'been'], correctIndex: 1, explanation: `🌐 句意：無論發生什麼事，別忘了要善待他人。
🎯 考點：forget + to V = 「忘記之後要做的事」；forget + V-ing = 「忘記做過的事」。本句是「之後要做」。
❌ 為什麼不選：
  • be — 缺 to，文法不完整。
  • being — 變成「忘記曾經善待過」，語意不對。
  • been — p.p. 不合此句型。
💡 延伸：to V vs V-ing 雙意動詞 = remember / forget / regret / stop / try（兩種接法意義不同）。` },
    ],
  },
  {
    id: 108, difficulty: 'advanced', title: 'The History of Chocolate',
    passage: 'Chocolate __(1)__ first used by the ancient Mayans. At that time, it was made __(2)__ a bitter drink. __(3)__ Europeans added sugar to it, chocolate became popular all over the world. Today, millions of tons of chocolate __(4)__ produced every year.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: `🌐 句意：巧克力最早是由古馬雅人使用的。
🎯 考點：過去歷史事實的被動語態 → was + p.p.（first used）。主詞 Chocolate 單數。
❌ 為什麼不選：
  • is — 現在式不符歷史語境。
  • are / were — 用於複數主詞。
💡 延伸：歷史敘述常用過去被動 was/were + p.p.，由「動作者 by + 人」標記。` },
      { index: 2, options: ['into', 'from', 'with', 'for'], correctIndex: 0, explanation: `🌐 句意：當時，它被製成一種苦味的飲料。
🎯 考點：be made into = 「被製成…（不同形態）」固定搭配。
❌ 為什麼不選：
  • from — be made from（由…製成，原料看不出）。
  • with — be made with（用…做成，工具/材料之一）。
  • for — 不合此句型。
💡 延伸：「製成」三種介系詞 — made into（變成…）/ made from（原料看不出，如紙從木）/ made of（原料看得出，如桌從木）。` },
      { index: 3, options: ['Before', 'After', 'Unless', 'Although'], correctIndex: 1, explanation: `🌐 句意：在歐洲人加糖之後，巧克力在全世界流行起來。
🎯 考點：時序關係 — 先加糖、後變流行 → After（在…之後）。
❌ 為什麼不選：
  • Before — 「在…之前」會變成「加糖前就流行」，語意相反。
  • Unless — 「除非」不合語意。
  • Although — 「雖然」不合語意（加糖與流行無對比關係）。
💡 延伸：時序連接詞 — before / after / when / while / since / as soon as。` },
      { index: 4, options: ['is', 'was', 'are', 'were'], correctIndex: 2, explanation: `🌐 句意：今天，每年生產數百萬噸的巧克力。
🎯 考點：Today 與 every year 是現在普遍事實 → 現在式被動。主詞 millions of tons 是複數 → are produced。
❌ 為什麼不選：
  • is — 用於單數主詞。
  • was / were — 過去式不符 today 語境。
💡 延伸：millions of / thousands of / hundreds of 都接複數名詞，動詞用複數。` },
    ],
  },
  {
    id: 109, difficulty: 'advanced', title: 'Online Learning',
    passage: 'Since 2020, online learning __(1)__ changed the way students study. Many schools __(2)__ started using video calls for classes. Students who __(3)__ at home can still learn effectively. However, some students find it hard __(4)__ focused without a teacher nearby.',
    blanks: [
      { index: 1, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: `🌐 句意：自從 2020 年以來，線上學習已改變學生的學習方式。
🎯 考點：Since + 過去時間點 → 完成式 have/has + p.p.。online learning 是不可數視為單數 → has changed。
❌ 為什麼不選：
  • have — 用於複數主詞。
  • had — 過去完成式需有「過去之前」參照。
  • is — 不能接 changed (p.p.) 形成完成式。
💡 延伸：since + 時間點搭完成式 → since 2020 / since last year / since I was a child。` },
      { index: 2, options: ['has', 'have', 'had', 'are'], correctIndex: 1, explanation: `🌐 句意：許多學校已開始使用視訊通話上課。
🎯 考點：與上題完成式對應；複數主詞 Many schools → have + p.p.。
❌ 為什麼不選：
  • has — 用於單數主詞。
  • had — 過去完成式需參照。
  • are — 後不能接 started (p.p.) 形成完成式（應為 have started）。
💡 延伸：have/has + started + V-ing = 「已開始做某事且持續中」。` },
      { index: 3, options: ['stay', 'stays', 'stayed', 'staying'], correctIndex: 0, explanation: `🌐 句意：待在家的學生仍能有效學習。
🎯 考點：關係子句 who + 動詞；先行詞 Students 是複數 → 動詞用原形 stay（不加 -s）。
❌ 為什麼不選：
  • stays — 用於單數先行詞。
  • stayed — 過去式不合本句「普遍事實」。
  • staying — 進行式須搭 be 動詞。
💡 延伸：who 後動詞要與先行詞單複數一致 — students who stay（複數）vs a student who stays（單數）。` },
      { index: 4, options: ['stay', 'to stay', 'staying', 'stayed'], correctIndex: 1, explanation: `🌐 句意：然而一些學生發現要保持專注很難（沒有老師在旁）。
🎯 考點：find it hard / easy / difficult + to V 是固定句型；it 是虛受詞，to V 是真正的受詞。
❌ 為什麼不選：
  • stay — 缺 to。
  • staying — find 後不接動名詞當虛受詞補語。
  • stayed — 過去式不合此句型。
💡 延伸：類似句型 = find / think / consider + it + adj + to V（虛受詞 it 代替後面的 to V）。` },
    ],
  },
  {
    id: 110, difficulty: 'advanced', title: 'Space Exploration',
    passage: 'Humans __(1)__ always been curious about space. The first person who __(2)__ to the moon was Neil Armstrong in 1969. If we __(3)__ more about space, we might find life on other planets. Scientists believe that Mars __(4)__ be explored in the near future.',
    blanks: [
      { index: 1, options: ['has', 'have', 'had', 'are'], correctIndex: 1, explanation: `🌐 句意：人類一直對太空感到好奇。
🎯 考點：always + 完成式 → 表「從過去到現在一直如此」。複數主詞 Humans → have。
❌ 為什麼不選：
  • has — 用於單數主詞。
  • had — 過去完成式需參照。
  • are — 後不能接 been (p.p.) 形成完成式。
💡 延伸：always / never / often / recently 等副詞常搭完成式，置於 have/has 與 p.p. 之間。` },
      { index: 2, options: ['go', 'goes', 'went', 'has gone'], correctIndex: 2, explanation: `🌐 句意：第一個登上月球的人是 1969 年的尼爾·阿姆斯壯。
🎯 考點：1969 是明確過去時間 → 用過去式 went。go 三態 = go / went / gone。
❌ 為什麼不選：
  • go — 原形現在式。
  • goes — 第三人稱單數現在式。
  • has gone — 完成式不搭明確過去時間。
💡 延伸：has gone（去了還沒回）vs has been to（去過已回），但兩者都不搭 in 1969 這種明確過去時間。` },
      { index: 3, options: ['learn', 'learns', 'learned', 'learning'], correctIndex: 0, explanation: `🌐 句意：如果我們學習更多關於太空的事，我們可能會找到其他星球上的生命。
🎯 考點：第一類條件句變形（主句用 might），if 子句現在式；主詞 we → 原形 learn。
❌ 為什麼不選：
  • learns — 主詞 we 不加 -s。
  • learned — 過去式為第二類條件句語境，但主句 might find 是現在語境。
  • learning — 動名詞須搭 be 動詞。
💡 延伸：條件句主句的情態助動詞 = will（一定）/ may / might（可能）/ could（也許能）。` },
      { index: 4, options: ['can', 'could', 'will', 'would'], correctIndex: 2, explanation: `🌐 句意：科學家相信火星在不久的將來會被探索。
🎯 考點：「未來預測」用 will + be + p.p.（未來被動）。
❌ 為什麼不選：
  • can — 表現在的能力或可能性。
  • could — 表假設或委婉。
  • would — 表假設或過去未來式。
💡 延伸：未來被動 = will be + p.p.；in the near future（在不久的將來）是未來式關鍵詞。` },
    ],
  },
  {
    id: 111, difficulty: 'advanced', title: 'The Power of Reading',
    passage: 'Reading is one of the __(1)__ ways to learn new things. People who read every day __(2)__ better vocabulary and writing skills. A good book can take you to places you __(3)__ never been. If I __(4)__ more free time, I would read every day.',
    blanks: [
      { index: 1, options: ['good', 'better', 'best', 'well'], correctIndex: 2, explanation: `🌐 句意：閱讀是學習新事物的最佳方式之一。
🎯 考點：one of the + 最高級 + 複數名詞 = 「最…之一」固定句型。good 的最高級是不規則的 best。
❌ 為什麼不選：
  • good — 原級無法表「最…之一」。
  • better — 比較級需有對照。
  • well — 副詞，此句需形容詞修飾 ways。
💡 延伸：one of the best / most + adj + 複數名詞 是會考高頻句型，注意名詞必為複數。` },
      { index: 2, options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: `🌐 句意：每天閱讀的人擁有較好的詞彙量和寫作能力。
🎯 考點：關係子句修飾 People 後，主動詞要配合複數主詞 People → have。
❌ 為什麼不選：
  • has — 用於單數主詞。
  • had — 過去式不合普遍事實。
  • having — 動名詞或現在分詞，不能當主動詞。
💡 延伸：注意被關代子句插入後，主動詞仍要配最外層主詞 = People ... have（不是配 day）。` },
      { index: 3, options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: `🌐 句意：好書能帶你去你從未去過的地方。
🎯 考點：現在完成式 have/has + p.p.，表「至今經驗」。主詞 you → have never been。
❌ 為什麼不選：
  • has — 用於第三人稱單數，不能搭 you。
  • had — 過去完成式須參照。
  • having — 動名詞無法形成完成式。
💡 延伸：have been to + 地點 = 曾去過某地（已回來）；常搭 never / ever 表經驗。` },
      { index: 4, options: ['have', 'has', 'had', 'having'], correctIndex: 2, explanation: `🌐 句意：如果我有更多空閒時間，我每天都會閱讀（但我沒有）。
🎯 考點：第二類條件句（與現在事實相反）→ if 子句用過去式 had；主句用 would + 原形。
❌ 為什麼不選：
  • have — 直述現在式。
  • has — 用於第三人稱單數。
  • having — 動名詞。
💡 延伸：第二類條件句的 if 子句「過去式」並非指過去，而是「假設語氣」標記（會考易混淆）。` },
    ],
  },
  {
    id: 112, difficulty: 'advanced', title: 'Volunteer Work',
    passage: 'Last summer, I __(1)__ as a volunteer at an animal shelter. The animals there __(2)__ taken care of by many kind people. I was responsible __(3)__ feeding the cats. This experience __(4)__ me learn the importance of helping others.',
    blanks: [
      { index: 1, options: ['work', 'works', 'worked', 'working'], correctIndex: 2, explanation: `🌐 句意：去年夏天，我在動物收容所當志工。
🎯 考點：Last summer 是明確過去時間 → 過去式 worked。
❌ 為什麼不選：
  • work — 原形現在式。
  • works — 第三人稱單數。
  • working — 進行式須搭 be 動詞。
💡 延伸：volunteer 既是名詞（志工）也是動詞（自願）；work as + 職位 = 擔任…工作。` },
      { index: 2, options: ['is', 'was', 'are', 'were'], correctIndex: 3, explanation: `🌐 句意：那裡的動物受到許多好心人的照顧。
🎯 考點：被動語態過去式；複數主詞 The animals + by + 動作者 → were taken care of。
❌ 為什麼不選：
  • is / are — 現在式不符過去敘事。
  • was — 用於單數主詞。
💡 延伸：take care of（照顧）是片語動詞，被動化要保留 of → be taken care of。` },
      { index: 3, options: ['to', 'for', 'of', 'with'], correctIndex: 1, explanation: `🌐 句意：我負責餵貓。
🎯 考點：be responsible for + N / V-ing = 「對…負責」固定搭配。
❌ 為什麼不選：
  • to — be 動詞後不接 to 表負責。
  • of — 不合此片語固定搭配。
  • with — 不合此片語固定搭配。
💡 延伸：類似 for 搭配 = thank you for / be famous for / be known for / look for / wait for。` },
      { index: 4, options: ['make', 'makes', 'made', 'making'], correctIndex: 2, explanation: `🌐 句意：這個經驗讓我學到幫助別人的重要性。
🎯 考點：使役動詞 make + 受詞 + 原形動詞；過去式 made me learn。
❌ 為什麼不選：
  • make — 缺時態。
  • makes — 現在式不符 Last summer 的過去敘事。
  • making — 進行式不對。
💡 延伸：使役動詞 make / let / have + 人 + 原形動詞；get + 人 + to V（會考易考）。` },
    ],
  },
  {
    id: 113, difficulty: 'advanced', title: 'Climate Change',
    passage: 'Climate change is a serious problem __(1)__ affects the whole world. The temperature __(2)__ been rising for many years. Unless we __(3)__ action now, the situation will get worse. Each of us __(4)__ make a difference by using less energy.',
    blanks: [
      { index: 1, options: ['who', 'which', 'that', 'whose'], correctIndex: 2, explanation: `🌐 句意：氣候變遷是個影響全世界的嚴重問題。
🎯 考點：先行詞 problem 是物 + 子句中當主詞 → that 或 which。本題 4 個選項中 that 是萬能選項，也最常用。
❌ 為什麼不選：
  • who — 用於人。
  • which — 雖文法可，但在限定用法中 that 更通用。
  • whose — 後要接名詞。
💡 延伸：that 可代替 who 和 which，但補述用法（有逗號）時只能用 who/which。` },
      { index: 2, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: `🌐 句意：溫度多年來一直在上升。
🎯 考點：for many years（持續性時段）+ been rising → 現在完成進行式 has been + V-ing。單數主詞 The temperature → has。
❌ 為什麼不選：
  • have — 用於複數主詞。
  • had — 過去完成式須有參照。
  • is — 後不能接 been 形成完成式。
💡 延伸：完成進行式強調「動作從過去持續到現在仍在進行」，常搭 for / since 時間副詞。` },
      { index: 3, options: ['take', 'takes', 'took', 'taking'], correctIndex: 0, explanation: `🌐 句意：除非我們現在採取行動，否則情況會變糟。
🎯 考點：Unless = If not 引導條件句，子句用現在式；主詞 we → 原形 take。
❌ 為什麼不選：
  • takes — 主詞 we 不加 -s。
  • took — 過去式不合未來預測。
  • taking — 動名詞須搭 be 動詞。
💡 延伸：unless 後接子句、in case of 後接名詞、if not 後接子句（同義不同句構）。` },
      { index: 4, options: ['can', 'may', 'should', 'must'], correctIndex: 0, explanation: `🌐 句意：我們每個人都能透過減少能源使用來有所貢獻。
🎯 考點：表「能夠（有能力）」用 can；後接原形動詞 make。
❌ 為什麼不選：
  • may — 表許可或可能性，較委婉。
  • should — 表建議「應該」。
  • must — 表強制「必須」。
💡 延伸：make a difference（產生影響/有所作為）是會考閱讀理解高頻片語。` },
    ],
  },
  {
    id: 114, difficulty: 'advanced', title: 'A Cultural Festival',
    passage: 'Our school held a cultural festival __(1)__ was very exciting. Students from different countries __(2)__ traditional food and performances. The Japanese group __(3)__ a beautiful dance. It made everyone __(4)__ more about other cultures.',
    blanks: [
      { index: 1, options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: `🌐 句意：我們學校舉辦了一場非常有趣的文化節。
🎯 考點：先行詞 festival 是物 + 子句中當主詞 → which。
❌ 為什麼不選：
  • who — 用於人。
  • whose — 後要接名詞。
  • whom — 受格用法。
💡 延伸：which 可被 that 替代；當主格時，which/that 不可省略。` },
      { index: 2, options: ['bring', 'brings', 'brought', 'bringing'], correctIndex: 2, explanation: `🌐 句意：來自不同國家的學生帶來傳統食物和表演。
🎯 考點：與全段時態一致（過去事件），用過去式 brought。bring 三態 = bring / brought / brought。
❌ 為什麼不選：
  • bring — 原形現在式。
  • brings — 現在式單數。
  • bringing — 進行式須搭 be 動詞。
💡 延伸：bring 帶來（往這邊）vs take 帶走（去那邊），方向相反。` },
      { index: 3, options: ['perform', 'performs', 'performed', 'performing'], correctIndex: 2, explanation: `🌐 句意：日本組表演了美麗的舞蹈。
🎯 考點：與全段過去時態一致 → performed。
❌ 為什麼不選：
  • perform — 原形現在式。
  • performs — 第三人稱單數現在式。
  • performing — 進行式須搭 be 動詞。
💡 延伸：perform a dance / give a performance / do a show，三種「表演」用法。` },
      { index: 4, options: ['learn', 'to learn', 'learning', 'learned'], correctIndex: 0, explanation: `🌐 句意：它讓每個人更了解其他文化。
🎯 考點：使役動詞 make + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to learn — make 不接不定詞。
  • learning — 進行式不對。
  • learned — 過去式不能接在 made 後。
💡 延伸：make/let/have + 受詞 + 原形動詞；get + 人 + to V（會考必考的使役動詞口訣）。` },
    ],
  },
  {
    id: 115, difficulty: 'advanced', title: 'Technology and Life',
    passage: 'Technology has made our lives much __(1)__. We can communicate with people __(2)__ live far away. However, spending too much time on screens __(3)__ bad for our eyes. We should remember __(4)__ take breaks regularly.',
    blanks: [
      { index: 1, options: ['easy', 'easier', 'easiest', 'easily'], correctIndex: 1, explanation: `🌐 句意：科技讓我們的生活變得容易得多。
🎯 考點：make + 受詞 + 比較級（表「變得更…」）；much + 比較級加強語氣。
❌ 為什麼不選：
  • easy — 原級無法表「變化」。
  • easiest — 最高級需比較範圍。
  • easily — 副詞，不能當 make 後的受詞補語。
💡 延伸：much / far / a lot 都可加強比較級（much easier / far better / a lot taller）。` },
      { index: 2, options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: `🌐 句意：我們可以和住在遠方的人溝通。
🎯 考點：先行詞 people 是人 + 子句中當主詞 → who。
❌ 為什麼不選：
  • which — 用於物。
  • whose — 後要接名詞。
  • whom — 受格用法。
💡 延伸：people 是複數名詞，搭配關代後動詞用複數 → who live（不是 lives）。` },
      { index: 3, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: `🌐 句意：然而，花太多時間盯螢幕對眼睛不好。
🎯 考點：動名詞（spending too much time on screens）當主詞時視為單數 → is。
❌ 為什麼不選：
  • am — 只用於 I。
  • are — 用於複數主詞。
  • be — 原形不能獨立。
💡 延伸：動名詞片語當主詞 → 視為單數；類似 Reading is fun / Walking is good for health。` },
      { index: 4, options: ['—', 'to', 'for', 'of'], correctIndex: 1, explanation: `🌐 句意：我們應該記得定期休息。
🎯 考點：remember + to V = 「記得之後要做的事」；remember + V-ing = 「記得做過的事」。本句是「之後要做」。
❌ 為什麼不選：
  • — — remember 後不能直接接原形動詞。
  • for / of — 不合此句型。
💡 延伸：to V vs V-ing 雙意動詞 = remember / forget / regret / stop / try（兩種接法意義不同）。` },
    ],
  },
  {
    id: 116, difficulty: 'advanced', title: 'A Dream Job',
    passage: 'When I was young, I __(1)__ to be a doctor. My parents told me that I __(2)__ study hard to achieve my dream. Now I __(3)__ studying medicine at a university. I believe that if I keep __(4)__, my dream will come true.',
    blanks: [
      { index: 1, options: ['want', 'wants', 'wanted', 'wanting'], correctIndex: 2, explanation: `🌐 句意：我小時候想當醫生。
🎯 考點：When I was young 是明確過去 → 用過去式 wanted。want + to V 表「想要做某事」。
❌ 為什麼不選：
  • want — 原形現在式。
  • wants — 第三人稱單數現在式。
  • wanting — 進行式須搭 be 動詞。
💡 延伸：want / hope / wish / plan / decide 後面都接 to V。` },
      { index: 2, options: ['can', 'could', 'should', 'would'], correctIndex: 2, explanation: `🌐 句意：我父母告訴我，我應該努力讀書來達成夢想。
🎯 考點：表「建議/應該」用 should，後接原形動詞 study。
❌ 為什麼不選：
  • can — 表能力。
  • could — 表假設或委婉的能力。
  • would — 表假設或過去未來式。
💡 延伸：should / ought to / had better / must 都表建議或必要，語氣強度遞增。` },
      { index: 3, options: ['am', 'is', 'was', 'were'], correctIndex: 0, explanation: `🌐 句意：現在我在大學讀醫學。
🎯 考點：Now + 現在進行式 am/is/are + V-ing。主詞 I → am studying。
❌ 為什麼不選：
  • is — 用於第三人稱單數。
  • was / were — 過去式不符 Now。
💡 延伸：現在進行式表「目前持續的行動」（study medicine 是當下持續的學業）。` },
      { index: 4, options: ['try', 'tries', 'trying', 'tried'], correctIndex: 2, explanation: `🌐 句意：我相信如果我繼續努力，夢想就會實現。
🎯 考點：keep + V-ing = 「持續做某事」固定句型。
❌ 為什麼不選：
  • try — 原形不能直接接 keep。
  • tries — 現在式單數不能接 keep。
  • tried — 過去式不對。
💡 延伸：keep / continue / go on + V-ing 都表「持續做」；come true（成真）是慣用表達。` },
    ],
  },
];
