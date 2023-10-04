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

@media screen and (max-width:900px) {
  .content {
    margin-left: 0px;
    margin-right: 0px;
    border-left: 0px;
  }
}

@media screen and (max-width:1100px) {
  .content {
    margin-left: 15%;
    margin-right: 15%;
  }
}
</style>
