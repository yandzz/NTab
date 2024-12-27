<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Lunar } from 'lunar-javascript'

// 定义小时、分钟、秒、阳历日期、农历日期和星期的响应式变量
const hours = ref('')
const minutes = ref('')
const seconds = ref('')
const solarDate = ref('')
const lunarDate = ref('')
const weekDay = ref('')

// 更新时间的函数
// 获取当前时间并更新小时、分钟和秒
// 更新阳历日期和星期
// 使用 Lunar 类获取农历日期
const updateTime = () => {
  const now = new Date()
  hours.value = String(now.getHours()).padStart(2, '0')
  minutes.value = String(now.getMinutes()).padStart(2, '0')
  seconds.value = String(now.getSeconds()).padStart(2, '0')
  
  // 阳历日期
  solarDate.value = now.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
  
  // 星期
  weekDay.value = now.toLocaleDateString('zh-CN', {
    weekday: 'long'
  })
  
  // 农历日期
  const lunar = Lunar.fromDate(now)
  lunarDate.value = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
}

// 定义定时器变量
// 在组件挂载时启动定时器，每秒更新一次时间
// 在组件卸载时清除定时器
let timer
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="clock">
    <div class="time">
      <span class="time-block">{{ hours }}</span>
      <span class="time-separator">:</span>
      <span class="time-block">{{ minutes }}</span>
      <span class="time-separator">:</span>
      <span class="time-block">{{ seconds }}</span>
    </div>
    <div class="date">
      <span>{{ solarDate }}</span>
      <span class="date-separator">·</span>
      <span>{{ lunarDate }}</span>
      <span class="date-separator">·</span>
      <span>{{ weekDay }}</span>
    </div>
  </div>
</template>

<style scoped>
.clock {
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.time {
  font-size: 4rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 5px;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.time-block {
  min-width: 1.1em;
  text-align: center;
}

.time-separator {
  opacity: 0.8;
  transform: translateY(-2px);
  text-align: center;
}

.date {
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.date-separator {
  opacity: 0.6;
}
</style> 