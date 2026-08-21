import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GameHeader from "@/components/game/GameHeader";

const baseProps = {
  activeTab: "study",
  setActiveTab: vi.fn(),
  setAppMode: vi.fn(),
  stars: 0,
  pets: [],
  startAudioQuiz: vi.fn(),
  startMemoryGame: vi.fn(),
  setQuizModeSelector: vi.fn(),
};

describe("進階版功能入口", () => {
  it("顯示拼字挑戰，點擊後切到 spelling", () => {
    const setActiveTab = vi.fn();
    render(<GameHeader {...baseProps} appMode="classic" setActiveTab={setActiveTab} />);

    fireEvent.click(screen.getByRole("button", { name: "✏️ 拼字挑戰" }));
    expect(setActiveTab).toHaveBeenCalledWith("spelling");
  });

  it("幼兒版仍保留原本的拼字小高手，不混入進階入口", () => {
    render(<GameHeader {...baseProps} appMode="toddler" />);

    expect(screen.getByRole("button", { name: "✏️ 拼字小高手" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "✏️ 拼字挑戰" })).not.toBeInTheDocument();
  });

  it("幼兒版不顯示家長後台入口", () => {
    render(<GameHeader {...baseProps} appMode="toddler" />);
    expect(screen.queryByRole("button", { name: "⚙️ 家長後台" })).not.toBeInTheDocument();
  });

  it("進階版不顯示家長後台與 API 功能入口", () => {
    render(<GameHeader {...baseProps} appMode="classic" />);
    expect(screen.queryByRole("button", { name: "⚙️ 家長後台" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "📝 造句練習" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "📚 閱讀理解" })).not.toBeInTheDocument();
  });
});
