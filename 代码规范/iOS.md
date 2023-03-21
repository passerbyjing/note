## 命名规则

### 一般原则

#### 清晰

~~~objective-c
1、尽可能遵守 Apple 的命名约定，命名应该尽可能的清晰和简洁，在Objective-C中，清晰比简洁更重要。
insertObject:atIndex: // 这是个好例子 
insert:at: //不够清晰,insert的对象类型和at的位置属性没有说明
removeObjectAtIndex: // 清晰
remove: // 不清晰，remove的对象类型没有说明，参数的作用没有说明

2、名称通常不缩写,即使名称很长,也要拼写完全
ID, URL, JSON, WWW// OK
id, Url, json, www// 糟糕 
// 清晰
destinationSelection
setBackgroundColor:
// 不清晰，不要使用简写
destSel
setBkgdColor:
关于缩写,你可能会认为某个缩写广为人知,但有可能并非如此,尤其是当你的代码被来自不同文化和语言背景的开发人员所使用时。当然,你可以使用少数非常常见,历史悠久的缩写。所有可以使用的缩写见这个列表（https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CodingGuidelines/Articles/APIAbbreviations.html#//apple_ref/doc/uid/20001285-BCIHCGAE）
~~~

#### 一致性

~~~objective-c
1、尽可能使用与 Cocoa 编程接口命名保持一致的名称。
2、在使用多态方法的类中，命名的一致性非常重要。在不同类中实现相同功能的方法应该具有相同的名称 
~~~

#### 使用前缀

~~~objective-c
由于苹果没有命名空间，因此使用前缀可以防止和苹果以及其他第三方库的命名冲突。
- 不要使用下划线或子前缀 i
- 对class、protocol、structure、公开方法、常量命名时使用前缀,成员方法和结构体字段时不使用前缀。
- Category 方法统一使用xy_methodName 形式进行扩展
- 前缀由大写的字母缩写组成，比如Cocoa中NS前缀代表Foundation框架中的类，IB则代表Interface Builder框架。
- 可以在为类、协议、函数、常量以及typedef宏命名的时候使用前缀，但注意不要为成员变量或者方法使用前缀，因为他们本身就包含在类的命名空间内。
- 命名前缀的时候不要和苹果SDK框架冲突。 
~~~

#### 书写约定

~~~objective-c
1、命名时单词之间不要使用下划线、破折号等标点符号分隔,请使用驼峰命名法对方法、变量进行命名
2、如果方法名使用一个广为人知的大写首字母缩略词开头,则首字母可以大写。如NSImage 中的TIFFRepresentation
3、如果方法名或者常量名使用了前缀,则前缀之后所有单词的首字母都要大写。如NSRunAlertPanel
避免使用下划线来表示名称的私有属性。苹果公司保留该方式的使用。如果第三方这样使用可能会导致命名冲突****,****他们可能会在无意中用自己的方法覆盖掉已有的私有方法,这会导致严重的后果
~~~

#### 类和协议

~~~objective-c
类名以大写字母开头，应该包含一个名词来表示它代表的对象类型，同时可以加上必要的前缀，比如NSString, NSDate, NSScanner, NSApplication等等。
协议应根据它包含的方法的作用来命名。
- 一般是:前缀 + 功能 + 类型。例如:MW + Login + ViewController。 
- 大多数协议仅组合一组相关的方法,而不关联任何类,这种协议的命名应该使用动名词(ing),以不与类名混淆比如NSLocking 
- 有些协议组合一些彼此无关的方法(这样做是避免创建多个独立的小协议)。这样的协议倾向于与某个类关联在一起,该类是协议的主要体现者。在这种情形,我们约定协议的名称与该类同名。NSObject 协议就是这样一个例子。这个协议组合一组彼此无关的方法,有用于查询对象在其类层次中位置的方法,有使之能调用特殊方法的方法以及用于增减引用计数的方法。由于 NSObject 是这些方法的主要体现者,所以我们用类的名称命名这个协议。
~~~

#### 头文件

~~~objective-c
1、如果头文件内只定义了单个类或者协议，直接用类名或者协议名来命名头文件，比如NSLocale.h定义了NSLocale类。
2、如果头文件内定义了一系列的类、协议、类别，使用其中最主要的类名来命名头文件，比如NSString.h定义了NSString和NSMutableString。
3、每一个Framework都应该有一个和框架同名的头文件，包含了框架中所有公共类头文件的引用，比如Foundation.h
4、Framework中有时候会实现在别的框架中类的类别扩展，这样的文件通常使用被扩展的框架名+Additions的方式来命名，比如NSBundleAdditions.h。
~~~

### 方法

#### 一般规则

~~~objective-c
1、小写第一个单词的首字符,大写随后单词的首字符,不使用前缀。有两种例外情况: 
   方法名以广为人知的大写字母缩略词(如TIFF or PDF)开头; 
   私有方法可以使用统一的前缀来分组和辨识
     
2、表示对象行为的方法,名称以动词开头，名称中不要出现 do 或 does,因为这些助动词没什么实际意义。也不要在动词前使用副词或形容词修饰。
- (void)invokeWithTarget:(id)target: 
- (void)selectTabViewItem:(NSTableViewItem *)tableViewItem 
  
3、方法返回接收者的某个属性,直接用属性名称命名
- (NSSize)cellSize; //优 
- (NSSize)calcCellSize; //差 
- (NSSize)getCellSize; //差 
只有在方法需要间接返回多个值的情况下,才使用 get
// NSBezierPath
- (void) getLineDash:(float *)pattern count:(int *)count phase:(float *)phase; 
上面这样的方法,在其实现里应允许接受 NULL 作为其 in/out 参数,以表示调用者对一个或多个返回值不感兴趣。

4、对于有多个参数的方法，务必在每一个参数前都添加关键词，关键词应当清晰说明参数的作用
- (void)sendAction:(SEL)aSelector to:(id)anObject forAllCells:(BOOL)flag; //优 
- (void)sendAction:(SEL)aSelector :(id)anObject :(BOOL)flag; //差 
- (id)viewWithTag:(int)aTag; //优
- (id)taggedView:(int)aTag; //差

5、细化基类中的已有方法:创建一个新方法,其名称是在被细化方法名称后面追加参数关键词
// NSView
- (id)initWithFrame:(NSRect)frameRect; 
// NSMatrix - NSView 的子类 
- (id)initWithFrame:(NSRect)frameRect 
  mode:(ind)aMode
	cellClass:(Class)factoryId
	numberOfRows:(int)rowsHigh
	numberOfColumns:(int)colsWide;

6、不要使用 and 来连接用属性作参数关键字
- (int) runModalForDirectory:(NSString *)path [file:(NSString *)]
  (file:(NSString) *)name types:(NSArray *)fileTypes; // 优 
- (int) runModalForDirectory:(NSString *)path andFile:(NSString *)name andTypes:(NSArray *)fileTypes; // 差
~~~

 #### 存取方法

~~~objective-c
1、如果属性是用名词描述的,则命名格式为:
- (type)noun; 
- (void)setNoun:(type)aNoun; 
如:
- (NSColor *)color; 
- (void)setColor:(NSColor *)aColor; 

2、如果属性是用形容词描述的,则命名格式为:
- (BOOL)isAdjective; 
- (void)setAdjective:(BOOL)flag; 
如:
- (BOOL)isEditable; 
- (void)setEditable:(BOOL)flag; 

3、如果属性是用动词描述的,则命名格式为:(动词要用现在时时态，不要将动词转化为被动形式来使用)
- (BOOL)verbObject; 
- (void)setVerbObject:(BOOL)flag; 
例如:
- (BOOL)showsAlpha; 
- (void)setShowAlpha:(BOOL)flag; 
// 错误，不要使用动词的被动形式
- (void)setGlyphInfoAccepted:(BOOL)flag;
- (BOOL)glyphInfoAccepted;

4、不要使用动词的过去分词形式作形容词使用
- (BOOL)acceptsGlyphInfo; //优 
- (void)setAcceptsGlyphInfo:(BOOL)flag; //优
- (BOOL)glyphInfoAccepted; //差
- (void)setGlyphInfoAccepted:(BOOL)flag; //差

5、可以使用情态动词(can, should, will 等)来提高清晰性,但不要使用 do 或 does
- (BOOL)canHide; //优 
- (void)setCanHide:(BOOL)flag; //优
- (void)shouldCloseDocument; //优
- (void)setShouldCloseDocument:(BOOL)flag; //优 
- (BOOL)doseAcceptGlyphInfo; //差
- (void)setDoseAcceptGlyphInfo: //差

6、为什么Objective-C中不适用get前缀来表示属性获取方法？因为get在Objective-C中通常只用来表示从函数指针返回值的函数：
// 三个参数都是作为函数的返回值来使用的，这样的函数名可以使用"get"前缀
- (void)getLineDash:(float *)pattern count:(int *)count phase:(float *)phase;
~~~

#### 委托方法

~~~objective-c
委托方法是那些在特定事件发生时可被对象调用,并声明在对象的委托类中的方法。它们有独特的命名约定,这些命名约定同样也适用于对象的数据源方法。

1、名称以标示发送消息的对象的类名开头,省略类名的前缀并小写类第一个字符
- (BOOL)tableView:(UITableView *)tableView shouldSelectRow:(int)row; 
- (BOOL)application:(NSApplication *)sender openFile:(NSString *)filename;     

2、当只有一个"sender"参数时可以省略类名
- (BOOL)applicationOpenUntitledFile:(NSApplication *)sender; 

3、规则1也不适用于响应通知的方法。在这种情况下,方法的唯一参数表示通知对象
- (void)windowDidChangeScreen:(NSNotification *)notification;     

4、用于通知委托对象操作即将发生或已经发生的方法名中要使用 did 或 will
- (void)browserDidScroll:(NSBrowser *)sender; 
- (NSUndoManager *)windowWillReturnUndoManager:(NSWindow *)window;     

5、用于询问委托对象可否执行某操作的方法名中可使用 did 或 will,但最好使用 should
- (BOOL)windowShouldClose:(id)sender; 
~~~

#### 集合方法

~~~objective-c
管理对象(集合中的对象被称之为元素)的集合类,需要使用类似“增删查改”的方法来对集合进行操作，这些方法的命名范式一般为：
- (void)addElement:(elementType)adObj; 
- (void)removeElement:(elementType)anObj; 
- (NSArray *)elements; 
例如:
- (void)addLayoutManager:(NSLayoutManager *)adObj; 
- (void)removeLayoutManager:(NSLayoutManager *)anObj; 
- (NSArray *)layoutManagers; 
如果返回的集合是无序的，使用NSSet来代替NSArray。
如果需要将元素插入到特定的位置，使用类似于这样的命名：
- (void)insertElement:(elementType)anObj atIndex:(int)index; 
- (void)removeElementAtIndex:(int)index; 
如果管理的集合元素中有指向管理对象的指针，要设置成weak类型以防止引用循环。
下面是SDK中NSWindow类的集合操作方法：
- (void)addChildWindow:(NSWindow *)childWin ordered:(NSWindowOrderingMode)place; 
- (void)removeChildWindow:(NSWindow *)childWin; 
- (NSArray *)childWindows; 
- (NSWindow *)parentWindow; 
- (void)setParentWindow:(NSWindow *)window; 
~~~

#### 方法参数

~~~objective-c
命名方法参数时要考虑如下规则: 
- 如同方法名,参数名小写第一个单词的首字符,大写后继单词的首字符。如:removeObject:(id)anObject 
- 不要在参数名中使用 pointer 或 ptr,让参数的类型来说明它是指针
- 避免使用 one, two,…,作为参数名
- 避免为节省几个字符而缩写 

按照 Cocoa 惯例,以下关键字与参数联合使用:
...action:(SEL)aSelector
...alignment:(int)mode
...atIndex:(int)index
...content:(NSRect)aRect
...doubleValue:(double)aDouble
...floatValue:(float)aFloat
...font:(NSFont *)fontObj 
...frame:(NSRect)frameRect
...intValue:(int)anInt
...keyEquivalent:(NSString *)charCode 
...length:(int)numBytes
...point:(NSPoint)aPoint
...stringValue:(NSString *)aString 
...tag:(int)anInt
...target:(id)anObject
...title:(NSString *)aString 
~~~

#### 私有方法

~~~objective-c
大多数情况下,私有方法命名相同与公共方法命名约定相同,但通常我们约定给私有方法添加前缀,以便与公共方法区分开来。即使这样,私有方法的名称很容易导致特别的问题。当你设计一个继承自 Cocoa framework 某个类的子类时,你无法知道你的私有方法是否不小心覆盖了框架中基类的同名方法。 
Cocoa framework 的私有方法名称通常以下划线作为前缀(如:_fooData),以标示其私有属性。基于这样的事实,遵循以下两条建议: 
- 不要使用下划线作为你自己的私有方法名称的前缀,Apple 保留这种用法。
- 若要继承 Cocoa framework 中一个超大的类(如:UIView),并且想要使你的私有方法名称与基类中的区别开来,你可以为你的私有方法名称添加你自己的前缀。这个前缀应该具有唯一性,如基于你公司的名称,或工程的名称,并以“XX_”形式给出。比如你的工程名为”Byte Flogger”,那么就可以是“BF_addObject:” 尽管为私有方法名称添加前缀的建议与前面类中方法命名的约定冲突,这里的意图有所不同:为了防止不小心地覆盖基类中的私有方法。
~~~

### 变量

#### 一般变量

变量使用驼峰命名法。命名时应使用完整的能表示变量作用的词语,禁止使用缩略词或者意义表示不明的词语。

##### 属性和实例变量

~~~objective-c
1、属性和对象的存取方法相关联，属性的第一个字母小写，后续单词首字母大写，不必添加前缀。属性按功能命名成名词或者动词：
// 名词属性
@property (strong) NSString *title;
// 动词属性
@property (assign) BOOL showsAlpha;

2、属性也可以命名成形容词，这时候通常会指定一个带有is前缀的get方法来提高可读性：
@property (assign, getter=isEditable) BOOL editable;

3、命名实例变量，在变量名前加上_前缀（有些有历史的代码会将_放在后面），其它和命名属性一样：
@implementation MyClass {
  BOOL _showsTitle;
}
一般来说，类需要对使用者隐藏数据存储的细节，所以不要将实例方法定义成公共可访问的接口，可以使用@private，@protected前缀。
~~~

##### 常量

~~~objective-c
1、常量名称前统一加字母“k”,也可以是你认为可以表示为常量的字母,比如“c”
const int kNumberOfFiles = 12; 
NSString *const kUserKey = @"kUserKey"; 
enum DisplayTinge { 
	kDisplayTingeGreen = 1, 
	kDisplayTingeBlue = 2 
};

2、如果要定义一组相关的常量，尽量使用枚举类型（enumerations），枚举类型的命名规则和函数的命名规则相同。 建议使用 NS_ENUM 和 NS_OPTIONS 宏来定义枚举类型，参见官方的 Adopting Modern Objective-C（https://developer.apple.com/library/archive/releasenotes/ObjectiveC/ModernizationObjC/AdoptingModernObjective-C/AdoptingModernObjective-C.html）一文：

// 定义一个枚举
typedef NS_ENUM(NSInteger, NSMatrixMode) {
  NSRadioModeMatrix,
  NSHighlightModeMatrix,
  NSListModeMatrix,
  NSTrackModeMatrix
};

// 定义bit map：
typedef NS_OPTIONS(NSUInteger, NSWindowMask) {
  NSBorderlessWindowMask = 0,
  NSTitledWindowMask = 1 << 0,
  NSClosableWindowMask = 1 << 1,
  NSMiniaturizableWindowMask = 1 << 2,
  NSResizableWindowMask = 1 << 3
};

3、使用const定义浮点型或者单个的整数型常量，如果要定义一组相关的整数常量，应该优先使用枚举。常量的命名规范和函数相同：
const float NSLightGray;

4、不要使用#define宏来定义常量，如果是整型常量，尽量使用枚举，浮点型常量，使用const定义。#define通常用来给编译器决定是否编译某块代码，比如常用的：
\#ifdef DEBUG

5、注意到一般由编译器定义的宏会在前后都有一个__，比如*__MACH__*。
~~~

#### UIKit类实例变量

~~~objective-c
UIXXX(标签名) *xx(自定义)+XXX(标签名) 
例子:
UILabel *xxLabel; 
UIButton *xxButton; 
UIImageView *xxImageView; 
UIView *xxView; 
UIViewController *xxViewController; 
...
~~~

#### Foundation类实例变量

~~~objective-c
NSString,NSMutableString *xxStr 
NSArray, NSMutableArray 自描述items(templates)或者 itemArray 
NSDictionary, NSMutableDictionary *xxDict 

除了NSString,NSArray,NSDictionary 和它们的Mutable类之外都按照下面规则
NSXXX(标签名) *xx(自定义)+XXX(标签名) 
例子:
NSData *xxData; 
NSBundle *xxBundle; 
NSTimer *xxTimer; 
NSURL *xxURL; 
NSIndexSet *xxIndexSet; 
// 容器 
NSSet, NSMutableSet xxSet
NSCache xxCache
NSNumber xxNumber
...
~~~

### 通知

~~~objective-c
通知常用于在模块间传递消息，所以通知要尽可能地表示出发生的事件，通知的命名范式是：
[触发通知的类名] + [Did | Will] + [动作] + Notification
例子：
NSApplicationDidBecomeActiveNotification
NSWindowDidMiniaturizeNotification
NSTextViewDidChangeSelectionNotification
NSColorPanelColorDidChangeNotification
~~~

### 图片

~~~objective-c
1.用英文命名，不用拼音
2.每一部分用'-'分隔。分割的第一个首字母大写。
3.尽量表现内容+使用类型
4.尽量同一页面放置在同一个文件夹下
推荐：
Download-Progressbar-Highlighted@2x.png
[Download-Progressbar-Normal@2x.png](mailto:Download-Progressbar-Normal@2x.png) 
~~~

### 代码格式

#### 长度

~~~objective-c
在Xcode > Preferences > Text Editing > Page guide at column:中将最大行长设置为80，过长的一行代码将会导致可读性问题。
~~~

#### 空格

~~~objective-c
1、方法的声明和定义在-号或者+号与返回值之间应留一个空格。而返回值与方法名以及方法名和参数列表之间都不应该有空格例如
- (void)doSomethingWithString:(NSString *)theString { ...} 

2、推荐使用容器符号([]以及{})来表示数组和字典。容器符号与内容之间应使用空格分开
NSArray* array = @[ [foo description], @"Another String", [bar description] ];
NSDictionary* dict = @{ NSForegroundColorAttributeName : [NSColor redColor] }; 

3、条件判断的括号内侧不应有空格。
// 糟糕
if ( a < b ) {
  // something
}
// OK
if (a < b) {
  // something
}

4、关系运算符（如 >=、!=）和逻辑运算符（如 &&、||）两边要有空格。
// OK
(someValue > 100) ? YES : NO
// OK
(items) ?: @[]
二元算数运算符两侧是否加空格不确定，根据情况自己定。一元运算符与操作数之前没有空格。
~~~

#### 函数书写

~~~objective-c

1、一个典型的Objective-C函数应该是这样的：
- (void)writeVideoFrameWithData:(NSData *)frameData timeStamp:(int)timeStamp {
  ...
}
在-和(void)之间应该有一个空格，第一个大括号{的位置在函数所在行的末尾，同样应该有一个空格。

2、如果一个函数有特别多的参数或者名称很长，应该将其按照:来对齐分行显示：
- (id)initWithModel:(IPCModle)model
	ConnectType:(IPCConnectType)connectType
	Resolution:(IPCResolution)resolution
	AuthName:(NSString *)authName
	Password:(NSString *)password
	MAC:(NSString *)mac
	AzIp:(NSString *)az_ip
	AzDns:(NSString *)az_dns
	Token:(NSString *)token
	Email:(NSString *)email
	Delegate:(id<IPCConnectHandlerDelegate>)delegate;

3、在分行时，如果第一段名称过短，后续名称可以以Tab的长度（4个空格）为单位进行缩进：
- (void)short:(GTMFoo *)theFoo
	longKeyword:(NSRect)theRect
	evenLongerKeyword:(float)theInterval
	error:(NSError **)theError {
  ...
} 
~~~

#### 函数调用

~~~objective-c
1、函数调用的格式和书写差不多，可以按照函数的长短来选择写在一行或者分成多行：
// 写在一行
[myObject doFooWith:arg1 name:arg2 error:arg3];
// 分行写，按照':'对齐
[myObject doFooWith:arg1
							 name:arg2
							error:arg3];
// 第一段名称过短的话后续可以进行缩进
[myObj short:arg1 
 			longKeyword:arg2
evenLongerKeyword:arg3
						error:arg4];

2、以下写法是错误的：
// 错误，要么写在一行，要么全部分行
[myObject doFooWith:arg1 name:arg2
			error:arg3];
[myObject doFooWith:arg1
			name:arg2 error:arg3];
// 错误，按照':'来对齐，而不是关键字
[myObject doFooWith:arg1
					name:arg2
					error:arg3];

@public和@private标记符
@public和@private标记符应该以一个空格来进行缩进：
@interface MyClass : NSObject {
	@public
	...
	@private
  ...
}
@end
~~~

#### 注释

##### 文件注释

~~~objective-c
每一个文件都必须写文件注释，文件注释通常包含
文件所在模块
作者信息
历史版本信息
版权信息
文件包含的内容，作用
一段良好文件注释的栗子：
/*******************************************************************************
    Copyright (C), 2011-2013, Andrew Min Chang
	  File name:     AMCCommonLib.h
    Author:        Andrew Chang (Zhang Min) 
    E-mail:        LaplaceZhang@126.com
    
    Description:     
            This file provide some covenient tool in calling library tools. One can easily include 
       library headers he wants by declaring the corresponding macros. 
           I hope this file is not only a header, but also a useful Linux library note.
           
   History:
        2012-??-??: On about come date around middle of Year 2012, file created as "commonLib.h"
        2012-08-20: Add shared memory library; add message queue.
        2012-08-21: Add socket library (local)
        2012-08-22: Add math library
        2012-08-23: Add socket library (internet)
        2012-08-24: Add daemon function
        2012-10-10: Change file name as "AMCCommonLib.h"
        2012-12-04: Add UDP support in AMC socket library
        2013-01-07: Add basic data type such as "sint8_t"
        2013-01-18: Add CFG_LIB_STR_NUM.
        2013-01-22: Add CFG_LIB_TIMER.
        2013-01-22: Remove CFG_LIB_DATA_TYPE because there is already AMCDataTypes.h

    Copyright information: 
            This file was intended to be under GPL protocol. However, I may use this library
        in my work as I am an employee. And my company may require me to keep it secret. 
        Therefore, this file is neither open source nor under GPL control. 
********************************************************************************/
文件注释的格式通常不作要求，能清晰易读就可以了，但在整个工程中风格要统一。
~~~

 ##### 代码注释

~~~objective-c
1、协议、委托的注释要明确说明其被触发的条件：
/** Delegate - Sent when failed to init connection, like p2p failed. */
- (void)initConnectionDidFailed:(IPCConnectHandler *) handler;

2、如果在注释中要引用参数名或者方法函数名，使用||将参数或者方法括起来以避免歧义：
// Sometimes we need |count| to be less than zero.
// Remember to call |StringWithoutSpaces("foo bar baz")|

3、定义在头文件里的接口方法、属性必须要有注释！
~~~

#### 排版

~~~objective-c
1、关键词和操作符之间加适当的空格。 [必须]
2、单页代码最好控制在800行以内，每个方法最好不要超过100行，过多建议对代码进行重构
3、相同的逻辑方法定义避免在多个地方出现，尽量将公用的类、方法抽取出来
4、删除未被使用的代码，不要大片注释未被使用的代码，确定代码不会使用，请及时删除.
5、NSLog在项目打包时要尽量去除。
6、代码后的’{‘不需要独占一行
7、运算逻辑符和变量之间空一格
8、多用#pragma mark - xxx讲方法分块，#pragma mark与下面的代码之前不要空行
9、相对独立的程序块与块之间加空行。 [建议]
    if(retryCount > 3) { 
	    return;
    }
    // 注意这里空一行 
    for(int i = 0; i < 100; i++) { 
    	// …do something 
    }
10、方法之间需要空一行。 [必须]
11、单行代码较长时、表达式等要分成多行书写,划分出的新行要进行适应的缩进,使排版整齐,语句可读。
正确的示范: 
    [_xyCameraMgr changePIPSourceRegion:willMoveSourceIndex 
                      transX:transX/lastPIPZoomScale 
                      transY:transY/lastPIPZoomScale]; 
错误的示范: 
		[_xyCameraMgr changePIPSourceRegion:willMoveSourceIndex transX:transX/lastPIPZoomScale transY:transY/lastPIPZoomScale]; 
12、长表达式要在低优先级操作符处划分新行,操作符放在新行之尾。 [建议] 
【注:对于放在新行之首,还是之尾,有一个习惯的问题。】
正确的示范: 
    \#define IMG_UTIL_BSWAP_32(x) (unsigned int) ( / 
    ( ((unsigned int)(x)) &; 0xff000000 )| / 
    (( ((unsigned int)(x)) &; 0x00ff0000) >> 16)| / 
    ( ((unsigned int)(x)) &; 0x0000ff00 )| / 
    (( ((unsigned int)(x)) &; 0x000000ff) << 16)/ ) 
~~~

#### 语法糖

~~~objective-c
1、应该使用可读性更好的语法糖来构造NSArray，NSDictionary等数据结构，避免使用冗长的alloc,init方法。
如果构造代码写在一行，需要在括号两端留有一个空格，使得被构造的元素于与构造语法区分开来：
// 在语法糖的"[]"或者"{}"两端留有空格
NSArray *array = @[ [foo description], @"Another String", [bar description] ];
NSDictionary *dict = @{ NSForegroundColorAttributeName : [NSColor redColor] };
如果构造代码不写在一行内，构造元素需要使用两个空格来进行缩进，右括号]或者}写在新的一行，并且与调用语法糖那行代码的第一个非空字符对齐：
NSArray *array = @[
 @"This",
 @"is",
 @"an",
 @"array"
];
NSDictionary *dictionary = @{
 NSFontAttributeName : [NSFont fontWithName:@"Helvetica-Bold" size:12],
 NSForegroundColorAttributeName : fontColor
};

2、构造字典时，字典的Key和Value与中间的冒号:都要留有一个空格，多行书写时，也可以将Value对齐：
// 正确，冒号':'前后留有一个空格
NSDictionary *option1 = @{
 NSFontAttributeName : [NSFont fontWithName:@"Helvetica-Bold" size:12],
 NSForegroundColorAttributeName : fontColor
};
// 正确，按照Value来对齐
NSDictionary *option2 = @{
 NSFontAttributeName: [NSFont fontWithName:@"Arial" size:12],
 NSForegroundColorAttributeName: fontColor
};
// 错误，每一个元素要么单独成为一行，要么全部写在一行内
NSDictionary *alsoWrong= @{ AKey : @"a",
              BLongerKey : @"b" };
// 错误，在冒号前只能有一个空格，冒号后才可以考虑按照Value对齐
NSDictionary *stillWrong = @{
 AKey      	: @"b",
 BLongerKey : @"c",
};

3、使用带有@符号的语法糖来生成 NSNumber 对象能使代码更简洁：
NSNumber *fortyTwo = @42;
NSNumber *piOverTwo = @(M_PI / 2);
enum {
 kMyEnum = 2;
};
NSNumber *myEnum = @(kMyEnum);
~~~

#### 协议（Protocols）

~~~objective-c
在书写协议的时候注意用<>括起来的协议和类型名之间是没有空格的，比如IPCConnectHandler()<IPCPreconnectorDelegate>,这个规则适用所有书写协议的地方，包括函数声明、类声明、实例变量等等：
@interface MyProtocoledClass : NSObject<NSWindowDelegate> {
 	@private
  id<MyFancyDelegate> _delegate;
}
- (void)setDelegate:(id<MyFancyDelegate>)aDelegate;
@end
~~~

#### Block

~~~objective-c
Block使用时一定要注意循环引用的问题。
__weak typeof(self) weakSelf = self; 
dispatch_block_t block =^{ 
	[weakSelf doSomething]; // weakSelf != nil 
	// preemption, weakSelf turned nil 
	[weakSelf doSomethingElse]; // weakSelf == nil 
};

如此在上面定义一个weakSelf,然后在block体里面使用该weakSelf就可以避免循环引用的问题.很不幸,还是有问题。问题是block体里面的self是weak的,所以就有可能在某一个时段self已经被释放了, 这时block体里面再使用self那就是nil, 不难想象崩溃就在眼前。解决方法很简单, 就是在block体内define一个strong的self, 然后执行的时候判断下self是否还在, 如果在就继续执行下面的操作, 否则return或抛出异常.
__weak typeof(self) weakSelf = self; 
myObj.myBlock =^{ 
	__strong typeof(self) strongSelf = weakSelf; 
	if (strongSelf) { 
		[strongSelf doSomething]; // strongSelf != nil 
		// preemption, strongSelf still not nil 
		[strongSelf doSomethingElse]; // strongSelf != nil 
	}
};

根据block的长度，有不同的书写规则：
较短的block可以写在一行内。
如果分行显示的话，block的右括号}应该和调用block那行代码的第一个非空字符对齐。
block内的代码采用4个空格的缩进。
如果block过于庞大，应该单独声明成一个变量来使用。
^和(之间，^和{之间都没有空格，参数列表的右括号)和{之间有一个空格。
// 较短的block写在一行内
[operation setCompletionBlock:^{ [self onOperationDone]; }];
// 分行书写的block，内部使用4空格缩进
[operation setCompletionBlock:^{
  [self.delegate newDataAvailable];
}];
// 使用C语言API调用的block遵循同样的书写规则
dispatch_async(_fileIOQueue, ^{
  NSString* path = [self sessionFilePath];
  if (path) {
   // ...
  }
});
// 较长的block关键字可以缩进后在新行书写，注意block的右括号'}'和调用block那行代码的第一个非空字符对齐
[[SessionService sharedService]
  loadWindowWithCompletionBlock:^(SessionWindow *window) {
    if (window) {
     	[self windowDidLoad:window];
    } else {
     	[self errorLoadingWindow];
    }
}];

// 较长的block参数列表同样可以缩进后在新行书写
[[SessionService sharedService]
		loadWindowWithCompletionBlock:
    ^(SessionWindow *window) {
      if (window) {
       	[self windowDidLoad:window];
      } else {
       	[self errorLoadingWindow];
      }
    }
];

// 庞大的block应该单独定义成变量使用
void (^largeBlock)(void) = ^{
  // ...
};
[_operationQueue addOperationWithBlock:largeBlock];

// 在一个调用中使用多个block，注意到他们不是像函数那样通过':'对齐的，而是同时进行了4个空格的缩进
[myObject doSomethingWith:arg1
  firstBlock:^(Foo *a) {
   // ...
}
secondBlock:^(Bar *b) {
    // ...
}];
~~~

#### 代码组织

~~~objective-c
1、函数长度（行数）不应超过2/3屏幕，禁止超过70行。
2、单个文件方法数不应超过30个
3、不要按类别排序（如把IBAction放在一块），应按任务把相关的组合在一起
4、禁止出现超过两层循环的代码，用函数或block替代。
// 糟糕的例子
- (Task *)creatTaskWithPath:(NSString *)path {
  Task *aTask;
  if ([path isURL]) {
    if ([fileManager isWritableFileAtPath:path]) {
      if (![taskManager hasTaskWithPath:path]) {
        aTask = [[Task alloc] initWithPath:path];
      } else {
        return nil;
      }
    } else {
      return nil;
    }
  } else {
    return nil;
  }
  return aTask;
}

// 改写的例子
- (Task *)creatTaskWithPath:(NSString *)path {
  if (![path isURL]) {
    return nil;
  }
  if (![fileManager isWritableFileAtPath:path]) {
    return nil;
  }
  if ([taskManager hasTaskWithPath:path]) {
    return nil;
  }
  Task *aTask = [[Task alloc] initWithPath:path];
  return aTask;
}
~~~

#### 编码建议

~~~objective-c
1、类变量若无特别需要尽量声明为@private
2、建议将所有NSObject的重载方法写在@implementation的顶端。例如init 、copyWithZone:以及dealloc
3、不需要把变量在init方法里初始化为0或者nil,这是多此一举
4、不要调用NSObject的new方法,也不要在子类中重载它。可以使用alloc和init方法来实例化对象（new是较为老式的写法，后来发现只有一个new不好使，才引入了alloc和init这种写法，保留new一是向后兼容，二是很多时候是一种更简单的写法。其实是一样的，new在内部调用的alloc和init. 显示调用总比隐式调用要好）
5、使用#import来引用OC头文件,使用#include来引用C/C++头文件
6、在init或者dealloc方法里不要使用.操作符来访问成员变量,因为在这些方法执行的过程中成员变量将处在不确定的状态
    - (instancetype)init { 
        self = [super init]; 
        if (self) { 
            _bar = [[NSMutableString alloc] init]; // good 
          	self.bar = [NSMutableString string]; // avoid 
        }
        return self; 
    }
    - (void)dealloc { 
      	_bar = nil; // good 
				self.bar = nil; // avoid 
        [super dealloc]; 
    }
7、在dealloc中按照声明顺序来析构变量
8、所有的NSString变量都要使用copy关键字，在传递或者赋值时应当保证是以复制（copy）的方式进行的，这样可以防止在不知情的情况下String的值被其它对象修改。
9、建议使用@property来声明变量。另外在ARC里不需要再写@ synthesize 了。也不需要再写一个跟property一样的带下划线的私有变量,ARC会自动生成一个下划线的变量的
10、使用@符号来定义一个NSNumber,这样更简单
    NSNumber *number1 = @1; //建议方式 
    NSNumber *number2 = [NSNumber numberWithInteger:2]; //过时的方式
11、不能引入warning。建议项目中开启Treat Warnings as Errors设置。 
    但是目前该选项对Swift不起作用,未来苹果完善Swift之后,出现warning会导致编译通不过。
    开发过程中注意Xcode控制台输出的警告信息,消除这些警告。目前来看AutoLayout相关的警告会比较多。
12、基于UITableView写页面,基于BaseUITableViewController和RefreshTableViewController作为VC的基类,保证交互的一致性。
13、多用block替代delegate,比如UITableViewCell的点击操作,block比delegate代码更为简洁直观。
14、除了CRUD里面的CUD、下拉刷新和上拉翻页等,绝大部分接口都应该使用缓存,提高用户体验。
15、尽量使用枚举类型要标识状态,提高代码可读性和可维护性。Swift支持字符串作为枚举类型的值,使用根据方便。
16、使用registerClass:forCellReuseIdentifier:+dequeueReusableCellWithIdentifier:forIndexPath:
17、接口做cell复用。cell可以很多时,一定要坚持做cell复用,提高效率。
18、版本系统API时,通用功能不要引入高版本API。
19、共有接口要设计的简洁，满足核心的功能需求就可以了。不要设计很少会被用到，但是参数极其复杂的API。如果要定义复杂的方法，使用类别或者类扩展。
20、每一个框架都会有一个和框架同名的头文件，它包含了框架内接口的所有引用，在使用框架的时候，应该直接引用这个根头文件，而不是其它子模块的头文件，即使是你只用到了其中的一小部分，编译器会自动完成优化的。
// 正确，引用根头文件
#import <Foundation/Foundation.h>
// 错误，不要单独引用框架内的其它头文件
#import <Foundation/NSArray.h>
#import <Foundation/NSString.h>
21、BOOL在Objective-C中被定义为signed char类型，这意味着一个BOOL类型的变量不仅仅可以表示YES(1)和NO(0)两个值，所以永远不要将BOOL类型变量直接和YES比较：
// 错误，无法确定|great|的值是否是YES(1)，不要将BOOL值直接与YES比较
BOOL great = [foo isGreat];
if (great == YES)
     // ...be great!
// 正确
BOOL great = [foo isGreat];
if (great)
     // ...be great!
同样的，也不要将其它类型的值作为BOOL来返回，这种情况下，BOOL变量只会取值的最后一个字节来赋值，这样很可能会取到0（NO）。但是，一些逻辑操作符比如&&,||,!的返回是可以直接赋给BOOL的：
// 错误，不要将其它类型转化为BOOL返回
- (BOOL)isBold {
   return [self fontTraits] & NSFontBoldTrait;
}
- (BOOL)isValid {
   return [self stringValue];
}
// 正确
- (BOOL)isBold {
   return ([self fontTraits] & NSFontBoldTrait) ? YES : NO;
}
// 正确，逻辑操作符可以直接转化为BOOL
- (BOOL)isValid {
   return [self stringValue] != nil;
}
- (BOOL)isEnabled {
   return [self isValid] && [self isBold];
}
另外BOOL类型可以和_Bool,bool相互转化，但是不能和Boolean转化。
在类或者Controller的生命周期结束时，往往需要做一些扫尾工作（释放资源，停止线程等），这些扫尾工作的释放顺序应当与它们的初始化或者定义的顺序保持一致。这样做是为了方便调试时寻找错误，也能防止遗漏。
23、因为在Objective-C中向nil对象发送命令是不会抛出异常或者导致崩溃的，只是完全的“什么都不干”，所以，只在程序中使用nil来做逻辑上的检查。另外，不要使用诸如nil == Object或者Object == nil的形式来判断。
// 正确，直接判断
if (!objc) {
   ...    
}
// 错误，不要使用nil == Object的形式
if (nil == objc) {
   ...    
}
24、不要用点分语法来调用方法，只用来访问属性。这样是为了防止代码可读性问题。
// 正确，使用点分语法访问属性
NSString *oldName = myObject.name;
myObject.name = @"Alice";
// 错误，不要用点分语法调用方法
NSArray *array = [NSArray arrayWithObject:@"hello"];
NSUInteger numberOfItems = array.count;
array.release;
25、一个类的Delegate对象通常还引用着类本身，这样很容易造成引用循环的问题，所以类的Delegate属性要设置为弱引用。
/** delegate */
@property (nonatomic, weak) id <IPCConnectHandlerDelegate> delegate;
26、如果可能，请尽量避免使用单例而是依赖注入。 然而，如果一定要用，请使用一个线程安全的模式来创建共享的实例。对于 GCD，用 dispatch_once() 函数就可以咯。
+ (instancetype)sharedInstance {
          static id sharedInstance = nil;
          static dispatch_once_t onceToken = 0;
          dispatch_once(&onceToken, ^{
               sharedInstance = [[self alloc] init];
          });
          return sharedInstance;
}
27、一个方法可能要求一些参数来满足特定的条件（比如不能为nil），在这种情况下最好使用 NSParameterAssert() 来断言条件是否成立或是抛出一个异常。
~~~

#### Designated和Secondary初始化方法

~~~objective-c
Objective-C 有指定初始化方法(designated initializer)和间接(secondary initializer)初始化方法的观念。 designated 初始化方法是提供所有的参数，
secondary 初始化方法是一个或多个，并且提供一个或者更多的默认参数来调用 designated 初始化的初始化方法。
@implementation ZOCEvent
// designated 初始化方法
- (instancetype)initWithTitle:(NSString *)title date:(NSDate *)date location:(CLLocation *)location {
          self = [super init];
          if (self) {
                _title = title;
                _date = date;
                _location = location;
          }
          return self;
}

// secondary 初始化方法，因为仅仅是调用类实现的 designated 初始化方法
- (instancetype)initWithTitle:(NSString *)title date:(NSDate *)date {
          return [self initWithTitle:title date:date location:nil];
}
 
- (instancetype)initWithTitle:(NSString *)title {
          return [self initWithTitle:title date:[NSDate date] location:nil];
}
@end
~~~

#### KVO

~~~objective-c
 KVO触发机制:
一个对象(观察者),检测另一个对象(被观察者)的某属性是否发生变化,若被监测的属性发生了更改,会触发观察者的一个方法(方法名固定,类似代理方法)
注册观察者(为被观察这指定观察者以及被观察者属性)
实现回调方法
触发回调方法
移除观察者
  
一般KVO奔溃的原因:
被观察的对象销毁掉了(被观察的对象是一个局部变量)
观察者被释放掉了,但是没有移除监听(如模态推出,push,pop等)
注册的监听没有移除掉,又重新注册了一遍监听
~~~

#### Categories分类

~~~objective-c
虽然我们知道这样写很丑, 但是我们应该要在我们的 category 方法前加上自己的小写前缀以及下划线，比如- (id)zoc_myCategoryMethod。因为如果在扩展的 category 或者其他 category 里面已经使用了同样的方法名，会导致不可预计的后果。实际被调用的是最后被加载的那个 category 中方法的实现。
** 例子 **
@interface NSDate (ZOCTimeExtensions)
- (NSString *)zoc_timeAgoShort;
@end
** 不要这样 **
@interface NSDate (ZOCTimeExtensions)
- (NSString *)timeAgoShort;
@end
分类可以用来在头文件中定义一组功能相似的方法。这是在 Apple的 Framework 也很常见的一个实践（下面例子的取自NSDate 头文件）。创建一组分类对以后的重构十分有帮助。一个类的接口增加的时候，可能意味着你的类做了太多事情，违背了类的单一功能原则。之前创造的方法分组可以用来更好地进行不同功能的表示，并且把类打破在更多自我包含的组成部分里。
@interface NSDate : NSObject <NSCopying, NSSecureCoding>
@property (readonly) NSTimeInterval timeIntervalSinceReferenceDate;
@end
@interface NSDate (NSDateCreation)
+ (instancetype)date;
+ (instancetype)dateWithTimeIntervalSinceNow:(NSTimeInterval)secs;
+ (instancetype)dateWithTimeIntervalSinceReferenceDate:(NSTimeInterval)ti;
+ (instancetype)dateWithTimeIntervalSince1970:(NSTimeInterval)secs;
+ (instancetype)dateWithTimeInterval:(NSTimeInterval)secsToBeAdded sinceDate:(NSDate *)date;
// ...
@end
~~~

#### 设计模式

~~~objective-c
ReactiveCocoa+MVVM
推荐使用ReactiveCocoa+MVVM设计代码架构，只有代码架构上清晰合理了上述规则才能锦上添花。
具体使用方法参考下列文章。
ReactiveCocoa 和 MVVM 入门（http://yulingtianxia.com/blog/2015/05/21/ReactiveCocoa-and-MVVM-an-Introduction/）
MVVM With ReactiveCocoa（http://blog.leichunfeng.com/blog/2016/02/27/mvvm-with-reactivecocoa/）
~~~