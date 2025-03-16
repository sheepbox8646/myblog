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
  display: block;
  text-decoration: none;
  color: #2c3e50;
  padding: 1.5rem;
  margin: 1rem 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  color: #3498db;
}

.item span {
  display: inline-block;
  margin: 0.5rem 0;
}

.fa-calendar {
  color: #95a5a6;
}
</style>