import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { federalStates, matchesCapital, shuffleStates } from '../src/data/federalStates.js'

const expected = {
  'Baden-Württemberg': 'Stuttgart', Bayern: 'München', Berlin: 'Berlin', Brandenburg: 'Potsdam',
  Bremen: 'Bremen', Hamburg: 'Hamburg', Hessen: 'Wiesbaden', 'Mecklenburg-Vorpommern': 'Schwerin',
  Niedersachsen: 'Hannover', 'Nordrhein-Westfalen': 'Düsseldorf', 'Rheinland-Pfalz': 'Mainz',
  Saarland: 'Saarbrücken', Sachsen: 'Dresden', 'Sachsen-Anhalt': 'Magdeburg',
  'Schleswig-Holstein': 'Kiel', Thüringen: 'Erfurt',
}
test('all 16 federal states have the correct capital and unique IDs', () => {
  assert.deepEqual(Object.fromEntries(federalStates.map(s => [s.name, s.capital])), expected)
  assert.equal(new Set(federalStates.map(s => s.id)).size, 16)
})
test('capital guesses tolerate case, outer whitespace and German keyboard substitutions', () => {
  for (const [id, input] of [['BY', '  MUENCHEN '], ['NW', 'duesseldorf'], ['SL', 'SAARBRUECKEN'], ['HE', 'wiesbaden']]) {
    assert.ok(matchesCapital(input, federalStates.find(s => s.id === id)))
  }
  assert.ok(!matchesCapital('Berlin', federalStates.find(s => s.id === 'BB')))
  assert.ok(!matchesCapital('Munch', federalStates.find(s => s.id === 'BY')))
  assert.ok(!matchesCapital('', federalStates[0]))
})
test('rounds include every requested state once without mutating the source', () => {
  const original = [...federalStates]
  const round = shuffleStates(federalStates, () => 0)
  assert.deepEqual(federalStates, original)
  assert.equal(round.length, 16)
  assert.equal(new Set(round.map(s => s.id)).size, 16)
  assert.notDeepEqual(round, original)
  const retry = shuffleStates([federalStates[0], federalStates[7]])
  assert.deepEqual(new Set(retry), new Set([federalStates[0], federalStates[7]]))
  assert.deepEqual(shuffleStates([]), [])
})
test('the bundled map has exactly one valid geometry for every quiz state', () => {
  const paths = JSON.parse(readFileSync(new URL('../src/data/stateMap.json', import.meta.url)))
  assert.deepEqual(paths.map(s => s.id).sort(), federalStates.map(s => s.id).sort())
  for (const { d } of paths) {
    assert.match(d, /^M[\d.,LZM-]+Z$/)
    assert.ok(!d.includes('NaN'))
  }
})
