<script setup>
import Navbar from './components/Navbar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="layout">
    <Navbar />
    <main class="page">
      <div class="container">
        <router-view />
      </div>
    </main>
    <FooterBar />
  </div>
</template>

<style scoped>
.layout { min-height: 100%; display: grid; grid-template-rows: auto 1fr auto; }
</style>
