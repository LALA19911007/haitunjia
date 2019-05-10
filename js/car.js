function Car(){
    this.tbody = document.querySelector("tbody");
    // this.xiaoji = document.getElementsByClassName("xiaoji")[0];
    // this.num = document.getElementsByClassName("num")[0];
    // this.price = document.getElementsByClassName("price")[0];
    this.url = "http://localhost/haitun/js/car.json"

    this.init()
    // 绑定事件
    this.addEvent()
}
Car.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        // console.log(JSON.parse(res))
        that.res = JSON.parse(res)
        that.getCookie()
    })
}
Car.prototype.getCookie = function(){
    this.goods = getCookie("goods")!="" ? JSON.parse(getCookie("goods")) : [];
    
    this.display()
}
Car.prototype.display = function(){
    var str = "";
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){
            if(this.res[i].goodsId == this.goods[j].id){
                // str += `<tr index="${this.goods[j].id}">
                //             <td><img src="${this.res[i].src}"/></td>
                //             <td>${this.res[i].name}</td>
                //             <td>${this.res[i].price}</td>
                //             <td><input type="number" min=1 value="${this.goods[j].num}" class="num"></td>
                //             <td><em class="dele">删除</em></td>
                //         </tr>`;
                    // <td><input type="checkbox" /><span>全选</span></td>
                    // <td><span>商品</span></td>
                    // <td></td>
                    // <td><span>单价</span></td>
                    // <td><span>数量</span></td>
                    // <td><span>小计</span></td>
                    // <td><span>操作</span></td>
                               
                str += `<tr class="list_content" index="${this.goods[j].id}">
                            <td class="td1">
                                <input type="checkbox" />
                            </td>
                            <td class="td2">
                                <img src="${this.res[i].src}" />
                                <p><a href="../html/xiangqing.html">${this.res[i].name}</a></p>
                            </td>
                            <td class="td3">
                                <div class="detal">
                                    <span>白色</span>
                                    <span>M</span>
                                </div>
                            </td>
                            <td class="td4">
                                <span class="price">${this.res[i].price}</span>
                            </td>
                            <td class="td5">
                                <input type="number" min=1 value="${this.goods[j].num}" class="num">
                            </td>
                            <td class="td6">
                                <span class="xiaoji"></span>
                            </td>
                            <td class="td7">
                                <em class="dele">删除</em>
                            </td>
                        </tr>`
            }
        }
    }
    this.tbody.innerHTML = str;
}
Car.prototype.addEvent = function(){
    var that = this;
    // U1.事件委托绑定事件
    this.tbody.addEventListener("input",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "num"){
            // U2.保存输入框的值，和点击的商品的货号
            that.num = target.value;
            that.id = target.parentNode.parentNode.getAttribute("index");
            // U3.执行修改cookie实现修改数量操作
            that.changeCookie(function(i){
                that.goods[i].num = that.num
            })
        }
    })
    // R1.事件委托绑定删除事件
    this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "dele"){
            // R2.存储要删除商品的货号，同时删除DOM元素
            that.id = target.parentNode.parentNode.getAttribute("index");
            // console.log(that.id);
            target.parentNode.parentNode.remove();
            // R3.执行修改cookie实现删除操作
            that.changeCookie(function(i){
                that.goods.splice(i,1)
            })
        }
    })
}
Car.prototype.changeCookie = function(callback){
    // 遍历cookie，找到要修改的cookie，执行回调函数，同时返回要修改的数据的索引
    for(var i=0;i<this.goods.length;i++){
        // console.log(this.goods.length);
        if(this.goods[i].id == this.id){
            callback(i)
        }
    }
    // 以上只是在操作数组，最后要把数据再设置回去
    setCookie("goods",JSON.stringify(this.goods))
}

// Car.prototype.removeCookie = function(){
//     for(var i=0;i<this.goods.length;i++){
//         if(this.goods[i].id == this.id){
//             this.goods.splice(i,1);
//         }
//     }
//     setCookie("goods",JSON.stringify(this.goods))
// }

new Car();