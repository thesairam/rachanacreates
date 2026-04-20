<template>
  <footer class="footer">
    <div class="container inner">
      <div class="left">© {{ year }} Henna By Rachana</div>
      <div class="right">Crafted with love and mehndi.</div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-2);
}
.inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0;
  color: var(--muted);
  font-size: 14px;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    font-size: 13px;
    padding: 14px 0;
  }
}
</style>
