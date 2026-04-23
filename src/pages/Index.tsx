import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Heart, XCircle, Loader2, Gamepad2, Target, Flame, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { speak as speakUtil, fetchGeminiJSON, PET_TYPES, getLevel, preloadVoices, trackWrongWord, getWrongWordCount } from "@/lib/game-utils";
import { useAuth } from "@/hooks/useAuth";
import { useCloudData } from "@/hooks/useCloudData";

// Components
import HomeScreen from "@/components/game/HomeScreen";
import GameHeader from "@/components/game/GameHeader";
import StudyCard from "@/components/game/StudyCard";
import AudioQuiz from "@/components/game/AudioQuiz";
import MemoryGame from "@/components/game/MemoryGame";
import PetBag from "@/components/game/PetBag";
import TextQuiz from "@/components/game/TextQuiz";
import AdminPanel from "@/components/game/AdminPanel";
import ConsultantButton from "@/components/game/ConsultantButton";
import PageTransition from "@/components/game/PageTransition";
import XpBar from "@/components/game/XpBar";
import Dashboard from "@/components/game/Dashboard";
import AchievementBadges from "@/components/game/AchievementBadges";
import DailyMissions from "@/components/game/DailyMissions";
import TimedChallenge from "@/components/game/TimedChallenge";
import BossBattle from "@/components/game/BossBattle";
import GachaSystem from "@/components/game/GachaSystem";
import ClozeTest from "@/components/game/ClozeTest";
import ToddlerSpelling from "@/components/game/ToddlerSpelling";
import DragMatchGame from "@/components/game/DragMatchGame";
import WrongWordsReview from "@/components/game/WrongWordsReview";
import StarShop from "@/components/game/StarShop";
import Farm from "@/components/game/Farm";
import PetDex from "@/components/game/PetDex";
import FavoritePet from "@/components/game/FavoritePet";
import { SHOP_ITEMS, type ShopItem } from "@/lib/shop-items";
import ThemeBackground from "@/components/game/ThemeBackground";
import SentenceBuilder from "@/components/game/SentenceBuilder";
import GrammarQuiz from "@/components/game/GrammarQuiz";
import ReadingComprehension from "@/components/game/ReadingComprehension";
import { CorrectBurst, ComboDisplay, HatchCelebration, LevelUpCelebration } from "@/components/game/ConfettiEffect";
import { ACHIEVEMENT_DEFINITIONS, type AchievementContext } from "@/lib/achievements";
import { GACHA_COST, DUPE_STAR_REWARD, getFeedCost, getStage, type Pet, type PetRarity } from "@/lib/pet-system";
import { updateMissionProgress } from "@/lib/daily-missions";

// === 字庫從外部檔案匯入 (含內建例句) ===
import { rawToddlerData } from "@/data/toddler-vocabulary";
import { rawClassicData } from "@/data/classic-vocabulary";


const basicEmojiMap: Record<string, string> = {
  apple: "🍎",
  banana: "🍌",
  orange: "🍊",
  grape: "🍇",
  strawberry: "🍓",
  watermelon: "🍉",
  peach: "🍑",
  pear: "🍐",
  lemon: "🍋",
  mango: "🥭",
  pineapple: "🍍",
  cherry: "🍒",
  tomato: "🍅",
  potato: "🥔",
  carrot: "🥕",
  corn: "🌽",
  pumpkin: "🎃",
  onion: "🧅",
  water: "💧",
  milk: "🥛",
  juice: "🧃",
  tea: "🍵",
  coffee: "☕",
  bread: "🍞",
  egg: "🥚",
  cake: "🎂",
  cookie: "🍪",
  candy: "🍬",
  chocolate: "🍫",
  ice: "🧊",
  cheese: "🧀",
  pizza: "🍕",
  hamburger: "🍔",
  hotdog: "🌭",
  soup: "🍲",
  rice: "🍚",
  meat: "🥩",
  cat: "🐱",
  dog: "🐶",
  elephant: "🐘",
  bird: "🐦",
  fish: "🐟",
  pig: "🐷",
  cow: "🐮",
  horse: "🐴",
  monkey: "🐵",
  tiger: "🐯",
  lion: "🦁",
  bear: "🐻",
  mouse: "🐭",
  rabbit: "🐰",
  duck: "🦆",
  sheep: "🐑",
  goat: "🐐",
  chicken: "🐔",
  frog: "🐸",
  snake: "🐍",
  spider: "🕷️",
  turtle: "🐢",
  ant: "🐜",
  bee: "🐝",
  butterfly: "🦋",
  bug: "🐛",
  crab: "🦀",
  dolphin: "🐬",
  whale: "🐳",
  shark: "🦈",
  penguin: "🐧",
  kangaroo: "🦘",
  zebra: "🦓",
  giraffe: "🦒",
  hippo: "🦛",
  panda: "🐼",
  crocodile: "🐊",
  wolf: "🐺",
  fox: "🦊",
  deer: "🦌",
  red: "🔴",
  blue: "🔵",
  green: "🟢",
  yellow: "🟡",
  black: "⚫",
  white: "⚪",
  pink: "🩷",
  purple: "🟣",
  brown: "🟤",
  gray: "⬜",
  silver: "🪩",
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
  eight: "8️⃣",
  nine: "9️⃣",
  ten: "🔟",
  eleven: "1️⃣1️⃣",
  twelve: "1️⃣2️⃣",
  thirteen: "1️⃣3️⃣",
  fourteen: "1️⃣4️⃣",
  fifteen: "1️⃣5️⃣",
  sixteen: "1️⃣6️⃣",
  seventeen: "1️⃣7️⃣",
  eighteen: "1️⃣8️⃣",
  nineteen: "1️⃣9️⃣",
  twenty: "2️⃣0️⃣",
  head: "👤",
  eye: "👁️",
  ear: "👂",
  nose: "👃",
  mouth: "👄",
  face: "😊",
  hair: "💇",
  hand: "✋",
  arm: "💪",
  leg: "🦵",
  foot: "🦶",
  toe: "🦶",
  finger: "☝️",
  neck: "🧣",
  shoulder: "💪",
  father: "👨",
  mother: "👩",
  brother: "👦",
  sister: "👧",
  grandpa: "👴",
  grandma: "👵",
  uncle: "👨‍🦱",
  aunt: "👩‍🦱",
  cousin: "🧒",
  baby: "👶",
  boy: "👦",
  girl: "👧",
  sun: "☀️",
  moon: "🌙",
  star: "⭐",
  sky: "🌤️",
  cloud: "☁️",
  rain: "🌧️",
  snow: "❄️",
  wind: "💨",
  tree: "🌳",
  flower: "🌸",
  grass: "🌿",
  leaf: "🍃",
  rock: "🪨",
  mountain: "⛰️",
  river: "🏞️",
  sea: "🌊",
  beach: "🏖️",
  island: "🏝️",
  earth: "🌍",
  world: "🌎",
  shirt: "👕",
  pants: "👖",
  shorts: "🩳",
  skirt: "👗",
  dress: "👗",
  jacket: "🧥",
  coat: "🧥",
  sweater: "🧶",
  hat: "🎩",
  cap: "🧢",
  shoe: "👟",
  sock: "🧦",
  glove: "🧤",
  ring: "💍",
  ball: "⚽",
  balloon: "🎈",
  doll: "🪆",
  kite: "🪁",
  robot: "🤖",
  block: "🧱",
  toy: "🧸",
  book: "📖",
  pen: "🖊️",
  pencil: "✏️",
  bag: "🎒",
  box: "📦",
  clock: "🕐",
  watch: "⌚",
  phone: "📱",
  computer: "💻",
  tv: "📺",
  camera: "📷",
  picture: "🖼️",
  key: "🔑",
  lock: "🔒",
  map: "🗺️",
  coin: "🪙",
  money: "💰",
  stamp: "📮",
  ticket: "🎫",
  paper: "📄",
  house: "🏠",
  room: "🚪",
  bedroom: "🛏️",
  bathroom: "🛁",
  kitchen: "🍳",
  door: "🚪",
  window: "🪟",
  wall: "🧱",
  floor: "🏠",
  roof: "🏠",
  table: "🪵",
  desk: "📝",
  chair: "💺",
  sofa: "🛋️",
  bed: "🛏️",
  lamp: "💡",
  mirror: "🪞",
  cup: "☕",
  bowl: "🥣",
  fork: "🍴",
  spoon: "🥄",
  knife: "🔪",
  car: "🚗",
  bus: "🚌",
  train: "🚆",
  bike: "🚲",
  boat: "⛵",
  ship: "🚢",
  plane: "✈️",
  taxi: "🚕",
  truck: "🚛",
  helicopter: "🚁",
  rocket: "🚀",
  run: "🏃",
  walk: "🚶",
  jump: "🤸",
  fly: "🦅",
  swim: "🏊",
  sleep: "😴",
  eat: "🍽️",
  drink: "🥤",
  read: "📖",
  write: "✍️",
  draw: "🎨",
  sing: "🎤",
  dance: "💃",
  play: "🎮",
  work: "💼",
  help: "🤝",
  stop: "🛑",
  go: "🏃",
  come: "👋",
  look: "👀",
  see: "👁️",
  hear: "👂",
  listen: "🎧",
  speak: "🗣️",
  talk: "💬",
  say: "💭",
  ask: "❓",
  answer: "💡",
  open: "📂",
  close: "📁",
  push: "👐",
  pull: "🤏",
  catch: "🤲",
  throw: "🤾",
  wash: "🧼",
  clean: "🧹",
  smile: "😊",
  laugh: "😂",
  cry: "😢",
  stand: "🧍",
  sit: "💺",
  big: "🐘",
  small: "🐜",
  tall: "🦒",
  short: "🐁",
  long: "📏",
  fat: "🐷",
  thin: "🦴",
  hot: "🔥",
  cold: "🥶",
  warm: "☀️",
  cool: "😎",
  good: "👍",
  bad: "👎",
  happy: "😊",
  sad: "😢",
  angry: "😠",
  tired: "😩",
  hungry: "🤤",
  full: "😋",
  thirsty: "🥤",
  fast: "⚡",
  slow: "🐌",
  new: "✨",
  old: "🏚️",
  dirty: "🗑️",
  quiet: "🤫",
  loud: "📢",
  hard: "💎",
  soft: "☁️",
  easy: "✅",
  rainbow: "🌈",
  umbrella: "☂️",
  basket: "🧺",
  garden: "🌻",
  gate: "🚧",
  fence: "🏡",
  bridge: "🌉",
  pond: "🪷",
  nest: "🪺",
  seed: "🌱",
  rose: "🌹",
  mushroom: "🍄",
  acorn: "🌰",
  snail: "🐌",
  owl: "🦉",
  parrot: "🦜",
  swan: "🦢",
  eagle: "🦅",
  squirrel: "🐿️",
  bat: "🦇",
  worm: "🪱",
  starfish: "⭐",
  octopus: "🐙",
  seal: "🦭",
  camel: "🐫",
  gorilla: "🦍",
  peacock: "🦚",
  flamingo: "🦩",
  hedgehog: "🦔",
  noodle: "🍜",
  butter: "🧈",
  jam: "🍓",
  pie: "🥧",
  salad: "🥗",
  toast: "🍞",
  honey: "🍯",
  sugar: "🍬",
  salt: "🧂",
  pepper: "🌶️",
  sauce: "🥫",
  broom: "🧹",
  towel: "🧻",
  soap: "🧼",
  brush: "🪥",
  tooth: "🦷",
  belly: "🤰",
  knee: "🦵",
  elbow: "💪",
  cheek: "😊",
  lip: "👄",
  tongue: "👅",
  chin: "😶",
  thumb: "👍",
  belt: "👔",
  scarf: "🧣",
  boots: "👢",
  pajamas: "🛌",
  apron: "👩‍🍳",
  crown: "👑",
  drum: "🥁",
  bell: "🔔",
  horn: "📯",
  piano: "🎹",
  guitar: "🎸",
  whistle: "📣",
  puzzle: "🧩",
  swing: "🎠",
  slide: "🛝",
  sand: "🏖️",
  pool: "🏊",
  park: "🏞️",
  zoo: "🦁",
  farm: "🐄",
  school: "🏫",
  store: "🏪",
  market: "🛒",
  hospital: "🏥",
  library: "📚",
  king: "🤴",
  queen: "👸",
  prince: "🤴",
  princess: "👸",
  knight: "⚔️",
  pirate: "🏴‍☠️",
  fairy: "🧚",
  dragon: "🐉",
  monster: "👾",
  ghost: "👻",
  wizard: "🧙",
  angel: "😇",
  heart: "❤️",
  diamond: "💎",
  treasure: "💰",
  flag: "🏁",
  candle: "🕯️",
  gift: "🎁",
  party: "🎉",
  clap: "👏",
  hug: "🤗",
  kiss: "😘",
  kick: "⚽",
  climb: "🧗",
  hide: "🙈",
  count: "🔢",
  paint: "🎨",
  cook: "👨‍🍳",
  bake: "🧁",
  dig: "⛏️",
  blow: "💨",
  pour: "🫗",
  mix: "🥣",
  share: "🤝",
  wait: "⏳",
  wake: "⏰",
  wave: "👋",
  nod: "😊",
  wink: "😉",
  yawn: "🥱",
  brave: "🦸",
  pretty: "🌸",
  cute: "🥰",
  funny: "😄",
  scary: "😱",
  sweet: "🍭",
  sour: "🍋",
  round: "⭕",
  square: "⬛",
  wet: "💦",
  dry: "☀️",
  heavy: "🏋️",
  light: "🪶",
  strong: "💪",
  weak: "🐣",
  dark: "🌑",
  bright: "🌟",
  nice: "🌈",
  kind: "💕",
  silly: "🤪",
  safe: "🛡️",
  glue: "🧴",
  clay: "🏺",
  flute: "🎵",
  harp: "🎶",
  vest: "🦺",
  cape: "🦸",
  wand: "🪄",
  shield: "🛡️",
  tent: "⛺",
  log: "🪵",
  vine: "🌿",
  paw: "🐾",
  beak: "🐦",
  claw: "🦀",
  fin: "🐟",
  tusk: "🦣",
  mane: "🦁",
  hive: "🐝",
  cave: "🕳️",
  cliff: "🏔️",
  shore: "🏖️",
  brook: "💧",
  bloom: "🌸",
  thorn: "🌹",
  stump: "🪵",
  frost: "❄️",
  dew: "💦",
  mist: "🌫️",
  creek: "🏞️",
  petal: "🌺",
  pearl: "🫧",
  gem: "💎",
  globe: "🌍",
  chalk: "🖍️",
  tape: "📎",
  pin: "📌",
  lid: "🫙",
  knob: "🚪",
  hook: "🪝",
  plug: "🔌",
  frame: "🖼️",
  shelf: "📚",
  stool: "🪑",
  rug: "🧶",
  quilt: "🛏️",
  jar: "🏺",
  tray: "🍽️",
  whisk: "🥄",
  ladle: "🥣",
  mitten: "🧤",
  pouch: "👝",
  plum: "🫐",
  fig: "🫒",
  yam: "🍠",
  oat: "🌾",
  cod: "🐟",
  elm: "🌳",
  cub: "🐻",
  colt: "🐴",
};
const getEmojiForWord = (wordEng: string): string => basicEmojiMap[wordEng.toLowerCase()] || "✨";

const parseRawData = (raw: string) =>
  raw.split("|").map((entry, i) => {
    const parts = entry.split(",");
    return {
      id: `moe_${i}`,
      english: parts[0],
      pos: parts[1] || "",
      chinese: parts[2] || "",
      sentenceEn: parts[3] || "", // 新增：讀取固定英文例句
      sentenceZh: parts[4] || "", // 新增：讀取固定中文翻譯
      emoji: getEmojiForWord(parts[0]),
    };
  });

const toddlerSyllabus = parseRawData(rawToddlerData);
const massiveSyllabus = parseRawData(rawClassicData);

type VocabMode = "toddler" | "classic";

const getDefaultVocabByMode = (mode: VocabMode) => (mode === "toddler" ? toddlerSyllabus : massiveSyllabus);

const mergeDefaultVocabWithCustom = (mode: VocabMode, savedVocab: any[]) => {
  const defaultVocab = getDefaultVocabByMode(mode);
  const defaultEnglishSet = new Set(defaultVocab.map((word) => word.english.toLowerCase()));

  const customVocab = Array.isArray(savedVocab)
    ? savedVocab.filter((word) => {
        const id = String(word?.id ?? "");
        const english = String(word?.english ?? "").trim().toLowerCase();
        return !id.startsWith("moe_") && english && !defaultEnglishSet.has(english);
      })
    : [];

  const dedupedCustomVocab = customVocab.filter((word, index, arr) => {
    const english = String(word.english).trim().toLowerCase();
    return arr.findIndex((item) => String(item.english).trim().toLowerCase() === english) === index;
  });

  return [...defaultVocab, ...dedupedCustomVocab];
};

const ALPHABET = [
  "All",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Index = () => {
  const { user, signOut } = useAuth();
  const cloud = useCloudData(user ?? null);

  const [appMode, setAppMode] = useState("home");
  const [vocabList, setVocabList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("study");

  // Speech init
  useEffect(() => {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    preloadVoices();
  }, []);

  // Load/save vocab per mode：永遠以最新內建字庫為主，再合併舊快取中的自訂單字
  useEffect(() => {
    if (appMode === "home") return;

    const mode: VocabMode = appMode === "toddler" ? "toddler" : "classic";
    const key = mode === "toddler" ? "oikid_vocab_toddler_v2" : "oikid_vocab_classic_v2";
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setVocabList(mergeDefaultVocabWithCustom(mode, parsed));
        return;
      } catch (e) {}
    }

    setVocabList(getDefaultVocabByMode(mode));
  }, [appMode]);

  useEffect(() => {
    if (appMode === "home" || vocabList.length === 0) return;
    const key = appMode === "toddler" ? "oikid_vocab_toddler_v2" : "oikid_vocab_classic_v2";
    localStorage.setItem(key, JSON.stringify(vocabList));
  }, [vocabList, appMode]);

  // Use cloud data for stars & pets
  const stars = cloud.stars;
  const pets = cloud.pets;
  const setPets = cloud.setPets;

  const [showReward, setShowReward] = useState<string | null>(null);
  const [missionRefreshKey, setMissionRefreshKey] = useState(0);
  const [gachaPullCount, setGachaPullCount] = useState<number>(() => {
    try { return parseInt(localStorage.getItem('oikid_gacha_pulls') || '0', 10); } catch { return 0; }
  });
  const [newBadge, setNewBadge] = useState<any>(null);

  // Shop & favorites
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('oikid_shop_items') || '[]'); } catch { return []; }
  });
  const [equippedItems, setEquippedItems] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem('oikid_equipped') || '{}'); } catch { return {}; }
  });
  const [favoritePetId, setFavoritePetId] = useState<string | null>(() => localStorage.getItem('oikid_favorite_pet'));

  const handleShopPurchase = (item: ShopItem) => {
    if (stars < item.cost) return;
    cloud.setStars(stars - item.cost);
    if (item.category !== 'rename') {
      const newItems = [...purchasedItems, item.id];
      setPurchasedItems(newItems);
      localStorage.setItem('oikid_shop_items', JSON.stringify(newItems));
    }
  };

  const handleEquipItem = (itemId: string, category: string) => {
    const newEquipped = { ...equippedItems };
    if (newEquipped[category] === itemId) {
      delete newEquipped[category];
    } else {
      newEquipped[category] = itemId;
    }
    setEquippedItems(newEquipped);
    localStorage.setItem('oikid_equipped', JSON.stringify(newEquipped));
  };

  const setFavoritePet = (petId: string | null) => {
    setFavoritePetId(petId);
    if (petId) localStorage.setItem('oikid_favorite_pet', petId);
    else localStorage.removeItem('oikid_favorite_pet');
  };

  const favoritePet = pets.find(p => String(p.id) === favoritePetId) || (pets.length > 0 ? pets[pets.length - 1] : null);

  // Farm water tokens — earned by answering correctly in any game
  const [waterTokens, setWaterTokens] = useState<number>(() => {
    try { return parseInt(localStorage.getItem('oikid_water_tokens') || '0', 10); } catch { return 0; }
  });
  useEffect(() => {
    localStorage.setItem('oikid_water_tokens', String(waterTokens));
  }, [waterTokens]);

  const addWaterToken = (n = 1) => setWaterTokens(prev => prev + n);
  const useWaterToken = () => {
    if (waterTokens <= 0) return false;
    setWaterTokens(prev => prev - 1);
    return true;
  };

  // New feature states
  const [showCorrectBurst, setShowCorrectBurst] = useState(false);
  const [globalCombo, setGlobalCombo] = useState(0);
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; title: string; emoji: string } | null>(null);
  const [hatchInfo, setHatchInfo] = useState<{ stage: "baby" | "adult"; petType: string; rarity: PetRarity } | null>(
    null,
  );
  const prevLevelRef = useRef(getLevel(stars).level);

  // Achievement check helper (cloud-based)
  const checkForNewAchievements = async () => {
    const totalStats = await cloud.getTotalStats();
    const loginStreak = await cloud.getLoginStreak();
    const ctx: AchievementContext = {
      totalWordsStudied: totalStats.wordsStudied,
      totalQuizCorrect: totalStats.quizCorrect,
      totalQuizTotal: totalStats.quizTotal,
      loginStreak,
      stars,
      petsCount: pets.length,
      vocabCount: vocabList.length,
    };
    const unlocked = await cloud.getUnlockedAchievements();
    const newlyUnlocked: any[] = [];
    for (const def of ACHIEVEMENT_DEFINITIONS) {
      if (unlocked[def.id]) continue;
      if (def.condition(ctx)) {
        await cloud.unlockAchievement(def.id);
        newlyUnlocked.push({ ...def, unlockedAt: new Date().toISOString() });
      }
    }
    if (newlyUnlocked.length > 0) {
      setTimeout(() => setNewBadge(newlyUnlocked[0]), 800);
    }
  };

  useEffect(() => {
    checkForNewAchievements();
    // Check for level up
    const currentLevel = getLevel(stars).level;
    if (currentLevel > prevLevelRef.current) {
      const info = getLevel(stars);
      setLevelUpInfo({ level: info.level, title: info.title, emoji: info.emoji });
    }
    prevLevelRef.current = currentLevel;
  }, [stars, pets]);

  const earnStar = (amount = 1) => {
    cloud.setStars(stars + amount);
  };

  const triggerMission = (missionId: string, increment = 1) => {
    const completed = updateMissionProgress(missionId, increment);
    setMissionRefreshKey((prev) => prev + 1);
    if (completed) earnStar(completed.reward);
  };

  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);

  const waterAccumRef = useRef(0);

  const handleCorrectAnswer = () => {
    setShowCorrectBurst(true);
    setGlobalCombo((prev) => prev + 1);
    // Every 3 correct answers = 1 water token
    waterAccumRef.current += 1;
    if (waterAccumRef.current >= 3) {
      addWaterToken(1);
      waterAccumRef.current = 0;
    }
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setGlobalCombo(0), 3000);
  };

  const handleWrongAnswer = () => {
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    setGlobalCombo(0);
  };

  const handleGachaPull = async (pulled: { type: string; rarity: PetRarity }, isDupe: boolean) => {
    if (stars < GACHA_COST) return;
    const newPullCount = gachaPullCount + 1;
    setGachaPullCount(newPullCount);
    localStorage.setItem('oikid_gacha_pulls', String(newPullCount));

    if (isDupe) {
      const reward = DUPE_STAR_REWARD[pulled.rarity] || 3;
      cloud.setStars(stars - GACHA_COST + reward);
    } else {
      cloud.setStars(stars - GACHA_COST);
      const newPet = await cloud.addPet({ type: pulled.type, rarity: pulled.rarity });
      if (newPet) setTimeout(() => setShowReward("🥚"), 500);
    }
  };

  const speak = (text: string, e?: any) => speakUtil(text, appMode, e);

  const feedPetWithStars = async (pet: any) => {
    const currentStage = pet.stage || getStage(pet.hearts || 0);
    const cost = getFeedCost(currentStage);
    if (stars < cost) {
      setModalConfig({
        type: "alert",
        message: `星星不夠！需要 ${cost} ⭐ 才能餵食`,
        onConfirm: () => setModalConfig(null),
      });
      return;
    }
    cloud.setStars(stars - cost);
    const newHearts = (pet.hearts || 0) + 1;
    const previousStage = currentStage;
    const nextStage = getStage(newHearts);
    if (nextStage !== previousStage && nextStage !== "egg") {
      setHatchInfo({ stage: nextStage, petType: pet.type, rarity: pet.rarity || "common" });
    }
    await cloud.feedPet(pet.id, newHearts);
    triggerMission("feed_pet");
  };

  // Study
  const [currentLetterFilter, setCurrentLetterFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setCurrentLetterFilter("All");
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [appMode, activeTab]);

  const studyDeck =
    currentLetterFilter === "All"
      ? vocabList
      : vocabList.filter((w) => w.english.toUpperCase().startsWith(currentLetterFilter));

  const handleFilterChange = (letter: string) => {
    setCurrentLetterFilter(letter);
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  const shuffleStudyDeck = () => {
    setVocabList([...vocabList].sort(() => 0.5 - Math.random()));
    setCurrentLetterFilter("All");
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  const nextCard = () => {
    if (!studyDeck.length) return;
    setIsFlipped(false);
    cloud.recordWordStudied();
    triggerMission("study_words");
    setCurrentIndex((p) => {
      const n = (p + 1) % studyDeck.length;
      return n;
    });
  };
  const prevCard = () => {
    if (!studyDeck.length) return;
    setIsFlipped(false);
    setCurrentIndex((p) => (p - 1 + studyDeck.length) % studyDeck.length);
  };

  // Quiz (classic)
  const [quizPool, setQuizPool] = useState<any[]>([]);
  const [quizType, setQuizType] = useState("en2zh");
  const [quizScore, setQuizScore] = useState(0);
  const [quizCurrentQ, setQuizCurrentQ] = useState(0);
  const [quizOptions, setQuizOptions] = useState<any[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [quizModeSelector, setQuizModeSelector] = useState(false);

  // Audio quiz (toddler)
  const [audioQuizPool, setAudioQuizPool] = useState<any[]>([]);
  const [audioQuizScore, setAudioQuizScore] = useState(0);
  const [audioQuizCurrentQ, setAudioQuizCurrentQ] = useState(0);
  const [audioQuizOptions, setAudioQuizOptions] = useState<any[]>([]);
  const [audioQuizFinished, setAudioQuizFinished] = useState(false);
  const [audioQuizFeedback, setAudioQuizFeedback] = useState<string | null>(null);

  // Memory game
  const [memoryCards, setMemoryCards] = useState<any[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);
  const [memoryAttempts, setMemoryAttempts] = useState(0);

  // Admin
  const [searchTerm, setSearchTerm] = useState("");
  const [importText, setImportText] = useState("");
  const [dictQuery, setDictQuery] = useState("");
  const [dictLoading, setDictLoading] = useState(false);
  const [dictResult, setDictResult] = useState<any>(null);
  const [aiTheme, setAiTheme] = useState("");
  const [aiLoadingVocab, setAiLoadingVocab] = useState(false);
  const [materialText, setMaterialText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // Modal
  const [modalConfig, setModalConfig] = useState<any>(null);
  const showAlert = (message: string) =>
    setModalConfig({
      type: "alert",
      message: typeof message === "string" ? message : String(message),
      onConfirm: () => setModalConfig(null),
    });
  const showConfirm = (message: string, onConfirm: () => void) =>
    setModalConfig({
      type: "confirm",
      message: typeof message === "string" ? message : String(message),
      onConfirm: () => {
        onConfirm();
        setModalConfig(null);
      },
      onCancel: () => setModalConfig(null),
    });

  // AI helpers
  const aiCall = (prompt: string, schema: Record<string, any>) => fetchGeminiJSON(prompt, schema, showAlert);

  const searchDictionary = async () => {
    if (!dictQuery.trim()) return showAlert("請輸入要查詢的單字！");
    setDictLoading(true);
    setDictResult(null);
    try {
      const r = await aiCall(
        `你是一本專業的英漢字典。請查詢單字「${dictQuery}」，回傳其基本的詞性簡寫（例如 n., v., adj.）、繁體中文解釋，以及一個最適合代表這個單字的 Emoji。`,
        {
          english: { type: "STRING" },
          pos: { type: "STRING" },
          chinese: { type: "STRING" },
          emoji: { type: "STRING", description: "一個最適合的 Emoji" },
        },
      );
      if (r?.english) setDictResult(r);
      else showAlert("找不到該單字的解釋。");
    } catch (e) {
    } finally {
      setDictLoading(false);
    }
  };

  const addDictWordToVocab = () => {
    if (!dictResult) return;
    if (vocabList.some((w) => w.english.toLowerCase() === dictResult.english.toLowerCase()))
      return showAlert(`單字「${dictResult.english}」已經在單字庫中囉！`);
    setVocabList((prev) => [
      ...prev,
      {
        id: "custom_" + Date.now(),
        english: dictResult.english,
        pos: dictResult.pos || "",
        chinese: dictResult.chinese,
        emoji: dictResult.emoji || "🌟",
      },
    ]);
    showAlert(`已成功將單字「${dictResult.english}」加入單字庫！`);
    setDictResult(null);
    setDictQuery("");
  };

  const generateAIVocab = async () => {
    if (!aiTheme.trim()) return showAlert("請輸入想要生成的主題");
    setAiLoadingVocab(true);
    try {
      const r = await aiCall(
        `你是一個專業的兒童美語老師。請根據主題「${aiTheme}」生成 5 個適合小孩學習的英文單字，並附上簡寫的詞性與繁體中文翻譯。`,
        {
          words: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { english: { type: "STRING" }, pos: { type: "STRING" }, chinese: { type: "STRING" } },
            },
          },
        },
      );
      if (r?.words) {
        setVocabList((prev) => {
          const existing = new Set(prev.map((w) => w.english.toLowerCase()));
          const dupes: string[] = [];
          const nw = r.words
            .filter((w: any) => {
              if (existing.has(w.english.toLowerCase())) {
                dupes.push(w.english);
                return false;
              }
              return true;
            })
            .map((w: any) => ({
              id: "custom_" + Date.now() + Math.random(),
              english: w.english,
              pos: w.pos || "",
              chinese: w.chinese,
              emoji: getEmojiForWord(w.english),
            }));
          setTimeout(() => {
            let msg = "";
            if (nw.length) msg += `魔法成功！已新增 ${nw.length} 個單字\n`;
            if (dupes.length) msg += `已攔截重複：${dupes.join(", ")}`;
            if (msg) showAlert(msg.trim());
          }, 0);
          return [...prev, ...nw];
        });
        setAiTheme("");
      }
    } catch (e) {
    } finally {
      setAiLoadingVocab(false);
    }
  };

  const extractVocabFromMaterial = async () => {
    if (!materialText.trim()) return showAlert("請貼上教材內容！");
    setIsExtracting(true);
    try {
      const r = await aiCall(
        `你是一個專業的兒童美語教材編輯。請從以下教材文本中，擷取 5 到 10 個最重要的核心英文單字，並提供簡寫詞性與繁體中文翻譯。\n\n教材文本：\n${materialText}`,
        {
          words: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { english: { type: "STRING" }, pos: { type: "STRING" }, chinese: { type: "STRING" } },
            },
          },
        },
      );
      if (r?.words) {
        setVocabList((prev) => {
          const existing = new Set(prev.map((w) => w.english.toLowerCase()));
          const dupes: string[] = [];
          const nw = r.words
            .filter((w: any) => {
              if (existing.has(w.english.toLowerCase())) {
                dupes.push(w.english);
                return false;
              }
              return true;
            })
            .map((w: any) => ({
              id: "custom_" + Date.now() + Math.random(),
              english: w.english,
              pos: w.pos || "",
              chinese: w.chinese,
              emoji: getEmojiForWord(w.english),
            }));
          setTimeout(() => {
            let msg = "";
            if (nw.length) msg += `萃取成功！新增 ${nw.length} 個單字\n`;
            if (dupes.length) msg += `已攔截重複：${dupes.join(", ")}`;
            if (msg) showAlert(msg.trim());
          }, 0);
          return [...prev, ...nw];
        });
        setMaterialText("");
      }
    } catch (e) {
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const lines = importText.split("\n");
    const nw: any[] = [];
    lines.forEach((line) => {
      const parts = line.split(/[,\t，]/);
      if (parts.length >= 3) nw.push({ english: parts[0].trim(), pos: parts[1].trim(), chinese: parts[2].trim() });
      else if (parts.length === 2) nw.push({ english: parts[0].trim(), pos: "", chinese: parts[1].trim() });
    });
    if (nw.length) {
      setVocabList((prev) => {
        const existing = new Set(prev.map((w) => w.english.toLowerCase()));
        const dupes: string[] = [];
        const filtered = nw
          .filter((w) => {
            if (existing.has(w.english.toLowerCase())) {
              dupes.push(w.english);
              return false;
            }
            return true;
          })
          .map((w) => ({ id: "custom_" + Date.now() + Math.random(), emoji: getEmojiForWord(w.english), ...w }));
        setTimeout(() => {
          let msg = "";
          if (filtered.length) msg += `成功匯入 ${filtered.length} 個單字！\n`;
          if (dupes.length) msg += `已攔截重複：${dupes.slice(0, 10).join(", ")}`;
          if (msg) showAlert(msg.trim());
        }, 0);
        return [...prev, ...filtered];
      });
      setImportText("");
    } else showAlert("匯入格式錯誤");
  };

  // Quiz logic
  const generateQuizOptions = (pool: any[], qIndex: number) => {
    const cur = pool[qIndex];
    const type = Math.random() > 0.5 ? "en2zh" : "zh2en";
    setQuizType(type);
    let opts = [cur];
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    for (const w of shuffled) {
      if (opts.length >= 4) break;
      if (w.id !== cur.id) opts.push(w);
    }
    setQuizOptions(opts.sort(() => 0.5 - Math.random()));
  };

  const startQuiz = (num = 50) => {
    if (vocabList.length < 4) return showAlert("至少需要 4 個單字！");
    const pool = [...vocabList].sort(() => 0.5 - Math.random()).slice(0, Math.min(num, vocabList.length));
    setQuizPool(pool);
    setQuizScore(0);
    setQuizCurrentQ(0);
    setQuizFinished(false);
    setFeedback(null);
    setQuizModeSelector(false);
    generateQuizOptions(pool, 0);
    setActiveTab("quiz");
  };

  const handleAnswer = (opt: any) => {
    const correct = opt.id === quizPool[quizCurrentQ].id;
    setFeedback(correct ? "correct" : "wrong");
    cloud.recordQuizAnswer(correct);
    if (correct) {
      setQuizScore((p) => p + 1);
      handleCorrectAnswer();
      triggerMission("quiz_correct");
    } else {
      handleWrongAnswer();
    }
    if (quizType === "zh2en") speak(opt.english);
    setTimeout(() => {
      if (quizCurrentQ + 1 < quizPool.length) {
        setQuizCurrentQ((p) => p + 1);
        generateQuizOptions(quizPool, quizCurrentQ + 1);
        setFeedback(null);
      } else {
        setQuizFinished(true);
        setFeedback(null);
        earnStar(1);
      }
    }, 700);
  };

  // Audio quiz
  const generateAudioQuizOptions = (pool: any[], qIndex: number) => {
    const cur = pool[qIndex];
    let opts = [cur];
    const all = [...vocabList].sort(() => 0.5 - Math.random());
    for (const w of all) {
      if (opts.length >= 4) break;
      if (w.id !== cur.id) opts.push(w);
    }
    setAudioQuizOptions(opts.sort(() => 0.5 - Math.random()));
    setTimeout(() => speak(cur.english), 500);
  };

  const startAudioQuiz = () => {
    if (vocabList.length < 4) return showAlert("單字庫不夠喔！");
    const pool = [...vocabList].sort(() => 0.5 - Math.random()).slice(0, 10);
    setAudioQuizPool(pool);
    setAudioQuizScore(0);
    setAudioQuizCurrentQ(0);
    setAudioQuizFinished(false);
    setAudioQuizFeedback(null);
    generateAudioQuizOptions(pool, 0);
    setActiveTab("audio_quiz");
  };

  const handleAudioQuizAnswer = (selected: any) => {
    const cur = audioQuizPool[audioQuizCurrentQ];
    const correct = selected.id === cur.id;
    setAudioQuizFeedback(correct ? "correct" : "wrong");
    cloud.recordQuizAnswer(correct);
    if (correct) {
      setAudioQuizScore((p) => p + 1);
      handleCorrectAnswer();
      triggerMission("quiz_correct");
    } else {
      handleWrongAnswer();
      // 記錄錯題
      if (user?.id && cur) {
        trackWrongWord({
          userId: user.id,
          word: cur.english,
          chinese: cur.chinese,
          appMode: appMode === 'toddler' ? 'toddler' : 'advanced',
          source: 'audio_quiz',
        });
      }
    }
    speak(cur.english);
    setTimeout(() => {
      if (audioQuizCurrentQ + 1 < audioQuizPool.length) {
        setAudioQuizCurrentQ((p) => p + 1);
        generateAudioQuizOptions(audioQuizPool, audioQuizCurrentQ + 1);
        setAudioQuizFeedback(null);
      } else {
        setAudioQuizFinished(true);
        setAudioQuizFeedback(null);
        earnStar(1);
        triggerMission("listen_quiz");
      }
    }, 700);
  };

  // Memory game
  const startMemoryGame = (pairCount: number = 4) => {
    const minWords = Math.min(pairCount, vocabList.length);
    if (vocabList.length < pairCount) {
      if (vocabList.length < 4) return showAlert("單字太少無法玩翻翻牌！");
    }
    const selected = [...vocabList].sort(() => 0.5 - Math.random()).slice(0, Math.min(pairCount, vocabList.length));
    const deck: any[] = [];
    selected.forEach((w) => {
      deck.push({ id: w.id + "_en", wordId: w.id, type: "en", content: w.english, isFlipped: false, isMatched: false });
      deck.push({
        id: w.id + "_zh",
        wordId: w.id,
        type: "zh",
        content: w.chinese,
        emoji: w.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });
    setMemoryCards(deck.sort(() => 0.5 - Math.random()));
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMemoryAttempts(0);
    setMemoryFinished(false);
    setActiveTab("memory");
  };

  const handleCardClick = (index: number) => {
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched || flippedIndices.length >= 2) return;
    const nc = [...memoryCards];
    nc[index].isFlipped = true;
    setMemoryCards(nc);
    const nf = [...flippedIndices, index];
    setFlippedIndices(nf);
    const wordObj = vocabList.find((w) => w.id === nc[index].wordId);
    if (wordObj) speak(wordObj.english);
    if (nf.length === 2) {
      setMemoryAttempts((p) => p + 1);
      if (nc[nf[0]].wordId === nc[nf[1]].wordId) {
        setTimeout(() => {
          nc[nf[0]].isMatched = true;
          nc[nf[1]].isMatched = true;
          setMemoryCards(nc);
          setFlippedIndices([]);
          handleCorrectAnswer();
          setMatchedPairs((p) => {
                const n = p + 1;
                if (n % 3 === 0) earnStar(1);
                const totalPairs = nc.length / 2;
                if (n >= totalPairs) {
                  setMemoryFinished(true);
                  const bonus = totalPairs <= 4 ? 1 : totalPairs <= 6 ? 2 : 3;
                  earnStar(bonus);
                  triggerMission("memory_game");
                }
            return n;
          });
        }, 800);
      } else {
        setTimeout(() => {
          nc[nf[0]].isFlipped = false;
          nc[nf[1]].isFlipped = false;
          setMemoryCards(nc);
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const filteredVocabList = vocabList.filter(
    (w) => w.english.toLowerCase().includes(searchTerm.toLowerCase()) || w.chinese.includes(searchTerm),
  );

  // === HOME ===
  if (appMode === "home") {
    return (
      <HomeScreen
        onSelectMode={(mode) => {
          setAppMode(mode);
          setActiveTab("study");
        }}
        childName={cloud.childName}
        onChildNameChange={cloud.setChildName}
        onSignOut={signOut}
        favoritePet={favoritePet}
      />
    );
  }

  const equippedTheme = equippedItems.theme || '';
  const equippedTitleItem = equippedItems.title ? SHOP_ITEMS.find(i => i.id === equippedItems.title) : null;

  // === MAIN APP ===
  return (
    <div className={`min-h-screen ${equippedTheme ? 'bg-transparent' : 'bg-gradient-to-br from-game-amber-light via-game-pink-light to-game-blue-light'} font-display text-foreground flex flex-col relative pb-20 sm:pb-24 overflow-x-hidden`}>
      {/* Animated theme background */}
      {equippedTheme && <ThemeBackground theme={equippedTheme} />}

      {/* Equipped title display */}
      {equippedTitleItem && (
        <div className="absolute top-[60px] right-3 z-30 bg-game-amber/10 backdrop-blur-sm text-game-amber px-3 py-1 rounded-full text-xs font-bold border border-game-amber/20 flex items-center gap-1">
          {equippedTitleItem.emoji} {equippedTitleItem.value}
        </div>
      )}
      {/* Pet reward modal */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm"
            onClick={() => setShowReward(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-game-amber-light to-game-orange-light p-10 rounded-[2rem] text-center flex flex-col items-center shadow-2xl border-4 border-game-amber/40 relative overflow-hidden"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-orange to-game-pink mb-6 z-10">
                太棒了！獲得新夥伴！
              </h2>
              <motion.div
                className="text-8xl mb-6 z-10 drop-shadow-lg"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {showReward}
              </motion.div>
              <p className="text-muted-foreground font-semibold z-10">快去「夥伴背包」看看牠！</p>
              <motion.button
                className="mt-8 px-8 py-3 bg-gradient-to-r from-game-orange to-game-pink text-white font-bold rounded-full z-10 shadow-lg game-btn text-lg"
                whileTap={{ scale: 0.95 }}
              >
                🎮 繼續玩！
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New badge celebration modal */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center backdrop-blur-sm"
            onClick={() => setNewBadge(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-game-amber-light to-card p-10 rounded-[2rem] text-center flex flex-col items-center shadow-2xl border-4 border-game-amber/40 max-w-sm mx-4"
              initial={{ scale: 0.3, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-6xl mb-2"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: 2 }}
              >
                🏆
              </motion.div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-amber to-game-orange mb-2">
                成就解鎖！
              </h2>
              <motion.div
                className="text-7xl my-4 drop-shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {newBadge.emoji}
              </motion.div>
              <p className="text-xl font-bold text-foreground mb-1">{newBadge.title}</p>
              <p className="text-sm text-muted-foreground mb-6">{newBadge.description}</p>
              <motion.button
                onClick={() => setNewBadge(null)}
                className="px-8 py-3 bg-gradient-to-r from-game-amber to-game-orange text-white font-bold rounded-full shadow-lg text-lg"
                whileTap={{ scale: 0.95 }}
              >
                🎉 太棒了！
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed pet is now star-based, no quiz modal needed */}

      {/* Quiz mode selector */}
      <AnimatePresence>
        {quizModeSelector && (
          <motion.div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card game-card border-game-green/30 p-8 w-full max-w-sm text-center border-t-8 border-game-green"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <Gamepad2 className="mx-auto text-game-green mb-4" size={48} />
              <h3 className="text-2xl font-bold text-foreground mb-6">選擇挑戰模式</h3>
              <div className="flex flex-col gap-3">
                {[
                  { n: 10, label: "輕鬆挑戰", icon: <Target size={20} />, color: "game-green" },
                  { n: 25, label: "進階戰士", icon: <Flame size={20} />, color: "game-blue" },
                  { n: 50, label: "會考魔王", icon: <Crown size={20} />, color: "game-purple" },
                ].map(({ n, label, icon, color }) => (
                  <motion.button
                    key={n}
                    onClick={() => startQuiz(n)}
                    className={`w-full py-4 bg-${color}/10 hover:bg-${color}/20 text-${color} font-bold rounded-2xl border border-${color}/20 transition-colors text-lg flex justify-center items-center gap-2`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {icon} {label} ({n} 題)
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setQuizModeSelector(false)}
                className="mt-6 text-muted-foreground font-semibold hover:text-foreground"
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultantButton />

      {/* Global effects */}
      <CorrectBurst show={showCorrectBurst} onDone={() => setShowCorrectBurst(false)} />
      <AnimatePresence>
        <ComboDisplay combo={globalCombo} />
      </AnimatePresence>
      <LevelUpCelebration
        show={!!levelUpInfo}
        level={levelUpInfo?.level || 1}
        title={levelUpInfo?.title || ""}
        emoji={levelUpInfo?.emoji || ""}
        onDone={() => setLevelUpInfo(null)}
      />
      <HatchCelebration
        show={!!hatchInfo}
        stage={hatchInfo?.stage || "baby"}
        petType={hatchInfo?.petType || "🐣"}
        rarity={hatchInfo?.rarity || "common"}
        onDone={() => setHatchInfo(null)}
      />

      <GameHeader
        appMode={appMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setAppMode={setAppMode}
        stars={stars}
        pets={pets}
        startAudioQuiz={startAudioQuiz}
        startMemoryGame={startMemoryGame}
        setQuizModeSelector={setQuizModeSelector}
      />

      <main className="flex-grow flex flex-col items-center p-3 sm:p-6 w-full max-w-4xl mx-auto">
        <PageTransition transitionKey={activeTab}>
          {activeTab === "pets" && appMode === "toddler" && (
            <PetBag
              stars={stars}
              pets={pets}
              startFeedingPet={feedPetWithStars}
              onOpenGacha={() => setActiveTab("gacha")}
              favoritePetId={favoritePetId}
              onSetFavorite={setFavoritePet}
              equippedFrame={equippedItems.frame}
            />
          )}

          {activeTab === "gacha" && appMode === "toddler" && (
            <GachaSystem stars={stars} ownedPetTypes={pets.map((p) => p.type)} onPull={handleGachaPull} pullCount={gachaPullCount} />
          )}

          {activeTab === "petdex" && appMode === "toddler" && (
            <PetDex ownedPetTypes={pets.map((p) => p.type)} />
          )}

          {activeTab === "shop" && appMode === "toddler" && (
            <StarShop stars={stars} purchasedItems={purchasedItems} equippedItems={equippedItems} onPurchase={handleShopPurchase} onEquip={handleEquipItem} />
          )}

          {activeTab === "farm" && appMode === "toddler" && user && (
            <Farm
              userId={user.id}
              stars={stars}
              waterTokens={waterTokens}
              onUseWaterToken={useWaterToken}
              onSpendStars={(n) => cloud.setStars(stars - n)}
              onEarnStars={(n) => earnStar(n)}
              onGoToShop={() => setActiveTab("shop")}
            />
          )}

          {activeTab === "daily" && <DailyMissions onClaimReward={(n) => earnStar(n)} refreshKey={missionRefreshKey} />}

          {activeTab === "timed" && appMode === "toddler" && (
            <TimedChallenge
              appMode={appMode}
              vocabList={vocabList}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
            />
          )}

          {activeTab === "boss" && appMode === "toddler" && (
            <BossBattle
              appMode={appMode}
              vocabList={vocabList}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
            />
          )}

          {activeTab === "study" && (
            <StudyCard
              appMode={appMode}
              studyDeck={studyDeck}
              currentIndex={currentIndex}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              currentLetterFilter={currentLetterFilter}
              handleFilterChange={handleFilterChange}
              shuffleStudyDeck={shuffleStudyDeck}
              nextCard={nextCard}
              prevCard={prevCard}
            />
          )}

          {activeTab === "audio_quiz" && appMode === "toddler" && (
            <AudioQuiz
              appMode={appMode}
              audioQuizPool={audioQuizPool}
              audioQuizCurrentQ={audioQuizCurrentQ}
              audioQuizScore={audioQuizScore}
              audioQuizOptions={audioQuizOptions}
              audioQuizFinished={audioQuizFinished}
              audioQuizFeedback={audioQuizFeedback}
              handleAudioQuizAnswer={handleAudioQuizAnswer}
              startAudioQuiz={startAudioQuiz}
            />
          )}

          {activeTab === "memory" && appMode === "toddler" && (
            <MemoryGame
              appMode={appMode}
              memoryCards={memoryCards}
              memoryAttempts={memoryAttempts}
              matchedPairs={matchedPairs}
              memoryFinished={memoryFinished}
              handleCardClick={handleCardClick}
              startMemoryGame={startMemoryGame}
            />
          )}

          {activeTab === "toddler_spelling" && appMode === "toddler" && (
            <ToddlerSpelling
              vocabList={vocabList}
              appMode={appMode}
              userId={user?.id}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
              onWrongAnswer={() => {
                handleWrongAnswer();
                cloud.recordQuizAnswer(false);
              }}
            />
          )}

          {activeTab === "drag_match" && appMode === "toddler" && (
            <DragMatchGame
              vocabList={vocabList}
              appMode={appMode}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
              onWrongAnswer={() => {
                handleWrongAnswer();
                cloud.recordQuizAnswer(false);
              }}
            />
          )}

          {activeTab === "quiz" && appMode === "classic" && !quizModeSelector && (
            <TextQuiz
              appMode={appMode}
              quizPool={quizPool}
              quizCurrentQ={quizCurrentQ}
              quizScore={quizScore}
              quizOptions={quizOptions}
              quizType={quizType}
              quizFinished={quizFinished}
              feedback={feedback}
              handleAnswer={handleAnswer}
              setQuizModeSelector={setQuizModeSelector}
            />
          )}

          {activeTab === "cloze" && appMode === "classic" && (
            <ClozeTest
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
              onWrongAnswer={() => {
                handleWrongAnswer();
                cloud.recordQuizAnswer(false);
              }}
            />
          )}

          {activeTab === "sentence" && appMode === "classic" && (
            <SentenceBuilder
              vocabList={vocabList}
              appMode={appMode}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                triggerMission("quiz_correct");
              }}
            />
          )}

          {activeTab === "grammar" && appMode === "classic" && (
            <GrammarQuiz
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
              onWrongAnswer={() => {
                handleWrongAnswer();
                cloud.recordQuizAnswer(false);
              }}
            />
          )}

          {activeTab === "reading" && appMode === "classic" && (
            <ReadingComprehension
              appMode={appMode}
              onEarnStars={(n) => earnStar(n)}
              onCorrectAnswer={() => {
                handleCorrectAnswer();
                cloud.recordQuizAnswer(true);
                triggerMission("quiz_correct");
              }}
              onWrongAnswer={() => {
                handleWrongAnswer();
                cloud.recordQuizAnswer(false);
              }}
            />
          )}

          {activeTab === "dashboard" && <Dashboard stars={stars} vocabCount={vocabList.length} />}

          {activeTab === "wrong_words" && user?.id && (
            <WrongWordsReview
              userId={user.id}
              appMode={appMode === 'toddler' ? 'toddler' : 'advanced'}
              onEarnStars={(n) => earnStar(n)}
              onBack={() => setActiveTab('study')}
            />
          )}

          {activeTab === "achievements" && <AchievementBadges />}

          {activeTab === "admin" && (
            <AdminPanel
              appMode={appMode}
              vocabList={vocabList}
              setVocabList={setVocabList}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              importText={importText}
              setImportText={setImportText}
              handleImport={handleImport}
              dictQuery={dictQuery}
              setDictQuery={setDictQuery}
              dictLoading={dictLoading}
              dictResult={dictResult}
              searchDictionary={searchDictionary}
              addDictWordToVocab={addDictWordToVocab}
              aiTheme={aiTheme}
              setAiTheme={setAiTheme}
              aiLoadingVocab={aiLoadingVocab}
              generateAIVocab={generateAIVocab}
              materialText={materialText}
              setMaterialText={setMaterialText}
              isExtracting={isExtracting}
              extractVocabFromMaterial={extractVocabFromMaterial}
              filteredVocabList={filteredVocabList}
            />
          )}
        </PageTransition>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modalConfig && (
          <motion.div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card game-card border-game-blue/30 p-8 w-full max-w-sm border-t-8 border-game-blue"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <p className="text-lg font-semibold text-foreground mb-8 whitespace-pre-wrap leading-relaxed">
                {modalConfig.message && typeof modalConfig.message === "string" ? modalConfig.message : "系統提示"}
              </p>
              <div className="flex justify-end gap-3">
                {modalConfig.type !== "alert" && (
                  <motion.button
                    onClick={modalConfig.onCancel}
                    className="px-6 py-3 bg-muted text-muted-foreground font-bold rounded-xl hover:bg-border transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    取消
                  </motion.button>
                )}
                <motion.button
                  onClick={modalConfig.onConfirm}
                  className="px-6 py-3 bg-game-blue text-white font-bold rounded-xl hover:bg-game-blue/90 transition-colors shadow-md shadow-game-blue/30"
                  whileTap={{ scale: 0.95 }}
                >
                  確定
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

// Force full page reload on HMR to prevent "fewer hooks" errors from stale state
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    import.meta.hot?.invalidate();
  });
}
