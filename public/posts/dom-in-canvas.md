## 在svg中插入html内容
虽然canvas中不能直接插入html内容，但是svg语法允许用户使用`<foreignObject>`在svg中插入html元素

## svg转换成可绘制的图片
这里有一个变量`htmlCode`，里面存放的是要渲染进canvas的html元素。我们需要先将svg代码文本转为`Blob`对象
```javascript
const htmlCode = `
<h1>Hello world!</h1>
`

const data = `
<svg>
  <foreignObject>
    ${html-code}
  </foreignObject>
</svg>
`

const svgBlob = new Blob([data], {
  type: 'image/svg+xml;charset=utf-8'
})
```

## 配置url到可绘制图片
```javascript
const url = window.DOM.createObjectURL(svgBlob);
const image = document.createElement("img");
image.src = url;
```

## 绘制到canvas上
```javascript
image.onload = () => {
  ctx.drawImage(image);
  window.DOM.revokeObjectURL(url);
}
```