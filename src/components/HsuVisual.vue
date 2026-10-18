<script setup>
defineProps({ visual: { type: Object, required: true } })
const compassDescriptions = { N: 'oben', O: 'rechts', NO: 'schräg nach rechts oben', NW: 'schräg nach links oben' }
const directions = [
  { id: 'N', x: 180, y: 38 }, { id: 'NO', x: 240, y: 63 },
  { id: 'O', x: 265, y: 123 }, { id: 'SO', x: 240, y: 183 },
  { id: 'S', x: 180, y: 208 }, { id: 'SW', x: 120, y: 183 },
  { id: 'W', x: 95, y: 123 }, { id: 'NW', x: 120, y: 63 },
]
</script>

<template>
  <figure class="visual">
    <svg v-if="visual.kind === 'compass'" viewBox="0 0 360 245" role="img" :aria-label="`Windrose: Norden ist oben. Der hervorgehobene Pfeil zeigt ${compassDescriptions[visual.direction]}.`">
      <text x="180" y="18" text-anchor="middle">N</text>
      <circle cx="180" cy="123" r="86" class="ring" />
      <g v-for="d in directions" :key="d.id" :class="d.id === visual.direction ? 'highlight' : 'muted'">
        <line x1="180" y1="123" :x2="d.x" :y2="d.y" :stroke-width="d.id === visual.direction ? 7 : 2" />
        <circle v-if="d.id === visual.direction" :cx="d.x" :cy="d.y" r="7" />
      </g>
      <circle cx="180" cy="123" r="5" class="centre" />
    </svg>
    <svg v-else-if="visual.kind === 'hill'" viewBox="0 0 420 240" role="img" aria-label="Höhenlinienkarte: Norden oben; 100, 200, 300 und 400 Meter. Im Westen liegen die Linien weit, im Osten eng beieinander. Gipfel: 450 Meter.">
      <text x="350" y="26">N ↑</text>
      <g class="contours">
        <ellipse cx="200" cy="125" rx="172" ry="85" />
        <ellipse cx="233" cy="125" rx="130" ry="64" />
        <ellipse cx="261" cy="125" rx="95" ry="44" />
        <ellipse cx="285" cy="125" rx="63" ry="25" />
      </g>
      <text x="39" y="130">100 m</text><text x="113" y="130">200 m</text>
      <text x="175" y="130">300 m</text><text x="239" y="130">400 m</text>
      <text x="318" y="127">×</text><text x="300" y="147" class="small">450 m</text>
      <text x="18" y="227">Westen</text><text x="340" y="227">Osten</text>
    </svg>
    <svg v-else-if="visual.kind === 'profile'" viewBox="0 0 420 245" role="img" aria-label="Höhenprofil: A 0 Meter, B 100, C 200, D 300, E 200, F 100, G 0 Meter.">
      <g v-for="(height, i) in [300, 200, 100, 0]" :key="height">
        <line x1="60" :y1="40 + i * 48" x2="400" :y2="40 + i * 48" class="grid-line" />
        <text x="4" :y="45 + i * 48" class="small">{{ height }} m</text>
      </g>
      <path d="M70 184 L123 136 L176 88 L229 40 L282 88 L335 136 L388 184" class="profile" />
      <text v-for="(point, i) in ['A','B','C','D','E','F','G']" :key="point" :x="70 + i * 53" y="215" text-anchor="middle">{{ point }}</text>
    </svg>
    <svg v-else viewBox="0 0 360 150" role="img" aria-label="Kartenzeichen zum Bestimmen">
      <g v-if="visual.symbol === 'church'" class="symbol">
        <circle cx="180" cy="101" r="15" /><path d="M180 86 V33 M160 54 H200" />
      </g>
      <g v-else-if="visual.symbol === 'parking'" class="symbol">
        <rect x="143" y="35" width="74" height="74" rx="4" /><text x="180" y="91" text-anchor="middle" class="parking">P</text>
      </g>
      <g v-else-if="visual.symbol === 'conifer'" class="symbol">
        <path v-for="x in [130,180,230]" :key="x" :d="`M${x} 110 V94 M${x-18} 94 L${x} 39 L${x+18} 94 Z`" />
      </g>
      <g v-else class="symbol">
        <path v-for="x in [130,180,230]" :key="x" :d="`M${x} 40 V110 M${x-18} 61 H${x+18}`" />
      </g>
    </svg>
  </figure>
</template>
<style scoped>
.visual { margin: 1rem auto; max-width: 420px; padding: .5rem; background: #0f1b2b; border-radius: 12px; }
svg { display: block; width: 100%; }
text { fill: #e8eef7; font: 15px system-ui; }
.small { font-size: 12px; }
.ring, .contours { fill: none; stroke: #b8d1f4; stroke-width: 1.5; }
.muted { stroke: #647b99; }
.highlight { stroke: #fcd34d; fill: #fcd34d; }
.centre { fill: white; }
.grid-line { stroke: #42546c; stroke-width: 1; }
.profile { fill: none; stroke: #fcd34d; stroke-width: 4; }
.symbol { stroke: #d4e4ff; stroke-width: 4; fill: none; }
.parking { stroke: none; fill: #d4e4ff; font: bold 58px system-ui; }
</style>
