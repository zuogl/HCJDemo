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

inputs.forEach(item => {
    item.addEventListener('change',handleChange)
    item.addEventListener('mousemove',handleChange)
});

}



