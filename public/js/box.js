function Box(weekgood){
    this.weekgood = weekgood;
}

//获取模板创建Box对象
Box.prototype.createweekly = function () {
    var newweek = $("#weektpl").html();
    newweek = newweek.replace("{{titleE}}",this.weekgood.titleE);
    newweek = newweek.replace("{{titleC}}",this.weekgood.titleC);
    newweek = newweek.replace("{{src1}}",this.weekgood.src1);
    newweek = newweek.replace("{{src2}}",this.weekgood.src2);
    newweek = newweek.replace("{{src3}}",this.weekgood.src3);
    newweek = newweek.replace("{{src4}}",this.weekgood.src4);
    newweek = newweek.replace("{{src5}}",this.weekgood.src5);
    $(".main-sold").before(newweek);
}