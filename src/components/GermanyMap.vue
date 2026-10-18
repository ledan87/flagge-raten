<script setup>
import paths from '../data/stateMap.json'
import { federalStates } from '../data/federalStates.js'

const props = defineProps({
  answer: { type: String, default: null },
  selected: { type: String, default: null },
  disabled: Boolean,
})
const emit = defineEmits(['select'])
// Insets are unlabelled until answered, so they do not give the solution away.
const cities = [
  { id: 'HB', number: 1, x: 193, y: 196, cx: 70, cy: 230 },
  { id: 'HH', number: 2, x: 254, y: 157, cx: 75, cy: 100 },
  { id: 'BE', number: 3, x: 428, y: 242, cx: 527, cy: 205 },
]
const regionNumber = id => paths.findIndex(p => p.id === id) + 1
function regionLabel(id) {
  const label = `Kartenregion ${regionNumber(id)}`
  return props.answer === id
    ? `${label}: ${federalStates.find(s => s.id === id).name}, richtige Antwort`
    : label
}
function select(id) {
  if (!props.disabled) emit('select', id)
}
function classes(id) {
  return {
    correct: props.answer === id,
    wrong: props.selected === id && props.answer && props.answer !== id,
  }
}
</script>

<template>
  <svg class="germany-map" viewBox="0 0 560 700" role="group" aria-label="Deutschlandkarte mit 16 auswählbaren Bundesländern">
    <text x="505" y="48" class="north">N ↑</text>
    <g v-for="region in paths" :key="region.id"
      class="region" :class="classes(region.id)" role="button"
      :tabindex="disabled ? -1 : 0" :aria-disabled="disabled"
      :aria-label="regionLabel(region.id)"
      :data-state="region.id"
      @click="select(region.id)" @keydown.enter.prevent="select(region.id)"
      @keydown.space.prevent="select(region.id)">
      <path :d="region.d" fill-rule="evenodd" />
    </g>
    <g v-for="city in cities" :key="city.id" class="city-guide" aria-hidden="true">
      <line :x1="city.x" :y1="city.y" :x2="city.cx" :y2="city.cy" />
      <circle :cx="city.x" :cy="city.y" r="9" />
      <text :x="city.x" :y="city.y + 4">{{ city.number }}</text>
    </g>
    <g v-for="city in cities" :key="`inset-${city.id}`"
      class="region city-inset" :class="classes(city.id)" role="button"
      :tabindex="disabled ? -1 : 0" :aria-disabled="disabled"
      :aria-label="`Vergrößerte ${regionLabel(city.id)}`"
      :data-inset="city.id"
      @click="select(city.id)" @keydown.enter.prevent="select(city.id)"
      @keydown.space.prevent="select(city.id)">
      <circle :cx="city.cx" :cy="city.cy" r="26" />
      <text :x="city.cx" :y="city.cy + 6">{{ city.number }}</text>
    </g>
  </svg>
</template>

<style scoped>
.germany-map { display: block; width: 100%; max-width: 450px; margin: 0 auto; }
.region { fill: #334a69; stroke: #c0d3ed; stroke-width: 1.2; cursor: pointer; outline: none; }
.region path { vector-effect: non-scaling-stroke; }
.region[aria-disabled='false']:hover, .region[aria-disabled='false']:focus { fill: #628cba; stroke: white; stroke-width: 2; }
.region:focus-visible { filter: drop-shadow(0 0 4px white); }
.region.correct { fill: #168054; stroke: #8df0ba; }
.region.wrong { fill: #a92d47; stroke: #ff9cae; }
.region[aria-disabled='true'] { cursor: default; }
.north { fill: var(--text-muted); font: 16px system-ui; }
.city-guide { pointer-events: none; }
.city-guide line { stroke: #abbdd8; stroke-width: 1; stroke-dasharray: 4 3; }
.city-guide circle { fill: #182b43; stroke: #e8eef7; }
.city-guide text { fill: white; font: bold 11px system-ui; text-anchor: middle; }
.city-inset text { fill: white; stroke: none; font: bold 18px system-ui; text-anchor: middle; pointer-events: none; }
</style>
