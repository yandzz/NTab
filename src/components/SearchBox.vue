<script setup>
import { ref } from 'vue'

const searchText = ref('')

const handleSearch = () => {
  if (searchText.value) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchText.value)}`
  }
}
</script>

<template>
  <div class="search-box">
    <input 
      v-model="searchText"
      type="text"
      placeholder="搜索..."
      @keyup.enter="handleSearch"
      autofocus
    >
  </div>
</template>

<style scoped>
.search-box {
  width: 600px;
  max-width: 90vw;
}

input {
  width: 100%;
  padding: 15px 25px;
  font-size: 1.2rem;
  border: none;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  outline: none;
  transition: all 0.3s;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  background: rgba(255, 255, 255, 0.3);
}
</style> 