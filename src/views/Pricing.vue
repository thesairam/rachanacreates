<template>
  <section class="pricing-page">
    <div class="background"></div>

    <div class="panel hero">
      <div>
        <p class="eyebrow">Henna By Rachana</p>
        <h1>Pricing & Packages</h1>
        <p class="lede">
          Now styled to match the green studio palette. Choose a package or build your own based on coverage,
          with clear visuals for exactly how far the design goes.
        </p>
        <div class="chips">
          <span class="chip">Travel-friendly</span>
          <span class="chip">Custom designs on request</span>
          <span class="chip">Both hands or full bridal</span>
        </div>
      </div>
    </div>

    <div class="panel packages">
      <div class="panel-heading">
        <h2>Packages</h2>
        <p>Mirror of the shared reference: clear columns for coverage, price, and inclusions.</p>
      </div>
      <div class="table">
        <div class="row head">
          <div class="cell">Packages</div>
          <div class="cell">Areas Covered</div>
          <div class="cell price-col">Price</div>
        </div>
        <div v-for="item in packages" :key="item.name" class="row">
          <div class="cell name">
            <span class="icon">✦</span>
            <div>
              <div class="title">{{ item.name }}</div>
              <div class="subtitle" v-if="item.subtitle">{{ item.subtitle }}</div>
            </div>
          </div>
          <div class="cell description">
            <span v-html="item.coverage"></span>
          </div>
          <div class="cell price-col">
            <span class="pill">{{ item.price }}</span>
          </div>
        </div>
      </div>
      <ul class="notes">
        <li>Prices may vary based on design complexity.</li>
        <li>Both legs include minimal design to echo the reference layout.</li>
      </ul>
    </div>

    <div class="panel ala-carte">
      <div class="panel-heading">
        <h2>Henna by Area (One Side)</h2>
        <p>Use these to mix and match coverage — styled after the provided visual guide.</p>
      </div>
      <div class="cards">
        <article v-for="item in alaCarte" :key="item.name" class="card-item">
          <div class="badge">{{ item.step }}</div>
          <div class="card-body">
            <div class="card-title">{{ item.name }}</div>
            <div class="card-sub">{{ item.detail }}</div>
          </div>
          <div class="card-price">{{ item.price }}</div>
        </article>
      </div>
      <figure class="coverage-figure card">
        <img :src="coverageImage" alt="One-side henna pricing reference with hand illustration" />
        <figcaption>Reference visual exactly as provided — shows wrist, mid arm, elbow, and above elbow coverage.</figcaption>
      </figure>
      <ul class="notes">
        <li>Prices may vary based on design complexity.</li>
        <li>Both sides available on request.</li>
        <li>Bridal and custom designs are priced separately.</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const packages = [
  {
    name: 'Standard Package',
    subtitle: '',
    coverage: 'Both hands till 1/2 arm length + minimal design on both legs',
    price: '€200'
  },
  {
    name: 'Premium Package',
    subtitle: '',
    coverage: 'Both hands till elbow length + minimal design on both legs',
    price: '€300'
  },
  {
    name: 'Bridal Package',
    subtitle: '',
    coverage: 'Both hands above elbow length + minimal design on both legs',
    price: '€400'
  }
]

const alaCarte = [
  { step: '1', name: 'Wrist', detail: 'One side', price: '€17' },
  { step: '2', name: 'Mid Arm', detail: 'One side', price: '€30' },
  { step: '3', name: 'Elbow', detail: 'One side', price: '€130' },
  { step: '4', name: 'Above Elbow', detail: 'One side', price: '€150' }
]

// Use the provided map photo for the one-side coverage visual
const coverageImage = '/media/designs/map.jpeg'
</script>

<style scoped>
.pricing-page {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--text);
}

.background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at 18% 20%, rgba(33, 103, 83, 0.35), transparent 32%),
    radial-gradient(circle at 78% 10%, rgba(20, 64, 50, 0.35), transparent 30%),
    linear-gradient(135deg, #0f3d2e, #173f35 45%, #0f3d2e);
  opacity: 0.96;
  border-radius: 22px;
}

.panel {
  position: relative;
  z-index: 1;
  background: rgba(17, 66, 53, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 22px 24px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
}

.hero {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 18px;
  align-items: center;
}

.eyebrow {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 6px;
}

h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(28px, 5vw, 40px);
}

.lede {
  margin: 10px 0 12px;
  color: var(--muted);
  line-height: 1.5;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  background: var(--card);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-weight: 600;
}

.seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--muted);
  color: #0f3d2e;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}

.mini-note {
  margin-top: 6px;
  color: var(--text);
  font-size: 14px;
  opacity: 0.9;
}

.coverage-figure {
  margin-top: 14px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  padding: 0;
}

.coverage-figure img {
  display: block;
  width: 70%;
  height: auto;
  object-fit: cover;
  margin: 0 auto;
}

.coverage-figure figcaption {
  padding: 10px 12px;
  color: var(--muted);
  font-size: 14px;
}

.panel-heading h2 {
  margin: 0;
  color: var(--text);
}

.panel-heading p {
  margin: 6px 0 12px;
  color: var(--muted);
}

.table {
  display: grid;
  gap: 8px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1.4fr 0.5fr;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.row.head {
  background: #0f3d2e;
  box-shadow: none;
  font-weight: 700;
  color: var(--text);
}

.cell {
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}

.name .title { font-weight: 700; }
.name .subtitle { color: var(--muted); font-size: 14px; }

.icon {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  background: #0f3d2e;
  border-radius: 10px;
  color: var(--muted);
  font-size: 14px;
}

.description { line-height: 1.45; }

.price-col { justify-content: flex-end; }

.pill {
  background: var(--muted);
  color: #0f3d2e;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-weight: 700;
}

.notes {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--muted);
  line-height: 1.4;
}

.ala-carte .cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.card-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
}

.badge {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: #0f3d2e;
  color: var(--muted);
  font-weight: 800;
  border-radius: 10px;
}

.card-title { font-weight: 700; color: var(--text); }
.card-sub { color: var(--muted); font-size: 14px; }

.card-price {
  font-weight: 800;
  color: #0f3d2e;
  background: var(--muted);
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

@media (max-width: 820px) {
  .hero { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; gap: 6px; align-items: flex-start; }
  .price-col { justify-content: flex-start; }
  .table .row.head { display: none; }
  .cell { align-items: flex-start; }
}
</style>
