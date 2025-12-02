<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  padding: 16px;
}
</style>
