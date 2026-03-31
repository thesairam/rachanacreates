<template>
  <section class="hero">
    <div>
      <h1>Elegant Mehndi for Every Occasion</h1>
      <p>
        Henna By Rachana brings modern, timeless mehndi designs for weddings, festivals,
        baby showers, sangeet, and all special moments. Minimal to intricate — crafted
        with care. Make hands Insta-Famous.
      </p>
      <div style="margin-top:16px; display:flex; gap:12px;">
        <RouterLink class="button" to="/designs">Explore Designs</RouterLink>
        <RouterLink class="button" style="background:var(--muted);" to="/contact">Book Now</RouterLink>
      </div>
    </div>
    <div class="card" style="overflow:hidden;">
      <img class="placeholder" :src="heroUrl" alt="Showcase" />
    </div>
  </section>

  <h2 class="section-title">Featured Works</h2>
  <div class="grid">
    <a v-for="(it, idx) in topThree" :key="idx" class="card" style="overflow:hidden;">
      <img class="placeholder" :src="it.url" :alt="it.alt" />
    </a>
  </div>
</template>

<script setup>
const designImages = [
  { url: '/media/designs/1.png', alt: 'Design 1' },
  { url: '/media/designs/2.png', alt: 'Design 2' },
  { url: '/media/designs/3.png', alt: 'Design 3' },
  { url: '/media/designs/4.png', alt: 'Design 4' }
]

const heroUrl = designImages[0].url
const topThree = designImages.slice(0, 3)
</script>

<style scoped>
</style>
