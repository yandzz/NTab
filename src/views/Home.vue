<script setup>
import { ref } from 'vue'
import Clock from '../components/Clock.vue'
import SearchBar from '../components/SearchBar.vue'
import SideNav from '../components/SideNav.vue'
import AddSiteDialog from '../components/AddSiteDialog.vue'
import { Icon } from '@iconify/vue'

const showAddDialog = ref(false)
const sites = ref([
  {
    url: 'https://www.google.com',
    name: 'Google',
    icon: 'ri:google-fill'
  }
])

const handleAddSite = (site) => {
  sites.value.push(site)
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
          <div class="links-grid">
            <a 
              v-for="site in sites" 
              :key="site.url"
              :href="site.url" 
              target="_blank"
              class="link-item"
            >
              <Icon :icon="site.icon" class="icon" />
              <span>{{ site.name }}</span>
            </a>
            <div class="link-item add-link" @click="showAddDialog = true">
              <Icon icon="ri:add-line" class="icon" />
              <span>添加</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AddSiteDialog 
      :show="showAddDialog"
      @close="showAddDialog = false"
      @add="handleAddSite"
    />
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

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  gap: 25px 15px;
  width: 100%;
  justify-content: center;
}

.link-item {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 1.8rem;
}

.link-item span {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.links-container {
  animation: fadeIn 0.3s ease-out;
  padding-top: 10px;
  padding-bottom: 25px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 