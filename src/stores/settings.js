import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      searchInNewTab: true,
      iconsInNewTab: true,
      showSearch: true,
      searchHistory: true,
      searchBarHeight: Number(46),
      searchBarRadius: Number(23),
      searchBarOpacity: Number(0.5)
    }
  }),

  actions: {
    updateSetting(key, value) {
      if (typeof value === 'boolean') {
        this.settings[key] = value
      } else {
        this.settings[key] = Number(value)
      }
    },

    // 从 localStorage 加载设置
    loadSettings() {
      const savedSettings = localStorage.getItem('settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        this.settings = {
          ...this.settings,
          ...parsed,
          searchBarHeight: Number(parsed.searchBarHeight || 46),
          searchBarRadius: Number(parsed.searchBarRadius || 23),
          searchBarOpacity: Number(parsed.searchBarOpacity || 0.5)
        }
      }
    },

    // 保存设置到 localStorage
    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings))
    }
  }
}) 