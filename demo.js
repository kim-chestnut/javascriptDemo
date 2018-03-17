//1.动态生成白块   使其中一个白块的颜色改变。
// 2.白块向下移动  
// 3.点击带有颜色的白块---》当一行白块达到最低端----》删除最下面一行白块
// 4.没有点击到带有颜色的快或者带有颜色的到达最低端最下面一行---》游戏结束---》弹窗
init();
function init(){
    this.main = document.getElementsByClassName('main')[0];      //访问Dom元素，设置全局变量
    this.start = document.getElementsByClassName('start')[0];
    this.gameOver = document.getElementsByClassName('gameover')[0];
    this.btn = document.getElementsByClassName('btn')[0];
    this.score = document.getElementById('score');
    this.startTop = document.getElementsByClassName('top')[0];
    this.num = 0;
    this.flag = true;
    this.speed = 5;
    this.timer;
}
function generate(){       //生成白块
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.className = "row";
    for(var i = 0 ; i < 4 ; i ++){
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    if(main.children.length == 0){
        main.appendChild(oDiv);
    }
    else{
        main.insertBefore(oDiv, main.children[0]);
    }
    var r1 = Math.floor(Math.random() * 150);
    var r2 = Math.floor(Math.random() * 150);
    var r3 = Math.floor(Math.random() * 150);
    oDiv.children[index].style.backgroundColor = 'rgb('+ r1 + ',' + r2 + ',' + r3 + ')';
    oDiv.children[index].setAttribute('class', 'i');
}
function move(){     //整体移动
        timer = setInterval(function(){
        main.style.top = parseInt(getStyle(main,'top')) + speed + 'px';
        if (parseInt(getStyle(main,'top')) >= 0){
            generate();
            main.style.top = '-150px';
        }
        var len = main.children.length;
        if(len == 6){
            if(flag){
                for(var i = 0; i < 4 ; i ++){
                    if(main.children[len - 1].children[i].className == 'i'){
                        main.style.top = "-150px";
                        gameover();
                        start.style.display = 'block';                         
                        clearInterval(timer);
                        falg = false;
                    }
                }
                main.children[len - 1].remove();
            }
        }
    },20)
}
bindEvent();
function bindEvent(){        //绑定点击事件，事件委托
    getEvent(main,'click',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(flag){
            if (target.className == 'i') {
                target.style.backgroundColor = "#bbb";
                target.className = "";
                num++;
            } else {
                console.log('a');
                target.style.top = '0px';
                gameover();
                start.style.display = 'block';
                clearInterval(timer);
                flag = false;
            }
        }
        if(num % 10 == 0){
            speed ++ ;
        }
    })
}
function stratGame(){      //开始游戏设置
    function startHandle(){
        start.style.display = 'none';
        startTop.style.display = 'none';
        main.innerHTML = "";
        move();
    }
    getEvent(start,'click',startHandle);
}
stratGame();
function gameover(){      // 结束游戏设置
    gameOver.style.display = 'block';
    score.innerHTML = num;
    closeBtn();
}
function closeBtn(){        //点击关闭按钮
    getEvent(btn,'click',function(){
        gameOver.style.display = 'none';
        startTop.style.display = 'block';
        flag = true;
        num = 0;
        speed = 5;
    })
}
//脚本化css兼容性处理
function getStyle(elem,temp){
    if(getComputedStyle){
        return getComputedStyle(elem,null)[temp];
    } else{
        return elem.currentStyle[temp];
    }
}
// 绑定事件兼容性处理
function getEvent(elem,type,handle){
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on' + type,function(){
            handle.call(elem);
        })
    }else{
        elem['on' + type] = handle; 
    }
}
