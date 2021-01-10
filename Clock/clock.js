window.onload = function () {
    // red 获取元素
    libox = document.querySelector('.num');
    numbox = document.querySelector('.face');

    // red 动态创建刻度
    for (let i = 1; i <= 60; i++) {
        // blue 定义每个刻度转动的角度
        var de = (i - 1) * 6
        let liNode = document.createElement('li')
        //  blue通过i来判断是否是5的倍数，是一个样式，不是另外一个样式。
        if (i == 1) {
            liNode.style.width = '2px'
            liNode.style.height = '15px'
            liNode.style.transform = 'rotate(0deg)'
            liNode.classList.add('big')
        } else if ((i - 1) % 5 == 0) {
            liNode.style.width = '2px';
            liNode.style.height = '15px';
            liNode.style.transform = `rotate(${de}deg)`;
            liNode.classList.add('big')
        } else {
            liNode.style.transform = `rotate(${de}deg)`;
            liNode.classList.add('little')
        }
        libox.appendChild(liNode)
    }
    // red 动态创建数字
    for (let i = 0; i < 12; i++) {
        var de = i * 30
        let liNode = document.createElement('li')
        if (i == 0) {
            liNode.innerHTML = '12'
            liNode.style.transform = 'rotate(0deg)'
        } else {
            liNode.innerHTML = i
            liNode.style.transform = `rotate(${de}deg)`
        }
        numbox.appendChild(liNode)
    }
// red 设置打开页面时的时间。
    var d = new Date();
    houernode = document.querySelector('.houer');
    minnode = document.querySelector('.min');
    secnode = document.querySelector('.sec');
    var s = d.getSeconds() * 6;
    var m = d.getMinutes() * 6;
    var h = d.getHours() * 30 + d.getMinutes() * 0.5;
    secnode.style.transform = `rotate(${s}deg)`;
    minnode.style.transform = `rotate(${m}deg)`;
    houernode.style.transform = `rotate(${h}deg)`;
    // red 获取刻度集合
    var lilist = document.querySelectorAll('body .clockbody .num > li')
// red 设置循环定时器，让表动起来。
    setInterval(function () {
        var d = new Date();
        secnode = document.querySelector('.sec')
        var s = d.getSeconds() * 6;
        if (s == 0) {
            houernode = document.querySelector('.houer');
            minnode = document.querySelector('.min');
            var m = d.getMinutes() * 6;
            var h = d.getHours() * 30 + d.getMinutes() * 0.5;
            minnode.style.transform = `rotate(${m}deg)`;
            houernode.style.transform = `rotate(${h}deg)`;
        }
        secnode.style.transform = `rotate(${s}deg)`;

        // red 让刻度盘的指针随着秒针变化
        for (var i = 0; i < lilist.length; i++) {
            // blue 获取每个刻度的transform属性中转动的角度，并转为数字。
            if (Number(lilist[i].style.transform.slice(7, -4)) === s) {
                lilist[i].classList.add('right')
            } else {
                lilist[i].classList.remove('right')
            }
        }
    }, 1000)

}