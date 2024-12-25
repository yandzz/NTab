<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Lunar } from 'lunar-javascript'

const hours = ref('')
const minutes = ref('')
const seconds = ref('')
const solarDate = ref('')
const lunarDate = ref('')
const weekDay = ref('')

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