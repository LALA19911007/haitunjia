function Goods(){
    this.cont = document.getElementById("listContent");
    this.url = "http://localhost/haitun/js/car.json";

    this.init();
    // G1.绑定点击加入购物车事件
    this.addEvent();
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
    var str = "";
    for(var i=0;i<this.res.length;i++){
        // str += `<div class="box" index="${this.res[i].goodsId}">
        //             <img src="${this.res[i].src}">
        //             <span>${this.res[i].price}</span>
        //             <p>${this.res[i].name}</p>
        //             <em class="add">加入购物车</em>
        //         </div>`
        str += `<div class="list box" index="${this.res[i].goodsId}">
                    <img src="${this.res[i].src}" />
                    <div class="small_pic">
                        <img src="${this.res[i].src}" />
                    </div>
                    <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                    <p><span>${this.res[i].price}</span><span>${this.res[i].price2}</span></p>
                    <em class="add">加入购物车</em>
                </div>`
    }
    this.cont.innerHTML = str;
}

Goods.prototype.addEvent = function(){
    var that = this;
    this.cont.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "add"){
            that.id = target.parentNode.getAttribute("index");
            // G2.存储cookie
            that.setCookie()
            // console.log(that.id);
        }
    })
}
Goods.prototype.setCookie = function(){
    // 存商品货号和对应的数量

    // 怎么存:JSON,数组里面放对象，对象内至少有两个键值对，货号和数量
    // [{id:123123,num:1},{id:123123,num:1},{id:123123,num:1}]
    this.goods = getCookie("goods");
    if(this.goods == ""){
        // 第一次存，直接存
        this.goods = [{
            id:this.id,
            num:1
        }];
    }else{
        var onoff = true;
        // 不是第一次存，先读取，字符，转对象
        this.goods = JSON.parse(this.goods);
        // console.log(this.goods);
        for(var i=0;i<this.goods.length;i++){
            // 老数据
            if(this.goods[i].id == this.id){
                // 直接修改数量
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        // 新数据
        if(onoff){
            // 直接添加对象
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}

new Goods();