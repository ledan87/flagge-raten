<script setup>
import { computed } from 'vue'
import { getSymbol, getPosition, getLayout, CANTON } from '../data/symbols.js'

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
  paintColor: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['paint'])

const height = computed(() => Math.round((props.width * 2) / 3))
const layout = computed(() => getLayout(props.definition.layout))
const interactive = computed(() => !!props.paintColor)

const W = 300
const H = 200

function buildShapes() {
  const colors = props.definition.colors || ['#ccc']
  const l = layout.value
  const shapes = []

  if (l.special === 'nordic') {
    shapes.push({ type: 'rect', x: 0, y: 0, width: W, height: H, fill: colors[0] || '#ccc', index: 0 })
    shapes.push({
      type: 'rect',
      x: W * 0.28,
      y: 0,
      width: W * 0.14,
      height: H,
      fill: colors[1] || '#ccc',
      index: 1,
    })
    shapes.push({
      type: 'rect',
      x: 0,
      y: H * 0.4,
      width: W,
      height: H * 0.2,
      fill: colors[1] || '#ccc',
      index: 1,
    })
    return shapes
  }

  if (l.special === 'nordic-bordered') {
    shapes.push({ type: 'rect', x: 0, y: 0, width: W, height: H, fill: colors[0] || '#ccc', index: 0 })
    // outer cross
    shapes.push({
      type: 'rect',
      x: W * 0.26,
      y: 0,
      width: W * 0.18,
      height: H,
      fill: colors[1] || '#ccc',
      index: 1,
    })
    shapes.push({
      type: 'rect',
      x: 0,
      y: H * 0.36,
      width: W,
      height: H * 0.28,
      fill: colors[1] || '#ccc',
      index: 1,
    })
    // inner cross
    shapes.push({
      type: 'rect',
      x: W * 0.3,
      y: 0,
      width: W * 0.1,
      height: H,
      fill: colors[2] || '#ccc',
      index: 2,
    })
    shapes.push({
      type: 'rect',
      x: 0,
      y: H * 0.42,
      width: W,
      height: H * 0.16,
      fill: colors[2] || '#ccc',
      index: 2,
    })
    return shapes
  }

  if (l.special === 'canton-plain') {
    const cw = W * (l.canton?.w ?? CANTON.w)
    const ch = H * (l.canton?.h ?? CANTON.h)
    shapes.push({ type: 'rect', x: 0, y: 0, width: W, height: H, fill: colors[1] || '#ccc', index: 1 })
    shapes.push({ type: 'rect', x: 0, y: 0, width: cw, height: ch, fill: colors[0] || '#ccc', index: 0 })
    return shapes
  }

  if (l.special === 'canton-stripes') {
    const n = l.stripeCount || 5
    const cw = W * (l.canton?.w ?? CANTON.w)
    const ch = H * (l.canton?.h ?? CANTON.h)
    const sh = H / n
    for (let i = 0; i < n; i++) {
      shapes.push({
        type: 'rect',
        x: 0,
        y: i * sh,
        width: W,
        height: sh,
        fill: colors[i + 1] || '#ccc',
        index: i + 1,
      })
    }
    shapes.push({ type: 'rect', x: 0, y: 0, width: cw, height: ch, fill: colors[0] || '#ccc', index: 0 })
    return shapes
  }

  if (l.special === 'hoist-triangle') {
    shapes.push({
      type: 'rect',
      x: 0,
      y: 0,
      width: W,
      height: H / 2,
      fill: colors[1] || '#ccc',
      index: 1,
    })
    shapes.push({
      type: 'rect',
      x: 0,
      y: H / 2,
      width: W,
      height: H / 2,
      fill: colors[2] || '#ccc',
      index: 2,
    })
    shapes.push({
      type: 'polygon',
      points: `0,0 ${W * 0.38},${H / 2} 0,${H}`,
      fill: colors[0] || '#ccc',
      index: 0,
    })
    return shapes
  }

  if (l.direction === 'horizontal') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let y = 0
    for (let i = 0; i < l.stripes; i++) {
      const sh = (H * ratios[i]) / total
      shapes.push({
        type: 'rect',
        x: 0,
        y,
        width: W,
        height: sh,
        fill: colors[i] || '#ccc',
        index: i,
      })
      y += sh
    }
    return shapes
  }

  if (l.direction === 'vertical') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let x = 0
    for (let i = 0; i < l.stripes; i++) {
      const sw = (W * ratios[i]) / total
      shapes.push({
        type: 'rect',
        x,
        y: 0,
        width: sw,
        height: H,
        fill: colors[i] || '#ccc',
        index: i,
      })
      x += sw
    }
    return shapes
  }

  shapes.push({ type: 'rect', x: 0, y: 0, width: W, height: H, fill: colors[0] || '#ccc', index: 0 })
  return shapes
}

function layoutContours() {
  const l = layout.value
  const lines = []

  if (l.special === 'nordic') {
    lines.push(
      { x1: W * 0.28, y1: 0, x2: W * 0.28, y2: H },
      { x1: W * 0.42, y1: 0, x2: W * 0.42, y2: H },
      { x1: 0, y1: H * 0.4, x2: W, y2: H * 0.4 },
      { x1: 0, y1: H * 0.6, x2: W, y2: H * 0.6 },
    )
    return lines
  }

  if (l.special === 'nordic-bordered') {
    lines.push(
      { x1: W * 0.26, y1: 0, x2: W * 0.26, y2: H },
      { x1: W * 0.44, y1: 0, x2: W * 0.44, y2: H },
      { x1: W * 0.3, y1: 0, x2: W * 0.3, y2: H },
      { x1: W * 0.4, y1: 0, x2: W * 0.4, y2: H },
      { x1: 0, y1: H * 0.36, x2: W, y2: H * 0.36 },
      { x1: 0, y1: H * 0.64, x2: W, y2: H * 0.64 },
      { x1: 0, y1: H * 0.42, x2: W, y2: H * 0.42 },
      { x1: 0, y1: H * 0.58, x2: W, y2: H * 0.58 },
    )
    return lines
  }

  if (l.special === 'canton-plain' || l.special === 'canton-stripes') {
    const cw = W * (l.canton?.w ?? CANTON.w)
    const ch = H * (l.canton?.h ?? CANTON.h)
    lines.push(
      { x1: cw, y1: 0, x2: cw, y2: ch },
      { x1: 0, y1: ch, x2: cw, y2: ch },
    )
    if (l.special === 'canton-stripes') {
      const n = l.stripeCount || 5
      for (let i = 1; i < n; i++) {
        const y = (H * i) / n
        lines.push({ x1: y < ch ? cw : 0, y1: y, x2: W, y2: y })
      }
    }
    return lines
  }

  if (l.special === 'hoist-triangle') {
    lines.push(
      { x1: 0, y1: 0, x2: W * 0.38, y2: H / 2 },
      { x1: W * 0.38, y1: H / 2, x2: 0, y2: H },
      { x1: 0, y1: H / 2, x2: W, y2: H / 2 },
    )
    return lines
  }

  if (l.direction === 'horizontal' && l.stripes > 1) {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let y = 0
    for (let i = 0; i < l.stripes - 1; i++) {
      y += (H * ratios[i]) / total
      lines.push({ x1: 0, y1: y, x2: W, y2: y })
    }
  } else if (l.direction === 'vertical' && l.stripes > 1) {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let x = 0
    for (let i = 0; i < l.stripes - 1; i++) {
      x += (W * ratios[i]) / total
      lines.push({ x1: x, y1: 0, x2: x, y2: H })
    }
  }

  return lines
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  const d = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)
  const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / d
  const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / d
  const c = 1 - a - b
  return a >= 0 && b >= 0 && c >= 0
}

function regionAt(x, y) {
  const l = layout.value

  if (l.special === 'nordic') {
    const onVertical = x >= W * 0.28 && x <= W * 0.42
    const onHorizontal = y >= H * 0.4 && y <= H * 0.6
    return onVertical || onHorizontal ? 1 : 0
  }

  if (l.special === 'nordic-bordered') {
    const inInnerV = x >= W * 0.3 && x <= W * 0.4
    const inInnerH = y >= H * 0.42 && y <= H * 0.58
    if (inInnerV || inInnerH) return 2
    const inOuterV = x >= W * 0.26 && x <= W * 0.44
    const inOuterH = y >= H * 0.36 && y <= H * 0.64
    if (inOuterV || inOuterH) return 1
    return 0
  }

  if (l.special === 'canton-plain' || l.special === 'canton-stripes') {
    const cw = W * (l.canton?.w ?? CANTON.w)
    const ch = H * (l.canton?.h ?? CANTON.h)
    if (x <= cw && y <= ch) return 0
    if (l.special === 'canton-plain') return 1
    const n = l.stripeCount || 5
    const idx = Math.min(n - 1, Math.floor((y / H) * n))
    return idx + 1
  }

  if (l.special === 'hoist-triangle') {
    if (pointInTriangle(x, y, 0, 0, W * 0.38, H / 2, 0, H)) return 0
    return y < H / 2 ? 1 : 2
  }

  if (l.direction === 'horizontal') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let cy = 0
    for (let i = 0; i < l.stripes; i++) {
      cy += (H * ratios[i]) / total
      if (y <= cy) return i
    }
    return l.stripes - 1
  }

  if (l.direction === 'vertical') {
    const ratios = l.ratios || Array(l.stripes).fill(1)
    const total = ratios.reduce((a, b) => a + b, 0)
    let cx = 0
    for (let i = 0; i < l.stripes; i++) {
      cx += (W * ratios[i]) / total
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
  emit('paint', regionAt(local.x, local.y), props.paintColor)
}

const shapes = computed(() => buildShapes())
const contours = computed(() => layoutContours())

const renderedSymbols = computed(() => {
  return (props.definition.symbols || [])
    .map((sym, idx) => {
      const def = getSymbol(sym.type)
      const pos = getPosition(sym.position)
      const size = (sym.size || 0.35) * 100
      const cx = pos.x * W
      const cy = pos.y * H
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
    <template v-for="(s, i) in shapes" :key="i">
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
