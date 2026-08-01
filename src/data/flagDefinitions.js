/** Kuratierte Flaggen-Definitionen – nur Palette-Farben aus symbols.js */

import { COLORS } from './symbols.js'

const { black, white, red, blue, lightBlue, green, yellow, orange } = COLORS

export const flagDefinitions = [
  // Einfache Streifen ohne Symbole
  { code: 'de', layout: 'horizontal-3', colors: [black, red, yellow], symbols: [] },
  { code: 'fr', layout: 'vertical-3', colors: [blue, white, red], symbols: [] },
  { code: 'it', layout: 'vertical-3', colors: [green, white, red], symbols: [] },
  { code: 'be', layout: 'vertical-3', colors: [black, yellow, red], symbols: [] },
  { code: 'ie', layout: 'vertical-3', colors: [green, white, orange], symbols: [] },
  { code: 'ro', layout: 'vertical-3', colors: [blue, yellow, red], symbols: [] },
  { code: 'nl', layout: 'horizontal-3', colors: [red, white, blue], symbols: [] },
  { code: 'ru', layout: 'horizontal-3', colors: [white, blue, red], symbols: [] },
  { code: 'at', layout: 'horizontal-3', colors: [red, white, red], symbols: [] },
  { code: 'hu', layout: 'horizontal-3', colors: [red, white, green], symbols: [] },
  { code: 'bg', layout: 'horizontal-3', colors: [white, green, red], symbols: [] },
  { code: 'ee', layout: 'horizontal-3', colors: [blue, black, white], symbols: [] },
  { code: 'lt', layout: 'horizontal-3', colors: [yellow, green, red], symbols: [] },
  { code: 'lv', layout: 'horizontal-3', colors: [red, white, red], symbols: [] },
  { code: 'lu', layout: 'horizontal-3', colors: [red, white, lightBlue], symbols: [] },
  { code: 'pl', layout: 'horizontal-2', colors: [white, red], symbols: [] },
  { code: 'ua', layout: 'horizontal-2', colors: [blue, yellow], symbols: [] },
  { code: 'id', layout: 'horizontal-2', colors: [red, white], symbols: [] },
  { code: 'mc', layout: 'horizontal-2', colors: [red, white], symbols: [] },
  { code: 'pe', layout: 'vertical-3', colors: [red, white, red], symbols: [] },
  { code: 'ng', layout: 'vertical-3', colors: [green, white, green], symbols: [] },
  { code: 'ci', layout: 'vertical-3', colors: [orange, white, green], symbols: [] },
  { code: 'ml', layout: 'vertical-3', colors: [green, yellow, red], symbols: [] },
  { code: 'gn', layout: 'vertical-3', colors: [red, yellow, green], symbols: [] },
  { code: 'ye', layout: 'horizontal-3', colors: [red, white, black], symbols: [] },
  { code: 'si', layout: 'horizontal-3', colors: [white, blue, red], symbols: [] },
  { code: 'am', layout: 'horizontal-3', colors: [red, blue, yellow], symbols: [] },
  { code: 'co', layout: 'horizontal-3', colors: [yellow, blue, red], symbols: [] },
  { code: 'ga', layout: 'horizontal-3', colors: [green, yellow, blue], symbols: [] },
  { code: 'td', layout: 'vertical-3', colors: [blue, yellow, red], symbols: [] },

  // Mit geometrischen Symbolen
  {
    code: 'jp',
    layout: 'plain',
    colors: [white],
    symbols: [{ type: 'circle', color: red, position: 'center', size: 0.45 }],
  },
  {
    code: 'bd',
    layout: 'plain',
    colors: [green],
    symbols: [{ type: 'circle', color: red, position: 'center-left', size: 0.45 }],
  },
  {
    code: 'ch',
    layout: 'plain',
    colors: [red],
    symbols: [{ type: 'cross', color: white, position: 'center', size: 0.55 }],
  },
  {
    code: 'tr',
    layout: 'plain',
    colors: [red],
    symbols: [
      { type: 'crescent', color: white, position: 'center-left', size: 0.5 },
      { type: 'star', color: white, position: 'center', size: 0.22 },
    ],
  },
  {
    code: 'vn',
    layout: 'plain',
    colors: [red],
    symbols: [{ type: 'star', color: yellow, position: 'center', size: 0.45 }],
  },
  {
    code: 'ma',
    layout: 'plain',
    colors: [red],
    symbols: [{ type: 'star', color: green, position: 'center', size: 0.4 }],
  },
  {
    code: 'so',
    layout: 'plain',
    colors: [lightBlue],
    symbols: [{ type: 'star', color: white, position: 'center', size: 0.4 }],
  },
  {
    code: 'gh',
    layout: 'horizontal-3',
    colors: [red, yellow, green],
    symbols: [{ type: 'star', color: black, position: 'center', size: 0.28 }],
  },
  {
    code: 'sn',
    layout: 'vertical-3',
    colors: [green, yellow, red],
    symbols: [{ type: 'star', color: green, position: 'center', size: 0.25 }],
  },
  {
    code: 'cm',
    layout: 'vertical-3',
    colors: [green, red, yellow],
    symbols: [{ type: 'star', color: yellow, position: 'center', size: 0.25 }],
  },
  {
    code: 'cn',
    layout: 'plain',
    colors: [red],
    symbols: [{ type: 'star', color: yellow, position: 'top-left', size: 0.28 }],
  },
  {
    code: 'pk',
    layout: 'vertical-2-uneven',
    colors: [white, green],
    symbols: [
      { type: 'crescent', color: white, position: 'center', size: 0.4 },
      { type: 'star', color: white, position: 'center-right', size: 0.15 },
    ],
  },
  {
    code: 'tn',
    layout: 'plain',
    colors: [red],
    symbols: [
      { type: 'circle', color: white, position: 'center', size: 0.5 },
      { type: 'crescent', color: red, position: 'center', size: 0.32 },
      { type: 'star', color: red, position: 'center', size: 0.15 },
    ],
  },
  {
    code: 'pw',
    layout: 'plain',
    colors: [lightBlue],
    symbols: [{ type: 'circle', color: yellow, position: 'center-left', size: 0.4 }],
  },

  // Nordische Kreuze
  { code: 'se', layout: 'nordic-cross', colors: [blue, yellow], symbols: [] },
  { code: 'dk', layout: 'nordic-cross', colors: [red, white], symbols: [] },
  { code: 'fi', layout: 'nordic-cross', colors: [white, blue], symbols: [] },
  { code: 'no', layout: 'nordic-cross-bordered', colors: [red, white, blue], symbols: [] },
  { code: 'is', layout: 'nordic-cross-bordered', colors: [blue, white, red], symbols: [] },

  // Canton-Flaggen
  {
    code: 'us',
    layout: 'canton-stripes',
    colors: [blue, red, white, red, white, red],
    symbols: [{ type: 'star', color: white, position: 'top-left', size: 0.22 }],
  },
  {
    code: 'my',
    layout: 'canton-stripes',
    colors: [blue, red, white, red, white, red],
    symbols: [
      { type: 'crescent', color: yellow, position: 'top-left', size: 0.28 },
      { type: 'star', color: yellow, position: 'top-left', size: 0.14 },
    ],
  },
  {
    code: 'au',
    layout: 'canton-plain',
    colors: [blue, blue],
    symbols: [
      { type: 'star', color: white, position: 'top-left', size: 0.18 },
      { type: 'star', color: white, position: 'center-right', size: 0.2 },
    ],
  },
  {
    code: 'nz',
    layout: 'canton-plain',
    colors: [blue, blue],
    symbols: [
      { type: 'star', color: red, position: 'center-right', size: 0.18 },
      { type: 'star', color: red, position: 'top', size: 0.14 },
    ],
  },
  {
    code: 'fj',
    layout: 'canton-plain',
    colors: [blue, lightBlue],
    symbols: [{ type: 'star', color: white, position: 'top-left', size: 0.16 }],
  },

  // Weitere Speziallayouts
  {
    code: 'cz',
    layout: 'hoist-triangle',
    colors: [blue, white, red],
    symbols: [],
  },
  {
    code: 'bh',
    layout: 'serrated-hoist',
    colors: [white, red],
    symbols: [],
  },
  {
    code: 'qa',
    layout: 'serrated-hoist',
    colors: [white, red],
    symbols: [],
  },

  // Mit Wappen
  {
    code: 'pt',
    layout: 'vertical-2-uneven',
    colors: [green, red],
    symbols: [{ type: 'coat-pt', color: null, position: 'boundary', size: 0.55 }],
  },
  {
    code: 'es',
    layout: 'horizontal-3',
    colors: [red, yellow, red],
    symbols: [{ type: 'coat-es', color: null, position: 'center-left', size: 0.5 }],
  },
  {
    code: 'ar',
    layout: 'horizontal-3',
    colors: [lightBlue, white, lightBlue],
    symbols: [{ type: 'coat-ar', color: null, position: 'center', size: 0.4 }],
  },
  {
    code: 'mx',
    layout: 'vertical-3',
    colors: [green, white, red],
    symbols: [{ type: 'coat-mx', color: null, position: 'center', size: 0.5 }],
  },
  {
    code: 'ca',
    layout: 'vertical-3',
    colors: [red, white, red],
    symbols: [{ type: 'maple', color: red, position: 'center', size: 0.5 }],
  },
]

export function getFlagDefinition(code) {
  return flagDefinitions.find((f) => f.code === code) ?? null
}

export function randomFlagDefinition(excludeCodes = []) {
  const pool = flagDefinitions.filter((f) => !excludeCodes.includes(f.code))
  if (!pool.length) return flagDefinitions[Math.floor(Math.random() * flagDefinitions.length)]
  return pool[Math.floor(Math.random() * pool.length)]
}
