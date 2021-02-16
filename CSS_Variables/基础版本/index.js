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



