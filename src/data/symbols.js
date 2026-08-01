/** Symbol-Bibliothek für den Flaggenbaukasten */

/** Klare Grundfarben – eine pro Farbton, leicht unterscheidbar */
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#E30A17',
  blue: '#0039A6',
  lightBlue: '#74ACDF',
  green: '#009639',
  yellow: '#FFCE00',
  orange: '#FF7F00',
}

export const COLOR_PALETTE = [
  { id: 'black', hex: COLORS.black, label: 'Schwarz' },
  { id: 'white', hex: COLORS.white, label: 'Weiß' },
  { id: 'red', hex: COLORS.red, label: 'Rot' },
  { id: 'blue', hex: COLORS.blue, label: 'Blau' },
  { id: 'light-blue', hex: COLORS.lightBlue, label: 'Hellblau' },
  { id: 'green', hex: COLORS.green, label: 'Grün' },
  { id: 'yellow', hex: COLORS.yellow, label: 'Gelb' },
  { id: 'orange', hex: COLORS.orange, label: 'Orange' },
]

export const POSITIONS = [
  { id: 'center', label: 'Mitte', x: 0.5, y: 0.5 },
  { id: 'center-left', label: 'Mitte links', x: 0.35, y: 0.5 },
  { id: 'center-right', label: 'Mitte rechts', x: 0.65, y: 0.5 },
  { id: 'left', label: 'Links', x: 0.25, y: 0.5 },
  { id: 'top-left', label: 'Oben links', x: 0.2, y: 0.28 },
  { id: 'top', label: 'Oben', x: 0.5, y: 0.25 },
  { id: 'boundary', label: 'Farbgrenze', x: 0.33, y: 0.5 },
  { id: 'boundary-v', label: 'Horiz. Grenze', x: 0.5, y: 0.5 },
]

export const LAYOUTS = [
  { id: 'plain', label: 'Einfarbig', stripes: 1, direction: null },
  { id: 'horizontal-2', label: '2 Streifen horizontal', stripes: 2, direction: 'horizontal' },
  { id: 'horizontal-3', label: '3 Streifen horizontal', stripes: 3, direction: 'horizontal' },
  { id: 'vertical-2', label: '2 Streifen vertikal', stripes: 2, direction: 'vertical' },
  { id: 'vertical-2-uneven', label: '2 Streifen ungleich (2:3)', stripes: 2, direction: 'vertical', ratios: [2, 3] },
  { id: 'vertical-3', label: '3 Streifen vertikal', stripes: 3, direction: 'vertical' },
  { id: 'nordic-cross', label: 'Nordisches Kreuz', stripes: 1, direction: null, special: 'nordic' },
]

/** Geometrische und Wappen-Symbole (viewBox 0 0 100 100) */
export const SYMBOLS = [
  {
    id: 'circle',
    label: 'Kreis',
    category: 'geometric',
    colorable: true,
    paths: [{ d: 'M50 15 A35 35 0 1 1 49.9 15 Z', fill: 'current' }],
  },
  {
    id: 'star',
    label: 'Stern',
    category: 'geometric',
    colorable: true,
    paths: [
      {
        d: 'M50 8 L61 38 L94 38 L67 57 L77 88 L50 70 L23 88 L33 57 L6 38 L39 38 Z',
        fill: 'current',
      },
    ],
  },
  {
    id: 'crescent',
    label: 'Halbmond',
    category: 'geometric',
    colorable: true,
    paths: [
      {
        d: 'M42 18 A34 34 0 1 0 42 82 A34 34 0 1 0 42 18 Z M58 28 A24 24 0 1 0 58 72 A24 24 0 1 0 58 28 Z',
        fill: 'current',
        fillRule: 'evenodd',
      },
    ],
  },
  {
    id: 'cross',
    label: 'Kreuz',
    category: 'geometric',
    colorable: true,
    paths: [
      { d: 'M40 15 H60 V40 H85 V60 H60 V85 H40 V60 H15 V40 H40 Z', fill: 'current' },
    ],
  },
  {
    id: 'sun',
    label: 'Sonne',
    category: 'geometric',
    colorable: true,
    paths: [
      { d: 'M50 30 A20 20 0 1 1 49.9 30 Z', fill: 'current' },
      {
        d: 'M50 5 L53 22 L50 20 L47 22 Z M50 95 L53 78 L50 80 L47 78 Z M5 50 L22 47 L20 50 L22 53 Z M95 50 L78 47 L80 50 L78 53 Z M18 18 L30 28 L28 28 L28 30 Z M82 82 L72 72 L72 70 L70 72 Z M82 18 L72 28 L70 28 L72 30 Z M18 82 L28 72 L30 72 L28 70 Z',
        fill: 'current',
      },
    ],
  },
  {
    id: 'maple',
    label: 'Ahornblatt',
    category: 'geometric',
    colorable: true,
    paths: [
      {
        d: 'M50 10 L55 28 L70 18 L62 35 L85 35 L68 48 L80 65 L58 55 L60 80 L50 70 L40 80 L42 55 L20 65 L32 48 L15 35 L38 35 L30 18 L45 28 Z',
        fill: 'current',
      },
    ],
  },
  {
    id: 'diamond',
    label: 'Raute',
    category: 'geometric',
    colorable: true,
    paths: [{ d: 'M50 10 L85 50 L50 90 L15 50 Z', fill: 'current' }],
  },
  // --- Wappen ---
  {
    id: 'coat-pt',
    label: 'Wappen Portugal',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M30 20 H70 V55 Q70 80 50 90 Q30 80 30 55 Z', fill: '#DA291C' },
      { d: 'M38 28 H62 V50 Q62 68 50 75 Q38 68 38 50 Z', fill: '#FFFFFF' },
      { d: 'M42 32 H48 V38 H42 Z', fill: '#DA291C' },
      { d: 'M52 32 H58 V38 H52 Z', fill: '#DA291C' },
      { d: 'M42 42 H48 V48 H42 Z', fill: '#DA291C' },
      { d: 'M52 42 H58 V48 H52 Z', fill: '#DA291C' },
      { d: 'M47 52 H53 V58 H47 Z', fill: '#DA291C' },
      { d: 'M25 25 A8 8 0 0 1 25 45 A8 8 0 0 1 25 25', fill: '#FFD700', stroke: '#046A38', strokeWidth: 1 },
    ],
  },
  {
    id: 'coat-es',
    label: 'Wappen Spanien',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M35 18 H65 V22 H35 Z', fill: '#C60B1E' },
      { d: 'M38 22 H48 V70 H38 Z', fill: '#C60B1E' },
      { d: 'M52 22 H62 V70 H52 Z', fill: '#FFC400' },
      { d: 'M38 22 H48 V45 H38 Z', fill: '#AD1519' },
      { d: 'M52 22 H62 V45', fill: 'none' },
      { d: 'M42 28 H44 V38 H42 Z M48 50 H52 V55 H48 Z', fill: '#FFC400' },
      { d: 'M30 70 H70 V78 H30 Z', fill: '#C60B1E' },
      { d: 'M45 12 H55 V18 H45 Z', fill: '#FFC400' },
    ],
  },
  {
    id: 'coat-ar',
    label: 'Sonne Argentinien',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M50 35 A15 15 0 1 1 49.9 35 Z', fill: '#F6B40E' },
      {
        d: 'M50 12 L52 28 L50 26 L48 28 Z M50 88 L52 72 L50 74 L48 72 Z M12 50 L28 48 L26 50 L28 52 Z M88 50 L72 48 L74 50 L72 52 Z M22 22 L33 33 L31 32 L32 34 Z M78 78 L67 67 L68 66 L66 67 Z M78 22 L67 33 L66 32 L68 34 Z M22 78 L33 67 L34 68 L32 66 Z M35 15 L40 30 L38 29 L37 31 Z M65 85 L60 70 L62 71 L63 69 Z M15 35 L30 40 L29 38 L31 37 Z M85 65 L70 60 L71 62 L69 63 Z',
        fill: '#F6B40E',
      },
      { d: 'M44 42 Q50 48 56 42 Q50 55 44 42', fill: '#843511' },
    ],
  },
  {
    id: 'coat-mx',
    label: 'Adler Mexiko',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M35 55 Q50 70 65 55 Q58 80 50 85 Q42 80 35 55 Z', fill: '#6B3E26' },
      { d: 'M40 40 L50 25 L60 40 L55 55 L45 55 Z', fill: '#8B5A2B' },
      { d: 'M48 25 L52 25 L55 18 L45 18 Z', fill: '#8B5A2B' },
      { d: 'M30 45 L40 48 L38 55 L28 50 Z', fill: '#8B5A2B' },
      { d: 'M70 45 L60 48 L62 55 L72 50 Z', fill: '#8B5A2B' },
      { d: 'M55 50 L75 55 L70 60 L55 55 Z', fill: '#CE1126' },
      { d: 'M42 70 Q50 65 58 70 Q50 78 42 70', fill: '#006847' },
    ],
  },
  {
    id: 'coat-de',
    label: 'Adler Deutschland',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M30 35 L40 30 L50 20 L60 30 L70 35 L65 50 L70 65 L55 60 L50 75 L45 60 L30 65 L35 50 Z', fill: '#000000' },
      { d: 'M42 28 L50 15 L58 28 L55 32 L45 32 Z', fill: '#000000' },
      { d: 'M45 35 H55 V40 H45 Z', fill: '#FFCE00' },
    ],
  },
  {
    id: 'coat-at',
    label: 'Adler Österreich',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M35 30 L45 25 L50 15 L55 25 L65 30 L60 50 L65 70 L50 65 L35 70 L40 50 Z', fill: '#000000' },
      { d: 'M42 40 H58 V48 H42 Z', fill: '#C8102E' },
      { d: 'M48 20 H52 V28 H48 Z', fill: '#FFD700' },
    ],
  },
  {
    id: 'coat-ru',
    label: 'Doppeladler Russland',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M25 40 L40 30 L50 35 L60 30 L75 40 L70 55 L75 70 L55 60 L50 75 L45 60 L25 70 L30 55 Z', fill: '#FFD700' },
      { d: 'M35 25 L42 35 L40 28 Z', fill: '#FFD700' },
      { d: 'M65 25 L58 35 L60 28 Z', fill: '#FFD700' },
      { d: 'M45 45 H55 V55 H45 Z', fill: '#C8102E' },
    ],
  },
  {
    id: 'coat-it',
    label: 'Emblem Italien',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M50 20 L55 35 L70 35 L58 45 L62 60 L50 50 L38 60 L42 45 L30 35 L45 35 Z', fill: '#008C45' },
      { d: 'M40 65 H60 V75 H40 Z', fill: '#CD212A' },
      { d: 'M45 55 H55 V65 H45 Z', fill: '#F4F5F0' },
    ],
  },
  {
    id: 'coat-fr',
    label: 'Emblem Frankreich',
    category: 'coat',
    colorable: false,
    paths: [
      { d: 'M40 25 H60 V70 H40 Z', fill: '#002395' },
      { d: 'M45 30 H55 V40 H45 Z', fill: '#ED2939' },
      { d: 'M42 45 H58 V50 H42 Z', fill: '#FFFFFF' },
      { d: 'M48 15 H52 V25 H48 Z', fill: '#FFD700' },
      { d: 'M35 70 H65 V78 Q50 85 35 78 Z', fill: '#002395' },
    ],
  },
]

export function getSymbol(id) {
  return SYMBOLS.find((s) => s.id === id) ?? null
}

export function getPosition(id) {
  return POSITIONS.find((p) => p.id === id) ?? POSITIONS[0]
}

export function getLayout(id) {
  return LAYOUTS.find((l) => l.id === id) ?? LAYOUTS[0]
}

export function symbolsByCategory(category) {
  return SYMBOLS.filter((s) => s.category === category)
}
