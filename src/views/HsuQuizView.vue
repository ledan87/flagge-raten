<script setup>
import { computed, nextTick, ref } from 'vue'
import { hsuQuestions, hsuTopics } from '../data/hsuQuestions.js'
import { isCorrectAnswer, makeQuizRound } from '../utils/hsuQuiz.js'
import HsuVisual from '../components/HsuVisual.vue'

const topic = ref('all')
const count = ref(20)
const phase = ref('setup')
const rounds = ref([])
const index = ref(0)
const input = ref('')
const selected = ref(null)
const results = ref([])
const field = ref(null)
const nextButton = ref(null)
const heading = ref(null)
const questionHeading = ref(null)
const answered = ref(false)
const pool = computed(() => topic.value === 'all' ? hsuQuestions : hsuQuestions.filter(q => q.topic === topic.value))
const current = computed(() => rounds.value[index.value])
const correctCount = computed(() => results.value.filter(r => r.correct).length)
const missed = computed(() => results.value.filter(r => !r.correct).map(r => r.question))
const currentResult = computed(() => answered.value ? results.value.at(-1) : null)
const topicName = id => hsuTopics.find(t => t.id === id)?.name
const breakdown = computed(() => hsuTopics.map(t => {
  const entries = results.value.filter(r => r.question.topic === t.id)
  return { ...t, total: entries.length, correct: entries.filter(r => r.correct).length }
}).filter(t => t.total))

function focusQuestion() {
  nextTick(() => (field.value || questionHeading.value)?.focus())
}
function resetAnswer() {
  input.value = ''
  selected.value = null
  answered.value = false
  focusQuestion()
}
function start(questions = pool.value, size = Number(count.value)) {
  rounds.value = makeQuizRound(questions, Math.min(size, questions.length))
  index.value = 0
  results.value = []
  phase.value = 'playing'
  resetAnswer()
}
function submit(value) {
  if (answered.value || !current.value || !String(value).trim()) return
  selected.value = value
  results.value.push({ question: current.value, correct: isCorrectAnswer(current.value, value), given: value })
  answered.value = true
  nextTick(() => nextButton.value?.focus())
}
function skip() {
  if (answered.value) return
  results.value.push({ question: current.value, correct: false, given: null })
  answered.value = true
  nextTick(() => nextButton.value?.focus())
}
function next() {
  if (!answered.value) return
  if (index.value + 1 >= rounds.value.length) {
    phase.value = 'result'
    nextTick(() => heading.value?.focus())
  } else { index.value++; resetAnswer() }
}
function menu() { phase.value = 'setup'; nextTick(() => heading.value?.focus()) }
</script>

<template>
  <section class="hsu">
    <header>
      <p class="eyebrow">Üben für die HSU-Probe · 4. Klasse</p>
      <h1 ref="heading" tabindex="-1">{{ phase === 'result' ? 'Deine Auswertung' : 'HSU-Quiz' }}</h1>
    </header>
    <template v-if="phase === 'setup'">
      <p class="intro">Teste dein Wissen aus dem Merkheft: mit Fragen, Kartenzeichen und kleinen Zeichnungen. Nach jeder Antwort erfährst du, warum sie stimmt.</p>
      <div class="panel setup">
        <fieldset>
          <legend>Was möchtest du üben?</legend>
          <div class="topics">
            <label :class="{ active: topic === 'all' }"><input v-model="topic" type="radio" value="all" name="topic" /><span>📚 Alle Themen gemischt</span> <small>{{ hsuQuestions.length }} Fragen</small></label>
            <label v-for="t in hsuTopics" :key="t.id" :class="{ active: topic === t.id }"><input v-model="topic" type="radio" :value="t.id" name="topic" /><span>{{ t.icon }} {{ t.name }}</span> <small>{{ hsuQuestions.filter(q => q.topic === t.id).length }} Fragen</small></label>
          </div>
        </fieldset>
        <label class="length" for="round-count">Länge deiner Runde
          <select id="round-count" v-model="count"><option :value="10">Bis zu 10 Fragen</option><option :value="20">Bis zu 20 Fragen</option><option :value="hsuQuestions.length">Alle Fragen zum Thema</option></select>
        </label>
        <p class="help">{{ Math.min(Number(count), pool.length) }} Fragen · ohne Zeitdruck · Freitext und Auswahlfragen</p>
        <button class="btn btn-primary" @click="start()">Quiz starten</button>
      </div>
      <p class="help">Zum Merkheft passend zusammengestellt. Die tatsächlichen Fragen der Klassenarbeit können anders aussehen.</p>
      <router-link to="/bundeslaender/karte" class="related">Auch üben: Bundesländer auf der Karte finden →</router-link>
    </template>

    <template v-else-if="phase === 'playing' && current">
      <div class="stats"><span>Frage <strong>{{ index + 1 }} / {{ rounds.length }}</strong></span><span>Richtig: <strong>{{ correctCount }}</strong></span><button class="text-button" @click="menu">Zur Themenauswahl</button></div>
      <progress :value="results.length" :max="rounds.length" :aria-label="`${results.length} von ${rounds.length} Fragen beantwortet`" />
      <article class="panel" :data-question-id="current.id">
        <span class="eyebrow">{{ topicName(current.topic) }}</span>
        <h2 ref="questionHeading" tabindex="-1" class="question">{{ current.prompt }}</h2>
        <HsuVisual v-if="current.visual" :visual="current.visual" />
        <div v-if="current.type === 'choice'" class="options" role="group" aria-label="Wähle eine Antwort">
          <button v-for="option in current.options" :key="option" class="option" :disabled="answered"
            :class="{ correct: answered && option === current.answer, wrong: answered && selected === option && option !== current.answer }"
            @click="submit(option)">
            <span>{{ option }}</span><span v-if="answered && option === current.answer" aria-label="Richtige Antwort">✓</span><span v-else-if="answered && selected === option" aria-label="Falsche Antwort">✗</span>
          </button>
        </div>
        <form v-else-if="!answered" @submit.prevent="submit(input)">
          <label for="hsu-answer">Deine Antwort</label>
          <input id="hsu-answer" ref="field" v-model="input" type="text" autocomplete="off" spellcheck="false" placeholder="Hier eingeben …" />
          <p class="help">Groß- und Kleinschreibung ist egal. Auch ae, oe und ue sind erlaubt.</p>
          <button type="submit" class="btn btn-primary" :disabled="!input.trim()">Antwort prüfen</button>
        </form>
        <div v-if="answered" class="feedback" :class="currentResult.correct ? 'correct' : 'wrong'" role="status">
          <strong>{{ currentResult.correct ? '✓ Richtig!' : currentResult.given === null ? 'Das kannst du dir merken:' : 'Noch nicht richtig.' }}</strong>
          <p v-if="!currentResult.correct">Richtige Antwort: <strong>{{ current.answer }}</strong></p>
          <p>{{ current.explanation }}</p>
          <button ref="nextButton" class="btn btn-primary" @click="next">{{ index + 1 === rounds.length ? 'Auswertung ansehen' : 'Nächste Frage' }}</button>
        </div>
        <button v-else class="btn btn-ghost skip" @click="skip">Weiß ich noch nicht</button>
      </article>
    </template>

    <section v-else-if="phase === 'result'" class="panel result">
      <p class="result-score">{{ correctCount }} <span>von {{ rounds.length }} richtig</span></p>
      <p>{{ missed.length ? 'Gut geübt! Die noch schwierigen Fragen kannst du gleich wiederholen.' : 'Super! Du hast alle Fragen dieser Runde richtig beantwortet.' }}</p>
      <h2>So lief es in den einzelnen Themen</h2>
      <ul class="breakdown"><li v-for="t in breakdown" :key="t.id"><span>{{ t.icon }} {{ t.name }}</span><strong>{{ t.correct }} / {{ t.total }}</strong></li></ul>
      <div class="actions">
        <button v-if="missed.length" class="btn btn-primary" @click="start([...missed], missed.length)">Fehler wiederholen ({{ missed.length }})</button>
        <button class="btn btn-ghost" @click="start()">Neue Runde</button>
        <button class="btn btn-ghost" @click="menu">Thema wechseln</button>
      </div>
      <details v-if="missed.length" class="review"><summary>Fragen zum Nachlesen ({{ missed.length }})</summary><article v-for="r in results.filter(r => !r.correct)" :key="r.question.id"><h3>{{ r.question.prompt }}</h3><HsuVisual v-if="r.question.visual" :visual="r.question.visual" /><p>Deine Antwort: {{ r.given ?? 'Weiß ich noch nicht' }}</p><p><strong>{{ r.question.answer }}</strong> – {{ r.question.explanation }}</p></article></details>
    </section>
  </section>
</template>

<style scoped>
.hsu { max-width: 820px; margin: 0 auto; }
h1 { font-size: clamp(1.9rem, 5vw, 2.6rem); margin: .4rem 0 1rem; outline: none; }
.eyebrow { text-transform: uppercase; letter-spacing: .08em; font-size: .75rem; color: #b2caff; }
.intro, .help { color: var(--text-muted); }
.panel { padding: 1.6rem; border: 1px solid var(--border); border-radius: 16px; background: var(--card); }
fieldset { padding: 0; margin: 0 0 1.5rem; border: 0; }
legend { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; }
.topics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem; }
.topics label { display: grid; grid-template-columns: 18px minmax(0, 1fr); align-items: center; gap: .5rem; padding: .8rem; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; }
.topics label.active { border-color: #9ebdff; background: var(--accent-soft); }
.topics input { accent-color: var(--accent); }
.topics small { grid-column: 2; color: var(--text-muted); }
.length { display: flex; align-items: center; flex-wrap: wrap; gap: .8rem; }
select, input[type='text'] { padding: .8rem; background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 9px; font: inherit; max-width: 100%; }
.help { font-size: .85rem; }
.related { color: #b2caff; }
.stats { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: center; gap: .6rem; }
.text-button { background: none; border: none; color: #b2caff; cursor: pointer; font: inherit; font-size: .85rem; text-decoration: underline; padding: .5rem 0; }
progress { width: 100%; height: 8px; margin: 1rem 0; accent-color: var(--accent); }
.question { font-size: clamp(1.2rem, 4vw, 1.5rem); margin: .7rem 0 1.25rem; outline: none; scroll-margin-top: 12rem; }
.options { display: grid; gap: .65rem; }
.option { display: flex; align-items: center; justify-content: space-between; gap: 1rem; text-align: left; width: 100%; min-height: 54px; padding: .9rem 1rem; background: #122035; color: var(--text); border: 1px solid #526a8a; border-radius: 10px; font: inherit; cursor: pointer; }
.option:enabled:hover { border-color: #b2caff; background: #233c5c; }
.option:disabled { cursor: default; }
.option.correct, .feedback.correct { background: #123b31; border: 1px solid #54b18a; }
.option.wrong, .feedback.wrong { background: #3c2331; border: 1px solid #d18594; }
form label { display: block; margin-bottom: .5rem; }
input[type='text'] { display: block; width: 100%; }
.feedback { margin-top: 1.3rem; padding: 1rem; border-radius: 10px; }
.feedback p { margin: .6rem 0; }
.feedback .btn { margin-top: .6rem; }
.skip { margin-top: 1rem; }
.result-score { font-size: 3rem; font-weight: 700; color: #b2caff; margin: 0; }
.result-score span { font-size: 1.1rem; font-weight: 400; color: var(--text); }
.result h2 { font-size: 1.1rem; margin-top: 1.5rem; }
.breakdown { padding: 0; list-style: none; }
.breakdown li { display: flex; justify-content: space-between; gap: 1rem; padding: .7rem 0; border-bottom: 1px solid var(--border); }
.breakdown strong { white-space: nowrap; }
.actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1.5rem; }
.review { margin-top: 1.5rem; }
summary { cursor: pointer; padding: .5rem 0; }
.review article { padding: 1rem 0; border-bottom: 1px solid var(--border); }
.review h3 { font-size: 1rem; }
@media(max-width: 560px) { .topics { grid-template-columns: 1fr; } .panel { padding: 1rem; } }
</style>
