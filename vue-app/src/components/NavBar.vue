<template>
  <header class="navbar">
    <div class="nav-inner">

      <nav class="links" :class="{ open: open }">
        <router-link to="/">Home</router-link>
        <router-link to="/pomodoro">Pomodoro</router-link>
        <router-link to="/calendar">Calendar</router-link>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>


