<template>
  <div>
    <h1>Partidos</h1>

    <div v-if="loading">Cargando partidos...</div>

    <div v-else class="matches">
      <div
        v-for="match in matches"
        :key="match.id"
        class="match-card"
        :class="statusClass(match.status)"
      >
        <h3>{{ match.league }}</h3>
        <p>
          <strong>{{ match.team1?.name || 'Equipo 1' }}</strong>
          vs
          <strong>{{ match.team2?.name || 'Equipo 2' }}</strong>
        </p>
        <p>{{ match.date }} - {{ match.time }}</p>
        <p>
          <span v-if="match.status !== 'Programado'">
            {{ match.score_team1 }} - {{ match.score_team2 }}
          </span>
          <span v-else>
            Resultado pendiente
          </span>
        </p>
        <span class="badge">{{ match.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const matches = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/matches')
    matches.value = res.data
  } catch (err) {
    alert('Error al cargar partidos')
  } finally {
    loading.value = false
  }
})

const statusClass = (status) => {
  if (status === 'En Vivo') return 'live'
  if (status === 'Finalizado') return 'ended'
  return 'upcoming'
}
</script>

<style scoped>
.matches {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.match-card {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 250px;
  border-radius: 10px;
  position: relative;
}
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
}
.live {
  border-color: #00c853;
}
.live .badge {
  background-color: #00c853;
  color: white;
}
.ended .badge {
  background-color: #607d8b;
  color: white;
}
.upcoming .badge {
  background-color: #ff9800;
  color: white;
}
</style>
