<script setup></script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/pomodoro">Pomodoro</router-link>
    |
    <router-link to="/calendar">Calendar</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
nav {
  padding: 12px 16px;
  background: #f6f8fa;
  border-bottom: 1px solid #e6e9ec;
}
nav a {
  margin-right: 8px;
  color: #3b82f6;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: 600;
}
main {
  padding: 16px;
}
</style>
