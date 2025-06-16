<template>
  <div class="teams-container">
    <h1 class="title">Equipos Registrados</h1>

    <div v-if="loading" class="loading">Cargando...</div>

    <div v-else class="teams-list">
      <div v-for="team in teams" :key="team.id" class="team-card">
        <img
          :src="team.logo_url || defaultLogo"
          alt="logo"
          class="team-logo"
        />
        <h2 class="team-name">{{ team.name }}</h2>
        <p class="team-division">{{ team.division || 'Sin división' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const teams = ref([])
const loading = ref(true)
const defaultLogo = '/default-team-logo.png' // Pon aquí un logo por defecto si quieres

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/teams')
    teams.value = res.data
  } catch (error) {
    alert('Error al cargar equipos')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.teams-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.teams-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
}

.team-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
  width: 180px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.15);
}

.team-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.8rem;
  border-radius: 50%;
  background-color: #f7fafc;
}

.team-name {
  font-size: 1.2rem;
  color: #1a202c;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.team-division {
  font-size: 0.9rem;
  color: #718096;
}
</style>
