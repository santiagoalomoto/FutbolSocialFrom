<template>
  <div class="standings-container">
    <h1 class="title">Tabla de Posiciones</h1>

    <div v-if="loading" class="loading">Cargando posiciones...</div>

    <table v-else class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Equipo</th>
          <th>Nombre</th>
          <th>PJ</th>
          <th>G</th>
          <th>E</th>
          <th>P</th>
          <th>DG</th>
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
  max-width: 1100px;
  margin: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2rem;
  color: #405163;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.loading {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin-top: 2rem;
}

.standings-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  font-size: 0.95rem;
  color: #333;
}

.standings-table thead {
  background-color: #ccced1;
  color: rgb(0, 0, 0);
  font-weight: 600;
}

.standings-table th,
.standings-table td {
  padding: 10px 14px;
  text-align: center;
  border-top: 1px solid #e2dddd;
}

.standings-table tbody tr:nth-child(even) {
  background-color: #f7f7f7;
}

.standings-table tbody tr:hover {
  background-color: #e0f1ff;
  cursor: default;
  transition: background-color 0.2s ease;
}
</style>
