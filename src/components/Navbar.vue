<script setup>
import { ref } from 'vue'

const logo = '/media/logo/logo.png'
const open = ref(false)

function toggle() { open.value = !open.value }
function close() { open.value = false }
</script>

<template>
  <header class="nav">
    <div class="container bar">
      <RouterLink class="brand" to="/" @click="close">
        <img class="brand-logo" :src="logo" alt="Henna By Rachana logo" />
        <span class="brand-text">Henna By Rachana</span>
      </RouterLink>
      <button
        class="hamburger"
        :class="{ open }"
        :aria-expanded="open"
        aria-label="Toggle navigation menu"
        @click="toggle"
      >
        <span></span><span></span><span></span>
      </button>
      <nav class="links" :class="{ open }" @click="close">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/designs">Designs</RouterLink>
        <RouterLink to="/pricing">Pricing</RouterLink>
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
  font-weight: 800; letter-spacing: 0.5px;
  color: var(--text);
  font-size: 22px;
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

.hamburger {
  display: none;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 44px; height: 44px;
  padding: 0;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.hamburger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 720px) {
  .bar { padding: 14px 0; flex-wrap: wrap; }
  .brand { font-size: 18px; gap: 8px; }
  .brand-logo { width: 42px; height: 42px; border-radius: 10px; }
  .hamburger { display: inline-flex; }
  .links {
    flex-basis: 100%;
    flex-direction: column;
    gap: 6px;
    padding: 8px 0 4px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }
  .links.open { max-height: 360px; }
  .links :deep(a) {
    display: block;
    padding: 12px 14px;
    font-size: 17px;
    border-radius: 10px;
  }
}
</style>
