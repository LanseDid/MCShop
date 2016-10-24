/**
 * Created by my on 2016/8/22.
 */
function Addtoshoppinbag(){
    this.size = "";
    this.init();
}
Addtoshoppinbag.prototype.init = function () {
    this.clothsize();
    this.click();
}
Addtoshoppinbag.prototype.clothsize = function () {
    var that = this;
    $(".cloth-size ul").on("click","li", function () {
        $(this).siblings().css("border-color","#cccccc");
        $(this).siblings().css("color","#cccccc");
        $(this).css("border-color","#333");
        $(this).css("color","#333");
        that.size = $(this).html();
    })
}
Addtoshoppinbag.prototype.click = function () {
    var that = this;
    var userid = getCookieValueByName("userid");
    $(".addshopcarbtn").click(function () {
        var goodid = "01";
        var size = that.size;
        if(userid === ""){
            alert("请先登录");
            location.href="login.html";
            return;
        }
        if(!size){
            console.log("请选择尺码");
        }else{
            //console.log(size);
            $.post("/api/addtoshop",{
                goodid:goodid,
                userid:userid,
                goodsize:size
            }, function (data) {
                if(data.msg === "add success"){
                    //console.log("恭喜成功添加了一件商品到购物车");
                    $(".movegoods").show();
                    $(".movegoods").animate({
                        left:750,
                        top:-200,
                        height:50,
                        width:30
                    },1000, function () {
                        $(".movegoods").hide();
                        $(".movegoods").css({
                            left:0,
                            top:0,
                            width: 384,
                            height:460
                        })
                        $(".head-top-mid-rightli2-backgorund span").html(function (index,oldnum) {
                            //var newnum = parseInt(oldnum) + 1;
                            //console.log($(".head-top-second"));
                            $(".head-top-mid-rightli2-backgorund .head-top-second").append("<dl><dt><img src='resource/imgs/details_magnifier_co1.jpg'></dt> <dd>Boy London 伦敦男孩</dd> <dd>全棉 男士 T恤</dd> <dd>￥460.00</dd> </dl>");
                            $(".head-top-mid-rightli2-backgorund .head-top-second").slideDown("fast");
                            $(".head-top-mid-rightli2-backgorund").children(".head-top-second").show();
                            $(".head-top-mid-rightli2-backgorund").css("background","#ffffff");
                            $(".head-top-mid-rightli2-backgorund").css("border","1px solid #cccccc");
                            $(".head-top-mid-rightli2-backgorund").css("border-bottom","none");
                            $(".head-top-mid-rightli2-backgorund").css("margin-left","8px");
                            $(".head-top-mid-rightli2-backgorund").css("padding-left","16px");
                            $(".head-top-mid-rightli2-backgorund").children("a").children("img").attr("src","resource/imgs/head2-2.jpg");
                            // $(this).siblings().css("border-bottom","1px solid #cccccc");
                            $(".head-top-mid-rightli2-backgorund").children(".head-top-second").css("margin-top","-1px");
                            return parseInt(oldnum) + 1;
                        })
                    })
                }
            })
        }
    });
}