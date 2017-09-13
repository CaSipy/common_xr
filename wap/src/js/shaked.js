/*stop==摇一摇事件处理*/
var app = angular.module('app', []);
app.controller('ctrl',function($scope, $http,$timeout,$interval) {
    $scope.people_num = '';
    $scope.times_num = '1';
    $scope.tab_num = 1;
    $scope.status = true;

    $scope.gold = 0.00;
    $scope.money = 0.00;
    $scope.fx_money = 0.00;
    $scope.score = 0.00;
    $scope.payment_money = 0.00;
    $scope.payment_id = 21;
    var audio_s,audio_sr='';

    $scope.coupon_title = "";
    $scope.coupon_limit_time = "";
    $scope.coupon_money = "";

    if ($.isEmptyObject(json)) {
        var init_url = "";
        var json_param = {};
        $http(
            {
                method : 'post',
                url : init_url,
                data : $.param(json_param),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(data) {
            // 请求成功执行代码
            json = data.data;
            $scope.json = data.data;
            $scope.json_config = data.data.json_config;

            // 获取值传递
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:" + data);
            $.toast("网络错误", "forbidden")
        });
    } else {
        $scope.json = json;
        $scope.json_config = json.json_config;
        $scope.server_json = json.server_json;

        for (var i = 0; i < $scope.json.payment_rules.length; i++) {
            var stand_price = $scope.json.tool.price
                * $scope.json.payment_rules[i].money_ratio;

            if ($scope.json.payment_rules[i].class_name == "gold") {
                $scope.gold = stand_price;
            } else if ($scope.json.payment_rules[i].class_name == "money") {
                $scope.money = stand_price;
            } else if ($scope.json.payment_rules[i].class_name == "fx_money") {
                $scope.fx_money = stand_price;
            } else if ($scope.json.payment_rules[i].class_name == "payment_id") {
                $scope.payment_money = stand_price;
            } else if ($scope.json.payment_rules[i].class_name == "score") {
                $scope.score = stand_price;
            }
        }


    }
    $scope.rule = function(num) {
        $("#about").popup();
        $scope.tab_num = num;
        if (num == 1) {
            $("#rule2").fadeOut();
            $timeout(function() {
                $("#rule1").fadeIn();
            }, 500)
        } else {
            $("#rule1").fadeOut();
            $timeout(function() {
                $("#rule2").fadeIn();
                $scope.status = true;
            }, 500)
        }
    }
    $scope.pop_close = function() {
        $.closePopup();
    }
    $scope.tab = function(num) {

        $scope.tab_num = num;
        if (num == 1) {
            $("#rule2").fadeOut();
            $timeout(function() {
                $("#rule1").fadeIn();
            }, 500)
        } else {
            $("#rule1").fadeOut();
            $timeout(function() {
                $("#rule2").fadeIn();
                $scope.status = true;
            }, 500)
        }
    }
    // 处理开关音乐
    $scope.music_url = 'http://common.huibaoming.cn/wap/images/haivit/open_music.png';
    $scope.music_status = 1;// 定义音乐的状态，为1时是扬声状态，为0时是静音状态
    // 控制音乐开关状态
    $scope.close_music = function($event) {
        if ($scope.music_status == 0) {
            $scope.music_status = 1;
            document.getElementById("myAudio").play();// 扬声
            $($event.target).addClass('music-animate');
            $scope.music_url = 'http://common.huibaoming.cn/wap/images/haivit/open_music.png';
        } else {
            $scope.music_status = 0;
            document.getElementById("myAudio").pause();// 静音
            $($event.target).removeClass('music-animate');
            $scope.music_url = 'http://common.huibaoming.cn/wap/images/haivit/close_music.png';
        }
    }

	/* start==摇一摇事件处理 */

    // PC端摇一摇用按钮先处理
    $scope.shake_shake = function() {
        document.getElementById("hand").className = "hand";

        if($scope.json.order_sn!=undefined){
            $scope.lottery($scope.json.order_sn);
            return;
        }

        if ($scope.json.limit_number < 1
            && $scope.json.limit_number != -1) {
            // 抽奖次数不足则提示并中止业务
            //$.toast("您的金币不足喔~！本次活动需要花费"+$scope.json.tool.price+"金币。", "forbidden");

            $('#lack').fadeIn();
            $('#lack_bag').addClass('lack_bag-animate');
            $('#lack_bag').show();
            return;
        }
        //$.showLoading("正在努力加载结果...惊喜即将到来^oo^");

        var json_param = {};
        json_param["deal_id"] = $scope.json.tool.id;
        json_param["payment_id"] = $scope.payment_id;
        json_param["payment_money"] = $scope.payment_money;
        json_param["money"] = $scope.money;
        json_param["fx_money"] = $scope.fx_money;
        json_param["gold"] = $scope.gold;
        json_param["score"] = $scope.score;

        var order_url = project_url + "/" + module
            + "/createOrder.do";

        if($scope.payment_money>0.00){
            console.log(order_url+"?payment_id="+json_param["payment_id"]+"&payment_money="+json_param["payment_money"]
                +"&money="+json_param["money"]
                +"&fx_money="+json_param["fx_money"]
                +"&gold="+json_param["gold"]
                +"&score="+json_param["score"]
                +"&deal_id="+json_param["deal_id"]);
            window.location.href = order_url+"?payment_id="+json_param["payment_id"]+"&payment_money="+json_param["payment_money"]
                +"&money="+json_param["money"]
                +"&fx_money="+json_param["fx_money"]
                +"&gold="+json_param["gold"]
                +"&score="+json_param["score"]
                +"&deal_id="+json_param["deal_id"];

            return;
        }

        $http({
            method : 'post',
            url : order_url,
            data : $.param(json_param),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(
            function successCallback(data) {

                // 请求成功执行代码
                if (data.data.err_code == -1) {
                    $scope.lottery(data.data.order_sn,data.data.uuid);
                } else {
                    $.hideLoading();
                    $('#fail').fadeIn();
                    //$.toast("操作失败,错误代码："+ data.data.err_code+ ","+ data.data.err_msg,"forbidden");
                }
                // 获取值传递
            }, function errorCallback(data) {
                // 请求失败执行代码
                console.log("error:" + data);
                $.toast("网络错误", "forbidden");
            });

    }

    $scope.lottery = function(order_sn,uuid){

        var lottery_url = project_url
            + "/" + module
            + "/lottery.do";
        json_param = {};
        json_param["id"] = $scope.json.tool.id;
        json_param["order_sn"] = order_sn;
        json_param["reward_rule_id"] = $scope.json.tool.reward_rule_id;
        $http({
            method : 'post',
            url : lottery_url,
            data : $.param(json_param),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(data) {
            // 请求成功执行代码
            if (data.data.err_code == -1) {
                $.hideLoading();
                // 抽奖结果
                if (data.data.reward.reward_type_id == 7) {
                    // 没中奖
                    //$.toast("很遗憾，您没有中奖，请再接再厉~!");
                    $('#bad').fadeIn();
                    $('#bad_bag').addClass('bad_bag-animate');
                    $('#bad_bag').show();
                    $('#bad_btn').addClass('bad_btn-animate');
                    $('#bad_btn').show();
                } else {
                    var msg = '';
                    //var msg = "恭喜您获得奖励:"+ data.data.reward.name;
                    if (data.data.reward.reward_type_id == 1 || data.data.reward.reward_type_id == 2 || data.data.reward.reward_type_id == 3 ||  data.data.reward.reward_type_id == 5 ) {
                        //msg += ",获得数值为："+ data.data.reward.reward_real_price;
                        msg += data.data.reward.real_money;
                        //摇到红包的效果
                        $('#good').fadeIn();
                        $('#good_bag').addClass('good_bag-animate');
                        $('#shake_bag').show();//显示摇到红包
                        $('#shake_coupon').hide();//隐藏卡券
                        $('#shake_integral').hide();//隐藏积分显示
                        $('#good_money').html(msg);//红包金额
                    }else if(data.data.reward.reward_type_id == 4){
                        //摇到积分的显示
                        msg += data.data.reward.real_money;
                        $('#good').fadeIn();
                        $('#good_bag').addClass('good_bag-animate');
                        $('#shake_integral').show();//显示摇到积分
                        $('#shake_bag').hide();//隐藏摇到红包
                        $('#shake_coupon').hide();//隐藏卡券
                        $('#integral_money').html(msg);//积分的数额
                    }else if(data.data.reward.reward_type_id ==6){
//                                   $.toast(data.data.reward.name+data.data.reward.start_use_time+data.data.reward.end_use_time+data.data.reward.reward_real_price);
//                                   $scope.$apply(function(){
                        $scope.coupon_title = data.data.reward.name;
                        $scope.coupon_limit_time = data.data.reward.start_time + "至" + data.data.reward.end_time;
                        $scope.coupon_money = data.data.reward.real_money;
//                                   });
                        $("#coupon_title").html($scope.coupon_title);
                        $("#coupon_limit_time").html($scope.coupon_limit_time);
                        $("#coupon_money").html($scope.coupon_money);
                        $('#good').fadeIn();
                        $('#good_bag').addClass('good_bag-animate');
                        $('#shake_coupon').show();//显示摇到卡券
                        $('#shake_bag').hide();//隐藏红包
                        $('#shake_integral').hide();//隐藏积分显示
                    }
                    //$.toast(msg);


                }
                var json_param = {};
                json_param["id"] = $scope.json.tool.id;
                json_param["is_json"] = 1;
                $http({
                    method : 'post',
                    url : pre_url+ "?id="+ $scope.json.tool.id,
                    data : $.param(json_param),
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).then(
                    function successCallback(data) {
                        // 请求成功执行代码
                        $scope.json = data.data;
                        $scope.json_config = data.data.json_config;
                        // 获取值传递
                    },function errorCallback(data) {
                        // 请求失败执行代码
                        console.log("error:"+ data);
                        $.toast("网络错误","forbidden");
                    });

            } else {
                $.hideLoading();
                $('#fail').fadeIn();
                //$.toast("操作失败,错误代码："+ data.data.err_code+ ","+ data.data.err_msg,"forbidden");
            }

            // 获取值传递
        },function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+ data);
            $.toast("网络错误","forbidden");
        });

    };

	/*$scope.close_result = function() {
	 document.getElementById("result").className = "result hide";
	 }*/
    //关闭弹出窗
    $scope.close_window = function($event,value){
        $($event.target).parent().fadeOut();
    }
    $scope.close_lack = function($event,value){
        $($event.target).parents('#lack').fadeOut();
    }
    $scope.close_bad = function ($event,value) {
        $($event.target).parents('#bad').fadeOut();
    }
    $scope.close_good = function($event,value){
        $($event.target).parents('#good').fadeOut();
    }
    var audio_shake;
    var times = 0;
    // var initAudio = function() {
    // 	audio_shake = document.createElement("audio");
    // 	audio_shake.src = 'http://common.huibaoming.cn/wap/images/haivit/shakes.mp3';
    // }
    function doResult() {
        if (times > 0) {
            return false;
        }
        autoPlay();
        // document.getElementById("result").className = "result
        // hide";
        // document.getElementById("loading").className =
        // "loading";
        document.getElementById("hand").className = "hand hand-animate";
        $timeout(function() {
            autoPlayed();
            $scope.shake_shake();
        }, 2500);
        $timeout(function() {
            times = 0;
            document.getElementById("hand").className = "hand";
            // document.getElementById("result").className =
            // "result";
        }, 3000);


    }
    // 播放控制
    function autoPlay() {
        var index = 0;
        audio_s.addEventListener('ended', function() {
            // Wait 500 milliseconds before next loop
            $timeout(function() {
                if (index < 1) {
                    audio_s.load();
                    audio_s.play();
                    index++
                }
            }, 500);
        }, false);
        audio_s.load();
        audio_s.play();
    }
    function autoPlayed() {
        // var audio = document.createElement("audio");
        // var index = 0;
        // audio.src = "http://common.huibaoming.cn/wap/images/haivit/skresult.mp3";
        audio_sr.addEventListener('ended', function() {// Wait 500
            // milliseconds
            // before
            // next loop
            $timeout(function() {
                if (index < 0) {
                    audio_sr.load();
                    audio_sr.play();
                    index++
                }
            }, 0);
        }, false);
        audio_sr.load();
        audio_sr.play();
    }
    //initAudio();
    $(document).one('WeixinJSBridgeReady', function () {
        audio_s = document.getElementById("audio_shake");
        audio_sr = document.getElementById("audio_shake_result");
        document.getElementById("myAudio").play();// 扬声
        audio_s.play();
        audio_sr.play();
        audio_s.setAttribute('src', 'http://common.huibaoming.cn/wap/images/haivit/shakes.mp3');
        audio_sr.setAttribute('src', 'http://common.huibaoming.cn/wap/images/haivit/skresult.mp3');
        audio_s.load();
        audio_sr.load()
    });
    $(document).ready(function() {
        if (window.DeviceMotionEvent) {
            var speed = 20;
            var audio = document.getElementById("shakemusic");
            var openAudio = document.getElementById("openmusic");
            var x = y = z = lastX = lastY = lastZ = 0;
            window.addEventListener('devicemotion',function() {
                var acceleration = event.accelerationIncludingGravity;
                x = acceleration.x;
                y = acceleration.y;
                if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {

                    $('#good').hide();
                    $('#bad').hide();
                    $('#lack').hide();
                    $('#fail').hide();
                    doResult();
                    times++;
                }
                ;
                lastX = x;
                lastY = y;
            }, false);
        }
        ;
    });

    document.onreadystatechange = subSomething;// 当页面加载状态改变的时候执行这个方法.
    function subSomething() {
        if (document.readyState == 'complete') {// 当页面加载完成时隐藏加载中的遮罩层
            // alert('页面加载完成');
            $timeout(function() {
                $('#dim').fadeOut();
            }, 3000);
        }
    }
	/*$timeout(function() {
	 $('#good').fadeIn(500);
	 $('#good_bag').addClass('good_bag-animate');
	 }, 500);*/
	/*$timeout(function() {
	 $('#bad').fadeIn(500);
	 $('#bad_bag').addClass('bad_bag-animate');
	 $('#bad_bag').show();
	 $('#bad_btn').addClass('bad_btn-animate');
	 $('#bad_btn').show();
	 }, 500);*/
	/*$timeout(function() {
	 $('#lack').fadeIn(500);
	 $('#lack_bag').addClass('lack_bag-animate');
	 $('#lack_bag').show();
	 }, 500);*/

    //$('#fail').fadeIn();
});
