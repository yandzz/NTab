<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const updateSetting = (key) => {
  settingsStore.updateSetting(key, !settings.value[key])
  settingsStore.saveSettings()
}
</script>

<template>
  <div class="open-mode-settings">
    <div class="setting-item">
      <div class="setting-content">
        <div class="setting-title">新标签页打开搜索结果</div>
      </div>
      <div class="setting-action">
        <label class="switch">
          <input 
            type="checkbox" 
            v-model="settings.searchInNewTab"
            @click="updateSetting('searchInNewTab')"
          >
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="setting-item">
      <div class="setting-content">
        <div class="setting-title">新标签页打开图标</div>
      </div>
      <div class="setting-action">
        <label class="switch">
          <input 
            type="checkbox" 
            v-model="settings.iconsInNewTab"
            @click="updateSetting('iconsInNewTab')"
          >
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.open-mode-settings {
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.setting-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.98);
}

.setting-content {
  flex: 1;
  margin-right: 20px;
}

.setting-title {
  font-size: 0.95rem;
  margin-bottom: 4px;
  color: #333;
  transition: color 0.3s ease;
}

.setting-item:hover .setting-title {
  color: #007aff;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .3s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007aff;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style> 