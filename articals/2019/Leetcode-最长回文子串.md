## ** 【LeetCode】 最长回文子串 ** ##


刷题刷题
### ** 题目 ** ###
----------
> 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
> 
> 示例 1：
> 
> 输入: "babad" 输出: "bab" 注意: "aba" 也是一个有效答案。 示例 2：
> 
> 输入: "cbbd" 输出: "bb"

&nbsp;

### ** 非动态规划解法 ** ###
----------


#### 思路 ####


 - 找到回文串的`对称中心`。

    如果是奇数，对称中心在字符上。

    如果是偶数，对称中心在字符之间。

 - 从中心扩展，判断回文子串的外层是否还存在回文的情况。


#### 代码 ####

```js

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if(!s || !s.length) return "";
    if(s.length === 1) return s;
    var result = s[0];
    
    for(var i = 0; i < s.length; i++) {
        var str1 = str2 = str = "";
        //偶数回文串
        if(s[i + 1] && s[i] === s[i + 1]) {
            str1 = getChildString(s, i, i+ 1);
        }
        //奇数回文串
        if(s[i + 2] && s[i] === s[i + 2]){
            str2 = getChildString(s, i, i+ 2);
        }

        //比较回文串长度
        str = str1 > str2 ? str1 : str2;
        if(str.length > result.length){
            result = str;
        }
    }

    return result;
};

//判断中心外层是否还存在回文的情况
/**
 * @param {string} s
 * @param {int} left
 * @param {int} right
 * @return {string}
 */
function getChildString(s, left, right) {  
    var str = left + 1 === right ? s[left] + s[right] :  s[left] + s[left + 1] + s[right];

    while(--left >= 0 && ++right < s.length) {
        if(s[left] === s[right]) {
            str = s[left] + str + s[right]
        }else {
            break;
        }
    }
    return str;
}
```
