import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/components/site/ThemeProvider";
import { defaultTheme, readTheme, resolveTheme, saveTheme, themeBootstrap, themeDefinitions, themeStorageKey } from "@/data/themes";

afterEach(() => { cleanup(); localStorage.clear(); document.documentElement.dataset["theme"] = "classic"; vi.restoreAllMocks(); });

function Switcher() {
  const { theme, setTheme } = useTheme();
  return <><output aria-label="Current theme">{theme}</output><button onClick={() => setTheme("retro")}>Retro</button></>;
}

describe("Website personality rules", () => {
  it("offers exactly the four requested themes", () => {
    expect(themeDefinitions.map((theme) => theme.id)).toEqual(["classic", "retro", "playful", "after-dark"]);
    expect(themeDefinitions.map((theme) => theme.label)).toEqual(["Classic", "Retro", "Playful", "Moody"]);
  });
  it("uses Classic for new visitors and invalid preferences", () => {
    expect(defaultTheme).toBe("classic");
    expect(readTheme(localStorage)).toBe("classic");
    expect(resolveTheme("untrusted-value")).toBe("classic");
    expect(resolveTheme(null)).toBe("classic");
  });
  it.each(["classic", "retro", "playful", "after-dark"])("restores saved %s", (theme) => {
    localStorage.setItem(themeStorageKey, theme);
    expect(readTheme(localStorage)).toBe(theme);
  });
  it("falls back safely when storage cannot be read", () => {
    expect(readTheme({ getItem: () => { throw new Error("blocked"); } })).toBe("classic");
  });
  it("does not block theme switching when storage cannot be written", () => {
    const storage = { setItem: vi.fn(() => { throw new Error("blocked"); }) };
    expect(() => saveTheme(storage, "playful")).not.toThrow();
    expect(storage.setItem).toHaveBeenCalledWith(themeStorageKey, "playful");
  });
  it("applies saved preferences before paint with the same validation", () => {
    localStorage.setItem(themeStorageKey, "after-dark");
    new Function(themeBootstrap)();
    expect(document.documentElement.dataset["theme"]).toBe("after-dark");
    localStorage.setItem(themeStorageKey, "invalid");
    new Function(themeBootstrap)();
    expect(document.documentElement.dataset["theme"]).toBe("classic");
  });
  it("persists immediate changes and preserves entered form state", () => {
    render(<ThemeProvider><Switcher /><input aria-label="Project" defaultValue="" /></ThemeProvider>);
    fireEvent.change(screen.getByRole("textbox", { name: "Project" }), { target: { value: "My redesign" } });
    fireEvent.click(screen.getByRole("button", { name: "Retro" }));
    expect(document.documentElement.dataset["theme"]).toBe("retro");
    expect(localStorage.getItem(themeStorageKey)).toBe("retro");
    expect(screen.getByRole("textbox", { name: "Project" })).toHaveValue("My redesign");
  });
  it("hydrates the root provider with an existing saved selection", () => {
    localStorage.setItem(themeStorageKey, "playful");
    render(<ThemeProvider><Switcher /></ThemeProvider>);
    expect(screen.getByLabelText("Current theme")).toHaveTextContent("playful");
    expect(document.documentElement.dataset["theme"]).toBe("playful");
  });
});