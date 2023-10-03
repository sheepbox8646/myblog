<script setup lang="ts">
import { useRoute } from 'vue-router';
import post from '../config/post';
import { reactive } from 'vue';

const route = useRoute();

const postData = reactive((post[Number(route.params.pid)]));

document.title = postData.title = postData.title
</script>

<template>
  <span class="title">{{ postData.title }}</span>
  <br/>
  <span><i class="fa fa-calendar"></i>&nbsp;{{ postData.time }}</span>
</template>

<style scoped>
.title {
  font-size: 50px
}
</style>