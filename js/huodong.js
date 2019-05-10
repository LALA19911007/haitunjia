function Goods(){
    this.url = "http://localhost/haitun/js/qianggou.json";
    this.hotc = document.getElementsByClassName("hot_c")[0];

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
    var str1 = "";
    for(var i=0;i<20;i++){             
            str1 += `<div class="goods">
                        <img src="${this.res[i].url}">
                        <p><a href="xiangqing.html">${this.res[i].name}</a></p>
                        <p><span>${this.res[i].price}</span><span>立即抢购</span></p>
                    </div>`   
    }
    this.hotc.innerHTML = str1;
}
new Goods();