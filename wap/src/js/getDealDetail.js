'use strict';
// angular的js
var kmy_app = angular.module('app', [ 'ui.angularSku' ]);

$('.classify_nav li').each(function() {
	$(this).click(function() {
		var base = $(this).data('base');
		$(this).addClass('active').siblings().removeClass('active');
		if (base == 1) {
			$('.base1').removeClass('hide');
			$('.base2').addClass('hide');
		} else {
			$('.base1').addClass('hide');
			$('.base2').removeClass('hide');
		}
	});
});

kmy_app.controller('ctrl',function($scope, $http, $filter) {
					$scope.num = 1;// 购买数量
					$scope.price = "";// 弹窗会变的价格
					$scope.number = "";// 弹窗会变的库存
					$scope.shopcar_num = 0;// 购物车
					/**
					 * 获取json数据,服务器返回用来初始化页面的
					 */
					if ($.isEmptyObject(json)) {
						var init_param = "?is_json=2";
						var init_url = project_url + "/deal/getDealDetail.do"
								+ init_param;
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
						}, function errorCallback(data) {
							// 请求失败执行代码
							console.log("error:" + data);
						});
					} else {
						// 初始化赋值
						$scope.json = json;
						$scope.json_config = json.json_config;
						$scope.price = json.detail.price;
						$scope.number = json.detail.number;
						$("#desciption").html(json.detail.desciption);
						
						$scope.shopcar_num = json.shopCount > 99 ? '99+'
								: json.shopCount;
						/*$scope.skuInfo = json.skuInfo;
						if (json.attr_list.length == 0) {
							$scope.add_type = true;
							$scope.attribute_value = "";
						}*/
					}
					$(window).scroll(function(){
						// 滚动条距离顶部的距离 大于 200px时
						if($(window).scrollTop() >= 500){
							$('.back_top').css('opacity','1');
							// }
						} else{
							$('.back_top').css('opacity','0');
						}
					});
					$scope.back_top=function () {
						$('body').animate({"scrollTop":0},500);
					}
					// 弹窗选择颜色大小
					$scope.pop = function() {
						$("#about").popup();
					};
					function close(obj) {
						$.closePopup();
					}
					// 加入购物车，需要判断是否选了样式
					$scope.shop = function(position) {
						$.closePopup();
						if (position == 'inner'){
							var json_param = {};
							json_param['deal_id'] = $scope.json.detail.id;
							json_param['number'] = $scope.num;
							$http({
								method : 'post',
								url : $scope.json_config.project_url
										+ "/haivitShopCart/create.do",
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded'
								},
								data : $.param(json_param)
							}).then(function successCallback(data) {
								if (data.data.err_code == -1)
									$.toast("加入购物车成功！");
								else
									$.toast("加入失败，请重试！", "text");
							}, function errorCallback(data) {
								console.log(data);
								$.toast("请求出错，请检查网络或重试！", "text");
							});
						}else
							$("#about").popup();
					};
					// 直接购买，需要判断是否选了样式
					$scope.buy = function(position) {
						$.closePopup();
						if (position == 'inner'){
							var json_param = {};
							json_param['deal_id'] = $scope.json.detail.id;
							json_param['number'] = $scope.num;
							$http({
								method : 'post',
								url : $scope.json_config.project_url
										+ "/haivitShopCart/create.do",
								data : $.param(json_param),
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded'
								}
							}).then(function successCallback(data) {
								if (data.data.err_code == -1)
									location = $scope.json_config.project_url
											+ "/haivitShopCart/settleCart.do";
								else
									$.toast("购买失败，请重试！","text");
							},function errorCallback(data) {
								$.toast("请求出错，请检查网络或重试！","text");
							});
						}else
							$("#about").popup();
					};
					// 添加数量
					$scope.add = function() {
						if ($scope.num < $scope.number) {
							$scope.price = ($scope.price / $scope.num * ($scope.num + 1))
									.toFixed(2);
							$scope.num++;
						}
					};
					// 减少数量
					$scope.pre = function() {
						if ($scope.num > 1) {
							$scope.price = ($scope.price / $scope.num * ($scope.num - 1))
									.toFixed(2);
							$scope.num--;
						}
					};
				});