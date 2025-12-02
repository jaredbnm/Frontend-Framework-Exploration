<template>
  <div class="pomodoro">
    <div class="card">
      <div class="header">
        <h2>{{ sessionLabel }}</h2>
        <div class="subtitle">Cycle: {{ cyclesCompleted }} / 4</div>
      </div>

      <div class="timer">{{ formattedTime }}</div>

      <div class="progress" aria-hidden>
        <div class="fill" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="controls">
        <button class="btn btn-primary" @click="toggle">{{ running ? 'Pause' : 'Start' }}</button>
        <button class="btn" @click="skip">Skip</button>
        <button class="btn" @click="reset">Reset</button>
      </div>

      <div class="quick-select">
        <button :class="{ active: sessionType === 'Work' }" @click="setSession('Work')">Pomodoro</button>
        <button :class="{ active: sessionType === 'Short' }" @click="setSession('Short')">Short Break</button>
        <button :class="{ active: sessionType === 'Long' }" @click="setSession('Long')">Long Break</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

// default durations in seconds
const DEFAULTS = {
  Work: 25 * 60,
  Short: 5 * 60,
  Long: 15 * 60,
}

const sessionType = ref('Work')
const durations = ref({ ...DEFAULTS })
const total = ref(durations.value[sessionType.value])
const remaining = ref(total.value)
const running = ref(false)
const cyclesCompleted = ref(0)
let intervalId = null

function start() {
  if (running.value) return
  running.value = true
  intervalId = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value -= 1
    } else {
      completeSession()
    }
  }, 1000)
}

function pause() {
  running.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function toggle() {
  if (running.value) pause()
  else start()
}

function reset() {
  pause()
  total.value = durations.value[sessionType.value]
  remaining.value = total.value
}

function completeSession() {
  // when a Work session completes, increment cycles
  if (sessionType.value === 'Work') {
    cyclesCompleted.value = (cyclesCompleted.value + 1) % 4
  }

  // decide next session type
  if (sessionType.value === 'Work') {
    // every 4th work session -> long break
    if (cyclesCompleted.value === 0) {
      sessionType.value = 'Long'
    } else {
      sessionType.value = 'Short'
    }
  } else {
    sessionType.value = 'Work'
  }

  total.value = durations.value[sessionType.value]
  remaining.value = total.value
  // auto-start next session
}

function skip() {
  pause()
  completeSession()
}

function setSession(type) {
  pause()
  sessionType.value = type
  total.value = durations.value[type]
  remaining.value = total.value
}

const formattedTime = computed(() => {
  const mm = Math.floor(remaining.value / 60).toString().padStart(2, '0')
  const ss = Math.floor(remaining.value % 60).toString().padStart(2, '0')
  return `${mm}:${ss}`
})

const progress = computed(() => {
  if (!total.value || total.value === 0) return 0
  return Math.round(((total.value - remaining.value) / total.value) * 100)
})

const sessionLabel = computed(() => {
  if (sessionType.value === 'Work') return 'Focus Time'
  if (sessionType.value === 'Short') return 'Short Break'
  return 'Long Break'
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>