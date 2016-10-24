/**
 * Created by my on 2016/8/18.
 */


function Sold_slider(){
    this.index = 0;
    this.init();
}

Sold_slider.prototype.init = function () {
    var that = this;
    $(".main-sold-solider-ul").css("width",$(".main-sold-solider-ul li").innerWidth() * $(".main-sold-solider-ul li").length);
    $(".main-sold-solider-ul").css({
        left: -1 * that.index * $(".main-sold-solider-ul li").innerWidth()
    })
    that.settime();
}

Sold_slider.prototype.settime = function () {
    var that = this;
    animate();
    function animate(){
        $(".main-sold-solider-ul").animate({
            left:-1 * that.index * $(".main-sold-solider-ul li").innerWidth()
        },1000, function () {
            that.index++;
            if(that.index === 4){
                that.index = 0;
                $(".main-sold-solider-ul").css({
                    left: 0
                })
            }
            setTimeout(animate,3000);
        })
    }
}