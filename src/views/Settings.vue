<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settingsMenus = [
  { id: 'openMode', name: '打开方式', icon: 'ri:external-link-line' },
  { id: 'general', name: '通用', icon: 'ri:settings-4-line' },
  { id: 'appearance', name: '外观', icon: 'ri:palette-line' },
  { id: 'search', name: '搜索', icon: 'ri:search-line' },
  { id: 'shortcuts', name: '快捷方式', icon: 'ri:apps-line' },
  { id: 'backup', name: '备份恢复', icon: 'ri:archive-line' },
  { id: 'about', name: '关于', icon: 'ri:information-line' }
]

const currentSettingMenu = ref('openMode')

const handleClose = () => {
  router.push('/')
}
</script>

<template>
  <div 
    class="settings-panel"
    @click.self="handleClose"
  >
    <div class="settings-content">
      <div class="settings-layout">
        <div class="settings-menu">
          <div 
            v-for="menu in settingsMenus" 
            :key="menu.id"
            class="settings-menu-item"
            :class="{ active: currentSettingMenu === menu.id }"
            @click="currentSettingMenu = menu.id"
          >
            <Icon :icon="menu.icon" />
            <span>{{ menu.name }}</span>
          </div>
        </div>
        <div class="settings-detail">
          <OpenModeSettings v-if="currentSettingMenu === 'openMode'" />
          <!-- 其他设置组件... -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.settings-content {
  width: 450px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  box-shadow: -4px 0 25px rgba(0, 0, 0, 0.15);
  cursor: default;
}

.settings-layout {
  display: flex;
  height: 100%;
}

.settings-menu {
  width: 140px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
}

.settings-menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.settings-menu-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.settings-menu-item.active {
  background: rgba(0, 0, 0, 0.05);
  color: #007aff;
}

.settings-menu-item .iconify {
  font-size: 1.2rem;
}

.settings-detail {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: white;
}
</style> 