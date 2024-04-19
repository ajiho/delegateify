# delegateify 

一个轻量级的真正有效的事件委托(jQuery的on方法现代化替代品)


**特性:**

- 零依赖
- 体积极小[delegateify.min.js](https://unpkg.com/delegateify@latest/dist/delegateify.min.js) 6.26kb(gzipped: 2.37kb)
- 支持事件命名空间
- 支持范围选择器
- 原生的DOM事件
- 支持在捕获阶段监听事件


## 使用

通过npm安装

```bash
$ npm install delegateify -D
```

```js
import Delegateify from 'delegateify';
const delegate = new Delegateify(document)
delegate.on('click','.box',handler)
```

或者使用CDN,可以在[unpkg](https://unpkg.com/delegateify@latest/dist/),[jsdelivr](https://cdn.jsdelivr.net/npm/delegateify@latest/dist/)找到固定版本替换`@latest`

```html
<script src="https://unpkg.com/delegateify@latest/dist/delegateify.min.js"></script>
<script type="text/javascript">

  //jQuery
  $(document).on('click','.box',function(event){
    console.log(this);
  })

  //Delegateify
  new Delegateify(document).on('click', '.box', function (event) {
      console.log(this);
  });
</script>
```



## API

### on(eventName[, selector], handler[, useCapture]):this

增加事件监听


例子:直接事件监听
```js
/**
 * 首先，我们应该实例化一个Delegateify实例
 * 构造函数的参数可以是
 * 1.任何实现EventTarget接口的内容 window、document.body、document.documentElement
 * 2.Element元素
 * 3.也可以是选择器  如:#abc .hello
 */
const delegate = new Delegateify(window)

delegate.on('resize', function(event) {
  console.log('Window resized!');
});
```


委托
```js
new Delegateify(document).on('click', '.box', function (event) {
    console.log(this);
});
```


### off(eventName[, selector], handler[, useCapture]):this

移除事件监听

```js
//移除实例上所有的事件监听
//deletage.off();

//删除所有的鼠标移入的事件
// deletage.off('mouseover')

//删除某个选择器对应的元素的所有侦听器
// deletage.off(null,'.box')


//删除所有调用函数句柄的侦听器
// deletage.off(null, null, handler);


//删除在捕获阶段侦听的所有侦听器
// deletage.off(null, null, null, true);


//删除调用指定函数句柄的单击事件的所有侦听器
// deletage.off('mouseover', null, handler);


//删除所有符合所有条件的侦听器
deletage.off('mouseover', '.box', handler, true);

```

`handler`解释如下

```js
function mouseover() {
    console.log('鼠标移入啦');
}
deletage.on('mouseover', '.box', mouseover, true)//其中的mouseover就是上面定义的函数名也就是handler
```


### 事件属性和上下文

| jQuery | delegateify |说明|
|--|--|--|
| this | this  |当前触发事件的 DOM 元素|
| event.target| event.target|最初调度事件的元素|
| event.delegateTarget| event.currentTarget|绑定事件处理函数的元素|
| event.currentTarget | event.matchedTarget |当前触发事件的 DOM 元素与this相同|


注意：因为delegateify使用的是真实的dom事件所以事件属性和上下文和jQuery有一点点不同，因此迁移的时候需要注意。



### 事件命名空间

```js
const deletage = new Delegateify(document);
deletage.on('click.namespace1', '.box', function (event) {
    console.log('我是命名空间1下面的点击事件');
});

deletage.on('click.namespace2', '.box', function (event) {
    console.log('我是命名空间2下面的点击事件');
});

deletage.on('click.namespace2.namespace2-1', '.box', function (event) {
    console.log('我是命名空间2下面的子命名空间的点击事件');
});

```

移除命名空间对应的事件

```js
//移除命名空间.namespace1下的所有事件
// deletage.off('.namespace1');


//移除命名空间.namespace2下的所有事件同时会包括该命名空间下的所有子命名空间对应的事件
// deletage.off('.namespace2');


//只移除.namespace2下的.namespace2-1对应的事件
deletage.off('.namespace2.namespace2-1');
```


### 只听一次事件

要实现与jQuery的`one`类似,只需把匿名函数改成命名函数即可,然后在内部通过`off`方法取消掉监听即可

```js
//只监听一次事件
deletage.on('click', '.box', function myclick(event) {
    deletage.off('click', '.box', myclick);
    console.log('我被点击了');
});
```



## 变更日志

每个版本的详细更改记录在[CHANGELOG.md](https://github.com/ajiho/delegateify/blob/main/CHANGELOG.md)中.


## 贡献

在提出拉取请求之前,请务必阅读[贡献指南](https://github.com/ajiho/delegateify/blob/main/.github/CONTRIBUTING.md)


## License

[MIT](https://github.com/ajiho/delegateify/blob/master/LICENSE)

Copyright (c) 2024-present, ajiho









  


