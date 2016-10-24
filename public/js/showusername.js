/**
 * Created by my on 2016/8/23.
 */
function Showusername(){
    this.state = false;
    this.init();
}

Showusername.prototype.init = function () {
    var username = getCookieValueByName("username");
    if(username){
        $(".head-top-mid-leftul li:eq(0) a").attr("href","#");
        $(".head-top-mid-leftul li:eq(0) a").html(getCookieValueByName("username") + " 欢迎您");
        $(".head-top-mid-leftul li:eq(2) a").attr("href","#");
        $(".head-top-mid-leftul li:eq(2) a").html("退出");
        this.state = true;
        this.cancellogin();
    }
}

Showusername.prototype.cancellogin = function () {
    $(".head-top-mid-leftul li:eq(2) a").click(function () {
        delCookieByName("username");
        delCookieByName("userid");
        $(".head-top-mid-leftul li:eq(0) a").html("注册");
        $(".head-top-mid-leftul li:eq(0) a").attr("href","register.html");
        $(".head-top-mid-leftul li:eq(2) a").html("登录");
        $(".head-top-mid-leftul li:eq(2) a").attr("href","login.html");
    });
}