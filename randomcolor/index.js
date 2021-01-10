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