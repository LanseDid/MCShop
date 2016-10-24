/**
 * Created by my on 2016/8/18.
 */
$(".head-nav-ul").on("mouseenter","li", function () {
    $(this).children(".main-second-level").load("second_level_menu/index_second_level_"+ $(this).index() + ".html");
    $(this).children(".main-second-level").show();
    //console.log("li show");
    //console.log($(this).children(".main-second-level"));
})

$(".head-nav-ul").on("mouseleave","li", function () {
    $(this).children(".main-second-level").hide();
    //console.log("li hide");
})

$(".main-second-level").mouseenter(function(){
    $(this).siblings().css({
        background:"#8e0c3a",
        color:"#ffffff"
    });
    $(this).show();
    //console.log("this show");
});

$(".main-second-level").mouseleave(function(){
    $(this).siblings().css({
        background:"",
        color:""
    });
});

var userid = getCookieValueByName("userid");
console.log("cookie = "+userid);

    //var newnum = parseInt(oldnum) + 1;
$.post("/api/getusershop",{
    userid:userid
}, function (data){
    $(".head-top-mid-rightli2-backgorund span").html(function (index,oldnum){
        return data.goods.length;
    })
})

$(".head-top-mid-rightul").on("mouseenter","li", function () {
    $(this).children(".head-top-second").show();
    $(this).css("background","#ffffff");
    $(this).css("border","1px solid #cccccc");
    $(this).css("border-bottom","none");
    $(this).css("margin-left","8px");
    $(this).css("padding-left","16px");
    $(this).children("a").children("img").attr("src","resource/imgs/head2-2.jpg");
   // $(this).siblings().css("border-bottom","1px solid #cccccc");
    $(this).children(".head-top-second").css("margin-top","-1px");
})
$(".head-top-mid-rightul").on("mouseleave","li", function () {
    $(this).children(".head-top-second").hide();
    $(this).children("a").children("img").attr("src","resource/imgs/head2.jpg");
    $(this).css("background","");
    $(this).css("border","");
})

new Showusername();
