import test from 'node:test'
import assert from 'node:assert/strict'
import { hsuQuestions, hsuTopics } from '../src/data/hsuQuestions.js'
import { isCorrectAnswer, makeQuizRound } from '../src/utils/hsuQuiz.js'

test('HSU bank contains unique, complete questions and valid unambiguous answer choices', () => {
  assert.equal(hsuQuestions.length, 59)
  assert.equal(new Set(hsuQuestions.map(q => q.id)).size, hsuQuestions.length)
  for (const q of hsuQuestions) {
    assert.ok(hsuTopics.some(t => t.id === q.topic), q.id)
    assert.ok(q.prompt && q.answer && q.explanation, q.id)
    assert.ok(isCorrectAnswer(q, q.answer), q.id)
    assert.ok(!isCorrectAnswer(q, 'garantiert nicht die Antwort'), q.id)
    if (q.type === 'choice') {
      assert.equal(q.options.length, 4, q.id)
      assert.equal(new Set(q.options).size, 4, q.id)
      assert.equal(q.options.filter(o => isCorrectAnswer(q, o)).length, 1, q.id)
    }
  }
})
test('written answers support keyboard substitutions, decomposed accents and meaningful units', () => {
  for (const [id, answer] of [['capital-BY', '  MUENCHEN  '], ['capital-SL', 'Saarbru\u0308cken'], ['sunrise', 'im Osten'], ['height-interval', '100 Meter'], ['state-count', 'sechzehn']]) {
    assert.ok(isCorrectAnswer(hsuQuestions.find(q => q.id === id), answer), id)
  }
  assert.ok(!isCorrectAnswer(hsuQuestions.find(q => q.id === 'founded'), '194'))
  assert.ok(!isCorrectAnswer(hsuQuestions.find(q => q.id === 'state-count'), '160'))
})
test('mixed rounds cover all topics evenly without repeats or changes to source data', () => {
  const before = JSON.stringify(hsuQuestions)
  const round = makeQuizRound(hsuQuestions, 20, () => 0.3)
  assert.equal(round.length, 20)
  assert.equal(new Set(round.map(q => q.id)).size, 20)
  for (const t of hsuTopics) assert.equal(round.filter(q => q.topic === t.id).length, 4)
  assert.equal(JSON.stringify(hsuQuestions), before)
  assert.ok(round.filter(q => q.options).some(q => q.options[0] !== q.answer))
})
test('topic rounds, the full bank and a retry contain precisely the requested questions', () => {
  for (const t of hsuTopics) {
    const pool = hsuQuestions.filter(q => q.topic === t.id)
    const round = makeQuizRound(pool, 100)
    assert.equal(round.length, pool.length)
    assert.ok(round.every(q => q.topic === t.id))
  }
  assert.equal(makeQuizRound(hsuQuestions, 100).length, hsuQuestions.length)
  assert.deepEqual(makeQuizRound([], 10), [])
  const retry = [hsuQuestions[0], hsuQuestions[22]]
  assert.deepEqual(new Set(makeQuizRound(retry, retry.length).map(q => q.id)), new Set(retry.map(q => q.id)))
})
