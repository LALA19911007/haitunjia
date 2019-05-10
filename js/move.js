function move(ele,json,callback){
    clearInterval(ele.a);
    ele.a = setInterval(() => {
        var onoff = true;
        for(var attr in json){
            if(attr == "opacity"){
                var iNow = parseFloat(getStyle(ele,attr)) * 100;
            }else{
                var iNow = parseFloat(getStyle(ele,attr));
            }
            
            var speed = (json[attr] - iNow)/8;
            speed = speed < 0 ? Math.floor(speed): Math.ceil(speed)
            if(json[attr] != iNow){
                onoff = false;
            }
            if(attr == "opacity"){
                ele.style[attr] = (iNow + speed)/100;
            }else{
                ele.style[attr] = iNow + speed + "px";
            }
        }
        if(onoff == true){
            clearInterval(ele.a);
            callback && callback();
        }
    }, 30);
}

function getStyle(ele,attr){
    if(getComputedStyle){
        return getComputedStyle(ele,false)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}