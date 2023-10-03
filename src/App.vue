<script setup lang="ts">
import Guider from './components/Guider.vue';
</script>

<template>
  <Guider />
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.content {
  margin-left: 30%;
  margin-right: 30%;
}
</style>
