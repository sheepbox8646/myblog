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
  <span class="title">{{ postData.title }}</span>
  <br />
  <span><i class="fa fa-calendar"></i>&nbsp;{{ postData.time }}</span>
  <br /><br /><br /><br /><br /><br />
  <div v-html="html_content" style="font-size: 20px"></div>
  <br /><br /><br />
  <Giscus repo="sheepbox8646/myblog" repoId="R_kgDOKbSURA"
    dataCategory="Announcements" CategoryId="DIC_kwDOKbSURM4CZ0jE" mapping="pathname" strict="0"
    reactionsEnabled="1" emitMetadata="0" inputPosition="top" theme="light" lang="zh-CN"
    loading="lazy" crossorigin="anonymous" async />
</template>

<style scoped>
.title {
  font-size: 50px
}
</style>