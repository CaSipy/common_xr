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
            console.log("error:"+data);

        });
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
		$scope.return_url=json.return_url;
	}

	//状态切换
	var $time_box = $('#time_box');
	var $iosMask = $('#iosMask');
	var $cancel = $('#cancel');
	var $phone = $('#phone');
	var $number = $('#number');
	var $register = $('#register');
	$scope.more=function() {
		$time_box.css('visibility','visible');
		$iosMask.css('visibility','visible');
		$time_box.css('opacity',1);
		$iosMask.css('opacity',1);
	}
	$iosMask.click(function () {
		$time_box.css('opacity',0);
		$time_box.css('visibility','hidden');
		$iosMask.css('opacity',0);
		$iosMask.css('visibility','hidden');
	});
	$scope.change_status=function(num){
		$time_box.css('visibility','hidden');
		$iosMask.css('visibility','hidden');
		$time_box.css('opacity',0);
		$iosMask.css('opacity',0);
		// $interval.cancel(timer);
		// $scope.code_state=true;
		// $scope.get_code="获取验证码";
		$('#show'+num).fadeIn().siblings().css('display','none');

	}


	//普通登录
	$scope.login=function(){
		if($scope.username==''){
			$.toast("账号不能为空", "forbidden");
		}else{
			if($scope.pwd==''){
				$.toast("密码不能为空", "forbidden");
			}else{
				var login_url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_login+"/user/dologin.do?is_json=2";
				var json_param={};
				json_param['username']=$scope.username;
		        json_param['pwd']=$scope.pwd;
				$http({
		            method: 'post',
		            url: login_url,
		            data: $.param(json_param),
		            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		        }).then(function successCallback(data) {
		            // 请求成功执行代码
					// 判断成功状态
		        	if(-1==data.data.err_code){
//		        		成功
		        		$.toast("登录成功",2000);
		        		location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_weixin+"/userCenter/index.do";
		        	}else{
		        		$.toast("账号密码错误","forbidden");
		        	}
		        }, function errorCallback(data) {
		            // 请求失败执行代码
		            console.log("error:"+data);

		        });
			}
		}
		
	}
	//手机验证码登录
	$scope.phone_login=function(){
		if($scope.phone==''){
			$.toast("手机号不能为空", "forbidden");
		}else{
			if($scope.yanzhengma==''){
				$.toast("验证码不能为空", "forbidden");
			}else{
				var login_url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_login+"/user/dophlogin.do?is_json=2";
				var json_param={};
				json_param['phone']=$scope.phone;
				json_param['sms_verify']=$scope.yanzhengma;
				$http({
					method: 'post',
					url: login_url,
					data: $.param(json_param),
					headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					// 判断成功状态
					if(-1==data.data.err_code){
//		        		成功
						$.toast("登录成功",2000);
						location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_weixin+"/userCenter/index.do";
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

	//点击注册跳转
	$scope.skip=function(){
		location.href=$scope.json_config.project_url+"/user/register.do";
	}
	//注册
    $scope.register=function(){
    	if($scope.phone==''){
			$.toast("手机号不能为空", "forbidden");
			return false;
		}else if(!str.test($scope.phone)){
			$.toast("手机格式不正确", "forbidden");
			return false;
		}else{
			if($scope.yanzhengma==''){
				$.toast("验证码不能为空", "forbidden");
				return false;
			}else {
				if($scope.Uname == '') {
					$.toast("昵称不能为空", "forbidden");
					return false;
				} else {
					if($scope.Pass == '') {
						$.toast("密码不能为空", "forbidden");
						return false;
					} else {
						if($scope.pid != '' && !PIDstr.test($scope.pid)){
							$.toast("推荐人ID必须是数字格式", "forbidden");
						}else{
							var register_url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_login+'/user/doregister.do';
							var json_param={};
							console.log(register_url);
							json_param['phone']=$scope.phone;
							json_param['yanzhengma']=$scope.yanzhengma;
							json_param['Uname']=$scope.Uname;
							json_param['pid']=$scope.pid;
							json_param['Pass']=$scope.Pass;

							$http({
								method: 'post',
								url: register_url,
								data:$.param(json_param),
								headers:{'Content-Type': 'application/x-www-form-urlencoded'}

							}).then(function successCallback(data) {
								// 请求成功执行代码
								if(-1==data.data.err_code){
									window.location.href=$scope.json_config.project_url+"/user/login.do";
								}else{
									$.toast(data.data.err_msg);
								}

							}, function errorCallback(data) {
								// 请求失败执行代码
								console.log("error:"+data);

							});
						}
					}
				}
			}
		}

    }
	//重置密码
	$scope.getback=function(){
		if($scope.phone==''){
			$.toast("手机号不能为空", "forbidden");
			return false;
		}else if(!str.test($scope.phone)){
			$.toast("手机格式不正确", "forbidden");
			return false;
		}else{
			if($scope.yanzhengma==''){
				$.toast("验证码不能为空", "forbidden");
				return false;
			}else{

					if($scope.forget_pwd == '') {
						$.toast("密码不能为空", "forbidden");
						return false;
					} else {
							var register_url= $scope.json_config.project_url+'/user/doReset.do';
							var json_param={};
							json_param['phone']=$scope.phone;
							json_param['yanzhengma']=$scope.yanzhengma;
							json_param['Pass']=$scope.forget_pwd;

							$http({
								method: 'post',
								url: register_url,
								data:$.param(json_param),
								headers:{'Content-Type': 'application/x-www-form-urlencoded'}

							}).then(function successCallback(data) {
								// 请求成功执行代码
								if(-1==data.data.err_code){
									window.location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_admins+"/index/index.do";
								}else{
									$.toast(data.data.err_msg,'text');
								}

							}, function errorCallback(data) {
								// 请求失败执行代码
								console.log("error:"+data);

							});

				}
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
				var code_url =$scope.json_config.project_url + '/user/sendphCode.do';
				var json_param = {};
				json_param['phone'] = $scope.phone;
				json_param['action'] = "login";
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
	//	注册点击获取验证码
	$scope.register_Code=function(){
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
				var code_url = $scope.json_config.project_url + '/user/sendphCode.do';
				var json_param = {};
				json_param['phone'] = $scope.phone;
				json_param['action'] = "register";
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
	//	找回密码点击获取验证码
	$scope.getback_Code=function(){
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
				var code_url = $scope.json_config.project_url + '/user/sendphCode.do';
				var json_param = {};
				json_param['phone'] = $scope.phone;
				json_param['action'] = "reset";
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

				}, function errorCallback(data) {
					// 请求失败执行代码
					console.log("error:" + data);

				});

			}
		}
		else {
			$.toast($scope.get_code + '秒后可重新获取','text');
			return false;
		}

	}
	//	绑定手机点击获取验证码
	$scope.banding_Code=function(){
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
				var code_url = $scope.json_config.project_url + '/user/sendphCode.do';
				var json_param = {};
				json_param['phone'] = $scope.phone;
				json_param['action'] = "phbind";
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
		}
		else {
			$.toast($scope.get_code + '秒后可重新获取','text');
			return false;
		}

	}
	//绑定手机号
	$scope.binding=function(){
//  	判断
		if($scope.phone==''){
			$.toast("手机号不能为空", "text");
			return false;
		}else if(!str.test($scope.phone)){
			$.toast("手机格式不正确", "text");
			return false;
		}else{
				// if($scope.Uname == '') {
				// 	$.toast("昵称不能为空", "forbidden");
				// 	return false;
				// } else {
				// 	if($scope.Pass == '') {
				// 		$.toast("密码不能为空", "forbidden");
				// 		return false;
				// 	} else {

						var register_url=$scope.json_config.project_url+'/user/bindph.do';
						var json_param={};
						json_param['phone']=$scope.phone;
						json_param['yanzhengma']=$scope.yanzhengma;
						// json_param['Uname']=$scope.Uname;
						// json_param['Pass']=$scope.Pass;
						json_param['return_url']=$scope.return_url;

						$http({
							method: 'post',
							url: register_url,
							data:$.param(json_param),
							headers:{'Content-Type': 'application/x-www-form-urlencoded'}

						}).then(function successCallback(data) {
							// 请求成功执行代码
							if(-1==data.data.err_code){
								window.location.href=$scope.return_url;
							}else{
								$.toast(data.data.err_msg);
							}

						}, function errorCallback(data) {
							// 请求失败执行代码
							console.log("error:"+data);

						});
					}
				// }

		// }

	}
});
