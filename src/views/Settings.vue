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

const handleIconTypeChange = (type) => {
  iconType.value = type
  if (type === 'favicon' && siteUrl.value) {
    try {
      const hostname = new URL(siteUrl.value).hostname
      siteIcon.value = `https://favicon.yandex.net/favicon/${hostname}`
    } catch (error) {
      console.error('Invalid URL:', error)
      siteIcon.value = 'ri:global-line' // 使用默认图标
    }
  }
}

const errors = ref({
  url: '',
  name: ''
})

const siteUrl = ref('')
const siteName = ref('')

const handleSubmit = () => {
  // 重置错误状态
  errors.value.url = ''
  errors.value.name = ''

  // 验证网站地址
  if (!siteUrl.value) {
    errors.value.url = '请输入网站地址'
  }

  // 验证网站名称
  if (!siteName.value) {
    errors.value.name = '请输入网站名称'
  }

  // 如果有错误，阻止提交
  if (errors.value.url || errors.value.name) {
    return
  }

  emit('add', {
    url: siteUrl.value,
    name: siteName.value,
    icon: siteIcon.value,
    iconType: iconType.value,
    iconText: iconText.value,
    iconColor: iconColor.value,
    iconBackground: iconBackground.value
  })

  // 重置表单
  siteUrl.value = ''
  siteName.value = ''
  siteIcon.value = 'ri:global-line'
  iconType.value = 'text'
  iconText.value = ''
  iconColor.value = '#333333'
  iconBackground.value = '#ffffff'

  emit('close')
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
          <div class="form-item">
            <label>网站地址</label>
            <input 
              v-model="siteUrl" 
              type="url" 
              placeholder="https://example.com"
              required
            >
            <span v-if="errors.url" class="error-message">{{ errors.url }}</span>
          </div>

          <div class="form-item">
            <label>网站名称</label>
            <input 
              v-model="siteName" 
              type="text" 
              placeholder="网站名称"
              required
            >
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>
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

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
}
</style> 