#### 13.1 window.open

~~~
用来打开新窗口
最基本
window.open('page.html');
经过设置后
 window.open('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')   
   //该句写成一行代码
   //参数解释：
   // window.open 弹出新窗口的命令； 
　　//'page.html' 弹出窗口的文件名； 
　　//'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
　　//height=100 窗口高度； 
　　//width=400 窗口宽度； 
　　//top=0 窗口距离屏幕上方的象素值； 
　　//left=0 窗口距离屏幕左侧的象素值； 
　　//toolbar=no 是否显示工具栏，yes为显示； 
　　//menubar，scrollbars 表示菜单栏和滚动栏。 
　　//resizable=no 是否允许改变窗口大小，yes为允许； 
　　//location=no 是否显示地址栏，yes为允许； 
　　//status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许
　　
弹出两个窗口
　window.open ("page.html")//写成一行，不加分号
　window.open ("page2.html")
　为避免弹出的2个窗口覆盖，用top和left控制一下弹出的位置不要相互覆盖即可。最后用上面的说过的四种方法调用即可。 
　注意：2个窗口的name(newwindow与 newwindow2)不要相同，或者干脆全部为空。
~~~

#### 13.3 查找给定的两个节点的第一个公共父节点

~~~
递归循环树的节点，因二叉树不能重复的特性,当前节点为 p or q ，返回当前节点 父节点循环中，如果找到一个，则查找其他子树 其他子树没有找到另外一个，就证明当前节点为找到的子树是最近公共祖先 两个都找到了，对应当前节点是两个节点的父节点这种情况，则返回当前节点。 代码
~~~

~~~js
var lowestCommonAncestor = function(root, p, q) {
if (!root || root === p || root === q) return root
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if (!left) return right
    if (!right) return left
    return root
};
~~~

#### 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧？

```
png24位的图片在iE6浏览器上出现背景解决方案：做成PNG8，也可以引用一段脚本处理。
浏览器默认的margin和padding不同解决方案：加一个全局的*{margin:0;padding:0;}来统一。
IE6双边距bug：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。#box{float:left;width:10px;margin:0 0 0 10px;}这种情况之下IE会产生20px的距离解决方案：在float的标签样式控制中加入_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用"\9"这一标记，将IE游览器从所有情况中分离出来。接着，再次使用"+"将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
.bb{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9;/*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性解决方法：统一通过getAttribute()获取自定义属性。
IE下，event对象有x、y属性，但是没有pageX、pageY属性;Firefox下，event对象有pageX、pageY属性，但是没有x、y属性。解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。
Chrome中文界面下默认会将小于12px的文本强制按照12px显示
解决方法：
1.可通过加入CSS属性-webkit-text-size-adjust:none;解决。但是，在chrome更新到27版本之后就不可以用了。
2.还可以使用-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);收缩的是整个span的大小，这时候，必须要将span转换成块元素，可以使用display：block/inline-block/...；
超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了解决方法：改变CSS属性的排列顺序L-V-H-A
怪异模式问题：漏写DTD声明，Firefox仍然会按照标准模式来解析网页，但在IE中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写DTD声明的好习惯。
```
