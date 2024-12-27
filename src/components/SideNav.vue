<script setup>
import { ref } from 'vue'
import Settings from './Settings.vue'

// 定义菜单项的响应式数组，每个菜单项包含 id、图标和名称
const menuItems = ref([
  { id: 'home', icon: 'ri:home-line', name: '首页' },
  { id: 'apps', icon: 'ri:apps-line', name: '应用' },
  { id: 'bookmarks', icon: 'ri:bookmark-line', name: '书签' },
  { id: 'notes', icon: 'ri:file-list-line', name: '笔记' },
  { id: 'todos', icon: 'ri:checkbox-line', name: '待办' },
  { id: 'calendar', icon: 'ri:calendar-line', name: '日历' },
  { id: 'music', icon: 'ri:music-2-line', name: '音乐' },
  { id: 'photos', icon: 'ri:image-line', name: '相册' },
  { id: 'videos', icon: 'ri:video-line', name: '视频' },
  { id: 'downloads', icon: 'ri:download-line', name: '下载' },
  { id: 'documents', icon: 'ri:file-text-line', name: '文档' },
  { id: 'cloud', icon: 'ri:cloud-line', name: '云盘' },
  { id: 'chat', icon: 'ri:message-3-line', name: '聊天' },
  { id: 'mail', icon: 'ri:mail-line', name: '邮件' },
  { id: 'contacts', icon: 'ri:contacts-line', name: '联系人' }
])

// 当前选中的路由，默认为 'home'
const currentRoute = ref('home')

// 控制添加菜单和设置显示的响应式变量
const showAddMenu = ref(false)
const showSettings = ref(false)

// 新菜单项的响应式对象
const newMenu = ref({
  id: '',
  icon: '',
  name: ''
})

// 处理添加菜单项的函数
const handleAddMenu = () => {
  if (newMenu.value.id && newMenu.value.icon && newMenu.value.name) {
    menuItems.value.push({
      id: newMenu.value.id,
      icon: newMenu.value.icon,
      name: newMenu.value.name
    })
    newMenu.value = { id: '', icon: '', name: '' }
    showAddMenu.value = false
  }
}
</script>

<template>
  <div class="side-nav">
    <div class="nav-top">
      <div class="menu-item">
        <Icon icon="ri:user-line" />
        <div class="item-name">登录</div>
      </div>
    </div>
    
    <div class="nav-middle">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="menu-item"
        :class="{ active: currentRoute === item.id }"
      >
        <Icon :icon="item.icon" />
        <div class="item-name">{{ item.name }}</div>
      </div>
      
      <div class="menu-item add-menu" @click="showAddMenu = true">
        <Icon icon="ri:add-line" />
        <div class="item-name">添加</div>
      </div>
    </div>
    
    <div class="nav-bottom">
      <div class="menu-item" @click="showSettings = true">
        <Icon icon="ri:settings-line" />
        <div class="item-name">设置</div>
      </div>
    </div>
  </div>

  <Settings v-if="showSettings" @close="showSettings = false" />
</template> 

<style scoped>
.side-nav {
  width: 50px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  top: 0;
}

.nav-top,
.nav-middle,
.nav-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.nav-top .menu-item {
  height: 90px;
}

.nav-middle {
  flex: 1;
  margin-top: 90px;
  margin-bottom: 56px;
  overflow-y: auto;
}

.nav-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.nav-bottom .menu-item {
  height: 56px;
}

.menu-item {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
  gap: 2px;
  backdrop-filter: blur(5px);
}

.menu-item .iconify {
  width: 20px;
  height: 20px;
  font-size: 20px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.menu-item:hover .iconify {
  transform: scale(1.15);
}

.menu-item:hover,
.menu-item.active {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: white;
  border-radius: 0 2px 2px 0;
}

.item-name {
  font-size: 0.7rem;
  margin-top: 3px;
}

.nav-middle::-webkit-scrollbar {
  width: 0;
}

.add-menu {
  opacity: 0.6;
}

.add-menu:hover {
  opacity: 1;
}
</style> 