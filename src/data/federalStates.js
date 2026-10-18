export const federalStates = [
  { id: 'BW', name: 'Baden-Württemberg', capital: 'Stuttgart' },
  { id: 'BY', name: 'Bayern', capital: 'München' },
  { id: 'BE', name: 'Berlin', capital: 'Berlin' },
  { id: 'BB', name: 'Brandenburg', capital: 'Potsdam' },
  { id: 'HB', name: 'Bremen', capital: 'Bremen' },
  { id: 'HH', name: 'Hamburg', capital: 'Hamburg' },
  { id: 'HE', name: 'Hessen', capital: 'Wiesbaden' },
  { id: 'MV', name: 'Mecklenburg-Vorpommern', capital: 'Schwerin' },
  { id: 'NI', name: 'Niedersachsen', capital: 'Hannover' },
  { id: 'NW', name: 'Nordrhein-Westfalen', capital: 'Düsseldorf' },
  { id: 'RP', name: 'Rheinland-Pfalz', capital: 'Mainz' },
  { id: 'SL', name: 'Saarland', capital: 'Saarbrücken' },
  { id: 'SN', name: 'Sachsen', capital: 'Dresden' },
  { id: 'ST', name: 'Sachsen-Anhalt', capital: 'Magdeburg' },
  { id: 'SH', name: 'Schleswig-Holstein', capital: 'Kiel' },
  { id: 'TH', name: 'Thüringen', capital: 'Erfurt' },
]

// Accept ordinary German keyboard substitutions without accepting misspelled cities.
export function normalizeCapital(value) {
  return value.trim().toLocaleLowerCase('de-DE')
    .replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function matchesCapital(value, state) {
  return normalizeCapital(value) === normalizeCapital(state.capital)
}

export function shuffleStates(states = federalStates, random = Math.random) {
  const result = [...states]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
