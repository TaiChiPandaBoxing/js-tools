# js-tools
#### 自己封装的JS常用操作实例
实例为日常开发常用的小实例，包括数组去重，打乱数组，字母大小写转换，cookie操作的封装等。

#### 使用方法
##### 引入js-tools.js
//去除空格
Js.trim(' xx x x',1);
//xxxx

//大小写转换
Js.changeCase('asdXaaaXHwwHwwad',3)
//"ASDxAAAxhWWhWWAD"

// 设置对象内容
html(document.getElementById('xxx'),'hello world')

具体使用方式在js-tools.js里面有说明

#### 1.0.0版本

##### 常用操作

1.isType(数据类型判断)

##### 字符串操作
1.trim(去除空格)

2.changeCase(大小写转换)

3.repeatString(字符串循环复制)

4.replaceAll(字符串替换)

5.replaceString(字符替换)

6.checkType(检测字符串)

7.checkPwd(检测密码的强度)

8.randomWord(生成随机码)

9.getStringCount(查找子字符串在字符串中出现的次数)

##### 数组操作

1.removeRepeatArray(数组去重)

2.upsetArray(数组顺序打乱)

3.maxArray(数组最大值)

4.minArray(数组最小值)

5.sumArray(数组求和)

6.averageArray(数组的平均值)

7.randomOne(从数组中随机获取元素)

8.getElementCount(返回数组（字符串）一个元素出现的次数)

9.getCount(返回数组（字符串）出现最多的几次元素和出现次数)

10.getArrayNumber(得到n1-n2下标的数组)

11.removeArrayForValue(筛选数组)

12.steamroller(数组扁平化)

##### 基础DOM操作

1.hasClass(检测对象是否有哪个类名)

2.addClass(添加类名)

3.removeClass(删除类名)

4.replaceClass(替换类名)

5.siblings(获取兄弟节点)

6.css(设置样式)

7.html(设置文本内容)

8.show(显示)

9.hide(隐藏)

##### 其他

1.getFontSize(适配rem)

2.getEndTime(到某一个时间的倒计时)

3.randomNumber(随机返回一个范围的数字)

4.randomColor(随机产生颜色)

5.setUrlPrmt(设置url参数)

6.getUrlPrmt(获取url参数)

7.upDigit(现金额大写转换函数)

8.filterParams(清除对象中值为空的属性)

9.setCookie(设置cookie)

10.getCookie(获取cookie)

11.removeCookie(删除cookie)

12.ajax(封装ajax函数)

13.getOptionArray(获取对象数组某些项)

14.filterOptionArray(排除对象数组某些项)

15.afterLoadImg(图片没加载出来时用一张图片代替)

16.loadImg(图片滚动懒加载)

17.oArraySort(对象的数组的排序)

18.createKeyExp(创建正则字符)

19.findKey(关键字加标签（多个关键词用空格隔开）)

20.longestWord(找出最长单词的长度)

21.titleCaseUp(句中单词首字母大写)

22.browserInfo(手机类型的判断)

23.filterString(过滤字符串(html标签，表情，特殊字符))

## LICENSE
MIT