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
      { index: 1, options: ['go', 'goes', 'went', 'have gone'], correctIndex: 2, explanation: 'Last summer 過去式用 went。' },
      { index: 2, options: ['stay', 'stayed', 'have stayed', 'were staying'], correctIndex: 1, explanation: '過去式用 stayed。' },
      { index: 3, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: '過去式用 was。' },
      { index: 4, options: ['friend', 'friendly', 'friends', 'friendship'], correctIndex: 1, explanation: 'be + 形容詞 friendly。' },
    ],
  },
  {
    id: 102, difficulty: 'advanced', title: 'Studying English',
    passage: 'English __(1)__ spoken all over the world. If you want to speak it __(2)__, you should practice every day. __(3)__ is important to read and listen as much as possible. The more you practice, the __(4)__ you will become.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'be'], correctIndex: 0, explanation: '被動語態現在式 is spoken。' },
      { index: 2, options: ['good', 'well', 'better', 'best'], correctIndex: 1, explanation: '修飾動詞 speak 用副詞 well。' },
      { index: 3, options: ['He', 'She', 'It', 'They'], correctIndex: 2, explanation: '虛主詞 It is important to...。' },
      { index: 4, options: ['good', 'well', 'better', 'best'], correctIndex: 2, explanation: 'the more...the better 越…越好。' },
    ],
  },
  {
    id: 103, difficulty: 'advanced', title: 'The Environment',
    passage: 'We should take care of our environment. If we __(1)__ recycle, there will be too much trash. Everyone __(2)__ help protect the Earth. Trees __(3)__ cut down every day, and this makes the air __(4)__.',
    blanks: [
      { index: 1, options: ['don\'t', 'doesn\'t', 'didn\'t', 'won\'t'], correctIndex: 0, explanation: 'If we don\'t recycle（條件句現在式）。' },
      { index: 2, options: ['can', 'may', 'should', 'would'], correctIndex: 2, explanation: '建議用 should。' },
      { index: 3, options: ['is', 'are', 'was', 'were'], correctIndex: 1, explanation: '複數主詞被動 Trees are cut down。' },
      { index: 4, options: ['dirty', 'dirtily', 'dirtier', 'dirtiest'], correctIndex: 2, explanation: '使空氣變更糟用比較級 dirtier。' },
    ],
  },
  {
    id: 104, difficulty: 'advanced', title: 'A Famous Scientist',
    passage: 'Marie Curie was a famous scientist __(1)__ discovered radium. She was born in Poland __(2)__ later moved to France. Although she __(3)__ many difficulties, she never gave up. She __(4)__ the Nobel Prize twice.',
    blanks: [
      { index: 1, options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: '先行詞是人，用 who。' },
      { index: 2, options: ['and', 'but', 'or', 'so'], correctIndex: 0, explanation: '前後順序連接用 and。' },
      { index: 3, options: ['face', 'faces', 'faced', 'facing'], correctIndex: 2, explanation: '過去式用 faced。' },
      { index: 4, options: ['win', 'wins', 'won', 'winning'], correctIndex: 2, explanation: '過去式用 won。' },
    ],
  },
  {
    id: 105, difficulty: 'advanced', title: 'Social Media',
    passage: 'Social media __(1)__ become very popular. Many teenagers spend too __(2)__ time on their phones. __(3)__ they enjoy chatting online, they should also talk to people face to face. It is important to find a good __(4)__ between online and offline life.',
    blanks: [
      { index: 1, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: 'Social media 視為單數，用 has become。' },
      { index: 2, options: ['many', 'much', 'more', 'most'], correctIndex: 1, explanation: 'time 不可數名詞，用 too much。' },
      { index: 3, options: ['Because', 'Although', 'Unless', 'Until'], correctIndex: 1, explanation: '雖然喜歡但也應該…用 Although。' },
      { index: 4, options: ['balance', 'chance', 'choice', 'difference'], correctIndex: 0, explanation: '找到好的平衡用 balance。' },
    ],
  },
  {
    id: 106, difficulty: 'advanced', title: 'Healthy Eating',
    passage: 'Eating healthy food is important for our body. We should eat __(1)__ fruits and vegetables every day. Junk food, __(2)__ tastes good, is not good for us. If we __(3)__ a balanced diet, we will feel much __(4)__.',
    blanks: [
      { index: 1, options: ['much', 'many', 'a lot', 'plenty of'], correctIndex: 3, explanation: 'plenty of（大量的）修飾可數名詞。' },
      { index: 2, options: ['who', 'which', 'that', 'whose'], correctIndex: 1, explanation: '非限定關代修飾物用 which。' },
      { index: 3, options: ['eat', 'eats', 'ate', 'eating'], correctIndex: 0, explanation: 'If we eat（條件句現在式）。' },
      { index: 4, options: ['good', 'well', 'better', 'best'], correctIndex: 2, explanation: '比較級 much better。' },
    ],
  },
  {
    id: 107, difficulty: 'advanced', title: 'A Letter to My Future Self',
    passage: 'Dear Future Me, I __(1)__ this letter because I want to remember what my life is like now. By the time you read this, you __(2)__ graduated from high school. I hope you __(3)__ achieved your dreams. No matter what happens, don\'t forget __(4)__ kind to others.',
    blanks: [
      { index: 1, options: ['write', 'wrote', 'am writing', 'have written'], correctIndex: 2, explanation: '正在寫這封信用現在進行式。' },
      { index: 2, options: ['will', 'will have', 'would', 'had'], correctIndex: 1, explanation: 'By the time + 未來完成式 will have graduated。' },
      { index: 3, options: ['will', 'have', 'had', 'would'], correctIndex: 1, explanation: '希望你已經達成用 have achieved。' },
      { index: 4, options: ['be', 'to be', 'being', 'been'], correctIndex: 1, explanation: 'don\'t forget to be（不要忘記要…）。' },
    ],
  },
  {
    id: 108, difficulty: 'advanced', title: 'The History of Chocolate',
    passage: 'Chocolate __(1)__ first used by the ancient Mayans. At that time, it was made __(2)__ a bitter drink. __(3)__ Europeans added sugar to it, chocolate became popular all over the world. Today, millions of tons of chocolate __(4)__ produced every year.',
    blanks: [
      { index: 1, options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: '過去被動 was first used。' },
      { index: 2, options: ['into', 'from', 'with', 'for'], correctIndex: 0, explanation: 'made into（被做成）。' },
      { index: 3, options: ['Before', 'After', 'Unless', 'Although'], correctIndex: 1, explanation: '在歐洲人加糖之後變流行，用 After。' },
      { index: 4, options: ['is', 'was', 'are', 'were'], correctIndex: 2, explanation: '複數主詞現在被動 are produced。' },
    ],
  },
  {
    id: 109, difficulty: 'advanced', title: 'Online Learning',
    passage: 'Since 2020, online learning __(1)__ changed the way students study. Many schools __(2)__ started using video calls for classes. Students who __(3)__ at home can still learn effectively. However, some students find it hard __(4)__ focused without a teacher nearby.',
    blanks: [
      { index: 1, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: 'online learning 單數主詞，完成式用 has。' },
      { index: 2, options: ['has', 'have', 'had', 'are'], correctIndex: 1, explanation: '複數主詞 schools 用 have started。' },
      { index: 3, options: ['stay', 'stays', 'stayed', 'staying'], correctIndex: 0, explanation: '關係子句 who stay at home。' },
      { index: 4, options: ['stay', 'to stay', 'staying', 'stayed'], correctIndex: 1, explanation: 'find it hard to stay（不定詞）。' },
    ],
  },
  {
    id: 110, difficulty: 'advanced', title: 'Space Exploration',
    passage: 'Humans __(1)__ always been curious about space. The first person who __(2)__ to the moon was Neil Armstrong in 1969. If we __(3)__ more about space, we might find life on other planets. Scientists believe that Mars __(4)__ be explored in the near future.',
    blanks: [
      { index: 1, options: ['has', 'have', 'had', 'are'], correctIndex: 1, explanation: '複數主詞 Humans 用 have。' },
      { index: 2, options: ['go', 'goes', 'went', 'has gone'], correctIndex: 2, explanation: '過去事實用過去式 went。' },
      { index: 3, options: ['learn', 'learns', 'learned', 'learning'], correctIndex: 0, explanation: 'If we learn（條件句現在式）。' },
      { index: 4, options: ['can', 'could', 'will', 'would'], correctIndex: 2, explanation: '未來預測用 will be explored。' },
    ],
  },
  {
    id: 111, difficulty: 'advanced', title: 'The Power of Reading',
    passage: 'Reading is one of the __(1)__ ways to learn new things. People who read every day __(2)__ better vocabulary and writing skills. A good book can take you to places you __(3)__ never been. If I __(4)__ more free time, I would read every day.',
    blanks: [
      { index: 1, options: ['good', 'better', 'best', 'well'], correctIndex: 2, explanation: 'one of the + 最高級 best。' },
      { index: 2, options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: '複數主詞 People 用 have。' },
      { index: 3, options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: 'you have never been（現在完成式）。' },
      { index: 4, options: ['have', 'has', 'had', 'having'], correctIndex: 2, explanation: '假設語氣 If I had（與現在相反）。' },
    ],
  },
  {
    id: 112, difficulty: 'advanced', title: 'Volunteer Work',
    passage: 'Last summer, I __(1)__ as a volunteer at an animal shelter. The animals there __(2)__ taken care of by many kind people. I was responsible __(3)__ feeding the cats. This experience __(4)__ me learn the importance of helping others.',
    blanks: [
      { index: 1, options: ['work', 'works', 'worked', 'working'], correctIndex: 2, explanation: 'Last summer 過去式用 worked。' },
      { index: 2, options: ['is', 'was', 'are', 'were'], correctIndex: 3, explanation: '複數主詞過去被動 were taken care of。' },
      { index: 3, options: ['to', 'for', 'of', 'with'], correctIndex: 1, explanation: 'responsible for + V-ing。' },
      { index: 4, options: ['make', 'makes', 'made', 'making'], correctIndex: 2, explanation: '過去式 made me learn。' },
    ],
  },
  {
    id: 113, difficulty: 'advanced', title: 'Climate Change',
    passage: 'Climate change is a serious problem __(1)__ affects the whole world. The temperature __(2)__ been rising for many years. Unless we __(3)__ action now, the situation will get worse. Each of us __(4)__ make a difference by using less energy.',
    blanks: [
      { index: 1, options: ['who', 'which', 'that', 'whose'], correctIndex: 2, explanation: '先行詞是 problem，用 that。' },
      { index: 2, options: ['have', 'has', 'had', 'is'], correctIndex: 1, explanation: '單數主詞 temperature 用 has been。' },
      { index: 3, options: ['take', 'takes', 'took', 'taking'], correctIndex: 0, explanation: 'Unless we take（條件句現在式）。' },
      { index: 4, options: ['can', 'may', 'should', 'must'], correctIndex: 0, explanation: '每個人「能」有所作為用 can。' },
    ],
  },
  {
    id: 114, difficulty: 'advanced', title: 'A Cultural Festival',
    passage: 'Our school held a cultural festival __(1)__ was very exciting. Students from different countries __(2)__ traditional food and performances. The Japanese group __(3)__ a beautiful dance. It made everyone __(4)__ more about other cultures.',
    blanks: [
      { index: 1, options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: '先行詞是 festival（物），用 which。' },
      { index: 2, options: ['bring', 'brings', 'brought', 'bringing'], correctIndex: 2, explanation: '過去式用 brought。' },
      { index: 3, options: ['perform', 'performs', 'performed', 'performing'], correctIndex: 2, explanation: '過去式用 performed。' },
      { index: 4, options: ['learn', 'to learn', 'learning', 'learned'], correctIndex: 0, explanation: 'make + 受詞 + 原形動詞。' },
    ],
  },
  {
    id: 115, difficulty: 'advanced', title: 'Technology and Life',
    passage: 'Technology has made our lives much __(1)__. We can communicate with people __(2)__ live far away. However, spending too much time on screens __(3)__ bad for our eyes. We should remember __(4)__ take breaks regularly.',
    blanks: [
      { index: 1, options: ['easy', 'easier', 'easiest', 'easily'], correctIndex: 1, explanation: '比較級 much easier。' },
      { index: 2, options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: '先行詞是 people（人），用 who。' },
      { index: 3, options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: '動名詞當主詞視為單數，用 is。' },
      { index: 4, options: ['—', 'to', 'for', 'of'], correctIndex: 1, explanation: 'remember to take（記得要做）。' },
    ],
  },
  {
    id: 116, difficulty: 'advanced', title: 'A Dream Job',
    passage: 'When I was young, I __(1)__ to be a doctor. My parents told me that I __(2)__ study hard to achieve my dream. Now I __(3)__ studying medicine at a university. I believe that if I keep __(4)__, my dream will come true.',
    blanks: [
      { index: 1, options: ['want', 'wants', 'wanted', 'wanting'], correctIndex: 2, explanation: 'When I was young 過去式用 wanted。' },
      { index: 2, options: ['can', 'could', 'should', 'would'], correctIndex: 2, explanation: '建議用 should study hard。' },
      { index: 3, options: ['am', 'is', 'was', 'were'], correctIndex: 0, explanation: '現在進行式 I am studying。' },
      { index: 4, options: ['try', 'tries', 'trying', 'tried'], correctIndex: 2, explanation: 'keep + V-ing（持續努力）。' },
    ],
  },
];
