import { describe, expect, it } from "vitest";
import { rawClassicData } from "@/data/classic-vocabulary";
import { rawToddlerData } from "@/data/toddler-vocabulary";
import { GRAMMAR_BANK } from "@/data/grammar-questions";
import { CLOZE_BANK } from "@/data/cloze-passages";

const parseVocabulary = (raw: string) =>
  raw.split("|").map((entry) => {
    const fields = entry.split(",");
    return { entry, fields, english: fields[0]?.trim().toLowerCase() };
  });

describe("完整題庫資料", () => {
  it("保留 1,826 筆進階單字，且每筆五欄、字頭不重複", () => {
    const words = parseVocabulary(rawClassicData);
    expect(words).toHaveLength(1826);
    expect(words.every(({ fields }) => fields.length === 5 && fields.every((field) => field.trim()))).toBe(true);
    expect(new Set(words.map(({ english }) => english)).size).toBe(1826);
  });

  it("保留 500 筆幼兒內容，並鎖定目前已知的兩組重複字", () => {
    const words = parseVocabulary(rawToddlerData);
    const counts = new Map<string, number>();
    words.forEach(({ english }) => counts.set(english, (counts.get(english) ?? 0) + 1));
    const duplicates = [...counts.entries()].filter(([, count]) => count > 1).map(([word]) => word).sort();

    expect(words).toHaveLength(500);
    expect(words.every(({ fields }) => fields.length === 5 && fields.every((field) => field.trim()))).toBe(true);
    expect(duplicates).toEqual(["clean", "hug"]);
  });

  it("保留 362 題文法，所有答案索引與選項都有效", () => {
    expect(GRAMMAR_BANK).toHaveLength(362);
    expect(GRAMMAR_BANK.filter((question) => question.difficulty === "beginner")).toHaveLength(122);
    expect(GRAMMAR_BANK.filter((question) => question.difficulty === "advanced")).toHaveLength(240);
    expect(new Set(GRAMMAR_BANK.map((question) => question.id)).size).toBe(362);
    expect(GRAMMAR_BANK.every((question) =>
      question.options.length === 4 &&
      question.correctIndex >= 0 &&
      question.correctIndex < question.options.length &&
      new Set(question.options).size === question.options.length
    )).toBe(true);
  });

  it("保留 32 篇克漏字與 128 個空格，題號和答案索引完全對應", () => {
    expect(CLOZE_BANK).toHaveLength(32);
    expect(CLOZE_BANK.filter((passage) => passage.difficulty === "beginner")).toHaveLength(16);
    expect(CLOZE_BANK.filter((passage) => passage.difficulty === "advanced")).toHaveLength(16);

    const blanks = CLOZE_BANK.flatMap((passage) => passage.blanks);
    expect(blanks).toHaveLength(128);
    expect(CLOZE_BANK.every((passage) => {
      const markers = [...passage.passage.matchAll(/__\((\d+)\)__/g)].map((match) => Number(match[1]));
      return passage.blanks.length === 4 &&
        markers.join(",") === passage.blanks.map((blank) => blank.index).join(",") &&
        passage.blanks.every((blank) =>
          blank.options.length === 4 &&
          blank.correctIndex >= 0 &&
          blank.correctIndex < blank.options.length &&
          new Set(blank.options).size === blank.options.length
        );
    })).toBe(true);
  });
});
