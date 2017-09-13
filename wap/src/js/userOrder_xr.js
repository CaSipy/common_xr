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
								+ "/masterOrder/list.do";
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
						$scope.init(0, 1);
					}

					// 返回状态
					$scope.choseStatus = function(order_status) {
						$scope.a_choose = order_status;
						$scope.init(order_status, 1);
					};
					$scope.paystatus = function(ser_status,pay_status) {
						
						if (ser_status == 0) {
							return "未接单";
						} else if (ser_status == 1) {
							return "已接单";
						} else if (ser_status == 2) {
							return "服务中";
						} else if (ser_status == 3) {
							if(pay_status==2){
								return "完成订单";
							}else{
								return "已完成，待审核";
							}
						} else if (ser_status == 4) {
							return "已取消";
						}
					
				};

				
				$scope.addOrder = function(order_sn,deal_id){
					location.href = project_url+"/addService/index.do?order_sn="+order_sn+"&deal_id="+deal_id;
				}
				
				
				//状态变化  for 接单
				$scope.orderMaster = function(order_sn,action,num) {
					if(action == 'endService'){
						var article_finish = json.article_finish.article;
						if(article_finish == "" || article_finish == null || json.article_finish == null){
							doorderMaster(order_sn,action,num);
						}else{
							$.alert(article_finish,function(){
								doorderMaster(order_sn,action,num);
							});
						}
					}else if(action == 'receive'){
						var article = json.tips.article;
						if(article == "" || article == null || json.tips == null){
							doorderMaster(order_sn,action,num);
						}else{
							$.alert(article,function(){
								doorderMaster(order_sn,action,num);
							});
						}
					}else{
						doorderMaster(order_sn,action,num);
					}
				};
				
				function doorderMaster(order_sn,action,num){
					$.confirm("确认？", function() {
						  //点击确认后的回调函数
						
									$serIosMask.fadeOut();
									$time_ser.css('opacity', 0);
									$time_ser.css('visibility', 'hidden');
									var order_url = project_url
											+ "/masterOrder/"+action+".do" // 后台do????
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
														if (data.data.err_code == 2012) {
															$.toast(data.data.err_code
																	+ ":"
																	+ data.data.err_msg,
																	"forbidden");
														} else {
															$.alert( data.data.err_msg);
															$scope.choseStatus(0);
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
					// 删除订单 没有这个接口
					$scope.delOrder = function(index) {
						$
								.confirm({
									title : '删除订单',
									text : '确认删除该订单？',
									onOK : function() {
										// 点击确认
										// 组装url与参数
										var order_url = "del.do";
										var json_param = {};
										json_param['order_sn'] = index;

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
															$.toast(data.data.err_msg);
															setTimeout(function(){
																$scope.choseStatus(0);
															}, 3000);
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
						var article_cancel = json.article_cancel.article;
						if(article_cancel == "" || article_cancel == null || json.article_cancel == null){
							dopick_time(order_sn);
						}else{
							$.alert(article_cancel,function(){
								dopick_time(order_sn);
							});
						}
					}
					
					function dopick_time(order_sn){
						$.prompt({
							  title: '取消订单',
							  text: '取消理由：',
							  input: '',
							  empty: false, // 是否允许为空
							  onOK: function (input) {
							    //点击确认
									  
								
								var pick_time = project_url + "/masterOrder/doCancel.do"; // 后台do????
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
												$scope.choseStatus(0);
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
								+ "/masterOrder/applyRefund.do" // 后台do????
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
												$scope.choseStatus(0);
											}

										}, function errorCallback(data) {
											// 请求失败执行代码
											console.log("error:" + data);
											$.hideLoading();

										});
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
					
					/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓更改时间弹出↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
					var post_order_sn = "";
					
					$scope.pickerTime = function(order_sn){
						 console.log(order_sn);
						 post_order_sn = order_sn
						 $('#serIosMask').fadeIn();
						 $('#time_ser').css('visibility','visible');
						 $('#time_ser').css('opacity',1);
					}
					
					$("#time-format").datetimePicker({
				    	container: '#ser-container',
				        title: '请选择服务日期',
				        yearSplit: '-',
				        monthSplit: '-',
				        dateSplit: '',
				        times: function () {
				          return [  // 自定义的时间
				            {
				              values: (function () {
				                var hours = [];
				                for (var i=0; i<24; i++) hours.push(i > 9 ? i : '0'+i);
				                return hours;
				              })()
				            },
				            {
				              divider: true,  // 这是一个分隔符
				              content: ':'
				            },
				            {
				              values: (function () {
				                var minutes = [];
				                for (var i=0; i<59; i++) minutes.push(i > 9 ? i : '0'+i);
				                return minutes;
				              })()
				            },
				            {
				              divider: true,  // 这是一个分隔符
				              content: ''
				            }
				          ];
				        },
				        onChange: function (picker, values, displayValues) {
				          console.log(values);
				        }
				    });
					
					$('#serIosMask').click(function () {
						$('#serIosMask').fadeOut();
					    $('#time_ser').css('opacity',0);
					    $('#time_ser').css('visibility','hidden');
					});
					$('#serCancel').click(function () {
						$('#serIosMask').fadeOut();
					    $('#time_ser').css('opacity',0);
					    $('#time_ser').css('visibility','hidden');
					});
					$('#serSure').click(function () {
						$('#serIosMask').fadeOut();
					    $('#time_ser').css('opacity',0);
					    $('#time_ser').css('visibility','hidden');
					    console.log($("#time-format").val());
					    
					    
					    var json_param = {};
						json_param['service_time'] = $("#time-format").val();
						json_param['order_sn'] = post_order_sn;
						$.showLoading();
					    $http(
								{
									method : 'post',
									url : project_url + "/masterOrder/changeTime.do",
									data : $.param(json_param),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								})
								.then(
										function successCallback(data) {
											// 请求成功执行代码

											$.hideLoading();
											if(data.data.err_code==-1){
												$.toast("更改成功，等待客户确认", "text");
												$scope.choseStatus(0);
											}else{
												$.toast(data.data.err_msg,"forbidden");
											}
											

										}, function errorCallback(data) {
											// 请求失败执行代码
											console.log("error:" + data);
											$.hideLoading();

										});
					});
					
					/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑更改时间弹出↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
					
					
					$scope.doSearch = function(is_append) {
						var url = project_url
								+ "/masterOrder/list.do?is_json=1";
						var json_param = {};
						json_param['pages'] = $scope.page;
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
											$scope.json.orders.push.apply($scope.json.orders,data.data.orders);
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





