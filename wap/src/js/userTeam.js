'use strict';
//angular的js
var kmy_app=angular.module('app',[]);
var pageSize=1;

kmy_app.controller('ctrl',function($scope,$http,$interval){
	$scope.teamUser={};//团队成员
	$scope.flagNum=1;//查询的级数
	$scope.absPage=1;//要查询的页数
	$scope.pageSize=10;//每页（每次加载）显示的数成员数
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	var init_param="?is_json=2&flagNum=1";
	var url="index.do";
	if($.isEmptyObject(json)){
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url=url+init_param;
		//要传的参数
		var json_params = {};
		json_params['flagNum']=$scope.flagNum;
		json_params['absPage']=$scope.absPage;
		json_params['pageSize']=$scope.pageSize;
		console.log(json_params);
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
        	console.log(data);
//            json=data.data;
//            $scope.json=data.data;
//            $scope.json_config=data.data.json_config;
			//获取数据
            $scope.teamUser=json.teamUser;
        }, function errorCallback(data) {
            // 请求失败执行代码
        	 $scope.teamUser={};
 			$.toast("网络错误，无法获取数据","forbidden");
        });
	}else{
		console.log(json);
		
		$scope.json=json;
		$scope.json_config=json.json_config;
		$scope.num=json.num;
		//获取数据
		$scope.teamUser=json.teamUser;
	}
//	点击判断传递什么
	$scope.getMore = function(flagNum) {
		var url="index.do?is_json=2";
		//要传的参数
		var json_param = {};
//		$scope.absPage+=1;
		json_param['flagNum']=flagNum;
		json_param['absPage']=$scope.absPage;
		json_param['pageSize']=$scope.pageSize;
		$http({
			method: 'post',
			url: url,
			data: $.param(json_param),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			// 请求成功执行代码
				console.log(data);
			  $scope.teamUser=data.data.teamUser;
			  $scope.num=data.data.num;
			  $scope.flagNum=data.data.flagNum;
		}, function errorCallback(data) {
			// 请求失败执行代码
			 $scope.teamUser={};
			$.toast("网络错误，无法获取数据","forbidden");
		});
	}
	
});
$(function(){
	$('.classify_nav').children('ul').children('li').click(function() {

		$(this).addClass('nav_li_checked').siblings().removeClass('nav_li_checked');
		var base = $(this).data('base');
		$('#'+base).removeClass('hide').siblings("div").addClass('hide ');
	});
});