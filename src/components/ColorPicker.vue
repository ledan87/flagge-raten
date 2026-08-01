<script setup>
defineProps({
  modelValue: { type: String, required: true },
  palette: { type: Array, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="color-panel">
    <div class="palette">
      <button
        v-for="c in palette"
        :key="c.id"
        type="button"
        class="swatch"
        :class="{ selected: modelValue === c.hex }"
        :style="{ background: c.hex }"
        :title="c.label"
        @click="$emit('update:modelValue', c.hex)"
      />
    </div>
    <p class="hint">Anklicken, dann Fläche bemalen</p>
  </div>
</template>

<style scoped>
.color-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.palette {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.swatch {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
}
.swatch.selected {
  border-color: #fff;
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.hint {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.3;
  text-align: center;
  color: var(--text-muted);
}
</style>
