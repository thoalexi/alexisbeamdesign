import { useId } from "react";

const desktopBulbs = [
  { x: 45, y: 44, tilt: -25, color: "cherry" },
  { x: 128, y: 84, tilt: -15, color: "teal" },
  { x: 216, y: 111, tilt: -9, color: "butter" },
  { x: 309, y: 124, tilt: 7, color: "cherry" },
  { x: 405, y: 122, tilt: 8, color: "ivory" },
  { x: 501, y: 98, tilt: 18, color: "teal" },
  { x: 588, y: 64, tilt: 21, color: "pink" },
  { x: 671, y: 32, tilt: 12, color: "butter" },
  { x: 765, y: 32, tilt: -18, color: "cherry" },
  { x: 859, y: 73, tilt: -19, color: "ivory" },
  { x: 951, y: 105, tilt: -10, color: "teal" },
  { x: 1049, y: 121, tilt: -2, color: "cherry" },
  { x: 1149, y: 117, tilt: 9, color: "butter" },
  { x: 1241, y: 99, tilt: 17, color: "pink" },
  { x: 1324, y: 68, tilt: 20, color: "teal" },
  { x: 1404, y: 33, tilt: 18, color: "cherry" },
] as const;

const mobileBulbs = [
  { x: 26, y: 23, tilt: -18, color: "cherry" },
  { x: 96, y: 48, tilt: -12, color: "teal" },
  { x: 167, y: 66, tilt: -5, color: "butter" },
  { x: 240, y: 73, tilt: 4, color: "cherry" },
  { x: 314, y: 65, tilt: 9, color: "ivory" },
  { x: 387, y: 44, tilt: 15, color: "pink" },
  { x: 455, y: 19, tilt: 19, color: "teal" },
] as const;

const bulbColors = ["cherry", "teal", "butter", "ivory", "pink"] as const;

const featureBulbs = [
  { x: 29, y: 16, tilt: -20, color: "teal" },
  { x: 118, y: 41, tilt: -12, color: "cherry" },
  { x: 208, y: 57, tilt: -3, color: "butter" },
  { x: 305, y: 59, tilt: 5, color: "teal" },
  { x: 400, y: 46, tilt: 12, color: "pink" },
  { x: 489, y: 28, tilt: 18, color: "cherry" },
  { x: 578, y: 9, tilt: 20, color: "ivory" },
] as const;

/** Static printed glass and local halos: no timers, listeners, external media or hit targets. */
export function ChristmasLights({ variant = "hero" }: { variant?: "hero" | "feature" }) {
  const id = useId().replace(/:/g, "");
  const bulb = `${id}-bulb`;
  const halo = `${id}-halo`;
  const glass = `${id}-glass`;
  return (
    <div className={`christmas-lights christmas-lights-${variant}`} aria-hidden="true">
      <svg className="christmas-lights-desktop" viewBox="0 0 1440 210" fill="none" focusable="false">
        <defs>
          {bulbColors.map((color) => (
            <radialGradient key={color} id={`${halo}-${color}`}>
              <stop stopColor={`var(--christmas-${color})`} stopOpacity=".28" />
              <stop offset=".48" stopColor={`var(--christmas-${color})`} stopOpacity=".1" />
              <stop offset="1" stopColor={`var(--christmas-${color})`} stopOpacity="0" />
            </radialGradient>
          ))}
          <linearGradient id={glass} x1="-15" y1="25" x2="15" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--christmas-glass-highlight)" stopOpacity=".34" />
            <stop offset=".42" stopColor="var(--christmas-glass-highlight)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--christmas-wire)" stopOpacity=".19" />
          </linearGradient>
          <g id={bulb}>
            <path d="M-10 12C-17 21-17 31-12 40C-9 46-4 51-1 57Q0 59 2 56C5 50 11 44 14 37C18 27 15 18 10 12Z" fill="currentColor" stroke="var(--christmas-bulb-edge)" strokeWidth=".8" />
            <path d="M-10 12C-17 21-17 31-12 40C-9 46-4 51-1 57Q0 59 2 56C5 50 11 44 14 37C18 27 15 18 10 12Z" fill={`url(#${glass})`} />
            <path d="M-8 19C-11 23-12 28-10 32" stroke="var(--christmas-glass-highlight)" strokeOpacity=".7" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M-7 35L-6 37" stroke="var(--christmas-glass-highlight)" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
            <path d="M-9 0L-11 12Q0 15 11 12L9 0Z" fill="var(--christmas-socket)" stroke="var(--christmas-wire)" strokeWidth="1" />
            <path d="M-9 3L9 3M-10 6L10 6M-10 9L10 9" stroke="var(--christmas-socket-rib)" strokeWidth="1.2" />
            <path d="M0-3V1" stroke="var(--christmas-wire)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </defs>
        {variant === "hero" && <>
        <path className="christmas-wire" d="M-25 9C97 74 193 129 344 125C493 130 605 55 718 14C864 87 1001 136 1145 118C1281 107 1394 47 1470 7" />
        <path className="christmas-wire-twist" d="M-25 12C97 77 193 126 344 128C493 127 605 58 718 17C864 90 1001 133 1145 121C1281 104 1394 50 1470 10" />
        {desktopBulbs.map((item, i) => (
          <g key={i} className={`christmas-bulb christmas-bulb-${item.color}`} transform={`translate(${item.x} ${item.y}) rotate(${item.tilt})`}>
            <ellipse cx="0" cy="31" rx="31" ry="40" fill={`url(#${halo}-${item.color})`} />
            <use href={`#${bulb}`} />
          </g>
        ))}
        </>}
      </svg>
      {variant === "hero" &&
      <svg className="christmas-lights-mobile" viewBox="0 0 480 132" fill="none" focusable="false">
        <path className="christmas-wire" d="M-12 6C81 45 156 76 240 73C330 74 411 34 492 4" />
        <path className="christmas-wire-twist" d="M-12 9C81 48 156 73 240 76C330 71 411 37 492 7" />
        {mobileBulbs.map((item, i) => (
          <g key={i} className={`christmas-bulb christmas-bulb-${item.color}`} transform={`translate(${item.x} ${item.y}) rotate(${item.tilt}) scale(.72)`}>
            <ellipse cx="0" cy="31" rx="31" ry="40" fill={`url(#${halo}-${item.color})`} />
            <use href={`#${bulb}`} />
          </g>
        ))}
      </svg>}
      {variant === "feature" &&
      <svg className="christmas-lights-small" viewBox="0 0 600 120" fill="none" focusable="false">
        <path className="christmas-wire" d="M-15 2C97 41 194 67 294 60C410 52 501 22 615 1" />
        <path className="christmas-wire-twist" d="M-15 5C97 44 194 64 294 63C410 49 501 25 615 4" />
        {featureBulbs.map((item, i) => (
          <g key={i} className={`christmas-bulb christmas-bulb-${item.color}`} transform={`translate(${item.x} ${item.y}) rotate(${item.tilt}) scale(.65)`}>
            <ellipse cx="0" cy="31" rx="31" ry="40" fill={`url(#${halo}-${item.color})`} />
            <use href={`#${bulb}`} />
          </g>
        ))}
      </svg>}
    </div>
  );
}

export function ChristmasPaper() {
  const pattern = `${useId().replace(/:/g, "")}-paper`;
  return (
    <>
      <svg className="christmas-paper" aria-hidden="true" focusable="false" width="100%" height="100%">
        <defs>
          <pattern id={pattern} width="173" height="157" patternUnits="userSpaceOnUse">
            <path d="M7 16h1m21 29h.8m39-32h1m57 18h.7m-78 47h1m-32 47h.8m62-12h1m60 28h.7m-3-71h1m-37 20h.7m-62 47h1m-26-68h.6m132-22h1m-84-29h.7m29 122h1m61-29h.8m-102-43h.7m-4-47h.9m67 37h.7m-126 24h1m59 23h.7m21 36h1m38-91h.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pattern})`} />
      </svg>
      <svg className="christmas-starbursts" aria-hidden="true" focusable="false" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <g className="christmas-starburst-teal" transform="translate(1365 345)">
          <path d="M0-25L2-3L19-12L4 0L22 6L3 3L0 27L-2 4L-17 15L-4 1L-23-7L-3-2Z" />
          <circle cx="-30" cy="-24" r="2" />
        </g>
        <g className="christmas-starburst-cherry" transform="translate(43 696) rotate(16)">
          <path d="M0-18L2-3L13-11L4 0L18 3L3 3L0 20L-2 4L-13 12L-4 1L-18-4L-3-2Z" />
        </g>
        <g className="christmas-starburst-pink" transform="translate(1308 778)">
          <path d="M0-13L2-2L12-7L3 0L13 4L2 2L0 15L-2 3L-11 8L-3 0L-12-4L-2-2Z" />
          <circle cx="18" cy="-12" r="1.8" />
        </g>
      </svg>
    </>
  );
}