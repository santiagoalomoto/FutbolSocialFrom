<template>
  <div class="standings-container">
    <h1 class="title">Tabla de Posiciones</h1>

    <div v-if="loading" class="loading">Cargando posiciones...</div>

    <table v-else class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Equipo</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PE</th>
          <th>PP</th>
          <th>GF</th>
          <th>GC</th>
          <th>Dif</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in standings" :key="team.id">
          <td>{{ index + 1 }}</td>
          <td>{{ team.team?.name || 'Sin equipo' }}</td>
          <td>{{ team.played }}</td>
          <td>{{ team.wins }}</td>
          <td>{{ team.draws }}</td>
          <td>{{ team.losses }}</td>
          <td>{{ team.goals_for }}</td>
          <td>{{ team.goals_against }}</td>
          <td>{{ team.goal_diff }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const standings = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/standings')
    standings.value = res.data
  } catch (err) {
    alert('Error al cargar la tabla')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.standings-container {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
}

.title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
}

.loading {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
}

.standings-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.standings-table th,
.standings-table td {
  padding: 0.75rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.standings-table thead {
  background-color: #3182ce;
  color: white;
  font-weight: 600;
}

.standings-table tbody tr:nth-child(even) {
  background-color: #f7fafc;
}

.standings-table tbody tr:hover {
  background-color: #bee3f8;
  cursor: default;
}
</style>
