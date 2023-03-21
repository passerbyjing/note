#### 10.1 继承相关

~~~
css继承：继承是一种规则，它允许样式不仅应用于特定的html标签元素，而且应用于其后代元素。

无继承性的属性
1、display：规定元素应该生成的框的类型
2、文本属性：
vertical-align：垂直文本对齐
text-decoration：规定添加到文本的装饰
text-shadow：文本阴影效果
white-space：空白符的处理
unicode-bidi：设置文本的方向
3、盒子模型的属性：width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、 border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left
4、背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
5、定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6、生成内容属性：content、counter-reset、counter-increment
7、轮廓样式属性：outline-style、outline-width、outline-color、outline
8、页面样式属性：size、page-break-before、page-break-after
9、声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

有继承性的属性
1、字体系列属性
font：组合字体
font-family：规定元素的字体系列
font-weight：设置字体的粗细
font-size：设置字体的尺寸
font-style：定义字体的风格
font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写 字体的字母与其余文本相比，其字体尺寸更小。
font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。
font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。
2、文本系列属性
text-indent：文本缩进
text-align：文本水平对齐
line-height：行高
word-spacing：增加或减少单词间的空白（即字间隔）
letter-spacing：增加或减少字符间的空白（字符间距）
text-transform：控制文本大小写
direction：规定文本的书写方向
color：文本颜色 a元素除外
3、元素可见性：visibility
4、表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout
5、列表布局属性：list-style-type、list-style-image、list-style-position、list-style
6、生成内容属性：quotes
7、光标属性：cursor
8、页面样式属性：page、page-break-inside、windows、orphans
9、声音样式属性：speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、 pitch、pitch-range、stress、richness、、azimuth、elevation

所有元素可以继承的属性
1. 元素可见性：visibility
2. 光标属性：cursor

内联元素可以继承的属性
1. 字体系列属性
2. 除text-indent、text-align之外的文本系列属性

块级元素可以继承的属性
1. text-indent、text-align

注意：当一个属性不是继承属性时，可以使用inherit关键字指定一个属性应从父元素继承它的值，inherit关键字用于显式地指定继承性，可用于任何继承性/非继承性属性。
~~~

#### 10.5 盒模型

~~~
CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：外边距（margin）、边框（border）、内边距（padding）、实际内容（content）四个属性。

1.1 W3C盒子模型(标准盒模型)
盒子总宽度/高度 =width/height + padding + border + margin。（ 即 width/height 只是 内容高度，不包含 padding 和 border 值）

1.2 IE盒子模型(怪异盒模型)
盒子总宽度/高度 =width/height + margin = (内容区宽度/高度 + padding + border) + margin。（ 即 width/height 包含了 padding 和 border 值 ）

2. CSS如何设置这两种模型
IE8+
   标准：box-sizing: content-box;( 浏览器默认设置 )
   IE：box-sizing: border-box;
IE6\7\8中DOCTYPE缺失会将盒子模型解释为IE盒子模型。若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。

3. JS如何获取盒模型对应的宽和高
   （1）dom.style.width/height只能取到行内样式的宽和高，style 标签中和 link 外链的样式取不到。
   （2）dom.currentStyle.width/height（只有IE兼容）取到的是最终渲染后的宽和高
   （3）window.getComputedStyle(dom).width/height同（2）但是多浏览器支持，IE9 以上支持。
   （4）dom.getBoundingClientRect().width/height也是得到渲染后的宽和高，大多浏览器支持。IE9 以上支持，除此外还可以取到相对于视窗的上下左右的距离。
   （6）dom.offsetWidth/offsetHeight包括高度（宽度）、内边距和边框，不包括外边距。最常用，兼容性最好。
~~~

#### 10.6 样式优先级

~~~
选择器类型
- ID　　	#id
- class　.class
- 标签　　p
- 通用　　*
- 属性　　input[type="text"]
- 伪类　　:hover
- 伪元素　::first-line
- 后代 		h1 p
- 兄弟。  li~a 
- 相邻兄弟 li+a
- 子(相邻后代) ul>li

权重计算规则
第一等：代表内联样式，如: style=””，权值为1000。
第二等：代表ID选择器，如：#content，权值为0100。
第三等：代表类，伪类和属性选择器，如.content，权值为0010。
第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。
通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。
继承的样式没有权值。

比较遵循如下法则：
- 选择器都有一个权值，权值越大越优先；
- 当权值相等时，后出现的样式表设置要优于先出现的样式表设置；
- 创作者的规则高于浏览者：即网页编写者设置的 CSS 样式的优先权高于浏览器所设置的样式；
- 继承的 CSS 样式不如后来指定的 CSS 样式；
- 在同一组属性设置中标有!important规则的优先级最大
- 通配符、子选择器、相邻选择器等的。虽然权值为0000，但是也比继承的样式优先。
- !important 的作用是提升优先级，换句话说。加了这句的样式的优先级是最高的（比内联样式的优先级还高)。

CSS的优先级是根据样式声明的特殊性值来判断的。
选择器的特殊性值分为四个等级，如下：
（1）标签内选择符x,0,0,0
（2）ID选择符0,x,0,0
（3）class选择符/属性选择符/伪类选择符	0,0,x,0
（4）元素和伪元素选择符0,0,0,x
计算方法：
（1）每个等级的初始值为0
（2）每个等级的叠加为选择器出现的次数相加
（3）不可进位，比如0,99,99,99
（4）依次表示为：0,0,0,0
（5）每个等级计数之间没关联
（6）等级判断从左向右，如果某一位数值相同，则判断下一位数值
（7）如果两个优先级相同，则最后出现的优先级高，!important也适用
（8）通配符选择器的特殊性值为：0,0,0,0
（9）继承样式优先级最低，通配符样式优先级高于继承样式
（10）!important（权重），它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以认为它的特殊性值为1,0,0,0,0。
计算实例：
（1）#demo a{color: orange;}/*特殊性值：0,1,0,1*/
（2）div#demo a{color: red;}/*特殊性值：0,1,0,2*/
注意：
（1）样式应用时，css会先查看规则的权重（!important），加了权重的优先级最高，当权重相同的时候，会比较规则的特殊性。
（2）特殊性值越大的声明优先级越高。
（3）相同特殊性值的声明，根据样式引入的顺序，后声明的规则优先级高（距离元素出现最近的）
 (4) 部分浏览器由于字节溢出问题出现的进位表现不做考虑

ie7+和别的浏览器对important的这种作用的支持度都很好。只有ie6有些bug
p{
      color:red !important;
      color:blue;    
 }//会显示blue
 但是这并不说明ie6不支持important，只是支持上有些bug。看下面
 p{
     color:red !important;  
}
p{
    color:blue;  
} //这样就会显示的是red。说明ie6还是支持important的。</pre>
~~~

#### 10.7 盒子塌陷

~~~
当父元素没设置足够大小的时候，而子元素设置了浮动的属性，子元素就会跳出父元素的边界（脱离文档流），尤其是当父元素的高度为auto时，而父元素中又没有其它非浮动的可见元素时，父盒子的高度就会直接塌陷为零， 我们称这是CSS高度塌陷。

关于盒子塌陷的几种解决方法
（1）给每个盒子设定固定的width和height，好处是简单方便，兼容性好，缺点是非自适应。
（2）给外部的父盒子也添加浮动，让其也脱离标准文档流，这种方法方便，但是对页面的布局不是很友好，不易维护。
（3）给父盒子添加overflow属性。
（4）用after伪元素清除浮动：.clearfix:after {clear: both;}
（5）给父盒子添加border
（6）给父盒子设置padding-top
~~~

#### 什么是包含块，对于包含块的理解?

```
包含块（containing block）就是元素用来计算和定位的一个框。
（1）根元素（很多场景下可以看成是<html>）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。
（2）对于其他元素，如果该元素的position是relative或者static，则“包含块”由其最近的块容器祖先盒的content box边界形成。
（3）如果元素position:fixed，则“包含块”是“初始包含块”。
（4）如果元素position:absolute，则“包含块”由最近的position不为static的祖先元素建立，具体方式如下：
如果该祖先元素是纯inline元素，则规则略复杂：
•假设给内联元素的前后各生成一个宽度为0的内联盒子（inline box），则这两个内联盒子的padding box外面的包围盒就是内联元素的“包含块”；
•如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是CSS2.1规范并没有明确定义，浏览器自行发挥否则，“包含块”由该祖先的padding box边界形成。
如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。
```

#### 10.12 浏览器是怎样解析CSS选择器的？

~~~
CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点(叶子节点)，而从左向右的匹配规则的性能都浪费在了失败的查找上面。而在 CSS解析完毕后,需要将解析的结果与DOM Tree的内容-起进行分析建立-棵Render Tree，最终用来进行绘图。在建立Render Tree时(WebKit 中的「Attachment」过程)， 浏览器就要为每个DOM Tree中的元素根据CSS的解析结果(Style Rules)来确定生成怎样的Render Tree。
~~~

#### 12.5 css3新特性

~~~
1. CSS3 边框
   在 css3 中新增的边框属性如下：
   创建圆角：border-radius : length length;
   div{
     /* 如果前后的值都存在，那么前面的值设置其水平半径，后面值设置其垂直半径 */
     border-radius: 10px 15px 20px 30px / 20px 30px 10px 15px;
     /* 上面写法等价于下面的写法，第一个值是水平半径，第二个值是垂直半径 */
     border-top-left-radius: 10px 20px;
     border-top-right-radius: 15px 30px;
     border-bottom-right-radius: 20px 10px;
     border-bottom-left-radius: 30px 15px;
   }

   边框阴影
   {box-shadow : [inset] x-offset y-offset blur-radius extension-radius spread-radiuscolor}
   说明：对象选择器 {box-shadow:[投影方式] X轴偏移量 Y轴偏移量 模糊半径 阴影扩展半径 阴影颜色}
   div{
     /* 内阴影，向右偏移10px，向下偏移10px，模糊半径5px，阴影缩小10px */
     box-shadow: inset 10px 10px 5px -10px #888888;
   }

  边框图片
   border-image : border-image-source || border-image-slice [ / border-image-width] || border-image-repeat
   border-image ： none | image [ number | percentage]{1,4} [ / border-width>{1,4} ] ? [ stretch | repeat | round ]{0,2}

   div{
     border-image:url(border.png) 30 30 round;
     border-image: url(border.png) 20/10px repeat;
   }

2. CSS3 背景
background-size属性
background-origin属性
规定背景图片的定位区域，背景图片可以放置于content-box、padding-box或border-box区域，
background-clip属性
与background-origin属性相似，规定背景颜色的绘制区域，区域划分与background-origin属性相同。

CSS3 多重背景图片
CSS3 允许为元素设置多个背景图像
body{
  background-image:url(bg_flower.gif),url(bg_flower_2.gif);
}

3. CSS3 文本效果
text-shadow属性
给为本添加阴影，能够设置水平阴影、垂直阴影、模糊距离，以及阴影的颜色。
h1{
  text-shadow: 5px 5px 5px #FF0000;
}

text-wrap word-wrap属性
设置区域内的自动换行。
/* 允许对长单词进行拆分，并换行到下一行 */
p {word-wrap:break-word;}
 normal 只在允许的换行点进行换行。                             
 none 不换行。元素无法容纳的文本会溢出。                         
 break-word 在任意两个字符间换行。                             
 suppress 压缩元素中的换行。浏览器只在行中没有其他有效换行点时进行换行。

4. CSS3 字体
字体定义
在 CSS3 之前，web 设计师必须使用已在用户计算机上安装好的字体。但是通过 CSS3，web 设计师可以使用他们喜欢的任意字体。当找到或购买到希望使用的字体时，可将该字体文件存放到 web 服务器上，它会在需要时 被自动下载到用户的计算机上。字体需要在 CSS3 @font-face 规则中定义。

/* 定义字体 */
@font-face{
  font-family: myFont;
  src: url('Sansation_Light.ttf'),
       url('Sansation_Light.eot');     /* IE9+ */
}

div{
  font-family:myFont;
}


使用粗体字体
"Sansation_Light.ttf"文件 是定义的正常体，"Sansation_Bold.ttf" 是另一个字体文件，它包含了 Sansation 字体的粗体字符。只要 font-family 为 "myFirstFont" 的文本需要显示为粗体，浏览器就会使用该字体。（其实没弄清楚这样处理的原因，经测试直接在html中通过 b 标签也可以实现加粗的效果）

/* 定义正常字体 */
@font-face{
  font-family: myFirstFont;
  src: url('/example/css3/Sansation_Light.ttf'),
       url('/example/css3/Sansation_Light.eot'); /* IE9+ */
}

/* 定义粗体时使用的字体 */
@font-face{
  font-family: myFirstFont;
  src: url('/example/css3/Sansation_Bold.ttf'),
       url('/example/css3/Sansation_Bold.eot'); /* IE9+ */
  /* 标识属性 */
  font-weight:bold;
}

div{
  font-family:myFirstFont;
}


5. CSS3 2D 转换

通过 CSS3 转换，我们能够对元素进行**移动、缩放、转动、拉长或拉伸**，转换是使元素改变形状、尺寸和位置的一种效果。
translate() 方法
通过 translate(x , y) 方法，元素根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数从其当前位置移动，x为正值向右移动，为负值向左移动；y为正值向下移动，为负值向上移动；

rotate() 方法
控制元素顺时针旋转给定的角度。为正值，元素将顺时针旋转。为负值，元素将逆时针旋转。
transform: rotate(30deg);

scale() 方法
根据给定的宽度（X 轴）和高度（Y 轴）参数，控制元素的尺寸的增加、减少。
transform: scale(2,4);

skew() 方法
根据给定的水平线（X 轴）和垂直线（Y 轴）参数设置元素翻转给定的角度。
transform: skew(30deg,20deg);

matrix() 方法
matrix() 方法把所有 2D 转换方法组合在一起。matrix() 方法需要六个参数，包含数学函数，允许旋转、缩放、移动以及倾斜元素。
transform:matrix(0.866,0.5,-0.5,0.866,0,0);
/* 使用 matrix 方法将 div 元素旋转 30 度 */

6.CSS3 3D 转换
rotateX() 
rotateY() 旋转
~~~

#### 12.6 CSS3 过渡

~~~
通过 CSS3可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。要实现这一点，必须规定以下两项内容：
- 设置添加过渡效果的 CSS 属性；
- 设置过渡效果的时长；
注意：如果时长未设置，则不会有过渡效果，因为默认值是 0。
注意： 当鼠标移出元素时，它会逐渐变回原来的样式。
/* 设置将变化效果添加在“宽度”上，时长为2秒；该时长在其他属性上并不适用 */
div{
  transition: width 2s;// 单项改变
  transition: width 2s, height 2s, transform 2s;// 多项改变
}
/* 配合在一起使用的效果就是当鼠标移上去的时候宽度变为300px，这个过程耗时2秒 */
div:hover{
  width:300px;
}
过渡属性详解
transition是简写属性，

语法： transition : transition-property | transition-duration | transition-timing-function | transition-delay;
/* 设置在宽度上添加过渡效果，时长为1秒，过渡效果时间曲线为linear，等待2秒后开始过渡 */
div{
  transition: width 1s linear 2s;
}

transition 简写属性，用于在一个属性中设置四个过渡属性。
transition-property 规定应用过渡的 CSS 属性的名称。           
transition-duration 定义过渡效果花费的时间。默认是 0。         
transition-timing-function 规定过渡效果的时间曲线。默认是"ease"。     
transition-delay 规定过渡效果何时开始。默认是 0。            
~~~

#### 12.7 CSS3 动画

~~~
通过 CSS3可以创建动画，这些动画可以取代网页中的画图片、Flash 动画以及 JavaScript。

CSS3 中通过@keyframes 规则来创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式（动画开始前的样式）逐渐改为新样式（需要变到的样式）的动画效果。

通过from , to关键字设置动画发生的时间
@keyframes myfirst{
  from {background: red;}
  to {background: yellow;}
}
div{
  animation: myfirst 5s;
}

通过百分比设置动画发生的时间
/* 当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变 */
@keyframes myfirst{
  0%   {background: red;}
  25%  {background: yellow;}
  50%  {background: blue;}
  100% {background: green;}
}
/* 同时改变背景色和位置 */
@keyframes myfirst{
  0%   {background: red; left:0px; top:0px;}
  25%  {background: yellow; left:200px; top:0px;}
  50%  {background: blue; left:200px; top:200px;}
  75%  {background: green; left:0px; top:200px;}
  100% {background: red; left:0px; top:0px;}
}

动画属性详解
animation : animation-name | animation-duration | animation-timing-function | animation-delay | animation-iteration-count | animation-direction
/* 应用的动画为myfirst，一个动画周期为5秒，动画的速度曲线为linear，动画2秒后播放，播放次数为infinite，即无限循环，动画下一周期是否逆向播放取值alternate，即逆向播放 */
animation: myfirst 5s linear 2s infinite alternate;

animation 所有动画属性的简写属性，除了animation-play-state属性。 
animation-name 规定 @keyframes 动画的名称。
animation-duration 规定动画完成一个周期所花费的秒或毫秒。默认是 0。
animation-timing-function 规定动画的速度曲线。默认是 "ease"。
animation-delay 规定动画何时开始。默认是 0。
animation-iteration-count 规定动画被播放的次数。默认是 1。
animation-direction 规定动画是否在下一周期逆向地播放。默认是 "normal"。
animation-play-state 规定动画是否正在运行或暂停。默认是 "running"。
animation-fill-mode 规定对象动画时间之外的状态。
~~~

#### 12.8 CSS3 多列

~~~
通过 CSS3够创建多个列来对文本进行布局，就像我们经常看到的报纸的布局一样。
CSS3 创建多列: column-count:3;属性规定元素应该被分隔的列数。
CSS3 规定列之间的间隔: column-gap:40px;属性规定列之间的间隔。

CSS3 列规则
column-rule属性设置列之间的宽度、样式和颜色规则。
column-rule : column-rule-width | column-rule-style | column-rule-color

div{
  column-rule:3px outset #ff0000;
}

column-count 规定元素应该被分隔的列数
column-fill 规定如何填充列
column-gap 规定列之间的间隔
column-rule 设置所有 column-rule-* 属性的简写属性
column-rule-width 规定列之间规则的宽度
column-rule-style 规定列之间规则的样式
column-rule-color 规定列之间规则的颜色
column-span 规定元素应该横跨的列数
column-width 规定列的宽度
columns 语法 : column-width column-count。
~~~

#### 12.9 CSS3 用户界面

~~~
CSS3 resize: resize:both; 设置是否可由用户调整元素尺寸。
CSS3 box-sizing
box-sizing属性允许您以确切的方式定义适应某个区域的具体内容。边框计算在width中

/* 规定两个并排的带边框方框 */
div{
  box-sizing:border-box;
  width:50%;
  float:left;
}

CSS3 outline-offset
outline-offset属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

轮廓与边框有两点不同：
 - 轮廓不占用空间；
 - 轮廓可能是非矩形

/* 规定边框边缘之外 15 像素处的轮廓 */
div{
  border:2px solid black;
  outline:2px solid red;
  outline-offset:15px;
}
~~~

#### 为什么要初始化 CSS 样式？

```
-因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。
-当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
最简单的初始化方法：*{padding:0;margin:0;}（强烈不建议）
淘宝的样式初始化代码：
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend
,button,input,textarea,th,td{margin:0;padding:0;}
body,button,input,select,textarea{font:12px/1.5tahoma,arial,\5b8b\4f53;}
h1,h2,h3,h4,h5,h6{font-size:100%;}
address,cite,dfn,em,var{font-style:normal;}
code,kbd,pre,samp{font-family:couriernew,courier,monospace;}
small{font-size:12px;}
ul,ol{list-style:none;}
a{text-decoration:none;}
a:hover{text-decoration:underline;}
sup{vertical-align:text-top;}
sub{vertical-align:text-bottom;}
legend{color:#000;}
fieldset,img{border:0;}
button,input,select,textarea{font-size:100%;}
table{border-collapse:collapse;border-spacing:0;}
```

#### 对于 hasLayout 的理解？

```
hasLayout是IE特有的一个属性。很多的IE下的css bug都与其息息相关。在IE中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。当一个元素的hasLayout属性值为true时，它负责对自己和可能的子孙元素进行尺寸计算和定位。虽然这意味着这个元素需要花更多的代价来维护自身和里面的内容，而不是依赖于祖先元素来完成这些工作。
```

#### png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

```
（1）BMP，是无损的、既支持索引色也支持直接色的、点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常具有较大的文件大小。
（2）GIF是无损的、采用索引色的、点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具有支持动画以及透明的优点。但，GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积较小的场景。
（3）JPEG是有损的、采用直接色的、点阵图。JPEG的图片的优点，是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。
（4）PNG-8是无损的、使用索引色的、点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。现在，除非需要动画的支持，否则我们没有理由使用GIF而不是PNG-8。
（5）PNG-24是无损的、使用直接色的、点阵图。PNG-24的优点在于，它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。
（6）SVG是无损的、矢量图。SVG是矢量图。这意味着SVG图片由直线和曲线以及绘制它们的方法组成。当你放大一个SVG图片的时候，你看到的还是线和曲线，而不会出现像素点。这意味着SVG图片在放大时，不会失真，所以它非常适合用来绘制企业Logo、Icon等。
（7）WebP是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的、点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。
•在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；
•在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；
•WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。
但是目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。
```

#### 浏览器如何判断是否支持 webp 格式图片

```
宽高判断法。通过创建image对象，将其src属性设置为webp格式的图片，然后在onload事件中获取图片的宽高，如果能够获取，则说明浏览器支持webp格式图片。如果不能获取或者触发了onerror函数，那么就说明浏览器不支持webp格式的图片。
canvas判断方法。我们可以动态的创建一个canvas对象，通过canvas的toDataURL将设置为webp格式，然后判断返回值中是否含有image/webp字段，如果包含则说明支持WebP，反之则不支持。
```

#### 什么是 Cookie 隔离？（或者说：请求资源的时候不要让它带 cookie 怎么做）

```
网站向服务器请求的时候，会自动带上cookie这样增加表头信息量，使请求变慢。
如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开，静态资源放CDN。
因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。
同时这种方式不会将cookie传入WebServer，也减少了WebServer对cookie的处理分析环节，提高了webserver的http请求的解析速度。
```

#### 什么是 CSS 预处理器/后处理器？

```
CSS预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。通俗的说，CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件。
预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less csssprite，增强了css代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。
CSS后处理器是对CSS进行处理，并最终生成CSS的预处理器，它属于广义上的CSS预处理器。我们很久以前就在用CSS后处理器了，最典型的例子是CSS压缩工具（如clean-css），只不过以前没单独拿出来说过。还有最近比较火的Autoprefixer，以CanIUse上的浏览器支持数据为基础，自动处理兼容性问题。
后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。
```

#### 阐述一下 CSSSprites

```
将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的background-image，background-repeat，background-position的组合进行背景定位。利用CSSSprites能很好地减少网页的http请求，从而很好的提高页面的性能；CSSSprites能减少图片的字节。
优点：
减少HTTP请求数，极大地提高页面加载速度
增加图片信息重复度，提高压缩比，减少图片大小
更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现
缺点：
图片合并麻烦
维护麻烦，修改一个图片可能需要重新布局整个图片，样式
```

#### 内联盒模型基本概念

```
内容区域（content area）。内容区域指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子（character box）；但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此，对于这些元素，内容区域可以看成元素自身。
内联盒子（inline box）。“内联盒子”不会让内容成块显示，而是排成一行，这里的“内联盒子”实际指的就是元素的“外在盒子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”两类。
行框盒子（line box），每一行就是一个“行框盒子”（实线框标注），每个“行框盒子”又是由一个一个“内联盒子”组成的。
包含块（containing box），由一行一行的“行框盒子”组成。
```

#### 什么是幽灵空白节点？

```
“幽灵空白节点”是内联盒模型中非常重要的一个概念，具体指的是：在HTML5文档声明中，内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个“空白节点”一样。这个“空白节点”永远透明，不占据任何宽度，看不见也无法通过脚本获取，就好像幽灵一样，但又确确实实地存在，表现如同文本节点一样，因此，我称之为“幽灵空白节点”。
```

#### 什么是替换元素？

```
通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，<img>、<object>、<video>、<iframe>或者表单元素<textarea>和<input>和<select>都是典型的替换元素。
替换元素除了内容可替换这一特性以外，还有以下一些特性。
（1）内容的外观不受页面上的CSS的影响。用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观需要类似appearance属性，或者浏览器自身暴露的一些样式接口，
（2）有自己的尺寸。在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素，如<video>、<iframe>或者<canvas>等，也有少部分替换元素为0像素，如<img>图片，而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。
（3）在很多CSS属性上有自己的一套表现规则。比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。
（4）所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block。
```

#### 替换元素的计算规则？

```
替换元素的尺寸从内而外分为3类：固有尺寸、HTML尺寸和CSS尺寸。
（1）固有尺寸指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的。
（2）HTML尺寸只能通过HTML原生属性改变，这些HTML原生属性包括<img>的width和height属性、<input>的size属性、<textarea>的cols和rows属性等。
（3）CSS尺寸特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸，对应盒尺寸中的content box。
这3层结构的计算规则具体如下
（1）如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高。
（2）如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高。
（3）如果有CSS尺寸，则最终尺寸由CSS属性决定。
（4）如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。
（5）如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素。
（6）内联替换元素和块级替换元素使用上面同一套尺寸计算规则。
```

#### content 与替换元素的关系？

```
content属性生成的对象称为“匿名替换元素”。
（1）我们使用content生成的文本是无法选中、无法复制的，好像设置了user select:none声明一般，但是普通元素的文本却可以被轻松选中。同时，content生成的文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，因此，千万不要自以为是地把重要的文本信息使用content属性生成，因为这对可访问性和SEO都很不友好。
（2）content生成的内容不能左右:empty伪类。
（3）content动态生成值无法获取。
```

#### 什么是层叠上下文？

```
层叠上下文，英文称作stacking context，是HTML中的一个三维的概念。如果一个元素含有层叠上下文，我们可以理解为这个元素在z轴上就“高人一等”。
层叠上下文元素有如下特性：
（1）层叠上下文的层叠水平要比普通元素高（原因后面会说明）。
（2）层叠上下文可以阻断元素的混合模式。
（3）层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的“层叠上下文”。
（4）每个层叠上下文和兄弟元素独立，也就是说，当进行层叠变化或渲染的时候，只需要考虑后代元素。
（5）每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中。
层叠上下文的创建：
（1）页面根元素天生具有层叠上下文，称为根层叠上下文。根层叠上下文指的是页面根元素，可以看成是<html>元素。因此，页面中所有的元素一定处于至少一个“层叠结界”中。
（2）对于position值为relative/absolute以及Firefox/IE浏览器（不包括Chrome浏览器）下含有position:fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。Chrome等WebKit内核浏览器下，position:fixed元素天然层叠上下文元素，无须z-index为数值。根据我的测试，目前IE和Firefox仍是老套路。
（3）其他一些CSS3属性，比如元素的opacity值不是1。
```

#### 什么是层叠水平？

```
层叠水平，英文称作stacking level，决定了同一个层叠上下文中元素在z轴上的显示顺序。
显而易见，所有的元素都有层叠水平，包括层叠上下文元素，也包括普通元素。然而，对普通元素的层叠水平探讨只局限在当前层叠上下文元素中。
```

#### 元素的层叠顺序？

~~~
层叠顺序，英文称作 stacking order，表示元素发生层叠时有着特定的垂直显示顺序。
层叠上下文 - 负z-index - block块状盒子 - float浮动盒子 - inline水平盒子 - z-index：auto或看作z-index：0不依赖z-index的层叠上下文

层叠准则
谁大谁上：当具有明显的层叠水平标识的时候，如生效的z-index属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。
后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。
~~~
