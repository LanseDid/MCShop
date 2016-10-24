/**
 * Created by my on 2016/8/23.
 */
function Floatdiv(){
    this.scorll();
}
Floatdiv.prototype.scorll = function () {
    $(window).scroll(function () {
        var scrollTop = $("body").scrollTop();
        if(scrollTop > 150){
            $("#floatdiv").show();
            $("#floatdiv").stop(true,true);
            $("#floatdiv").animate({
                opacity:1
            },300);
        }
        if(scrollTop <= 150){
            $("#floatdiv").stop(true,false);
            $("#floatdiv").animate({
                opacity:0
            },300, function () {
                $("#floatdiv").hide();
            });
        }
    });
}