<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const menuItems = ref([
  { id: 'home', icon: 'bi:house', name: '首页' },
  { id: 'apps', icon: 'bi:grid', name: '应用' },
  { id: 'bookmarks', icon: 'bi:bookmark', name: '书签' },
  { id: 'notes', icon: 'bi:journal-text', name: '笔记' },
  { id: 'todos', icon: 'bi:check2-square', name: '待办' }
])
</script>

<template>
  <div class="side-menu">
    <div class="menu-top">
      <div class="logo">
        <Icon icon="bi:grid-3x3-gap-fill" />
      </div>
      <div class="menu-items">
        <div 
          v-for="item in menuItems" 
          :key="item.id"
          class="menu-item"
        >
          <Icon :icon="item.icon" />
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    
    <div class="menu-bottom">
      <div class="menu-item">
        <Icon icon="bi:gear" />
        <span class="item-name">设置</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-menu {
  width: 60px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.menu-items {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-item {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.2rem;
}

.item-name {
  font-size: 0.6rem;
  margin-top: 4px;
}

.menu-item:hover {
  color: white;
}

.menu-bottom {
  padding: 10px 0;
}
</style> 