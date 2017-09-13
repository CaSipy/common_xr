'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app
		.controller(
				'ctrl',
				function($scope, $http, $filter) {
					$scope.a_choose = 0;
					$scope.payment_id = 0;
					$scope.pageSize = 10;
					$scope.has_data = true;
					$scope.page = 2;
					/**
					 * 获取json数据,服务器返回用来初始化页面的
					 */
					$scope.init = function(order_status, is_json) {
						// 组装url与参数
						var init_url = project_url
								+ "/orderService/orderList.do";
						var json_param = {};
						json_param['tab'] = order_status;
						json_param['is_json'] = is_json;
						json_param['pageSize'] = $scope.pageSize;

						$.showLoading();
						$http(
								{
									method : 'post',
									url : init_url,
									data : $.param(json_param),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								}).then(function successCallback(data) {
							// 请求成功执行代码
							json = data.data;
							$scope.json = json;
							$scope.json_config = json.json_config;

							$scope.page = 2;
							$scope.has_data = true;

							$.hideLoading();

						}, function errorCallback(data) {
							// 请求失败执行代码
							console.log("error:" + data);
							$.hideLoading();
						});

					};
					if ($.isEmptyObject(json)) {
						$scope.init(0, -1, null);
					} else {
						$scope.json = json;
						$scope.json_config = json.json_config;
					}

					// 返回状态
					$scope.choseStatus = function(order_status) {
						$scope.a_choose = order_status;
						$scope.init(order_status, 1);
					};
					$scope.paystatus = function(pay_status, ser_status) {
						if (pay_status == 0) {
							if(ser_status == 4){
								return "已取消";
							}else{
								return "未支付";
							}
						} else {
							if (ser_status == 0) {
								return "未接单";
							} else if (ser_status == 1) {
								return "已接单";
							} else if (ser_status == 2) {
								return "服务中";
							} else if (ser_status == 3) {
								return "已完成";
							} else if (ser_status == 4) {
								return "已取消";
							}
						}
					};
					
					

					// 删除订单 没有这个接口
					$scope.delOrder = function(order_sn) {
						$
								.confirm({
									title : '删除订单',
									text : '确认删除该订单？',
									onOK : function() {
										// 点击确认
										// 组装url与参数
										var order_url = "del.do";
										var json_param = {};
										json_param['order_sn'] =order_sn;

										$.showLoading();
										$http(
												{
													method : 'post',
													url : order_url,
													data : $.param(json_param),
													headers : {
														'Content-Type' : 'application/x-www-form-urlencoded'
													}
												})
												.then(
														function successCallback(
																data) {
															// 请求成功执行代码
															$.hideLoading();
															if (data.data.err_code != -1) {
																$.toast(data.data.err_msg,"forbidden");
															} else {
																setTimeout(function(){
																	$scope.choseStatus(0);
																}, 3000);
																$.toast(data.data.err_msg);
															}
														},
														function errorCallback(
																data) {
															// 请求失败执行代码
															console
																	.log("error:"
																			+ data);
															$.hideLoading();

														});
									},
									onCancel : function() {
									}
								});
					};
					// 取消订单 退款???
					var $time_ser = $('#time_box');
					var $serIosMask = $('#iosMask');
					var $serCancel = $('#cancel');
					var $serSure = $('#sure');
					// 点击取消按钮 弹出取消理由
					$scope.pick_time = function(order_sn) {
						var article = json.tips.article;
						if(article == "" || article == null || json.tips == null){
							cancel2(order_sn);
						}else{
							$.alert(article,function(){
								cancel2(order_sn);
							});
						}
					};
					
					function cancel2(order_sn){
						$.prompt({
							  title: '取消订单',
							  text: '取消理由：',
							  input: '',
							  empty: false, // 是否允许为空
							  onOK: function (input) {
							    //点击确认
								  var pick_time = project_url + "/orderService/doCancel.do"; // 后台do????
									var json_param = {};
									json_param['order_sn']=order_sn;
									json_param['reason']=input;
									$.showLoading();
									$http(
											{
												method : 'post',
												url : pick_time,
												data : $.param(json_param),
												headers : {
													'Content-Type' : 'application/x-www-form-urlencoded'
												}
											}).then(function successCallback(data) {
										// 请求成功执行代码
												$.hideLoading();
												if (data.data == 0) {
													$.toast("取消失败，请联系客服",
															"forbidden");
												} else if(data.data == -1) {
													$.alert("取消成功");
													setTimeout(function(){
														$scope.choseStatus(0);
													}, 3000);
												}
										
									}, function errorCallback(data) {
										// 请求失败执行代码
										console.log("error:" + data);
										$.hideLoading();
									});
								},
								    onCancel: function () {
									    //点击取消
									}
								});
					}
					
					$scope.serIosMask = function(index) {
						$serIosMask.fadeOut();
						$time_ser.css('opacity', 0);
						$time_ser.css('visibility', 'hidden');
					};
					$scope.serCancel = function(index) {
						$serIosMask.fadeOut();
						$time_ser.css('opacity', 0);
						$time_ser.css('visibility', 'hidden');
					};
					$scope.serSure = function() {
						$serIosMask.fadeOut();
						$time_ser.css('opacity', 0);
						$time_ser.css('visibility', 'hidden');
						var order_url = project_url
								+ "/orderService/applyRefund.do" // 后台do????
						var json_param = {};
						json_param['order_sn'] = $scope.json.orderinfos[index].order_sn;
						json_param['result'] = $scope.result;
						$.showLoading();
						$http(
								{
									method : 'post',
									url : order_url,
									data : $.param(json_param),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								})
								.then(
										function successCallback(data) {
											// 请求成功执行代码

											$.hideLoading();
											if (data.data.err_code == 3001) {
												$.toast(data.data.err_code
														+ ":"
														+ data.data.err_msg,
														"forbidden");
											} else {
												$scope.json.orderinfos.orderinfos[index].delivery_status = 1;
												$.toast("申请成功，等待审核", "text");
												setTimeout(function(){
													$scope.choseStatus(0);
												}, 3000);
											}

										}, function errorCallback(data) {
											// 请求失败执行代码
											console.log("error:" + data);
											$.hideLoading();

										});
						

					};
					
					$scope.userConfirm = function(order_sn,order_id) {
						var article_finish = json.article_finish.article;
						if(article_finish == "" || article_finish == null || json.article_finish == null){
							userConfirm2(order_sn,order_id);
						}else{
							$.alert(article_finish,function(){
								userConfirm2(order_sn,order_id);
							});
						}
					};
					
					function userConfirm2(order_sn,order_id){
						$.confirm("确认完成？", function() {
							  //点击确认后的回调函数
							$serIosMask.fadeOut();
							$time_ser.css('opacity', 0);
							$time_ser.css('visibility', 'hidden');
							var order_url = $scope.json_config.project_url
									+ "/orderService/userConfirm.do" // 后台do????
							var json_param = {};
							json_param['order_sn'] =order_sn;
							$.showLoading();
							$http(
									{
										method : 'post',
										url : order_url,
										data : $.param(json_param),
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded'
										}
									})
									.then(
											function successCallback(data) {
												// 请求成功执行代码

												$.hideLoading();
												if (data.data.err_code == 3001) {
													$.toast(data.data.err_code
															+ ":"
															+ data.data.err_msg,
															"forbidden");
												} else {
													$.alert( data.data.err_msg);
													window.location.href="../estimate/index.do?order_id="+order_id;
												}

											}, function errorCallback(data) {
												// 请求失败执行代码
												console.log("error:" + data);
												$.hideLoading();

											});
							  }, function() {
							  //点击取消后的回调函数
							  });
					}
					
					//跳转评价
					$scope.estimate = function(id) {
						location.href = $scope.json_config.project_url+"/estimate/index.do?order_id="+id;
					};
					
					//继续支付
					$scope.rePayment = function(order_sn) {
						$.confirm("确认支付？", function() {
							  //点击确认后的回调函数
							location.href = $scope.json_config.project_url+"/orderService/rePayment.do?order_sn="+order_sn;
							  }, function() {
							  //点击取消后的回调函数
							  });
						
					};
					
					//确认完成
					$scope.userComfirm = function(order_sn) {

						$serIosMask.fadeIn();
						$time_ser.css('visibility', 'visible');
						$time_ser.css('opacity', 1);
						var url = project_url + "/orderService/userComfirm.do"; // 后台do????
						var json_param = {};
						json_param["order_sn"] = order_sn;
						$http({
									method : 'post',
									url : url,
									data : $.param(json_param),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
						}).then(function successCallback(data) {
							// 请求成功执行代码
							console.log("error:" + data);
							$.hideLoading();
//							data = $scope.json.xxx // 返回的取消订单的数据信息
//							$("#inline").picker({
//								container : '#picker-container',
//								title : "请选择您取消的理由",
//								cols : [ {
//									textAlign : 'center',
//									values : data
//								} ]
//							});
						}, function errorCallback(data) {
							// 请求失败执行代码
							console.log("error:" + data);
							$.hideLoading();
						});
					}

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

					$scope.doSearch = function(is_append) {
						var url = project_url
								+ "/orderService/orderList.do?is_json=2";
						var json_param = {};
						json_param['page'] = $scope.page;
						json_param['tab'] = $scope.a_choose;
						json_param['pageSize'] = $scope.pageSize;

						$http(
								{
									method : 'post',
									url : url,
									data : $.param(json_param),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								}).then(
								function successCallback(data) {
									if (is_append) {
										if (data.data.orders.length > 0)
											$scope.json.orders.push.apply(
													$scope.json.orders,
													data.data.orders);
										else {
											$scope.has_data = false;
										}
									} else
										$scope.json.orders = data.data;
									$scope.page = $scope.page + 1;
									loading = false;
									$.hideLoading();
								}, function errorCallback(data) {
									// 请求失败执行代码
									console.log(data);
								});
					};

					// 滚动加载
					var loading = false; // 状态标记
					$(document.body).infinite().on("infinite", function() {
						if (loading || !$scope.has_data)
							return;
						$('.loadMore').removeClass('hide');
						loading = true;
						$.showLoading();
						$scope.doSearch(true);
						$('.loadMore').addClass('hide');
					});
				});