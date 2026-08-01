<script setup>
import { computed } from 'vue'
import { getSymbol, getPosition, getLayout } from '../data/symbols.js'

const props = defineProps({
  definition: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
    default: 320,
  },
  showContours: {
    type: Boolean,
    default: true,
  },
  /** Farbe zum Auftragen per Klick; null = nicht interaktiv */
  paintColor: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['paint'])

const height = computed(() => Math.round((props.width * 2) / 3))
const layout = computed(() => getLayout(props.definition.layout))
const interactive = computed(() => !!props.paintColor)

function stripeRects() {
  const colors = props.definition.colors || ['#ccc']
  const l = layout.value
  const w = 300
  const h = 200
  const rects = []

  if (l.special === 'nordic') {
    const bg = colors[0] || '#006AA7'
    const cross = colors[1] || '#FECC00'
    rects.push({ x: 0, y: 0, width: w, height: h, fill: bg, index: 0 })
    rects.push({ x: w * 0.28, y: 0, width: w * 0.14, height: h, fill: cross, index: 1 })
    rects.push({ x: 0, y: h * 0.4, width: w, height: h * 0.2, fill: cross, index: 1 })
    return rects
  }

  if (l.direction === 'horizontal') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let y = 0
    for (let i = 0; i < l.stripes; i++) {
      const sh = (h * ratios[i]) / total
      rects.push({ x: 0, y, width: w, height: sh, fill: colors[i] || '#ccc', index: i })
      y += sh
    }
  } else if (l.direction === 'vertical') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let x = 0
    for (let i = 0; i < l.stripes; i++) {
      const sw = (w * ratios[i]) / total
      rects.push({ x, y: 0, width: sw, height: h, fill: colors[i] || '#ccc', index: i })
      x += sw
    }
  } else {
    rects.push({ x: 0, y: 0, width: w, height: h, fill: colors[0] || '#ccc', index: 0 })
  }

  return rects
}

function layoutContours() {
  const l = layout.value
  const w = 300
  const h = 200
  const lines = []

  if (l.special === 'nordic') {
    const vx = w * 0.28
    const vw = w * 0.14
    const hy = h * 0.4
    const hh = h * 0.2
    lines.push(
      { x1: vx, y1: 0, x2: vx, y2: h },
      { x1: vx + vw, y1: 0, x2: vx + vw, y2: h },
      { x1: 0, y1: hy, x2: w, y2: hy },
      { x1: 0, y1: hy + hh, x2: w, y2: hy + hh },
    )
    return lines
  }

  if (l.direction === 'horizontal' && l.stripes > 1) {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let y = 0
    for (let i = 0; i < l.stripes - 1; i++) {
      y += (h * ratios[i]) / total
      lines.push({ x1: 0, y1: y, x2: w, y2: y })
    }
  } else if (l.direction === 'vertical' && l.stripes > 1) {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let x = 0
    for (let i = 0; i < l.stripes - 1; i++) {
      x += (w * ratios[i]) / total
      lines.push({ x1: x, y1: 0, x2: x, y2: h })
    }
  }

  return lines
}

/** Liefert den Farbindex der Fläche unter (x,y) im viewBox-Raum */
function regionAt(x, y) {
  const l = layout.value
  const w = 300
  const h = 200

  if (l.special === 'nordic') {
    const onVertical = x >= w * 0.28 && x <= w * 0.42
    const onHorizontal = y >= h * 0.4 && y <= h * 0.6
    return onVertical || onHorizontal ? 1 : 0
  }

  if (l.direction === 'horizontal') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let cy = 0
    for (let i = 0; i < l.stripes; i++) {
      cy += (h * ratios[i]) / total
      if (y <= cy) return i
    }
    return l.stripes - 1
  }

  if (l.direction === 'vertical') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let cx = 0
    for (let i = 0; i < l.stripes; i++) {
      cx += (w * ratios[i]) / total
      if (x <= cx) return i
    }
    return l.stripes - 1
  }

  return 0
}

function onClick(event) {
  if (!props.paintColor) return
  const svg = event.currentTarget
  const pt = svg.createSVGPoint()
  pt.x = event.clientX
  pt.y = event.clientY
  const local = pt.matrixTransform(svg.getScreenCTM().inverse())
  const index = regionAt(local.x, local.y)
  emit('paint', index, props.paintColor)
}

const rects = computed(() => stripeRects())
const contours = computed(() => layoutContours())

const renderedSymbols = computed(() => {
  return (props.definition.symbols || [])
    .map((sym, idx) => {
      const def = getSymbol(sym.type)
      const pos = getPosition(sym.position)
      const size = (sym.size || 0.35) * 100
      const cx = pos.x * 300
      const cy = pos.y * 200
      return {
        key: `${sym.type}-${idx}`,
        def,
        color: sym.color || '#000',
        transform: `translate(${cx - size / 2}, ${cy - size / 2}) scale(${size / 100})`,
      }
    })
    .filter((s) => s.def)
})
</script>

<template>
  <svg
    class="flag-canvas"
    :class="{ paintable: interactive }"
    :width="width"
    :height="height"
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
    @click="onClick"
  >
    <rect x="0" y="0" width="300" height="200" fill="#ddd" />
    <rect
      v-for="(r, i) in rects"
      :key="i"
      :x="r.x"
      :y="r.y"
      :width="r.width"
      :height="r.height"
      :fill="r.fill"
    />
    <g v-if="showContours && contours.length" class="contours" pointer-events="none">
      <line
        v-for="(c, i) in contours"
        :key="'c-' + i"
        :x1="c.x1"
        :y1="c.y1"
        :x2="c.x2"
        :y2="c.y2"
        stroke="#9ca3af"
        stroke-width="2"
      />
    </g>
    <g v-for="s in renderedSymbols" :key="s.key" :transform="s.transform" pointer-events="none">
      <path
        v-for="(p, pi) in s.def.paths"
        :key="pi"
        :d="p.d"
        :fill="p.fill === 'current' ? s.color : p.fill || 'none'"
        :fill-rule="p.fillRule || 'nonzero'"
        :stroke="p.stroke || 'none'"
        :stroke-width="p.strokeWidth || 0"
      />
    </g>
    <rect
      x="0.5"
      y="0.5"
      width="299"
      height="199"
      fill="none"
      :stroke="showContours ? '#9ca3af' : 'rgba(0,0,0,0.15)'"
      :stroke-width="showContours ? 2 : 1"
      pointer-events="none"
    />
  </svg>
</template>

<style scoped>
.flag-canvas {
  display: block;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background: #fff;
}
.flag-canvas.paintable {
  cursor: crosshair;
}
</style>
