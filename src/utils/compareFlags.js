/** Vergleicht gebaute Flagge mit Zielddefinition */

function colorsMatch(a, b) {
  if (!a || !b) return false
  return a.toUpperCase() === b.toUpperCase()
}

function sortedColorKey(colors) {
  return [...colors].map((c) => (c || '').toUpperCase()).sort().join('|')
}

function hasAssignableColors(target) {
  const colors = target.colors || []
  if (target.layout === 'plain' || colors.length <= 1) return false
  return true
}

function matchSymbolPositions(builtSymbols, targetSymbols) {
  const remaining = builtSymbols.map((s) => ({ ...s, used: false }))
  return targetSymbols.every((ts) => {
    const idx = remaining.findIndex(
      (bs) => !bs.used && bs.type === ts.type && bs.position === ts.position,
    )
    if (idx === -1) return false
    remaining[idx].used = true
    return true
  })
}

/**
 * Punkte:
 * - richtiges Layout (+1)
 * - richtige Farben (+1, Farbsatz unabhängig von Reihenfolge)
 * - Farben richtig zugeordnet (+1, nicht bei einfarbigen Flaggen)
 * - Symbol(e) richtig ausgewählt (+1, falls Ziel Symbole hat)
 * - Platz des Symbols richtig (+1, falls Ziel Symbole hat)
 *
 * @returns {{ score: number, maxScore: number, details: { label: string, ok: boolean }[] }}
 */
export function compareFlags(built, target) {
  const details = []
  let score = 0
  let maxScore = 0

  const targetColors = target.colors || []
  const builtColors = built.colors || []
  const targetSymbols = target.symbols || []
  const builtSymbols = built.symbols || []

  maxScore += 1
  const layoutOk = built.layout === target.layout
  if (layoutOk) score += 1
  details.push({ label: 'Richtiges Layout', ok: layoutOk })

  maxScore += 1
  const colorsOk =
    targetColors.length === builtColors.length &&
    sortedColorKey(targetColors) === sortedColorKey(builtColors)
  if (colorsOk) score += 1
  details.push({ label: 'Richtige Farben', ok: colorsOk })

  if (hasAssignableColors(target)) {
    maxScore += 1
    const assignedOk =
      targetColors.length === builtColors.length &&
      targetColors.every((c, i) => colorsMatch(builtColors[i], c))
    if (assignedOk) score += 1
    details.push({ label: 'Farben richtig zugeordnet', ok: assignedOk })
  }

  if (targetSymbols.length > 0) {
    maxScore += 1
    const builtTypes = [...builtSymbols.map((s) => s.type)].sort()
    const targetTypes = [...targetSymbols.map((s) => s.type)].sort()
    const symbolsOk =
      builtTypes.length === targetTypes.length &&
      builtTypes.every((t, i) => t === targetTypes[i])
    if (symbolsOk) score += 1
    details.push({
      label: targetSymbols.length === 1 ? 'Symbol richtig ausgewählt' : 'Symbole richtig ausgewählt',
      ok: symbolsOk,
    })

    maxScore += 1
    const positionsOk = symbolsOk && matchSymbolPositions(builtSymbols, targetSymbols)
    if (positionsOk) score += 1
    details.push({
      label:
        targetSymbols.length === 1
          ? 'Platz des Symbols richtig'
          : 'Plätze der Symbole richtig',
      ok: positionsOk,
    })
  }

  return {
    score,
    maxScore,
    details,
    percent: maxScore ? Math.round((score / maxScore) * 100) : 0,
  }
}
