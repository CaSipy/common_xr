'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl', function($scope, $http, $filter) {
		var star_index = 5;
		$scope.master_mobile = "";
		$scope.master_name = "";
		$scope.content = "";
		$scope.estimate_level = "";
		
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
	        }, function errorCallback(data) {
	            // 请求失败执行代码
	        	$.toast("系统繁忙，请稍后再试","cancel");

	        });
		}else{
			$scope.master_name = json.data.master_name;
			$scope.master_mobile = json.data.master_mobile;
			$scope.content = json.data.content;
			$scope.estimate_level = json.data.estimate_level;
		}
		
		$scope.star=function (o){
			star_index = o;
		}
		
		$scope.save=function(){
			//更新
			if(json.update){
			var url = "updateEstimate.do";
			var json_param={};
			json_param["order_id"]=json.data.id;
			json_param["estimate_level"]=star_index;
			json_param["content"]=$scope.content;
			$http({
	            method: 'post',
	            url: url,
	            data:$.param(json_param),
	            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	        }).then(function successCallback(data) {
	            // 请求成功执行代码
	        	$.toast("修改成功");
	        	setTimeout(function(){    
	        	      window.location.href="../orderService/orderList.do";
	        	   }, 2000);
	        }, function errorCallback(data) {
	            // 请求失败执行代码
	        	$.toast("系统繁忙，请稍后再试","cancel");
	        });
			//插入
			}else{
				var url = "insertEstimate.do";
				var json_param={};
				json_param["order_id"]=json.data.id;
				json_param["estimate_level"]=star_index;
				json_param["content"]=$scope.content;
				$http({
		            method: 'post',
		            url: url,
		            data:$.param(json_param),
		            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		        }).then(function successCallback(data) {
		            // 请求成功执行代码
		        	$.toast("评价成功");
		        	setTimeout(function(){    
		        	      window.history.go(-1);
		        	   }, 2000);
		        }, function errorCallback(data) {
		            // 请求失败执行代码
		        	$.toast("系统繁忙，请稍后再试","cancel");
		        });
		    }
		}
});
