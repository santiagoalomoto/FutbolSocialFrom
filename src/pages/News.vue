<template>
  <div class="news-container">
    <h1 class="title">Noticias</h1>

    <div v-if="loading" class="loading">Cargando noticias...</div>

    <div v-else class="news-list">
      <div v-for="item in news" :key="item.id" class="news-card">
        <img :src="item.image_url" alt="imagen noticia" class="news-img" />
        <div class="news-content">
          <h3>{{ item.title }}</h3>
          <p class="date">{{ formatDate(item.date) }}</p>
          <p>{{ item.description }}</p>
          <p v-if="item.match" class="related-match">
            Relacionado al partido:
            <strong>{{ item.match.team1?.name }}</strong> vs <strong>{{ item.match.team2?.name }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const news = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/news')
    news.value = res.data
  } catch (err) {
    alert('Error al cargar noticias')
  } finally {
    loading.value = false
  }
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-EC', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.news-container {
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
.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.news-card {
  display: flex;
  gap: 1rem;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}
.news-card:hover {
  transform: translateY(-3px);
}
.news-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}
.news-content {
  flex: 1;
  color: #2d3748;
}
.news-content h3 {
  margin: 0 0 0.5rem 0;
}
.date {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.75rem;
}
.related-match {
  margin-top: 1rem;
  font-weight: 600;
  color: #555;
}
</style>
