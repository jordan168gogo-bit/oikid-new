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

  // ===== 完成式 (20) =====
  { id: 200, question: 'I ___ already finished my homework.', options: ['has', 'have', 'had', 'having'], correctIndex: 1, explanation: `🌐 翻譯：我已經寫完作業了。
🎯 考點：現在完成式 = have/has + 過去分詞 (p.p.)；主詞 I 搭配 have。
❌ 為什麼不選：
  • has — 限第三人稱單數（he/she/it）使用。
  • had — 過去完成式，需有「過去更早之前」的時間參照才用。
  • having — 動名詞或現在分詞，不能單獨擔任助動詞。
💡 延伸：already 是完成式常用副詞，固定放在 have/has 與 p.p. 之間。`, category: '完成式', difficulty: 'advanced' },
  { id: 201, question: 'She ___ never ___ sushi before.', options: ['have / eaten', 'has / eaten', 'had / eat', 'have / eat'], correctIndex: 1, explanation: `🌐 翻譯：她以前從來沒吃過壽司。
🎯 考點：現在完成式表「曾經/從未經歷過」；第三人稱 She → has + 過去分詞 eaten。
❌ 為什麼不選：
  • have / eaten — have 不能用於 She。
  • had / eat — 完成式要 p.p.，eat 是原形。
  • have / eat — 兩個錯誤都犯了。
💡 延伸：never / ever 是完成式經驗用法的代表副詞，配合 before 強化「至今為止從未」。`, category: '完成式', difficulty: 'advanced' },
  { id: 202, question: 'My sister ___ English since she was five.', options: ['studies', 'studied', 'has studied', 'is studying'], correctIndex: 2, explanation: `🌐 翻譯：我妹妹從五歲開始就學英文（學到現在）。
🎯 考點：since + 過去時間點 → 必搭現在完成式，表「持續到現在」。
❌ 為什麼不選：
  • studies — 現在簡單式，無法表達「從過去到現在」。
  • studied — 過去式，動作只發生在過去，不含「持續到現在」。
  • is studying — 現在進行式只表「此刻正在做」。
💡 延伸：for + 時段（for 8 years）也搭完成式；since 後面接時間點，for 後面接時段。`, category: '完成式', difficulty: 'advanced' },
  { id: 203, question: 'He ___ three glasses of milk today.', options: ['drinks', 'drank', 'has drunk', 'is drinking'], correctIndex: 2, explanation: `🌐 翻譯：他今天已經喝了三杯牛奶（今天還沒結束）。
🎯 考點：today / this week / this year 等「尚未結束的時段」配現在完成式，表結果累積至今。
❌ 為什麼不選：
  • drinks — 現在簡單式只表習慣，無法表達累積結果。
  • drank — 過去式暗示「今天已經結束」，與 today 衝突。
  • is drinking — 表此刻正在喝，但題意是已經喝完三杯。
💡 延伸：drink 三態 = drink / drank / drunk（注意 p.p. 是 drunk 不是 drank）。`, category: '完成式', difficulty: 'advanced' },
  { id: 204, question: 'We ___ finished yet.', options: ['don\'t', 'doesn\'t', 'haven\'t', 'hasn\'t'], correctIndex: 2, explanation: `🌐 翻譯：我們還沒做完。
🎯 考點：完成式否定 = have/has + not + p.p.；主詞 We → haven't。
❌ 為什麼不選：
  • don't / doesn't — 配現在簡單式原形動詞，不能配 p.p.。
  • hasn't — 限第三人稱單數。
💡 延伸：yet（還沒）幾乎只出現在完成式否定與疑問句中，固定放句尾。`, category: '完成式', difficulty: 'advanced' },
  { id: 205, question: 'She ___ seen that movie.', options: ['don\'t', 'doesn\'t', 'haven\'t', 'hasn\'t'], correctIndex: 3, explanation: `🌐 翻譯：她沒看過那部電影。
🎯 考點：完成式否定，第三人稱單數 She → hasn't + p.p.。
❌ 為什麼不選：
  • don't / doesn't — 為簡單式否定，無法接 p.p. (seen)。
  • haven't — 限 I / you / we / they / 複數。
💡 延伸：see 三態 = see / saw / seen，p.p. 是 seen 不是 saw。`, category: '完成式', difficulty: 'advanced' },
  { id: 206, question: '___ you ever been to Japan?', options: ['Did', 'Do', 'Have', 'Are'], correctIndex: 2, explanation: `🌐 翻譯：你曾經去過日本嗎？
🎯 考點：「曾經去過某地」固定句型 = Have/Has + 主詞 + ever been to ...？
❌ 為什麼不選：
  • Did — 配原形動詞，而非 p.p.。
  • Do — 同上，且不能表「曾經」。
  • Are — be 動詞無法搭 ever been to。
💡 延伸：have been to（去過、已回來）vs have gone to（去了還沒回來），兩者意義不同。`, category: '完成式', difficulty: 'advanced' },
  { id: 207, question: 'They ___ lived here for ten years.', options: ['are', 'were', 'have', 'had'], correctIndex: 2, explanation: `🌐 翻譯：他們已經住這裡十年了。
🎯 考點：for + 時段（for ten years）+ 完成式表「持續至今」。複數主詞用 have。
❌ 為什麼不選：
  • are / were — be 動詞，無法接 lived (p.p.)。
  • had — 過去完成式須有「過去之前更早」參照。
💡 延伸：have lived = have been living，意思幾乎相同；後者更強調「持續不斷」。`, category: '完成式', difficulty: 'advanced' },
  { id: 208, question: 'She ___ just ___ home.', options: ['has / arrived', 'have / arrived', 'had / arrive', 'is / arriving'], correctIndex: 0, explanation: `🌐 翻譯：她剛剛到家。
🎯 考點：just（剛剛）+ 現在完成式，第三人稱單數 She → has + p.p.。
❌ 為什麼不選：
  • have / arrived — have 不可用於 She。
  • had / arrive — 完成式需要 p.p.，arrive 是原形。
  • is / arriving — 現在進行式表「此刻正在到達」，但 just 暗示動作剛完成。
💡 延伸：just / already / yet / recently 都是完成式高頻搭配副詞。`, category: '完成式', difficulty: 'advanced' },
  { id: 209, question: 'I ___ known him since 2020.', options: ['am', 'was', 'have', 'had'], correctIndex: 2, explanation: `🌐 翻譯：我從 2020 年就認識他了。
🎯 考點：since 後接時間點，搭配現在完成式表「持續到現在」。主詞 I → have known。
❌ 為什麼不選：
  • am / was — be 動詞，無法接 known (p.p.)。
  • had — 過去完成式需「過去更早之前」的對照時間。
💡 延伸：know 屬於「狀態動詞」，幾乎只用完成式（不用完成進行式）—— ✓ have known，✗ have been knowing。`, category: '完成式', difficulty: 'advanced' },
  { id: 210, question: 'He had ___ the door before I arrived.', options: ['open', 'opens', 'opened', 'opening'], correctIndex: 2, explanation: `🌐 翻譯：在我到達之前，他已經把門打開了。
🎯 考點：過去完成式 had + p.p.，表「過去的過去」（先發生的動作）。
❌ 為什麼不選：
  • open / opens — 原形或現在式無法搭 had。
  • opening — 是 V-ing，had + V-ing 不成立。
💡 延伸：兩件過去事件並列時，先發生的用 had + p.p.（過完），後發生的用過去式。`, category: '完成式', difficulty: 'advanced' },
  { id: 211, question: 'She ___ already left when I called.', options: ['has', 'have', 'had', 'is'], correctIndex: 2, explanation: `🌐 翻譯：我打電話時她已經離開了。
🎯 考點：當主句是過去（called），暗示「更早之前」就發生的事用過去完成式 had + p.p.。
❌ 為什麼不選：
  • has / have — 現在完成式，但時間參照是過去（called）。
  • is — be 動詞不能接 left (p.p.)。
💡 延伸：過去完成式常見搭配 when / before / after / by the time。`, category: '完成式', difficulty: 'advanced' },
  { id: 212, question: 'We ___ been waiting for two hours.', options: ['are', 'were', 'have', 'had'], correctIndex: 2, explanation: `🌐 翻譯：我們已經等了兩個小時了。
🎯 考點：現在完成進行式 = have/has been + V-ing，強調「從過去持續到現在仍在做」。複數主詞 We → have。
❌ 為什麼不選：
  • are / were — be 動詞不能後接 been。
  • had — 過去完成進行式須有過去時間參照。
💡 延伸：完成進行式特別強調「持續中」；對比 have waited（只強調結果）vs have been waiting（強調過程）。`, category: '完成式', difficulty: 'advanced' },
  { id: 213, question: 'How long ___ you studied Chinese?', options: ['did', 'do', 'have', 'are'], correctIndex: 2, explanation: `🌐 翻譯：你學中文學多久了？
🎯 考點：問「持續多久」用 How long + 完成式。
❌ 為什麼不選：
  • did — 為過去式問句，但問「至今多久」要用完成式。
  • do — 為現在簡單式問句，無法接 studied (p.p.)。
  • are — be 動詞不能接 studied。
💡 延伸：回答常見句型 = I have studied Chinese for/since ...。`, category: '完成式', difficulty: 'advanced' },
  { id: 214, question: 'She has been ___ piano since she was six.', options: ['play', 'plays', 'playing', 'played'], correctIndex: 2, explanation: `🌐 翻譯：她從六歲開始就一直彈鋼琴。
🎯 考點：現在完成進行式 has been + V-ing，強調「持續至今仍在做」。
❌ 為什麼不選：
  • play / plays — 原形或現在式無法搭 has been。
  • played — 是 p.p.，has been played 變成完成進行被動，語意不通。
💡 延伸：「彈樂器」前一定要加 the（play the piano、play the guitar）；運動則不加（play basketball）。`, category: '完成式', difficulty: 'advanced' },
  { id: 215, question: 'By the time we got there, the movie ___.', options: ['has started', 'had started', 'starts', 'is starting'], correctIndex: 1, explanation: `🌐 翻譯：等我們到達時，電影已經開始了。
🎯 考點：By the time + 過去式子句 → 主句用過去完成式 had + p.p.，表「在那之前就已發生」。
❌ 為什麼不選：
  • has started — 現在完成式無法搭過去時間參照。
  • starts — 現在式不能表已發生事件。
  • is starting — 現在進行式只能表此刻正在開始。
💡 延伸：By the time = When + 強調「在那個時刻之前已經完成」。`, category: '完成式', difficulty: 'advanced' },
  { id: 216, question: 'They ___ for the train since 6 a.m.', options: ['wait', 'waited', 'have been waiting', 'were waiting'], correctIndex: 2, explanation: `🌐 翻譯：他們從早上六點就一直在等火車。
🎯 考點：since + 時間點 + 強調「持續動作」→ 現在完成進行式 have been + V-ing。
❌ 為什麼不選：
  • wait — 原形動詞無法搭 since。
  • waited — 過去式暗示動作已結束，但題意是仍在等。
  • were waiting — 過去進行式只表過去某時點正在做。
💡 延伸：對比題 — They have waited for an hour（強調結果）vs They have been waiting for an hour（強調持續性與不耐煩語氣）。`, category: '完成式', difficulty: 'advanced' },
  { id: 217, question: 'I realized I ___ my wallet at home.', options: ['leave', 'left', 'have left', 'had left'], correctIndex: 3, explanation: `🌐 翻譯：我發現我把錢包留在家裡了。
🎯 考點：主句 realized 是過去式，「發現的當下，更早之前就已發生」→ 過去完成式 had + p.p.。
❌ 為什麼不選：
  • leave — 現在式，與過去主句時態不一致。
  • left — 過去式，無法表「過去之前的更早」。
  • have left — 現在完成式須搭現在時間參照。
💡 延伸：時態一致原則：主句過去 → 子句若更早，用過去完成式。`, category: '完成式', difficulty: 'advanced' },
  { id: 218, question: 'This is the most exciting movie I ___ ever seen.', options: ['am', 'was', 'have', 'had'], correctIndex: 2, explanation: `🌐 翻譯：這是我看過最刺激的電影。
🎯 考點：「最高級 + that/which + 主詞 + have/has ever + p.p.」是固定句型，表「至今所經歷過最…的」。
❌ 為什麼不選：
  • am / was — be 動詞不能接 seen。
  • had — 此處要表「至今經驗」，用現在完成式即可，無需過去完成式。
💡 延伸：類似句型 = This is the best book (that) I have ever read.`, category: '完成式', difficulty: 'advanced' },
  { id: 219, question: 'How many countries ___ you visited so far?', options: ['did', 'do', 'have', 'were'], correctIndex: 2, explanation: `🌐 翻譯：到目前為止你去過多少個國家？
🎯 考點：so far（至今為止）= 現在完成式專屬時間副詞，問「累積經驗」用 Have you + p.p.。
❌ 為什麼不選：
  • did — 是過去式問句，無法搭 so far。
  • do — 為現在簡單式，不能接 visited (p.p.)。
  • were — be 動詞無法接 visited。
💡 延伸：完成式時間副詞家族 = ever / never / already / yet / just / recently / so far / up to now。`, category: '完成式', difficulty: 'advanced' },

  // ===== 過去進行式 (20) =====
  { id: 220, question: 'He ___ his bike when it started to rain.', options: ['rides', 'rode', 'was riding', 'is riding'], correctIndex: 2, explanation: `🌐 翻譯：當下雨時，他正在騎腳踏車。
🎯 考點：過去進行式 was/were + V-ing 表「過去某時點正在進行的動作」；後接 when + 過去式表「被另一動作打斷」。
❌ 為什麼不選：
  • rides — 現在簡單式，時態不一致。
  • rode — 過去簡單式只表「過去發生」，不能表「正在進行被打斷」。
  • is riding — 現在進行式，與 started（過去）衝突。
💡 延伸：經典句構 = 過去進行式（背景動作）+ when + 過去式（突發事件）。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 221, question: 'I ___ TV when you called me.', options: ['watch', 'watched', 'was watching', 'am watching'], correctIndex: 2, explanation: `🌐 翻譯：你打電話給我時，我正在看電視。
🎯 考點：過去某動作（called）發生時，「正在進行」的動作用過去進行式 was watching。
❌ 為什麼不選：
  • watch — 原形無法表過去進行。
  • watched — 過去式只表動作發生，不含「正在進行」。
  • am watching — 現在進行式，時態不對。
💡 延伸：when 與 while 都可表「當…時」，但 while 後面接的子句通常用進行式。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 222, question: 'They ___ dinner when the doorbell rang.', options: ['eat', 'ate', 'were eating', 'are eating'], correctIndex: 2, explanation: `🌐 翻譯：門鈴響時，他們正在吃晚餐。
🎯 考點：過去進行式，複數主詞 They → were + V-ing。
❌ 為什麼不選：
  • eat — 原形無時態。
  • ate — 過去式無法表「正在進行被打斷」。
  • are eating — 現在進行式，與 rang（過去）衝突。
💡 延伸：be 動詞（was/were）的選擇依主詞單複數：I/he/she/it → was；you/we/they/複數 → were。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 223, question: 'She ___ a song when I walked in.', options: ['sings', 'sang', 'was singing', 'is singing'], correctIndex: 2, explanation: `🌐 翻譯：我走進來時，她正在唱歌。
🎯 考點：過去某動作（walked in）發生時，「正在進行」的動作用 was singing。
❌ 為什麼不選：
  • sings — 現在簡單式。
  • sang — 過去式只表「唱了一首」，不含「正在進行」。
  • is singing — 現在進行式，與 walked 時態不一致。
💡 延伸：sing 三態 = sing / sang / sung。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 224, question: 'While I ___ studying, my brother was playing.', options: ['am', 'is', 'was', 'were'], correctIndex: 2, explanation: `🌐 翻譯：當我在唸書時，我弟弟正在玩。
🎯 考點：while 引導兩個過去同時進行的動作，兩邊都用過去進行式；主詞 I → was。
❌ 為什麼不選：
  • am / is — 現在式，與另一句 was playing 時態不一致。
  • were — 用於 you / we / they / 複數。
💡 延伸：while 後接子句多半是過去進行式（表持續背景），when 後則多接過去式短動作。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 225, question: 'At 8 p.m. last night, we ___ homework.', options: ['do', 'did', 'were doing', 'are doing'], correctIndex: 2, explanation: `🌐 翻譯：昨晚八點時我們正在寫作業。
🎯 考點：at + 過去某時刻 → 那個時間點「正在做的事」用過去進行式 were doing。
❌ 為什麼不選：
  • do — 原形無時態。
  • did — 過去式只表「做過」，不含「那一刻正在做」。
  • are doing — 現在進行式，時態不對。
💡 延伸：過去進行式常見時間搭配 = at this time yesterday、at 8 a.m. last Monday 等。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 226, question: 'The baby ___ when I got home.', options: ['cries', 'cried', 'was crying', 'is crying'], correctIndex: 2, explanation: `🌐 翻譯：我到家時，寶寶正在哭。
🎯 考點：到家（got home）的那一刻寶寶持續正在哭 → 過去進行式 was crying。
❌ 為什麼不選：
  • cries — 現在簡單式。
  • cried — 過去式只表「哭過」，不含「持續中」語感。
  • is crying — 現在進行式，與 got 時態不一致。
💡 延伸：若用 cried 暗示「哭了一下就停了」；用 was crying 暗示「持續在哭」。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 227, question: 'What ___ you doing at 10 a.m. yesterday?', options: ['are', 'is', 'were', 'was'], correctIndex: 2, explanation: `🌐 翻譯：你昨天早上十點在做什麼？
🎯 考點：過去進行式問句 = What + were/was + 主詞 + V-ing？主詞 you → were。
❌ 為什麼不選：
  • are — 現在式。
  • is — 用於第三人稱單數。
  • was — 用於 I / he / she / it，不能搭 you。
💡 延伸：you 不論單複數都用 were（簡單式時是 were，這裡也是 were）。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 228, question: 'While she ___ cooking, he was cleaning.', options: ['is', 'was', 'were', 'are'], correctIndex: 1, explanation: `🌐 翻譯：她在煮飯時，他正在打掃。
🎯 考點：while 連接兩個同時進行的過去動作，兩邊都用過去進行式；she → was。
❌ 為什麼不選：
  • is / are — 現在式，時態錯。
  • were — 不能搭 she。
💡 延伸：兩個動作平行進行常用句型 = While A was V-ing, B was V-ing.`, category: '過去進行式', difficulty: 'advanced' },
  { id: 229, question: 'I ___ sleeping when the earthquake happened.', options: ['am', 'was', 'were', 'is'], correctIndex: 1, explanation: `🌐 翻譯：地震發生時，我正在睡覺。
🎯 考點：過去突發事件（happened）發生時，「正在進行」的動作用 was sleeping；主詞 I → was。
❌ 為什麼不選：
  • am / is — 現在式。
  • were — 不能搭 I（簡單過去式 I 是 was）。
💡 延伸：突發事件的時間結構 → 過去進行式（背景）+ when + 過去式（事件）。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 230, question: 'The students ___ a test when the fire alarm went off.', options: ['take', 'took', 'were taking', 'are taking'], correctIndex: 2, explanation: `🌐 翻譯：火警響起時，學生正在考試。
🎯 考點：考試在進行中突然被打斷 → 過去進行式 were taking。
❌ 為什麼不選：
  • take — 原形。
  • took — 過去式只表「考了試」，沒有「正在進行被打斷」感。
  • are taking — 現在進行式，時態錯。
💡 延伸：take a test / take an exam 都是「考試」的固定動詞搭配。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 231, question: 'It ___ heavily all afternoon yesterday.', options: ['rained', 'was raining', 'rains', 'has rained'], correctIndex: 1, explanation: `🌐 翻譯：昨天整個下午都下著大雨。
🎯 考點：all afternoon yesterday（過去一段時間從頭到尾持續）→ 過去進行式 was raining。
❌ 為什麼不選：
  • rained — 過去式只說「下了雨」，不強調整段時間都在下。
  • rains — 現在式。
  • has rained — 現在完成式不搭 yesterday（明確過去）。
💡 延伸：all morning / all day / all night 等都常搭過去進行式，強調「整段時間持續」。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 232, question: 'I saw Tom while I ___ along the river.', options: ['walk', 'walked', 'was walking', 'am walking'], correctIndex: 2, explanation: `🌐 翻譯：我沿著河邊散步時遇到 Tom。
🎯 考點：while 後接「持續性的背景動作」→ 用過去進行式 was walking。主句 saw 是過去突發事件。
❌ 為什麼不選：
  • walk — 原形。
  • walked — 過去式無法表「進行中」。
  • am walking — 現在進行式，時態不一致。
💡 延伸：句型對稱 — saw（過去突發）+ while + was walking（過去背景）= 經典過去進行式句構。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 233, question: 'They ___ for me at the station this time yesterday.', options: ['wait', 'waited', 'were waiting', 'have waited'], correctIndex: 2, explanation: `🌐 翻譯：昨天這個時候他們正在車站等我。
🎯 考點：this time yesterday（昨天的這個時候）= 過去某時刻 → 用過去進行式 were waiting。
❌ 為什麼不選：
  • wait — 原形。
  • waited — 過去式只說「等過」，沒有「那個時刻正在等」感。
  • have waited — 現在完成式不搭 yesterday。
💡 延伸：this time + 過去時間（this time last week / yesterday）是過去進行式高頻時間副詞。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 234, question: 'When the teacher came in, all the students ___ quietly.', options: ['read', 'were reading', 'are reading', 'have read'], correctIndex: 1, explanation: `🌐 翻譯：當老師進來時，所有學生都安靜地在閱讀。
🎯 考點：老師進來那一刻，學生持續在讀書 → 過去進行式 were reading。
❌ 為什麼不選：
  • read — 雖然 read 過去式同形，但前面缺 be 動詞無法表進行。
  • are reading — 現在進行式時態錯。
  • have read — 現在完成式表「讀完了」，但題意是「正在讀」。
💡 延伸：read 三態同形 = read / read / read，但發音 [riːd] / [rɛd] / [rɛd]。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 235, question: 'My parents ___ a movie when I called them last night.', options: ['watch', 'watched', 'were watching', 'have watched'], correctIndex: 2, explanation: `🌐 翻譯：昨晚我打電話時，我父母正在看電影。
🎯 考點：called（過去突發）+ 父母當時持續看片 → 過去進行式 were watching。複數主詞 → were。
❌ 為什麼不選：
  • watch — 原形。
  • watched — 過去式無「正在進行」感。
  • have watched — 現在完成式不搭 last night。
💡 延伸：watch a movie / see a movie 都可，但 watch 強調「在家或在裝置上看」，see 強調「去戲院看」。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 236, question: 'While the children ___ in the park, it began to snow.', options: ['play', 'played', 'were playing', 'are playing'], correctIndex: 2, explanation: `🌐 翻譯：當小朋友在公園裡玩時，開始下雪了。
🎯 考點：while + 進行中的背景動作 → 過去進行式 were playing。主句 began 是突發事件。
❌ 為什麼不選：
  • play — 原形。
  • played — 過去式無法表「持續中被打斷」。
  • are playing — 現在進行式時態錯。
💡 延伸：begin / start to + V 表「動作開始」；begin / start V-ing 兩種寫法都可。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 237, question: 'She ___ her teeth when the lights went out.', options: ['brushes', 'brushed', 'was brushing', 'is brushing'], correctIndex: 2, explanation: `🌐 翻譯：當燈熄滅時，她正在刷牙。
🎯 考點：went out（過去突發）打斷正在進行的動作 → 過去進行式 was brushing。
❌ 為什麼不選：
  • brushes — 現在式。
  • brushed — 過去式無「正在進行」語感。
  • is brushing — 現在進行式，時態錯。
💡 延伸：lights go out（燈熄滅、停電）vs lights go off（燈關了），兩者都常用。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 238, question: 'I was reading a book ___ my sister was playing the piano.', options: ['when', 'while', 'because', 'before'], correctIndex: 1, explanation: `🌐 翻譯：我在看書，我妹妹同時在彈鋼琴。
🎯 考點：兩個過去動作平行進行 → 用 while 連接（更強調「同時並進」）。
❌ 為什麼不選：
  • when — 雖可用，但 when 多接「過去式短動作」，本題兩邊都是進行式，while 更精準。
  • because — 表原因，語意不通。
  • before — 表先後順序，與「同時」矛盾。
💡 延伸：when vs while：when 後常接「打斷的瞬間動作」，while 後常接「持續的背景動作」。`, category: '過去進行式', difficulty: 'advanced' },
  { id: 239, question: 'What were they ___ when you arrived?', options: ['do', 'doing', 'did', 'done'], correctIndex: 1, explanation: `🌐 翻譯：你到的時候，他們正在做什麼？
🎯 考點：過去進行式 were + V-ing；were 後一定接 V-ing。
❌ 為什麼不選：
  • do — 原形不能接在 were 後表進行。
  • did — 過去式不能接在 were 後。
  • done — 是 p.p.，were done 變成被動「被完成」，語意不通。
💡 延伸：問句結構 = What + were/was + 主詞 + V-ing + 時間子句？`, category: '過去進行式', difficulty: 'advanced' },

  // ===== 比較級與最高級 (20) =====
  { id: 240, question: 'Tom is ___ than Jerry.', options: ['tall', 'taller', 'tallest', 'more tall'], correctIndex: 1, explanation: `🌐 翻譯：Tom 比 Jerry 高。
🎯 考點：兩者相比 → 用比較級；單音節形容詞直接加 -er → taller。
❌ 為什麼不選：
  • tall — 原級不能搭 than。
  • tallest — 最高級用於三者以上比較。
  • more tall — 單音節不可用 more，是常見錯誤。
💡 延伸：than 是比較級的標誌字，「A is 比較級 than B」是固定句型。`, category: '比較級', difficulty: 'advanced' },
  { id: 241, question: 'This is the ___ book I have ever read.', options: ['good', 'better', 'best', 'most good'], correctIndex: 2, explanation: `🌐 翻譯：這是我看過最棒的書。
🎯 考點：「the + 最高級 + N + (that) I have ever + p.p.」是固定句型，表「至今最…的」。good 不規則變化 = good / better / best。
❌ 為什麼不選：
  • good — 原級。
  • better — 比較級，需搭 than。
  • most good — 不規則變化的字不能用 more/most。
💡 延伸：bad / worse / worst、far / farther / farthest 也是不規則變化。`, category: '比較級', difficulty: 'advanced' },
  { id: 242, question: 'My bag is ___ than yours.', options: ['heavy', 'heavier', 'heaviest', 'more heavy'], correctIndex: 1, explanation: `🌐 翻譯：我的包包比你的重。
🎯 考點：子音 + y 結尾形容詞 → 去 y 改 i 加 -er，heavy → heavier。
❌ 為什麼不選：
  • heavy — 原級不搭 than。
  • heaviest — 最高級用於三者以上。
  • more heavy — 雙音節以 y 結尾仍用 -er 變化，不用 more。
💡 延伸：類似變化 = happy / happier、easy / easier、busy / busier。`, category: '比較級', difficulty: 'advanced' },
  { id: 243, question: 'This movie is ___ than that one.', options: ['interesting', 'more interesting', 'most interesting', 'interestinger'], correctIndex: 1, explanation: `🌐 翻譯：這部電影比那部有趣。
🎯 考點：三音節以上形容詞 → 用 more + 原級組成比較級。
❌ 為什麼不選：
  • interesting — 原級不搭 than。
  • most interesting — 最高級用於三者以上。
  • interestinger — 多音節不能加 -er，這是錯誤拼字。
💡 延伸：常用 more + 原級的形容詞 = beautiful / difficult / important / expensive / interesting。`, category: '比較級', difficulty: 'advanced' },
  { id: 244, question: 'She is the ___ girl in our school.', options: ['beautiful', 'more beautiful', 'most beautiful', 'beautifulest'], correctIndex: 2, explanation: `🌐 翻譯：她是我們學校最漂亮的女孩。
🎯 考點：多音節形容詞最高級 = the most + 原級。範圍是「in our school」(在學校中) → 多者比較。
❌ 為什麼不選：
  • beautiful — 原級。
  • more beautiful — 比較級需搭 than。
  • beautifulest — 多音節不能加 -est，是錯誤拼字。
💡 延伸：最高級前必須加 the；範圍常用 in（地點）或 of（群體）。`, category: '比較級', difficulty: 'advanced' },
  { id: 245, question: 'My score is ___ than his.', options: ['bad', 'worse', 'worst', 'more bad'], correctIndex: 1, explanation: `🌐 翻譯：我的分數比他差。
🎯 考點：bad 不規則變化 = bad / worse / worst。
❌ 為什麼不選：
  • bad — 原級不搭 than。
  • worst — 最高級用於三者以上。
  • more bad — 不規則變化的字不能用 more。
💡 延伸：little / less / least 也是不規則；many/much / more / most 同樣不規則。`, category: '比較級', difficulty: 'advanced' },
  { id: 246, question: 'He runs the ___ in the team.', options: ['fast', 'faster', 'fastest', 'most fast'], correctIndex: 2, explanation: `🌐 翻譯：他是隊上跑最快的人。
🎯 考點：範圍是「in the team」(隊上)，多者比較 → 最高級 the fastest。fast 同時是形容詞也是副詞，變化都是 fast / faster / fastest。
❌ 為什麼不選：
  • fast — 原級不能直接用於最高級語境。
  • faster — 比較級需搭 than。
  • most fast — 單音節不可用 most。
💡 延伸：fast / hard / late / early 既是形容詞也是副詞，變化相同。`, category: '比較級', difficulty: 'advanced' },
  { id: 247, question: 'This road is ___ than that one.', options: ['long', 'longer', 'longest', 'more long'], correctIndex: 1, explanation: `🌐 翻譯：這條路比那條長。
🎯 考點：單音節形容詞加 -er 形成比較級。
❌ 為什麼不選：
  • long — 原級不搭 than。
  • longest — 最高級。
  • more long — 單音節不用 more。
💡 延伸：one 是代名詞，代替前面提到的 road，避免重複。`, category: '比較級', difficulty: 'advanced' },
  { id: 248, question: 'Today is ___ than yesterday.', options: ['cold', 'colder', 'coldest', 'more cold'], correctIndex: 1, explanation: `🌐 翻譯：今天比昨天冷。
🎯 考點：兩者相比 → 用比較級 colder。
❌ 為什麼不選：
  • cold — 原級。
  • coldest — 最高級用於三者以上。
  • more cold — 單音節不用 more。
💡 延伸：天氣常見比較句型 = It is colder/hotter/wetter today than yesterday.`, category: '比較級', difficulty: 'advanced' },
  { id: 249, question: 'This test was the ___ of all.', options: ['easy', 'easier', 'easiest', 'most easy'], correctIndex: 2, explanation: `🌐 翻譯：這次考試是所有考試裡最簡單的。
🎯 考點：of all（在全部之中）= 多者範圍 → 最高級 easiest。easy → easiest（y 去掉改 i 加 est）。
❌ 為什麼不選：
  • easy — 原級。
  • easier — 比較級。
  • most easy — 雙音節以 y 結尾仍用 -est，不用 most。
💡 延伸：最高級範圍介系詞 = in + 地點 / of + 群體（the smartest of all students）。`, category: '比較級', difficulty: 'advanced' },
  { id: 250, question: 'She is as ___ as her mother.', options: ['tall', 'taller', 'tallest', 'more tall'], correctIndex: 0, explanation: `🌐 翻譯：她和她媽媽一樣高。
🎯 考點：as...as 句型表「同等程度」，中間一定要用原級。
❌ 為什麼不選：
  • taller / tallest / more tall — 比較級或最高級都不能用於 as...as。
💡 延伸：否定句 not as ... as = 「不如…那麼…」；變化句型還有 twice as ... as（兩倍）、half as ... as（一半）。`, category: '比較級', difficulty: 'advanced' },
  { id: 251, question: 'This is the ___ expensive watch in the store.', options: ['more', 'most', 'much', 'very'], correctIndex: 1, explanation: `🌐 翻譯：這是店裡最貴的手錶。
🎯 考點：the most + 多音節形容詞 = 最高級。範圍是 in the store。
❌ 為什麼不選：
  • more — 比較級需搭 than。
  • much — 是程度副詞，不能組最高級。
  • very — 加強語氣，不能組比較級或最高級。
💡 延伸：much 可加強比較級（much taller / much better），但不能組最高級。`, category: '比較級', difficulty: 'advanced' },
  { id: 252, question: 'The Yangtze River is ___ river in China.', options: ['long', 'longer', 'the longest', 'longer than'], correctIndex: 2, explanation: `🌐 翻譯：長江是中國最長的河。
🎯 考點：表「某地最…的」用最高級，前面要加 the。
❌ 為什麼不選：
  • long — 原級無法表「最長」。
  • longer — 比較級需搭 than 且需有對照物。
  • longer than — 不完整，缺乏比較對象。
💡 延伸：在地點範圍內找之最，幾乎都搭 the + 最高級 + (N) + in + 地點。`, category: '比較級', difficulty: 'advanced' },
  { id: 253, question: 'Of the two sisters, Mary is ___.', options: ['tall', 'taller', 'the taller', 'the tallest'], correctIndex: 2, explanation: `🌐 翻譯：兩姐妹之中，Mary 是比較高的那一位。
🎯 考點：「兩者中比較…的那一個」固定句型 = the + 比較級。
❌ 為什麼不選：
  • tall — 原級無法比較。
  • taller — 沒加 the，不符合「兩者之中那一個」的限定。
  • the tallest — 最高級用於三者以上，本題只有兩姐妹。
💡 延伸：of the two + N + S + be 動詞 + the + 比較級，是會考常出現的固定句型。`, category: '比較級', difficulty: 'advanced' },
  { id: 254, question: 'My new phone is ___ better than the old one.', options: ['very', 'much', 'so', 'too'], correctIndex: 1, explanation: `🌐 翻譯：我的新手機比舊的好得多。
🎯 考點：加強比較級程度用 much / far / a lot / even，不能用 very。
❌ 為什麼不選：
  • very — 只能加強原級（very good），不能加強比較級（✗ very better）。
  • so — 加強原級表「如此」（so good），不能加強比較級。
  • too — 表「太過」（too hot），語意不符。
💡 延伸：可加強比較級的副詞家族 = much / far / a lot / a little / even / still。`, category: '比較級', difficulty: 'advanced' },
  { id: 255, question: 'The more you practice, ___ you become.', options: ['the better', 'better', 'the best', 'the more better'], correctIndex: 0, explanation: `🌐 翻譯：你越練習，就變得越厲害。
🎯 考點：「The + 比較級 ..., the + 比較級 ...」表「越…越…」固定句型。
❌ 為什麼不選：
  • better — 缺少前面的 the，句構不完整。
  • the best — 最高級不能用於此句型。
  • the more better — better 本身就是 good 的比較級，不能再加 more（雙重比較級錯誤）。
💡 延伸：類似句型例句 = The harder you work, the more you earn.（你越努力，賺越多）`, category: '比較級', difficulty: 'advanced' },
  { id: 256, question: 'It is getting ___ in winter.', options: ['cold and cold', 'colder and colder', 'the colder', 'more cold'], correctIndex: 1, explanation: `🌐 翻譯：冬天天氣越來越冷。
🎯 考點：「比較級 + and + 比較級」表「越來越…」。
❌ 為什麼不選：
  • cold and cold — 原級不能表「越來越」。
  • the colder — 不完整，且少了重複結構。
  • more cold — 單音節不用 more。
💡 延伸：多音節用 more and more + 原級（more and more beautiful）；不規則字 = better and better、worse and worse。`, category: '比較級', difficulty: 'advanced' },
  { id: 257, question: 'No other student in our class is ___ Tom.', options: ['tall as', 'as tall as', 'taller as', 'so taller as'], correctIndex: 1, explanation: `🌐 翻譯：我們班沒有其他學生像 Tom 一樣高（= Tom 是最高的）。
🎯 考點：as...as 句型完整結構 = as + 原級 + as；前面常用 no other 暗示「最高級」語意。
❌ 為什麼不選：
  • tall as — 缺前面的 as，句構不完整。
  • taller as — 比較級不搭 as。
  • so taller as — so 不能搭 as。
💡 延伸：No other ... as ... as ... = ... is the ...est（兩種句型同義轉換，會考常出現）。`, category: '比較級', difficulty: 'advanced' },
  { id: 258, question: 'This question is ___ that one.', options: ['less difficult than', 'difficult less than', 'more less than', 'less than difficult'], correctIndex: 0, explanation: `🌐 翻譯：這題沒有那題那麼難。
🎯 考點：less + 原級 + than = 「不如…那麼…」，是 not as ... as 的另一種表達。
❌ 為什麼不選：
  • difficult less than — 詞序錯誤。
  • more less than — more 和 less 不能並用。
  • less than difficult — 詞序錯誤。
💡 延伸：This is less difficult than that. = That is more difficult than this. = This is not as difficult as that.（三句同義）`, category: '比較級', difficulty: 'advanced' },
  { id: 259, question: 'Health is ___ wealth.', options: ['important than', 'more important than', 'as importanter as', 'the most important'], correctIndex: 1, explanation: `🌐 翻譯：健康比財富更重要。
🎯 考點：兩者相比 + 多音節形容詞 → more + 原級 + than。
❌ 為什麼不選：
  • important than — 缺 more，比較級不完整。
  • as importanter as — as...as 中間要用原級，且 importanter 是錯誤拼字。
  • the most important — 最高級需三者以上比較。
💡 延伸：諺語版 = Health is more important than wealth. / Nothing is more important than health.（兩種句型，會考閱讀常考）。`, category: '比較級', difficulty: 'advanced' },

  // ===== 被動語態 (20) =====
  { id: 260, question: 'The cake ___ made by Mom.', options: ['is', 'was', 'were', 'are'], correctIndex: 1, explanation: `🌐 翻譯：蛋糕是媽媽做的。
🎯 考點：被動語態過去式 = was/were + p.p.。主詞 cake 單數 + 過去發生 → was made。
❌ 為什麼不選：
  • is — 現在式被動，但 by Mom 暗示已完成。
  • were — 用於複數主詞或 you。
  • are — 用於複數現在式。
💡 延伸：被動語態強調「動作的承受者」，主動句 Mom made the cake 重點是「誰做」。`, category: '被動語態', difficulty: 'advanced' },
  { id: 261, question: 'English ___ spoken in many countries.', options: ['is', 'was', 'are', 'am'], correctIndex: 0, explanation: `🌐 翻譯：英文在許多國家被使用。
🎯 考點：表達「一般事實/普遍狀況」用現在式被動 is/are + p.p.。English 單數 → is spoken。
❌ 為什麼不選：
  • was — 過去式，與「至今仍然使用」不符。
  • are — 用於複數主詞。
  • am — 只用於 I。
💡 延伸：被動語態常用於描述客觀事實，常見搭配 = is/are made / used / spoken / sold / found。`, category: '被動語態', difficulty: 'advanced' },
  { id: 262, question: 'The windows ___ cleaned every week.', options: ['is', 'was', 'are', 'am'], correctIndex: 2, explanation: `🌐 翻譯：窗戶每週都會被清洗。
🎯 考點：被動語態複數主詞 + 現在式 → are + p.p.。every week 表習慣。
❌ 為什麼不選：
  • is — 用於單數主詞。
  • was — 過去式單數。
  • am — 只用於 I。
💡 延伸：every + 時間（every day / week / year）幾乎都搭現在簡單式或被動式。`, category: '被動語態', difficulty: 'advanced' },
  { id: 263, question: 'This song ___ written by a famous singer.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: `🌐 翻譯：這首歌是一位有名的歌手寫的。
🎯 考點：被動語態過去式 was + p.p.；單數主詞 song。write 三態 = write / wrote / written。
❌ 為什麼不選：
  • is — 現在式被動，但歌曲已被寫完。
  • are / were — 用於複數主詞。
💡 延伸：write 的 p.p. 是 written 不是 wrote（會考易錯點）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 264, question: 'The homework ___ done by the students.', options: ['is', 'was', 'are', 'am'], correctIndex: 1, explanation: `🌐 翻譯：作業是學生們做的。
🎯 考點：被動語態過去式，單數主詞 homework + 已完成 → was done。
❌ 為什麼不選：
  • is — 現在式，但句意暗示已完成。
  • are — 用於複數，但 homework 是不可數名詞，視為單數。
  • am — 只用於 I。
💡 延伸：homework 是不可數名詞，永遠單數，不能說 a homework 或 homeworks。`, category: '被動語態', difficulty: 'advanced' },
  { id: 265, question: 'These photos ___ taken last summer.', options: ['is', 'was', 'were', 'are'], correctIndex: 2, explanation: `🌐 翻譯：這些照片是去年夏天拍的。
🎯 考點：複數主詞 photos + 過去 last summer → 過去被動 were + p.p.。take 三態 = take / took / taken。
❌ 為什麼不選：
  • is / are — 現在式，與 last summer 衝突。
  • was — 用於單數主詞。
💡 延伸：take a photo / take pictures 是「拍照」的固定搭配。`, category: '被動語態', difficulty: 'advanced' },
  { id: 266, question: 'The letter ___ sent yesterday.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: `🌐 翻譯：信昨天被寄出了。
🎯 考點：單數主詞 letter + 過去 yesterday → 過去被動 was + p.p.。send 三態 = send / sent / sent。
❌ 為什麼不選：
  • is / are — 現在式，與 yesterday 衝突。
  • were — 用於複數主詞。
💡 延伸：yesterday / last + 時段 / ago / in + 過去年份 都是過去式關鍵詞。`, category: '被動語態', difficulty: 'advanced' },
  { id: 267, question: 'The school ___ built in 1990.', options: ['is', 'was', 'are', 'were'], correctIndex: 1, explanation: `🌐 翻譯：這間學校建於 1990 年。
🎯 考點：單數主詞 + in + 過去年份 → 過去被動 was built。
❌ 為什麼不選：
  • is / are — 現在式，與明確過去年份衝突。
  • were — 用於複數。
💡 延伸：be built / be founded / be established 都是「被建立」常用被動句型。`, category: '被動語態', difficulty: 'advanced' },
  { id: 268, question: 'The books ___ sold out quickly.', options: ['is', 'was', 'are', 'were'], correctIndex: 3, explanation: `🌐 翻譯：那些書很快就賣光了。
🎯 考點：複數主詞 + 過去發生 → 過去被動 were + p.p.。sell 三態 = sell / sold / sold。
❌ 為什麼不選：
  • is / are — 現在式。
  • was — 用於單數。
💡 延伸：sold out（賣光）是常見被動片語，類似 used up（用完）、given up（放棄）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 269, question: 'The bridge ___ being repaired now.', options: ['is', 'was', 'are', 'were'], correctIndex: 0, explanation: `🌐 翻譯：橋現在正在被修。
🎯 考點：現在進行被動 = am/is/are + being + p.p.。單數主詞 + now → is being repaired。
❌ 為什麼不選：
  • was / were — 過去式，與 now 衝突。
  • are — 用於複數。
💡 延伸：進行被動句型對比 — is repairing（正在修，主動）vs is being repaired（正在被修，被動）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 270, question: 'A new museum ___ next year.', options: ['will build', 'will be built', 'is built', 'was built'], correctIndex: 1, explanation: `🌐 翻譯：明年將會建造一座新博物館。
🎯 考點：未來被動 = will be + p.p.。next year + 博物館被建造 → will be built。
❌ 為什麼不選：
  • will build — 主動式（會建造誰），主詞是 museum 應為被動。
  • is built — 現在被動，與 next year 衝突。
  • was built — 過去被動，與 next year 衝突。
💡 延伸：未來被動完整公式 = will be + p.p.；過去未來則用 would be + p.p.。`, category: '被動語態', difficulty: 'advanced' },
  { id: 271, question: 'The thief ___ by the police.', options: ['caught', 'was caught', 'has caught', 'catches'], correctIndex: 1, explanation: `🌐 翻譯：小偷被警察抓住了。
🎯 考點：「by + 動作執行者」是被動語態典型結構；過去被動 was + p.p.。catch 三態 = catch / caught / caught。
❌ 為什麼不選：
  • caught — 主動過去式，但搭 by the police 應為被動。
  • has caught — 現在完成主動式。
  • catches — 現在式主動。
💡 延伸：被動句型「by + 動作執行者」可省略（如不必要或不知道是誰）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 272, question: 'The dishes ___ already washed.', options: ['have', 'has', 'have been', 'has been'], correctIndex: 2, explanation: `🌐 翻譯：盤子已經洗好了。
🎯 考點：現在完成被動 = have/has been + p.p.。複數主詞 dishes → have been washed。
❌ 為什麼不選：
  • have — 缺 been，不是完成被動。
  • has — 同上，且 has 用於單數。
  • has been — 用於單數主詞。
💡 延伸：完成被動的時間軸 = 動作過去已發生 + 結果到現在仍有效。`, category: '被動語態', difficulty: 'advanced' },
  { id: 273, question: 'My phone needs to ___.', options: ['repair', 'be repaired', 'repaired', 'be repairing'], correctIndex: 1, explanation: `🌐 翻譯：我的手機需要被修了。
🎯 考點：need to + V 後接被動語態 = need to be + p.p.；手機是被修的對象。
❌ 為什麼不選：
  • repair — 主動原形，但手機是被修不是去修。
  • repaired — 缺 to be，句構不完整。
  • be repairing — 進行式不符合「需要修」的語意。
💡 延伸：need / want / require + 物 + V-ing 也表被動意義（My phone needs repairing.）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 274, question: 'English ___ taught in our school for 50 years.', options: ['is', 'has', 'has been', 'was'], correctIndex: 2, explanation: `🌐 翻譯：英文在我們學校已被教授 50 年了。
🎯 考點：for + 時段（for 50 years）= 完成式關鍵詞，搭配被動 → has/have been + p.p.。English 單數 → has been。
❌ 為什麼不選：
  • is — 現在式被動無法表「持續 50 年」。
  • has — 缺 been，不是完成被動。
  • was — 過去式無法表「持續到現在」。
💡 延伸：for + 時段 / since + 時間點 都是現在完成（含被動）的標記詞。`, category: '被動語態', difficulty: 'advanced' },
  { id: 275, question: 'The window ___ broken by the boy.', options: ['was', 'broke', 'has broke', 'breaks'], correctIndex: 0, explanation: `🌐 翻譯：窗戶被那個男孩打破了。
🎯 考點：by + 動作者 = 典型被動句構。過去被動 was + p.p.。break 三態 = break / broke / broken。
❌ 為什麼不選：
  • broke — 主動過去式，但搭 by the boy 應為被動。
  • has broke — has broken 才對，且 broke 是過去式不是 p.p.。
  • breaks — 主動現在式。
💡 延伸：break 的 p.p. 是 broken 不是 broke，這是會考超高頻錯字。`, category: '被動語態', difficulty: 'advanced' },
  { id: 276, question: 'The meeting ___ at 3 p.m. tomorrow.', options: ['will hold', 'will be held', 'is held', 'holds'], correctIndex: 1, explanation: `🌐 翻譯：會議將在明天下午三點舉行。
🎯 考點：未來被動 will be + p.p.。會議是被舉辦的，不是會議自己舉辦。
❌ 為什麼不選：
  • will hold — 主動式，會議不會自己舉辦。
  • is held — 現在式被動，與 tomorrow 衝突。
  • holds — 現在式主動。
💡 延伸：hold a meeting / a party / a concert 是「舉辦…」的固定搭配。`, category: '被動語態', difficulty: 'advanced' },
  { id: 277, question: 'These cookies ___ by my grandma.', options: ['make', 'made', 'are made', 'are making'], correctIndex: 2, explanation: `🌐 翻譯：這些餅乾是我奶奶做的。
🎯 考點：by + 動作者 = 被動句構標誌。複數主詞 + 現在被動 → are + p.p.。
❌ 為什麼不選：
  • make — 主動原形。
  • made — 缺助動詞，無法獨立形成被動。
  • are making — 主動進行式（正在做），但搭 by 應為被動。
💡 延伸：be made by（被…做）vs be made of（由…材料做成）vs be made in（在…地方製造）。`, category: '被動語態', difficulty: 'advanced' },
  { id: 278, question: 'I ___ to the wedding last week.', options: ['invited', 'was invited', 'have invited', 'am inviting'], correctIndex: 1, explanation: `🌐 翻譯：我上週被邀請去參加婚禮。
🎯 考點：「我被邀請」= 被動語態；過去時間 last week + 單數主詞 I → was invited。
❌ 為什麼不選：
  • invited — 主動過去式（我邀請了誰），不符題意。
  • have invited — 現在完成主動式。
  • am inviting — 現在進行主動式。
💡 延伸：be invited to + 場合 = 被邀請去某活動，是固定句型。`, category: '被動語態', difficulty: 'advanced' },
  { id: 279, question: 'This kind of book ___ by many teenagers.', options: ['reads', 'is read', 'reading', 'has read'], correctIndex: 1, explanation: `🌐 翻譯：這類書被許多青少年閱讀。
🎯 考點：書「被閱讀」是被動；單數主詞 + 普遍事實 → is + p.p.。read 三態同形 = read / read / read。
❌ 為什麼不選：
  • reads — 主動式（書自己看書？），語意不通。
  • reading — 缺助動詞。
  • has read — 主動完成式。
💡 延伸：read 三態拼字相同但發音不同：read [riːd] / read [rɛd] / read [rɛd]。`, category: '被動語態', difficulty: 'advanced' },

  // ===== 附加問句 (20) =====
  { id: 280, question: 'She is a doctor, ___ she?', options: ["isn't", "doesn't", "won't", "hasn't"], correctIndex: 0, explanation: `🌐 翻譯：她是醫生，對吧？
🎯 考點：附加問句基本規則 = 前肯後否、前否後肯。前面 is（肯定）→ 後面 isn't she。
❌ 為什麼不選：
  • doesn't — be 動詞句不能用 do/does/did 來做附加問句。
  • won't — 用於 will 句型。
  • hasn't — 用於完成式句型。
💡 延伸：附加問句的助動詞要與前句的助動詞/be 動詞「同類」呼應。`, category: '附加問句', difficulty: 'advanced' },
  { id: 281, question: 'You can swim, ___ you?', options: ["can't", "don't", "won't", "aren't"], correctIndex: 0, explanation: `🌐 翻譯：你會游泳，對吧？
🎯 考點：前面是助動詞 can（肯定）→ 後面用 can't you。
❌ 為什麼不選：
  • don't — 一般動詞句才用 do/don't。
  • won't — 用於 will 句型。
  • aren't — be 動詞句才用 aren't。
💡 延伸：情態助動詞（can / could / may / should / must）的附加問句直接用該情態的否定。`, category: '附加問句', difficulty: 'advanced' },
  { id: 282, question: 'They don\'t like coffee, ___ they?', options: ['don\'t', 'do', 'are', 'aren\'t'], correctIndex: 1, explanation: `🌐 翻譯：他們不喜歡咖啡，對吧？
🎯 考點：前面否定 don't → 後面肯定 do they。
❌ 為什麼不選：
  • don't — 前否後不能再否，要肯定。
  • are / aren't — 一般動詞句不用 be 動詞做附加問句。
💡 延伸：前否後肯，前肯後否 — 這是附加問句最核心的規則。`, category: '附加問句', difficulty: 'advanced' },
  { id: 283, question: 'He went home, ___ he?', options: ["isn't", "didn't", "doesn't", "won't"], correctIndex: 1, explanation: `🌐 翻譯：他回家了，對吧？
🎯 考點：前面過去式肯定 went → 後面過去式否定 didn't he。
❌ 為什麼不選：
  • isn't — be 動詞句才用。
  • doesn't — 為現在式，但 went 是過去式。
  • won't — 為未來式。
💡 延伸：過去式一般動詞 → did / didn't；過去式 be 動詞 → was / wasn't / were / weren't。`, category: '附加問句', difficulty: 'advanced' },
  { id: 284, question: 'It won\'t rain, ___ it?', options: ["won't", 'will', "doesn't", 'is'], correctIndex: 1, explanation: `🌐 翻譯：應該不會下雨吧，是嗎？
🎯 考點：前面否定 won't → 後面肯定 will it。
❌ 為什麼不選：
  • won't — 前否後不能再否。
  • doesn't — 為一般動詞句。
  • is — 為 be 動詞句。
💡 延伸：will / won't 是未來式的助動詞家族。`, category: '附加問句', difficulty: 'advanced' },
  { id: 285, question: 'She has been here, ___ she?', options: ["isn't", "hasn't", "doesn't", "wasn't"], correctIndex: 1, explanation: `🌐 翻譯：她來過這裡，對吧？
🎯 考點：完成式 has → 後面用 hasn't she；用同一助動詞呼應。
❌ 為什麼不選：
  • isn't — be 動詞句才用。
  • doesn't — 一般動詞句才用。
  • wasn't — 過去式 be 動詞。
💡 延伸：完成式（have/has + p.p.）的附加問句直接用 haven't / hasn't 否定形式。`, category: '附加問句', difficulty: 'advanced' },
  { id: 286, question: 'You are coming, ___ you?', options: ["don't", "aren't", "won't", "can't"], correctIndex: 1, explanation: `🌐 翻譯：你要來，對吧？
🎯 考點：前面 are（現在進行式的 be 動詞）肯定 → 後面 aren't you。
❌ 為什麼不選：
  • don't — 一般動詞句才用。
  • won't — 為未來式。
  • can't — 為情態助動詞句。
💡 延伸：進行式（is/are V-ing）的附加問句用 isn't / aren't；未來進行式（will be V-ing）則用 won't。`, category: '附加問句', difficulty: 'advanced' },
  { id: 287, question: 'He couldn\'t do it, ___ he?', options: ["couldn't", 'could', "can't", 'can'], correctIndex: 1, explanation: `🌐 翻譯：他沒辦法做到，對吧？
🎯 考點：前面否定 couldn't → 後面肯定 could he；用同一情態動詞呼應。
❌ 為什麼不選：
  • couldn't — 前否後不能再否。
  • can / can't — 時態不一致（前面是過去式 couldn't）。
💡 延伸：情態助動詞時態一致 = could / would / should / might 的附加問句也用同一字。`, category: '附加問句', difficulty: 'advanced' },
  { id: 288, question: 'Let\'s go, ___ we?', options: ["don't", 'shall', "won't", "can't"], correctIndex: 1, explanation: `🌐 翻譯：我們走吧，好嗎？
🎯 考點：Let's（= Let us）開頭的祈使句，附加問句固定用 shall we。
❌ 為什麼不選：
  • don't / won't / can't — 都不適用於 Let's 句型。
💡 延伸：祈使句 (Open the door, ...) 的附加問句用 will you / won't you / can you；Let's 句型則用 shall we。`, category: '附加問句', difficulty: 'advanced' },
  { id: 289, question: 'Nobody likes him, ___ they?', options: ["don't", 'do', "doesn't", 'does'], correctIndex: 1, explanation: `🌐 翻譯：沒人喜歡他，對吧？
🎯 考點：nobody / no one / nothing 視為否定意義 → 後面用肯定。nobody 雖單數，附加問句代名詞用 they。
❌ 為什麼不選：
  • don't / doesn't — 前否（nobody）後不能再否。
  • does — 第三人稱單數，但 nobody 在附加問句中用 they 代稱。
💡 延伸：含 no / never / nothing / nobody / hardly / seldom 的句子視為否定，附加問句要用肯定。`, category: '附加問句', difficulty: 'advanced' },
  { id: 290, question: 'You haven\'t finished yet, ___ you?', options: ["haven't", 'have', "don't", 'do'], correctIndex: 1, explanation: `🌐 翻譯：你還沒做完，對吧？
🎯 考點：完成式否定 haven't → 後面用 have you（前否後肯）。
❌ 為什麼不選：
  • haven't — 前否後不能再否。
  • don't / do — 為一般動詞句的助動詞，不能用於完成式。
💡 延伸：完成式 yet 一般出現在否定句和疑問句中。`, category: '附加問句', difficulty: 'advanced' },
  { id: 291, question: 'Open the door, ___?', options: ["don't you", 'will you', 'do you', "won't you"], correctIndex: 1, explanation: `🌐 翻譯：把門打開，好嗎？
🎯 考點：祈使句（Open / Close / Sit down 等開頭）的附加問句最常用 will you（也可用 won't you 表更客氣的請求）。
❌ 為什麼不選：
  • don't you — 不適用於祈使句。
  • do you — 同上。
  • won't you — 雖也可用但較少；本題首選 will you。
💡 延伸：否定祈使句 Don't be late, will you? 也用 will you。`, category: '附加問句', difficulty: 'advanced' },
  { id: 292, question: 'I am right, ___ I?', options: ["am not", "aren't", "isn't", "don't"], correctIndex: 1, explanation: `🌐 翻譯：我說得對，不是嗎？
🎯 考點：I am 的附加問句固定用 aren't I（特例，無 amn't 縮寫）。
❌ 為什麼不選：
  • am not — 不是縮寫形，不符附加問句格式。
  • isn't — 用於第三人稱單數。
  • don't — 一般動詞句才用。
💡 延伸：這是英文裡少數的不規則附加問句，會考容易考。`, category: '附加問句', difficulty: 'advanced' },
  { id: 293, question: 'There is a problem, ___ there?', options: ['is', "isn't", "doesn't", "wasn't"], correctIndex: 1, explanation: `🌐 翻譯：有個問題對吧？
🎯 考點：There is/are 句型的附加問句保留 there 作為代名詞，呼應 be 動詞。前肯後否。
❌ 為什麼不選：
  • is — 前肯後不能再肯。
  • doesn't — 一般動詞句才用。
  • wasn't — 時態錯（前面是 is）。
💡 延伸：There was/were 句型的附加問句 → was/were there；There will be → won't there。`, category: '附加問句', difficulty: 'advanced' },
  { id: 294, question: 'She seldom comes here, ___ she?', options: ['does', "doesn't", 'is', 'has'], correctIndex: 0, explanation: `🌐 翻譯：她很少來這裡，對吧？
🎯 考點：seldom（很少）= 半否定意義 → 後面用肯定 does she。
❌ 為什麼不選：
  • doesn't — 前否（seldom）後不能再否。
  • is / has — 助動詞家族不對。
💡 延伸：半否定家族 = seldom / rarely / hardly / scarcely / barely，後面附加問句一律用肯定。`, category: '附加問句', difficulty: 'advanced' },
  { id: 295, question: 'They will come, ___ they?', options: ['will', "won't", 'do', "don't"], correctIndex: 1, explanation: `🌐 翻譯：他們會來，對吧？
🎯 考點：前面 will（肯定）→ 後面 won't they。
❌ 為什麼不選：
  • will — 前肯後不能再肯。
  • do / don't — 一般動詞句才用。
💡 延伸：will / won't、shall / shan't 都是未來式助動詞家族。`, category: '附加問句', difficulty: 'advanced' },
  { id: 296, question: 'Mary doesn\'t play tennis, ___ she?', options: ["doesn't", 'does', "don't", 'do'], correctIndex: 1, explanation: `🌐 翻譯：Mary 不打網球，對吧？
🎯 考點：前面否定 doesn't → 後面肯定 does she（單數主詞用 does）。
❌ 為什麼不選：
  • doesn't — 前否後不能再否。
  • don't / do — Mary 是第三人稱單數，要用 does。
💡 延伸：第三人稱單數 → do/does；其他主詞 → do/don't。`, category: '附加問句', difficulty: 'advanced' },
  { id: 297, question: 'Tom and Jerry are friends, ___ they?', options: ["isn't", "aren't", "don't", "weren't"], correctIndex: 1, explanation: `🌐 翻譯：Tom 和 Jerry 是朋友，對吧？
🎯 考點：複數主詞（兩個人）+ are → 後面用 aren't they。
❌ 為什麼不選：
  • isn't — 用於單數主詞。
  • don't — 一般動詞句才用。
  • weren't — 時態錯（前面是 are 現在式）。
💡 延伸：「兩個名字 + and」= 複數主詞 → are / were。`, category: '附加問句', difficulty: 'advanced' },
  { id: 298, question: 'Don\'t shout, ___?', options: ['will you', 'do you', 'shall we', "won't you"], correctIndex: 0, explanation: `🌐 翻譯：別大叫，好嗎？
🎯 考點：否定祈使句的附加問句仍用 will you（保持禮貌的提醒）。
❌ 為什麼不選：
  • do you — 不適用於祈使句。
  • shall we — 用於 Let's 句型。
  • won't you — 在否定祈使句中較罕見。
💡 延伸：祈使句附加問句 = will you；Let's 句型 = shall we。`, category: '附加問句', difficulty: 'advanced' },
  { id: 299, question: 'Everyone is happy, ___ they?', options: ['is', "isn't", "aren't", 'are'], correctIndex: 2, explanation: `🌐 翻譯：大家都很開心，對吧？
🎯 考點：everyone / everybody / someone 等不定代名詞當主詞時雖搭單數動詞，附加問句的代名詞用 they，動詞用複數 aren't。
❌ 為什麼不選：
  • is / are — 前肯後不能再肯。
  • isn't — 動詞要配 they，用 aren't。
💡 延伸：Everyone is + 形容詞，aren't they?（會考易考的「集合不定代名詞」用法）。`, category: '附加問句', difficulty: 'advanced' },

  // ===== 不定詞與動名詞 (20) =====
  { id: 300, question: 'I enjoy ___ music.', options: ['listen', 'to listen', 'listening', 'listened'], correctIndex: 2, explanation: `🌐 翻譯：我喜歡聽音樂。
🎯 考點：enjoy 後面固定接動名詞 V-ing，不能接不定詞 to V。
❌ 為什麼不選：
  • listen — 原形動詞，文法不通。
  • to listen — enjoy 不接不定詞。
  • listened — 過去式，無法接在 enjoy 後。
💡 延伸：「接動名詞」的動詞口訣 = MEGAFEPS（mind, enjoy, give up, avoid, finish, escape, practice, suggest）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 301, question: 'She wants ___ a doctor.', options: ['be', 'to be', 'being', 'been'], correctIndex: 1, explanation: `🌐 翻譯：她想當醫生。
🎯 考點：want 後面固定接不定詞 to + V 原形。
❌ 為什麼不選：
  • be — 缺 to，want + 原形不合文法。
  • being — want 不接動名詞。
  • been — p.p. 不能搭 want。
💡 延伸：「接不定詞」的動詞 = want / hope / wish / decide / plan / agree / promise / refuse / expect。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 302, question: 'I finished ___ my homework.', options: ['do', 'to do', 'doing', 'did'], correctIndex: 2, explanation: `🌐 翻譯：我寫完作業了。
🎯 考點：finish 後面固定接動名詞 V-ing。
❌ 為什麼不選：
  • do — 原形不能直接接在 finish 後。
  • to do — finish 不接不定詞。
  • did — 過去式不能接在 finish 後。
💡 延伸：finish doing（完成做某事）vs stop doing（停止做某事），兩者都接 V-ing。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 303, question: 'They decided ___ to the beach.', options: ['go', 'to go', 'going', 'went'], correctIndex: 1, explanation: `🌐 翻譯：他們決定去海邊。
🎯 考點：decide 後面固定接不定詞 to + V。
❌ 為什麼不選：
  • go — 缺 to。
  • going — decide 不接動名詞。
  • went — 過去式不能搭 decide。
💡 延伸：decide / make a decision + to V 是「下決定」的常用句型。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 304, question: 'Stop ___ so much noise!', options: ['make', 'to make', 'making', 'made'], correctIndex: 2, explanation: `🌐 翻譯：別再製造這麼多噪音！
🎯 考點：stop + V-ing 表「停止正在做的事」；stop + to V 表「停下來去做另一件事」。本題語意是停止製造噪音。
❌ 為什麼不選：
  • make — 原形。
  • to make — 變成「停下來去製造噪音」，語意完全相反。
  • made — 過去式不能接在 stop 後。
💡 延伸：經典對比 = He stopped smoking（戒菸了）vs He stopped to smoke（停下手邊事去抽菸）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 305, question: 'He avoided ___ her.', options: ['meet', 'to meet', 'meeting', 'met'], correctIndex: 2, explanation: `🌐 翻譯：他避免見到她。
🎯 考點：avoid 後面固定接動名詞 V-ing。
❌ 為什麼不選：
  • meet — 原形。
  • to meet — avoid 不接不定詞。
  • met — 過去式不能接在 avoid 後。
💡 延伸：「逃避」家族（avoid / escape / miss / mind / consider / risk）都接 V-ing。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 306, question: 'I hope ___ you again soon.', options: ['see', 'to see', 'seeing', 'saw'], correctIndex: 1, explanation: `🌐 翻譯：我希望很快能再見到你。
🎯 考點：hope 後面固定接不定詞 to + V。
❌ 為什麼不選：
  • see — 缺 to。
  • seeing — hope 不接動名詞。
  • saw — 過去式不能搭 hope。
💡 延伸：hope to do / hope that + 子句，兩種句型都常用 (I hope to see you / I hope I see you)。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 307, question: 'She suggested ___ a movie.', options: ['watch', 'to watch', 'watching', 'watched'], correctIndex: 2, explanation: `🌐 翻譯：她建議去看電影。
🎯 考點：suggest 後面固定接動名詞 V-ing（不接不定詞）。
❌ 為什麼不選：
  • watch — 原形。
  • to watch — suggest 不接不定詞，這是常見錯誤。
  • watched — 過去式不能接在 suggest 後。
💡 延伸：suggest + V-ing / suggest + that + 主詞 + (should) + V 原形，兩種句型都正確。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 308, question: 'He promised ___ on time.', options: ['come', 'to come', 'coming', 'came'], correctIndex: 1, explanation: `🌐 翻譯：他承諾會準時來。
🎯 考點：promise 後面固定接不定詞 to + V。
❌ 為什麼不選：
  • come — 缺 to。
  • coming — promise 不接動名詞。
  • came — 過去式不能搭 promise。
💡 延伸：on time（準時）vs in time（及時），會考易混淆。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 309, question: 'I can\'t help ___ when I see the puppy.', options: ['smile', 'to smile', 'smiling', 'smiled'], correctIndex: 2, explanation: `🌐 翻譯：看到小狗，我忍不住微笑。
🎯 考點：can't help + V-ing = 「忍不住做某事」固定片語。
❌ 為什麼不選：
  • smile — 原形不合此片語規則。
  • to smile — can't help 後不接不定詞。
  • smiled — 過去式不能搭。
💡 延伸：同義表達 = can't help but + V 原形（I can't help but smile）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 310, question: 'It started ___ heavily.', options: ['rain', 'to rain', 'rained', 'rains'], correctIndex: 1, explanation: `🌐 翻譯：開始下大雨了。
🎯 考點：start / begin 後面接不定詞 to V 或動名詞 V-ing 都可（兩者通用）；本題選項中只有 to rain 符合。
❌ 為什麼不選：
  • rain — 缺 to。
  • rained — 過去式不能接在 started 後。
  • rains — 現在式不能接在 started 後。
💡 延伸：start / begin / continue / like / love / hate 後接 to V 或 V-ing 意義幾乎相同。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 311, question: 'Would you mind ___ the door?', options: ['close', 'to close', 'closing', 'closed'], correctIndex: 2, explanation: `🌐 翻譯：你介意把門關上嗎？
🎯 考點：mind 後面固定接動名詞 V-ing。Would you mind + V-ing 是禮貌請求的固定句型。
❌ 為什麼不選：
  • close — 原形。
  • to close — mind 不接不定詞。
  • closed — p.p. 在此語境不合。
💡 延伸：回答 Would you mind ...? 時 → 「不介意」要說 No / Not at all / Of course not（否定才是同意）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 312, question: 'He keeps ___ his promise.', options: ['break', 'to break', 'breaking', 'broken'], correctIndex: 2, explanation: `🌐 翻譯：他一直違背承諾。
🎯 考點：keep + V-ing = 「一直/持續做某事」固定句型。
❌ 為什麼不選：
  • break — 原形不能直接接 keep。
  • to break — keep 不接不定詞。
  • broken — p.p. 不能接在 keep 後表持續。
💡 延伸：keep / continue / go on + V-ing 都表「持續做」；break a promise（違背承諾）vs keep a promise（信守承諾）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 313, question: 'It is important ___ healthy food.', options: ['eat', 'to eat', 'eating', 'eaten'], correctIndex: 1, explanation: `🌐 翻譯：吃健康食物很重要。
🎯 考點：It is + 形容詞 + to V = 虛主詞句型，固定接不定詞。
❌ 為什麼不選：
  • eat — 缺 to。
  • eating — 此句型不接動名詞。
  • eaten — p.p. 不適合。
💡 延伸：It is + adj + (for sb) + to V 是會考超高頻句型，例：It is hard for me to wake up early.`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 314, question: 'Remember ___ off the lights before you leave.', options: ['turn', 'to turn', 'turning', 'turned'], correctIndex: 1, explanation: `🌐 翻譯：離開前記得關燈。
🎯 考點：remember + to V = 「記得（之後）要做某事」；remember + V-ing = 「記得（曾經）做過某事」。本題是「之後要做」。
❌ 為什麼不選：
  • turn — 缺 to。
  • turning — 變成「記得曾經關過燈」，語意不對。
  • turned — 過去式不合。
💡 延伸：類似對比 forget to V（忘記要做）vs forget V-ing（忘記做過）；try to V（嘗試做）vs try V-ing（試試看）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 315, question: 'She is busy ___ for the test.', options: ['prepare', 'to prepare', 'preparing', 'prepared'], correctIndex: 2, explanation: `🌐 翻譯：她正忙著準備考試。
🎯 考點：be busy + V-ing = 「忙著做某事」固定句型。
❌ 為什麼不選：
  • prepare — 原形不合此句型。
  • to prepare — be busy 不接不定詞。
  • prepared — p.p. 在此不合。
💡 延伸：相似句型 = have fun + V-ing（玩得開心做某事）、have trouble + V-ing（做某事有困難）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 316, question: 'I prefer ___ tea to drinking coffee.', options: ['drink', 'to drink', 'drinking', 'drunk'], correctIndex: 2, explanation: `🌐 翻譯：比起喝咖啡，我更喜歡喝茶。
🎯 考點：prefer + V-ing + to + V-ing = 「相較於…更喜歡…」。to 後面也要用 V-ing（不是不定詞）。
❌ 為什麼不選：
  • drink — 原形不合。
  • to drink — 在此句型 to 是介系詞，後面要 V-ing。
  • drunk — p.p. 不合。
💡 延伸：prefer A to B = like A better than B = would rather A than B（三種同義表達）。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 317, question: 'He went out without ___ goodbye.', options: ['say', 'to say', 'saying', 'said'], correctIndex: 2, explanation: `🌐 翻譯：他沒道別就出去了。
🎯 考點：介系詞（without / before / after / by / instead of）後面一定接動名詞 V-ing。
❌ 為什麼不選：
  • say — 原形不能跟在介系詞後。
  • to say — 不定詞不能跟在介系詞後。
  • said — 過去式不合。
💡 延伸：超易混淆 — to + V（不定詞）vs to + V-ing（這時 to 是介系詞），如 look forward to + V-ing、be used to + V-ing。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 318, question: 'My dream is ___ the world.', options: ['travel', 'to travel', 'traveling', 'traveled'], correctIndex: 1, explanation: `🌐 翻譯：我的夢想是環遊世界。
🎯 考點：be 動詞 + 不定詞 to V，用來「描述夢想/目標/計畫」。
❌ 為什麼不選：
  • travel — 缺 to。
  • traveling — 雖也可，但 to travel 是會考標準寫法。
  • traveled — 過去式不合。
💡 延伸：My goal/dream/plan/job is to + V 是常用句型。`, category: '不定詞與動名詞', difficulty: 'advanced' },
  { id: 319, question: 'It\'s no use ___ over spilled milk.', options: ['cry', 'to cry', 'crying', 'cried'], correctIndex: 2, explanation: `🌐 翻譯：覆水難收（為打翻的牛奶哭沒有用）。
🎯 考點：It's no use + V-ing = 「做…沒用」固定諺語句型。
❌ 為什麼不選：
  • cry — 原形不合此句型。
  • to cry — 此句型不接不定詞。
  • cried — 過去式不合。
💡 延伸：相似句型 = It's no good + V-ing / There's no point in + V-ing（都表「沒意義/沒用」）。`, category: '不定詞與動名詞', difficulty: 'advanced' },

  // ===== 形容詞與副詞 (20) =====
  { id: 320, question: 'She sings ___.', options: ['beautiful', 'beautifully', 'beauty', 'beautifuls'], correctIndex: 1, explanation: `🌐 翻譯：她唱得很美。
🎯 考點：副詞修飾動詞；形容詞 beautiful → 副詞 beautifully（字尾加 -ly）。
❌ 為什麼不選：
  • beautiful — 形容詞，只能修飾名詞或在 be 動詞後。
  • beauty — 名詞，無法修飾動詞 sings。
  • beautifuls — 形容詞無複數形式，是錯誤拼字。
💡 延伸：規則 = 形容詞 + ly → 副詞；y 結尾 → 改 i + ly（happy → happily）；le 結尾 → 去 e + y（simple → simply）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 321, question: 'He is a ___ runner.', options: ['fast', 'fastly', 'faster', 'fastest'], correctIndex: 0, explanation: `🌐 翻譯：他是個跑得快的人。
🎯 考點：fast 是少數「形容詞和副詞同形」的字，這裡修飾名詞 runner 用形容詞 fast。
❌ 為什麼不選：
  • fastly — 沒有這個字，常見錯誤。
  • faster / fastest — 比較級與最高級需有比較對象。
💡 延伸：形副同形家族 = fast / hard / late / early / high / low / near。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 322, question: 'She speaks English very ___.', options: ['good', 'well', 'better', 'best'], correctIndex: 1, explanation: `🌐 翻譯：她英文說得非常好。
🎯 考點：修飾動詞 speaks 要用副詞；good 的副詞形式是 well（不規則）。
❌ 為什麼不選：
  • good — 形容詞，不能修飾動詞。
  • better / best — 比較級與最高級在此語境不適合。
💡 延伸：good (adj.) / well (adv.) 互換，但 well 當形容詞時意思變成「健康的」(I'm well.)。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 323, question: 'The test was really ___.', options: ['difficulty', 'difficultly', 'difficult', 'difficults'], correctIndex: 2, explanation: `🌐 翻譯：考試真的很難。
🎯 考點：be 動詞 was 後面接形容詞作主詞補語。
❌ 為什麼不選：
  • difficulty — 名詞（困難），雖能接 be 動詞但語意是「考試是困難」不通順。
  • difficultly — 副詞，不能在 be 動詞後當補語。
  • difficults — 形容詞無複數形式。
💡 延伸：be 動詞 + 形容詞（主詞補語）= 描述主詞特性；be 動詞 + 名詞 = 主詞身分。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 324, question: 'He drives very ___.', options: ['careful', 'carefully', 'careless', 'care'], correctIndex: 1, explanation: `🌐 翻譯：他開車很小心。
🎯 考點：修飾動詞 drives 要用副詞 carefully。
❌ 為什麼不選：
  • careful — 形容詞，不能修飾動詞。
  • careless — 形容詞 + 意義相反（粗心）。
  • care — 動詞或名詞，不能修飾另一個動詞。
💡 延伸：careful（小心）vs careless（粗心）= 字根 care + 後綴 ful（充滿）/ less（缺乏），會考字根字尾必考。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 325, question: 'The baby is sleeping ___.', options: ['quiet', 'quietly', 'quieter', 'quietness'], correctIndex: 1, explanation: `🌐 翻譯：寶寶安靜地睡著。
🎯 考點：修飾動詞 sleeping 要用副詞 quietly。
❌ 為什麼不選：
  • quiet — 形容詞。
  • quieter — 比較級需有對照。
  • quietness — 名詞（安靜），不能修飾動詞。
💡 延伸：quiet 三型 = adj. quiet（安靜的）/ adv. quietly（安靜地）/ n. quietness（安靜）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 326, question: 'That sounds ___.', options: ['great', 'greatly', 'greater', 'greatness'], correctIndex: 0, explanation: `🌐 翻譯：那聽起來很棒。
🎯 考點：感官動詞（look / sound / smell / taste / feel）後面接形容詞當主詞補語，不接副詞。
❌ 為什麼不選：
  • greatly — 副詞，感官動詞後不能接副詞。
  • greater — 比較級需有對照。
  • greatness — 名詞，語意不通。
💡 延伸：感官動詞口訣 = LSSFTSL（look / sound / smell / feel / taste / seem / be like），後接形容詞。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 327, question: 'He ran ___ to catch the bus.', options: ['quick', 'quickly', 'quicker', 'quickest'], correctIndex: 1, explanation: `🌐 翻譯：他很快地跑去趕公車。
🎯 考點：修飾動詞 ran 要用副詞 quickly。
❌ 為什麼不選：
  • quick — 形容詞。
  • quicker / quickest — 比較級最高級需有比較對象。
💡 延伸：catch the bus（趕上公車）vs miss the bus（沒趕上）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 328, question: 'The soup tastes ___.', options: ['delicious', 'deliciously', 'deliciousness', 'more delicious'], correctIndex: 0, explanation: `🌐 翻譯：這湯嚐起來很美味。
🎯 考點：感官動詞 taste 後面接形容詞當主詞補語。
❌ 為什麼不選：
  • deliciously — 副詞，感官動詞後不接副詞。
  • deliciousness — 名詞，語意不通。
  • more delicious — 比較級需搭 than。
💡 延伸：感官動詞 + adj. 句型對照 = This tastes good / This sounds nice / She looks happy。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 329, question: 'She did her homework ___.', options: ['easy', 'easily', 'easier', 'easiest'], correctIndex: 1, explanation: `🌐 翻譯：她輕鬆地寫完了作業。
🎯 考點：修飾動詞 did 要用副詞 easily（y 改 i 加 ly）。
❌ 為什麼不選：
  • easy — 形容詞。
  • easier / easiest — 比較級最高級需有對照。
💡 延伸：y 結尾 → 改 i + ly 的副詞 = easy → easily、happy → happily、busy → busily。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 330, question: 'He plays the guitar very ___.', options: ['good', 'well', 'better', 'bad'], correctIndex: 1, explanation: `🌐 翻譯：他吉他彈得很好。
🎯 考點：修飾動詞 plays 用副詞 well。
❌ 為什麼不選：
  • good — 形容詞不能修飾動詞。
  • better — 比較級需有對照（need than）。
  • bad — 形容詞且語意相反。
💡 延伸：play the + 樂器（the guitar / the piano）vs play + 運動（basketball）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 331, question: 'The math problem is ___ for me.', options: ['hard', 'hardly', 'harder', 'hardest'], correctIndex: 0, explanation: `🌐 翻譯：這道數學題對我來說很難。
🎯 考點：be 動詞 is 後面接形容詞 hard 當主詞補語。
❌ 為什麼不選：
  • hardly — 副詞，意思是「幾乎不」，不是「困難地」，語意完全不同。
  • harder / hardest — 比較級最高級需有比較對象。
💡 延伸：hard 與 hardly 是會考超易混淆字！hard（難的/努力地）、hardly（幾乎不 = almost not）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 332, question: 'She arrived ___ for the meeting.', options: ['late', 'lately', 'later', 'latest'], correctIndex: 0, explanation: `🌐 翻譯：她開會遲到了。
🎯 考點：late 是形副同形字，修飾動詞 arrived 用 late（=遲）。lately 是另一個字，意思是「最近」。
❌ 為什麼不選：
  • lately — 意思是「最近」，不是「遲」，語意不對。
  • later — 比較級「之後」，本題沒有比較。
  • latest — 最高級「最新的」，語意不通。
💡 延伸：late（遲）vs lately（最近 = recently），會考超高頻易混淆字。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 333, question: 'He works ___ to support his family.', options: ['hard', 'hardly', 'hardest', 'harder'], correctIndex: 0, explanation: `🌐 翻譯：他努力工作來養家。
🎯 考點：hard 是形副同形字，修飾動詞 works 用 hard（=努力地）。
❌ 為什麼不選：
  • hardly — 「幾乎不」，意思完全相反（變成「幾乎不工作」）。
  • hardest / harder — 比較級最高級需有對照。
💡 延伸：He works hard.（他努力工作）vs He hardly works.（他幾乎不工作）= 一字之差語意全反！`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 334, question: 'I felt ___ after the long trip.', options: ['tired', 'tiredly', 'tire', 'tires'], correctIndex: 0, explanation: `🌐 翻譯：長途旅行後我感到很累。
🎯 考點：feel 是感官動詞，後接形容詞 tired 當主詞補語。
❌ 為什麼不選：
  • tiredly — 副詞，感官動詞後不接副詞。
  • tire / tires — 動詞或名詞，不能在感官動詞後當補語。
💡 延伸：tired（感到累，過去分詞當形容詞）vs tiring（令人疲倦的，現在分詞當形容詞）。感受用 -ed，特性用 -ing。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 335, question: 'She speaks Chinese ___ than I do.', options: ['good', 'better', 'best', 'well'], correctIndex: 1, explanation: `🌐 翻譯：她中文比我說得好。
🎯 考點：比較級 + than = 比較句。well 的比較級是不規則的 better。
❌ 為什麼不選：
  • good — 形容詞且為原級，無法搭 than。
  • best — 最高級需有「最」的範圍。
  • well — 副詞原級，需用比較級。
💡 延伸：well / better / best、badly / worse / worst 都是副詞的不規則變化。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 336, question: 'The students listened ___ to the teacher.', options: ['careful', 'carefully', 'careless', 'care'], correctIndex: 1, explanation: `🌐 翻譯：學生們仔細地聽老師說話。
🎯 考點：修飾動詞 listened 要用副詞 carefully。
❌ 為什麼不選：
  • careful — 形容詞。
  • careless — 形容詞「粗心」。
  • care — 名詞或動詞。
💡 延伸：listen carefully / pay attention / be all ears 都是「專心聽」的不同表達。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 337, question: 'He is a ___ driver. He drives very ___.', options: ['careful / careful', 'careful / carefully', 'carefully / careful', 'carefully / carefully'], correctIndex: 1, explanation: `🌐 翻譯：他是個小心的駕駛。他開車很小心。
🎯 考點：第一格修飾名詞 driver 用形容詞 careful；第二格修飾動詞 drives 用副詞 carefully。
❌ 為什麼不選：
  • careful / careful — 第二格須為副詞修飾動詞。
  • carefully / careful — 第一格須為形容詞修飾名詞。
  • carefully / carefully — 兩格都錯。
💡 延伸：副詞與形容詞的辨識訣竅 = 看修飾對象（修飾名詞 → 形容詞 / 修飾動詞 → 副詞）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 338, question: 'The story was so ___ that everyone fell asleep.', options: ['boring', 'bored', 'boredly', 'boringly'], correctIndex: 0, explanation: `🌐 翻譯：故事太無聊了，大家都睡著了。
🎯 考點：描述事物本身的「特性」用 V-ing 形容詞；描述「人/受影響者的感受」用 V-ed 形容詞。故事是讓人感覺無聊的，用 boring。
❌ 為什麼不選：
  • bored — 用於「人感到無聊」（I am bored.），不是描述故事。
  • boredly — 副詞，不能在 be 動詞後當補語。
  • boringly — 副詞，不能在 be 動詞後當補語。
💡 延伸：經典對比 = The book is interesting.（書本身有趣）vs I am interested in the book.（我對書感興趣）。`, category: '形容詞與副詞', difficulty: 'advanced' },
  { id: 339, question: 'She danced as ___ as a professional.', options: ['graceful', 'gracefully', 'more graceful', 'most gracefully'], correctIndex: 1, explanation: `🌐 翻譯：她跳得跟專業舞者一樣優雅。
🎯 考點：修飾動詞 danced 用副詞；as...as 中間用「原級副詞」gracefully。
❌ 為什麼不選：
  • graceful — 形容詞，不能修飾動詞。
  • more graceful — as...as 不可用比較級。
  • most gracefully — as...as 不可用最高級。
💡 延伸：as + 原級（形容詞或副詞）+ as 是固定句型，中間「絕對不可」用比較級。`, category: '形容詞與副詞', difficulty: 'advanced' },

  // ===== 關係代名詞 (20) =====
  { id: 340, question: 'The boy ___ is running is my brother.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: `🌐 翻譯：正在跑步的那個男孩是我哥哥。
🎯 考點：關係代名詞的選擇看「先行詞」+「在子句中的位置」。先行詞是人（boy）+ 子句中當主詞 → who。
❌ 為什麼不選：
  • which — 用於先行詞是物或動物。
  • whose — 表「誰的」，後面要接名詞。
  • whom — 用於受格（動詞或介系詞後）。
💡 延伸：關代決策樹 = 看先行詞（人/物/所有格）→ 看子句缺什麼（主格/受格）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 341, question: 'The book ___ I bought is very good.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: `🌐 翻譯：我買的那本書很好。
🎯 考點：先行詞是物（book）+ 子句中當受格（I bought 後面少受詞）→ which 或 that。
❌ 為什麼不選：
  • who — 先行詞是物，不用 who。
  • whose — 後面要接名詞。
  • whom — 用於先行詞是人的受格。
💡 延伸：受格關代可以省略 → The book I bought is very good. 是合法寫法。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 342, question: 'The girl ___ father is a doctor is my friend.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 2, explanation: `🌐 翻譯：父親是醫生的那個女孩是我的朋友。
🎯 考點：「她的父親」= 所有格關係 → whose father。whose 後面一定接名詞。
❌ 為什麼不選：
  • who — 表主格「她」，不是「她的」。
  • which — 物的關代。
  • whom — 受格「她」，不是「她的」。
💡 延伸：whose 是唯一可用於人和物的所有格關代 (the book whose cover is red 也合法)。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 343, question: 'This is the house ___ we lived in.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: `🌐 翻譯：這是我們以前住的房子。
🎯 考點：先行詞是物（house）+ 子句中當介系詞 in 的受詞 → which。
❌ 為什麼不選：
  • who / whom — 用於人。
  • whose — 後面要接名詞。
💡 延伸：介系詞可前置 → This is the house in which we lived.（較正式）；口語常省略關代 → the house we lived in。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 344, question: 'The man ___ you met yesterday is my uncle.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 3, explanation: `🌐 翻譯：你昨天遇到的那個人是我叔叔。
🎯 考點：先行詞是人 + 子句中當動詞 met 的受詞 → whom（也可用 who 或 that，但正式語用 whom）。
❌ 為什麼不選：
  • who — 雖口語常用，但正式語體在受格位置用 whom 較精準。
  • which — 用於物。
  • whose — 後面要接名詞。
💡 延伸：受格關代可省略 → The man you met yesterday is my uncle. 是常見口語寫法。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 345, question: 'I have a friend ___ can speak five languages.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: `🌐 翻譯：我有一個會說五種語言的朋友。
🎯 考點：先行詞是人（friend）+ 子句中當主格（can speak 的主詞）→ who。
❌ 為什麼不選：
  • which — 用於物。
  • whose — 後面接名詞。
  • whom — 受格用法。
💡 延伸：主格關代不可省略；受格關代可省略。這是會考題易考的「能否省略」判斷。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 346, question: 'The dog ___ bit me was brown.', options: ['who', 'that', 'whose', 'whom'], correctIndex: 1, explanation: `🌐 翻譯：咬我的那隻狗是棕色的。
🎯 考點：動物作先行詞，最常用 that（也可用 which，但 that 更通用）。
❌ 為什麼不選：
  • who — 只用於人。
  • whose — 後面要接名詞。
  • whom — 受格用法。
💡 延伸：that 是萬能關代，可代替 who / which，但不可代替 whose。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 347, question: 'The teacher ___ class I enjoy is Ms. Lin.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 2, explanation: `🌐 翻譯：我喜歡她課的那位老師是 Lin 老師。
🎯 考點：「她的課」= 所有格關係 → whose class。
❌ 為什麼不選：
  • who — 主格，後不接名詞。
  • which — 物的關代。
  • whom — 受格，後不接名詞。
💡 延伸：whose 的特徵：後面緊跟名詞（whose father、whose book、whose class）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 348, question: 'Everything ___ he said was true.', options: ['who', 'which', 'that', 'whose'], correctIndex: 2, explanation: `🌐 翻譯：他說的每件事都是真的。
🎯 考點：先行詞是 everything / something / anything / nothing / all 等不定代名詞時，關代只能用 that（不可用 which）。
❌ 為什麼不選：
  • who — 用於人。
  • which — 此情境下不可用，是會考易錯點。
  • whose — 後面要接名詞。
💡 延伸：「只能用 that」的情境：先行詞是不定代名詞、最高級、序數、only / very / same 等修飾語。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 349, question: 'The place ___ we visited was beautiful.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 1, explanation: `🌐 翻譯：我們參觀的那個地方很美。
🎯 考點：先行詞是地方（place）+ 子句中當動詞 visited 的受詞 → which 或 that。
❌ 為什麼不選：
  • who / whom — 用於人。
  • whose — 後面接名詞。
💡 延伸：表「地點」也可用關係副詞 where → The place where we visited was beautiful. 但 visited 後缺受詞時要用 which/that；where 後接完整句。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 350, question: 'I know a woman ___ husband is a famous singer.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 2, explanation: `🌐 翻譯：我認識一位先生是著名歌手的女士。
🎯 考點：「她的先生」= 所有格 → whose husband。
❌ 為什麼不選：
  • who — 主格。
  • which — 物。
  • whom — 受格。
💡 延伸：whose 後面接的名詞是「主詞、受詞、或補語」皆可：whose husband is（主詞）/ whose son I met（受詞）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 351, question: 'The day ___ I met you was the happiest day of my life.', options: ['who', 'which', 'when', 'where'], correctIndex: 2, explanation: `🌐 翻譯：我遇到你的那一天，是我這輩子最快樂的一天。
🎯 考點：先行詞是時間（day）→ 關係副詞用 when（= on which）。
❌ 為什麼不選：
  • who — 用於人。
  • which — 子句已完整，不需關代當主受詞。
  • where — 用於地點。
💡 延伸：關係副詞家族 = when（時間）/ where（地點）/ why（原因，用於 the reason why）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 352, question: 'This is the city ___ I was born.', options: ['who', 'which', 'when', 'where'], correctIndex: 3, explanation: `🌐 翻譯：這是我出生的城市。
🎯 考點：先行詞是地點（city）+ 子句已完整 → 關係副詞 where（= in which）。
❌ 為什麼不選：
  • who — 用於人。
  • which — 子句已完整，不需 which 補主受詞。
  • when — 用於時間。
💡 延伸：等義轉換 = This is the city in which I was born. 介系詞 + which 較正式。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 353, question: 'The reason ___ he left is unknown.', options: ['who', 'which', 'why', 'where'], correctIndex: 2, explanation: `🌐 翻譯：他離開的原因不明。
🎯 考點：先行詞是 reason → 關係副詞用 why。
❌ 為什麼不選：
  • who — 用於人。
  • which — 子句已完整，不缺主受詞。
  • where — 用於地點。
💡 延伸：why 只能用於先行詞 reason；常省略，The reason he left ... 也合法。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 354, question: 'Lin, ___ is my best friend, lives in Taipei.', options: ['who', 'which', 'that', 'whom'], correctIndex: 0, explanation: `🌐 翻譯：Lin 是我最好的朋友，她住台北。
🎯 考點：補述用法（用逗號隔開）→ 不可用 that，先行詞是人用 who、是物用 which。
❌ 為什麼不選：
  • which — 用於物，先行詞 Lin 是人。
  • that — 補述用法不可用 that，這是會考必考規則。
  • whom — 子句中是主格位置（is my best friend），不是受格。
💡 延伸：限定 vs 補述：The man who came is my friend（限定，無逗號，that 可用）vs Tom, who is my friend, came late（補述，有逗號，that 不可用）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 355, question: 'The students ___ work hard will succeed.', options: ['who', 'which', 'whose', 'whom'], correctIndex: 0, explanation: `🌐 翻譯：努力的學生會成功。
🎯 考點：先行詞是人（students）+ 子句中當主詞 → who。
❌ 為什麼不選：
  • which — 用於物。
  • whose — 後接名詞。
  • whom — 受格。
💡 延伸：複數先行詞時主詞動詞要呼應 → who 後動詞配 students 用 work（複數）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 356, question: 'I lost the umbrella ___ I bought yesterday.', options: ['who', 'when', 'which', 'whose'], correctIndex: 2, explanation: `🌐 翻譯：我把昨天買的那把傘弄丟了。
🎯 考點：先行詞是物（umbrella）+ 子句中當 bought 的受詞 → which 或 that。
❌ 為什麼不選：
  • who — 用於人。
  • when — 子句中缺受詞，不是缺時間副詞。
  • whose — 後面要接名詞。
💡 延伸：可省略寫法 = the umbrella I bought yesterday（受格關代省略）。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 357, question: 'He is the only person ___ understands me.', options: ['who', 'which', 'that', 'whom'], correctIndex: 2, explanation: `🌐 翻譯：他是唯一了解我的人。
🎯 考點：先行詞被 only / very / same / 序數 / 最高級 修飾時，關代「只能用 that」。
❌ 為什麼不選：
  • who — 雖然先行詞是人，但有 only 修飾時優先用 that。
  • which — 用於物。
  • whom — 子句中是主格位置。
💡 延伸：only / very / first / last / best 出現時 → that 優先；其他情況 who 也行。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 358, question: 'This is the best movie ___ I have ever seen.', options: ['who', 'which', 'that', 'whose'], correctIndex: 2, explanation: `🌐 翻譯：這是我看過最棒的電影。
🎯 考點：先行詞被最高級（the best）修飾 → 關代用 that。
❌ 為什麼不選：
  • who — 用於人。
  • which — 此情境會考慣例用 that。
  • whose — 後面要接名詞。
💡 延伸：完成式 + ever + p.p. 是會考超高頻句型，常與最高級搭配。`, category: '關係代名詞', difficulty: 'advanced' },
  { id: 359, question: 'The book ___ cover is red is mine.', options: ['who', 'which', 'whose', 'that'], correctIndex: 2, explanation: `🌐 翻譯：封面是紅色的那本書是我的。
🎯 考點：「書的封面」= 所有格關係 → whose cover（whose 可用於物，不只用於人）。
❌ 為什麼不選：
  • who — 用於人。
  • which — 子句缺主詞（cover）的所有格修飾語。
  • that — 不能表所有格。
💡 延伸：whose 萬用 = 人和物的所有格皆可，這點和中文「的」概念相同。`, category: '關係代名詞', difficulty: 'advanced' },

  // ===== 條件句 (20) =====
  { id: 360, question: 'If it ___ tomorrow, we will stay home.', options: ['rain', 'rains', 'rained', 'will rain'], correctIndex: 1, explanation: `🌐 翻譯：如果明天下雨，我們會待在家。
🎯 考點：第一類條件句（未來可能發生）→ if 子句用現在式、主句用未來式 will。it 是單數 → rains。
❌ 為什麼不選：
  • rain — 缺 -s，主詞 it 第三人稱單數。
  • rained — 過去式，與未來語境矛盾。
  • will rain — if 子句不可用 will，這是會考必考鐵則。
💡 延伸：條件句口訣 = 主句 will + 原形、if 子句現在式。`, category: '條件句', difficulty: 'advanced' },
  { id: 361, question: 'If I ___ rich, I would travel the world.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: `🌐 翻譯：如果我是富翁，我會環遊世界。
🎯 考點：第二類條件句（與現在事實相反）→ if 子句用過去式，主句用 would + 原形。be 動詞「假設語氣」一律用 were，不論主詞。
❌ 為什麼不選：
  • am — 是直述語氣，不表「相反假設」。
  • was — 雖文法可，但會考標準假設語氣只認 were。
  • will be — if 子句不可用 will。
💡 延伸：If I were you, I would ... 是會考超高頻假設句型，用來給建議。`, category: '條件句', difficulty: 'advanced' },
  { id: 362, question: 'She will come if you ___ her.', options: ['invite', 'invites', 'invited', 'will invite'], correctIndex: 0, explanation: `🌐 翻譯：如果你邀請她，她就會來。
🎯 考點：第一類條件句，if 子句現在式；主詞 you → 原形 invite。
❌ 為什麼不選：
  • invites — 主詞 you 不加 -s。
  • invited — 過去式語境不對。
  • will invite — if 子句不可用 will。
💡 延伸：第一類條件句兩種主從句序對換皆可 → If you invite her, she will come. = She will come if you invite her.`, category: '條件句', difficulty: 'advanced' },
  { id: 363, question: 'If he had studied harder, he ___ the test.', options: ['passes', 'passed', 'would have passed', 'will pass'], correctIndex: 2, explanation: `🌐 翻譯：如果他當初再用功一點，他就會通過考試（但實際上沒通過）。
🎯 考點：第三類條件句（與過去事實相反）→ if 子句用 had + p.p.，主句用 would have + p.p.。
❌ 為什麼不選：
  • passes — 現在式不符。
  • passed — 過去式，沒有「結果會不同」的假設語氣。
  • will pass — 與過去 had studied 時態不一致。
💡 延伸：三類條件句總整理 — 第一類（未來可能）/ 第二類（現在相反）/ 第三類（過去相反），各有固定時態搭配。`, category: '條件句', difficulty: 'advanced' },
  { id: 364, question: 'If you heat water to 100°C, it ___.', options: ['boil', 'boils', 'boiled', 'will boil'], correctIndex: 1, explanation: `🌐 翻譯：水加熱到 100°C 就會沸騰。
🎯 考點：零條件句（科學事實/恆真原理）→ 兩邊都用現在簡單式。it 是單數 → boils。
❌ 為什麼不選：
  • boil — 主詞 it 第三人稱單數，動詞加 -s。
  • boiled — 過去式不符恆真語境。
  • will boil — 此題是表恆真事實，不是預測未來。
💡 延伸：零條件句 if = whenever（每當…就…），表自然規律。`, category: '條件句', difficulty: 'advanced' },
  { id: 365, question: 'I would help you if I ___ free.', options: ['am', 'is', 'were', 'will be'], correctIndex: 2, explanation: `🌐 翻譯：如果我有空，我就會幫你（但實際上沒空）。
🎯 考點：第二類條件句（與現在事實相反）→ if 子句的 be 動詞用 were。
❌ 為什麼不選：
  • am — 是直述語氣。
  • is — 用於第三人稱單數，且非假設語氣。
  • will be — if 子句不可用 will。
💡 延伸：第二類條件句主句固定用 would / could / might + 原形動詞。`, category: '條件句', difficulty: 'advanced' },
  { id: 366, question: 'If she ___ earlier, she wouldn\'t miss the bus.', options: ['wake', 'wakes', 'woke', 'had woken'], correctIndex: 2, explanation: `🌐 翻譯：如果她早一點起床，就不會錯過公車（與現在/通常情況相反）。
🎯 考點：第二類條件句（與現在事實相反，「她通常起床晚」）→ if 子句用過去式 woke，主句用 would + 原形。
❌ 為什麼不選：
  • wake — 過去式不可用原形。
  • wakes — 現在式不符假設語氣。
  • had woken — 過去完成式為第三類（過去相反），但主句 wouldn't miss 是現在式，搭不上。
💡 延伸：判斷類別看主句時態 — would + 原形 = 第二類；would have + p.p. = 第三類。`, category: '條件句', difficulty: 'advanced' },
  { id: 367, question: 'Unless you hurry, you ___ be late.', options: ['won\'t', 'will', 'would', 'can'], correctIndex: 1, explanation: `🌐 翻譯：除非你趕快，否則你會遲到。
🎯 考點：unless = if not（除非…否則），本身已含否定意義，主句用肯定的 will。
❌ 為什麼不選：
  • won't — unless 已是否定，再否定就變雙重否定（你會準時，語意不通）。
  • would — 用於假設語氣。
  • can — 表能力或可能性，語意不通。
💡 延伸：Unless = If ... not 同義改寫 = If you don't hurry, you will be late.`, category: '條件句', difficulty: 'advanced' },
  { id: 368, question: 'If I ___ you, I would apologize.', options: ['am', 'is', 'were', 'was'], correctIndex: 2, explanation: `🌐 翻譯：如果我是你，我就會道歉。
🎯 考點：第二類條件句的固定句型 If I were you（不可能成真的假設），是會考超高頻句型。
❌ 為什麼不選：
  • am — 直述語氣。
  • is — 用於第三人稱單數。
  • was — 文法可但會考標準寫法用 were。
💡 延伸：If I were you 用來給對方建議，類似 You should ... 但更委婉。`, category: '條件句', difficulty: 'advanced' },
  { id: 369, question: 'What would you do if you ___ a million dollars?', options: ['have', 'has', 'had', 'will have'], correctIndex: 2, explanation: `🌐 翻譯：如果你有一百萬美元，你會做什麼？
🎯 考點：第二類條件句（與現在事實相反）→ if 子句用過去式 had。
❌ 為什麼不選：
  • have — 直述現在式。
  • has — 第三人稱單數現在式。
  • will have — if 子句不可用 will。
💡 延伸：if 子句的「過去式」這裡並非真的指過去，而是「假設語氣」的標記，這是會考易混淆點。`, category: '條件句', difficulty: 'advanced' },
  { id: 370, question: 'If I ___ wings, I could fly.', options: ['have', 'has', 'had', 'will have'], correctIndex: 2, explanation: `🌐 翻譯：如果我有翅膀，我就能飛了。
🎯 考點：第二類條件句（現在不可能）→ if 子句過去式 had，主句 could + 原形。
❌ 為什麼不選：
  • have / has — 直述語氣。
  • will have — if 子句不可用 will。
💡 延伸：could + 原形 = would be able to + 原形，兩者在條件句主句意思相同。`, category: '條件句', difficulty: 'advanced' },
  { id: 371, question: 'If it ___ tomorrow, we ___ a picnic.', options: ['is / will have', 'is sunny / will have', 'will be / have', 'were / would have'], correctIndex: 1, explanation: `🌐 翻譯：如果明天天氣晴朗，我們就會去野餐。
🎯 考點：第一類條件句（未來可能）→ if 子句現在式、主句 will + 原形。
❌ 為什麼不選：
  • is / will have — 雖時態對，但 is 後缺形容詞（要 is sunny）。
  • will be / have — if 子句不可用 will。
  • were / would have — 第二類假設語氣不適合一般可能性的天氣預測。
💡 延伸：第一類條件句適合表「真實可能發生的未來」，這是日常英語最常用的條件句。`, category: '條件句', difficulty: 'advanced' },
  { id: 372, question: 'I wish I ___ taller.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: `🌐 翻譯：我希望我比較高（但實際上我不高）。
🎯 考點：wish + 假設語氣，與現在事實相反 → 用過去式；be 動詞用 were。
❌ 為什麼不選：
  • am — 直述現在式。
  • was — 文法可但會考標準寫法用 were。
  • will be — wish 後不接 will。
💡 延伸：I wish + 過去式（與現在相反）/ I wish + 過去完成式（與過去相反）/ I wish + would + 原形（希望未來能改變）。`, category: '條件句', difficulty: 'advanced' },
  { id: 373, question: 'If she ___ harder, she would have won.', options: ['try', 'tried', 'had tried', 'will try'], correctIndex: 2, explanation: `🌐 翻譯：如果她當初再努力一點，她就會贏（但實際上她沒贏）。
🎯 考點：第三類條件句（與過去事實相反）→ if 子句 had + p.p.、主句 would have + p.p.。
❌ 為什麼不選：
  • try / tried — 時態不符第三類條件句。
  • will try — if 子句不可用 will。
💡 延伸：第三類條件句表「過去的後悔/遺憾」，常用於檢討過去的決定。`, category: '條件句', difficulty: 'advanced' },
  { id: 374, question: '___ you study now, you will fail the test.', options: ['If', 'Unless', 'Because', 'When'], correctIndex: 1, explanation: `🌐 翻譯：除非你現在開始唸書，否則你會考試不及格。
🎯 考點：unless = if not（除非…否則），主句用肯定。題意是「不唸書 → 不及格」。
❌ 為什麼不選：
  • If — 變成「如果你現在唸書就會不及格」，語意荒謬。
  • Because — 表原因，不是條件。
  • When — 表時間，不是條件。
💡 延伸：Unless you study = If you don't study（同義改寫）。`, category: '條件句', difficulty: 'advanced' },
  { id: 375, question: 'If I had known, I ___ you.', options: ['call', 'called', 'would call', 'would have called'], correctIndex: 3, explanation: `🌐 翻譯：如果我當初知道，我就會打電話給你（但實際上我不知道，所以沒打）。
🎯 考點：第三類條件句 → if 子句 had + p.p.、主句 would have + p.p.。
❌ 為什麼不選：
  • call / called — 與第三類條件句時態不符。
  • would call — 第二類條件句寫法，與主句 had known 時態不一致。
💡 延伸：第三類條件句也可用 could have / might have + p.p.，表「本來可能/或許」。`, category: '條件句', difficulty: 'advanced' },
  { id: 376, question: 'I will go to the beach ___ it rains.', options: ['if', 'unless', 'because', 'when'], correctIndex: 1, explanation: `🌐 翻譯：除非下雨，否則我會去海邊。
🎯 考點：unless = 除非…否則。題意「不下雨就會去」→ 用 unless。
❌ 為什麼不選：
  • if — 變成「如果下雨就去海邊」，語意荒謬。
  • because — 表原因。
  • when — 表時間「當下雨時就去」，但海邊和下雨不搭。
💡 延伸：unless 比 if not 更精簡正式，會考閱讀常考。`, category: '條件句', difficulty: 'advanced' },
  { id: 377, question: 'What ___ if you saw a ghost?', options: ['will you do', 'would you do', 'do you do', 'did you do'], correctIndex: 1, explanation: `🌐 翻譯：如果你看到鬼，你會怎麼辦？
🎯 考點：第二類條件句（與現在/不可能事實相反）→ if 子句過去式 saw、主句 would + 原形。
❌ 為什麼不選：
  • will you do — 第一類條件句，但 saw 是過去式不搭。
  • do you do — 現在式不符假設語氣。
  • did you do — 過去式不符假設語氣的「主句 would」。
💡 延伸：問句結構 = What + would + 主詞 + V 原形 + if 子句？`, category: '條件句', difficulty: 'advanced' },
  { id: 378, question: 'If he ___ the truth, he wouldn\'t have lied.', options: ['knows', 'knew', 'had known', 'will know'], correctIndex: 2, explanation: `🌐 翻譯：如果他當初知道真相，他就不會說謊（但他不知道，所以說謊了）。
🎯 考點：第三類條件句 → if 子句 had + p.p.（had known），主句 would have + p.p.（wouldn't have lied）。
❌ 為什麼不選：
  • knows — 現在式。
  • knew — 過去式為第二類，與主句 wouldn't have lied 時態不一致。
  • will know — if 子句不可用 will。
💡 延伸：第三類條件句的「結果與事實相反」是會考閱讀理解的高頻考點，要會判斷「實際發生 vs 假設情境」。`, category: '條件句', difficulty: 'advanced' },
  { id: 379, question: 'If I ___ enough money, I would buy that car.', options: ['have', 'has', 'had', 'will have'], correctIndex: 2, explanation: `🌐 翻譯：如果我有足夠的錢，我會買那台車（但我沒錢）。
🎯 考點：第二類條件句（與現在事實相反）→ if 子句過去式 had。
❌ 為什麼不選：
  • have / has — 直述現在式。
  • will have — if 子句不可用 will。
💡 延伸：條件句 if I had ≠ 過去完成式 I had（had + p.p.），這裡 had 是「假設語氣」的過去式。`, category: '條件句', difficulty: 'advanced' },

  // ===== 間接問句 (12) =====
  { id: 380, question: 'I don\'t know where he ___.', options: ['live', 'lives', 'does live', 'is live'], correctIndex: 1, explanation: `🌐 翻譯：我不知道他住哪裡。
🎯 考點：間接問句不是真問句，要用「肯定句語序」(主詞 + 動詞)，不用助動詞 do/does。he 第三人稱單數 → lives。
❌ 為什麼不選：
  • live — 主詞 he 第三人稱單數須加 -s。
  • does live — 間接問句不用助動詞 does，這是會考超高頻錯誤。
  • is live — live 是動詞不能搭 is。
💡 延伸：直接問句 Where does he live? → 間接問句 I don't know where he lives.（語序變化要熟）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 381, question: 'Do you know what time it ___?', options: ['is', 'are', 'does', 'do'], correctIndex: 0, explanation: `🌐 翻譯：你知道現在幾點嗎？
🎯 考點：間接問句用肯定語序 it is（不是 is it）；時間用 it 當主詞。
❌ 為什麼不選：
  • are — 主詞 it 是單數。
  • does / do — be 動詞句不用助動詞。
💡 延伸：直接問句 What time is it? → 間接問句 Do you know what time it is?（is 移到 it 後面）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 382, question: 'Can you tell me where the bank ___?', options: ['is', 'does', 'are', 'do'], correctIndex: 0, explanation: `🌐 翻譯：可以告訴我銀行在哪嗎？
🎯 考點：間接問句肯定語序 the bank is，is 不能放 the bank 前面。
❌ 為什麼不選：
  • does / do — be 動詞句不用助動詞。
  • are — 主詞 the bank 單數。
💡 延伸：禮貌問路萬用句型 = Can / Could you tell me where ... is?（間接問句語序）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 383, question: 'I wonder why she ___ crying.', options: ['is', 'does', 'do', 'are'], correctIndex: 0, explanation: `🌐 翻譯：我想知道她為什麼在哭。
🎯 考點：間接問句肯定語序 she is，搭配現在進行式 V-ing。
❌ 為什麼不選：
  • does / do — 進行式句型用 be + V-ing，不用助動詞 do/does。
  • are — 主詞 she 第三人稱單數。
💡 延伸：I wonder + 間接問句 / I don't know + 間接問句，這兩種是會考間接問句的高頻引導句。`, category: '間接問句', difficulty: 'advanced' },
  { id: 384, question: 'He asked me how old I ___.', options: ['am', 'is', 'was', 'were'], correctIndex: 2, explanation: `🌐 翻譯：他問我幾歲。
🎯 考點：主句是過去式 asked，間接問句要時態一致 → was（主詞 I）。
❌ 為什麼不選：
  • am — 現在式，與主句過去式不一致。
  • is — 用於第三人稱單數。
  • were — 不能搭主詞 I（簡單過去式 I → was）。
💡 延伸：時態一致原則 = 主句過去 → 從句也用過去（即使原問句是現在式）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 385, question: 'Please tell me what you ___ for dinner.', options: ['want', 'wants', 'wanted', 'wanting'], correctIndex: 0, explanation: `🌐 翻譯：請告訴我你晚餐想吃什麼。
🎯 考點：間接問句肯定語序，主詞 you → 原形 want。
❌ 為什麼不選：
  • wants — 主詞 you 不加 -s。
  • wanted — 過去式語境不對。
  • wanting — 進行式須搭 be 動詞。
💡 延伸：禮貌請求句型 = Please / Could you tell me + 間接問句。`, category: '間接問句', difficulty: 'advanced' },
  { id: 386, question: 'I\'m not sure when the meeting ___.', options: ['start', 'starts', 'started', 'starting'], correctIndex: 1, explanation: `🌐 翻譯：我不確定會議什麼時候開始。
🎯 考點：間接問句肯定語序，主詞 the meeting 第三人稱單數 → starts（不用助動詞）。
❌ 為什麼不選：
  • start — 缺 -s。
  • started — 過去式語境不對。
  • starting — 進行式須搭 be 動詞。
💡 延伸：I'm not sure + 間接問句 = 「我不確定...」是會考超高頻句型。`, category: '間接問句', difficulty: 'advanced' },
  { id: 387, question: 'Do you know who ___ the window?', options: ['break', 'broke', 'breaks', 'breaking'], correctIndex: 1, explanation: `🌐 翻譯：你知道誰打破了窗戶嗎？
🎯 考點：who 在間接問句中當主詞時，後面直接接動詞（不需另加主詞）。窗戶已破 → 過去式 broke。
❌ 為什麼不選：
  • break — 缺時態。
  • breaks — 現在式不符「已發生」語境。
  • breaking — 進行式須搭 be 動詞。
💡 延伸：當疑問詞（who / what / which）本身是主詞時，間接問句語序與直接問句相同（不變）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 388, question: 'Could you tell me how I ___ to the station?', options: ['go', 'goes', 'going', 'will go'], correctIndex: 0, explanation: `🌐 翻譯：可以告訴我怎麼去車站嗎？
🎯 考點：間接問句肯定語序，主詞 I → 原形 go。
❌ 為什麼不選：
  • goes — 主詞 I 不加 -s。
  • going — 進行式須搭 be 動詞。
  • will go — 此句問方法/路線，不是未來計畫。
💡 延伸：問路萬用句型 = Could you tell me how to get to ...?（用 how to + V 也可）。`, category: '間接問句', difficulty: 'advanced' },
  { id: 389, question: 'She wants to know if I ___ free tomorrow.', options: ['am', 'is', 'will be', 'were'], correctIndex: 0, explanation: `🌐 翻譯：她想知道我明天有沒有空。
🎯 考點：間接問句也可用 if / whether 引導（表「是否」）。主詞 I + 現在式 → am。
❌ 為什麼不選：
  • is — 用於第三人稱單數。
  • will be — 雖未來語境，但 if 引導的間接問句用現在式表未來。
  • were — 假設語氣或過去式複數，不合本句。
💡 延伸：if 在間接問句 = whether（是否），不是「如果」；不要與條件句的 if 混淆。`, category: '間接問句', difficulty: 'advanced' },

  // ===== 感嘆句 (10) =====
  { id: 390, question: '___ a beautiful day it is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: `🌐 翻譯：今天天氣真好啊！
🎯 考點：感嘆句兩大句型 — What + (a/an) + adj + N + (S + V)！或 How + adj/adv + (S + V)！本題後面接 a + adj + N → 用 What。
❌ 為什麼不選：
  • How — 後面接形容詞或副詞，不是名詞片語。
  • Which / That — 不用於感嘆句。
💡 延伸：對比兩種句型 — What a beautiful day it is! = How beautiful the day is!（兩句同義）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 391, question: '___ fast he runs!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: `🌐 翻譯：他跑得真快啊！
🎯 考點：感嘆句 How + 副詞 + S + V！fast 在此修飾 runs 是副詞。
❌ 為什麼不選：
  • What — 後面必須接名詞（a/an + adj + N）。
  • Which / That — 不用於感嘆句。
💡 延伸：fast 形副同形 — 修飾名詞時是形容詞（a fast car）、修飾動詞時是副詞（runs fast）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 392, question: '___ delicious food!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: `🌐 翻譯：好好吃的食物！
🎯 考點：感嘆句 What + adj + 不可數名詞！food 是不可數名詞，前面不加 a/an。
❌ 為什麼不選：
  • How — 後面要接形容詞或副詞，不能接名詞片語。
  • Which / That — 不用於感嘆句。
💡 延伸：可數單數 → What a + adj + N；可數複數或不可數 → What + adj + N（無 a/an）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 393, question: '___ clever the boy is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: `🌐 翻譯：那男孩真聰明啊！
🎯 考點：感嘆句 How + adj + S + V！clever 是形容詞。
❌ 為什麼不選：
  • What — 後面要接名詞片語（a clever boy）。
  • Which / That — 不用於感嘆句。
💡 延伸：同義改寫 = What a clever boy he is!（兩句意義相同，只是句構不同）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 394, question: '___ nice flowers they are!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: `🌐 翻譯：好漂亮的花啊！
🎯 考點：感嘆句 What + adj + 複數名詞 + S + V！flowers 複數，前面不加 a/an。
❌ 為什麼不選：
  • How — 後面接形容詞或副詞單字。
  • Which / That — 不用於感嘆句。
💡 延伸：複數名詞前不用冠詞 a/an（例 What nice flowers!），單數可數要 a/an（What a nice flower!）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 395, question: '___ hard she works!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: `🌐 翻譯：她工作真努力啊！
🎯 考點：感嘆句 How + 副詞 + S + V！hard 在此修飾 works 是副詞。
❌ 為什麼不選：
  • What — 後面要接名詞片語。
  • Which / That — 不用於感嘆句。
💡 延伸：hard 形副同形 — How hard she works!（副詞）vs What a hard job she has!（形容詞）。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 396, question: '___ an interesting story this is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: `🌐 翻譯：這故事真有趣啊！
🎯 考點：感嘆句 What + a + adj（母音開頭）+ N + S + V！interesting 母音開頭用 an。
❌ 為什麼不選：
  • How — 後面接單字（形容詞或副詞）。
  • Which / That — 不用於感嘆句。
💡 延伸：注意 a/an 的選擇看「形容詞首字母發音」：an interesting / an honest / a useful。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 397, question: '___ smart Jenny is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: `🌐 翻譯：Jenny 真聰明啊！
🎯 考點：感嘆句 How + adj + S + V！smart 是形容詞，搭主詞補語結構用 How。
❌ 為什麼不選：
  • What — 後面要接名詞片語。
  • Which / That — 不用於感嘆句。
💡 延伸：How 句型可改 What — How smart Jenny is! = What a smart girl Jenny is!`, category: '感嘆句', difficulty: 'advanced' },
  { id: 398, question: '___ kind people they are!', options: ['How', 'What', 'Which', 'That'], correctIndex: 1, explanation: `🌐 翻譯：他們真是善良的人們啊！
🎯 考點：感嘆句 What + adj + 複數名詞 + S + V！people 複數，無 a/an。
❌ 為什麼不選：
  • How — 後面接形容詞或副詞單字。
  • Which / That — 不用於感嘆句。
💡 延伸：people 雖看似單字，但永遠是複數名詞，動詞要用 are/were。`, category: '感嘆句', difficulty: 'advanced' },
  { id: 399, question: '___ beautiful the sunset is!', options: ['How', 'What', 'Which', 'That'], correctIndex: 0, explanation: `🌐 翻譯：夕陽真美啊！
🎯 考點：感嘆句 How + adj + S + V！beautiful 是形容詞。
❌ 為什麼不選：
  • What — 後面要接名詞片語（a beautiful sunset）。
  • Which / That — 不用於感嘆句。
💡 延伸：感嘆句 How 與 What 互換 — How beautiful the sunset is! = What a beautiful sunset it is!`, category: '感嘆句', difficulty: 'advanced' },

  // ===== 使役動詞 (20) =====
  { id: 400, question: 'Mom made me ___ my room.', options: ['clean', 'to clean', 'cleaning', 'cleaned'], correctIndex: 0, explanation: `🌐 翻譯：媽媽叫我整理房間。
🎯 考點：使役動詞 make / let / have + 受詞 + 原形動詞（不加 to）。
❌ 為什麼不選：
  • to clean — make 不接不定詞。
  • cleaning — 進行式不對。
  • cleaned — p.p.，但人是「主動」整理，不是被整理。
💡 延伸：使役動詞口訣 = make / let / have + 人 + V 原形；get + 人 + to V。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 401, question: 'The teacher let us ___ early.', options: ['leave', 'to leave', 'leaving', 'left'], correctIndex: 0, explanation: `🌐 翻譯：老師讓我們提早離開。
🎯 考點：let + 受詞 + 原形動詞（不加 to）。
❌ 為什麼不選：
  • to leave — let 不接不定詞。
  • leaving — 進行式不對。
  • left — 過去式不能直接接在 let 後。
💡 延伸：let = allow（讓/允許），但 allow + 人 + to V（有 to）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 402, question: 'I had my hair ___.', options: ['cut', 'to cut', 'cutting', 'cuts'], correctIndex: 0, explanation: `🌐 翻譯：我去剪頭髮了（請人剪）。
🎯 考點：have + 物 + p.p. = 「請人做某事」。cut 的三態同形 = cut / cut / cut，所以這裡的 cut 是 p.p.。
❌ 為什麼不選：
  • to cut — have 在使役用法不接不定詞。
  • cutting — 進行式不對。
  • cuts — 現在式單數動詞。
💡 延伸：have + 物 + p.p.（被動）vs have + 人 + V 原形（主動），同一個 have 用法不同：have my car washed（請人洗）vs have him wash it（叫他洗）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 403, question: 'She got her brother ___ the dishes.', options: ['wash', 'to wash', 'washing', 'washed'], correctIndex: 1, explanation: `🌐 翻譯：她叫她弟弟洗碗。
🎯 考點：get + 人 + to V（注意是「to + 原形」，與 make/let/have 不同）。
❌ 為什麼不選：
  • wash — get 後接人時用 to V，不接原形。
  • washing — 進行式不對。
  • washed — p.p.，但她弟弟是主動洗。
💡 延伸：使役動詞特別注意 get 與其他不同 — 其他三個（make/let/have）+ 原形；get + to V。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 404, question: 'Don\'t make the baby ___.', options: ['cry', 'to cry', 'crying', 'cried'], correctIndex: 0, explanation: `🌐 翻譯：別把寶寶弄哭。
🎯 考點：make + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to cry — make 不接不定詞。
  • crying — 進行式不對。
  • cried — 過去式不對。
💡 延伸：make sb cry / make sb laugh / make sb feel ... 都是常見「使…」結構。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 405, question: 'He had his car ___.', options: ['repair', 'to repair', 'repairing', 'repaired'], correctIndex: 3, explanation: `🌐 翻譯：他把車送去修了（請人修）。
🎯 考點：have + 物 + p.p. = 「請人做某事」。車是被修的，用 p.p.。
❌ 為什麼不選：
  • repair — 原形表車自己修，語意不通。
  • to repair — 此句型不接不定詞。
  • repairing — 進行式不對。
💡 延伸：類似句型 = have / get + 物 + p.p.（請人做某事）→ have my hair cut / have my room cleaned。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 406, question: 'She let the children ___ in the garden.', options: ['play', 'to play', 'playing', 'played'], correctIndex: 0, explanation: `🌐 翻譯：她讓孩子們在花園裡玩。
🎯 考點：let + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to play — let 不接不定詞。
  • playing — 進行式不對。
  • played — 過去式不能接 let 後。
💡 延伸：let's = let us，後面也是接原形動詞（let's go / let's eat）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 407, question: 'I\'ll get someone ___ the window.', options: ['fix', 'to fix', 'fixing', 'fixed'], correctIndex: 1, explanation: `🌐 翻譯：我會找人來修這扇窗戶。
🎯 考點：get + 人 + to V（注意 to）。
❌ 為什麼不選：
  • fix — get + 人不接原形（只有 make/let/have 接原形）。
  • fixing — 進行式不對。
  • fixed — get + 物 + p.p. 用法才用 fixed（get the window fixed）。
💡 延伸：get + 人 + to V vs get + 物 + p.p.，兩種用法都常見，重點看「事物 vs 人」。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 408, question: 'The funny show made everyone ___.', options: ['laugh', 'to laugh', 'laughing', 'laughed'], correctIndex: 0, explanation: `🌐 翻譯：搞笑表演讓大家笑了。
🎯 考點：make + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to laugh — make 不接不定詞。
  • laughing — 進行式不對。
  • laughed — 過去式不能接 made 後。
💡 延伸：常用句型 = make sb laugh / cry / smile / happy / sad（後面接原形或形容詞）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 409, question: 'I want to have my photo ___ here.', options: ['take', 'to take', 'taken', 'taking'], correctIndex: 2, explanation: `🌐 翻譯：我想要在這裡拍一張照片（請人拍）。
🎯 考點：have + 物 + p.p.（請人做某事）。照片是被拍的，用 p.p. taken。
❌ 為什麼不選：
  • take — 原形，但照片是被拍，不能用主動。
  • to take — 此句型不接不定詞。
  • taking — 進行式不對。
💡 延伸：take a photo 是「拍照」，被動 → have a photo taken（請人拍）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 410, question: 'Please let me ___.', options: ['know', 'to know', 'knew', 'knowing'], correctIndex: 0, explanation: `🌐 翻譯：請讓我知道。
🎯 考點：let + 受詞 + 原形動詞。Let me know 是固定禮貌用語。
❌ 為什麼不選：
  • to know — let 不接不定詞。
  • knew — 過去式不對。
  • knowing — 進行式不對。
💡 延伸：常見口語 = Let me know（讓我知道）/ Let me see（讓我想想）/ Let me try（讓我試試）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 411, question: 'My boss had me ___ overtime yesterday.', options: ['work', 'to work', 'worked', 'working'], correctIndex: 0, explanation: `🌐 翻譯：我老闆昨天叫我加班。
🎯 考點：have + 人 + 原形動詞（使役用法）。
❌ 為什麼不選：
  • to work — have 在使役不接不定詞。
  • worked — 過去式不對。
  • working — 進行式不對。
💡 延伸：have + 人 + V 原形（指派任務）vs have + 物 + p.p.（請人做某事），同 have 不同用法。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 412, question: 'I got my computer ___ yesterday.', options: ['repair', 'to repair', 'repairing', 'repaired'], correctIndex: 3, explanation: `🌐 翻譯：我昨天把電腦送修了（請人修）。
🎯 考點：get + 物 + p.p. = 「請人做某事」。電腦是被修，用 p.p.。
❌ 為什麼不選：
  • repair — 電腦不會自己修。
  • to repair — get + 物的句型不用不定詞。
  • repairing — 進行式不對。
💡 延伸：have / get + 物 + p.p. 兩者意思幾乎一樣（請人做某事），只是 get 較口語。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 413, question: 'Don\'t let him ___ you down.', options: ['put', 'to put', 'putting', 'puts'], correctIndex: 0, explanation: `🌐 翻譯：別讓他讓你失望（別讓他打擊你的信心）。
🎯 考點：let + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to put — let 不接不定詞。
  • putting — 進行式不對。
  • puts — 現在式單數不能接 let 後。
💡 延伸：put sb down 是「貶低/打擊某人」的常用片語；let sb down 是「讓某人失望」。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 414, question: 'Mom got me ___ the dishes after dinner.', options: ['wash', 'to wash', 'washing', 'washed'], correctIndex: 1, explanation: `🌐 翻譯：媽媽叫我晚餐後洗碗。
🎯 考點：get + 人 + to V（與 make/let/have 不同，要加 to）。
❌ 為什麼不選：
  • wash — get + 人 不接原形。
  • washing — 進行式不對。
  • washed — p.p.，但我是主動洗碗。
💡 延伸：四大使役動詞口訣 — make/let/have + V 原形、get + to V。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 415, question: 'The teacher had us ___ a speech.', options: ['give', 'to give', 'giving', 'gave'], correctIndex: 0, explanation: `🌐 翻譯：老師叫我們發表演講。
🎯 考點：have + 人 + 原形動詞。
❌ 為什麼不選：
  • to give — have 使役不接不定詞。
  • giving — 進行式不對。
  • gave — 過去式不能接在 had 後。
💡 延伸：give a speech / make a speech / deliver a speech，三種都是「演講」。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 416, question: 'You should have your eyes ___.', options: ['check', 'to check', 'checking', 'checked'], correctIndex: 3, explanation: `🌐 翻譯：你應該去檢查視力（請人檢查）。
🎯 考點：have + 物（身體部位）+ p.p.（請人做某事）。眼睛是被檢查，用 p.p.。
❌ 為什麼不選：
  • check / to check / checking — 眼睛不會自己檢查。
💡 延伸：常見「身體 + 被處理」= have your hair cut / have your teeth checked / have your eyes examined。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 417, question: 'She made him ___ for his rude behavior.', options: ['apologize', 'to apologize', 'apologized', 'apologizing'], correctIndex: 0, explanation: `🌐 翻譯：她讓他為粗魯的行為道歉。
🎯 考點：make + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to apologize — make 不接不定詞。
  • apologized — 過去式不能接 made 後。
  • apologizing — 進行式不對。
💡 延伸：apologize for + N / V-ing = 為某事道歉（apologize for being late）。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 418, question: 'I helped my friend ___ his bike.', options: ['fix', 'to fix', 'fixing', 'fixed'], correctIndex: 0, explanation: `🌐 翻譯：我幫朋友修腳踏車。
🎯 考點：help + 受詞 + V 原形 或 + to V 都可（兩者通用），但現代英語更常用原形。
❌ 為什麼不選：
  • to fix — 雖文法可，但會考標準寫法用原形 fix。
  • fixing — 進行式不對。
  • fixed — 過去式不能接 helped 後。
💡 延伸：help 是「半使役動詞」，後面接原形或 to V 都對，但教科書傾向原形。`, category: '使役動詞', difficulty: 'advanced' },
  { id: 419, question: 'Let me ___ you a question.', options: ['ask', 'to ask', 'asking', 'asked'], correctIndex: 0, explanation: `🌐 翻譯：讓我問你一個問題。
🎯 考點：let + 受詞 + 原形動詞。
❌ 為什麼不選：
  • to ask — let 不接不定詞。
  • asking — 進行式不對。
  • asked — 過去式不對。
💡 延伸：常見口語句型 = Let me ask / Let me check / Let me think / Let me see。`, category: '使役動詞', difficulty: 'advanced' },

  // ===== 連接詞進階 (20) =====
  { id: 420, question: 'I was late ___ I missed the bus.', options: ['because', 'although', 'so', 'but'], correctIndex: 0, explanation: `🌐 翻譯：我遲到是因為錯過了公車。
🎯 考點：表「原因」用 because（後接子句）；遲到的原因是錯過公車。
❌ 為什麼不選：
  • although — 表「雖然」，語意不通（雖然錯過還是遲到？意思矛盾）。
  • so — 表「所以」，但邏輯反了（錯過 → 所以遲到，但此句先說遲到後說原因）。
  • but — 表「但是」，語意不通。
💡 延伸：because（連接詞 + 子句）vs because of（介系詞 + 名詞片語）— I was late because of the rain.`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 421, question: '___ it was raining, we went out.', options: ['Because', 'Although', 'So', 'Unless'], correctIndex: 1, explanation: `🌐 翻譯：雖然下雨，我們還是出去了。
🎯 考點：表「雖然…但是…」用 Although（前後語意「相反/讓步」）。
❌ 為什麼不選：
  • Because — 變成「因為下雨，我們出去」，語意不通（下雨通常不想出去）。
  • So — 表「所以」，邏輯反了。
  • Unless — 表「除非」，語意不通。
💡 延伸：Although = Though = Even though = While（讓步連接詞家族）；但 Although ..., but ... 是錯誤句構（中式英語常見錯誤）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 422, question: 'I\'ll wait ___ you come back.', options: ['after', 'until', 'before', 'unless'], correctIndex: 1, explanation: `🌐 翻譯：我會等到你回來。
🎯 考點：表「直到…為止」用 until（也寫 till）。
❌ 為什麼不選：
  • after — 「在…之後」，語意不通（我會在你回來後等？）。
  • before — 「在…之前」，語意不通。
  • unless — 「除非」，語意不通。
💡 延伸：表時間的連接詞 = before / after / when / while / since / until / as soon as。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 423, question: 'She left ___ I arrived.', options: ['after', 'before', 'until', 'unless'], correctIndex: 1, explanation: `🌐 翻譯：她在我到達之前就離開了。
🎯 考點：表「在…之前」用 before；她先離開，我後到。
❌ 為什麼不選：
  • after — 「在…之後」，變成她在我到達後才離開，與題意「她已先走」相反。
  • until — 「直到…為止」，語意不通。
  • unless — 「除非」，語意不通。
💡 延伸：時序連接詞 — before（先後）/ after（後先）/ when（同時點）/ while（同時段）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 424, question: '___ you study hard, you won\'t pass.', options: ['If', 'Unless', 'Although', 'Because'], correctIndex: 1, explanation: `🌐 翻譯：除非你努力讀書，否則你不會通過。
🎯 考點：unless = if not（除非…否則…），本身含否定，主句保持原狀。題意「不讀 → 不過」。
❌ 為什麼不選：
  • If — 變成「如果你努力讀書，你就不會通過」，語意荒謬。
  • Although — 「雖然」語意不通。
  • Because — 「因為」語意不通。
💡 延伸：Unless you study hard = If you don't study hard（同義改寫）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 425, question: 'He is not only smart ___ also hardworking.', options: ['and', 'but', 'or', 'so'], correctIndex: 1, explanation: `🌐 翻譯：他不只聰明，而且勤奮。
🎯 考點：not only ... but also ... = 「不但…而且…」固定相關連接詞，必須兩兩配對使用。
❌ 為什麼不選：
  • and / or / so — 都不能與 not only 配對。
💡 延伸：相關連接詞（correlative conjunctions）家族 = both...and / either...or / neither...nor / not only...but also。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 426, question: 'Take an umbrella ___ it rains.', options: ['so that', 'in case', 'unless', 'although'], correctIndex: 1, explanation: `🌐 翻譯：帶把傘以防下雨。
🎯 考點：in case = 「以防…」表「預防/萬一」。
❌ 為什麼不選：
  • so that — 「為了…」，表目的。
  • unless — 「除非」，語意不通。
  • although — 「雖然」，語意不通。
💡 延伸：in case + 子句（in case it rains）/ in case of + 名詞（in case of fire）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 427, question: 'I turned off the TV ___ I could study.', options: ['so that', 'in case', 'unless', 'although'], correctIndex: 0, explanation: `🌐 翻譯：我關掉電視以便能讀書。
🎯 考點：so that + 主詞 + can/could + V = 「為了能…」表目的。
❌ 為什麼不選：
  • in case — 「以防」，表預防而非目的。
  • unless — 「除非」，語意不通。
  • although — 「雖然」，語意不通。
💡 延伸：so that = in order that（同義）；簡化句型 = in order to + V / so as to + V（不接主詞）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 428, question: '___ she is young, she is very wise.', options: ['Because', 'Although', 'Unless', 'Until'], correctIndex: 1, explanation: `🌐 翻譯：雖然她年輕，但她很有智慧。
🎯 考點：「年輕」與「有智慧」是相反/讓步關係 → 用 Although。
❌ 為什麼不選：
  • Because — 表原因不合（不能說因為年輕就有智慧）。
  • Unless — 「除非」語意不通。
  • Until — 「直到」語意不通。
💡 延伸：Although + 子句 = Despite / In spite of + 名詞片語（Despite her age, she is wise.）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 429, question: 'He studied hard ___ he could pass the exam.', options: ['so that', 'although', 'unless', 'before'], correctIndex: 0, explanation: `🌐 翻譯：他努力讀書以便能通過考試。
🎯 考點：so that + 主詞 + can/could + V = 「為了能…」表目的。
❌ 為什麼不選：
  • although — 「雖然」，語意不通。
  • unless — 「除非」，語意不通。
  • before — 「在…之前」，語意不通。
💡 延伸：so that 強調「目的」；so ... that ... 強調「結果」（不要混淆）— He studied so hard that he passed.（如此…以致於…）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 430, question: '___ I was tired, I kept working.', options: ['Because', 'Although', 'So', 'Until'], correctIndex: 1, explanation: `🌐 翻譯：雖然我很累，我還是繼續工作。
🎯 考點：「累」與「繼續工作」是相反關係 → Although（讓步）。
❌ 為什麼不選：
  • Because — 變成「因為累所以工作」，語意荒謬。
  • So — 「所以」邏輯反了。
  • Until — 「直到」語意不通。
💡 延伸：Although 與 but 不可並用 — Although I was tired, but I kept working. ✗（中式英語常見錯誤）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 431, question: 'You can choose ___ tea ___ coffee.', options: ['both / and', 'either / or', 'neither / nor', 'not only / but also'], correctIndex: 1, explanation: `🌐 翻譯：你可以選擇茶或咖啡。
🎯 考點：either A or B = 「A 或 B 二選一」相關連接詞。
❌ 為什麼不選：
  • both / and — 「兩者都」，但題意是二選一。
  • neither / nor — 「兩者都不」，語意相反。
  • not only / but also — 「不但…而且…」，語意不對。
💡 延伸：四大相關連接詞語意對比 — both A and B（兩者都）/ either A or B（二選一）/ neither A nor B（兩者都不）/ not only A but also B（不但…還）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 432, question: 'I haven\'t seen him ___ he moved to Taipei.', options: ['for', 'since', 'until', 'before'], correctIndex: 1, explanation: `🌐 翻譯：自從他搬到台北後，我就沒再見過他。
🎯 考點：since + 過去時間點/事件，搭配完成式表「自從…以來持續到現在」。
❌ 為什麼不選：
  • for — 後接「時段」（for 3 years），不接事件子句。
  • until — 「直到」語意不通。
  • before — 「之前」語意不通。
💡 延伸：完成式時間連接詞 = since（時間起點）/ for（時段長度）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 433, question: 'I will call you ___ I get home.', options: ['as soon as', 'although', 'unless', 'while'], correctIndex: 0, explanation: `🌐 翻譯：我一到家就會打給你。
🎯 考點：as soon as = 「一…就…」表立即接續發生的兩個動作。
❌ 為什麼不選：
  • although — 「雖然」語意不通。
  • unless — 「除非」語意不通。
  • while — 「當…時」可勉強用，但 as soon as 強調「立即性」更精準。
💡 延伸：as soon as 子句通常用現在式表未來（與 if / when 規則相同）— ✓ get；✗ will get。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 434, question: '___ Tom ___ Mary likes math; they both prefer English.', options: ['Both / and', 'Either / or', 'Neither / nor', 'Not only / but also'], correctIndex: 2, explanation: `🌐 翻譯：Tom 和 Mary 都不喜歡數學；他們都比較喜歡英文。
🎯 考點：neither A nor B = 「A 和 B 都不」相關連接詞。
❌ 為什麼不選：
  • Both / and — 「兩者都」，但後句 prefer English 暗示他們都不喜歡數學。
  • Either / or — 「二選一」語意不通。
  • Not only / but also — 「不但…還」語意不通。
💡 延伸：neither / nor 後動詞依「最靠近的主詞」決定 — Neither Tom nor Mary likes（依 Mary 單數用 likes）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 435, question: 'It was so dark ___ I couldn\'t see anything.', options: ['that', 'because', 'although', 'so'], correctIndex: 0, explanation: `🌐 翻譯：天太暗了，以至於我什麼都看不見。
🎯 考點：so + adj/adv + that = 「如此…以致於…」固定句型表結果。
❌ 為什麼不選：
  • because — 表原因，但 so 已暗示結果，不是原因。
  • although — 「雖然」語意不通。
  • so — 與前面的 so 重複，文法錯。
💡 延伸：so ... that vs such ... that — so + adj/adv + that；such + (a) + adj + N + that（兩個都表「如此…以致於…」）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 436, question: '___ the rain, we still played soccer.', options: ['Although', 'Because of', 'Despite', 'In case of'], correctIndex: 2, explanation: `🌐 翻譯：儘管下雨，我們還是踢了足球。
🎯 考點：Despite + 名詞（不接子句）= 儘管…，是表讓步的介系詞片語。
❌ 為什麼不選：
  • Although — 是連接詞，後面要接子句（Although it rained），不能接名詞 the rain。
  • Because of — 表原因。
  • In case of — 表預防「萬一」。
💡 延伸：Despite = In spite of（後接名詞）；Although = Even though（後接子句），會考易混淆。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 437, question: 'He didn\'t come ___ he was sick.', options: ['because', 'although', 'so', 'but'], correctIndex: 0, explanation: `🌐 翻譯：他沒來是因為他生病了。
🎯 考點：表「原因」用 because。
❌ 為什麼不選：
  • although — 「雖然他生病了，他沒來」，邏輯反了（雖然該對比，但他依然該來）。
  • so — 邏輯反了。
  • but — 「但是」語意不通。
💡 延伸：問原因常用「Why ...?」回答用「Because ...」（不能只用 Because of 因為它後面要接名詞）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 438, question: '___ rich ___ poor, everyone deserves respect.', options: ['Both / and', 'Either / or', 'Neither / nor', 'Whether / or'], correctIndex: 3, explanation: `🌐 翻譯：無論貧富，每個人都應受尊重。
🎯 考點：whether A or B = 「無論 A 還是 B」相關連接詞，表「兩種可能性都包含」。
❌ 為什麼不選：
  • Both / and — 變成「富有與貧窮兩者都」，語意不對。
  • Either / or — 「二選一」語意不通。
  • Neither / nor — 「兩者都不」語意相反。
💡 延伸：whether or not = no matter if / whether（無論是否…）。`, category: '連接詞進階', difficulty: 'advanced' },
  { id: 439, question: 'I went to bed early ___ I was tired.', options: ['because', 'although', 'so that', 'unless'], correctIndex: 0, explanation: `🌐 翻譯：我早睡是因為我累了。
🎯 考點：表「原因」用 because。早睡的原因是累。
❌ 為什麼不選：
  • although — 「雖然累，我早睡」邏輯反了（累該早睡才合理）。
  • so that — 「為了能…」，後面要接 can/could。
  • unless — 「除非」語意不通。
💡 延伸：because（連接詞）vs so（連接詞，表「所以」），兩者顛倒前後句 — I was tired, so I went to bed early. = I went to bed early because I was tired.（同義改寫）。`, category: '連接詞進階', difficulty: 'advanced' },
];
