<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const openSettings = () => {
  router.push('/settings')
}
</script>

<template>
  <button class="settings-button" @click="openSettings">
    <Icon icon="bi:gear" class="icon" />
  </button>
</template>

<style scoped>
.settings-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.settings-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(30deg);
}

.icon {
  font-size: 1.2rem;
  color: white;
}
</style> 