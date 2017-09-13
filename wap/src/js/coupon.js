'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl',function($scope, $http, $filter, $timeout) {
	$scope.page = 1;
	$scope.has_data = true;
	$scope.items = [{nav_name:"可用"},
	                {nav_name:"不可用"}];
	$scope.doSearch = function(is_append) {
		var url = project_url + "/" + module+ "/couponList.do?is_json=2";
		var json_param = {};
		json_param['pageSize'] = 10;
		json_param['page'] = $scope.page;
		json_param['tab'] = $scope.choose;

		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			if (is_append) {
				if (data.data.coupons.length > 0)
					$scope.cp_new.push.apply(
						$scope.cp_new,
						data.data.coupons);
				else
					$scope.has_data = false;
			} else {
				$scope.cp_new = data.data.coupons;
				if (data.data.coupons.length == 0)
					$scope.has_data = false;
			}

			$scope.page = $scope.page + 1;
			$.hideLoading();
			loading = false;
			inf_allow = true;
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	};
	// 点击头部导航事件
	// index= -1:可以使用   1:不可使用
	$scope.change = function(index) {
		var type = index;
		if(type == 0){
			type = -1;
		}
		$scope.page = 1;
		$scope.choose = index;
		$scope.has_data = true;
		//后台写交互时记得解开下面这个语句
		//$scope.doSearch(false);
		var url = project_url + "/" + module+ "/couponList.do?is_json=2&type="+type;
		$http({
			method : 'get',
			url : url,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			console.log(data);
			$scope.json = data;
			$scope.json_config = json.json_config;
			$scope.cp_new=data.data.coupons;
			console.log(data.data.coupons);
			
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	};

	/**
	 * 获取json数据,服务器返回用来初始化页面的
	 */
	if ($.isEmptyObject(json)) {
		//假数据
		$scope.nav={
			items:[
				{nav_name:"未使用",nav_num:3},
				{nav_name:"已使用",nav_num:6},
				{nav_name:"已过期",nav_num:9}
			],
			cp_new:[
				{money:100,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:111,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:222,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:333,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"}
			],
			cp_expired:[
				{money:100,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:111,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:222,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"},
				{money:333,title:"清洗空调1",time:"2012-12-12至2015-12-12",content:"满50元可用",limit:"只用于清洗空调"}
			],
		}
	} else {
		$scope.change(0);
	}

	// 滚动加载
	var loading = false; // 加载状态标记
	var inf_allow = true; // 是否允许触发下拉事件
	$(document.body).infinite().on("infinite", function() {
		if (loading || !$scope.has_data || !inf_allow)
			return;
		$('.loadMore').removeClass('hide');
		$.showLoading();
		loading = true;
		$scope.doSearch(true);
		$('.loadMore').addClass('hide');
	});
	
	$scope.toDetail = function(id) {
		// 跳转的路径
		window.location.href = 'couponDetail.do?id=' + id;
	};
});