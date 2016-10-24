/**
 * Created by my on 2016/8/18.
 */
function Createweek(start,end) {
    //需要几组
    this.start = start;
    this.end = end;
    this.post();
}
//获取json文件中的数据
Createweek.prototype.sharedata = {
    count : 0
}
Createweek.prototype.post = function () {
    var that = this;
    this.sharedata.count = this.end;
    $.post("/api/weeklyimg", {
        start: that.start,
        end:that.end
    }, function (data) {
        for(var i = 0; i < (that.end-that.start); i++){
            var weeklytpl = $("#weektpl").html();
            weeklytpl = weeklytpl.replace("{{titleE}}",data.imgs[i].titleE);
            weeklytpl = weeklytpl.replace("{{titleC}}",data.imgs[i].titleC);
            weeklytpl = weeklytpl.replace("{{src1}}",data.imgs[i].src1);
            weeklytpl = weeklytpl.replace("{{src2}}",data.imgs[i].src2);
            weeklytpl = weeklytpl.replace("{{src3}}",data.imgs[i].src3);
            weeklytpl = weeklytpl.replace("{{src4}}",data.imgs[i].src4);
            weeklytpl = weeklytpl.replace("{{src5}}",data.imgs[i].src5);
            $(".main-sold").before(weeklytpl);
        }
    })
}
