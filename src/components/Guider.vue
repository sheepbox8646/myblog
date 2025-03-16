<script setup lang="ts">
import { ref } from 'vue';
import config from '../config/config';

const configs = ref(config);
</script>

<template>
  <div class="head">
    <h1>{{ configs.title }}</h1>
    <div class="signs">
      <span v-for="sign in configs.signs" class="sign">{{ sign }}</span>
    </div>
    <hr />
    <nav class="nav">
      <span v-for="g in configs.guider" class="guider">
        <a :href="g.link" v-html="g.text" class="item"></a>
      </span>
    </nav>
  </div>
</template>

<style scoped>
.head {
  text-align: center;
  padding: 2rem 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.head h1 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.signs {
  margin-bottom: 0;
}

.sign {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0.5rem;
}

.sign:not(:last-child)::after {
  content: ",";
}

.guider {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.item {
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.item:hover {
  color: #3498db;
  background-color: #f8f9fa;
}
</style>