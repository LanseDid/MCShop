/**
 * Created by my on 2016/8/17.
 */


/*********************load modules*********************/
//get file system to read/write json files
var fs = require("fs");
var path = require("path");

//to create http server
var express = require("express");

//to parse body data
var bodyParser = require("body-parser");

var USER_FILE = path.join(__dirname, 'data/user.json');
var INDEX_MAIN_WEEK_FILE = path.join(__dirname,'data/index_main_weekly.json');
var RECOMMEND_IMG_FILE = path.join(__dirname,'data/recommend_goods.json');
var USER_SHOPPING_FILE = path.join(__dirname,'data/shoppingcar.json');
var MERCHANDISE_FILE = path.join(__dirname,'data/merchandise.json');

/*********************server init*********************/
//create app(http server)
var app = express();
var sendApp = require('alidayu-node');
var sendmsg = new sendApp('23440874', '3e007e06024764d4f2982032d4967457');

//set port of the server.
app.set("port", 8888);

//set root of the server
app.use("/", express.static(path.join(__dirname, "public")));

//set the way to parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/checkuser", function (req, res) {
    //liru: /api/checkuser?user=xiaolou
    var user = req.query.user;
    //read the json file
    fs.readFile(USER_FILE, function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        var registeredUsers = JSON.parse(data);
        //console.log(registeredUsers);
        for (var i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].name === user) {
                res.json({
                    msg: "exsited"
                })
                return;
            }
        }
        res.json({
            msg: "success"
        });
    })
});

app.post("/api/register", function (req, res) {
    var user = req.body.user;
    var password = req.body.password;

    fs.readFile(USER_FILE, function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }


        var registeredUsers = JSON.parse(data);
        for (var i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].name === user) {
                res.json({
                    msg: "exsited"
                })
                return;
            }
        }
        var id = registeredUsers.length + 1;
        registeredUsers.push({
            name: user,
            password: password,
            userid:id
        });

        fs.writeFile(USER_FILE, JSON.stringify(registeredUsers,null,4), function (err) {
            if (err) {
                process.exit(1);
            }

            res.json({
                msg: "register success"
            })
        })
    })
})

app.post("/api/login", function (req,res) {
    var user = req.body.user;
    var password = req.body.password;

    fs.readFile(USER_FILE, function (err,data) {
        if(err){
            console.log(err);
            process.exit(1);
        }

        var registeredUsers = JSON.parse(data);

        for(var i = 0; i < registeredUsers.length; i++){
            if(registeredUsers[i].name === user){
                if(registeredUsers[i].password === password){
                    res.json({
                        msg:"success",
                        userid:registeredUsers[i].userid
                    })
                    return;
                }
            }
        }
        res.json({
            msg:"login lose"
        })
    })
})

app.post("/api/weeklyimg", function (req,res) {
    var end = req.body.end;
    var start = req.body.start;

    fs.readFile(INDEX_MAIN_WEEK_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }

        var weeklyimgs = JSON.parse(data);
        res.json({
            imgs:weeklyimgs.slice(start,end)
        })
    })
})
app.post("/api/recommend", function (req,res) {
    var group = req.body.group;

    fs.readFile(RECOMMEND_IMG_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }
        var recommend_imgs = JSON.parse(data);
        res.json({
            imgs:recommend_imgs.splice(0,group)
        })
    })
})

app.post("/api/getusershop", function (req,res) {
    var userid = req.body.userid;
    var result = [];

    fs.readFile(USER_SHOPPING_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }
        var usershopgoods = JSON.parse(data);
        for(var i = 0; i < usershopgoods.length; i++){
            if(usershopgoods[i].userid == userid){
                result.push(usershopgoods[i]);
            }
        }
        res.json({
            goods:result
        })
    })
})

app.post("/api/getgoodsinfo", function (req,res) {
    var goodid = req.body.goodid;
    var goodsize = req.body.goodsize;

    fs.readFile(MERCHANDISE_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }
        var goodsinfo = JSON.parse(data);
        for(var i = 0; i < goodsinfo.length; i++){
            if(goodsinfo[i].goodid === goodid){
                res.json({
                    goodsinfo:goodsinfo[i],
                    goodsize:goodsize
                })
            }
        }
    })
})
app.post("/api/addtoshop", function (req,res) {
    var goodid = req.body.goodid;
    var userid = req.body.userid;
    var goodsize = req.body.goodsize;

    fs.readFile(USER_SHOPPING_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }
        var shopbaginfo = JSON.parse(data);
        shopbaginfo.push({
            userid:userid,
            goodid:goodid,
            goodsize:goodsize
        })

        fs.writeFile(USER_SHOPPING_FILE, JSON.stringify(shopbaginfo,null,4), function (err) {
            if (err) {
                process.exit(1);
            }
            res.json({
                msg: "add success"
            })
        })
    })
})

app.post("/api/delshopcar", function (req,res) {
    var gooddescribe = req.body.gooddescribe;
    var userid = req.body.userid;
    var goodid = "";

    fs.readFile(MERCHANDISE_FILE,function(err,data) {
        if (err) {
            process.exit(1);
        }
        var goodsinfo = JSON.parse(data);
        for (var i = 0; i < goodsinfo.length; i++) {
            if(goodsinfo[i].gooddescribe === gooddescribe){
                goodid = goodsinfo[i].goodid;
            }
            break;
        }
    })

    fs.readFile(USER_SHOPPING_FILE, function (err,data) {
        if(err){
            process.exit(1);
        }

        var shoppings = JSON.parse(data);
        var delindex = 0;
        for(var i = 0 ; i < shoppings.length; i++){
            if(goodid === shoppings[i].goodid){
                if(userid === shoppings[i].userid){
                    delindex = i;
                    break;
                }
            }
        }

        var newshopping = [];
        for(var i = 0; i < shoppings.length; i++){
            if(i === delindex){
                continue;
            }else{
                newshopping.push(shoppings[i]);
            }
        }

        fs.writeFile(USER_SHOPPING_FILE,JSON.stringify(newshopping,null,4), function (err) {
            if(err){
                process.exit(1);
            }

            res.json({
                ret:true
            })
        })
    })
})

app.post("/api/sendcode", function (req,res) {
    //这里把发送短信验证码的请求保存到一个post中去,当请求这个post的时候,就可以调用短信验证.
    var mobile = req.body.mobile;
    var code = req.body.code;
    sendmsg.smsSend({
        sms_free_sign_name: '盛杰MECI', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"name": "用户", "code": code}),//短信变量，对应短信模板里面的变量
        rec_num: mobile, //接收短信的手机号
        sms_template_code: 'SMS_13300494' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    }, function (data) {
        console.log(data);
        res.json({
            ret:data
        })
    });
})


app.listen(app.get("port"), function () {
    console.log("http server:http://localhost:" + app.get("port") + "/");
})