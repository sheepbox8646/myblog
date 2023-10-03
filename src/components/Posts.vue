<script setup lang="ts">
import { ref } from 'vue';
import post from "../config/post"

import PostItem from './PostItem.vue';

const posts = ref(post);

document.title = "AcboxSky---Posts"

</script>

<template>
  <div v-for="(post, index) in posts">
    <PostItem :title="post.title" :time="post.time" :file="post.file" :introduce="post.introduce" :pid="index"/>
    <hr />
  </div>
</template>

<style scoped></style>