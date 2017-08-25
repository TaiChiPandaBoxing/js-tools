/**
 * 编写自己的代码库（javascript常用实例的实现与封装）
 */
var Js = {
    /**
     * 字符串操作
     */

    // 去除空格 type 1-所有空格 2-前后空格 3-前空格 4-后空格
    trim: function (string, type) {
        switch (type) {
            case 1:
                return string.replace(/\s+/g, "");
            case 2:
                return string.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return string.replace(/(^\s*)/g, "");
            case 4:
                return string.replace(/(\s*$)/g, "");
            default:
                return string;
        }
    },

    // 字母大小写切换 type 1-首字母大写 2-首字母小写 3-每个单词的首字母大写 4-每个单词的首字母小写 5-大小写转换 6-全部大写 7-全部小写
    changeCase: function (string, type) {
        function ToggleCase(string) {
            var itemText = "";
            string.split("").forEach(function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
            return itemText;
        }
        switch (type) {
            case 1:
                return string.replace(/^(\w)(\w+)/, function (v, v1, v2, index) {
                    //console.log(v)//被匹配的数组
                    //console.log(v1)//是第一个捕获组
                    //console.log(v2)//是第二个捕获组
                    //console.log(index)//第一个被匹配的index
                    return v1.toUpperCase() + v2.toLowerCase()
                });
            case 2:
                return string.replace(/^(\w)(\w+)/, function (v, v1, v2, index) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
            case 3:
                return string.replace(/\b\w+\b/g, function (v) {
                    return v.substring(0, 1).toUpperCase() + v.substring(1).toLowerCase();
                });
            case 4:
                return string.replace(/\b\w+\b/g, function (v) {
                    return v.substring(0, 1).toLowerCase() + v.substring(1).toUpperCase();
                });
            case 5:
                return ToggleCase(string);
            case 6:
                return string.toUpperCase();
            case 7:
                return string.toLowerCase();
            default:
                return string;
        }
    },

    // 字符串循环复制 repeatString(string->字符串, count->次数)
    repeatString: function (string, count) {
        var text = "";
        for (var i = 0; i < count; i++) {
            text += string;
        }
        return text;
    },

    // 字符串替换 replaceAll(string->字符串, AFindText->要替换的字符, AReplaceText->替换成什么)
    replaceAll: function (string, AFindText, AReplaceText) {
        raRegExp = new RegExp(AFindText, "g");
        return string.replace(raRegExp, AReplaceText);
    },
    // 字符替换 replaceString(string->字符串, regArray->字符格式, type->替换方式, AReplaceText->替换的字符（默认*）)
    replaceString: function (string, regArray, type, AReplaceText) {
        var regtext = "",
            Reg = null,
            replaceText = AReplaceText || "*";
        //replaceStr('18819322663',[3,5,3],0)
        //188*****663
        //repeatString是在上面定义过的（字符串循环复制）
        if (regArray.length === 3 && type === 0) {
            regtext = '(\\w{' + regArray[0] + '})\\w{' + regArray[1] + '}(\\w{' + regArray[2] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatString(replaceText, regArray[1]);
            return string.replace(Reg, "$1" + replaceCount + "$2");
        }
        //replaceString('asdasdasdaa',[3,5,3],1)
        //***asdas***
        else if (regArray.length === 3 && type === 1) {
            regtext = '\\w{' + regArray[0] + '}(\\w{' + regArray[1] + '})\\w{' + regArray[2] + '}';
            Reg = new RegExp(regtext);
            var replaceCount1 = this.repeatString(replaceText, regArray[0]);
            var replaceCount2 = this.repeatString(replaceText, regArray[2]);
            return string.replace(Reg, replaceCount1 + '$1' + replaceCount2);
        }
        //replaceStr('1asd88465asdwqe3',[5],0)
        //*****8465asdwqe3
        else if (regArray.length === 1 && type === 0) {
            regtext = '(^\\w{' + regArray[0] + '})'
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatString(replaceText, regArray[0]);
            return string.replace(Reg, replaceCount)
        }
        //replaceStr('1asd88465asdwqe3',[5],1,'+')
        //"1asd88465as+++++"
        else if (regArray.length === 1 && type === 1) {
            regtext = '(\\w{' + regArray[0] + '}$)'
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatString(replaceText, regArray[0]);
            return string.replace(Reg, replaceCount)
        }
    },
    // 检测字符串 type: email phone tel number english chinese lower upper
    checkType: function (string, type) {
        switch (type) {
            case "email":
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(string);
            case "phone":
                return /^1[3|4|5|7|8][0-9]{9}$/.test(string);
            case "tel":
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(string);
            case 'number':
                return /^[0-9]$/.test(string);
            case 'text':
                return /^\w+$/.test(string);
            case 'english':
                return /^[a-zA-Z]+$/.test(string);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(string);
            case 'lower':
                return /^[a-z]+$/.test(string);
            case 'upper':
                return /^[A-Z]+$/.test(string);
            default:
                return true;
        }
    },
    // 数据类型判断
    isType: function (object, type) {
        if (type) {
            var _type = type.toLowerCase();
        }
        switch (_type) {
            case "string":
                return Object.prototype.toString.call(object) === "[object String]";
            case "number":
                return Object.prototype.toString.call(object) === "[object Number]";
            case "boolean":
                return Object.prototype.toString.call(object) === "[object Boolean]";
            case "undefined":
                return Object.prototype.toString.call(object) === "[object Undefined]";
            case "null":
                return Object.prototype.toString.call(object) === "[object Null]";
            case "function":
                return Object.prototype.toString.call(object) === "[object Function]";
            case "array":
                return Object.prototype.toString.call(object) === "[object Array]";
            case "object":
                return Object.prototype.toString.call(object) === "[object Object]";
            case "nan":
                return isNaN(object);
            case "elements":
                return Object.prototype.toString.call(object).indexOf("HTML") !== -1;
            default:
                return Object.prototype.toString.call(object);
        }
    },
    // 检测密码的强度
    checkPwd: function (string) {
        var nowLevel = 0;
        if (string.length < 6) {
            return nowLevel;
        }
        if (/[0-9]/.test(string)) {
            nowLevel++;
        }
        if (/[a-z]/.test(string)) {
            nowLevel++;
        }
        if (/[A-Z]/.test(string)) {
            nowLevel++;
        }
        if (/[\.|-|_]/.test(string)) {
            nowLevel++;
        }
        return nowLevel;
    },

    // 随机码 count取值范围0-36
    //randomWord(10)
    //"2584316588472575"

    //randomWord(14)
    //"9b405070dd00122640c192caab84537"

    //randomWord(36)
    //"83vhdx10rmjkyb9"
    randomWord: function (count) {
        return Math.random().toString(count).substring(2);
    },

    // 查找子字符串在字符串中出现的次数
    //var stringTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    //countString(stringTest,'blog')
    //6
    getStringCount: function (string, stringSplit) {
        return string.split(stringSplit).length - 1;
    },

    /**
     * 数组操作
     */

    // 数组去重
    // 第一种方式
    //ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
    //let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
    //let set = new Set(array);
    //{1,2,6,3,5,69,66,7,4,8,9663}
    //ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
    //Array.from(set)
    //[1,2,6,3,5,69,66,7,4,8,9663]
    //  removeRepeatArray: function(array){
    //     return Array.from(new Set(array)); //ES6写法
    //  }
    // 第二种方式
    // 遍历原来的数组array，判断newArray有没有当前遍历到的数组元素，没有加添加进去
    //  removeRepeatArray: function(array){
    //     var newArray=[];
    //     for(var i = 0, len = array.length; i < len; i++){
    //         if(newArray.indexOf(array[i]) == -1){
    //             newArray.push(array[i]);
    //         }
    //     }
    //     return newArray;
    //  }
    // 第三种方式
    // 遍历原数组。每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复,如果访问不到，就是arr还没有没有这元素，就添加进去，同时把这个元素作为json的一个属性，并赋值为1。
    removeRepeatArray: function (array) { //推荐写法
        var newArray = [];
        var json = {};
        for (var i = 0, len = array.length; i < len; i++) {
            if (!json[array[i]]) {
                newArray.push(array[i]);
                json[array[i]] = 1;
            }
        }
        return newArray;
    },
    // 第四种方式
    //  removeRepeatArray: function(array) {
    //     return array.filter(function (item, index, self) {
    //         return self.indexOf(item) == index;
    //     });
    //  }
    // 数组顺序打乱
    upsetArray: function (array) {
        return array.sort(function () {
            return Math.random() - 0.5
        });
    },
    // 数组最大值最小值
    //这一块的封装，主要是针对数字类型的数组
    maxArray: function (array) {
        return Math.max.apply(null, array);
    },
    // 数组最小值
    minArray: function (array) {
        return Math.min.apply(null, array);
    },
    // 数组求和
    sumArray: function (array) {
        var sumText = 0;
        for (var i = 0, len = array.length; i < len; i++) {
            sumText += array[i];
        }
        return sumText;
    },
    // 数组的平均值，小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    averageArray: function (array) {
        var sumText = this.sumArray(array);
        var averageText = sumText / array.length;
        return averageText;
    },
    // 从数组中随机获取元素
    randomOne: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    // 返回数组（字符串）一个元素出现的次数
    getElementCount: function (object, element) {
        var number = 0;
        for (var i = 0, len = object.length; i < len; i++) {
            if (element == object[i]) {
                number++;
            }
        }
        return number;
    },
    // 返回数组（字符串）出现最多的几次元素和出现次数
    // array, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    // 默认情况，返回所有元素出现的次数
    // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    // 传参（rank=3），只返回出现次数排序前三的
    // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    // 传参（ranktype=1,rank=null），升序返回所有元素出现次数
    // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    // 传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    getCount: function (array, rank, rankType) {
        var object = {},
            k, array1 = [];
        // 记录每一个元素出现的次数
        for (var i = 0, len = array.length; i < len; i++) {
            k = array[i];
            if (object[k]) {
                object[k]++;
            } else {
                object[k] = 1;
            }
        }
        // 保存结果{element-"元素"， count-"出现次数"}
        for (var item in object) {
            array1.push({
                element: item,
                count: object[item]
            });
        }
        // 排序（降序）
        array1.sort(function (n1, n2) {
            return n2.count - n1.count;
        })
        // 如果rankType为1，则为升序，反转数组
        if (rankType === 1) {
            array1 = array1.reverse();
        }
        var rank1 = rank || array1.length;
        return array1.splice(0, rank1);
    },
    // 得到n1-n2下标的数组
    // getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    // [5, 6, 7, 8, 9]
    // getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    // [2, 3, 4, 5, 6, 7, 8, 9]
    // 第一种方式
    // 传第二个参数包括这个数
    getArrayNumber: function (array, n1, n2) {
        var array1 = [],
            len = n2 || array.length - 1;
        for (var i = n1; i <= len; i++) {
            array1.push(array[i]);
        }
        return array1;
    },
    // 第二种方式】
    // 传第二个参数不包括这个数
    //  getArrayNumber: function(array, n1, n2) {
    //     var array1=array.slice(n1, n2);
    //     return array1;
    //  },
    //筛选数组
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //["aaa"]带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue: function (array, value, type) {
        return array.filter(function (item) {
            return type === "%" ? item.indexOf(value) === -1 : item !== value;
        });
    },

    // 基础DOM操作
    //这个部分代码其实参考jquery的一些函数写法，唯一区别就是调用不用，参数一样.
    //比如下面的例子
    //设置对象内容
    //jquery：$('#xxx').html('hello world');
    //现在：html(document.getElementById('xxx'),'hello world')
    //获取对象内容
    //jquery：$('#xxx').html();
    //现在：html(document.getElementById('xxx'))

    // 检测对象是否有哪个类名
    hasClass: function (object, name) {
        if (object.className && this.trim(object.className, 1) !== "") {
            var array = this.trim(object.className, 2).split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (array.indexOf(name) == -1) ? false : true;
        } else {
            return false;
        }
    },
    // 添加类名
    addClass: function (object, name) {
        if ((this.isType(object, "array") || this.isType(object, "elements")) && object.length >= 1) {
            for (var i = 0, len = object.length; i < len; i++) {
                if (!this.hasClass(object[i], name)) {
                    object[i].className += " " + name;
                }
            }
        } else {
            if (!this.hasClass(object, name)) {
                object.className += " " + name;
            }
        }
    },
    // 删除类名
    removeClass: function (object, name) {
        if ((this.isType(object, "array") || this.isType(object, "elements")) && object.length >= 1) {
            for (var i = 0, len = object.length; i < len; i++) {
                if (this.hasClass(object[i], name)) {
                    var reg = new RegExp("(\\s|^)" + name + "\\s|$");
                    object[i].className = object[i].className.replace(reg, "");
                }
            }
        } else {
            if (this.hasClass(object, name)) {
                var reg = new RegExp("(\\s|^)" + name + "\\s|$");
                object.className = object.className.replace(reg, "");
            }
        }
    },
    // 替换类名
    replaceClass: function (object, newName, oldName) {
        this.removeClass(object, oldName);
        this.addClass(object, newName);
    },
    // 获取兄弟节点
    siblings: function (object, option) {
        var a = []; // 定义一个数组， 用来存object的兄弟元素

        var p = object.previousSibling;
        while (p) { // 先取object的哥哥们，判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling; 
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling; // 最后把上一个节点赋值给p
        }
        a.reverse(); // 把顺序反转一下 这样元素的顺序就是按先后的了
        var n = object.nextSibling;
        while (n) { // 再取object的弟弟们，判断有没有下一个弟弟元素，如果有则往下执行 n表示nextSibling; 
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling; // 最后把下一个节点赋值给n
        }
        // 是否有第二个参数
        if (option) {
            var b = []; // 定义一个数组，用于存储过滤a的数组
            if (option[0] === ".") {
                b = a.filter(function (item) {
                    return item.className === option.substring(1); // 有点问题，当一个标签不止一个类名的时候，应该用之前写的hasClass()进行判断
                })
            } else if (option[0] === "#") {
                b = a.filter(function (item) {
                    return item.id === option.substring(1);
                })
            } else {
                b = a.filter(function (item) {
                    return item.tagName.toLowerCase() === option;
                })
            }
            return b;
        }
        return a;
    },
    // 设置样式
    css: function (object, json) {
        for (var attr in json) {
            object.style[attr] = json[attr];
        }
    },
    // 设置文本内容
    html: function (object) {
        if (arguments.length == 1) {
            return object.innerHTML;
        } else if (arguments.length == 2) {
            object.innerHTML = arguments[1];
        }
    },
    // 显示隐藏
    show: function (object) {
        object.style.display = ""; // 就是采用默认值，不破坏元素原来的标签格式
    },
    hide: function (object) {
        object.style.display = "none";
    },

    /** 对象及其他 */
    // 适配rem
    getFontSize: function () {
        var doc = document,
            win = window;
        var docEl = doc.documentElement,
            resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                console.log(clientWidth);
                if (!clientWidth) return;
                // 如果屏幕大于750（750是根据效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                if (clientWidth > 750) {
                    clientWidth = 750;
                }
                // 设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
                console.log(docEl.style.fontSize);
            };
        // 屏幕大小改变，或横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false); // 是否要考虑一下兼容性问题（兼容IE）
        // 文档加载完成时，触发函数
        doc.addEventListener("DOMContentLoaded", recalc, false);
    },
    // 到某一个时间的倒计时
    // getEndTime("2017/8/23 16:00:00")
    // 输出：剩余时间1天2小时32分钟36秒
    getEndTime: function (endTime) {
        var startDate = new Date(); // 开始时间，当前时间
        var endDate = new Date(endTime); // 结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime(); // 时间差的毫秒数
        console.log(t);
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间" + d + "天" + h + "小时" + m + "分钟" + s + "秒";
    },
    // 随机返回一个范围的数字
    randomNumber: function (n1, n2) {
        // randomNumber(5, 10)
        // 返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        } else if (arguments.length === 1) { // randomNumber(10) 返回0-10的随机整数，包括0，10
            return Math.round(Math.random() * n1);
        } else { // randomNumber() 返回0-255的随机整数，包括0，255
            return Math.round(Math.random() * 255)
        }
    },
    // 随机产生颜色
    randomColor: function () {
        // randomNumber是上面定义的函数
        // 写法一
        // return "rgb(" + this.randomNumber() + "," + this.randomNumber() + "," + this.randomNumber() + ")";
        // 写法二
        return "#" + Math.random().toString(16).substring(2).substr(0, 6);
        // 写法三
        // var color = "#", _index;
        // for (var i = 0; i < 6; i++) {
        //     _index = this.randomNumber(15)
        //     color += "0123456789abcdef"[_index];
        // }
        // return color;
    },

    // 设置url参数
    // setUrlPrmt({a: 1, b: 2});
    // a=1&b=2
    setUrlPrmt: function (object) {
        var rs = [];
        for (var option in object) {
            if (object[option] != null && object[option] != "") {
                rs.push(option + "=" + object[option]);
            }
        }
        return rs.join("&")
    },
    // 获取url参数
    // getUrlPrmt('github.com/TaichiPanda?id=122000011938')
    // Object{id: "122000011938"}
    getUrlPrmt: function (url) {
        url = url ? url : window.location.href;
        var parm = url.substring(url.indexOf("?") + 1),
            aString = parm.split("&"),
            rs = {};
        for (var i = 0, len = aString.length; i < len; i++) {
            var posts = aString[i].indexOf("=");
            if (posts == -1) {
                continue;
            }
            var name = aString[i].substring(0, posts),
                value = window.decodeURIComponent(aString[i].substring(posts + 1));
            rs[name] = value;
        }
        return rs;
    },

    // 现金额大写转换函数
    // upDigit(1784525343);
    // 人民币壹拾柒亿捌仟肆佰伍拾贰万伍仟叁佰肆拾叁圆整
    // upDigit(1479)
    // 人民币壹仟肆佰柒拾玖圆整
    // upDigit(-353902)
    // 欠人民币叁拾伍万叁仟玖佰零贰圆整
    // upDigit(3902.326)
    // 人民币叁仟玖佰零贰圆叁角贰分陆厘
    upDigit: function (number) {
        var fraction = ["角", "分", "厘"];
        var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        var unit = [
            ["圆", "万", "亿"],
            ["", "拾", "佰", "仟"]
        ];
        var head = number < 0 ? "欠人民币" : "人民币";
        number = Math.abs(number);
        var s = "";
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "");
        }
        s = s || "整";
        number = Math.floor(number);
        for (var i = 0; i < unit[0].length && number > 0; i++) {
            var p = "";
            for (var j = 0; j < unit[1].length && number > 0; j++) {
                p = digit[number % 10] + unit[1][j] + p;
                number = Math.floor(number / 10);
            }
            s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
            // s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
    },
    // 清除对象中值为空的属性
    // filterParams({a:"",b:null,c:"010",d:123})
    // Object {c: "010", d: 123}
    filterParams: function (object) {
        var newParm = {};
        for (var key in object) {
            if ((object[key] === 0 || object[key]) && object[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== "") {
                newParm[key] = object[key];
            }
        }
        return newParm;
    },

    // cookie
    // 设置cookie
    setCookie: function (name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + "=" + value + ((iDay == null) ? "" : "; expires=" + oDate);
    },
    // 获取cookie
    getCookie: function (name) {
        var array = document.cookie.split("; ");
        for (var i = 1; i < array.length; i++) {
            var newArray = array[i].split("=");
            if (newArray[0] == name) {
                return newArray[1];
            }
        }
        return "";
    },
    // 删除cookie
    removeCookie: function (name) {
        this.setCookie(name, null, -1);
    },

    /* 封装ajax函数
     * @param {string}object.type http连接的方式，包括POST和GET两种方式
     * @param {string}object.url 发送请求的url
     * @param {boolean}object.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}object.data 发送的参数，格式为对象类型
     * @param {function}object.success ajax发送并接收成功调用的回调函数
     * @param {function}object.error ajax发送失败或者接收失败调用的回调函数
     */
    // ajax({
    //    type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    // })
    ajax: function (object) {
        object = object || {};
        object.type = object.type.toUpperCase() || "POST";
        object.url = object.url || "";
        object.async = object.async || true;
        object.data = object.data || null;
        object.success = object.success || function () {};
        object.error = object.error || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var params = [];
        for (var key in object.data) {
            params.push(key + "=" + object.data[key]);
        }
        var postData = params.join("&");
        if (object.type.toUpperCase() === "POST") {
            xmlHttp.open(object.type, object.url, object.async);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            xmlHttp.send(postData);
        } else if (object.type.toUpperCase() === "GET") {
            xmlHttp.open(object.type, object.url + "?" + postData, object.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                object.success(xmlHttp.responseText);
            } else {
                object.error(xmlHttp.responseText);
            }
        }
    },

    // 获取对象数组某些项
    // var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    // getOptionArray(arr,'a,c')
    // [{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    // getOptionArray(arr,'a',1)
    // [1, 2, 5, 4, 4]
    // getOptionArray(arr,'b',1)
    // [2, 3, 9, 2, 5]
    getOptionArray: function (array, keys, type) {
        var newArray = [];
        if (!keys) {
            return array;
        }
        // 是否只是获取某一项的值
        if (type === 1) {
            for (var i = 0, len = array.length; i < len; i++) {
                newArray.push(array[i][keys]);
            }
            return newArray;
        }
        var _keys = keys.split(","),
            newArrayOne = {};
        for (var i = 0, len = array.length; i < len; i++) {
            newArrayOne = {};
            for (var j = 0, lens = _keys.length; j < lens; j++) {
                newArrayOne[_keys[j]] = array[i][_keys[j]];
            }
            newArray.push(newArrayOne);
        }
        return newArray;
    },
    // 排除对象数组某些项
    // var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    // filterOptionArray(arr,'a')
    // [{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    // filterOptionArray(arr,'a,c')
    // [{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray: function (array, keys) {
        var newArray = [];
        var _keys = keys.split(","),
            newArrayOne = {};
        for (var i = 0, len = array.length; i < len; i++) {
            newArrayOne = {};
            for (var key in array[i]) {
                // 如果key不存在排除keys里面，添加数据
                if (_keys.indexOf(key) === -1) {
                    newArrayOne[key] = array[i][key];
                }
            }
            newArray.push(newArrayOne);
        }
        return newArray;
    },

    // 图片没加载出来时用一张图片代替
    // afterLoadImg(oImg, "load.jpg", function(o){
    //     o.src = "1.jpg"  
    // })
    afterLoadImg: function (object, url, callback) {
        var oImg = new Image(),
            _this = this;
        oImg.src = url;
        oImg.onload = function () {
            object.src = oImg.src;
            if (callback && _this.isType(callback, "function")) {
                callback(object);
            }
        }
    },
    // 图片滚动懒加载
    // @className {string} 要遍历图片的类名
    // @number {number} 距离多少的时候开始加载 默认 0
    // 比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    // html代码
    // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    // data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    // 详细可以查看testLoadImg.html

    // window.onload = function() {
    // 	loadImg('load-img',100);
    // 	window.onscroll = function() {
    // 		loadImg('load-img',100);
    // 		}
    // }
    loadImg: function (className, number) {
        var _className = className || "js-load-img",
            _num = number || 0,
            _this = this;
        var oImgLoad = document.getElementsByClassName(_className);
        for (var i = 0, len = oImgLoad.length; i < len; i++) {
            if (document.documentElement.clientHeight + document.body.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
                // 记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                // 设置过渡，当图片下来的时候有一个图片透明度的变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                if (oImgLoad.dataset) {
                    this.afterLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                } else {
                    this.afterLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    })
                }
                (function (i) {
                    setTimeout(function () {
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 16)
                })(i)
            }
        }
    },


    // 对象的数组的排序
    // var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    // oArraySort(arr,'a,b')  a是第一排序条件，b是第二排序条件
    oArraySort: function (array, sortText) {
        if (!sortText) {
            return array;
        }
        var _sortText = sortText.split(",").reverse(),
            _arr = array.slice(0);
        for (var i = 0, len = _sortText.length; i < len; i++) {
            _arr.sort(function (n1, n2) {
                return n1[_sortText[i]] - n2[_sortText[i]];
            })
        }
        return _arr;
    },
    // 数组扁平化
    // var arr=[1, [2, [ [3, 4], 5], 6]];
    // steamroller(arr)
    // [1, 2, 3, 4, 5, 6]
    steamroller: function (array) {
        var newArray = [];
        for (var i = 0, len = array.length; i < len; i++) {
            if (Array.isArray(array[i])) {
                // 如果是数组，调用（递归）steamroller将其扁平化
                // 然后再push到newArray中
                newArray.push.apply(newArray, steamroller(array[i]));
            } else {
                // 不是数组直接push到newArray中
                newArray.push(array[i]);
            }
        }
        return newArray;
    },
    /*另一种写法
     * steamroller([1,2,[4,5,[1,23]]])
     * [1, 2, 4, 5, 1, 23]
     * 
     * i=0 newArray.push(array[i])  [1]
     * i=1 newArray.push(array[i])  [1,2]
     * i=2 newArray = newArray.concat(steamroller(array[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArray.push(array[i]);  [4]
     * 第一次i=2进入后 i=1, newArray.push(array[i]);  [4，5]
     *  * i=2 newArray = newArray.concat(steamroller(array[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArray.push(array[i]);  [1]
     * 第二次i=2进入后 i=1, newArray.push(array[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArray = newArray.concat(steamroller(array[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
    //  steamroller: function(array) {
    //     var newArray = [];
    //     for (var i = 0; i < array.length; i++) {
    //         if (Array.isArray(array[i])) {
    //             // 如果是数组，调用(递归)steamroller 将其扁平化
    //             // 然后再 push 到 newArr 中
    //             newArray = newArray.concat(steamroller(array[i]));
    //         } else {
    //             // 不是数组直接 push 到 newArr 中
    //             newArray.push(array[i]);
    //         }
    //     }
    //     return newArray;
    //  },

    // 创建正则字符
    createKeyExp: function (sArray) {
        var s = "";
        for (var i = 0; i < sArray.length; i++) {
            if (i != sArray.length - 1) {
                s = s + sArray[i] + "|";
            } else {
                s = s + sArray[i];
            }
        }
        return "(" + s + ")";
    },

    // 关键字加标签（多个关键词用空格隔开）
    // findKey("Lorem ipsum dolor sit amet consectetur adipisicing elit.", "Lorem sit", "i")
    // "<i>Lorem</i>ipsum dolor <i>sit</i> amet consectetur adipisicing elit"
    findKey: function (string, keys, element) {
        var array = null,
            regString = null,
            content = null,
            Reg = null,
            el = element || "span";
        array = keys.split(/\s+/);
        // alert(regString); //    如：(前端|过来)
        regString = this.createKeyExp(array);
        content = string;
        //alert(Reg);//      /如：(前端|过来)/g
        Reg = new RegExp(regString, "g");
        content = content;
        //过滤html标签 替换标签，往关键字前后加上标签
        content = content.replace(/<\/?[^>]*>/g, '');
        return content.replace(Reg, "<" + el + ">$1</" + el + ">");
    },

    // 找出最长单词的长度(Find the Longest word in a String)
    // longestWord('Find the Longest word in a String');
    // 7
    // longestWord('Find|the|Longest|word|in|a|String','|')
    // 7
    longestWord: function (string, splitType) {
        var _splitType = splitType || /\s+/g,
            _max = 0;
        var sArray = string.split(_splitType);
        sArray.forEach(function (item) {
            if (_max < item.length) {
                _max = item.length;
            }
        })
        return _max;
    },

    // 句中单词首字母大写 (Title Case a Sentence)
    // 这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
    // titleCaseUp('this is a title')
    // "This Is a Title"
    titleCaseUp: function (string, splitType) {
        var _splitType = splitType || /\s+/g;
        var sArray = string.split(_splitType),
            result = "",
            _this = this;
        sArray.forEach(function (item) {
            result += _this.changeCase(item, 1) + " ";
        })
        return this.trim(result, 4);
    },

    // 手机类型的判断
    browserInfo: function (type) {
        switch (type) {
            case "android":
                return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
            case "iphone":
                return navigator.userAgent.toLowerCase().indexOf("iphone") !== -1;
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('MicroMessenger') !== -1;
            default:
                return navigator.userAgent.toLowerCase();
        }
    },

    // 过滤字符串(html标签，表情，特殊字符)
    // 字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
    // 如果需要过滤多种字符，type参数使用,分割，如下栗子
    // 过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
    // var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
    // filterString(str,'html,WORD,chinese,special','*','%?')
    // "asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
    filterString: function (string, type, replaceString, keepString) {
        var typeArray = type.split(","),
            str = string;
        for (var i = 0, len = typeArray.length; i < len; i++) {
            if (typeArray[i] === "special") {
                var pattern, regText = '$()[]{}?\|^*+./\"\'+';
                if (keepString) {
                    var spstr = keepString.split(""),
                        _regText = "[^0-9A-Za-z\\s";
                    for (var i = 0, len = spstr.length; i < len; i++) {
                        if (regText.indexOf(spstr[i]) === -1) {
                            _regText += spstr[i];
                        } else {
                            _regText += "\\" + spstr[i];
                        }
                    }
                    _regText += "]";
                    pattern = new RegExp(_regText, "g");
                } else {
                    pattern = new RegExp("[^0-9A-Za-z\\s]", "g")
                }
            }
            var restr = replaceString || "";
            switch (typeArray[i]) {
                case 'special':
                    str = str.replace(pattern, restr);
                    break;
                case 'html':
                    str = str.replace(/<\/?[^>]*>/g, restr);
                    break;
                case 'emjoy':
                    str = str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d| \uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, restr);
                    break;
                case 'word':
                    str = str.replace(/[a-z]/g, restr);
                    break;
                case 'WORD':
                    str = str.replace(/[A-Z]/g, restr);
                    break;
                case 'number':
                    str = str.replace(/[0-9]/g, restr);
                    break;
                case 'chinese':
                    str = str.replace(/[\u4E00-\u9FA5]/g, restr);
                    break;
            }
        }
        return str;
    }
}