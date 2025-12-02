<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Pomodoro Timer</h1>
        <p class="tagline">Track your study time with the Pomodoro technique and a Calendar!</p>
        <div class="cta-buttons">
          <router-link to="/pomodoro" class="btn btn-primary">Start Timer</router-link>
          <router-link to="/calendar" class="btn btn-secondary">View Calendar</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <h2>How Pomodoro works</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>Choose a task</h3>
          <p>Need to study for an upcoming exam or have time to focus? Think about the goals you want to complete in this productivity session.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏱️</div>
          <h3>Start your first Pomodoro</h3>
          <p>Begin the timer and focus on your task for 25 minutes. Then take a 5 minute break to complete one Pomodoro!</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Stay Focused</h3>
          <p>After completing 4 Pomodoros, reward yourself with a longer break! This break usually lasts 15 minutes.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📅</div>
          <h3>Track Progress</h3>
          <p>You can also utilize the calendar tool to keep track of dates and schedules.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup></script>
