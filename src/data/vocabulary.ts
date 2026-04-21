export interface VocabWord {
  id: number;
  english: string;
  chinese: string;
  partOfSpeech: string;
  example: string;
}

export const vocabulary: VocabWord[] = [
  { id: 1, english: "Resilient", chinese: "有彈性的；堅韌的", partOfSpeech: "adj.", example: "She is resilient in the face of adversity." },
  { id: 2, english: "Eloquent", chinese: "雄辯的；有口才的", partOfSpeech: "adj.", example: "He gave an eloquent speech at the ceremony." },
  { id: 3, english: "Meticulous", chinese: "一絲不苟的", partOfSpeech: "adj.", example: "She is meticulous about her work." },
  { id: 4, english: "Ubiquitous", chinese: "無處不在的", partOfSpeech: "adj.", example: "Smartphones have become ubiquitous in modern life." },
  { id: 5, english: "Pragmatic", chinese: "務實的", partOfSpeech: "adj.", example: "We need a pragmatic approach to this problem." },
  { id: 6, english: "Ephemeral", chinese: "短暫的", partOfSpeech: "adj.", example: "Fame is often ephemeral." },
  { id: 7, english: "Diligent", chinese: "勤奮的", partOfSpeech: "adj.", example: "A diligent student always finishes homework on time." },
  { id: 8, english: "Ambiguous", chinese: "模稜兩可的", partOfSpeech: "adj.", example: "The instructions were ambiguous and confusing." },
  { id: 9, english: "Contemplate", chinese: "沉思；深思", partOfSpeech: "v.", example: "She sat by the window to contemplate her future." },
  { id: 10, english: "Inevitable", chinese: "不可避免的", partOfSpeech: "adj.", example: "Change is inevitable in every organization." },
  { id: 11, english: "Persevere", chinese: "堅持不懈", partOfSpeech: "v.", example: "You must persevere to achieve your goals." },
  { id: 12, english: "Altruistic", chinese: "利他的；無私的", partOfSpeech: "adj.", example: "Her altruistic nature led her to volunteer regularly." },
  { id: 13, english: "Candid", chinese: "坦率的；直言的", partOfSpeech: "adj.", example: "I appreciate your candid feedback." },
  { id: 14, english: "Vivid", chinese: "生動的；鮮明的", partOfSpeech: "adj.", example: "She has a vivid imagination." },
  { id: 15, english: "Tenacious", chinese: "頑強的；堅持的", partOfSpeech: "adj.", example: "The tenacious reporter uncovered the truth." },
];
