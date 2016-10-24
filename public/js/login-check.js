/**
 * Created by my on 2016/8/19.
 */
$(".login").click(function () {
    var user = $(".username").val();
    var password = $(".password").val();

    if(checkUserReg()){
        if(checkPw()){
            $(".error-info").html("");
            $.post("/api/login",{
                user:user,
                password:password
            }, function (data) {
                if(data.msg === "success"){
                    location.href = "index.html";
                    setCookie("username",user);
                    setCookie("userid",data.userid);
                }else{
                    $(".error-info").html("用户名或密码输入错误");
                }
            })
        }
    }else{
        $(".error-info").html("请输入正确的邮箱或11位手机号");
    }
})
$(".username").focus(function () {
    $(this).css("border-color","#8e0c3a");
    $(this).css("color","#333333");
})

$(".password").focus(function () {
    $(this).css("border-color","#8e0c3a");
    $(this).css("color","#333333");
    $(this).val("");
})


function checkUserReg(){
    //获取用户输入的用户名
    //利用正则表达式判断用户名是否合法
    var username = $(".username").val();
    var regExp = /^((180|139|188|138|130|158)\d{8})|((\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3}))$/;  //大概写了下,明天再改
    return(regExp.test(username));
}

function checkPw(){
    var pw = $(".password").val();
    var level = 0;
    //检查密码的长度是否足够
    if(pw.length < 6 || pw.length > 16){
        $(".error-info").html("用户密码长度范围在6~16位之间");
        return false;
    }
    $(".error-info").html("");
    return true;
}