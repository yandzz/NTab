<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '../stores/main'

// 获取主存储实例
const store = useMainStore()
const weather = ref(null)
const loading = ref(false)

// 异步获取天气数据的函数
const fetchWeather = async () => {
  if (!store.settings.weatherCity) return
  
  loading.value = true
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${store.settings.weatherCity}&appid=YOUR_API_KEY&units=metric`)
    const data = await res.json()
    weather.value = data
  } catch (error) {
    console.error('Failed to fetch weather:', error)
  }
  loading.value = false
}

// 在组件挂载时调用 fetchWeather 函数
onMounted(fetchWeather)
</script>

<template>
  <div v-if="weather" class="weather">
    <div class="temperature">{{ Math.round(weather.main.temp) }}°C</div>
    <div class="description">{{ weather.weather[0].description }}</div>
    <div class="city">{{ weather.name }}</div>
  </div>
</template>

<style scoped>
.weather {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  text-align: right;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.temperature {
  font-size: 2rem;
  font-weight: 300;
}

.description {
  font-size: 1rem;
  opacity: 0.9;
}

.city {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style> 