export interface GrammarQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: 'beginner' | 'advanced';
}

export const GRAMMAR_BANK: GrammarQuestion[] = [
  // =============================================
  // ===== 初級 (beginner) — 約 120 題 =====
  // =============================================

  // ===== Be 動詞 (15) =====
  { id: 1, question: 'She ___ a student.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: '主詞 She 是第三人稱單數，要用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 2, question: 'They ___ happy today.', options: ['is', 'am', 'are', 'was'], correctIndex: 2, explanation: '主詞 They 是複數，要用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 3, question: 'I ___ a boy.', options: ['am', 'is', 'are', 'be'], correctIndex: 0, explanation: '主詞 I 要用 am。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 4, question: 'The dog ___ very cute.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'The dog 是第三人稱單數，要用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 5, question: 'We ___ in the classroom.', options: ['am', 'is', 'are', 'be'], correctIndex: 2, explanation: '主詞 We 是複數，要用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 6, question: 'It ___ a sunny day.', options: ['am', 'is', 'are', 'were'], correctIndex: 1, explanation: '主詞 It 是第三人稱單數，要用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 7, question: 'Tom and Jerry ___ good friends.', options: ['is', 'am', 'are', 'was'], correctIndex: 2, explanation: '兩個人是複數主詞，要用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 8, question: 'My mom ___ a teacher.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'My mom 是第三人稱單數，要用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 9, question: 'The books ___ on the shelf.', options: ['is', 'am', 'are', 'was'], correctIndex: 2, explanation: 'The books 是複數，要用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 10, question: '___ you ready?', options: ['Am', 'Is', 'Are', 'Do'], correctIndex: 2, explanation: '主詞 you 搭配 Are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 11, question: 'My name ___ Amy.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'My name 是第三人稱單數，用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 12, question: 'The cats ___ sleeping.', options: ['is', 'am', 'are', 'was'], correctIndex: 2, explanation: 'The cats 是複數，用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 13, question: 'This ___ my favorite song.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'This 是單數，用 is。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 14, question: 'You and I ___ classmates.', options: ['am', 'is', 'are', 'was'], correctIndex: 2, explanation: 'You and I 是複數主詞，用 are。', category: 'Be 動詞', difficulty: 'beginner' },
  { id: 15, question: 'The water ___ cold.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: 'The water 是不可數名詞單數，用 is。', category: 'Be 動詞', difficulty: 'beginner' },

  // ===== 冠詞 (12) =====
  { id: 16, question: 'I want ___ apple.', options: ['a', 'an', 'the', '—'], correctIndex: 1, explanation: 'apple 是母音開頭，要用 an。', category: '冠詞', difficulty: 'beginner' },
  { id: 17, question: 'She is ___ tallest girl in class.', options: ['a', 'an', 'the', '—'], correctIndex: 2, explanation: '最高級前面要加 the。', category: '冠詞', difficulty: 'beginner' },
  { id: 18, question: 'He is ___ honest boy.', options: ['a', 'an', 'the', '—'], correctIndex: 1, explanation: 'honest 的 h 不發音，母音開頭要用 an。', category: '冠詞', difficulty: 'beginner' },
  { id: 19, question: 'I need ___ umbrella.', options: ['a', 'an', 'the', '—'], correctIndex: 1, explanation: 'umbrella 是母音開頭，要用 an。', category: '冠詞', difficulty: 'beginner' },
  { id: 20, question: 'There is ___ cat under the table.', options: ['a', 'an', 'the', '—'], correctIndex: 0, explanation: 'cat 是子音開頭，第一次提到用 a。', category: '冠詞', difficulty: 'beginner' },
  { id: 21, question: '___ sun rises in the east.', options: ['A', 'An', 'The', '—'], correctIndex: 2, explanation: '太陽是獨一無二的事物，要加 the。', category: '冠詞', difficulty: 'beginner' },
  { id: 22, question: 'She plays ___ piano every day.', options: ['a', 'an', 'the', '—'], correctIndex: 2, explanation: '樂器前面要加 the。', category: '冠詞', difficulty: 'beginner' },
  { id: 23, question: 'I had ___ egg for breakfast.', options: ['a', 'an', 'the', '—'], correctIndex: 1, explanation: 'egg 是母音開頭，要用 an。', category: '冠詞', difficulty: 'beginner' },
  { id: 24, question: 'He is ___ doctor.', options: ['a', 'an', 'the', '—'], correctIndex: 0, explanation: 'doctor 子音開頭，用 a。', category: '冠詞', difficulty: 'beginner' },
  { id: 25, question: 'I want ___ orange juice.', options: ['a', 'an', 'the', '—'], correctIndex: 3, explanation: '不可數名詞前面通常不加冠詞。', category: '冠詞', difficulty: 'beginner' },
  { id: 26, question: 'Look at ___ moon!', options: ['a', 'an', 'the', '—'], correctIndex: 2, explanation: '月亮是獨一無二的，用 the。', category: '冠詞', difficulty: 'beginner' },
  { id: 27, question: 'She is ___ eight-year-old girl.', options: ['a', 'an', 'the', '—'], correctIndex: 1, explanation: 'eight 是母音開頭，用 an。', category: '冠詞', difficulty: 'beginner' },

  // ===== 代名詞 (12) =====
  { id: 28, question: 'This book is ___.', options: ['my', 'I', 'mine', 'me'], correctIndex: 2, explanation: '所有格代名詞 mine = my book，用在句尾。', category: '代名詞', difficulty: 'beginner' },
  { id: 29, question: '___ is my best friend.', options: ['Her', 'She', 'Hers', 'Him'], correctIndex: 1, explanation: '主詞位置要用主格 She。', category: '代名詞', difficulty: 'beginner' },
  { id: 30, question: 'Please give ___ the ball.', options: ['I', 'my', 'me', 'mine'], correctIndex: 2, explanation: '動詞後面要用受格 me。', category: '代名詞', difficulty: 'beginner' },
  { id: 31, question: 'That pencil is ___.', options: ['her', 'she', 'hers', 'herself'], correctIndex: 2, explanation: '所有格代名詞 hers = her pencil。', category: '代名詞', difficulty: 'beginner' },
  { id: 32, question: '___ house is very big.', options: ['They', 'Them', 'Their', 'Theirs'], correctIndex: 2, explanation: '名詞前面要用所有格形容詞 Their。', category: '代名詞', difficulty: 'beginner' },
  { id: 33, question: '___ is raining outside.', options: ['He', 'She', 'It', 'They'], correctIndex: 2, explanation: '表示天氣用虛主詞 It。', category: '代名詞', difficulty: 'beginner' },
  { id: 34, question: 'Mom told ___ to clean the room.', options: ['we', 'our', 'us', 'ours'], correctIndex: 2, explanation: '動詞後面要用受格 us。', category: '代名詞', difficulty: 'beginner' },
  { id: 35, question: 'Is this bag ___?', options: ['you', 'your', 'yours', 'yourself'], correctIndex: 2, explanation: '所有格代名詞 yours = your bag。', category: '代名詞', difficulty: 'beginner' },
  { id: 36, question: '___ dog is brown.', options: ['He', 'Him', 'His', 'He\'s'], correctIndex: 2, explanation: '名詞前面用所有格 His。', category: '代名詞', difficulty: 'beginner' },
  { id: 37, question: 'I like ___ very much.', options: ['she', 'her', 'hers', 'herself'], correctIndex: 1, explanation: '動詞後面用受格 her。', category: '代名詞', difficulty: 'beginner' },
  { id: 38, question: 'These are ___ shoes.', options: ['I', 'me', 'my', 'mine'], correctIndex: 2, explanation: '名詞前面用所有格形容詞 my。', category: '代名詞', difficulty: 'beginner' },
  { id: 39, question: 'The toy is not ___. It\'s Tom\'s.', options: ['our', 'ours', 'us', 'we'], correctIndex: 1, explanation: '句尾用所有格代名詞 ours。', category: '代名詞', difficulty: 'beginner' },

  // ===== 簡單時態 (15) =====
  { id: 40, question: 'He ___ to school every day.', options: ['go', 'goes', 'went', 'going'], correctIndex: 1, explanation: '第三人稱單數現在式，動詞加 -es。', category: '時態', difficulty: 'beginner' },
  { id: 41, question: 'We ___ a movie yesterday.', options: ['watch', 'watches', 'watched', 'watching'], correctIndex: 2, explanation: 'yesterday 表示過去式，要用 watched。', category: '時態', difficulty: 'beginner' },
  { id: 42, question: 'She is ___ a book now.', options: ['read', 'reads', 'reading', 'readed'], correctIndex: 2, explanation: 'is + V-ing 是現在進行式。', category: '時態', difficulty: 'beginner' },
  { id: 43, question: 'They ___ soccer last weekend.', options: ['play', 'plays', 'played', 'playing'], correctIndex: 2, explanation: 'last weekend 表示過去，用 played。', category: '時態', difficulty: 'beginner' },
  { id: 44, question: 'She ___ breakfast every morning.', options: ['eat', 'eats', 'ate', 'eating'], correctIndex: 1, explanation: '第三人稱單數現在式，eat → eats。', category: '時態', difficulty: 'beginner' },
  { id: 45, question: 'We ___ to the park tomorrow.', options: ['go', 'went', 'will go', 'going'], correctIndex: 2, explanation: 'tomorrow 表示未來，用 will go。', category: '時態', difficulty: 'beginner' },
  { id: 46, question: 'Look! The baby ___.', options: ['cries', 'cried', 'is crying', 'cry'], correctIndex: 2, explanation: 'Look! 表示正在發生，用現在進行式。', category: '時態', difficulty: 'beginner' },
  { id: 47, question: 'She ___ to Japan next month.', options: ['goes', 'went', 'will go', 'has gone'], correctIndex: 2, explanation: 'next month 表示未來，用 will go。', category: '時態', difficulty: 'beginner' },
  { id: 48, question: 'The train ___ at 9:00 a.m. every day.', options: ['leave', 'leaves', 'left', 'is leaving'], correctIndex: 1, explanation: '固定時刻表用現在簡單式，主詞單數加 -s。', category: '時態', difficulty: 'beginner' },
  { id: 49, question: 'I ___ my teeth this morning.', options: ['brush', 'brushes', 'brushed', 'brushing'], correctIndex: 2, explanation: 'this morning（已過去）用過去式。', category: '時態', difficulty: 'beginner' },
  { id: 50, question: 'My dad ___ coffee every morning.', options: ['drink', 'drinks', 'drank', 'drinking'], correctIndex: 1, explanation: '第三人稱單數每天的習慣用 drinks。', category: '時態', difficulty: 'beginner' },
  { id: 51, question: 'They ___ TV right now.', options: ['watch', 'watches', 'are watching', 'watched'], correctIndex: 2, explanation: 'right now 表示正在進行，用 are watching。', category: '時態', difficulty: 'beginner' },
  { id: 52, question: 'She ___ a letter last night.', options: ['write', 'writes', 'wrote', 'writing'], correctIndex: 2, explanation: 'last night 過去式，write → wrote。', category: '時態', difficulty: 'beginner' },
  { id: 53, question: 'I ___ go to the library after school.', options: ['am', 'do', 'will', 'was'], correctIndex: 2, explanation: '未來打算做某事用 will。', category: '時態', difficulty: 'beginner' },
  { id: 54, question: 'He ___ his homework now.', options: ['does', 'did', 'is doing', 'do'], correctIndex: 2, explanation: 'now 表示正在進行，用 is doing。', category: '時態', difficulty: 'beginner' },

  // ===== 介系詞 (12) =====
  { id: 55, question: 'The cat is ___ the table.', options: ['in', 'on', 'at', 'to'], correctIndex: 1, explanation: '在桌子上面用 on。', category: '介系詞', difficulty: 'beginner' },
  { id: 56, question: 'I go to school ___ bus.', options: ['by', 'on', 'in', 'with'], correctIndex: 0, explanation: '搭乘交通工具用 by。', category: '介系詞', difficulty: 'beginner' },
  { id: 57, question: 'She was born ___ July.', options: ['in', 'on', 'at', 'for'], correctIndex: 0, explanation: '月份前面用 in。', category: '介系詞', difficulty: 'beginner' },
  { id: 58, question: 'The class starts ___ 8 o\'clock.', options: ['in', 'on', 'at', 'by'], correctIndex: 2, explanation: '幾點鐘前面用 at。', category: '介系詞', difficulty: 'beginner' },
  { id: 59, question: 'We have a holiday ___ Christmas Day.', options: ['in', 'on', 'at', 'for'], correctIndex: 1, explanation: '特定日期前面用 on。', category: '介系詞', difficulty: 'beginner' },
  { id: 60, question: 'The ball is ___ the box.', options: ['in', 'on', 'at', 'by'], correctIndex: 0, explanation: '在箱子裡面用 in。', category: '介系詞', difficulty: 'beginner' },
  { id: 61, question: 'He is standing ___ the door.', options: ['in', 'on', 'behind', 'into'], correctIndex: 2, explanation: '在門後面用 behind。', category: '介系詞', difficulty: 'beginner' },
  { id: 62, question: 'The picture is ___ the wall.', options: ['in', 'on', 'at', 'under'], correctIndex: 1, explanation: '掛在牆壁上用 on。', category: '介系詞', difficulty: 'beginner' },
  { id: 63, question: 'I live ___ Taipei.', options: ['in', 'on', 'at', 'to'], correctIndex: 0, explanation: '城市前面用 in。', category: '介系詞', difficulty: 'beginner' },
  { id: 64, question: 'The book is ___ the desk.', options: ['under', 'on', 'at', 'in'], correctIndex: 0, explanation: '在桌子下面用 under。', category: '介系詞', difficulty: 'beginner' },
  { id: 65, question: 'Let\'s meet ___ 3:30.', options: ['in', 'on', 'at', 'by'], correctIndex: 2, explanation: '特定時間點用 at。', category: '介系詞', difficulty: 'beginner' },
  { id: 66, question: 'I was born ___ 2014.', options: ['in', 'on', 'at', 'for'], correctIndex: 0, explanation: '年份前面用 in。', category: '介系詞', difficulty: 'beginner' },

  // ===== 複數 (10) =====
  { id: 67, question: 'There are three ___ on the desk.', options: ['box', 'boxs', 'boxes', 'boxies'], correctIndex: 2, explanation: 'box 結尾是 x，複數加 -es。', category: '複數', difficulty: 'beginner' },
  { id: 68, question: 'I have two ___.', options: ['foots', 'feet', 'foot', 'feets'], correctIndex: 1, explanation: 'foot 的複數是不規則變化 feet。', category: '複數', difficulty: 'beginner' },
  { id: 69, question: 'There are five ___ in the pond.', options: ['fish', 'fishs', 'fishes', 'fishies'], correctIndex: 0, explanation: 'fish 的複數通常還是 fish（不變）。', category: '複數', difficulty: 'beginner' },
  { id: 70, question: 'I see many ___ in the park.', options: ['childs', 'children', 'childrens', 'child'], correctIndex: 1, explanation: 'child 的複數是不規則變化 children。', category: '複數', difficulty: 'beginner' },
  { id: 71, question: 'I brushed my ___ this morning.', options: ['tooths', 'teeth', 'toothes', 'tooth'], correctIndex: 1, explanation: 'tooth 的複數是 teeth（不規則）。', category: '複數', difficulty: 'beginner' },
  { id: 72, question: 'There are three ___ on the farm.', options: ['sheeps', 'sheep', 'sheepes', 'sheepies'], correctIndex: 1, explanation: 'sheep 的單複數同型。', category: '複數', difficulty: 'beginner' },
  { id: 73, question: 'We saw two ___ at the zoo.', options: ['mouses', 'mice', 'mouse', 'mices'], correctIndex: 1, explanation: 'mouse 的複數是 mice（不規則）。', category: '複數', difficulty: 'beginner' },
  { id: 74, question: 'She bought two ___ of bread.', options: ['loafs', 'loaves', 'loafes', 'loaf'], correctIndex: 1, explanation: 'loaf 結尾 f 變 v 再加 -es。', category: '複數', difficulty: 'beginner' },
  { id: 75, question: 'I have three ___.', options: ['watchs', 'watches', 'watch', 'watchies'], correctIndex: 1, explanation: 'watch 結尾是 ch，複數加 -es。', category: '複數', difficulty: 'beginner' },
  { id: 76, question: 'There are many ___ in the sky.', options: ['stars', 'star', 'stares', 'starring'], correctIndex: 0, explanation: '一般名詞複數直接加 -s。', category: '複數', difficulty: 'beginner' },

  // ===== 疑問句 (12) =====
  { id: 77, question: '___ do you live?', options: ['What', 'Where', 'Who', 'When'], correctIndex: 1, explanation: '問地點用 Where。', category: '疑問句', difficulty: 'beginner' },
  { id: 78, question: '___ is your birthday?', options: ['What', 'Where', 'When', 'Who'], correctIndex: 2, explanation: '問時間用 When。', category: '疑問句', difficulty: 'beginner' },
  { id: 79, question: '___ you like pizza?', options: ['Do', 'Does', 'Is', 'Are'], correctIndex: 0, explanation: '主詞 you 的一般疑問句用 Do。', category: '疑問句', difficulty: 'beginner' },
  { id: 80, question: '___ is that man?', options: ['What', 'Where', 'Who', 'When'], correctIndex: 2, explanation: '問人物用 Who。', category: '疑問句', difficulty: 'beginner' },
  { id: 81, question: '___ color do you like?', options: ['Who', 'Where', 'What', 'When'], correctIndex: 2, explanation: '問事物用 What。', category: '疑問句', difficulty: 'beginner' },
  { id: 82, question: '___ she have a pet?', options: ['Do', 'Does', 'Is', 'Are'], correctIndex: 1, explanation: '第三人稱單數用 Does。', category: '疑問句', difficulty: 'beginner' },
  { id: 83, question: '___ many students are there?', options: ['What', 'How', 'Who', 'Where'], correctIndex: 1, explanation: '問數量用 How many。', category: '疑問句', difficulty: 'beginner' },
  { id: 84, question: '___ old are you?', options: ['What', 'How', 'Who', 'Which'], correctIndex: 1, explanation: '問年齡用 How old。', category: '疑問句', difficulty: 'beginner' },
  { id: 85, question: '___ bag is this? It\'s Tom\'s.', options: ['Who', 'Whose', 'Which', 'What'], correctIndex: 1, explanation: '問「誰的」用 Whose。', category: '疑問句', difficulty: 'beginner' },
  { id: 86, question: '___ do you go to school? By bus.', options: ['What', 'Where', 'How', 'When'], correctIndex: 2, explanation: '問方式用 How。', category: '疑問句', difficulty: 'beginner' },
  { id: 87, question: '___ does your father do?', options: ['What', 'Where', 'How', 'When'], correctIndex: 0, explanation: '問職業用 What does ... do。', category: '疑問句', difficulty: 'beginner' },
  { id: 88, question: '___ is your favorite subject?', options: ['Who', 'Where', 'What', 'When'], correctIndex: 2, explanation: '問事物/科目用 What。', category: '疑問句', difficulty: 'beginner' },

  // ===== 連接詞 (10) =====
  { id: 89, question: 'I like dogs ___ cats.', options: ['and', 'but', 'or', 'so'], correctIndex: 0, explanation: '表示「和」用 and。', category: '連接詞', difficulty: 'beginner' },
  { id: 90, question: 'He was tired, ___ he went to bed early.', options: ['and', 'but', 'or', 'so'], correctIndex: 3, explanation: '表示「所以」用 so。', category: '連接詞', difficulty: 'beginner' },
  { id: 91, question: 'She is small ___ strong.', options: ['and', 'but', 'or', 'so'], correctIndex: 1, explanation: '前後語意轉折，用 but。', category: '連接詞', difficulty: 'beginner' },
  { id: 92, question: 'Do you want tea ___ coffee?', options: ['and', 'but', 'or', 'so'], correctIndex: 2, explanation: '表示二選一用 or。', category: '連接詞', difficulty: 'beginner' },
  { id: 93, question: 'I was hungry, ___ I ate a sandwich.', options: ['and', 'but', 'or', 'so'], correctIndex: 3, explanation: '因果關係用 so。', category: '連接詞', difficulty: 'beginner' },
  { id: 94, question: 'Study hard, ___ you will fail.', options: ['and', 'but', 'or', 'so'], correctIndex: 2, explanation: '「否則」的意思用 or。', category: '連接詞', difficulty: 'beginner' },
  { id: 95, question: 'I like math ___ I don\'t like science.', options: ['and', 'but', 'or', 'because'], correctIndex: 1, explanation: '前後語意相反，用 but。', category: '連接詞', difficulty: 'beginner' },
  { id: 96, question: 'She stayed home ___ she was sick.', options: ['and', 'but', 'or', 'because'], correctIndex: 3, explanation: '表示原因用 because。', category: '連接詞', difficulty: 'beginner' },
  { id: 97, question: 'He ran fast, ___ he missed the bus.', options: ['and', 'but', 'or', 'so'], correctIndex: 1, explanation: '跑很快但還是沒趕上，轉折用 but。', category: '連接詞', difficulty: 'beginner' },
  { id: 98, question: 'I will call you ___ I get home.', options: ['and', 'but', 'when', 'or'], correctIndex: 2, explanation: '「當…的時候」用 when。', category: '連接詞', difficulty: 'beginner' },

  // ===== There is / There are (8) =====
  { id: 99, question: 'There ___ a book on the desk.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: 'a book 是單數，用 There is。', category: 'There is/are', difficulty: 'beginner' },
  { id: 100, question: 'There ___ many people in the park.', options: ['is', 'are', 'was', 'am'], correctIndex: 1, explanation: 'many people 是複數，用 There are。', category: 'There is/are', difficulty: 'beginner' },
  { id: 101, question: 'There ___ some milk in the fridge.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: 'milk 是不可數名詞，用 There is。', category: 'There is/are', difficulty: 'beginner' },
  { id: 102, question: 'There ___ two cats in the garden.', options: ['is', 'are', 'was', 'am'], correctIndex: 1, explanation: 'two cats 是複數，用 There are。', category: 'There is/are', difficulty: 'beginner' },
  { id: 103, question: '___ there any water?', options: ['Is', 'Are', 'Do', 'Does'], correctIndex: 0, explanation: 'water 是不可數名詞，用 Is there。', category: 'There is/are', difficulty: 'beginner' },
  { id: 104, question: '___ there any cookies left?', options: ['Is', 'Are', 'Do', 'Does'], correctIndex: 1, explanation: 'cookies 是複數，用 Are there。', category: 'There is/are', difficulty: 'beginner' },
  { id: 105, question: 'There ___ a dog and two cats.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: 'There is/are 取決於最近的名詞 a dog（單數），用 is。', category: 'There is/are', difficulty: 'beginner' },
  { id: 106, question: 'There ___ no food in the kitchen.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: 'food 是不可數名詞，用 is。', category: 'There is/are', difficulty: 'beginner' },

  // ===== 否定句 (8) =====
  { id: 107, question: 'She ___ like spicy food.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 1, explanation: '第三人稱單數否定用 doesn\'t。', category: '否定句', difficulty: 'beginner' },
  { id: 108, question: 'I ___ understand this question.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 0, explanation: '主詞 I 的否定用 don\'t。', category: '否定句', difficulty: 'beginner' },
  { id: 109, question: 'They ___ come to the party yesterday.', options: ['don\'t', 'doesn\'t', 'didn\'t', 'wasn\'t'], correctIndex: 2, explanation: '過去式否定用 didn\'t。', category: '否定句', difficulty: 'beginner' },
  { id: 110, question: 'He ___ playing right now.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 2, explanation: '進行式否定用 isn\'t + V-ing。', category: '否定句', difficulty: 'beginner' },
  { id: 111, question: 'We ___ ready yet.', options: ['don\'t', 'doesn\'t', 'aren\'t', 'isn\'t'], correctIndex: 2, explanation: '主詞 We 用 aren\'t。', category: '否定句', difficulty: 'beginner' },
  { id: 112, question: 'The baby ___ sleeping.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 2, explanation: '單數主詞進行式否定用 isn\'t。', category: '否定句', difficulty: 'beginner' },
  { id: 113, question: 'He ___ have a pen.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctIndex: 1, explanation: '第三人稱單數否定用 doesn\'t + 原形動詞。', category: '否定句', difficulty: 'beginner' },
  { id: 114, question: 'I ___ late yesterday.', options: ['don\'t', 'doesn\'t', 'wasn\'t', 'weren\'t'], correctIndex: 2, explanation: '過去式 Be 動詞否定，I was → I wasn\'t。', category: '否定句', difficulty: 'beginner' },

  // ===== 助動詞初級 (8) =====
  { id: 115, question: 'Birds ___ fly.', options: ['can', 'cans', 'canning', 'could to'], correctIndex: 0, explanation: '表示能力用 can，後面接原形動詞。', category: '助動詞', difficulty: 'beginner' },
  { id: 116, question: 'You ___ run in the library.', options: ['can', 'must', "shouldn't", 'should'], correctIndex: 2, explanation: '圖書館不應該跑步，用 shouldn\'t。', category: '助動詞', difficulty: 'beginner' },
  { id: 117, question: 'You ___ brush your teeth every day.', options: ['can', 'should', 'may', 'would'], correctIndex: 1, explanation: '建議每天做的事用 should。', category: '助動詞', difficulty: 'beginner' },
  { id: 118, question: '___ I use your pen?', options: ['May', 'Must', 'Should', 'Will'], correctIndex: 0, explanation: '禮貌請求許可用 May I。', category: '助動詞', difficulty: 'beginner' },
  { id: 119, question: 'You ___ wear a helmet when riding a bike.', options: ['can', 'may', 'must', 'would'], correctIndex: 2, explanation: '強制規定用 must。', category: '助動詞', difficulty: 'beginner' },
  { id: 120, question: 'She ___ swim when she was four.', options: ['can', 'could', 'may', 'must'], correctIndex: 1, explanation: '過去的能力用 could。', category: '助動詞', difficulty: 'beginner' },
  { id: 121, question: '___ you help me, please?', options: ['Must', 'Should', 'Could', 'May'], correctIndex: 2, explanation: '禮貌請求幫忙用 Could you。', category: '助動詞', difficulty: 'beginner' },
  { id: 122, question: 'I ___ like to have some water.', options: ['can', 'may', 'would', 'must'], correctIndex: 2, explanation: '禮貌表達想要用 would like to。', category: '助動詞', difficulty: 'beginner' },

  // =============================================
  // ===== 進階 (advanced) — 約 120 題 =====
  // =============================================

  // ===== 完成式 (15) =====
  { id: 200, question: 'I ___ already finished my homework.', options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: '主詞 I 搭配 have（現在完成式）。', category: '完成式', difficulty: 'advanced' },
  { id: 201, question: 'She ___ never ___ sushi before.', options: ['have / eaten', 'has / eaten', 'had / eat', 'have / eat'], correctIndex: 1, explanation: '第三人稱 She + has never eaten。', category: '完成式', difficulty: 'advanced' },
  { id: 202, question: 'My sister ___ English since she was five.', options: ['studies', 'studied', 'has studied', 'is studying'], correctIndex: 2, explanation: 'since 搭配現在完成式 has studied。', category: '完成式', difficulty: 'advanced' },
  { id: 203, question: 'He ___ three glasses of milk today.', options: ['drinks', 'drank', 'has drunk', 'is drinking'], correctIndex: 2, explanation: 'today 還在進行中，用現在完成式 has drunk。', category: '完成式', difficulty: 'advanced' },
  { id: 204, question: 'We ___ finished yet.', options: ['don\'t', 'doesn\'t', 'haven\'t', 'hasn\'t'], correctIndex: 2, explanation: '完成式否定用 haven\'t。', category: '完成式', difficulty: 'advanced' },
  { id: 205, question: 'She ___ seen that movie.', options: ['don\'t', 'doesn\'t', 'haven\'t', 'hasn\'t'], correctIndex: 3, explanation: '第三人稱完成式否定用 hasn\'t。', category: '完成式', difficulty: 'advanced' },
  { id: 206, question: '___ you ever been to Japan?', options: ['Did', 'Do', 'Have', 'Are'], correctIndex: 2, explanation: '「曾經去過嗎」用 Have you ever been to。', category: '完成式', difficulty: 'advanced' },
  { id: 207, question: 'They ___ lived here for ten years.', options: ['are', 'were', 'have', 'had'], correctIndex: 2, explanation: 'for ten years 搭配現在完成式 have lived。', category: '完成式', difficulty: 'advanced' },
  { id: 208, question: 'She ___ just ___ home.', options: ['has / arrived', 'have / arrived', 'had / arrive', 'is / arriving'], correctIndex: 0, explanation: 'She + has just arrived（現在完成式）。', category: '完成式', difficulty: 'advanced' },
  { id: 209, question: 'I ___ known him since 2020.', options: ['am', 'was', 'have', 'had'], correctIndex: 2, explanation: 'since 2020 搭配現在完成式 have known。', category: '完成式', difficulty: 'advanced' },
  { id: 210, question: 'He had ___ the door before I arrived.', options: ['open', 'opens', 'opened', 'opening'], correctIndex: 2, explanation: '過去完成式 had + p.p.（opened）。', category: '完成式', difficulty: 'advanced' },
  { id: 211, question: 'She ___ already left when I called.', options: ['has', 'have', 'had', 'is'], correctIndex: 2, explanation: '過去的過去用過去完成式 had left。', category: '完成式', difficulty: 'advanced' },
  { id: 212, question: 'We ___ been waiting for two hours.', options: ['are', 'were', 'have', 'had'], correctIndex: 2, explanation: '現在完成進行式 have been waiting。', category: '完成式', difficulty: 'advanced' },
  { id: 213, question: 'How long ___ you studied Chinese?', options: ['did', 'do', 'have', 'are'], correctIndex: 2, explanation: '問持續多久用完成式 have you studied。', category: '完成式', difficulty: 'advanced' },
  { id: 214, question: 'She has been ___ piano since she was six.', options: ['play', 'plays', 'playing', 'played'], correctIndex: 2, explanation: '完成進行式 has been + V-ing。', category: '完成式', difficulty: 'advanced' },

  // ===== 過去進行式 (10) =====
  { id: 220, question: 'He ___ his bike when it started to rain.', options: ['rides', 'rode', 'was riding', 'is riding'], correctIndex: 2, explanation: '過去某個時間正在做某事，用過去進行式 was riding。', category: '過去進行式', difficulty: 'advanced' },
  { id: 221, question: 'I ___ TV when you called me.', options: ['watch', 'watched', 'was watching', 'am watching'], correctIndex: 2, explanation: '過去進行中被打斷，用 was watching。', category: '過去進行式', difficulty: 'advanced' },
  { id: 222, question: 'They ___ dinner when the doorbell rang.', options: ['eat', 'ate', 'were eating', 'are eating'], correctIndex: 2, explanation: '複數主詞過去進行式用 were eating。', category: '過去進行式', difficulty: 'advanced' },
  { id: 223, question: 'She ___ a song when I walked in.', options: ['sings', 'sang', 'was singing', 'is singing'], correctIndex: 2, explanation: '過去正在做某事用 was singing。', category: '過去進行式', difficulty: 'advanced' },
  { id: 224, question: 'While I ___ studying, my brother was playing.', options: ['am', 'is', 'was', 'were'], correctIndex: 2, explanation: '主詞 I 過去進行式用 was。', category: '過去進行式', difficulty: 'advanced' },
  { id: 225, question: 'At 8 p.m. last night, we ___ homework.', options: ['do', 'did', 'were doing', 'are doing'], correctIndex: 2, explanation: '過去某個特定時間點正在做的事。', category: '過去進行式', difficulty: 'advanced' },
  { id: 226, question: 'The baby ___ when I got home.', options: ['cries', 'cried', 'was crying', 'is crying'], correctIndex: 2, explanation: '過去到家時寶寶正在哭。', category: '過去進行式', difficulty: 'advanced' },
  { id: 227, question: 'What ___ you doing at 10 a.m. yesterday?', options: ['are', 'is', 'were', 'was'], correctIndex: 2, explanation: '主詞 you 過去進行式用 were。', category: '過去進行式', difficulty: 'advanced' },
  { id: 228, question: 'While she ___ cooking, he was cleaning.', options: ['is', 'was', 'were', 'are'], correctIndex: 1, explanation: 'She 用 was cooking。', category: '過去進行式', difficulty: 'advanced' },
  { id: 229, question: 'I ___ sleeping when the earthquake happened.', options: ['am', 'was', 'were', 'is'], correctIndex: 1, explanation: '地震發生時我正在睡覺，用 was sleeping。', category: '過去進行式', difficulty: 'advanced' },

  // ===== 比較級與最高級 (12) =====
  { id: 240, question: 'Tom is ___ than Jerry.', options: ['tall', 'taller', 'tallest', 'more tall'], correctIndex: 1, explanation: '兩者比較用比較級 taller。', category: '比較級', difficulty: 'advanced' },
  { id: 241, question: 'This is the ___ book I have ever read.', options: ['good', 'better', 'best', 'most good'], correctIndex: 2, explanation: '三者以上用最高級 best。', category: '比較級', difficulty: 'advanced' },
  { id: 242, question: 'My bag is ___ than yours.', options: ['heavy', 'heavier', 'heaviest', 'more heavy'], correctIndex: 1, explanation: 'heavy 的比較級是 heavier。', category: '比較級', difficulty: 'advanced' },
  { id: 243, question: 'This movie is ___ than that one.', options: ['interesting', 'more interesting', 'most interesting', 'interestinger'], correctIndex: 1, explanation: '多音節形容詞用 more + 原形。', category: '比較級', difficulty: 'advanced' },
  { id: 244, question: 'She is the ___ girl in our school.', options: ['beautiful', 'more beautiful', 'most beautiful', 'beautifulest'], correctIndex: 2, explanation: '最高級用 the most + 多音節形容詞。', category: '比較級', difficulty: 'advanced' },
  { id: 245, question: 'My score is ___ than his.', options: ['bad', 'worse', 'worst', 'more bad'], correctIndex: 1, explanation: 'bad 的比較級是不規則變化 worse。', category: '比較級', difficulty: 'advanced' },
  { id: 246, question: 'He runs the ___ in the team.', options: ['fast', 'faster', 'fastest', 'most fast'], correctIndex: 2, explanation: '最高級用 the fastest。', category: '比較級', difficulty: 'advanced' },
  { id: 247, question: 'This road is ___ than that one.', options: ['long', 'longer', 'longest', 'more long'], correctIndex: 1, explanation: '兩者比較用 longer。', category: '比較級', difficulty: 'advanced' },
  { id: 248, question: 'Today is ___ than yesterday.', options: ['cold', 'colder', 'coldest', 'more cold'], correctIndex: 1, explanation: '兩者比較用比較級 colder。', category: '比較級', difficulty: 'advanced' },
  { id: 249, question: 'This test was the ___ of all.', options: ['easy', 'easier', 'easiest', 'most easy'], correctIndex: 2, explanation: '三者以上最高級 easiest。', category: '比較級', difficulty: 'advanced' },
  { id: 250, question: 'She is as ___ as her mother.', options: ['tall', 'taller', 'tallest', 'more tall'], correctIndex: 0, explanation: 'as...as 中間用原級 tall。', category: '比較級', difficulty: 'advanced' },
  { id: 251, question: 'This is the ___ expensive watch in the store.', options: ['more', 'most', 'much', 'very'], correctIndex: 1, explanation: '最高級用 the most expensive。', category: '比較級', difficulty: 'advanced' },

  // ===== 被動語態 (10) =====
  { id: 260, question: 'The cake ___ made by Mom.', options: ['is', 'was', 'were', 'are'], correctIndex: 1, explanation: '被動語態過去式 was made。', category: '被動語態', difficulty: 'advanced' },
  { id: 261, question: 'English ___ spoken in many countries.', options: ['is', 'was', 'are', 'am'], correctIndex: 0, explanation: '一般事實被動式 is spoken。', category: '被動語態', difficulty: 'advanced' },
  { id: 262, question: 'The windows ___ cleaned every week.', options: ['is', 'was', 'are', 'am'], correctIndex: 2, explanation: '主詞 windows 是複數，用 are cleaned。', category: '被動語態', difficulty: 'advanced' },
  { id: 263, question: 'This song ___ written by a famous singer.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: '過去被寫的，用 was written。', category: '被動語態', difficulty: 'advanced' },
  { id: 264, question: 'The homework ___ done by the students.', options: ['is', 'was', 'are', 'am'], correctIndex: 1, explanation: '作業已被完成，用 was done。', category: '被動語態', difficulty: 'advanced' },
  { id: 265, question: 'These photos ___ taken last summer.', options: ['is', 'was', 'were', 'are'], correctIndex: 2, explanation: '複數主詞過去被動用 were taken。', category: '被動語態', difficulty: 'advanced' },
  { id: 266, question: 'The letter ___ sent yesterday.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: '單數過去被動用 was sent。', category: '被動語態', difficulty: 'advanced' },
  { id: 267, question: 'The school ___ built in 1990.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: '過去被建造用 was built。', category: '被動語態', difficulty: 'advanced' },
  { id: 268, question: 'The books ___ sold out quickly.', options: ['is', 'was', 'are', 'were'], correctIndex: 3, explanation: '複數主詞過去被動用 were sold out。', category: '被動語態', difficulty: 'advanced' },
  { id: 269, question: 'The bridge ___ being repaired now.', options: ['is', 'was', 'are', 'were'], correctIndex: 0, explanation: '現在進行被動 is being repaired。', category: '被動語態', difficulty: 'advanced' },

  // ===== 附加問句 (10) =====
  { id: 280, question: 'She is a doctor, ___ she?', options: ["isn't", "doesn't", "won't", "hasn't"], correctIndex: 0, explanation: '前面肯定 is，後面否定 isn\'t she。', category: '附加問句', difficulty: 'advanced' },
  { id: 281, question: 'You can swim, ___ you?', options: ["can't", "don't", "won't", "aren't"], correctIndex: 0, explanation: '前面肯定 can，後面否定 can\'t you。', category: '附加問句', difficulty: 'advanced' },
  { id: 282, question: 'They don\'t like coffee, ___ they?', options: ['don\'t', 'do', 'are', 'aren\'t'], correctIndex: 1, explanation: '前面否定 don\'t，後面肯定 do they。', category: '附加問句', difficulty: 'advanced' },
  { id: 283, question: 'He went home, ___ he?', options: ["isn't", "didn't", "doesn't", "won't"], correctIndex: 1, explanation: '前面過去式肯定 went，後面否定 didn\'t he。', category: '附加問句', difficulty: 'advanced' },
  { id: 284, question: 'It won\'t rain, ___ it?', options: ["won't", 'will', "doesn't", 'is'], correctIndex: 1, explanation: '前面否定 won\'t，後面肯定 will it。', category: '附加問句', difficulty: 'advanced' },
  { id: 285, question: 'She has been here, ___ she?', options: ["isn't", "hasn't", "doesn't", "wasn't"], correctIndex: 1, explanation: '完成式 has → hasn\'t she。', category: '附加問句', difficulty: 'advanced' },
  { id: 286, question: 'You are coming, ___ you?', options: ["don't", "aren't", "won't", "can't"], correctIndex: 1, explanation: '前面 are，後面 aren\'t you。', category: '附加問句', difficulty: 'advanced' },
  { id: 287, question: 'He couldn\'t do it, ___ he?', options: ["couldn't", 'could', "can't", 'can'], correctIndex: 1, explanation: '前面否定 couldn\'t，後面肯定 could he。', category: '附加問句', difficulty: 'advanced' },
  { id: 288, question: 'Let\'s go, ___ we?', options: ["don't", 'shall', "won't", "can't"], correctIndex: 1, explanation: 'Let\'s 的附加問句用 shall we。', category: '附加問句', difficulty: 'advanced' },
  { id: 289, question: 'Nobody likes him, ___ they?', options: ["don't", 'do', "doesn't", 'does'], correctIndex: 1, explanation: 'nobody 是否定，後面肯定 do they。', category: '附加問句', difficulty: 'advanced' },

  // ===== 不定詞與動名詞 (10) =====
  { id: 300, question: 'I enjoy ___ music.', options: ['listen', 'to listen', 'listening', 'listened'], correctIndex: 2, explanation: 'enjoy 後面接動名詞 V-ing。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 301, question: 'She wants ___ a doctor.', options: ['be', 'to be', 'being', 'been'], correctIndex: 1, explanation: 'want 後面接不定詞 to + V。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 302, question: 'I finished ___ my homework.', options: ['do', 'to do', 'doing', 'did'], correctIndex: 2, explanation: 'finish 後面接動名詞 V-ing。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 303, question: 'They decided ___ to the beach.', options: ['go', 'to go', 'going', 'went'], correctIndex: 1, explanation: 'decide 後面接不定詞 to go。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 304, question: 'Stop ___ so much noise!', options: ['make', 'to make', 'making', 'made'], correctIndex: 2, explanation: 'stop 後面接動名詞表示停止做某事。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 305, question: 'He avoided ___ her.', options: ['meet', 'to meet', 'meeting', 'met'], correctIndex: 2, explanation: 'avoid 後面接動名詞 meeting。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 306, question: 'I hope ___ you again soon.', options: ['see', 'to see', 'seeing', 'saw'], correctIndex: 1, explanation: 'hope 後面接不定詞 to see。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 307, question: 'She suggested ___ a movie.', options: ['watch', 'to watch', 'watching', 'watched'], correctIndex: 2, explanation: 'suggest 後面接動名詞 watching。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 308, question: 'He promised ___ on time.', options: ['come', 'to come', 'coming', 'came'], correctIndex: 1, explanation: 'promise 後面接不定詞 to come。', category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 309, question: 'I can\'t help ___ when I see the puppy.', options: ['smile', 'to smile', 'smiling', 'smiled'], correctIndex: 2, explanation: 'can\'t help + V-ing 表示忍不住。', category: '不定詞與動名詞', difficulty: 'advanced' },

  // ===== 形容詞與副詞 (10) =====
  { id: 320, question: 'She sings ___.', options: ['beautiful', 'beautifully', 'beauty', 'beautifuls'], correctIndex: 1, explanation: '修飾動詞要用副詞 beautifully。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 321, question: 'He is a ___ runner.', options: ['fast', 'fastly', 'faster', 'fastest'], correctIndex: 0, explanation: 'fast 本身可當形容詞修飾名詞。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 322, question: 'She speaks English very ___.', options: ['good', 'well', 'better', 'best'], correctIndex: 1, explanation: '修飾動詞 speak 要用副詞 well。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 323, question: 'The test was really ___.', options: ['difficulty', 'difficultly', 'difficult', 'difficults'], correctIndex: 2, explanation: 'be 動詞後面接形容詞 difficult。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 324, question: 'He drives very ___.', options: ['careful', 'carefully', 'careless', 'care'], correctIndex: 1, explanation: '修飾動詞 drive 要用副詞 carefully。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 325, question: 'The baby is sleeping ___.', options: ['quiet', 'quietly', 'quieter', 'quietness'], correctIndex: 1, explanation: '修飾動詞 sleep 要用副詞 quietly。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 326, question: 'That sounds ___.', options: ['great', 'greatly', 'greater', 'greatness'], correctIndex: 0, explanation: '感官動詞 sound 後面接形容詞。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 327, question: 'He ran ___ to catch the bus.', options: ['quick', 'quickly', 'quicker', 'quickest'], correctIndex: 1, explanation: '修飾動詞 ran 要用副詞 quickly。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 328, question: 'The soup tastes ___.', options: ['delicious', 'deliciously', 'deliciousness', 'more delicious'], correctIndex: 0, explanation: '感官動詞 taste 後面接形容詞。', category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 329, question: 'She did her homework ___.', options: ['easy', 'easily', 'easier', 'easiest'], correctIndex: 1, explanation: '修飾動詞 did 要用副詞 easily。', category: '形容詞與副詞', difficulty: 'advanced' },

  // ===== 關係代名詞 (10) =====
  { id: 340, question: 'The boy ___ is running is my brother.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: '先行詞是人，用 who。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 341, question: 'The book ___ I bought is very good.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: '先行詞是物，用 which（或 that）。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 342, question: 'The girl ___ father is a doctor is my friend.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 2, explanation: '「誰的」用 whose。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 343, question: 'This is the house ___ we lived in.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: '先行詞是物（house），用 which。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 344, question: 'The man ___ you met yesterday is my uncle.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 3, explanation: '受格位置用 whom（或 who/that）。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 345, question: 'I have a friend ___ can speak five languages.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: '先行詞是人，主格位置用 who。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 346, question: 'The dog ___ bit me was brown.', options: ['who', 'that', 'whose', 'whom'], correctIndex: 1, explanation: '動物可用 that 或 which。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 347, question: 'The teacher ___ class I enjoy is Ms. Lin.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 2, explanation: '「誰的課」用 whose class。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 348, question: 'Everything ___ he said was true.', options: ['who', 'which', 'that', 'whose'], correctIndex: 2, explanation: '先行詞是 everything，用 that。', category: '關係代名詞', difficulty: 'advanced' },
  { id: 349, question: 'The place ___ we visited was beautiful.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: '先行詞是地方（place），用 which。', category: '關係代名詞', difficulty: 'advanced' },

  // ===== 條件句 (10) =====
  { id: 360, question: 'If it ___ tomorrow, we will stay home.', options: ['rain', 'rains', 'rained', 'will rain'], correctIndex: 1, explanation: '條件句（if 子句）用現在式 rains。', category: '條件句', difficulty: 'advanced' },
  { id: 361, question: 'If I ___ rich, I would travel the world.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: '與現在事實相反的假設用 were。', category: '條件句', difficulty: 'advanced' },
  { id: 362, question: 'She will come if you ___ her.', options: ['invite', 'invites', 'invited', 'will invite'], correctIndex: 0, explanation: 'if 子句用現在式，主詞 you 用原形。', category: '條件句', difficulty: 'advanced' },
  { id: 363, question: 'If he had studied harder, he ___ the test.', options: ['passes', 'passed', 'would have passed', 'will pass'], correctIndex: 2, explanation: '與過去事實相反用 would have + p.p.。', category: '條件句', difficulty: 'advanced' },
  { id: 364, question: 'If you heat water to 100°C, it ___.', options: ['boil', 'boils', 'boiled', 'will boil'], correctIndex: 1, explanation: '科學事實用現在簡單式 boils。', category: '條件句', difficulty: 'advanced' },
  { id: 365, question: 'I would help you if I ___ free.', options: ['am', 'is', 'were', 'will be'], correctIndex: 2, explanation: '假設語氣用 were。', category: '條件句', difficulty: 'advanced' },
  { id: 366, question: 'If she ___ earlier, she wouldn\'t miss the bus.', options: ['wake', 'wakes', 'woke', 'had woken'], correctIndex: 2, explanation: '與現在相反假設，if 子句用過去式。', category: '條件句', difficulty: 'advanced' },
  { id: 367, question: 'Unless you hurry, you ___ be late.', options: ['won\'t', 'will', 'would', 'can'], correctIndex: 1, explanation: 'unless = if not，你不趕快就會遲到。', category: '條件句', difficulty: 'advanced' },
  { id: 368, question: 'If I ___ you, I would apologize.', options: ['am', 'is', 'were', 'was'], correctIndex: 2, explanation: 'If I were you 是固定用法。', category: '條件句', difficulty: 'advanced' },
  { id: 369, question: 'What would you do if you ___ a million dollars?', options: ['have', 'has', 'had', 'will have'], correctIndex: 2, explanation: '假設語氣 if 子句用過去式 had。', category: '條件句', difficulty: 'advanced' },

  // ===== 間接問句 (8) =====
  { id: 380, question: 'I don\'t know where he ___.', options: ['live', 'lives', 'does live', 'is live'], correctIndex: 1, explanation: '間接問句用肯定語序 where he lives。', category: '間接問句', difficulty: 'advanced' },
  { id: 381, question: 'Do you know what time it ___?', options: ['is', 'are', 'does', 'do'], correctIndex: 0, explanation: '間接問句用肯定語序 what time it is。', category: '間接問句', difficulty: 'advanced' },
  { id: 382, question: 'Can you tell me where the bank ___?', options: ['is', 'does', 'are', 'do'], correctIndex: 0, explanation: '間接問句 where the bank is（肯定語序）。', category: '間接問句', difficulty: 'advanced' },
  { id: 383, question: 'I wonder why she ___ crying.', options: ['is', 'does', 'do', 'are'], correctIndex: 0, explanation: '間接問句 why she is crying。', category: '間接問句', difficulty: 'advanced' },
  { id: 384, question: 'He asked me how old I ___.', options: ['am', 'is', 'was', 'were'], correctIndex: 2, explanation: '間接問句且主句過去式，用 was。', category: '間接問句', difficulty: 'advanced' },
  { id: 385, question: 'Please tell me what you ___ for dinner.', options: ['want', 'wants', 'wanted', 'wanting'], correctIndex: 0, explanation: '間接問句 what you want（肯定語序）。', category: '間接問句', difficulty: 'advanced' },
  { id: 386, question: 'I\'m not sure when the meeting ___.', options: ['start', 'starts', 'started', 'starting'], correctIndex: 1, explanation: '間接問句 when the meeting starts。', category: '間接問句', difficulty: 'advanced' },
  { id: 387, question: 'Do you know who ___ the window?', options: ['break', 'broke', 'breaks', 'breaking'], correctIndex: 1, explanation: 'who 是主詞，過去式用 broke。', category: '間接問句', difficulty: 'advanced' },

  // ===== 感嘆句 (6) =====
  { id: 390, question: '___ a beautiful day it is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: 'What + a/an + adj + N 的感嘆句。', category: '感嘆句', difficulty: 'advanced' },
  { id: 391, question: '___ fast he runs!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: 'How + adj/adv 的感嘆句。', category: '感嘆句', difficulty: 'advanced' },
  { id: 392, question: '___ delicious food!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: 'What + adj + 不可數名詞感嘆句。', category: '感嘆句', difficulty: 'advanced' },
  { id: 393, question: '___ clever the boy is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: 'How + adj + 主詞 + be 動詞的感嘆句。', category: '感嘆句', difficulty: 'advanced' },
  { id: 394, question: '___ nice flowers they are!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: 'What + adj + 複數名詞感嘆句。', category: '感嘆句', difficulty: 'advanced' },
  { id: 395, question: '___ hard she works!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: 'How + adv 的感嘆句。', category: '感嘆句', difficulty: 'advanced' },

  // ===== 使役動詞 (8) =====
  { id: 400, question: 'Mom made me ___ my room.', options: ['clean', 'to clean', 'cleaning', 'cleaned'], correctIndex: 0, explanation: 'make + 受詞 + 原形動詞。', category: '使役動詞', difficulty: 'advanced' },
  { id: 401, question: 'The teacher let us ___ early.', options: ['leave', 'to leave', 'leaving', 'left'], correctIndex: 0, explanation: 'let + 受詞 + 原形動詞。', category: '使役動詞', difficulty: 'advanced' },
  { id: 402, question: 'I had my hair ___.', options: ['cut', 'to cut', 'cutting', 'cuts'], correctIndex: 0, explanation: 'have + 物 + p.p. 表示請人做。', category: '使役動詞', difficulty: 'advanced' },
  { id: 403, question: 'She got her brother ___ the dishes.', options: ['wash', 'to wash', 'washing', 'washed'], correctIndex: 1, explanation: 'get + 人 + to V。', category: '使役動詞', difficulty: 'advanced' },
  { id: 404, question: 'Don\'t make the baby ___.', options: ['cry', 'to cry', 'crying', 'cried'], correctIndex: 0, explanation: 'make + 受詞 + 原形動詞。', category: '使役動詞', difficulty: 'advanced' },
  { id: 405, question: 'He had his car ___.', options: ['repair', 'to repair', 'repairing', 'repaired'], correctIndex: 3, explanation: 'have + 物 + p.p.（請人修車）。', category: '使役動詞', difficulty: 'advanced' },
  { id: 406, question: 'She let the children ___ in the garden.', options: ['play', 'to play', 'playing', 'played'], correctIndex: 0, explanation: 'let + 受詞 + 原形動詞。', category: '使役動詞', difficulty: 'advanced' },
  { id: 407, question: 'I\'ll get someone ___ the window.', options: ['fix', 'to fix', 'fixing', 'fixed'], correctIndex: 1, explanation: 'get + 人 + to V。', category: '使役動詞', difficulty: 'advanced' },

  // ===== 連接詞進階 (10) =====
  { id: 420, question: 'I was late ___ I missed the bus.', options: ['because', 'although', 'so', 'but'], correctIndex: 0, explanation: '表原因用 because。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 421, question: '___ it was raining, we went out.', options: ['Because', 'Although', 'So', 'Unless'], correctIndex: 1, explanation: '雖然下雨但還是出去了，用 Although。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 422, question: 'I\'ll wait ___ you come back.', options: ['after', 'until', 'before', 'unless'], correctIndex: 1, explanation: '「直到你回來」用 until。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 423, question: 'She left ___ I arrived.', options: ['after', 'before', 'until', 'unless'], correctIndex: 1, explanation: '她在我到達之前就離開了，用 before。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 424, question: '___ you study hard, you won\'t pass.', options: ['If', 'Unless', 'Although', 'Because'], correctIndex: 1, explanation: 'unless = if not（除非你用功讀書）。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 425, question: 'He is not only smart ___ also hardworking.', options: ['and', 'but', 'or', 'so'], correctIndex: 1, explanation: 'not only...but also 固定搭配。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 426, question: 'Take an umbrella ___ it rains.', options: ['so that', 'in case', 'unless', 'although'], correctIndex: 1, explanation: '以防下雨用 in case。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 427, question: 'I turned off the TV ___ I could study.', options: ['so that', 'in case', 'unless', 'although'], correctIndex: 0, explanation: '為了能讀書用 so that。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 428, question: '___ she is young, she is very wise.', options: ['Because', 'Although', 'Unless', 'Until'], correctIndex: 1, explanation: '雖然年輕但很有智慧，用 Although。', category: '連接詞進階', difficulty: 'advanced' },
  { id: 429, question: 'He studied hard ___ he could pass the exam.', options: ['so that', 'although', 'unless', 'before'], correctIndex: 0, explanation: '為了通過考試用 so that。', category: '連接詞進階', difficulty: 'advanced' },
];
