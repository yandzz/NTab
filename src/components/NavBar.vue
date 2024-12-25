<script setup>
const navItems = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' }
]
</script>

<template>
  <nav class="nav-bar">
    <div class="logo">Logo</div>
    <ul class="nav-items">
      <li v-for="item in navItems" :key="item.path" class="nav-item">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-items {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 2rem;
}

.nav-item a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.nav-item a:hover {
  color: #42b883;
}

.nav-item a.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style> 