<template>
  <section class="hero">
    <div>
      <h1>Elegant Mehndi for Every Occasion</h1>
      <p>
        Rachana Artverse brings modern, timeless mehndi designs for weddings, festivals,
        baby showers, sangeet, and all special moments. Minimal to intricate — crafted
        with care. Make hands Insta-Famous.
      </p>
      <div style="margin-top:16px; display:flex; gap:12px;">
        <RouterLink class="button" to="/designs">Explore Designs</RouterLink>
        <RouterLink class="button" style="background:var(--muted);" to="/contact">Book Now</RouterLink>
      </div>
    </div>
    <div class="card" style="overflow:hidden;">
      <img v-if="heroUrl" class="placeholder" :src="heroUrl" alt="Showcase" />
      <img v-else class="placeholder" src="/media/placeholders/placeholder-1.svg" alt="Showcase" />
    </div>
  </section>

  <h2 class="section-title">Featured Works</h2>
  <div class="grid">
    <template v-if="topThree.length">
      <a v-for="(it, idx) in topThree" :key="idx" class="card" :href="it.permalink" target="_blank" rel="noopener" style="overflow:hidden;">
        <img class="placeholder" :src="it.url" :alt="it.alt" />
      </a>
    </template>
    <template v-else>
      <div class="card" v-for="n in 6" :key="n" style="overflow:hidden;">
        <img class="placeholder" :src="`/media/placeholders/placeholder-${n}.svg`" :alt="`Design ${n}`" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const images = ref([])
const heroUrl = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/instagram.json', { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    const flattened = []
    for (const it of (data.items || [])) {
      for (const url of it.images || []) {
        flattened.push({ url, alt: it.caption?.slice(0, 100) || 'Instagram image', permalink: it.permalink })
      }
    }
    images.value = flattened
    heroUrl.value = flattened[0]?.url || ''
  } catch {}
})

const topThree = computed(() => images.value.slice(0, 3))
</script>

<style scoped>
</style>
