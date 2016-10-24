/**
 * Created by my on 2016/8/20.
 */
function Magnifier(){
    this.init();
}

Magnifier.prototype.init = function () {
    //监听鼠标的各个事件
    this.enter();
    this.mousemove();
    this.leave();
}

Magnifier.prototype.enter = function () {
    //鼠标enter时，显示float和大图， 并且根据小图的路径判断应该是哪张大图
    $(".merchandise-img-small").mouseenter(function () {
        $(".magnifier-float").show();
        $(".merchandise-img-big").show();
        var bigurl = $(".merchandise-img-small").children("img").attr("src").replace("small","big");
        bigurl = "url('" + bigurl + "')";
        //console.log(bigurl);

        $(".merchandise-img-big").css({
            background:bigurl
        })
    })
}

Magnifier.prototype.leave = function () {
    $(".merchandise-img-small").mouseleave(function () {
        $(".magnifier-float").hide();
        $(".merchandise-img-big").hide();
    })
}

Magnifier.prototype.mousemove = function () {
    $(".merchandise-img-small").mousemove(function (evt) {
        var floatleft = evt.clientX - $(".magnifier-float").width() / 2;
        var floattop = evt.clientY + $(window).scrollTop() - $(".magnifier-float").height() / 2;

       //console.log($(".merchandise-img-small").offset().top);

        if(floatleft <= $(".merchandise-img-small").offset().left){
            floatleft = $(".merchandise-img-small").offset().left;
        }
        if(floatleft >= $(".merchandise-img-small").offset().left + $(".merchandise-img-small").width() - $(".magnifier-float").width()){
            floatleft = $(".merchandise-img-small").offset().left + $(".merchandise-img-small").width() - $(".magnifier-float").width()
        }

        if(floattop <= $(".merchandise-img-small").offset().top){
            floattop = $(".merchandise-img-small").offset().top;
        }
        if(floattop >= $(".merchandise-img-small").offset().top + $(".merchandise-img-small").height() - $(".magnifier-float").height()){
            floattop = $(".merchandise-img-small").offset().top + $(".merchandise-img-small").height() - $(".magnifier-float").height();
        }

        $(".magnifier-float").offset({
            left:floatleft,
            top:floattop
        })

        var bigleft = -1 * (floatleft - $(".merchandise-img-small").offset().left) * 2.08;
        var bigtop = -1 * (floattop - $(".merchandise-img-small").offset().top) * 2.08;

        $(".merchandise-img-big").css("background-position",bigleft + "px "+ bigtop + "px");

        //console.log("left = " + $(".merchandise-img-small").off().left);
    })
}