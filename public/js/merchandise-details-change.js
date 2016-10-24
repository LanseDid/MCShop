/**
 * Created by my on 2016/8/19.
 */
$(".merchandise-img-list ul").on("mouseenter","li", function () {
    $(".merchandise-img-list ul li img").removeClass("img-list-border");
    $(this).children("img").addClass("img-list-border");
    var listsrc = $(this).children("img").attr("src");
    var smallsrc = listsrc.replace("co","small");
    $(".merchandise-img-small").children("img").attr("src",smallsrc);
})

$(".merchandise-img-list ul").on("mouseleave","li", function () {

})