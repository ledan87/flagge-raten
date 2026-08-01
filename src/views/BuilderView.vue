<script setup>
import { ref, computed, onMounted } from 'vue'
import FlagCanvas from '../components/FlagCanvas.vue'
import LayoutPicker from '../components/LayoutPicker.vue'
import ColorPicker from '../components/ColorPicker.vue'
import SymbolPicker from '../components/SymbolPicker.vue'
import { getCountryByCode, flagUrl } from '../data/countries.js'
import { randomFlagDefinition } from '../data/flagDefinitions.js'
import {
  COLOR_PALETTE,
  LAYOUTS,
  POSITIONS,
  symbolsByCategory,
  getLayout,
} from '../data/symbols.js'
import { compareFlags } from '../utils/compareFlags.js'

const target = ref(null)
const country = ref(null)
const result = ref(null)
const score = ref(0)
const round = ref(0)
const usedCodes = ref([])
const selectedSymbolIdx = ref(-1)
const selectedColor = ref(COLOR_PALETTE.find((c) => c.id === 'red').hex)

const built = ref({
  layout: 'plain',
  colors: ['#FFFFFF'],
  symbols: [],
})

const geometric = symbolsByCategory('geometric')
const coats = symbolsByCategory('coat')
const stripeCount = computed(() => getLayout(built.value.layout).stripes)

function syncColors() {
  const n = stripeCount.value
  const colors = [...built.value.colors]
  while (colors.length < n) colors.push('#FFFFFF')
  built.value.colors = colors.slice(0, n)
}

function setLayout(id) {
  built.value.layout = id
  syncColors()
}

function setColor(index, hex) {
  const colors = [...built.value.colors]
  while (colors.length <= index) colors.push('#FFFFFF')
  colors[index] = hex
  built.value.colors = colors
}

function addSymbol(type) {
  built.value.symbols.push({
    type,
    color: type.startsWith('coat-') ? null : '#FFFFFF',
    position: 'center',
    size: 0.4,
  })
  selectedSymbolIdx.value = built.value.symbols.length - 1
}

function removeSymbol(idx) {
  built.value.symbols.splice(idx, 1)
  selectedSymbolIdx.value = -1
}

function startRound() {
  target.value = randomFlagDefinition(usedCodes.value)
  usedCodes.value.push(target.value.code)
  if (usedCodes.value.length >= 40) usedCodes.value = []
  country.value = getCountryByCode(target.value.code)
  built.value = { layout: 'plain', colors: ['#FFFFFF'], symbols: [] }
  selectedSymbolIdx.value = -1
  result.value = null
  round.value += 1
}

function check() {
  result.value = compareFlags(built.value, target.value)
  score.value += result.value.score
}

onMounted(startRound)
</script>

<template>
  <div class="builder" v-if="target && country">
    <header class="builder-top">
      <div class="stats">
        <div class="stat">
          <span class="stat-label">Runde</span>
          <span class="stat-value">{{ round }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Punkte</span>
          <span class="stat-value">{{ score }}</span>
        </div>
      </div>
      <p class="prompt">Baue die Flagge von <strong>{{ country.name }}</strong></p>
    </header>

    <div v-if="result" class="result-layout">
      <div class="compare">
        <div class="preview-box">
          <span class="preview-label">Deine Flagge</span>
          <FlagCanvas :definition="built" :width="300" :show-contours="false" />
        </div>
        <div class="preview-box">
          <span class="preview-label">Original</span>
          <img :src="flagUrl(target.code, 320)" :alt="country.name" class="orig-flag" />
        </div>
      </div>
      <div class="result-panel">
        <h3>{{ result.score }} / {{ result.maxScore }} Punkte</h3>
        <ul class="result-details">
          <li v-for="(d, i) in result.details" :key="i" :class="{ ok: d.ok, bad: !d.ok }">
            <span class="mark">{{ d.ok ? '✓' : '✗' }}</span>
            {{ d.label }}
            <span class="pts">{{ d.ok ? '+1' : '+0' }}</span>
          </li>
        </ul>
        <button class="btn btn-primary" @click="startRound">Nächste Flagge</button>
      </div>
    </div>

    <template v-else>
      <div class="workspace">
        <aside class="side side-left">
          <h3 class="side-title">Layout</h3>
          <LayoutPicker
            :model-value="built.layout"
            :layouts="LAYOUTS"
            @update:model-value="setLayout"
          />
        </aside>

        <section class="center">
          <span class="preview-label">Deine Flagge</span>
          <FlagCanvas
            :definition="built"
            :width="340"
            :show-contours="true"
            :paint-color="selectedColor"
            @paint="setColor"
          />
          <p class="paint-hint">Farbe rechts wählen, Fläche anklicken</p>
          <div class="actions">
            <button class="btn btn-primary" @click="check">Prüfen</button>
            <button class="btn btn-ghost" @click="startRound">Überspringen</button>
          </div>
        </section>

        <aside class="side side-right">
          <h3 class="side-title">Farben</h3>
          <ColorPicker v-model="selectedColor" :palette="COLOR_PALETTE" />
        </aside>
      </div>

      <section class="symbols-bar">
        <h3 class="side-title">Symbole</h3>
        <SymbolPicker
          :symbols="built.symbols"
          :geometric="geometric"
          :coats="coats"
          :positions="POSITIONS"
          :palette="COLOR_PALETTE"
          :selected-idx="selectedSymbolIdx"
          @add="addSymbol"
          @remove="removeSymbol"
          @select="selectedSymbolIdx = $event"
        />
      </section>
    </template>
  </div>
</template>

<style scoped>
.builder {
  max-width: 1100px;
  margin: 0 auto;
}

.builder-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.stats {
  display: flex;
  gap: 0.75rem;
}

.stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.5rem 1.1rem;
  text-align: center;
  min-width: 80px;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.prompt {
  margin: 0;
  font-size: 1.15rem;
  text-align: center;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(160px, 220px) minmax(0, 1fr) minmax(100px, 140px);
  grid-template-areas: 'layout center colors';
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

.side-left {
  grid-area: layout;
}

.center {
  grid-area: center;
}

.side-right {
  grid-area: colors;
}

.side {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem;
}

.side-left,
.side-right {
  min-height: 0;
}

.side-title {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 0.5rem;
  min-width: 0;
}

.center :deep(.flag-canvas) {
  width: 100%;
  max-width: 340px;
  height: auto;
}

.preview-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.paint-hint {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: center;
}

.actions {
  display: flex;
  gap: 0.65rem;
  margin-top: 0.35rem;
  flex-wrap: wrap;
  justify-content: center;
}

.symbols-bar {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem 1rem 1rem;
}

.compare {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.preview-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.orig-flag {
  width: min(300px, 100%);
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.result-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.25rem;
  text-align: center;
  max-width: 520px;
  margin: 0 auto;
}

.result-panel ul {
  text-align: left;
  max-width: 400px;
  margin: 0.75rem auto 1.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.result-details {
  list-style: none;
  padding: 0;
}

.result-details li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

.result-details .mark {
  width: 1.1rem;
  font-weight: 700;
}

.result-details .ok {
  color: #4ade80;
}

.result-details .bad {
  color: #f87171;
}

.result-details .pts {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
}

/* Breit: Layout links als mehrspaltiges Raster */
.side-left :deep(.layout-list) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.side-left :deep(.option-btn) {
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.45rem 0.3rem;
  gap: 0.35rem;
}

.side-left :deep(.layout-icon) {
  width: 100%;
  max-width: 56px;
  height: auto;
}

.side-left :deep(.layout-label) {
  font-size: 0.62rem;
}

/* Eng: Layout oben horizontal, Flagge + Farben bleiben nebeneinander */
@media (max-width: 860px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'layout layout'
      'center colors';
  }

  .side-left {
    padding: 0.65rem 0.75rem;
  }

  .side-left .side-title {
    margin-bottom: 0.5rem;
  }

  .side-left :deep(.layout-list) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.4rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .side-left :deep(.option-btn) {
    flex-direction: column;
    flex: 0 0 auto;
    width: 72px;
    padding: 0.35rem 0.3rem;
  }

  .side-left :deep(.layout-icon) {
    width: 48px;
    max-width: none;
  }

  .side-left :deep(.layout-label) {
    display: none;
  }

  .side-right {
    padding: 0.65rem;
    align-self: stretch;
  }

  .center {
    padding: 0.5rem 0;
  }

  .paint-hint {
    display: none;
  }
}

@media (max-width: 480px) {
  .side-right :deep(.swatch) {
    width: 32px;
    height: 32px;
  }

  .side-right :deep(.palette) {
    gap: 6px;
  }
}
</style>
