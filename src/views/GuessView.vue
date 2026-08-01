<script setup>
import { ref, computed, onMounted } from 'vue'
import { countries, matchCountry, searchCountries, flagUrl } from '../data/countries.js'

const current = ref(null)
const input = ref('')
const score = ref(0)
const streak = ref(0)
const feedback = ref(null) // 'correct' | 'wrong' | null
const revealed = ref(false)
const suggestions = ref([])
const usedCodes = ref([])

function pickRandom() {
  const pool = countries.filter((c) => !usedCodes.value.includes(c.code))
  const list = pool.length ? pool : countries
  if (!pool.length) usedCodes.value = []
  return list[Math.floor(Math.random() * list.length)]
}

function nextRound() {
  current.value = pickRandom()
  usedCodes.value.push(current.value.code)
  input.value = ''
  feedback.value = null
  revealed.value = false
  suggestions.value = []
}

function onInput() {
  suggestions.value = searchCountries(input.value)
}

function selectSuggestion(country) {
  input.value = country.name
  suggestions.value = []
  submit()
}

function submit() {
  if (!current.value || feedback.value) return
  const match = matchCountry(input.value)
  if (match && match.code === current.value.code) {
    feedback.value = 'correct'
    score.value += 1 + Math.floor(streak.value / 3)
    streak.value += 1
  } else {
    feedback.value = 'wrong'
    revealed.value = true
    streak.value = 0
  }
}

function skip() {
  if (!current.value) return
  feedback.value = 'wrong'
  revealed.value = true
  streak.value = 0
}

function continueGame() {
  nextRound()
}

onMounted(nextRound)

const imageSrc = computed(() => (current.value ? flagUrl(current.value.code, 640) : ''))
</script>

<template>
  <div class="guess">
    <div class="stats">
      <div class="stat">
        <span class="stat-label">Punkte</span>
        <span class="stat-value">{{ score }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Streak</span>
        <span class="stat-value">{{ streak }}</span>
      </div>
    </div>

    <div class="flag-area" v-if="current">
      <img :src="imageSrc" :alt="'Flagge'" class="flag-img" />
    </div>

    <div v-if="feedback === 'correct'" class="feedback correct">
      Richtig! Das ist <strong>{{ current.name }}</strong>.
      <button class="btn btn-primary" @click="continueGame">Weiter</button>
    </div>

    <div v-else-if="feedback === 'wrong'" class="feedback wrong">
      {{ revealed ? `Die richtige Antwort: ${current.name}` : 'Falsch!' }}
      <button class="btn btn-primary" @click="continueGame">Weiter</button>
    </div>

    <form v-else class="guess-form" @submit.prevent="submit">
      <div class="input-wrap">
        <input
          v-model="input"
          type="text"
          placeholder="Ländername eingeben…"
          autocomplete="off"
          autofocus
          @input="onInput"
        />
        <ul v-if="suggestions.length" class="suggestions">
          <li
            v-for="s in suggestions"
            :key="s.code"
            @mousedown.prevent="selectSuggestion(s)"
          >
            {{ s.name }}
          </li>
        </ul>
      </div>
      <div class="actions">
        <button type="submit" class="btn btn-primary" :disabled="!input.trim()">Raten</button>
        <button type="button" class="btn btn-ghost" @click="skip">Überspringen</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.guess {
  max-width: 560px;
  margin: 0 auto;
}

.stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  text-align: center;
  min-width: 100px;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.flag-area {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.flag-img {
  max-width: 100%;
  width: 420px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
}

.guess-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-wrap {
  position: relative;
}

.input-wrap input {
  width: 100%;
  padding: 0.9rem 1rem;
  font-size: 1.05rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  color: var(--text);
  outline: none;
  box-sizing: border-box;
}

.input-wrap input:focus {
  border-color: var(--accent);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  z-index: 10;
  overflow: hidden;
}

.suggestions li {
  padding: 0.7rem 1rem;
  cursor: pointer;
}

.suggestions li:hover {
  background: var(--accent-soft);
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.feedback {
  text-align: center;
  padding: 1.25rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.feedback.correct {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
}

.feedback.wrong {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
}
</style>
