<template>
  <div class="study-calendar">
    <div class="calendar-main">
      <header class="cal-header">
        <button class="nav" @click="prevMonth">‹</button>
        <div class="title">{{ monthYear }}</div>
        <button class="nav" @click="nextMonth">›</button>
      </header>

      <div class="weekdays">
        <div v-for="d in weekdays" :key="d" class="weekday">{{ d }}</div>
      </div>

      <div class="days-grid">
        <button
          v-for="day in days"
          :key="day.dateKey"
          class="day"
          :class="{ today: day.isToday, other: !day.inMonth, selected: day.dateKey === selectedDate }"
          @click="selectDate(day.dateKey, day.date)"
        >
          <div class="day-num">{{ day.date.getDate() }}</div>
          <div class="dot" v-if="sessionsFor(day.dateKey).length"></div>
        </button>
      </div>
    </div>

    <section class="side">
      <h3>Sessions — {{ selectedDate || 'None' }}</h3>
      <div v-if="selectedDate">
        <ul class="session-list">
          <li v-for="(s, i) in sessionsFor(selectedDate)" :key="i">
            <strong>{{ s.time }}</strong> — {{ s.title }} ({{ s.duration }}m)
            <button class="remove" @click="removeSession(selectedDate, i)">Delete</button>
          </li>
        </ul>

        <form @submit.prevent="addSession">
          <div class="row"><label>Title <input v-model="form.title" required /></label></div>
          <div class="row"><label>Time <input v-model="form.time" type="time" required /></label></div>
          <div class="row"><label>Duration (min) <input v-model.number="form.duration" type="number" min="1" required /></label></div>
          <div class="row"><button class="cal-btn-primary" type="submit">Add Session</button></div>
        </form>
      </div>
      <div v-else>
        <p>Select a date to see or add study sessions.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const now = new Date()
const currentMonth = ref(new Date(now.getFullYear(), now.getMonth(), 1))
const selectedDate = ref(null)

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startOfMonthGrid(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1)
  const day = first.getDay()
  const start = new Date(first)
  start.setDate(first.getDate() - day)
  return start
}

const days = computed(() => {
  const start = startOfMonthGrid(currentMonth.value)
  const arr = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    arr.push({ date: d, dateKey: formatKey(d), inMonth: d.getMonth() === currentMonth.value.getMonth(), isToday: formatKey(d) === formatKey(new Date()) })
  }
  return arr
})

const monthYear = computed(() => {
  return currentMonth.value.toLocaleString(undefined, { month: 'long', year: 'numeric' })
})

function prevMonth() { currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1) }
function nextMonth() { currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1) }

// sessions persisted in localStorage as an object keyed by dateKey -> array
const storageKey = 'study-sessions'
const sessions = ref({})

onMounted(() => {
  const raw = localStorage.getItem(storageKey)
  sessions.value = raw ? JSON.parse(raw) : {}
})

function save() { localStorage.setItem(storageKey, JSON.stringify(sessions.value)) }

function sessionsFor(key) { return sessions.value[key] ? sessions.value[key] : [] }

function selectDate(key, date) {
  selectedDate.value = key
}

const form = ref({ title: '', time: '12:00', duration: 25 })

function addSession() {
  if (!selectedDate.value) return
  const entry = { title: form.value.title, time: form.value.time, duration: form.value.duration }
  if (!sessions.value[selectedDate.value]) sessions.value[selectedDate.value] = []
  sessions.value[selectedDate.value].push(entry)
  save()
  form.value.title = ''
}

function removeSession(dateKey, idx) {
  if (!sessions.value[dateKey]) return
  sessions.value[dateKey].splice(idx, 1)
  if (sessions.value[dateKey].length === 0) delete sessions.value[dateKey]
  save()
}
</script>
