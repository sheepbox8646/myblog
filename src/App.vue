<script setup lang="ts">
import Guider from './components/Guider.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Guider />
  <div class="content">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<style scoped>
.content {
  margin-left: 30%;
  margin-right: 30%;
}
</style>
