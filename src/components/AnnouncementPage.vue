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

document.title = "公告-AcboxSky";

let maxNumberDisplay = ref(6)

</script>

<template>
  <div v-for="(announce, index) in announcements">
    <div v-if="index !== maxNumberDisplay - 1">
      <div><i class="fa fa-calendar"></i> {{ announce.time }}</div>
      <div v-html="html_contents[index]" style="font-size: 20px"></div><br />
      <hr />
    </div>
  </div>
  <br/>
  <div style="text-align: center;" v-if="maxNumberDisplay < announcements.length"><a @click="maxNumberDisplay += 5">显示更多公告</a></div>
  <br /><br /><br /><br /><br /><br />
  <h2 style="text-align: center;">留言板</h2>
  <Giscus repo="sheepbox8646/myblog" repoId="R_kgDOKbSURA" dataCategory="Announcements" CategoryId="DIC_kwDOKbSURM4CZ0jE"
    mapping="pathname" strict="0" reactionsEnabled="1" emitMetadata="0" inputPosition="top" theme="light" lang="zh-CN"
    loading="lazy" crossorigin="anonymous" async />
</template>