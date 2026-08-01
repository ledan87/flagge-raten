<script setup>
import { countriesByContinent, flagUrl, countries } from '../data/countries.js'

const groups = countriesByContinent()
const total = countries.length
</script>

<template>
  <div class="flags-page">
    <header class="page-header">
      <h1>Alle Flaggen</h1>
      <p>{{ total }} Länder, geordnet nach Kontinent</p>
    </header>

    <nav class="toc">
      <a v-for="g in groups" :key="g.continent" :href="'#' + g.continent">
        {{ g.continent }}
        <span>{{ g.countries.length }}</span>
      </a>
    </nav>

    <section
      v-for="g in groups"
      :id="g.continent"
      :key="g.continent"
      class="continent"
    >
      <h2>
        {{ g.continent }}
        <span class="count">{{ g.countries.length }}</span>
      </h2>
      <div class="grid">
        <article v-for="c in g.countries" :key="c.code" class="flag-item">
          <img :src="flagUrl(c.code, 160)" :alt="'Flagge von ' + c.name" loading="lazy" />
          <span class="name">{{ c.name }}</span>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.flags-page {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0 0 0.4rem;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
}

.page-header p {
  margin: 0;
  color: var(--text-muted);
}

.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.toc a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  text-decoration: none;
  font-size: 0.85rem;
}

.toc a:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.toc span {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.continent {
  margin-bottom: 2.5rem;
  scroll-margin-top: 5rem;
}

.continent h2 {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  font-size: 1.25rem;
}

.count {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.85rem;
}

.flag-item {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.65rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.flag-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background: #222;
}

.name {
  font-size: 0.85rem;
  line-height: 1.3;
  text-align: center;
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
