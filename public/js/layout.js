/**
 * Created by my on 2016/8/23.
 */
function Layout(){
    this.flag = true;
    this.init();
}
Layout.prototype.init = function () {
    var that = this;
    $(document).scroll(function () {
        if(that.needload() && that.flag){
            that.flag = false;
            that.loaddata();
        }
    });
}
//从
Layout.prototype.loaddata = function () {
    //console.log("$(.weekly:last).index()"+$(".weekly:last").index())
    new Createweek($(".weekly:last").index(),$(".weekly:last").index()+2);
    that.flag = true;
}
//判断是否需要加载
Layout.prototype.needload = function () {
    //滚动高度
    var scrollTop = $("body").scrollTop();
    //窗口高度
    var screenHeight = $(window).height();
    //最后一个week距离top的高度
    var lasttop = parseInt($(".weekly:last")[0].offsetTop);
    //console.log("scrollTop:"+scrollTop+" screenHeight:"+screenHeight+" lasttop:"+lasttop);

    return (screenHeight + scrollTop > lasttop)? true : false;

}