## ** Promise | 控制并发 ** ##
----------

&nbsp;

前段时间朋友（不是我！）出去面试，遇到一道有关Promise的编程题。

作为一名前端低级渣渣工程蛳，Promise这个单词对我来说简直是耳熟能详，但是灵活运用和掌握....emmmmmmm（跪）。

话不多说，先看看题！
我们先试想一下，并发1000000....个请求的场景（´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀），我们当然不想一次性全部发送！
所以，如何控制请求的并发数量呢？

### 题目 ###
批量请求资源，通过参数concurrency控制请求的并发度。

```js
function sendRequest(urls: string[], concurrency: number) {

}
```
&nbsp;
### 实现 ###
----------

关键字：队列(quene)，计数(count)，递归。

- count：保存当前的并发数。
- quene：队列保存超过并发数后需要发送的请求。

```js

/*
**@param {number[]} urls
**@param {number} concurrency
*/
function sendRequest(urls, concurrency) {
    var count = 0; //计数，记录当前并发数
    var quene = [];//队列
}
```


接下来封装一个异步发送请求的函数

```js
function featchUrl (url) {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve(url);
        }, 1000)
    })
}
```

最后就是重头戏了，利用`count`和`quene`控制请求并发数。

```js
function sendRequest(urls, concurrency) {
    var count = 0; //计数，记录当前并发数
    var quene = [];//队列

    function request() {
        if(!urls.length && !quene.length) return;
        var url = quene.length ? quene.shift() : urls.shift();

        if (count < concurrency) {
            count++;
            featchUrl(url).then(function {
                count--;
                request(); 
            });
            //递归
            request(); 
        }else {
            quene.unshift(url);
        }
    }
    //调用
    request();
}
```


贴上完整代码

```js
function sendRequest(urls, concurrency = 3) {
    var count = 0; //计数，记录当前并发数
    var quene = [];//队列

    function request() {
        if(!urls.length && !quene.length) return;
        var url = quene.length ? quene.shift() : urls.shift();

        if (count < concurrency) {
            count++;
            featchUrl(url).then(function {
                count--;
                request(); 
            });
            //递归
            request(); 
        }else {
            quene.unshift(url);
        }
        
    }
    //调用
    request();
}
function featchUrl (url) {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve(url);
        }, 1000);
    })
}

//测试
var urls = [1,2,3,4];
sendRequest(urls, 2)
```

这里只是简单的实现了一下，后续还要继续优化呀～