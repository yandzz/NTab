<script setup>
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'

// 定义组件的 props
const props = defineProps({
  show: Boolean,
  site: Object
})

// 定义组件的 emits
const emit = defineEmits(['close', 'update'])

// 响应式变量
const siteUrl = ref('')
const siteName = ref('')
const iconColor = ref('#ffffff')
const iconUrl = ref('')

// 预设颜色数组
const presetColors = [
  '#FF6B6B', // 红色
  '#4ECDC4', // 青色
  '#45B7D1', // 蓝色
  '#96CEB4', // 绿色
  '#FFEEAD', // 黄色
  '#D4A5A5', // 粉色
  '#9370DB', // 紫色
  '#20B2AA'  // 湖绿色
]

// 初始化数据
const initData = () => {
  if (props.site) {
    siteUrl.value = props.site.url
    siteName.value = props.site.name
    iconUrl.value = props.site.icon
  }
}

// 获取网站图标
const fetchIcon = async () => {
  try {
    const url = new window.URL(siteUrl.value)
    const hostname = url.hostname
    const response = await fetch(`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`)
    if (!response.ok) throw new Error('获取图标失败')
    iconUrl.value = response.url
  } catch (error) {
    ElMessage.error('无法获取网站图标，请检查网址是否正确。')
  }
}

// 处理文件上传
const handleFileUpload = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    iconUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
  return false // 阻止自动上传
}

// 处理保存
const handleSave = () => {
  if (!siteUrl.value || !siteName.value) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  emit('update', {
    ...props.site,
    url: siteUrl.value,
    name: siteName.value,
    icon: iconUrl.value,
    color: iconColor.value
  })
  emit('close')
}

// 监听 show 变化，初始化数据
watch(() => props.show, (newVal) => {
  if (newVal) {
    initData()
  }
})

// 添加计算属性来处理对话框的显示状态
const dialogVisible = computed({
  get: () => props.show,
  set: (value) => emit('close')
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑图标"
    width="500px"
    :close-on-click-modal="false"
    @close="emit('close')"
  >
    <el-form label-width="60px" :model="{ siteUrl, siteName, iconColor }">
      <!-- 网址输入行 -->
      <el-form-item label="网址">
        <el-input
          v-model="siteUrl"
          placeholder="https://example.com"
        >
          <template #append>
            <el-button @click="fetchIcon" type="primary">获取图标</el-button>
          </template>
        </el-input>
      </el-form-item>

      <!-- 名称输入行 -->
      <el-form-item label="名称">
        <el-input
          v-model="siteName"
          placeholder="网站名称"
        />
      </el-form-item>

      <!-- 颜色选择行 -->
      <el-form-item label="颜色">
        <div class="color-picker">
          <div 
            v-for="color in presetColors" 
            :key="color"
            class="color-circle"
            :style="{ backgroundColor: color }"
            @click="iconColor = color"
            :class="{ active: iconColor === color }"
          ></div>
          <el-color-picker
            v-model="iconColor"
            size="small"
            :predefine="presetColors"
          />
        </div>
      </el-form-item>

      <!-- 图标设置行 -->
      <el-form-item>
        <div class="icon-actions">
          <div class="icon-preview">
            <img :src="iconUrl" alt="Icon preview">
          </div>
          <el-upload
            class="icon-upload"
            :auto-upload="false"
            accept="image/*"
            :show-file-list="false"
            :on-change="file => handleFileUpload(file.raw)"
          >
            <div class="upload-trigger">
              <el-icon><Picture /></el-icon>
              <span>选择图标</span>
            </div>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.color-picker {
  display: flex;
  gap: var(--app-gap-xs);
  align-items: center;
  flex-wrap: nowrap;
}

.color-circle {
  width: var(--app-icon-size-md);
  height: var(--app-icon-size-md);
  border-radius: var(--app-radius-circle);
  cursor: pointer;
  transition: var(--app-transition-normal);
  position: relative;
  composes: flex-center;
}

.color-circle:hover {
  transform: scale(1.1);
}

.color-circle.active {
  border-color: var(--el-color-primary);
}

.color-circle.active::after {
  content: "";
  position: absolute;
  width: var(--app-icon-size-sm);
  height: var(--app-icon-size-sm);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cg fill='none'%3E%3Cpath d='M9.765 3.205a.75.75 0 0 1 .03 1.06l-4.25 4.5a.75.75 0 0 1-1.075.015L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.705 1.704l3.72-3.939a.75.75 0 0 1 1.06-.03z' fill='white'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(var(--app-shadow-sm));
}

.icon-actions {
  composes: flex-gap;
  gap: var(--app-gap-sm);
}

.icon-preview {
  width: var(--app-icon-size-lg);
  height: var(--app-icon-size-lg);
  border: 1px solid var(--el-border-color);
  border-radius: var(--app-radius-sm);
  overflow: hidden;
  composes: flex-center;
  background: var(--el-fill-color-lighter);
}

.icon-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.icon-upload {
  flex: 1;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
}

:deep(.el-input__inner) {
  background-color: #f0f1f4;
}

:deep(.el-input-group__append) {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  color: white;
}

:deep(.el-input-group__append button) {
  color: white;
  border: none;
}

:deep(.el-color-picker__trigger) {
  border: none;
  padding: 0;
  width: var(--app-icon-size-md);
  height: var(--app-icon-size-md);
}

:deep(.el-color-picker__color) {
  border: none;
  border-radius: var(--app-radius-circle);
  background: conic-gradient(
    from 0deg,
    red,
    orange,
    yellow,
    lime,
    aqua,
    blue,
    magenta,
    red
  );
  width: var(--app-icon-size-md);
  height: var(--app-icon-size-md);
}

:deep(.el-color-picker__trigger:hover) {
  transform: scale(1.1);
  transition: var(--app-transition-normal);
}

:deep(.el-color-picker__color-inner) {
  border-radius: var(--app-radius-circle);
  width: var(--app-icon-size-md);
  height: var(--app-icon-size-md);
  left: 0;
  top: 0;
}

:deep(.el-color-picker__empty) {
  border-radius: var(--app-radius-circle);
  width: var(--app-icon-size-md);
  height: var(--app-icon-size-md);
}

:deep(.el-color-picker__icon) {
  display: none;
}

:deep(.el-color-picker__mask) {
  border-radius: var(--app-radius-circle);
}

.upload-trigger {
  display: flex;
  align-items: center;
  gap: var(--app-gap-xs);
  padding: 8px 16px;
  border-radius: var(--app-radius-sm);
  background-color: var(--app-bg-input);
  cursor: pointer;
  transition: var(--app-transition-normal);
}

.upload-trigger:hover {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.upload-trigger .el-icon {
  font-size: 16px;
}
</style> 