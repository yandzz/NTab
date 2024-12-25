<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['close', 'focus', 'blur'])
const searchText = ref('')
const searchEngine = ref('google')
const showEngineSelect = ref(false)

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const engines = {
  google: {
    name: 'Google',
    icon: 'ri:google-fill',
    url: 'https://www.google.com/search?q='
  },
  baidu: {
    name: '百度',
    icon: 'ri:baidu-fill',
    url: 'https://www.baidu.com/s?wd='
  },
  bing: {
    name: 'Bing',
    icon: 'ri:microsoft-fill',
    url: 'https://www.bing.com/search?q='
  }
}

const handleSearch = () => {
  if (!searchText.value) return
  const url = engines[searchEngine.value].url + encodeURIComponent(searchText.value)
  window.location.href = url
  if (settings.value.searchHistory) {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    history.unshift({
      text: searchText.value,
      time: new Date().toISOString()
    })
    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 50)))
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (showEngineSelect.value) {
      showEngineSelect.value = false
    } else {
      emit('close')
    }
  } else if (e.key === 'Enter' && !showEngineSelect.value) {
    handleSearch()
  }
}

const switchEngine = (engine) => {
  searchEngine.value = engine
  showEngineSelect.value = false
}

const toggleEngineSelect = () => {
  showEngineSelect.value = !showEngineSelect.value
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.search-box')) {
    showEngineSelect.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div v-if="settings.showSearch" class="search-bar">
    <div 
      class="search-box" 
      :class="{ 'engine-selecting': showEngineSelect }"
      :style="{ 
        height: `${settings.searchBarHeight}px`,
        borderRadius: `${settings.searchBarRadius}px`,
        background: `rgba(255, 255, 255, ${settings.searchBarOpacity * 0.2})`
      }"
    >
      <div class="engine-icon" @click.stop="toggleEngineSelect">
        <Icon :icon="engines[searchEngine].icon" />
      </div>
      <input
        v-model="searchText"
        type="text"
        :placeholder="`在 ${engines[searchEngine].name} 中搜索`"
        @keydown="handleKeydown"
        @focus="emit('focus')"
        @blur="emit('blur')"
      >
      <div class="search-icon" @click="handleSearch" role="button">
        <Icon icon="ri:search-line" />
      </div>
      <div class="engine-select" v-show="showEngineSelect" @click.stop>
        <div 
          v-for="(engine, key) in engines" 
          :key="key"
          class="engine-option"
          :class="{ active: searchEngine === key }"
          @click="switchEngine(key)"
        >
          <Icon :icon="engine.icon" class="engine-option-icon" />
          <span>{{ engine.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  position: relative;
  z-index: 1000;
}

.search-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.search-box:hover,
.search-box:focus-within {
  background: rgba(255, 255, 255, 0.3) !important;
}

.engine-icon,
.search-icon {
  width: 46px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  flex-shrink: 0;
}

.search-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

.search-icon:hover {
  opacity: 0.8;
}

input {
  flex: 1;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  color: white;
  font-size: 1rem;
  outline: none;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.engine-select {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: slideDown 0.2s ease-out;
  z-index: 1100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.engine-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(255, 255, 255, 0.8);
}

.engine-option:hover,
.engine-option.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.engine-option-icon {
  font-size: 1.2rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 