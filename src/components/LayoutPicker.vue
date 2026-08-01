<script setup>
defineProps({
  modelValue: { type: String, required: true },
  layouts: { type: Array, required: true },
})
defineEmits(['update:modelValue'])

const tones = ['#4b5563', '#9ca3af', '#e5e7eb', '#6b7280']

function previewShapes(layout) {
  const w = 48
  const h = 32
  const shapes = []

  if (layout.special === 'nordic') {
    shapes.push({ type: 'rect', x: 0, y: 0, width: w, height: h, fill: tones[0] })
    shapes.push({ type: 'rect', x: w * 0.28, y: 0, width: w * 0.14, height: h, fill: tones[2] })
    shapes.push({ type: 'rect', x: 0, y: h * 0.4, width: w, height: h * 0.2, fill: tones[2] })
    return shapes
  }

  if (layout.special === 'nordic-bordered') {
    shapes.push({ type: 'rect', x: 0, y: 0, width: w, height: h, fill: tones[0] })
    shapes.push({ type: 'rect', x: w * 0.26, y: 0, width: w * 0.18, height: h, fill: tones[2] })
    shapes.push({ type: 'rect', x: 0, y: h * 0.36, width: w, height: h * 0.28, fill: tones[2] })
    shapes.push({ type: 'rect', x: w * 0.3, y: 0, width: w * 0.1, height: h, fill: tones[1] })
    shapes.push({ type: 'rect', x: 0, y: h * 0.42, width: w, height: h * 0.16, fill: tones[1] })
    return shapes
  }

  if (layout.special === 'canton-plain') {
    const cw = w * 0.4
    const ch = h * 0.54
    shapes.push({ type: 'rect', x: 0, y: 0, width: w, height: h, fill: tones[1] })
    shapes.push({ type: 'rect', x: 0, y: 0, width: cw, height: ch, fill: tones[0] })
    return shapes
  }

  if (layout.special === 'canton-stripes') {
    const n = 5
    const sh = h / n
    for (let i = 0; i < n; i++) {
      shapes.push({
        type: 'rect',
        x: 0,
        y: i * sh,
        width: w,
        height: sh,
        fill: tones[i % 2 === 0 ? 0 : 2],
      })
    }
    shapes.push({ type: 'rect', x: 0, y: 0, width: w * 0.4, height: h * 0.54, fill: tones[3] })
    return shapes
  }

  if (layout.special === 'hoist-triangle') {
    shapes.push({ type: 'rect', x: 0, y: 0, width: w, height: h / 2, fill: tones[2] })
    shapes.push({ type: 'rect', x: 0, y: h / 2, width: w, height: h / 2, fill: tones[0] })
    shapes.push({
      type: 'polygon',
      points: `0,0 ${w * 0.38},${h / 2} 0,${h}`,
      fill: tones[1],
    })
    return shapes
  }

  if (layout.direction === 'horizontal') {
    const ratios = layout.ratios || Array(layout.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let y = 0
    for (let i = 0; i < layout.stripes; i++) {
      const sh = (h * ratios[i]) / total
      shapes.push({ type: 'rect', x: 0, y, width: w, height: sh, fill: tones[i % tones.length] })
      y += sh
    }
    return shapes
  }

  if (layout.direction === 'vertical') {
    const ratios = layout.ratios || Array(layout.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let x = 0
    for (let i = 0; i < layout.stripes; i++) {
      const sw = (w * ratios[i]) / total
      shapes.push({ type: 'rect', x, y: 0, width: sw, height: h, fill: tones[i % tones.length] })
      x += sw
    }
    return shapes
  }

  shapes.push({ type: 'rect', x: 0, y: 0, width: w, height: h, fill: tones[1] })
  return shapes
}
</script>

<template>
  <div class="layout-list">
    <button
      v-for="l in layouts"
      :key="l.id"
      type="button"
      class="option-btn"
      :class="{ selected: modelValue === l.id }"
      :title="l.label"
      @click="$emit('update:modelValue', l.id)"
    >
      <svg class="layout-icon" viewBox="0 0 48 32" aria-hidden="true">
        <template v-for="(s, i) in previewShapes(l)" :key="i">
          <rect
            v-if="s.type === 'rect'"
            :x="s.x"
            :y="s.y"
            :width="s.width"
            :height="s.height"
            :fill="s.fill"
          />
          <polygon v-else-if="s.type === 'polygon'" :points="s.points" :fill="s.fill" />
        </template>
        <rect x="0.5" y="0.5" width="47" height="31" fill="none" stroke="rgba(255,255,255,0.25)" />
      </svg>
      <span class="layout-label">{{ l.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.layout-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.option-btn {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.45rem;
  border: 2px solid var(--border);
  background: var(--bg);
  border-radius: 8px;
  cursor: pointer;
  color: var(--text);
  text-align: left;
}
.option-btn.selected,
.option-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.layout-icon {
  width: 48px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 2px;
  display: block;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  aspect-ratio: 3 / 2;
}
.layout-label {
  font-size: 0.7rem;
  line-height: 1.2;
  color: var(--text-muted);
}
.option-btn.selected .layout-label {
  color: var(--text);
}
</style>
