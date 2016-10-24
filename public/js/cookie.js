/**
 * Created by my on 2016/8/23.
 */
//保存cookie
//name cookieName  value cookieValue  date expiresDays
function setCookie(name,value,days){
    //计算过期时间
    var now = new Date();
    now.setDate( now.getDate() + days );
    // cookie字符串
    var str = name+"="+value;
    if(days != undefined){
        str = str +";expires="+now.toGMTString();
    }
    //保存cookie
    document.cookie = str;
}
//根据cookieName获取cookieValue
function getCookieValueByName(name){
    var value="";
    //获取所有cookie
    var cookies = document.cookie.split("; ");
    for(var i=0; i< cookies.length; i++){
        //分割每一个cookie，获取name和value
        var arr = cookies[i].split("=");
        //查找cookie
        if(arr[0]==name){
            value = arr[1];
            break;
        }
    }
    return value;
}

//根据cookieName删除cookie
function delCookieByName(name){
    //设置cookie的过期时间为过去的某个时间
    setCookie(name,1,-1);
}
