<script setup>
const logo = '/media/logo/logow.png'
</script>

<template>
  <header class="nav">
    <div class="container bar">
      <RouterLink class="brand" to="/">
        <img class="brand-logo" :src="logo" alt="Rachana Artverse logo" />
        <span class="brand-text">Rachana Artverse</span>
      </RouterLink>
      <nav class="links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/designs">Designs</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky; top: 0; z-index: 10;
  background: rgba(17, 66, 53, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 0;
}
.brand {
  display: inline-flex; align-items: center; gap: 10px;
  font-weight: 800; letter-spacing: 0.2px;
  color: var(--text);
  font-size: 22px;
  letter-spacing: 0.5px;
}
.brand-logo {
  width: 56px; height: 56px;
  border-radius: 12px;
  object-fit: cover;
  border: none;
  background: var(--bg);
}
.brand-text { white-space: nowrap; }
.links { display: flex; gap: 26px; }
.links :deep(a) {
  color: var(--muted);
  padding: 13px 18px; border-radius: 13px;
  font-size: 19px;
}
.links :deep(a.router-link-active) {
  background: var(--card);
  color: var(--text);
}
</style>
