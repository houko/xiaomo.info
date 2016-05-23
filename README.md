[![EventUtil](http://static.xiaomo.info/images/avatar.png)](https://github.com/qq83387856)


[![NPM version][npm-image]][npm-url][![Downloads][downloads-image]][downloads-url]

[![NPM][nodei-image]][nodei-url]

[documentation](https://npm.taobao.org/package/EventUtil)


## 前言：什么是EventUtil？  

在JavaScript中，DOM0级、DOM2级与旧版本IE(8-)为对象添加事件的方法不同
为了以跨浏览器的方式处理事件，需要编写一段“通用代码”，即跨浏览器的事件处理程序
习惯上，这个方法属于一个名为EventUtil的对象
编写并使用该对象后，可保证处理事件的代码能在大多数浏览器下一致的运行
本文将围绕着EventUtil对象展开，并提供该通用对象代码以作参考分享
文章主要内容参考书籍为《JavaScript高级程序设计》（[美]Nicholas C.Zakas）
若有纰漏，欢迎您留言指正

## 使用说明

下载   
`npm install --save EventUtil`或者使用阿里数据源`cnpm install --save EventUtil`   

使用    
* es5下  
 `var EventUtil = require('EventUtil');`   
* es6下   
 `import EventUtil form 'EventUtil';`   

## EventUtil对象全见  
以下EventUtil对象代码亲测可用，并包含详细注释

[点击该对象中每一个方法名（绿色字体）可直接跳转到本文中介绍该方法的部分]


```
var EventUtil={
	
   addHandler:function(element,type,handler){ //添加事件
      if(element.addEventListener){ 
         element.addEventListener(type,handler,false);  //使用DOM2级方法添加事件
      }else if(element.attachEvent){                    //使用IE方法添加事件
         element.attachEvent("on"+type,handler);
      }else{
         element["on"+type]=handler;          //使用DOM0级方法添加事件
      }
   },  

   removeHandler:function(element,type,handler){  //取消事件
      if(element.removeEventListener){
         element.removeEventListener(type,handler,false);
      }else if(element.detachEvent){
         element.detachEvent("on"+type,handler);
      }else{
         element["on"+type]=null;
      }
   },

   getEvent:function(event){  //使用这个方法跨浏览器取得event对象
      return event?event:window.event;
   },
	
   getTarget:function(event){  //返回事件的实际目标
      return event.target||event.srcElement;
   },
	
   preventDefault:function(event){   //阻止事件的默认行为
      if(event.preventDefault){
         event.preventDefault(); 
      }else{
         event.returnValue=false;
      }
   },

   stopPropagation:function(event){  //立即停止事件在DOM中的传播
                                     //避免触发注册在document.body上面的事件处理程序
      if(event.stopPropagation){
         event.stopPropagation();
      }else{
         event.cancelBubble=true;
      }
   },
		
   getRelatedTarget:function(event){  //获取mouseover和mouseout相关元素
      if(event.relatedTarget){
         return event.relatedTarget;
      }else if(event.toElement){      //兼容IE8-
         return event.toElement;
      }else if(event.formElement){
         return event.formElement;
      }else{
         return null;
      }
   },
		
   getButton:function(event){    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
      if(document.implementation.hasFeature("MouseEvents","2.0")){
         return event.button;
      }else{
         switch(event.button){   //将IE模型下的button属性映射为DOM模型下的button属性
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
               return 0;  //按下的是鼠标主按钮（一般是左键）
            case 2:
            case 6:
               return 2;  //按下的是中间的鼠标按钮
            case 4:
               return 1;  //鼠标次按钮（一般是右键）
         }
      }
   },
		
   getWheelDelta:function(event){ //获取表示鼠标滚轮滚动方向的数值
      if(event.wheelDelta){
         return event.wheelDelta;
      }else{
         return -event.detail*40;
      }
   },
		
   getCharCode:function(event){   //以跨浏览器取得相同的字符编码，需在keypress事件中使用
      if(typeof event.charCode=="number"){
         return event.charCode;
      }else{
         return event.keyCode;
      }
   }
		
};

```

>事实上，EventUtil是为了平衡不同浏览器间实现事件的差异或事件方法的差异而存在的
 下文将详细介绍这些差异和使用EventUtil的各种方法
 
 ### 一、 addHandler方法
 这是EventUtil中最常用的方法，它的作用是为对象添加事件并保证兼容性
 
 在DOM0级事件处理程序（下文均简称“DOM0级”）中
 
 每个元素（包括windows和document）都有自己的事件处理程序属性（通常全部小写）
 
 如常见的onload、onclick等
 
 以Click事件为例（下同），DOM0级通常如下指定事件处理程序
     
```
          var btn=document.getElementById("myBtn");
             btn.onclick=function(){ //指定事件处理程序
                alert(this.id);      //"myBtn"
             };
```
 
 在DOM2级事件处理程序（下文均简称“DOM2级”）中
 
 指定事件处理程序的方法为addEventListener( )
 
 它接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值（大多数情况下是false）
 
 （布尔值表示是在捕获阶段(true)还是冒泡阶段(false)调用事件处理程序）
 
 DOM2级通常如下指定事件处理程序
 
```
      var btn=document.getElementById("myBtn");
        //在外部定义好函数再传给addEventListener()，这样才可以通过removeEventListener()移除
        var handler=function(){ 
           alert(this.id);
        };
        btn.addEventListener("click",handler,false);
```
 
在旧版本IE（代表IE8-，下文均简称“IE”）中

指定事件处理程序的方法为attachEvent( )

它接受两个参数：事件处理程序名称与事件处理程序函数

IE中通常如下指定事件处理程序

```
var btn=document.getElementById("myBtn");
var handler=function(){
   alert("Clicked");
};
//注意：第一个参数是"onclick"，而非DOM0的addEventListener()方法中的"click"
btn.attachEvent("onclick",handler);
```

由上可见，DOM0级、DOM2级和IE中指定事件方法有很大不同

EventUtil对象中的addHandler方法正是为了处理这些差异而存在

在添加了EventUtil（指上文“EventUtil对象全见”中的代码，下同）后，可以如下所示为对象指定事件处理程序

```
var btn=document.getElementById("myBtn");
var handler=function(){
   alert("Clicked!");
};
EventUtil.addHandler(btn,"click",handler);  //调用已定义的EventUtil对象
```

就像这样，使用addHandler方法指定事件处理程序

即可兼容支持DOM0级、DOM2级的浏览器或IE浏览器

 ### 二、 removeHandler方法

同样的，在DOM0级、DOM2级与IE中，移除事件的方法是不同的

在DOM0级中，在不再需要某对象的事件处理程序时（如页面销毁前），可以像下面这样简单的移除事件处理程序

`btn.onclick=null; `

在DOM2级中，删除事件处理程序需要使用removeEventListener( )方法，如下所示

```
//这里的handler应与使用addEventListener指定事件处理函数时所用的外部函数相同
btn.removeEventListener("click",handler,false);
```


而在IE中，删除事件则需使用detachEvent( )方法

```
btn.detachEvent("onclick",handler); 
```

因为这些差异的存在，才令EventUtil中有了removeHandler方法

在添加了EventUtil后，可以如下所示使用removeHandler方法方便地删除对象事件处理程序

```
//同样的，这里的handler应与使用addHandler指定事件处理函数时所用的外部函数相同
EventUtil.removeHandler(btn,"click",hanlder);
```


三、 event对象与getEvent方法

你可能已经发现了，在EventUtil中，很多方法的参数都是event

这个event其实是事件对象

兼容DOM（无论是DOM0级还是DOM2级）的浏览器会将一个event对象传入到事件处理程序中

这个event对象支持许多方法，下表列出了一些常用的方法以供参考


| 属性/方法        | 类型           | 读/写	  |说明|
| :-----------: |:--------:  | :---:|:---:|
|currentTarget| Element| 只读	|其事件处理程序当前正在处理事件的那个元素|
| preventDefault( )| Function |  只读	|取消事件的默认行为|
| stopPropagation( )| Function	|  只读	|取消事件的进一步捕获或冒泡|
| target| Element     |只读		|事件的实际（真正）目标|
| type|String   |   只读|被触发的事件的类型|


在兼容DOM的浏览器中，event对象可以如下面这个例子这样使用

```
    var btn=document.getElementById("myBtn");
    var handler=function(event){
       switch(event.type){      //使用event.type检测事件类型
          case "click":         //若是Click事件
             alert("Clicked");
             break;
          case: "mouseover":    //若是Mouseover事件
             //使用event.target获取事件目标，并更改目标样式背景颜色
             event.target.style.backgroundColor="red";
             break;
          case: "mouseout":     //若是Mouseout事件
             event.target.style.backgroundColor="";
             break;
       }
    };
    btn.onclick=handler;  //使用DOM0级为对象添加事件处理函数
    btn.onmouseover=handler;
    btn.onmouseout=handler;
```

需要强调的是，以上使用event事件的方法仅适用于兼容DOM的浏览器

在IE中则有所不同

在IE中，使用DOM0级添加事件处理程序时，event对象作为window对象的一个属性存在，如下例子所示


```
    btn.onclick=function(){
       var event=window.event;
       alert(event.type);  //"click"
    };
```

神奇的是，如果事件处理程序是使用attachEvent( )添加的，则又可以像在支持DOM的浏览器中一样

event对象又可作为参数传入事件处理程序函数中，如下例子所示

```
btn.attachEvent("onclick",function(event){
   alert(event.type); //"click"
});
```

而且，更神奇的是，在IE中，event对象的一些属性/方法还跟其它支持DOM的浏览器中不同，如下表


| 属性/方法        | 类型           | 读/写	  |说明|
| :-----------: |:--------:  | :---:|:---:|
|cancelBubble| Boolean| 读/写	|其事件处理程序当前正在处理事件的那个元素|
| returnValue| Boolean |   读/写	|默认值为true，将其设置为false就可以取消事件的默认行为（与DOM中的preventDefault( )方法的作用相同）|
| srcElement| Element	|  只读	|事件的目标（与DOM中的target属性相同）|
| type| String     |只读		|被触发的事件类型|


正是因为这些差异的存在，使得EventUtil中的getEvent方法应运而生

在添加了EventUtil后，可以如下“重点语句”所示获取event对象而无需担心上述差异导致的兼容问题

```
    var btn=document.getElementById("myBtn");
    var handler=function(event){
       event=EventUtil.getEvent(event); //重点语句
    };
    EventUtil.addHandler(btn,"click",handler); 
```


这样，就解决了event对象获取方式不同的问题

至于event对象的属性/方法差异，下文还会介绍其它方法进行处理



四、 target对象与getTarget方法
在上一部分（“event对象与getEvent方法”）的介绍中，通过表格你可能已经发现

在IE中和其它兼容DOM的浏览器中，获取事件目标（target）的方法不同

在IE中，获取事件目标对象的方法为event.srcElement

而在其它兼容DOM的浏览器中，获取事件目标对象的方法却为event.target

getTarget方法正是为了处理这个差异而存在

在添加了EventUtil后，可以如下“重点语句”所示获取事件的目标（target）对象而无需担心上述差异导致的兼容问题


```
    var btn=document.getElementById("myBtn");
    var handler=function(event){
       event=EventUtil.getEvent(event); 
       var target=EventUtil.getTarget(event); //重点语句
    };
    EventUtil.addHandler(btn,"click",handler); 
```

五、 preventDefault方法

在其它兼容DOM的浏览器中，阻止特定事件的默认行为只需使用event对象自带的preventDefault( )方法，如下所示

```
var link=document.getElementById("myLink");
link.onclick=function(event){
   event.preventDefault(); //DOM0级或DOM2级阻止事件默认行为的方法
};
```


而在IE中，则需赋予event.returnValue的值为false才能阻止特定事件的默认行为

```
link.attachEvent("onclick",function(event){
   event.returnValue=false; //IE中阻止事件默认行为的方法
});
```

故在EventUtil中，存在一个preventDefault方法，用于统一上述差异

在添加了EventUtil后，可以如下“重点语句”所示阻止特定事件的默认行为而无需担心上述差异导致的兼容问题


```
    var link=document.getElementById("myLink");
    var handler=function(event){
       event=EventUtil.getEvent(event);
       EventUtil.preventDefault(event); //重点语句
    };
    EventUtil.addHandler(link,"click",handler);
```


六、. stopPropagation方法

有时候，我们需要取消事件的进一步捕获或冒泡，即停止事件在DOM层次中传播

兼容DOM的浏览器可以通过使用event对象自带的stopPropagation( )方法做到这一点
    
    ```
        var link=document.getElementById("myLink");
        link.onclick=function(event){
           event.stopPropagation(); //DOM0级或DOM2级取消事件的进一步捕获或冒泡的方法
        };
    ```
    
而在IE中，则需赋予event.cancelBubble的值为true

```
    link.attachEvent("onclick",function(event){
       event.cancelBubble=true; //IE中取消事件的进一步冒泡的方法
    });
```

EventUtil中的stopPropagation( )方法可以统一上述差异

在添加了EventUtil后，可以如下“重点语句”所示取消事件的进一步捕获或冒泡而无需担心差异导致的兼容问题

```
    var link=document.getElementById("myLink");
    var handler=function(event){
       event=EventUtil.getEvent(event);
       EventUtil.stopPropagation(event); //重点语句
    };
    EventUtil.addHandler(link,"click",handler);
```

七、 “相关元素”与getRelatedTarget方法

mouseover与mouseout有“主目标（主元素）”与“相关元素”的概念

因为在发生mouseover或mouseout事件时，还会涉及到其它元素

这两个事件都会涉及把鼠指针从一个元素（相关元素）移到另一个元素（主目标）内

具体点说

对mouseover事件而言，事件的主目标是获得光标的元素，而相关元素是那个失去光标的元素

对mouseout事件而言，事件的主目标是失去光标的元素，而相关元素是那个获得光标的元素

DOM通过event对象的relatedTarget属性提供了相关元素的信息

但IE8及之前的版本不支持relatedTarget属性，不过提供了其它类似属性支持

在mouseover事件触发时，IE的formElement属性中保存了相关元素

在mouseout事件触发时，IE的toElement属性中保存了相关元素

EventUtil中的getRelatedTarget方法正是为了平衡这些差异而存在

在添加了EventUtil后，可以像下面示例“重点语句”一样使用getRelatedTarget方法

```
    var div=document.getElementById("myDiv");
    EventUtil.addHandler(div,"mouseout",function(event){
       event=EventUtil.getEvent(event);
       var target=EventUtil.getTarget(event);
       var relatedTarget=EventUtil.getRelatedTarget(event); //重点语句
       alert("鼠标离开了"+target.tagName+"元素而进入了"+relatedTarget.tagName+"元素");
    });
```

八、 getButton方法

我们知道，只有在鼠标主按钮被单击（或键盘回车键被按下、触摸屏被单点击中）时才会触发click事件

但对于mousedown和mouseup事件来说，鼠标上的任意按钮都可以触发它

有时，我们可能需要知道用户按下了哪个鼠标按钮

DOM的event.button属性可以做到这一点，这个属性可能有3个值

0表示主鼠标按钮（通常是左键）、1表示鼠标滚轮按钮、2表示鼠标右键

虽然IE的event对象也提供了button属性

但遗憾的是，IE的button属性与DOM的button属性有很大差异

而且不被其它浏览器支持，实用性很低，在此不予赘述

getButton方法的作用是，让所有浏览器的event.button表现与DOM相同

在添加了EventUtil后，可以像下面示例“重点语句”一样使用getButton方法而无需考虑IE中的差异

```
    var div=document.getElementById("myDiv");
    EventUtil.addHandler(div,"mousedown",function(event){ //监控按下div的是哪个按钮
       event=EventUtil.getEvent(event);
       alert(EventUtil.getButton(event));  //重点语句，弹出框显示按下哪个鼠标键的代号（0、1或2）
    });
    //同理，若事件是mouseup，则botton值表示释放的是哪个按钮
```


九、 getWheelDelta方法

有时，为了让页面达到某些特殊效果，我们需要监视用户的鼠标滚轮操作

这一次，“与众不同”的是Firefox，而不是旧版本的IE

所有浏览器（包括IE6，除了Firefox）均支持鼠标滚轮事件mousewheel

而Firefox却是通过DOMMouseScroll事件实现类似功能

事件名的差异无法通过EventUtil改变

但关键是，这个事件表示鼠标滚轮滚动方向的方法，Firefox与其它浏览器也有差异

差异的本身已不是重点，重点是EventUtil的getWheelDelta方法可以很好的解决它们的差异

在添加了EventUtil后，可以像下面示例“重点语句”一样使用getWheelDelta方法而无需考虑FIrefox中的差异

```
    function handleMouseWheel(event){
       event=EventUtil.getEvent(event);
       var delta=EventUtil.getWheelDelta(event);  //重点语句，delta是表示鼠标滚轮滚动方向的数值
       alert(delta);
    }
    EventUtil.addHandler(document,"mousewheel",handleMouseWheel);      //非Firefox
    EventUtil.addHandler(document,"DOMMouseScroll",handleMouseWheel);  //Firefox
```


多数情况下，我们只需关心如上例中通过getWheelDelta方法获得的delta数值的正负

当用户向前滚动鼠标滚轮时，delta的数值为正，反之为负

滚轮滚动越多，delta数值的绝对值越大，且均是120的倍数


10、 getCharCode方法

在所有浏览器中，按下能够插入或删除的字符的按键都会触发keypress事件

但IE8-及Opera取得字符编码（ASCII码）的方式与其它浏览器是不同的

为了解决这一差异，在EventUtil中存在getCharCode方法

在添加了EventUtil后，可以像下面示例“重点语句”一样使用getCharCode方法来获取统一的字符编码

```
var textbox=document.getElementById("myText");
EventUtil.addHandler(textbox,"keypress",function(event){
   event=EventUtil.getEvent(event);
   alert(EventUtil.getCharCode(event)); //重点语句，弹出窗口中显示按下按键代表字符的ASCII码
});
```

[travis-url]: https://travis-ci.org/EventUtil/EventUtil
[travis-image]: https://img.shields.io/travis/EventUtil/EventUtil.svg
[appveyor-url]: https://ci.appveyor.com/project/sokra/EventUtil/branch/master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/EventUtil/EventUtil?svg=true
[coveralls-url]: https://coveralls.io/r/EventUtil/EventUtil/
[coveralls-image]: https://img.shields.io/coveralls/EventUtil/EventUtil.svg
[npm-url]: https://www.npmjs.com/package/EventUtil
[npm-image]: https://img.shields.io/npm/v/EventUtil.svg
[downloads-image]: https://img.shields.io/npm/dm/EventUtil.svg
[downloads-url]: https://www.npmjs.com/package/EventUtil
[david-url]: https://david-dm.org/EventUtil/EventUtil
[david-image]: https://img.shields.io/david/EventUtil/EventUtil.svg
[david-dev-url]: https://david-dm.org/EventUtil/EventUtil#info=devDependencies
[david-dev-image]: https://david-dm.org/EventUtil/EventUtil/dev-status.svg
[david-peer-url]: https://david-dm.org/EventUtil/EventUtil#info=peerDependencies
[david-peer-image]: https://david-dm.org/EventUtil/EventUtil/peer-status.svg
[nodei-image]: https://nodei.co/npm/EventUtil.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://www.npmjs.com/package/EventUtil
[donate-url]: http://sokra.github.io/
[donate-image]: https://img.shields.io/badge/donate-sokra-brightgreen.svg
[gratipay-url]: https://gratipay.com/EventUtil/
[gratipay-image]: https://img.shields.io/gratipay/EventUtil.svg
[gitter-url]: https://gitter.im/EventUtil/EventUtil
[gitter-image]: https://img.shields.io/badge/gitter-EventUtil%2FEventUtil-brightgreen.svg
[badginator-image]: https://badginator.herokuapp.com/EventUtil/EventUtil.svg
[badginator-url]: https://github.com/defunctzombie/badginator

> 摘自 [黄映焜的博客园](http://www.cnblogs.com/hykun/p/EventUtil.html)