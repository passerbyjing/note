# Canvas

```
<canvas id="tutorial" width="150" height="150"></canvas>
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

关于<canvas>:

1.</canvas> 标签不可省;

2.getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能 ;

## 绘制矩形

不同于 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG)，[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。

canvas提供了三种方法绘制矩形：

- [`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)

    绘制一个填充的矩形

- [`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)

    绘制一个矩形的边框

- [`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)

    清除指定矩形区域，让清除部分完全透明。

    |                          Screenshot                          | Live sample |
    | :----------------------------------------------------------: | :---------: |
    | ![img](https://mdn.mozillademos.org/files/245/Canvas_rect.png) |             |

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用[画图命令](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths)去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数：

- `beginPath()`

    新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

- `closePath()`

    闭合路径之后图形绘制命令又重新指向到上下文中。

- `stroke()`

    通过线条来绘制图形轮廓。

- `fill()`

    通过填充路径的内容区域生成实心的图形。

 **注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（） **；

 **注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合** 

### 绘制一个三角形

```
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

|                          Screenshot                          | Live sample |
| :----------------------------------------------------------: | :---------: |
| ![img](https://mdn.mozillademos.org/files/9847/triangle.png) |             |

### 线

绘制直线，需要用到的方法`lineTo()`。

- [`lineTo(x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo)：点到点

    绘制一条从当前位置到指定x以及y位置的直线;  ---moveTo()后

该方法有两个参数：x以及y ，代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点，等等。。。开始点也可以通过`moveTo()`函数改变。

下面的例子绘制两个三角形，一个是填充的，另一个是描边的。

```
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
  var ctx = canvas.getContext('2d');

  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描边三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
  }
}
```

这里从调用`beginPath()`函数准备绘制一个新的形状路径开始。然后使用`moveTo()`函数移动到目标位置上。然后下面，两条线段绘制后构成三角形的两条边。

|                          Screenshot                          | Live sample |
| :----------------------------------------------------------: | :---------: |
| ![img](https://mdn.mozillademos.org/files/238/Canvas_lineTo.png) |             |

### 圆弧

绘制圆弧或者圆使用`arc()`方法或`arcTo()`：

- [`arc(x, y, radius, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)

    画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。

- [`arcTo(x1, y1, x2, y2, radius)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo)

    根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

arc方法有六个参数：`x,y`为绘制圆弧所在圆上的圆心坐标。`radius`为半径。`startAngle`以及`endAngle`参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数`anticlockwise`为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

**注意：`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:**

**弧度=(Math.PI/180)\*角度。**

- [`Path2D()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Path2D/Path2D)

    `Path2D()`会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）。

```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

所有的路径方法比如`moveTo`, `rect`, `arc`或`quadraticCurveTo`等，如我们前面见过的，都可以在Path2D中使用。

Path2D API 添加了 `addPath`作为将`path`结合起来的方法。当你想要从几个元素中来创建对象时，这将会很实用。比如：

- **[`Path2D.addPath(path [, transform\])`]**

    添加了一条路径到当前路径（可能添加了一个变换矩阵）。

### Path2D 示例

在这个例子中，我们创造了一个矩形和一个圆。它们都被存为Path2D对象，后面再派上用场。随着新的Path2D API产生，几种方法也相应地被更新来使用Path2D对象而不是当前路径。在这里，带路径参数的`stroke`和`fill`可以把对象画在画布上。

```js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```



|                         Screenshot                         | Live sample |
| :--------------------------------------------------------: | :---------: |
| ![img](https://mdn.mozillademos.org/files/9851/path2d.png) |             |

## [色彩 Colors](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#colors)

到目前为止，我们只看到过绘制内容的方法。如果我们想要给图形上色，有两个重要的属性可以做到：`fillStyle` 和 `strokeStyle。`

- [`fillStyle = color`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle)

    设置图形的填充颜色。

- [`strokeStyle = color`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

    设置图形轮廓的颜色。

`color` 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。我们迟些再回头探讨渐变和图案对象。默认情况下，线条和填充颜色都是黑色（CSS 颜色值 `#000000`）。

**注意:** 一旦您设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。