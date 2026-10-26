export const themeDefinitions = [
  { id: "classic", label: "Classic", font: null },
  { id: "retro", label: "Retro", font: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,700,100,1&display=swap" },
  { id: "playful", label: "Playful", font: "https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" },
  { id: "after-dark", label: "Moody", font: "https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500;600&display=swap" },
] as const;

export type ThemeId = (typeof themeDefinitions)[number]["id"];
export const defaultTheme: ThemeId = "classic";
export const themeStorageKey = "alexis-beam-personality";

export function resolveTheme(value: unknown): ThemeId {
  return themeDefinitions.find((theme) => theme.id === value)?.id ?? defaultTheme;
}

export function readTheme(storage: Pick<Storage, "getItem">): ThemeId {
  try { return resolveTheme(storage.getItem(themeStorageKey)); }
  catch { return defaultTheme; }
}

export function saveTheme(storage: Pick<Storage, "setItem">, theme: ThemeId): void {
  try { storage.setItem(themeStorageKey, theme); } catch { /* A blocked store never prevents switching. */ }
}

/** Runs only in an effect or event handler. The bootstrap uses the same definitions. */
export function applyTheme(theme: ThemeId): void {
  document.documentElement.dataset["theme"] = theme;
  const font = themeDefinitions.find((item) => item.id === theme)?.font;
  if (!font || document.getElementById(`personality-font-${theme}`)) return;
  const link = document.createElement("link");
  link.id = `personality-font-${theme}`;
  link.rel = "stylesheet";
  link.href = font;
  document.head.appendChild(link);
}

/** Static, trusted script: validates stored input, styles before paint and loads only the active font. */
export const themeBootstrap = `(()=>{const themes=${JSON.stringify(themeDefinitions)};let theme="classic";try{const saved=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(themes.some(t=>t.id===saved))theme=saved;}catch{}document.documentElement.dataset.theme=theme;const font=themes.find(t=>t.id===theme).font;if(font){const link=document.createElement("link");link.id="personality-font-"+theme;link.rel="stylesheet";link.href=font;document.head.appendChild(link);}})()`;