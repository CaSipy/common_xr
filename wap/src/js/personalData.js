'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('edit_info_ctrl',function($scope,$http,$interval){
	$scope.user_name="";
	$scope.bank_name="";
	$scope.bank_card="";
	$scope.account_name="";
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		var url="index.do";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url=url+init_param;

		$http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
            $scope.user_name=json.userinfo.user_name;
            $scope.bank_name=json.withdrawinfo.bank_name;
			$scope.bank_card=json.withdrawinfo.bank_card;
			$scope.account_name=json.withdrawinfo.account_name;
        }, function errorCallback(data) {
            // 请求失败执行代码
        	$scope.user_name="";
        	$scope.bank_name="";
        	$scope.bank_card="";
        	$scope.account_name="";

        });
	}else{
		$scope.user_name=json.userinfo.user_name;
        $scope.bank_name=json.withdrawinfo.bank_name;
		$scope.bank_card=json.withdrawinfo.bank_card;
		$scope.account_name=json.withdrawinfo.account_name;
	}
			
	$scope.save=function(){
//		银行卡正则
		var rebankcard = /^(\d{16}|\d{19})$/;
		if($scope.bank_card==''){
			$.toast("请填写银行卡账号", "forbidden");
			return false;
		}else if(!rebankcard.test($scope.bank_card)){
			console.log($scope.bank_card);
			$.toast("银行卡号的格式不正确", "forbidden");
			return false;
		}else{
		var url="updateBank.do";
		var json_param={};
        json_param['user_name']=$scope.user_name;
        json_param['bank_name']=$scope.bank_name;
        json_param['bank_card']=$scope.bank_card;
        json_param['account_name']=$scope.account_name;
		$http({
            method: 'post',
            url: url,
            data:$.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
        	if(-1==data.data.err_code){
        		$.toast("保存成功",2000);
        		location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_weixin+"/userCenter/index.do";
        	}else{
        		$.toast(data.data.err_msg,"forbidden");
        	}
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);
            $.toast("保存失败","forbidden");
        });
		}
	}
	//编辑窗口切换
	$scope.switchnew=function (url) {
		window.location.replace(url);
	}
	/*$scope.compile=function(){
		alert('1');
		window.location.href="http://static.huibaoming.cn/wap/userCenter/editData_test.html";
	}*/
});
$(function(){
	//--修改密码页面------------------------
	$("input[name='checkbox_on']").click(function(){
		if($(this).is(':checked')){
			$("#new_pass").attr('type','text');
		}else{
			$("#new_pass").attr('type','password');
		}
	});
	//	密码开关
	$("input[name='re_checkbox_on']").click(function(){
		if($(this).is(':checked')){
			$("#re_new_pass").attr('type','text');
		}else{
			$("#re_new_pass").attr('type','password');
		}
	});
});
//用户资料页的控制器
kmy_app.controller('user_info_ctrl',function($scope,$http,$interval){
	$scope.user_name="";	//用户名
	$scope.up_name="";		
	$scope.code="";		
	$scope.phone="";
	$scope.user_group="";	
	$scope.bank_name="";
	$scope.bank_card="";
	$scope.account_name="";
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	var init_param="?is_json=2";
	var url="index.do";
	if($.isEmptyObject(json)){
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url=url+init_param;
		var json_param = {};
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
			json=data.data;
			$scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
			$scope.user_name=json.userinfo.user_name;	//用户名
			$scope.up_name=json.up_name;		
			$scope.code=json.userinfo.user_id;		
			$scope.phone=json.userinfo.mobile;
			$scope.user_group=json.user_group;	
			$scope.bank_name=json.withdrawinfo.bank_name;
			$scope.bank_card=json.withdrawinfo.bank_card;
			$scope.account_name=json.withdrawinfo.account_name;
        }, function errorCallback(data) {
        	$scope.user_name="";	//用户名
        	$scope.up_name="";		
        	$scope.code="";		
        	$scope.phone="";
        	$scope.user_group="";	
        	$scope.bank_name="";
        	$scope.bank_card="";
        	$scope.account_name="";
        });
	}else{
		$scope.user_name=json.userinfo.user_name;	//用户名
		$scope.up_name=json.up_name;		
		$scope.code=json.userinfo.user_id;		
		$scope.phone=json.userinfo.mobile;
		$scope.user_group=json.user_group;	
		$scope.bank_name=json.withdrawinfo.bank_name;
		$scope.bank_card=json.withdrawinfo.bank_card;
		$scope.account_name=json.withdrawinfo.account_name;
	}
});
//修改密码页的控制器
kmy_app.controller('edit_pass_ctrl',function($scope,$http,$interval){
	$scope.old_pass="";	
	$scope.new_pass1="";		
	$scope.new_pass2="";
	
	$scope.code_state=true;
	$scope.getCode="获取验证码";
	$scope.yanzhengma="";	
	$scope.new_pw="";
	$scope.re_pw="";
	$scope.code_time=60;
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	var init_param="?is_json=2";
	var url="updatePass.do";
	if($.isEmptyObject(json)){
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url=url+init_param;
		var json_param = {};
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
			json=data.data;
			$scope.json=data.data;
            $scope.json_config=json.json_config;
            
            $scope.old_pass="";
        }, function errorCallback(data) {
        	 $scope.old_pass="";
        });
	}else{
		
		$scope.json=json;
		$scope.json_config=json.json_config;
		$scope.old_pass="";
//		$scope.new_pass1="1";
//		$scope.new_pass2="2";
	}
	$scope.Code = function() {
		
		if($scope.code_state == true) {
			console.log($scope.json_config);
			var code_url = $scope.json_config.project_url + '/userInfo/sendphCode.do';
			var json_param = {};
			console.log(code_url);
			$http({
				method: 'post',
				url: code_url,
				data: $.param(json_param),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function successCallback(data) {
				// 请求成功执行代码
				var timer = $interval(function() {
					if($scope.code_time == 0) {
						$interval.cancel(timer);
						$scope.getCode = "获取验证码";
						$scope.code_state = true;
						$scope.code_time = 60;
					} else {
						$scope.code_state = false;
						$scope.code_time--;
						$scope.getCode = $scope.code_time + 's';
					}
				}, 1000);
				//					传过来的验证码写在$scope.authCode=xxx 为了前面不报错 我先注释了下面的 使用请解开;
				//					$scope.authCode=;
		
			}, function errorCallback(data) {
				// 请求失败执行代码
				console.log("error:" + data);
			});
		
		}else {
			return false;
		}
	}
	//点击保存的事件
	$scope.save=function(){
		var url="changePw.do";
		var json_param={};
        json_param['old_pw']=$scope.old_pass;
        json_param['new_pw']=$scope.new_pass1;
        json_param['re_pw']=$scope.new_pass2;
        json_param['is_json']=2;
        if($scope.new_pass1==''||$scope.new_pass2==''){
        	$.toast("新密码不能为空","forbidden");
        	return;
        }else if($scope.new_pass1!=$scope.new_pass2){
        	$.toast("两次新密码输入不一致","forbidden");
        	return;
        }
		$http({
            method: 'post',
            url: url,
            data:$.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
        	if(-1==data.data.err_code){
        		$.toast("保存成功",2000);
        		location.href=json.json_config.domain_url+"/"+json.json_config.project_name_weixin+"/userCenter/index.do";
        	}else{
        		$.toast(data.data.err_msg,"forbidden");
        	}
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);
            $.toast("保存失败","forbidden");
        });
	}
	//点击保存的事件
	$scope.uPbysave=function(){
		
		var url="changePwByMobile.do";
		var json_param={};
        
        json_param['new_pw']=$scope.new_pw;
        json_param['re_pw']=$scope.re_pw;
        json_param['yanzhengma']=$scope.yanzhengma;
//      json_param['is_json']=2;
		if($scope.yanzhengma==''){
			$.toast("验证码不能为空","forbidden");
		}else{
	        if($scope.new_pw==''||$scope.re_pw==''){
	        	$.toast("新密码不能为空","forbidden");
	        	return;
	        }else if($scope.new_pw!=$scope.re_pw){
	        	$.toast("两次新密码输入不一致","forbidden");
	        	return;
	        }
			$http({
	            method: 'post',
	            url: url,
	            data:$.param(json_param),
	            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	        }).then(function successCallback(data) {
	            // 请求成功执行代码
	        	if(-1==data.data.err_code){
	        		$.toast("保存成功",2000);
	        		location.href=json.json_config.domain_url+"/"+json.json_config.project_name_weixin+"/userCenter/index.do";
	        	}else{
	        		$.toast(data.data.err_msg,"forbidden");
	        	}
	        }, function errorCallback(data) {
	            // 请求失败执行代码
	            console.log("error:"+data);
	            $.toast("保存失败","forbidden");
	        });
        }
	}
	//编辑窗口切换
	$scope.switchnew=function (url) {
		window.location.replace(url);
	}
});
