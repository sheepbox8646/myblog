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
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 300px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media screen and (max-width:1100px) {
  .content {
    margin-left: 10%;
    margin-right: 10%;
  }
}

@media screen and (max-width:900px) {
  .content {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
