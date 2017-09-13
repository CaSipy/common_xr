'use strict';
// angular的js
$('#title_msg').children('li').css({
	height : $('#box_title').height(),
	lineHeight : $('#box_title').height() + 'px'
});
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl', function($scope, $http, $filter, $interval,$timeout) {
	$scope.nav_data = {};// 导航列表
	$scope.home_data = {};// 首页推荐列表
	$scope.type_data = {};// 分类商品列表
	$scope.swiper_data = {};// 分类商品列表

	// 页面要渲染的数据进行变量定义

	$scope.id = "";
	$scope.type_id = "-1";
	$scope.supplier_id = "-1";
	$scope.is_effect = "-1";
	$scope.is_allow = "-1";
	$scope.chose = 0;
	$scope.page = 2;
	$scope.has_data = true;
	$scope.tab = -1;
	var s = 0, lenght = 1;
	$scope.nav_list = [];
	/**
	 * 获取json数据,服务器返回用来初始化页面的
	 */

	if ($.isEmptyObject(json)) {
		var init_param = "?is_json=2";
		var init_url = project_url + "/deal/index.do" + init_param;
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
		$scope.deal_list = json.deal_list;

		var url = domain_url + "/" + json.json_config.project_name_weixin
			+ "/cM_Ads/getAds.do";
		var json_param = {};
		json_param['page'] = 'haivit_deal_index';
		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			$scope.ads = data.data.advertisements;
			$scope.swipers = data.data.advertisements['swiper'];
			$scope.swiper_data=$scope.swipers;
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});

		url = domain_url + "/" + json.json_config.project_name_weixin
			+ "/cM_Article/getArticles.do";
		json_param = {};
		json_param['menu_id'] = 0;
		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			$scope.notices = data.data.articles;
			var s = 0, lenght = -$scope.notices.length;
			var h = $('#box_title').height();
			$('.nav_form_title').height(h);

			$interval(function() {
				s--;
				if (s <= lenght) {
					s = 0;
					$('#title_msg').css({
						'top' : '0rem'
					});
				} else {
					$('#title_msg').animate({
						'top' : s * h
					});
				}
			}, 2000);
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	}

	// 列表导航栏
	$scope.nav_click = function(index) {
		$scope.tab = index;
		$scope.page = 1;
		$scope.has_data = true;
		inf_allow = false;

		$scope.doSearch(false);
		$('body').animate({"scrollTop":0},500);
		if ($scope.tab != -1) {
			var url = domain_url + "/" + json.json_config.project_name_weixin
				+ "/cM_Ads/getAds.do";
			var json_param = {};
			json_param['page'] = 'haivit_deal_index_type';
			json_param['pos'] = 'type_swiper';
			json_param['type'] = $scope.json.type_list[$scope.tab].id;
			$http({
				method : 'post',
				url : url,
				data : $.param(json_param),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successCallback(data) {
				$scope.swipers = data.data.advertisements['type_swiper'];
				var s='';
				for(var i=0;i<$scope.swipers.length;i++){
					s+='<div class="swiper-slide">'
						+'<img src='+$scope.swipers[i].pic_path+' style="width:100%;height:11rem" />'
						+'</div>';
				}
				$(".swiper-wrapper").html(s);
				mySwiper='';
				$timeout(function(){
					mySwiper = new Swiper(".swiper-container", {
						direction : "horizontal",/* 横向滑动 */
						loop : true,/* 形成环路（即：可以从最后一张图跳转到第一张图 */
						pagination : ".swiper-pagination",/* 分页器 */
						prevButton : ".swiper-button-prev",/* 前进按钮 */
						nextButton : ".swiper-button-next",/* 后退按钮 */
						autoplay : 3000,
						observer:true
						/* 每隔3秒自动播放 */
					});
					//mySwiper.update();
					$.hideLoading();
				},2000);

			}, function errorCallback(data) {
				// 请求失败执行代码
				console.log(data);
			});
		}else{
			var s='';
			for(var i=0;i<$scope.swiper_data.length;i++){
				s+='<div class="swiper-slide">'
					+'<img src='+$scope.swiper_data[i].pic_path+' style="width:100%;height:11rem" />'
					+'</div>';
			}
			$(".swiper-wrapper").html(s);
			mySwiper='';
			$timeout(function(){
				mySwiper = new Swiper(".swiper-container", {
					direction : "horizontal",/* 横向滑动 */
					loop : true,/* 形成环路（即：可以从最后一张图跳转到第一张图 */
					pagination : ".swiper-pagination",/* 分页器 */
					prevButton : ".swiper-button-prev",/* 前进按钮 */
					nextButton : ".swiper-button-next",/* 后退按钮 */
					autoplay : 3000,
					observer:true
					/* 每隔3秒自动播放 */
				});
				//mySwiper.update();
				$.hideLoading();
			},2000);
		}
	};

	// 公告栏
	$scope.toAd = function(ad) {
		var url = domain_url + "/" + json.json_config.project_name_weixin
			+ "/cM_Ads/increase.do";
		var json_param = {};
		json_param['id'] = ad.id;
		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});

		location.href = ad.url;
	};

	$scope.toArticle = function(id) {
		location.href = 'noticeDetail.do?id=' + id;
	};

	$scope.getDealDetail = function(id) {
		var submit_url = $scope.json_config.project_url + "/"
			+ $scope.json_config.module + "/getDealDetail.do";
		$scope.id = id;
		window.location.href = submit_url + "?id=" + id;
	};

	/**
	 * 拼接地址
	 */
	$scope.combineUrl = function(url, app_module_action_param) {
		if (url == "") {
			var return_url = $scope.json_config.domain_url + "/"
				+ app_module_action_param;
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

	/**
	 * 搜索
	 */
	$scope.doSearch = function(is_append) {
		var url = project_url + "/deal/index.do?is_json=2";
		var json_param = {};
		json_param['page'] = $scope.page;
		if ($scope.tab != -1) {
			json_param['type_id'] = $scope.json.type_list[$scope.tab].id;
		}

		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(
			function successCallback(data) {
				if (is_append) {
					if (data.data.deal_list.length > 0)
						$scope.deal_list.push.apply($scope.deal_list,
							data.data.deal_list);
					else {
						$scope.has_data = false;
					}
				} else {
					$scope.deal_list = data.data.deal_list;
					if (data.data.deal_list.length == 0)
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

	// 滚动加载
	var loading = false; // 状态标记
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
});