## 欢迎来到RANDOMCOLOR
randomcolor是[HCJDemo](https://github.com/zuogl/HCJDemo.git)的第一个demo
> HCJDemo是一个旨在利用纯粹的html、CSS、JS这三个前端基础工具，通过写一些比较有意思的东西以锻炼逻辑思维并提升对前端基础工具的理解运用的项目。HCJDemo项目地址:
[github](https://github.com/zuogl/HCJDemo.git)
[Gitee](https://gitee.com/xiao-zuo/hcjdemo.git)

### 一、demo效果
randomcolor的最终效果是当你按下键盘中a/s/d/f/g/h/j/k/l中的某个键时，屏幕上对应的元素会播放声音，并出现一种随机颜色。当鼠标滑过时也会出现同样的效果。当按下空格键时，所有的效果均消失。
### 二、解决思路
要想实现以上功能，需要做到以下几点：
- 因为是按下随机键，所以需要给全局对象`document`绑事件。
- 因为有按下不同的键，播放声音不同，所以需要监听onkeydown的事件对象的key属性。
- 为了播放不同的声音，需要将每个声音都引入到页面中去，并给每个声音定义一个`自定义属性`，用于记录其唯一编号。
- 为了实现按下时，声音持续播放，所以需要用到`audio.currentTime = 0; `
- 实现随机变色，需要在全局定义一个随机函数。

### 三、知识点梳理
#### 1. HTML
1. 自定义属性
HTML允许给标签自定义属性。一般自定义属性用于记录一些特点的值。在该demo中`data-key`就是一个自定义属性。
#### 2. CSS
1. **水平垂直居中**，在该demo中使用的是position+transform。
2. **弹性布局**，为了让9个子元素在页面中等间距分布，使用了最简单的弹性布局；给父盒子开启`display:flex`;并设置`justify-content: space-evenly;`
3. **过渡**，为了使元素在放大和缩小时都有过效果，给元素添加了0.5s的过渡属性。

#### 3. JS
1. `Math.random()`:返回一个0-1之间的随机小数，为了满足rgb中颜色的亮度范围0-255，所以给后边乘了256。
2. `toLowerCase`:将字符串字母转为小写。
3. **模版字符串**，ES6新增语法，用``表示，可以很方便的进行字符串的拼接、变量的使用，可以在拼接中使用换行。
4. **属性选择器**,下边的代码表示获取data-key值等于键盘按下的按键值对应的audio标签。
    ```js
    const audio = document.querySelector(`audio[data-key="${val}"]`);
    ```

5. 在dom中，所有被赋值的数据/属性都需要加引号，变量除外；在下边的代码中，rgb和左右括号都需要加引号。
    ```js
    this.style.background = 'rgb'+'('+col+')';
    ```
6. 音频播放
    ```js
        audio.currentTime = 0;  //设置音频每次都从0的位置开始播放
        audio.play();//播放音频
    ```
7. 只有当鼠标所在的元素有样式变化，其他的没有样式变化，利用`索引更新排他法`实现。
8. 如果觉得操作多个属性麻烦的话，可以将效果写入一个类中，然后用.classList.add和.classList.remove来控制类的添加和删除来实现样式的变化。
### 四、代码片段
#### html
```html
    <ul class="container">
        <li>A</li>
        <li>S</li>
        <li>D</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
    </ul>
    <audio data-key="a" src="./sounds/clap.wav"></audio>
    <audio data-key="s" src="./sounds/hihat.wav"></audio>
    <audio data-key="d" src="./sounds/kick.wav"></audio>
    <audio data-key="f" src="./sounds/openhat.wav"></audio>
    <audio data-key="g" src="./sounds/boom.wav"></audio>
    <audio data-key="h" src="./sounds/ride.wav"></audio>
    <audio data-key="j" src="./sounds/snare.wav"></audio>
    <audio data-key="k" src="./sounds/tom.wav"></audio>
    <audio data-key="l" src="./sounds/tink.wav"></audio>
```
#### CSS
```css
body {
  margin: 0;
  padding: 0;
  background-color: white;
}
body .container {
  padding: 0;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  height: 100px;
  display: flex;
  justify-content: space-evenly;
}
body .container > li {
  list-style: none;
  float: left;
  height: 100px;
  width: 100px;
  border: 1px solid red;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
  color: red;
  transition: 0.5s;
}

```

#### js
```js
window.onload = function(){

//red 定义随机颜色的函数
function randomColor() {
    let r = parseInt(Math.random()*256);
    let g = parseInt(Math.random()*256);
    let b = parseInt(Math.random()*256);
    return (r+','+g+','+b)
}
// red 获取li集合
var list = document.querySelectorAll('li')

//  red 效果实现

// green 点击版
// blue 设置初始索引值
var index = 0;
for(var i = 0;i <list.length;i++){
    // blue 给每一个元素发标签，让它们知道自己在队列中的位置。
    list[i].index = i
    list[i].onmouseover = function(e){
        const val = this.innerHTML.toLowerCase()
        // console.log(val);
        // 获取data-key等于按下键的audio标签
        const audio = document.querySelector(`audio[data-key="${val}"]`);
        // 调用随机函数，返回一个值
       let col = randomColor()
    //  blue  col是变量，不需要用引号引起来，括号和rgb都需要用引号引起来。
        this.style.background = 'rgb'+'('+col+')';
        this.style.transform = 'scale(1.5)'
        // this.classList.add('play')//添加类
        list[index].style.background = null
        list[index].style.transform = 'scale(1)';
        // list[index].classList.remove('play')
        // 音频播放
        audio.currentTime = 0;  
        audio.play();
        // 索引更新
        index = this.index
    }
}

//  green 键盘版
document.onkeydown = function(e){
    // console.log(e)
    const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    for(let i=0;i<list.length;i++){
        if(list[i].innerHTML === e.key.toUpperCase()){
            let col = randomColor()
            list[i].style.background = 'rgb'+'('+col+')';
            list[i].style.transform = 'scale(1.5)';
            audio.currentTime = 0;  
            audio.play();
           
        }else{
        // blue 通过if判断来实现，如果按键匹配就添加效果，如果按键不匹配，就复原效果
            list[i].style.background = '#fff';
            list[i].style.transform = 'scale(1)'
        }
    }

    // green 当按键是空格键时，清除所有效果，回复默认效果。
    if(e.key === ""){
        for(let i =0; i<list.length;i++){
            list[i].style.background = '#fff';
            list[i].style.transform = 'scale(1)'    
        }
    }
}

}
```





