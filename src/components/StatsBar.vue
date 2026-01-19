<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="stats">
    <span>{{ stats.correct }}/{{ stats.asked }}</span>
    <span>❌ {{ stats.incorrect }}</span>
    <span>📘 {{ total }}</span>
  </div>
</template>


<style scoped>
.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
