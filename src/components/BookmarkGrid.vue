<script setup>
import { useMainStore } from '../stores/main'
import { Icon } from '@iconify/vue'

const store = useMainStore()

const addBookmark = () => {
  const url = prompt('请输入网址：')
  if (url) {
    store.addBookmark({
      name: new URL(url).hostname.replace('www.', ''),
      icon: 'bi:globe',
      url
    })
  }
}
</script>

<template>
  <div class="bookmark-grid">
    <a 
      v-for="bookmark in store.bookmarks" 
      :key="bookmark.id"
      :href="bookmark.url"
      class="bookmark-item"
      target="_blank"
    >
      <Icon :icon="bookmark.icon" class="icon" />
      <span class="name">{{ bookmark.name }}</span>
    </a>
    <div class="bookmark-item add-bookmark" @click="addBookmark">
      <Icon icon="bi:plus-lg" class="icon" />
      <span class="name">添加</span>
    </div>
  </div>
</template>

<style scoped>
.bookmark-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.bookmark-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.bookmark-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.icon {
  font-size: 2rem;
}

.name {
  font-size: 0.9rem;
  opacity: 0.9;
}
</style> 