<template>
  <section>
    <h1 class="section-title">Variety of Designs</h1>
    <p style="color:var(--muted); margin-bottom:16px;">
      Explore minimal, Arabic, Indo-western, bridal full-hand, and festive patterns.
      If Instagram is configured, latest posts appear below.
    </p>
    <div v-if="loading" style="color:var(--muted)">Loading gallery…</div>
    <div v-else class="grid">
      <template v-if="items.length">
        <a v-for="(item, idx) in items" :key="item.id + '-' + idx" class="card" :href="item.permalink" target="_blank" rel="noopener" style="overflow:hidden;">
          <img class="placeholder" :src="item.url" :alt="item.alt" />
        </a>
      </template>
      <template v-else>
        <div class="card" v-for="n in 9" :key="n" style="overflow:hidden;">
          <img class="placeholder" :src="`/media/placeholders/placeholder-${(n%6)+1}.svg`" :alt="`Design ${n}`" />
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const items = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/instagram.json', { cache: 'no-store' })
    if (!res.ok) throw new Error('no json')
    const data = await res.json()
    const flattened = []
    for (const it of (data.items || [])) {
      for (const url of it.images || []) {
        flattened.push({
          id: it.id,
          url,
          alt: it.caption?.slice(0, 100) || 'Instagram image',
          permalink: it.permalink
        })
      }
    }
    items.value = flattened
  } catch (e) {
    items.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
