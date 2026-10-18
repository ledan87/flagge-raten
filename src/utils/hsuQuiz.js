export function normalizeAnswer(value) {
  return value.trim().toLocaleLowerCase('de-DE').normalize('NFC')
    .replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss')
    .replace(/[.!?]$/g, '').replace(/\s+/g, ' ')
}
export function isCorrectAnswer(question, answer) {
  if (question.type === 'choice') return answer === question.answer
  return [question.answer, ...(question.aliases || [])].some(a => normalizeAnswer(a) === normalizeAnswer(answer))
}
export function shuffle(values, random = Math.random) {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
// Round-robin topics after shuffling so a mixed round covers the whole study guide.
export function makeQuizRound(questions, count, random = Math.random) {
  const groups = new Map()
  for (const q of shuffle(questions, random)) {
    if (!groups.has(q.topic)) groups.set(q.topic, [])
    groups.get(q.topic).push(q)
  }
  const result = []
  const topics = shuffle([...groups.keys()], random)
  while (result.length < Math.min(count, questions.length)) {
    for (const topic of topics) {
      const q = groups.get(topic).pop()
      if (q) result.push({ ...q, options: q.options ? shuffle(q.options, random) : undefined })
      if (result.length >= count) break
    }
  }
  return result
}
