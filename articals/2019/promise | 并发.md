```js
function main(urls, max = 3, callback) {
    var count = 0;
    var starIndex = 0;
    var quene = [];
    var featchUrl = function (url) {
        starIndex++;
        return new Promise((resolve) => {
            setTimeout(function() {
                resolve(url);
            }, 1000)
        }).then(ret => {
            console.log(ret)
            count--;
            request();           
        })
    }

    function request() {
        if(starIndex >= urls.length && !quene.length) return;
        var url = quene.length ? quene.shift() : urls[starIndex];
        if (count < max) {
            count++;
            featchUrl(url);
            request();
        }else {
            quene.unshift(url);
        }
        
    }

    request();
    return 'finish';

}

var urls = [1, 2, 3, 4, 5, 6, 7]
main(urls);
```