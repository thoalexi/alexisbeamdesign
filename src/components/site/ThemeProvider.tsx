import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { applyTheme, defaultTheme, readTheme, resolveTheme, saveTheme, themeStorageKey, type ThemeId } from "@/data/themes";

const ThemeContext = createContext<{ theme: ThemeId; setTheme: (theme: ThemeId) => void }>({ theme: defaultTheme, setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<ThemeId>(defaultTheme);

  useEffect(() => {
    let initial = resolveTheme(document.documentElement.dataset["theme"]);
    try { initial = readTheme(window.localStorage); } catch { /* Storage may be disabled. */ }
    applyTheme(initial);
    updateTheme(initial);
    const sync = (event: StorageEvent) => {
      if (event.key !== themeStorageKey && event.key !== null) return;
      const next = resolveTheme(event.newValue);
      applyTheme(next);
      updateTheme(next);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  function setTheme(value: ThemeId) {
    const next = resolveTheme(value);
    const root = document.documentElement;
    root.dataset["themeTransition"] = "true";
    // Colour cross-fade only while switching; leaving it on kept extra transitions on every link and button.
    window.clearTimeout(Number(root.dataset["themeTransitionTimer"] ?? 0));
    root.dataset["themeTransitionTimer"] = String(window.setTimeout(() => {
      delete root.dataset["themeTransition"];
      delete root.dataset["themeTransitionTimer"];
    }, 300));
    applyTheme(next);
    updateTheme(next);
    try { saveTheme(window.localStorage, next); } catch { /* Keep the in-memory preference. */ }
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);