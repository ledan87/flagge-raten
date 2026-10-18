// Rebuild the bundled SVG geometry from the attributed local GeoJSON.
import { readFileSync, writeFileSync } from 'node:fs'
import { federalStates } from '../src/data/federalStates.js'
const source = JSON.parse(readFileSync(new URL('../public/data/germany.geojson', import.meta.url)))
const project = ([lon, lat]) => [40 + (lon - 5.8) * 51, 30 + (55.1 - lat) * 82]
const paths = source.features.map(({ properties, geometry }) => {
  const state = federalStates.find(s => s.name === properties.name)
  if (!state) throw new Error(`Unknown state: ${properties.name}`)
  const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates]
  const d = polygons.flatMap(polygon => polygon.map(ring => {
    const points = ring.map(project).map(p => p.map(v => v.toFixed(1)).join(','))
      .filter((p, i, all) => i === 0 || p !== all[i - 1])
    return `M${points.join('L')}Z`
  })).join('')
  return { id: state.id, d }
})
writeFileSync(new URL('../src/data/stateMap.json', import.meta.url), JSON.stringify(paths) + '\n')
