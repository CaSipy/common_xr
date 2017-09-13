'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl', function($scope, $http, $filter) {
	/**
	 * 获取json数据,服务器返回用来初始化页面的
	 */
	$scope.find = "";
	if ($.isEmptyObject(json)) {
		var init_param = "?is_json=2";
		var init_url = project_url + "/home/select.do" + init_param;
		$http({
			method : 'post',
			url : init_url,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			// 请求成功执行代码

			json = data.data;
			$scope.json = data.data;
			$scope.json_config = data.data.json_config;
			// 初始化赋值:1、导航列表初始化化，2，首页推荐列表初始化
			// 初始化赋值
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
		});
	} else {
		$scope.chose = -1;
		$scope.json = json;
		$scope.json_config = json.json_config;
	}
	
	$scope.toDealDetail = function(id) {
		var url = typeof (id) == 'undefined' ? "script:void()"
				: id;
		window.location.href = url;
	};
	
	$scope.toMasterDetail = function(id) {
		var url = typeof (id) == 'undefined' ? "script:void()"
				: id;
		window.location.href = url;
	};

	$scope.search = function() {
		var init_param = "?is_json=2";
		var select_url = project_url + "/home/select.do" + init_param;
		var json_param = {};
		json_param['search'] = $scope.find;
		$http({
			method : 'post',
			url : select_url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			console.log(data);
			$scope.json = data.data;
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
		});
	}
});