/**
 * Created by my on 2016/8/22.
 */
//在每次打开shoppingcar页面时就调用一次,读取对应用户的购物车文件,看是否有商品,有就加上,没有就显示没有
function Shoppingbag(){
    this.getshoppingbag();
    this.delete();
}

//从cookie中读取用户的id为1,然后通过id去找到用户的购物车json文件
Shoppingbag.prototype.getshoppingbag = function () {
    var goodArr = [];
    var userid = getCookieValueByName("userid");
    $.post("/api/getusershop",{
        userid:userid
    }, function (data) {
        if(data.goods.length === 0){
            console.log("没有购买任何物品");
            $(".shopbaginner").show();
            $(".car-goods").hide();
        }else{
            //console.log(data.goods.length);
            $(".shopbaginner").hide();
            $(".car-goods").show();
            var userdata = data;
            $(".mainmid").css("height",247+data.goods.length * 70);
           for(var i = 0; i < data.goods.length; i++){
               $.post("/api/getgoodsinfo",{
                   goodid:data.goods[i].goodid,
                   goodsize:data.goods[i].goodsize
               }, function (data) {
                   console.log(data.goodsinfo);
                   goodArr.push(data.goodsinfo);
                   var goodstpl = $("#shoppingbagtpl").html();
                   goodstpl = goodstpl.replace("{{src}}",data.goodsinfo.goodsrc);
                   goodstpl = goodstpl.replace("{{describe}}",data.goodsinfo.gooddescribe);
                   goodstpl = goodstpl.replace("{{size}}",data.goodsize);
                   goodstpl = goodstpl.replace("{{price}}",data.goodsinfo.goodprice);
                   $(".ordertab").append(goodstpl);
                   $(".total-submit .total-price .price").html(function (index,oldprice) {
                       return parseInt(oldprice) + parseInt(data.goodsinfo.goodprice);
                   })
               })
           }
        }
    })
}

Shoppingbag.prototype.delete = function () {
    $(".ordertab").on("click",".delgoods",function () {
        //弹出确认对话框
        like = window.confirm("确定是删除商品吗?")
        if(like){
            // 把购物车中的对应物品删除
            var gooddescribe = $(this).parent().siblings(".goods-name").text();
            var index = gooddescribe.indexOf("尺码");
            gooddescribe = gooddescribe.substring(0,index);
            var userid = getCookieValueByName("userid");

            $.post("/api/delshopcar",{
                gooddescribe:gooddescribe,
                userid:userid
            } ,function (data) {
                if(data.ret){
                    console.log("成功删除");
                }
            })
            //console.log(gooddescribe);
            //console.log(index);
            //重新计算总价格

            // 把dom节点上的那个tr删除
            //$(this).parent().parent().remove();
            location.href = "shopping-bag.html";
        }
    });
}
