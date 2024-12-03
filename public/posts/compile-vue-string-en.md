While working on a project, I encountered a tricky requirement: I needed to compile a string into a Vue component.

My first thought was that Vue's Compiler should have a ready-made API for this, but unfortunately, there wasn't one.

After four hours of searching through Google, StackOverflow, and NPM, I finally found a solution.

```
vue-inbrowser-compiler
```

I almost cried when I found this package, but it took another five hours of struggle to adapt it for Vue 3.

Since this uses Webpack, we had to find a workaround.

First, install:

```shell
pnpm add vue-inbrowser-compiler
```

Then I tried the documentation's demo, but it didn't work. Looking at the output made my head spin.

```json
{
    "script": "\nconst Vue = require(\"vue\");const {pushScopeId: _pushScopeId, popScopeId: _popScopeId} = Vue\nconst __sfc__ = (function() {\nreturn {setup: function setup(){\n\n\nvar x = ref(0)\nonMounted(function () {\n  x.value = 1\n})\n\n\nreturn {x: x}\nfunction defineProps(props){ return props;}\nfunction defineEmits(){ return function emit() {}}\nfunction defineExpose(){}\n}}\n})()\n  __sfc__.render = function() {const { toDisplayString: _toDisplayString, openBlock: _openBlock, createElementBlock: _createElementBlock } = Vue\n\nreturn function render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (_openBlock(), _createElementBlock(\"div\", null, _toDisplayString(_ctx.x), 1 /* TEXT */))\n}}\n\n\n__sfc__.render = __sfc__.render()\n\nreturn __sfc__",
    "setup": true,
    "raw": {
        "template": "\n  <div>{{ x }}</div>\n",
        "script": "\nreturn {setup(){\n\n\nconst x = ref(0)\nonMounted(() => {\n  x.value = 1\n})\n\n\nreturn {x}\nfunction defineProps(props){ return props;}\nfunction defineEmits(){ return function emit() {}}\nfunction defineExpose(){}\n}}\n",
        "setup": true
    }
}
```

Notice the `const Vue = require("vue")` here - this Vue is a CommonJS module, while we typically use ESM modules. So I came up with a bold approach: just replace it using regex!

```js
script = script.replace(/const Vue = require\("vue"\)/g, '')
```

So where does Vue come from? From the global scope! It's the only way... T_T!!!!!

```html
<script src="https://unpkg.com/vue@3.4.16/dist/vue.global.js"></script>
```

Vue has a bundle version called `vue.global.js` that exposes the `Vue` object globally, so we can use it directly.

Then we discovered that Vite's default Vue isn't esm-bundler and would throw errors, so we need to set up an alias:

```ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
```

With these steps completed, we're ready to go!

Here's the test code:

```vue
<script setup lang="ts">
import { defineComponent } from 'vue';
import { compile } from 'vue-inbrowser-compiler';

const result = compile(
    `<script setup>

const x = ref(0)
onMounted(() => {
  x.value = 1
})

<\/script>

<template>
  <div>{{ x }}</div>
</template>
`)
console.log(result)
const component = defineComponent(Function(result.script.replace('const Vue = require("vue");', ''))())
console.log(component)
</script>

<template>
  <component :is="component" />
</template>
```

I can say I'm the first one on the internet to come up with this solution, haha!!!!!!