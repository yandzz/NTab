import { defineStore } from 'pinia'

const STORAGE_KEY = 'itab-settings'

// 从本地存储加载数据
const loadState = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : null
}

export const useMainStore = defineStore('main', {
  state: () => {
    const saved = loadState()
    return saved || {
      backgrounds: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
        'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
      ],
      currentBackgroundIndex: 0,
      bookmarks: [
        { id: 1, name: 'Google', icon: 'bi:google', url: 'https://google.com' },
        { id: 2, name: 'GitHub', icon: 'bi:github', url: 'https://github.com' },
        { id: 3, name: 'YouTube', icon: 'bi:youtube', url: 'https://youtube.com' },
        { id: 4, name: 'Bilibili', icon: 'bi:play-circle', url: 'https://bilibili.com' },
      ],
      settings: {
        showClock: true,
        showDate: true,
        showWeather: true,
        clockFormat24: true,
        searchEngine: 'google',
        weatherCity: ''
      }
    }
  },

  actions: {
    nextBackground() {
      this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length
      this.saveState()
    },
    
    addBookmark(bookmark) {
      this.bookmarks.push({
        id: Date.now(),
        ...bookmark
      })
      this.saveState()
    },
    
    removeBookmark(id) {
      const index = this.bookmarks.findIndex(b => b.id === id)
      if (index > -1) {
        this.bookmarks.splice(index, 1)
        this.saveState()
      }
    },
    
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
      this.saveState()
    },

    saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
    }
  },

  getters: {
    currentBackground: (state) => state.backgrounds[state.currentBackgroundIndex]
  }
}) 