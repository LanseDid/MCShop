/**
 * Created by my on 2016/8/19.
 */
function Createrecommend(group){
    this.group = group;
    this.post();
}

Createrecommend.prototype.post = function () {
    var that = this;
    $.post("/api/recommend",{
        group:that.group
    }, function (data) {
        console.log(data);
        for(var i = 0;i < that.group; i++){
            var newrecommend = $("#recommendtpl").html();
            newrecommend = newrecommend.replace("{{src}}",data.imgs[i].src);
            newrecommend = newrecommend.replace("{{brand}}",data.imgs[i].brand);
            newrecommend = newrecommend.replace("{{dscription}}",data.imgs[i].dscription);
            $(".product-recommend-inner-ul").append(newrecommend);
        }
    })
}