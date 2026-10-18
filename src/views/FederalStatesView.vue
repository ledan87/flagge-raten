<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GermanyMap from '../components/GermanyMap.vue'
import { federalStates, matchesCapital, shuffleStates } from '../data/federalStates.js'

const route = useRoute()
const mode = computed(() => route.params.mode)
const playing = computed(() => ['hauptstaedte', 'karte'].includes(mode.value))
const isMap = computed(() => mode.value === 'karte')
const rounds = ref([])
const index = ref(0)
const score = ref(0)
const streak = ref(0)
const input = ref('')
const inputElement = ref(null)
const continueButton = ref(null)
const feedback = ref(null)
const selected = ref(null)
const missed = ref([])
const current = computed(() => rounds.value[index.value])
const finished = computed(() => playing.value && index.value >= rounds.value.length)
const selectedState = computed(() => federalStates.find(s => s.id === selected.value))

function focusInput() { nextTick(() => inputElement.value?.focus()) }
function start(states = federalStates) {
  rounds.value = shuffleStates(states)
  index.value = score.value = streak.value = 0
  missed.value = []
  clearAnswer()
}
function clearAnswer() {
  input.value = ''
  selected.value = feedback.value = null
  focusInput()
}
function answer(correct) {
  if (!current.value || feedback.value) return
  feedback.value = correct ? 'correct' : 'wrong'
  if (correct) { score.value++; streak.value++ }
  else { streak.value = 0; missed.value.push(current.value) }
  nextTick(() => continueButton.value?.focus())
}
function submitCapital() {
  if (input.value.trim()) answer(matchesCapital(input.value, current.value))
}
function selectRegion(id) {
  if (feedback.value || !current.value) return
  selected.value = id
  answer(id === current.value.id)
}
function next() {
  index.value++
  clearAnswer()
}
watch(mode, () => start(), { immediate: true })
</script>

<template>
  <section class="states">
    <template v-if="!playing">
      <header class="intro">
        <span class="eyebrow">Deutschland entdecken</span>
        <h1>Unsere 16 Bundesländer</h1>
        <p>Wie heißen die Landeshauptstädte? Und wo liegen die Länder? Übe für deine nächste HSU-Probe.</p>
      </header>
      <div class="mode-grid">
        <router-link to="/bundeslaender/hauptstaedte" class="mode-card">
          <span class="mode-icon">🏛️</span><h2>Hauptstädte raten</h2>
          <p>Ein Bundesland wird genannt. Tippe seine Landeshauptstadt ein.</p>
          <span class="cta">16 Fragen · Los geht’s →</span>
        </router-link>
        <router-link to="/bundeslaender/karte" class="mode-card">
          <span class="mode-icon">🗺️</span><h2>Auf der Karte finden</h2>
          <p>Finde das gesuchte Bundesland auf einer unbeschrifteten Deutschlandkarte.</p>
          <span class="cta">16 Orte · Los geht’s →</span>
        </router-link>
      </div>
      <details class="learn">
        <summary>Erst lernen: alle Bundesländer und Hauptstädte</summary>
        <dl><div v-for="state in federalStates" :key="state.id"><dt>{{ state.name }}</dt><dd>{{ state.capital }}</dd></div></dl>
      </details>
    </template>
    <template v-else>
      <router-link class="back" to="/bundeslaender">← Zur Rubrik Bundesländer</router-link>
      <h1>{{ isMap ? 'Auf der Karte finden' : 'Hauptstädte raten' }}</h1>
      <section v-if="finished" class="panel result" aria-live="polite">
        <span class="mode-icon">{{ score === rounds.length ? '🏆' : '🌟' }}</span>
        <h2>Runde geschafft!</h2>
        <p><strong>{{ score }} von {{ rounds.length }}</strong> richtig.</p>
        <p v-if="!missed.length">Super! Du kennst dich richtig gut aus.</p>
        <template v-else>
          <h3>Diese Länder kannst du noch üben</h3>
          <ul><li v-for="state in missed" :key="state.id">{{ state.name }} – {{ state.capital }}</li></ul>
        </template>
        <div class="actions">
          <button v-if="missed.length" class="btn btn-primary" @click="start([...missed])">Fehler wiederholen ({{ missed.length }})</button>
          <button class="btn btn-ghost" @click="start()">Alle 16 noch einmal</button>
        </div>
      </section>
      <template v-else-if="current">
        <div class="stats" aria-label="Spielstand">
          <span>Frage <strong>{{ index + 1 }} / {{ rounds.length }}</strong></span>
          <span>Richtig <strong>{{ score }}</strong></span>
          <span>Serie <strong>{{ streak }}</strong></span>
        </div>
        <progress :value="index" :max="rounds.length" :aria-label="`${index} von ${rounds.length} Fragen abgeschlossen`" />
        <div class="panel" :class="{ 'map-panel': isMap }">
          <h2 class="question">{{ isMap ? 'Wo liegt' : 'Wie heißt die Hauptstadt von' }} <strong>{{ current.name }}</strong>?</h2>
          <template v-if="isMap">
            <p class="help">Tippe das passende Bundesland an. Die Kreise 1–3 vergrößern die Stadtstaaten.</p>
            <GermanyMap :disabled="!!feedback" :answer="feedback ? current.id : null" :selected="selected" @select="selectRegion" />
          </template>
          <form v-else-if="!feedback" @submit.prevent="submitCapital">
            <label for="capital">Landeshauptstadt</label>
            <input id="capital" ref="inputElement" v-model="input" placeholder="Deine Antwort …" autocomplete="off" autocapitalize="words" spellcheck="false" />
            <p class="help">Du kannst auch ae, oe und ue statt Umlauten schreiben.</p>
            <button class="btn btn-primary" :disabled="!input.trim()">Antwort prüfen</button>
          </form>
          <div v-if="feedback" class="feedback" :class="feedback" role="status">
            <strong>{{ feedback === 'correct' ? '✓ Richtig!' : 'Noch nicht richtig.' }}</strong>
            <span v-if="isMap && selectedState && feedback === 'wrong'">Du hast {{ selectedState.name }} gewählt.</span>
            <span v-if="isMap">{{ current.name }} ist auf der Karte grün markiert.</span>
            <span>Die Hauptstadt von {{ current.name }} ist <strong>{{ current.capital }}</strong>.</span>
            <button ref="continueButton" class="btn btn-primary" @click="next">{{ index + 1 === rounds.length ? 'Ergebnis ansehen' : 'Weiter' }}</button>
          </div>
          <button v-else class="btn btn-ghost skip" @click="answer(false)">Weiß ich noch nicht</button>
        </div>
        <p v-if="isMap" class="map-credit">Kartengrundlage: <a href="https://github.com/codeforgermany/click_that_hood/blob/main/public/data/germany.geojson" target="_blank" rel="noopener noreferrer">Click That ’Hood / BKG</a> · vereinfacht dargestellt.</p>
      </template>
    </template>
  </section>
</template>

<style scoped>
.states { max-width: 820px; margin: 0 auto; }
.intro { text-align: center; margin: 1rem auto 2rem; max-width: 600px; }
h1 { font-size: clamp(1.7rem, 5vw, 2.3rem); margin: .5rem 0 1rem; }
.intro p, .mode-card p, .help, .back { color: var(--text-muted); }
.eyebrow { color: #9ebdff; font-size: .8rem; text-transform: uppercase; letter-spacing: .12em; }
.mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
.mode-card, .panel, .learn { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; }
.mode-card { display: flex; flex-direction: column; color: inherit; text-decoration: none; }
.mode-card:hover { border-color: var(--accent); }
.mode-card h2 { font-size: 1.3rem; }
.mode-card p { flex: 1; }
.mode-icon { font-size: 2.5rem; }
.cta { color: #9ebdff; font-weight: 600; }
.learn { margin-top: 1.5rem; }
summary { cursor: pointer; font-weight: 600; }
dl > div { display: flex; justify-content: space-between; gap: 1rem; padding: .6rem 0; border-bottom: 1px solid var(--border); }
dd { margin: 0; color: #b7caff; }
.back { display: inline-block; margin-bottom: 1rem; }
.stats { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .6rem; font-size: .95rem; }
.stats strong { color: #b7caff; }
progress { width: 100%; height: 8px; accent-color: var(--accent); margin: 1rem 0; }
.question { font-size: clamp(1.25rem, 4vw, 1.6rem); font-weight: 400; margin: 0 0 1rem; }
.question strong { color: #b7caff; }
form label { display: block; margin-bottom: .5rem; }
input { width: 100%; padding: .85rem 1rem; color: var(--text); background: var(--bg); border: 2px solid var(--border); border-radius: 10px; font: inherit; }
input:focus { outline: 2px solid var(--accent); }
.help { font-size: .9rem; }
.skip { margin-top: 1rem; }
.feedback { display: flex; flex-direction: column; align-items: flex-start; gap: .7rem; padding: 1rem; border-radius: 12px; margin-top: 1rem; }
.feedback.correct { background: #123b31; border: 1px solid #348764; }
.feedback.wrong { background: #3c2331; border: 1px solid #a7596a; }
.map-panel { padding-bottom: 1rem; }
.map-panel .help { margin-bottom: 0; }
.map-credit { font-size: .75rem; text-align: center; color: var(--text-muted); }
.map-credit a { color: inherit; }
.actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }
.result ul { padding-left: 1.25rem; }
.result li { padding: .25rem 0; }
@media (max-width: 480px) {
  .panel, .mode-card, .learn { padding: 1rem; }
  dl > div { display: block; }
  dd { margin-top: .25rem; }
}
</style>
