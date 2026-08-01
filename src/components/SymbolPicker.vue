<script setup>
import SymbolIcon from './SymbolIcon.vue'
import { getSymbol } from '../data/symbols.js'

defineProps({
  symbols: { type: Array, required: true },
  geometric: { type: Array, required: true },
  coats: { type: Array, required: true },
  positions: { type: Array, required: true },
  palette: { type: Array, required: true },
  selectedIdx: { type: Number, required: true },
})
defineEmits(['add', 'remove', 'select'])

function labelOf(type) {
  return getSymbol(type)?.label ?? type
}
</script>

<template>
  <div class="symbol-panel">
    <div class="catalog">
      <div class="group">
        <span class="group-label">Geometrisch</span>
        <div class="option-row">
          <button
            v-for="s in geometric"
            :key="s.id"
            type="button"
            class="option-btn"
            :aria-label="s.label"
            @click="$emit('add', s.id)"
          >
            <SymbolIcon :symbol-id="s.id" color="#e8eef7" :size="36" />
            <span class="tooltip">{{ s.label }}</span>
          </button>
        </div>
      </div>
      <div class="group">
        <span class="group-label">Wappen</span>
        <div class="option-row">
          <button
            v-for="s in coats"
            :key="s.id"
            type="button"
            class="option-btn coat"
            :aria-label="s.label"
            @click="$emit('add', s.id)"
          >
            <SymbolIcon :symbol-id="s.id" :size="40" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="symbols.length" class="placed">
      <span class="group-label">Platziert</span>
      <div class="placed-row">
        <div
          v-for="(sym, idx) in symbols"
          :key="idx"
          class="symbol-edit"
          :class="{ active: selectedIdx === idx }"
          @click="$emit('select', idx)"
        >
          <div class="symbol-edit-header">
            <SymbolIcon
              :symbol-id="sym.type"
              :color="sym.color || '#e8eef7'"
              :size="32"
              :title="labelOf(sym.type)"
            />
            <button type="button" class="btn-tiny" :title="'Entfernen'" @click.stop="$emit('remove', idx)">×</button>
          </div>
          <label>
            Position
            <select v-model="sym.position">
              <option v-for="p in positions" :key="p.id" :value="p.id">{{ p.label }}</option>
            </select>
          </label>
          <label>
            Größe
            <input type="range" min="0.15" max="0.7" step="0.05" v-model.number="sym.size" />
          </label>
          <div v-if="sym.color !== null" class="palette">
            <button
              v-for="c in palette"
              :key="c.id"
              type="button"
              class="swatch"
              :class="{ selected: sym.color === c.hex }"
              :style="{ background: c.hex }"
              :title="c.label"
              @click="sym.color = c.hex"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.symbol-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.catalog {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.group-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.option-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.option-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0;
  border: 1px solid var(--border);
  background: var(--bg);
  border-radius: 10px;
  cursor: pointer;
}
.option-btn.coat {
  background: #2a3548;
}
.option-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  z-index: 2;
}
.tooltip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  background: #0b1220;
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.12s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}
.option-btn:hover .tooltip,
.option-btn:focus-visible .tooltip {
  opacity: 1;
  visibility: visible;
}
.placed-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}
.symbol-edit {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.6rem 0.75rem;
  min-width: 180px;
  flex: 1 1 180px;
  max-width: 260px;
  cursor: pointer;
  background: var(--bg);
}
.symbol-edit.active {
  border-color: var(--accent);
}
.symbol-edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}
.symbol-edit label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  color: var(--text-muted);
}
.symbol-edit select,
.symbol-edit input[type='range'] {
  max-width: 100%;
}
.btn-tiny {
  width: 24px;
  height: 24px;
  border: 1px solid var(--border);
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
}
.palette {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.swatch {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
}
.swatch.selected {
  border-color: var(--accent);
}
</style>
