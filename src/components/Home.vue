<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
    <div class="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border-4 border-purple-300">
      <h1 class="text-5xl font-extrabold text-purple-700 mb-4 drop-shadow-md">🎉 ¡Bienvenido!</h1>
      <p class="text-lg text-gray-700 mb-6">Estás usando <span class="font-semibold text-blue-600">Tailwind CSS</span> correctamente.</p>
      
      <div class="flex justify-center gap-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full border-2 border-blue-700 transition">
          Explorar
        </button>
        <button class="bg-transparent hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-full border-2 border-purple-500 transition">
          Aprende más
        </button>
      </div>

      <div class="mt-8 text-sm text-gray-500 italic">
        Este es un ejemplo con <span class="underline text-pink-500">bordes, botones y colores</span> usando Tailwind 🎨
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
