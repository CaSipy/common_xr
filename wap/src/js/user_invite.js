'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	$scope.Code_title="微信注册";
	$scope.userImg_url="";	//头像链接
	$scope.user_name="";	//用户名
	$scope.user_num="";		//用户id
	$scope.Code_url="";		//二维码链接
	$scope.btn_html="APP注册";
	$scope.str=1;	//判断微信注册还是app注册
	$scope.show="false";		//接受值判断是否显示二维码，如果为false，则提示用户升级为vip才能推广
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	var init_param="?is_json=2";
	var app_url="app.do";
	var weixin_url="qrcode.do";
	if($.isEmptyObject(json)){
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url=weixin_url+init_param;
		var json_param = {};
		//传递3个值 是否为vip 用户名 id
		json_param['user_name'] = $scope.user_name;
		json_param['user_num'] = $scope.user_num;
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
//          获取值传递
			$scope.show==json.show;	
            $scope.userImg_url=json.vo.user_pic;
			$scope.user_name=json.vo.user_name;
			$scope.user_num=json.id;
			$scope.Code_url=json.poster_url;
			
        }, function errorCallback(data) {
            // 请求失败执行代码
            //console.log("error:"+data);
            $scope.show=="false";	
            $scope.userImg_url="";
			$scope.user_name="";
			$scope.user_num="";
			$scope.Code_url="";
        });
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
		//初始化需要的参数
		$scope.show==json.show;	
        $scope.userImg_url=json.vo.user_pic;
		$scope.user_name=json.vo.user_name;
		$scope.user_num=json.id;
		$scope.Code_url=json.poster_url;
	}
//	点击判断传递什么
	$scope.change = function() {
		//console.log($scope.Code_url);
		var change_url="";
		if($scope.btn_html=="微信注册"){
			$scope.btn_html="APP注册";
			$scope.Code_title = "微信注册";
			change_url=weixin_url+init_param;
		}else{
			$scope.btn_html="微信注册";
			$scope.Code_title = "APP注册";
			change_url=app_url+init_param;
		}
		$http({
			method: 'post',
			url: change_url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			// 请求成功执行代码
			// 判断成功状态
			$scope.show==data.data.show;	
            $scope.userImg_url=data.data.vo.user_pic;
			$scope.user_name=data.data.vo.user_name;
			$scope.user_num=data.data.id;
			//console.log(data.data.poster_url);
			$scope.Code_url=data.data.poster_url;
		}, function errorCallback(data) {
			// 请求失败执行代码
			//console.log("error:" + data);
			$scope.show=="false";	
            $scope.userImg_url="";
			$scope.user_name="";
			$scope.user_num="";
			$scope.Code_url="";
		});
	}
	
});