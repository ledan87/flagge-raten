<template>
  <div class="app">
    <header class="app-header">
      <router-link to="/" class="logo">
        <span class="logo-flag">🏳️</span>
        <span>Flaggen-Raten</span>
      </router-link>
      <nav class="nav">
        <router-link to="/raten">Flagge raten</router-link>
        <router-link to="/bauen">Flagge bauen</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
