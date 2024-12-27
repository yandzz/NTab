<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Clock from '../components/Clock.vue'
import SearchBar from '../components/SearchBar.vue'
import SideNav from '../components/SideNav.vue'
import AddSiteDialog from '../components/AddSiteDialog.vue'
import EditIconDialog from '../components/EditIconDialog.vue'
import { Icon } from '@iconify/vue'
import SiteTile from '../components/SiteTile.vue'
import AddTile from '../components/AddTile.vue'

// 控制添加对话框显示的响应式变量
const showAddDialog = ref(false)
// 控制编辑对话框显示的响应式变量
const showEditDialog = ref(false)
// 当前编辑的网站信息
const currentEditSite = ref(null)
// 控制右键菜单显示的响应式变量
const showContextMenu = ref(false)
// 右键菜单的位置
const contextMenuPosition = ref({ x: 0, y: 0 })
// 当前右键点击的网站信息
const currentContextSite = ref(null)
// 添加控制编辑图标对话框显示的响应式变量
const showEditIconDialog = ref(false)
// 添加拖拽相关的变量和函数
const draggedTile = ref(null)
const dragOverTile = ref(null)

// 定义网站链接的响应式数组
const sites = ref([
  {
    id: 1,
    name: 'Google',
    url: 'https://www.google.com',
    icon: 'https://www.google.com/favicon.ico',
    size: '2x2'
  },
  {
    id: 2,
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'https://github.com/favicon.ico',
    size: '1x2'
  },
  {
    id: 3,
    name: 'Baidu',
    url: 'https://www.baidu.com',
    icon: 'https://www.baidu.com/favicon.ico',
    size: '2x1'
  }
])

// 处理添加网站的函数
const handleAddSite = (site) => {
  sites.value.push(site)
}

// 处理编辑网站的函数
const handleEditSite = (site) => {
  currentEditSite.value = { ...site }
  showEditDialog.value = true
}

// 更新站信息的函数
const updateSite = (updatedSite) => {
  const index = sites.value.findIndex(s => s.url === updatedSite.url)
  if (index !== -1) {
    sites.value[index] = updatedSite
  }
  showEditDialog.value = false
}

// 处理右键点击事件，显示菜单
const handleContextMenu = (event, site) => {
  event.preventDefault()
  currentContextSite.value = site
  
  // 获取视窗大小
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 计算菜单位置
  let x = event.clientX
  let y = event.clientY
  
  // 检查右边界
  if (x + 300 > viewportWidth) { // 300px 考虑了子菜单的宽度
    x = viewportWidth - 300
  }
  
  // 检查下边界
  if (y + 200 > viewportHeight) { // 200px 考虑了菜单的大致高度
    y = viewportHeight - 200
  }
  
  contextMenuPosition.value = { x, y }
  showContextMenu.value = true
}

// 处理菜单选项选择
const handleMenuSelect = (action, size = null) => {
  showContextMenu.value = false
  
  switch (action) {
    case 'open':
      window.open(currentContextSite.value.url, '_blank')
      break
    case 'layout':
      if (size && currentContextSite.value) {
        const index = sites.value.findIndex(s => s.id === currentContextSite.value.id)
        if (index !== -1) {
          sites.value[index] = {
            ...sites.value[index],
            size: size
          }
        }
      }
      break
    case 'editIcon':
      showEditIconDialog.value = true
      break
    case 'editHome':
      handleEditSite(currentContextSite.value)
      break
    case 'delete':
      sites.value = sites.value.filter(s => s.id !== currentContextSite.value.id)
      break
  }
}

// 添更新图标的函数
const handleUpdateIcon = (updatedSite) => {
  const index = sites.value.findIndex(s => s.url === updatedSite.url)
  if (index !== -1) {
    sites.value[index] = updatedSite
  }
  showEditIconDialog.value = false
}

// 开始拖拽
const handleDragStart = (event, site) => {
  draggedTile.value = site
  
  // 获取磁贴的完整尺寸
  const rect = event.target.getBoundingClientRect()
  
  // 创建自定义拖动图像（透明的，因为我们会显示原始元素）
  const dragImage = document.createElement('div')
  dragImage.style.width = '1px'
  dragImage.style.height = '1px'
  dragImage.style.position = 'fixed'
  dragImage.style.top = '-1000px'
  
  // 添加到文档中
  document.body.appendChild(dragImage)
  
  // 设置一个透明的拖动图像
  event.dataTransfer.setDragImage(dragImage, 0, 0)
  event.dataTransfer.effectAllowed = 'move'
  
  // 添加一个延时来移除克隆的元素
  setTimeout(() => {
    document.body.removeChild(dragImage)
  }, 0)
}

// 拖拽结束
const handleDragEnd = () => {
  draggedTile.value = null
  dragOverTile.value = null
}

// 拖拽进入目标区域
const handleDragEnter = (event, site) => {
  if (site !== draggedTile.value) {
    dragOverTile.value = site
    
    // 获取拖动和目标元素的索引
    const draggedIndex = sites.value.findIndex(s => s.id === draggedTile.value.id)
    const targetIndex = sites.value.findIndex(s => s.id === site.id)
    
    // 创建新的数组进行位置调整
    const newSites = [...sites.value]
    const [draggedSite] = newSites.splice(draggedIndex, 1)
    newSites.splice(targetIndex, 0, draggedSite)
    
    // 更新站点顺序
    sites.value = newSites
  }
}

// 拖拽离开目标区域
const handleDragLeave = () => {
  dragOverTile.value = null
}

// 允许放置
const handleDragOver = (event) => {
  event.preventDefault()
}

// 处理放置
const handleDrop = (event, targetSite) => {
  event.preventDefault()
  if (draggedTile.value && targetSite !== draggedTile.value) {
    const draggedIndex = sites.value.findIndex(s => s.id === draggedTile.value.id)
    const targetIndex = sites.value.findIndex(s => s.id === targetSite.id)
    
    // 交��位置
    const [removed] = sites.value.splice(draggedIndex, 1)
    sites.value.splice(targetIndex, 0, removed)
  }
  draggedTile.value = null
  dragOverTile.value = null
}

// 在组挂载时添加全局点击事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 在组件卸载时移除全局点击事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 处理点击事件，判断是否点击在菜单外部
const handleClickOutside = (event) => {
  if (showContextMenu.value && !event.target.closest('.context-menu')) {
    showContextMenu.value = false
  }
}

// 动态设置背景颜色
const setBackgroundColor = (site) => {
  // 这里可以使用个库获取图标的主色调
  // 例如，使用 Vibrant.js 获取主色调
  // 然后将其应用为景颜色
  // 目前暂时使用一个固定颜色作为示例
  return 'rgba(255, 255, 255, 0.95)';
}
</script>

<template>
  <div class="home">
    <SideNav />
    
    <div class="main-content">
      <div class="clock-section">
        <Clock />
      </div>
      
      <div class="center-section">
        <div class="search-container">
          <SearchBar />
        </div>
        
        <div class="links-container">
          <ul class="tiles-container">
            <AddTile @click="showAddDialog = true" />
            
            <SiteTile
              v-for="site in sites"
              :key="site.id"
              :site="site"
              :isDragging="site === draggedTile"
              :isDragOver="site === dragOverTile"
              @click="window.open(site.url, '_blank')"
              @contextmenu="handleContextMenu($event, site)"
              @dragstart="handleDragStart($event, site)"
              @dragend="handleDragEnd($event)"
              @dragenter="handleDragEnter($event, site)"
              @dragleave="handleDragLeave($event)"
              @dragover="handleDragOver($event)"
              @drop="handleDrop($event, site)"
            />
          </ul>
        </div>
      </div>
    </div>
    
    <AddSiteDialog 
      :show="showAddDialog"
      @close="showAddDialog = false"
      @add="handleAddSite"
    />
    
    <AddSiteDialog 
      :show="showEditDialog"
      @close="showEditDialog = false"
      @add="updateSite"
      :site="currentEditSite"
    />
    
    <EditIconDialog 
      :show="showEditIconDialog"
      :site="currentContextSite"
      @close="showEditIconDialog = false"
      @update="handleUpdateIcon"
    />
    
    <div v-if="showContextMenu" :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }" class="context-menu">
      <div class="menu-item" @click="handleMenuSelect('open')">在新标签页打开</div>
      <div class="menu-item has-submenu">
        布
        <div class="submenu">
          <div class="menu-item" @click="handleMenuSelect('layout', '1x1')">1 x 1</div>
          <div class="menu-item" @click="handleMenuSelect('layout', '1x2')">1 x 2</div>
          <div class="menu-item" @click="handleMenuSelect('layout', '2x1')">2 x 1</div>
          <div class="menu-item" @click="handleMenuSelect('layout', '2x2')">2 x 2</div>
          <div class="menu-item" @click="handleMenuSelect('layout', '2x4')">2 x 4</div>
        </div>
      </div>
      <div class="menu-item" @click="handleMenuSelect('editIcon')">编辑图标</div>
      <div class="menu-item" @click="handleMenuSelect('editHome')">编辑主页</div>
      <div class="menu-item" @click="handleMenuSelect('delete')">删除</div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-left: 50px;
}

.clock-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 40px;
}

.center-section {
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.search-container,
.links-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.links-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tiles-container {
  list-style: none;
  margin: 0;
  padding: 20px;
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--tile-gap);
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.tiles-container > li {
  transform: translate3d(0, 0, 0);
  transition: transform 260ms linear;
  will-change: transform;
}

.add-icon {
  font-size: 24px;
  color: var(--el-text-color-primary);
}

.site-tile {
  order: -1;
}

.context-menu {
  position: fixed;
  background: rgba(50, 50, 50, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  width: 150px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 4px 0;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.3s;
  color: white;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.has-submenu {
  position: relative;
}

.has-submenu:after {
  content: "›";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.submenu {
  position: absolute;
  left: 100%;
  top: -4px;
  background: rgba(50, 50, 50, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  width: 120px;
  display: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 4px 0;
}

.has-submenu:hover .submenu {
  display: block;
}
</style> 