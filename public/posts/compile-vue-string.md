我在做某个项目时遇见了一个刁钻的需求，需要将一个字符串编译成 Vue 组件。

我拿到这个需求的第一想法就是Vue的Compiler里应该有现成的API，但是很遗憾并没有。

在经过四个小时的Google, StackOverflow, NPM 搜索后，我终于找到了一个解决方案。

```
vue-inbrowser-compiler
```

当我找到这个包的时候我差点哭出来，结果又是五个小时的奋战终于把他适配了Vue3.

因为这个是Webpack, 所以我们只能曲线救国。

首先安装:

```shell
pnpm add vue-inbrowser-compiler
```

然后我试了一下文档的Demo, 并不能用，输出一看脑子嗡嗡的。

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

注意这里的`const Vue = require("vue")`， 这个Vue是CommonJS的模块，而我们通常使用的是ESM的模块。所以我想了一个大胆的方式，直接用正则给替换掉！

```js
script = script.replace(/const Vue = require\("vue"\)/g, '')
```

那么Vue从哪里来呢，当然是全局！也只有这种方法了呜呜呜QAQ!!!!!

```html
<script src="https://unpkg.com/vue@3.4.16/dist/vue.global.js"></script>
```

Vue有个打包版本叫`vue.global.js`， 这个版本是全局暴露`Vue`对象的，所以我们可以直接使用。

然后我们发现vite默认的vue不是esm-bundler, 会报错，所以我们要设置alias:

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

完成这些就可以啦！

接下来贴上测试代码:

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

我可以说我是全网第一个搞出这种解决方案的哈哈哈！！！！！！！！
