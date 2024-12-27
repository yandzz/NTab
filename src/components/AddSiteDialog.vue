<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// 定义组件的 props，show 用于控制对话框的显示
const props = defineProps({
  show: Boolean
})

// 定义组件的 emits，close 和 add 用于触发事件
const emit = defineEmits(['close', 'add'])

// 定义响应式变量 isMaximized 用于控制对话框是否最大化
const isMaximized = ref(false)

// 定义网站地址、名称、图标等相关的响应式变量
const siteUrl = ref('')
const siteName = ref('')
const siteIcon = ref('ri:global-line')
const iconType = ref('text') // 'text' | 'upload' | 'favicon'
const iconText = ref('')
const iconColor = ref('#333333')
const iconBackground = ref('#ffffff')

// 处理图标类型更改的函数
const handleIconTypeChange = async (type) => {
  iconType.value = type
  if (type === 'favicon' && siteUrl.value) {
    try {
      const url = new window.URL(siteUrl.value)
      const hostname = url.hostname
      const response = await fetch(`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`)
      if (!response.ok) throw new Error('Failed to fetch favicon')
      siteIcon.value = response.url
    } catch (error) {
      console.error('获取网站图标失败:', error)
      alert('无法获取网站图标，请检查网址是否正确。')
      siteIcon.value = 'ri:global-line' // 使用默认图标
    }
  }
}

// 处理文件上传的函数
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      siteIcon.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 处理表单提交的函数
// 如果网站地址或名称为空，则不提交
// 触发 'add' 事件并传递表单数据
// 重置表单
// 触发 'close' 事件
const handleSubmit = () => {
  if (!siteUrl.value || !siteName.value) return
  
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

// 切换对话框最大化状态的函数
const toggleMaximize = () => {
  isMaximized.value = !isMaximized.value
}
</script>

<template>
  <div v-if="show" class="dialog-overlay" @click="emit('close')">
    <div 
      class="dialog" 
      :class="{ 'maximized': isMaximized }"
      @click.stop
    >
      <div class="dialog-titlebar">
        <div class="title">添加快捷方式</div>
        <div class="window-controls">
          <button class="control maximize" @click="toggleMaximize">
            <svg v-if="isMaximized" viewBox="0 0 10 10">
              <path d="M3.5,3.5 h3 v3 h-3 z M4.5,4.5 h3 v3 h-3 z" stroke="currentColor" stroke-width="1" fill="none"/>
            </svg>
            <svg v-else viewBox="0 0 10 10">
              <path d="M2.5,2.5 h5 v5 h-5 z" stroke="currentColor" stroke-width="1" fill="none"/>
            </svg>
          </button>
          <button class="control close" @click="emit('close')">
            <svg viewBox="0 0 10 10">
              <path d="M1,1 L9,9 M9,1 L1,9" stroke="currentColor" stroke-width="1.1" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="dialog-body">
        <div class="form-item">
          <label>网站地址</label>
          <input 
            v-model="siteUrl" 
            type="url" 
            placeholder="https://example.com"
            required
          >
        </div>
        
        <div class="form-item">
          <label>网站名称</label>
          <input 
            v-model="siteName" 
            type="text" 
            placeholder="网站名称"
            required
          >
        </div>
        
        <div class="form-item">
          <label>图标设置</label>
          <div class="icon-type-selector">
            <button 
              :class="{ active: iconType === 'text' }" 
              @click="handleIconTypeChange('text')"
            >
              文字图标
            </button>
            <button 
              :class="{ active: iconType === 'upload' }" 
              @click="handleIconTypeChange('upload')"
            >
              上传图标
            </button>
            <button 
              :class="{ active: iconType === 'favicon' }" 
              @click="handleIconTypeChange('favicon')"
            >
              网站图标
            </button>
          </div>

          <!-- 文字图标设置 -->
          <div v-if="iconType === 'text'" class="icon-text-settings">
            <input
              v-model="iconText"
              type="text"
              placeholder="输入1-2个字符"
              maxlength="2"
            >
            <div class="color-pickers">
              <div class="color-picker">
                <label>文字颜色</label>
                <input type="color" v-model="iconColor">
              </div>
              <div class="color-picker">
                <label>背景颜色</label>
                <input type="color" v-model="iconBackground">
              </div>
            </div>
            <div class="icon-preview text-icon" :style="{
              color: iconColor,
              backgroundColor: iconBackground
            }">
              {{ iconText || 'A' }}
            </div>
          </div>

          <!-- 上传图标设置 -->
          <div v-if="iconType === 'upload'" class="icon-upload">
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="file-input"
            >
            <div class="icon-preview" v-if="siteIcon !== 'ri:global-line'">
              <img :src="siteIcon" alt="Icon preview">
            </div>
          </div>

          <!-- 网站图标预览 -->
          <div v-if="iconType === 'favicon'" class="favicon-preview">
            <div class="icon-preview" v-if="siteUrl">
              <img :src="`https://favicon.yandex.net/favicon/${new URL(siteUrl).hostname}`" 
                   alt="Favicon"
                   @error="siteIcon = 'ri:global-line'"
              >
            </div>
            <p class="hint">输入网址后自动获取网站图标</p>
          </div>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="cancel-btn" @click="emit('close')">取消</button>
        <button class="submit-btn" @click="handleSubmit">添加</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.dialog.maximized {
  width: 90%;
  max-width: 900px;
  height: 90vh;
}

.dialog-titlebar {
  background: rgba(239, 239, 239, 0.9);
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.control:hover {
  opacity: 0.8;
}

.control.close {
  background: #ff5f57;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.control.maximize {
  background: #28c940;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.control svg {
  width: 8px;
  height: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  color: rgba(0, 0, 0, 0.5);
}

.control:hover svg {
  opacity: 1;
}

.control.close:hover svg {
  color: rgba(0, 0, 0, 0.7);
}

.control.maximize:hover svg {
  color: rgba(255, 255, 255, 0.9);
}

.title {
  flex: 1;
  text-align: center;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
}

.dialog-body {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 0.9rem;
}

.form-item input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.8);
}

.icon-preview {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.dialog-footer {
  padding: 20px 25px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.submit-btn {
  background: #007aff;
  color: white;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background: #0066d6;
}

.icon-type-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.icon-type-selector button {
  flex: 1;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.2s;
}

.icon-type-selector button.active {
  background: #007aff;
  color: white;
}

.icon-text-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.color-pickers {
  display: flex;
  gap: 12px;
}

.color-picker {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.color-picker label {
  font-size: 0.8rem;
  color: #666;
}

.color-picker input {
  width: 100%;
  height: 32px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.icon-preview {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.icon-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.text-icon {
  font-size: 1.2rem;
  font-weight: 500;
}

.file-input {
  width: 100%;
  padding: 8px;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  cursor: pointer;
}

.hint {
  font-size: 0.8rem;
  color: #666;
  margin: 4px 0;
}
</style> 