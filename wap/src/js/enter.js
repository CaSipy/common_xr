'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	$scope.phone="";
	$scope.yanzhengma="";
	$scope.Uname="";
	$scope.Pass="";
	$scope.username="";
	$scope.pwd="";
	$scope.code_state=true;
	$scope.code_time=60;
	$scope.authCode="";
	$scope.return_url="";
	$scope.get_code="获取验证码";
	var str = /^1(3|4|5|7|8)\d{9}$/;
	var PIDstr =/^[0-9]*$/;
	var timer;
	//忘记密码的定义
	$scope.forget_pwd="";
	$scope.pid="";

	console.log(json);
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url="https//:192.168.1.116/login/user/login.do"+init_param;

		$http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
        }, function errorCallback(data) {
            // 请求失败执行代码
        	console.log(222);
            console.log("error:"+data);

        });
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
		$scope.return_url=json.return_url;
	}




	
	//手机验证码登录
	$scope.checkCode=function(){
		console.log(123);
		if($scope.phone==''){
			$.toast("手机号不能为空", "forbidden");
		}else{
			if($scope.yanzhengma==''){
				$.toast("验证码不能为空", "forbidden");
			}else{
				var checkCode_url=$scope.json_config.project_url+"/master/checkCode.do";
				var json_param={};
				json_param['phone']=$scope.phone;
				json_param['code']=$scope.yanzhengma;
				$http({
					method: 'post',
					url: checkCode_url,
					data: $.param(json_param),
					headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					// 判断成功状态
					if(-1==data.data.err_code){
//		        		成功
						$.toast("验证成功",2000);
						location.href=$scope.json_config.project_url+"/master/enterInfo.do";
					}else{
						$.toast(data.data.err_msg,"forbidden");
					}
				}, function errorCallback(data) {
					// 请求失败执行代码
					console.log("error:"+data);

				});
			}
		}

	}


	
	//----------------------获取验证码区-------------------------
	//	登录点击获取验证码
	$scope.login_Code=function(){
		if($scope.code_state == true) {
			if($scope.phone == '') {
				$.toast("手机号不能为空", "forbidden");
				$scope.code_state = true;
				return false;
			} else if(!str.test($scope.phone)) {
				$.toast("手机格式不正确", "forbidden");
				$scope.code_state = true;
				return false;
			} else {
				var code_url =$scope.json_config.project_url + '/master/sendCode.do';
				var json_param = {};
				json_param['phone'] = $scope.phone;
				json_param['action'] = "enter";
				$http({
					method: 'post',
					url: code_url,
					data: $.param(json_param),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					if(data.data.err_code==-1){
						$.toast('获取验证码成功');
						timer = $interval(function() {
							if($scope.code_time == 0) {
								$interval.cancel(timer);
								$scope.get_code = "获取验证码";
								$scope.code_state = true;
								$scope.code_time = 60;
							} else {
								$scope.code_time--;
								$scope.get_code = $scope.code_time + 's';
								$scope.code_state = false;
							}
						}, 1000);
					}else{
						$.toast(data.data.err_msg,'text');
					}
//					传过来的验证码写在$scope.authCode=xxx 为了前面不报错 我先注释了下面的 使用请解开;
//					$scope.authCode=;

				}, function errorCallback(data) {
					// 请求失败执行代码
					console.log("error:" + data);

				});

			}
		} else {
			$.toast($scope.get_code + '秒后可重新获取','text');
			return false;
		}
			
	}
	
});
