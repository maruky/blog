**LeetCode - 最长回文子串**
-----------------

[算法地址][1]


  [1]: https://leetcode-cn.com/problems/longest-palindromic-substring/

> 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
> 
> 示例 1：
> 
> 输入: "babad" 输出: "bab" 注意: "aba" 也是一个有效答案。 示例 2：
> 
> 输入: "cbbd" 输出: "bb"

暴力解法：
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
            if(s[i + 1] && s[i] === s[i + 1]) {
                str1 = getChildString(s, i, i+ 1);
            }
            if(s[i + 2] && s[i] === s[i + 2]){
                str2 = getChildString(s, i, i+ 2);
            }
            str = str1 > str2 ? str1 : str2;
            if(str.length > result.length){
                result = str;
            }
        }

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

        return result;
    };
```
