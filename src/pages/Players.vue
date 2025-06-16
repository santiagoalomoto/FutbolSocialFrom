<template>
  <div class="players-container">
    <h1 class="title">Jugadores</h1>

    <div v-if="loading" class="loading">Cargando jugadores...</div>

    <div v-else class="players-list">
      <div v-for="player in players" :key="player.id" class="player-card">
        <img
          :src="player.photo_url || defaultPhoto"
          alt="foto jugador"
          class="player-photo"
          width="80"
          height="80"
        />
        <h3 class="player-name">{{ player.name }}</h3>
        <p><strong>Número:</strong> {{ player.number }}</p>
        <p><strong>Posición:</strong> {{ player.position }}</p>
        <p><strong>Equipo:</strong> {{ player.team?.name || 'Sin equipo' }}</p>
        <p class="stats">
          ⚽ {{ player.goals }} &nbsp;|&nbsp; 🟨 {{ player.yellow_cards }} &nbsp;|&nbsp; 🟥 {{ player.red_cards }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const players = ref([])
const loading = ref(true)
const defaultPhoto = '/default-avatar.png' // reemplaza por la ruta real si tienes

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/players')
    players.value = res.data
  } catch (err) {
    alert('Error al cargar jugadores')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.players-container {
  padding: 2rem;
}
.title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
}
.loading {
  font-size: 1.2rem;
  color: #666;
}
.players-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.player-card {
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 1.25rem;
  width: 220px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}
.player-card:hover {
  transform: translateY(-4px);
  border-color: #3182ce;
  box-shadow: 0 4px 12px rgba(49,130,206,0.3);
}
.player-photo {
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
  width: 80px;
  height: 80px;
  border: 2px solid #3182ce;
}
.player-name {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}
.stats {
  margin-top: 0.75rem;
  font-weight: 600;
  color: #555;
  font-size: 1rem;
}
</style>
