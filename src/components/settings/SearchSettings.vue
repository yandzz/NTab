<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const sliderStyle = computed(() => {
  const percentage = ((settings.value.searchBarHeight - 36) / (60 - 36)) * 100
  return {
    background: `linear-gradient(to right, #007aff ${percentage}%, #ddd ${percentage}%)`
  }
})

const radiusSliderStyle = computed(() => {
  const percentage = (settings.value.searchBarRadius / 50) * 100
  return {
    background: `linear-gradient(to right, #007aff ${percentage}%, #ddd ${percentage}%)`
  }
})

const opacitySliderStyle = computed(() => {
  const percentage = ((settings.value.searchBarOpacity - 0.1) / 0.9) * 100
  return {
    background: `linear-gradient(to right, #007aff ${percentage}%, #ddd ${percentage}%)`
  }
})

const handleSwitch = (key) => {
  settingsStore.updateSetting(key, !settings.value[key])
  settingsStore.saveSettings()
}

const updateSetting = (key, value) => {
  settingsStore.updateSetting(key, value)
  settingsStore.saveSettings()
}
</script>

<template>
  <div class="search-settings">
    <div class="setting-item">
      <div class="setting-content">
        <div class="setting-title">
          <span class="setting-title-text">显示搜索栏</span>
          <div class="setting-title-action">
            <label class="switch">
              <input 
                type="checkbox" 
                :checked="settings.showSearch"
                @click="handleSwitch('showSearch')"
              >
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div v-if="settings.showSearch" class="setting-extra">
          <div class="height-control">
            <div class="setting-desc">搜索栏高度</div>
            <div class="slider-container">
              <input 
                type="range" 
                v-model.number="settings.searchBarHeight"
                min="36"
                max="60"
                step="2"
                class="range-slider"
                :style="sliderStyle"
                @input="updateSetting('searchBarHeight', settings.searchBarHeight)"
              >
            </div>
            <div class="height-value">{{ settings.searchBarHeight }}px</div>
          </div>
          <div class="height-control">
            <div class="setting-desc">搜索栏圆角</div>
            <div class="slider-container">
              <input 
                type="range" 
                v-model.number="settings.searchBarRadius"
                min="0"
                max="50"
                step="1"
                class="range-slider"
                :style="radiusSliderStyle"
                @input="updateSetting('searchBarRadius', settings.searchBarRadius)"
              >
            </div>
            <div class="height-value">{{ settings.searchBarRadius }}px</div>
          </div>
          <div class="height-control">
            <div class="setting-desc">搜索栏透明</div>
            <div class="slider-container">
              <input 
                type="range" 
                v-model.number="settings.searchBarOpacity"
                min="0.1"
                max="1"
                step="0.05"
                class="range-slider"
                :style="opacitySliderStyle"
                @input="updateSetting('searchBarOpacity', settings.searchBarOpacity)"
              >
            </div>
            <div class="height-value">{{ (settings.searchBarOpacity * 100).toFixed(0) }}%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="setting-item">
      <div class="setting-content">
        <div class="setting-title">
          <span class="setting-title-text">记录搜索历史</span>
          <div class="setting-title-action">
            <label class="switch">
              <input 
                type="checkbox" 
                :checked="settings.searchHistory"
                @click="handleSwitch('searchHistory')"
              >
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-settings {
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  min-width: 0;
}

.setting-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.98);
}

.setting-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-title {
  font-size: 13px;
  margin-bottom: 4px;
  color: #333;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  height: 20px;
  justify-content: space-between;
  padding-right: 20px;
}

.setting-title-text {
  flex: 1;
}

.setting-title-action {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  justify-content: flex-end;
  margin-right: -20px;
}

.setting-item:hover .setting-title {
  color: #007aff;
}

/* 开关样式 */
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

.setting-desc {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  min-width: 60px;
  line-height: 20px;
}

.slider-container {
  flex: 1;
  margin: 0 6px;
  min-width: 100px;
  max-width: 120px;
  display: flex;
  align-items: center;
}

.range-slider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  position: relative;
}

.range-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
}

.range-slider::-moz-range-track {
  height: 4px;
  border-radius: 2px;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #007aff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 122, 255, 0.2);
  margin-top: -6px;
}

.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
}

.range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #007aff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 122, 255, 0.2);
}

.range-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
}

.setting-extra {
  margin-top: 8px;
}

.height-control {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 20px;
  margin-bottom: 8px;
}

.height-control:last-child {
  margin-bottom: 0;
}

.height-value {
  font-size: 13px;
  color: #007aff;
  font-weight: 500;
  min-width: 38px;
  text-align: right;
  line-height: 20px;
}
</style> 