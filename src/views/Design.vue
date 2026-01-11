<template>
  <section>
    <h1 class="section-title">Variety of Designs</h1>
    <p style="color:var(--muted); margin-bottom:16px;">
      Explore minimal, Arabic, Indo-western, bridal full-hand, and festive patterns.
    </p>
    <div class="grid">
      <div v-for="(item, idx) in items" :key="idx" class="card" style="overflow:hidden;">
        <img class="placeholder" :src="item.url" :alt="item.alt" />
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { url: '/media/designs/1.png', alt: 'Design 1' },
  { url: '/media/designs/2.png', alt: 'Design 2' },
  { url: '/media/designs/3.png', alt: 'Design 3' },
  { url: '/media/designs/4.png', alt: 'Design 4' }
]
</script>

<style scoped>
</style>
