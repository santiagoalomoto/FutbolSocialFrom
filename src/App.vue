<template>
  <div>
    <Navbar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from './stores/user'
import Navbar from './components/Navbar.vue' // puedes crear uno simple

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.token !== null)
</script>
