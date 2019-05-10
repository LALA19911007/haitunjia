function Banner(){
    // 1.选元素
    this.img = document.querySelectorAll("#banner .box a");
    this.left = document.getElementById("left");
    this.right = document.getElementById("right");

    this.index = 0;
    this.iPrev = this.img.length-1;

    this.addEvent()
}
Banner.prototype.addEvent = function(){
    var that = this;
    this.left.onclick = function(){
        that.changeIndex(1)
    }
    this.right.onclick = function(){
        that.changeIndex(2)
    }
}
Banner.prototype.changeIndex = function(type){
    if(type == 1){
        if(this.index == 0){
            this.index = this.img.length-1;
            // WU3-2.
            this.iPrev = 0;
        }else{
            this.index--;
            // WU4-2.
            this.iPrev = this.index + 1;
        }
        this.display(-1);
    }else{
        if(this.index == this.img.length-1){
            this.index = 0;
            this.iPrev = this.img.length-1
        }else{
            this.index++;
            this.iPrev = this.index - 1;
        }
        this.display(1);
    }
}
Banner.prototype.display = function(type){
    this.img[this.iPrev].style.left = 0;
    move(this.img[this.iPrev],{left:-this.img[0].offsetWidth * type})

    // 从哪进
    this.img[this.index].style.left = this.img[0].offsetWidth * type + "px";
    // 进到哪
    move(this.img[this.index],{left:0})
}

new Banner();




function Sanji(){
    this.allp = document.getElementsByClassName("all_p")[0];
    this.erji = document.getElementsByClassName("erji")[0];
    this.all = document.getElementsByClassName("all")[0];
    this.oli = document.querySelectorAll("nav .all .erji li");
    this.op = document.querySelectorAll("nav .all .sanji p");
    this.sanji = document.getElementsByClassName("sanji")[0];
    this.caidan = document.getElementsByClassName("caidan")[0];

    this.addEvent()
}
Sanji.prototype.addEvent = function(){
    var that = this;
    this.all.onmouseover = function(){
        that.erji.style.display="block";
    }
    this.erji.onmouseover = function(){
        that.sanji.style.display="block";
    }
    this.allp.onmouseout = function(){
        that.erji.style.display="none";
    }
    this.caidan.onmouseover = function(){
        that.caidan.style.display="block";
        that.sanji.style.display="block";
    }
    this.caidan.onmouseout = function(){
        that.erji.style.display="none";
        that.sanji.style.display="none";
    }

    // 5.编号（设置索引）
    for(var i=0;i<this.oli.length;i++){
        this.oli[i].setAttribute("liyang",i)
    }

    for(var i=0;i<this.oli.length;i++){
        // 循环的执行非常迅速，不会等事件，等到事件被触发的时候，循环再久执行完了，此时计数器已经是最后一个数字了，所以在事件中，拿不到事件外面循环的计数器
        this.oli[i].onmouseover = function(){
            // 3.在事件中找到所有li，清除class
            for(var j=0;j<that.oli.length;j++){
                // ali[j].className = "";
                that.op[j].style.display = "none";
            }
            // 4.this所在的函数被点击的元素执行，所以点了谁，this就是谁
            // this.className = "active";
            // that.op[i].style.display = "block";
            
            
            // 6.根据当前元素，找到自己的编号
            var index = parseInt(this.getAttribute("liyang"));
            // 7.根据编号找到数组中的对应的数据
            // console.log(index);
            that.op[index].style.display = "block";
            // op.innerHTML = arr[index];
            // // 8.根据编号设置月份
            // oh2.innerHTML = index+1 + "月活动";
        }
    }
    // this.oli[0].onmouseover = function(){
    //     that.op[0].style.display="block";
    //     that.op[1].style.display="none";
    //     that.op[2].style.display="none";
    //     that.op[3].style.display="none";
    // }
    // this.oli[1].onmouseover = function(){
    //     that.op[1].style.display="block";
    //     that.op[0].style.display="none";
    //     that.op[2].style.display="none";
    //     that.op[3].style.display="none";
    // }
    // this.oli[2].onmouseover = function(){
    //     that.op[2].style.display="block";
    //     that.op[1].style.display="none";
    //     that.op[0].style.display="none";
    //     that.op[3].style.display="none";
    // }
    // this.oli[3].onmouseover = function(){
    //     that.op[3].style.display="block";
    //     that.op[1].style.display="none";
    //     that.op[2].style.display="none";
    //     that.op[0].style.display="none";
    // }
}

new Sanji();


function Goods(){
    this.url = "http://localhost/haitun/js/goods.json";
    this.hotc = document.getElementsByClassName("hot_c")[0];
    this.floor1 = document.getElementsByClassName("floor_r_goods1")[0];
    this.floor2 = document.getElementsByClassName("floor_r_goods2")[0];
    this.floor3 = document.getElementsByClassName("floor_r_goods3")[0];
    this.floor4 = document.getElementsByClassName("floor_r_goods4")[0];
   

    // 1.请求数据
    this.init()
}
Goods.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        // console.log(res)
        that.res = JSON.parse(res)
        that.display()
    })
}
Goods.prototype.display = function(){
    // 渲染页面功能
    // console.log(this.res)
    

    // 页面的渲染需要跟当前是第几页和一页显示几条数据产生关系
    // this.num5   this.index0
    // 公式
    // 0~5     this.num5*this.index0  ~  this.num5*this.index0 + this.num5
    // 5~10    this.num5*this.index1  ~  this.num5*this.index1 + this.num5
    // 10~15   this.num5*this.index2  ~  this.num5*this.index2 + this.num5
    
    var str1 = "";
    for(var i=0;i<6;i++){
        
            // str += `<li>
            //             <img src="${this.res[i].url}" class="img">        
            //             <h2>商品名称:<span>${this.res[i].name}</span></h2>
            //             <h2>商品介绍:<span>${this.res[i].tip}</span></h2>
            //             <h2>商品价格:<span>${this.res[i].price}</span></h2>
            //         </li>`
                
            str1 += `<div class="goods">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>商城价：</span><span>${this.res[i].price}</span></p>
                    </div>`
        
    }
    this.hotc.innerHTML = str1;

    var str2 = "";
    for(var i=6;i<16;i++){
        
            str2 += `<div class="goods_list">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>${this.res[i].price}</span><span>${this.res[i].price2}</span></p>
                    </div>`
        
    }
    this.floor1.innerHTML = str2;

    var str3 = "";
    for(var i=16;i<26;i++){
        
            str3 += `<div class="goods_list">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>${this.res[i].price}</span><span>${this.res[i].price2}</span></p>
                    </div>`
        
    }
    this.floor2.innerHTML = str3;

    var str4 = "";
    for(var i=26;i<36;i++){
        
            str4 += `<div class="goods_list">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>${this.res[i].price}</span><span>${this.res[i].price2}</span></p>
                    </div>`
        
    }
    this.floor3.innerHTML = str4;

    var str5 = "";
    for(var i=36;i<46;i++){
        
            str5 += `<div class="goods_list">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>${this.res[i].price}</span><span>${this.res[i].price2}</span></p>
                    </div>`
        
    }
    this.floor4.innerHTML = str5;

}

new Goods();



