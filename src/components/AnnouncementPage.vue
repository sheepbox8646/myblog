<script setup>
import announcement from "../config/announcement";
import { ref } from "vue";
import Giscus from '@giscus/vue';
import { marked } from "marked";

const announcements = ref(announcement);
announcements.value.reverse();

let html_contents = ref([]);

announcements.value.forEach((announce) => {
  (async () => {
    await fetch(`/announcements/${announce.file}`)
      .then((response) => response.text())
      .then((text) => html_contents.value.push(marked.parse(text)))
    // html_content = ref(marked.parse(markdown.value));
  })()
  console.log(html_contents)
})

</script>

<template>
  <div v-for="(announce, index) in announcements">
    <div><i class="fa fa-calendar"></i> {{ announce.time }}</div>
    <div v-html="html_contents[index]" style="font-size: 20px"></div><br/>
    <Giscus repo="sheepbox8646/myblog" repoId="R_kgDOKbSURA" dataCategory="Announcements"
      CategoryId="DIC_kwDOKbSURM4CZ0jE" mapping="pathname" strict="0" reactionsEnabled="1" emitMetadata="0"
      inputPosition="top" theme="light" lang="zh-CN" loading="lazy" crossorigin="anonymous"
      :term="`announcements/${announce.aid}`" async />
    <hr/>
  </div>
</template>