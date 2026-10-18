<script setup>
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1>Flaggen-Raten</h1>
      <p class="subtitle">
        Entdecke die Flaggen der Welt und die Bundesländer Deutschlands.
      </p>
    </section>

    <div class="modes">
      <router-link to="/raten" class="mode-card">
        <div class="mode-icon">🔍</div>
        <h2>Flagge raten</h2>
        <p>Eine Flagge wird angezeigt – tippe den Ländernamen. Mit Autovervollständigung, Punkten und Streak.</p>
        <span class="mode-cta">Spielen →</span>
      </router-link>

      <router-link to="/bauen" class="mode-card">
        <div class="mode-icon">🎨</div>
        <h2>Flagge bauen</h2>
        <p>Ein Land wird genannt – baue die Flagge aus Streifen, Farben und Symbolen (Sterne, Halbmond, Wappen …).</p>
        <span class="mode-cta">Bauen →</span>
      </router-link>
      <router-link to="/bundeslaender" class="mode-card">
        <div class="mode-icon">🗺️</div>
        <h2>Bundesländer</h2>
        <p>Rate die 16 Landeshauptstädte und finde die Bundesländer auf der Deutschlandkarte.</p>
        <span class="mode-cta">Deutschland entdecken →</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 0.75rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}

.modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.mode-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
}

.mode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
  border-color: var(--accent);
}

.mode-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.mode-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
}

.mode-card p {
  flex: 1;
  color: var(--text-muted);
  margin: 0 0 1.25rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.mode-cta {
  font-weight: 600;
  color: var(--accent);
}
</style>
