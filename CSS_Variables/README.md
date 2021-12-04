## 欢迎来到CSS_Variables
CSS_Variables是[HCJDemo](https://github.com/zuogl/HCJDemo.git)的第三个demo
> HCJDemo是一个旨在利用纯粹的html、CSS、JS这三个前端基础工具，通过写一些比较有意思的东西以锻炼逻辑思维并提升对前端基础工具的理解运用的项目。HCJDemo项目地址:
[github](https://github.com/zuogl/HCJDemo.git)
[Gitee](https://gitee.com/xiao-zuo/hcjdemo.git)

### 一、demo效果
CSS_Variables的最终效果是通过滑动滑动条来改变图片及展示区域对应的属性。
![](../mdImage/CSS_Variables.gif)

### 二、解决思路
实时获取滑动条上的值，并将其赋值给对应的dom元素。

### 三、知识点梳理及代码展示
#### 1. 基础版本
##### 1. HTML
- 滑动条
range是input的type属性中的一个值。这个值表示范围，也可以叫做滑动条。其具有几个常用的自带属性。
    - `min`表示你要表示的范围的最小值；
    - `max`表示范围的最大值；
    - `step`表示你期望滑动的最小值是多少，
    - `value`表示初始值。
- 颜色选择器
在input标签中，当type属性的值为color时，表示是一个颜色选择器。我们可以通过`value`来设置初始的颜色。
```html
    <h2>Update <span>CSS</span> Variables with <span>JS</span></h2>
    <div class="control">
        <label for="Sapcing"> sapcing:</label>
        <input type="range" name="Sapcing"  min="10" max="200" step="1" value="10">
        <label for="Blur"> Blur:</label>
        <input type="range" name="Blur"  min="0" max="25" step="1" value="0">
        <label for="BaseColor"> BaseColor:</label>
        <input type="color" name="BaseColor" value="#FBF9F9">
    </div>
    <div class="result">
        <div>
            {Sapcing:<span id="Sapcing">10px</span>}
        </div>
        <div>
            {Blur:<span id="Blur">6px</span>}
        </div>
        <div>
            {BaseColor:<span id="BaseColor" >#FBF9F9</span>}
        </div>
    </div>
    <img src="./img01.jpg" >
```

##### 2. CSS
无
##### 3. JS
```js
window.onload = function(){
    // 获取对应的节点
const inputs = document.querySelectorAll('input')
const h2 = document.getElementsByTagName('h2')
const Sapcing = document.querySelector('#Sapcing')
const Blur = document.querySelector('#Blur')
const BaseColor = document.querySelector('#BaseColor')
const img = document.querySelector('img')
const res = document.querySelectorAll('.result div')

// 绑定事件
inputs[0].onmousemove = function(){
    Sapcing.innerHTML = `${this.value}px`
    const value = BaseColor.innerHTML
    img.style.border=`${this.value}px solid ${value}`

}

inputs[1].onmousemove = function(){
    Blur.innerHTML = `${this.value}px`
    img.style.filter=`blur(${this.value}px)`
}

inputs[2].onchange = function(){
    BaseColor.innerHTML = `${this.value}`
    res.forEach(item =>{
        item.style.color = `${this.value}`
    })
    img.style.border=`solid ${this.value}`
}

}
```

#### 2. css变量版本

##### 1. HTML
同基础版本
```html
<h2>Update <span>CSS</span> Variables with <span>JS</span></h2>
    <div class="control">
        <label for="Sapcing"> sapcing:</label>
        <input type="range" name="Sapcing"  min="10" max="200" step="1" value="10" unit='px' >
        <label for="Blur"> Blur:</label>
        <input type="range" name="Blur"  min="0" max="25" step="1" value="0" unit='px'>
        <label for="BaseColor"> BaseColor:</label>
        <input type="color" name="BaseColor" value="#fbf9f9">
    </div>
    <div class="result">
        <div>
            {Sapcing:<span id="span_Sapcing">10px</span>}
        </div>
        <div>
            {Blur:<span id="span_Blur">0px</span>}
        </div>
        <div>
            {BaseColor:<span id="span_BaseColor" >#fbf9f9</span>}
        </div>
    </div>
    <img src="./img01.jpg" >
```
##### 2. CSS
在这个版本中用到了[CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)。
CSS变量就像js中的变量一样是可以复用的。也需要事先定义，然后使用。
- CSS变量的定义
    - 需要用两个减号`--`开头,变量的名字原则上可以随意取，`--base_Color`，`--blur`,`--Spacing2`等等都是可以的。但是建议参照js中的命名规则。；另外，CSS变量的是严格区分大小写的。`--base_Color`和`--Base_color`是两个CSS变量。
    - 我们一般将CSS变量的定义放置在文档的根伪类`:root`下（html标签）,这样我们在文档的任何地方都可以获取该变量
```css
    :root{
        --Sapcing:10px;
        --Blur:0px;
        --BaseColor:#fbf9f9;
    }
```
- CSS变量的使用
    - 在需要使用的地方用`var()`方法读取对应的值。
```css
    padding: var(--Sapcing);
    background:var(--BaseColor) ;
    filter: blur(var(--Blur));
```
##### 3. JS
- getAttribute()可以用于在DOM中获取元素的自定义属性的值。
- 模版字符串
模版字符串可以很方便的实现字符串和变量的拼接，可以在内部实现换行等操作。具体用法请看
[模版字符串](https://gitee.com/xiao-zuo/my-web-notes.git) >>>ES6&&Node.js>>>md>>>模版字符串
- document.documentElement表示HTML标签
```js
window.onload = function(){
    // 获取所有的输入节点
const inputs = document.querySelectorAll('.control input')

// 定义一个处理滚动条及color输入变化的函数
function handleChange() {
    // 设置单位，如果对应的输入节点中存在单位属性，就获取其值，如果没有单位就用空代替
    const unit = this.getAttribute('unit') || ''
    
    // 将对应的输入项的值赋值给自定义的css变量。`--${this.name}`分别为--Sapcing,--Blur,--BaseColor
    document.documentElement.style.setProperty(`--${this.name}`,this.value + unit)
// 将对应的输入值赋值给对应的展示节点作为内容
    document.getElementById(`span_${this.name}`).innerHTML = this.value + unit;
}

// 给所有的input绑定事件。
inputs.forEach(item => {
    item.addEventListener('change',handleChange)
    item.addEventListener('mousemove',handleChange)
});

}
```









