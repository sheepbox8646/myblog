<script setup lang="ts">
import { ref } from 'vue';
import config from '../config/config';

const configs = ref(config);
</script>

<template>
  <div class="head">
    <h1>{{ configs.title }}</h1>
    <span v-for="sign in configs.signs">
      <span class="sign">{{ sign }},</span>
    </span>
    <br /><br /><br />
    <hr />
    &nbsp;&nbsp;<span v-for="g in configs.guider" class="guider">
      <a :href="g.link" class="item" v-html="g.text"></a>
      &nbsp;&nbsp;</span>
    <hr />
  </div>
  <br /><br /><br /><br /><br /><br /><br /><br /><br />
</template>

<style scoped>
.head {
  text-align: center;
}

.guider {
  font-size: 30px;
  text-decoration: none;
}

.guider:hover {
  color: skyblue;
}

.item {
  text-decoration: none;
  color: black;
}

.item:hover {
  color: skyblue;
}
</style>