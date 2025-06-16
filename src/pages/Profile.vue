<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>

    <form @submit.prevent="updateProfile">
      <label>Email</label>
      <input type="email" :value="user.email" disabled />

      <label>Rol</label>
      <input type="text" :value="user.role" disabled />

      <label>Nombre</label>
      <input v-model="name" type="text" placeholder="Tu nombre" />

      <button type="submit">Guardar cambios</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({})
const name = ref('')

const fetchProfile = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    user.value = res.data
    name.value = res.data.name || ''
  } catch (err) {
    alert('Error al obtener perfil')
  }
}

const updateProfile = async () => {
  try {
    await axios.put(
      'http://localhost:3000/users/me',
      { name: name.value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    alert('Perfil actualizado')
    await fetchProfile()
  } catch (err) {
    alert('Error al actualizar perfil')
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: 3rem auto;
  background: #222;
  padding: 2rem;
  border-radius: 12px;
  color: #eee;
}

label {
  display: block;
  margin: 1rem 0 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: none;
  background: #333;
  color: #fff;
  margin-bottom: 1rem;
}

button {
  padding: 0.75rem 2rem;
  background: #00ffc1;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #00e0b8;
}
</style>
