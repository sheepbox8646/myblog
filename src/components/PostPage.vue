<script setup lang="ts">
import { useRoute } from 'vue-router';
import post from '../config/post';
import { ref, reactive } from 'vue';
import Giscus from '@giscus/vue'
import { marked } from "marked"

const route = useRoute();

let postData: any;

post.forEach((p) => {
  if (p.pid === route.params.pid)  {
    postData = reactive(p);
  }
})

document.title = `${postData!.title}-AcboxSky`

let html_content = ref("");

(async () => {
  await fetch(`/posts/${postData.file}`)
    .then((response) => response.text())
    .then((text) => { html_content.value = marked.parse(text) })
  // html_content = ref(marked.parse(markdown.value));
})()

</script>

<template>
  <article class="post">
    <header class="post-header">
      <h1 class="title">{{ postData.title }}</h1>
      <div class="meta">
        <i class="fa fa-calendar"></i>
        <span>{{ postData.time }}</span>
      </div>
    </header>
    <div class="post-content" v-html="html_content"></div>
    <div class="comments-section">
      <Giscus 
        repo="sheepbox8646/myblog" 
        repoId="R_kgDOKbSURA"
        dataCategory="Announcements" 
        CategoryId="DIC_kwDOKbSURM4CZ0jE" 
        mapping="pathname" 
        strict="0"
        reactionsEnabled="1" 
        emitMetadata="0" 
        inputPosition="top" 
        theme="light" 
        lang="zh-CN"
        loading="lazy" 
        crossorigin="anonymous" 
        async 
      />
    </div>
  </article>
</template>

<style scoped>
.post {
  max-width: 100%;
}

.post-header {
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1.2;
  margin: 0 0 1rem 0;
}

.meta {
  color: #95a5a6;
}

.post-content {
  font-size: 1.1rem;
  margin: 2rem 0;
}

.comments-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

:deep(h1, h2, h3, h4, h5, h6) {
  color: #2c3e50;
  margin: 2rem 0 1rem 0;
}

:deep(p) {
  margin: 1rem 0;
  line-height: 1.8;
}

:deep(code) {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

:deep(pre) {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}
</style>