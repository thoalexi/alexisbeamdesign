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
    document.documentElement.dataset["themeTransition"] = "true";
    applyTheme(next);
    updateTheme(next);
    try { saveTheme(window.localStorage, next); } catch { /* Keep the in-memory preference. */ }
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);