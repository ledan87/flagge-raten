<script setup>
import { computed } from 'vue'
import { getSymbol } from '../data/symbols.js'

const props = defineProps({
  symbolId: { type: String, required: true },
  color: { type: String, default: '#e8eef7' },
  size: { type: Number, default: 40 },
})

const def = computed(() => getSymbol(props.symbolId))

function pathFill(path) {
  if (path.fill === 'current') return props.color
  return path.fill || 'none'
}
</script>

<template>
  <svg
    v-if="def"
    class="symbol-icon"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="100" height="100" fill="transparent" />
    <path
      v-for="(p, i) in def.paths"
      :key="i"
      :d="p.d"
      :fill="pathFill(p)"
      :fill-rule="p.fillRule || 'nonzero'"
      :stroke="p.stroke || 'none'"
      :stroke-width="p.strokeWidth || 0"
    />
  </svg>
</template>

<style scoped>
.symbol-icon {
  display: block;
  flex-shrink: 0;
}
</style>
