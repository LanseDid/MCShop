/**
 * Created by my on 2016/8/18.
 */
//轮播图对象
function Slider(){
    this.index = 1;
    this.time = 500;
    this.prveindex = 0;
    this.timeid;
    this.init();
}
//初始化方法
Slider.prototype.init = function(){
    var that = this;
    //console.log($(".main-slider-ul").innerWidth());
    var bogusFirst = $(".slider-last-li").clone(true);
    $(bogusFirst).removeClass("slider-last-li").addClass("bogusFirst");
    var bogusLast = $(".slider-first-li").clone(true);
    $(bogusLast).removeClass("slider-first-li").addClass("bogusLast");
    $(".slider-first-li").before(bogusFirst);
    $(".slider-last-li").after(bogusLast);
    //在初始化中改变ul的大小
    $(".main-slider-ul").css("width",$(".main-slider-ul li").innerWidth() * $(".main-slider-ul li").length);
    //console.log(this.index);
    $(".main-slider-ul").css({
        left:-1 * that.index * $(".main-slider-ul li").innerWidth()
    });
    $(".main-slider button").hide();
    
    this.settime();
    this.hideandshow();
}

//自动轮播
Slider.prototype.settime = function () {
    var that = this;
    var timer;
    var flag = true;
    animate();
    function animate(){
        clearTimeout(timer);
        flag = false;
        $(".main-slider-ul").stop(true);
        $(".main-slider-ul").animate({
            left : -1 * that.index * $(".main-slider-ul li").innerWidth()
        },that.time,function(){
            console.log("that.index = "+ that.index);
            flag = true
            if(that.index === 8){
                console.log("回到第一张");
                that.prveindex = that.index;
                that.index = 2;
                $(".main-slider-ul").css({
                    left:-1 * $(".main-slider-ul li").innerWidth()
                });
            }
            else if(that.index === 0){
                that.prveindex = that.index;
                that.index = $(".main-slider-ul li").length - 2;
                $(".main-slider-ul").css({
                    left:-1 * that.index * $(".main-slider-ul li").innerWidth()
                });
            }
            else{
                that.prveindex = that.index;
                that.index++;
            }
            timer = setTimeout(animate,3000);
        })
    }
    $(".main-slider-prvebtn").click(function () {
        if(flag === true){
            that.index = that.prveindex;
            //clearTimeout(timer);
            if(that.index === 0){
                that.index = 6;
            }
            else{
                that.index--;
            }
            animate();
        }
    });
    $(".main-slider-nextbtn").click(function () {
        //clearTimeout(timer);
        if(flag === true){
            animate();
        }
    });
}

Slider.prototype.hideandshow = function () {
    $(".main-slider").mouseenter(function () {
        $(".main-slider button").show();
    });
    $(".main-slider-prvebtn").mouseenter(function () {
        $(".main-slider-prvebtn").css("background","#333");
    });
    $(".main-slider-nextbtn").mouseenter(function () {
        $(".main-slider-nextbtn").css("background","#333");
    });

    $(".main-slider").mouseleave(function () {
        $(".main-slider button").hide();
    });
    $(".main-slider-prvebtn").mouseleave(function () {
        $(".main-slider-prvebtn").css("background","#666");
    });
    $(".main-slider-nextbtn").mouseleave(function () {
        $(".main-slider-nextbtn").css("background","#666");
    })
}
