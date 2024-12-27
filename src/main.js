import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/variables.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 从 Vue 导入 createApp 函数以创建一个新的 Vue 应用实例
// 导入作为根组件的主 App 组件
// 导入用于处理导航的路由配置
// 从 iconify 导入 Icon 组件以在应用中使用图标
// 导入 createPinia 用于状态管理
// 导入 ElementPlus 用于引入 Element Plus 组件
// 导入 ElementPlus 的样式文件
// 导入 ElementPlusIconsVue 用于引入 Element Plus 图标
// 导入全局样式变量

// 使用 App 组件作为根创建一个新的 Vue 应用实例
// 创建一个新的 Pinia 实例用于状态管理

// 在应用中使用 Pinia 作为状态管理库
// 全局注册 Icon 组件，以便在任何组件中使用
// 使用路由器处理应用内的导航
// 将 Vue 应用挂载到 id 为 'app' 的 DOM 元素上

// Creating a new Vue application instance with the App component as the root
const app = createApp(App)
// Creating a new Pinia instance for state management
const pinia = createPinia()

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Using Pinia as the state management library in the app
app.use(pinia)
// Registering the Icon component globally so it can be used in any component
app.component('Icon', Icon)
// Using the router for handling navigation within the app
app.use(router)
// Mounting the Vue application to the DOM element with id 'app'
app.mount('#app') 

// 使用 ElementPlus 作为状态管理库
app.use(ElementPlus) 