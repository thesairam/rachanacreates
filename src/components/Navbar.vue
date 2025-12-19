<template>
  <header class="nav">
    <div class="container bar">
      <RouterLink class="brand" to="/">Rachana Creates</RouterLink>
      <nav class="links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/designs">Designs</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.nav {
  position: sticky; top: 0; z-index: 10;
  background: rgba(17, 66, 53, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0;
}
.brand {
  font-weight: 800; letter-spacing: 0.2px;
  color: var(--text);
}
.links { display: flex; gap: 18px; }
.links :deep(a) {
  color: var(--muted);
  padding: 8px 12px; border-radius: 10px;
}
.links :deep(a.router-link-active) {
  background: var(--card);
  color: var(--text);
}
</style>
