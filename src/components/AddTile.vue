<template>
  <li class="site-tile tile-1x1">
    <el-card
      :body-style="{ padding: '0px' }"
      shadow="hover"
      class="site-card"
      @click="$emit('click')"
    >
      <div class="site-icon">
        <Icon icon="ri:add-line" class="add-icon" />
      </div>
    </el-card>
    <span class="site-name">添加</span>
  </li>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['click'])
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

.add-icon {
  font-size: 24px;
  color: var(--el-text-color-primary);
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
</style> 