/**
 * Created by my on 2016/8/18.
 */
$(function () {
    var flag = false;
    var registerOK = false;
    //用户名输入框失去焦点后
    $(".username").blur(function () {
        if(checkUserReg()){
            checkUserExist();
        }else{
            $(".error-info").html("请输入正确的邮箱或手机号");
            flag = false;
        }
    });
    $(".username").focus(function () {
        $(this).css("border-color","#8e0c3a");
        $(this).css("color","#333333");
    })
    //判断用户输入的用户名格式是否正确
    function checkUserReg(){
        //获取用户输入的用户名
        //利用正则表达式判断用户名是否合法
        var username = $(".username").val();
        var regExp = /^((180|139|188|138|130|158)\d{8})|((\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3}))$/;  //大概写了下,明天再改
        return(regExp.test(username));
    }
    //判断用户输入的用户名是否存在
    function checkUserExist(){
        var user = $(".username").val();
        $.get("/api/checkuser",{
            user:user
        }, function (data) {
            if(data.msg === "success"){
                if(!$(".password").val()){
                    $(".error-info").html("密码不能为空");
                }
                flag = true;
                complete();
            }
            else{
                $(".error-info").html("用户名已存在");
                flag= false;
                complete();
            }
        })
    }
    
    $(".password").blur(function () {
        checkPw();
        complete();
    })
    $(".password").focus(function () {
        $(this).css("border-color","#8e0c3a");
        $(this).css("color","#333333");
        $(this).val("");
    })

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

    //确认密码后判断是否一致
    $(".password-confirm").blur(function(){
        comparePw();
        complete();
    });
    $(".password-confirm").focus(function () {
        $(this).css("border-color","#8e0c3a");
        $(this).css("color","#333333");
        $(this).val("");
    })
    $(".security-code").focus(function () {
        $(this).css("border-color","#8e0c3a");
        $(this).css("color","#333333");
        $(this).val("");
    })

    function comparePw(){
        var pw = $(".password").val();
        var pwConfirm = $(".password-confirm").val();
        if(0 === pw.localeCompare(pwConfirm)){
            $(".error-info").html("");
            return true;
        }else{
            $(".error-info").html("两次输入结果不一致");
            return false;
        }
    }
    var code = "";
    //发送验证码
    $(".getcode").click(function () {
        //点击获取验证码的按钮后发送验证码到手机上
        //发送ajax请求
        var mobile = $(".username").val();
        if(mobile){
            code = "";
            for(var i = 0; i < 4; i++){
                code = code + Math.floor(Math.random()*10);
            }
            $.post("/api/sendcode",{
                mobile:mobile,
                code:code
            }, function (data) {
                console.log(data);
            })
        }else {
            console.log("请输入用户名");
        }

    });

    function complete(){
        if(flag && checkPw() && comparePw()){
//                alert("可以注册");
            $(".error-info").html("点击注册按钮完成注册");
            registerOK = true;
        }else{
            registerOK = false;
        }
    }

    $(".register").click(function () {
        var userinputcode = $(".security-code").val();
        if(code === userinputcode){
            $(".error-info").html("");
            $(".security-code").val("");
            if(registerOK){
                var user = $(".username").val();
                var password = $(".password").val();

                $.post("/api/register",{
                    user:user,
                    password:password
                }, function (data) {
                    if(data.msg === "register success"){
                        location.href = "login.html";
                    }
                })
            }
        }else{
            $(".error-info").html("验证码输入错误");
        }

    })

})