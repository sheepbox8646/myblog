在我写[newcar](https://github.com/Bug-Duck/newcar)动画引擎的时候，曾因为导出视频而发愁，在搜遍了 Google 后，再加以我自己的摸索，终于找出了一种解决办法

创建视频文件可以用到两种 Web API 去实现视频的导出:

- `captureStream`: 该 `HTMLCanvasElement.captureStream()` 方法返回的 `CanvasCaptureMediaStream` 是一个实时视频捕获的画布, 具体见[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/captureStream).
- `MediaRecorder`: 是 MediaStream Recording API 提供的用来进行媒体轻松录制的接口，他需要通过调用 `MediaRecorder()` 构造方法进行实例化, 具体见[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder).

```javascript
// 获取canvas dom元素
const ele = document.getElementById("canvas");
// 创建Stream
const stream = ele.captureStream(); // 可以通过追加参数来规定帧率(fps)
// 创建MediaRecorder
const recorder = new MediaRecorder(stream, { mimeType: "video/webm" }); // 这里可以通过codecs=xxx来规定视频编码方式
// 创建数据储存数组
const data = [];
// 设定数据推送方式
recorder.ondataavailable = (event) => {
  if (event.data && event.data.size > 0) {
    data.push(event.data);
  }
};
// 设置结束后如何处理视频，这里我们将他的url输出到控制台中
recorder.onstop = () => {
  const url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
  console.log(url);
};
// 开始记录
recorder.start();
// 设置结束时间，这里我们设置为一共录制３秒
setTimeout(recorder.stop, 3000);
```

此时你访问控制台输出的url(记得带上前面的blob:前缀)，你就会看到你的视频文件已经在浏览器里被打开了，然后你便可以右键保存视频为文件.

### 参考资料
- [How to save html canvas animation as a video](https://julien-decharentenay.medium.com/how-to-save-html-canvas-animation-as-a-video-421157c2203b)
