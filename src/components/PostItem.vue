<script setup lang="ts">

const props = defineProps({
  title: String,
  time: String,
  file: String,
  introduce: String,
  pid: String,
  hide: Boolean,
});

let introduce = props.introduce;
const ele = document.createElement("span");
ele.innerHTML = introduce!;
introduce = ele.innerText;

</script>

<template>
  <div v-if="!hide">
    <router-link :to="`/posts/${props.pid}`" class="item">
      <div>
        <span style="font-size: 30px">{{ title }}</span>
        &nbsp;&nbsp;&nbsp;
        <i class="fa fa-calendar"></i>&nbsp;
        <span>{{ time }}</span>
        <br />
        <span v-html="introduce"></span>
      </div>
    </router-link>
    <hr />
  </div>
</template>

<style scoped>
.item {
  text-decoration: none;
  color: black;
}

.item:hover {
  color: skyblue;
}
</style>