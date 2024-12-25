<script setup>
const quickLinks = [
  { id: 1, name: 'Google', icon: 'bi:google', url: 'https://google.com' },
  { id: 2, name: 'GitHub', icon: 'bi:github', url: 'https://github.com' },
  { id: 3, name: 'YouTube', icon: 'bi:youtube', url: 'https://youtube.com' },
  { id: 4, name: 'Bilibili', icon: 'bi:play-circle', url: 'https://bilibili.com' }
]
</script>

<template>
  <div class="quick-access">
    <div class="grid">
      <a 
        v-for="link in quickLinks" 
        :key="link.id"
        :href="link.url"
        class="grid-item"
        target="_blank"
      >
        <div class="item-icon">
          <Icon :icon="link.icon" />
        </div>
        <div class="item-name">{{ link.name }}</div>
      </a>
      <div class="grid-item add-item">
        <div class="item-icon">
          <Icon icon="bi:plus-lg" />
        </div>
        <div class="item-name">添加</div>
      </div>
    </div>
    <div class="hint">按 / 搜索</div>
  </div>
</template>

<style scoped>
.quick-access {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 15px;
}

.grid-item {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.grid-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
}

.item-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.item-name {
  font-size: 0.9rem;
  opacity: 0.9;
}

.add-item {
  border: 2px dashed rgba(255, 255, 255, 0.3);
  background: transparent;
}

.add-item:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: transparent;
}

.hint {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}
</style> 