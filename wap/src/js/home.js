'use strict';
// angular的js
var kmy_app = angular.module('app', []);
var mySwiper = new Swiper(".swiper-container", {
	direction : "horizontal",
	/* 横向滑动 */
	loop : true,
	/* 形成环路（即：可以从最后一张图跳转到第一张图 */
	pagination : ".swiper-pagination",
	/* 分页器 */
	prevButton : ".swiper-button-prev",
	/* 前进按钮 */
	nextButton : ".swiper-button-next",
	/* 后退按钮 */
	autoplay : 3000
/* 每隔3秒自动播放 */
});

kmy_app
		.controller(
				'ctrl',
				function($scope, $http, $filter) {
					/**
					 * 获取json数据,服务器返回用来初始化页面的
					 */
					if ($.isEmptyObject(json)) {
						var init_param = "?is_json=2";
						var init_url = project_url + "/home/home.do"
								+ init_param;
						$http(
								{
									method : 'post',
									url : init_url,
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								})
								.then(
										function successCallback(data) {
											// 请求成功执行代码

											json = data.data;
											$scope.json = data.data;
											$scope.json_config = data.data.json_config;
											// 初始化赋值:1、导航列表初始化化，2，首页推荐列表初始化

											// 初始化赋值
											$scope.announcement = json.notices.length > 0 ? json.notices[0].name
													: "";
											$scope.leftfig = json.leftfig;
											$scope.leftp = json.leftp;
											$scope.leftImg = json.leftImg;
										}, function errorCallback(data) {
											// 请求失败执行代码
											console.log("error:" + data);
										});
					} else {
						$scope.chose = -1;
						$scope.json = json;
						$scope.json_config = json.json_config;

						$scope.announcement = json.notices.length > 0 ? json.notices[0].name
								: "";
						$scope.leftfig = json.leftfig;
						$scope.leftp = json.leftp;
						$scope.leftImg = json.leftImg;
					}

					$scope.home_ser = function() {
						window.location.href = project_url + "/home/select.do";
					};

					$scope.toAnnouncement = function() {
						var url = json.notices.length > 0 ? (json.notices[0].url == "0" ? (project_url
								+ (json.notices[0].is_has_app == "1" ? "/"
										+ json.notices[0].app_name : "") + "/" + json.notices[0].module_action_param)
								: json.notices[0].url)
								: "script:void()";
						window.location.href = url;
					};

					$scope.toDealDetail = function(id) {
						var url = typeof (id) == 'undefined' ? "script:void()"
								: project_url
										+ "/xiaoerDeal/getDealDetail.do?id="
										+ id;
						window.location.href = url;
					};

					$scope.toDealType = function(id) {
						var url = typeof (id) == 'undefined' ? "script:void()"
								: project_url + "/xiaoerDeal/all.do#tab" + id;
						window.location.href = url;
					};

					$scope.toSwiper = function(id) {
						var url = typeof (id) == 'undefined' ? "script:void()"
								: id;
						window.location.href = url;
					};

					/**
					 * 拼接地址
					 */
					$scope.combineUrl = function(url, app_module_action_param) {
						if (url == "") {
							var return_url = $scope.json_config.domain_url
									+ "/" + app_module_action_param;
							return return_url;
						} else {
							return url;
						}
					};

					/**
					 * 当前地址是否是当前页面
					 */
					$scope.is_pre_url = function(url, app_module_action_param) {
						var return_url = url;
						if (url == "") {
							return_url = $scope.json_config.domain_url + "/"
									+ app_module_action_param;
						}
						if (return_url == $scope.json_config.pre_url) {
							return true;
						} else {
							return false;
						}
					};
				});