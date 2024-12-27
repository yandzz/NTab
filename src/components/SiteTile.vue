<template>
  <li
    class="site-tile"
    :class="[
      `tile-${site.size || '1x1'}`,
      { 'is-dragging': isDragging },
      { 'is-drag-over': isDragOver }
    ]"
    draggable="true"
    @click="$emit('click', $event)"
    @contextmenu.prevent="$emit('contextmenu', $event)"
    @dragstart="$emit('dragstart', $event)"
    @dragend="$emit('dragend', $event)"
    @dragenter="$emit('dragenter', $event)"
    @dragleave="$emit('dragleave', $event)"
    @dragover="$emit('dragover', $event)"
    @drop="$emit('drop', $event)"
  >
    <el-card
      :body-style="{ padding: '0px' }"
      shadow="hover"
      class="site-card"
    >
      <div class="site-icon" :style="{ backgroundColor: site.color || '#ffffff' }">
        <el-image
          :src="site.icon"
          :alt="site.name"
          fit="contain"
          class="site-image"
        >
          <template #error>
            <el-icon><Picture /></el-icon>
          </template>
        </el-image>
      </div>
    </el-card>
    <span class="site-name">{{ site.name }}</span>
  </li>
</template>

<script setup>
import { Picture } from '@element-plus/icons-vue'

defineProps({
  site: {
    type: Object,
    required: true
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  isDragOver: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'click',
  'contextmenu',
  'dragstart',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'drop'
])
</script>

<style scoped>
.site-tile {
  position: relative;
  user-select: none;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  transition: transform 260ms linear;
}

.site-card {
  height: 100%;
  border-radius: var(--el-border-radius-base);
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  transition: transform 260ms linear, box-shadow 260ms linear;
}

.site-card :deep(.el-card__body) {
  height: 100%;
  padding: 0;
}

.site-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-image {
  width: 100%;
  height: 100%;
}

.site-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -25px;
  font-size: var(--el-font-size-small);
  color: var(--el-text-color-primary);
  text-align: center;
  white-space: nowrap;
  max-width: 100%;
  padding: 0 4px;
}

.site-tile.is-dragging {
  z-index: 100;
}

.site-tile.is-dragging .site-card {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.site-tile.is-drag-over .site-card {
  border: 1px solid var(--el-border-color-lighter);
}

.site-tile:active {
  transform: none;
}
</style> 