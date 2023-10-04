<script setup lang="ts">
import { ref } from 'vue';
import post from "../config/post"

import PostItem from './PostItem.vue';

const posts = ref(post);

posts.value.reverse();

document.title = "AcboxSky---Posts"

</script>

<template>
  <div v-for="post in posts">
    <PostItem 
      :title="post.title" 
      :time="post.time" 
      :file="post.file" 
      :introduce="post.introduce" 
      :pid="post.pid" 
      :hide="post.hide ?? false"
    />
  </div>
</template>

<style scoped></style>