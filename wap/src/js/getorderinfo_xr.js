'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl',function($scope, $http, $filter) {
	$scope.a_choose = 0;
	$scope.payment_id = 0;
	$scope.pageSize = 10;
	$scope.has_data = true;
	$scope.page = 2;
//	增值服务状态
	$scope.show_addPrice=0;
//	售后服务状态
	$scope.show_service=0;
	/**
	 * 获取json数据,服务器返回用来初始化页面的
	 */
	$scope.init = function() {
		// 组装url与参数
		var init_url = project_url + "/masterOrder/info.do";
		var json_param = {};
	
		json_param['is_json'] = 1;
		json_param['pageSize'] = $scope.pageSize;
	
		$.showLoading();
		$http({
			method: 'post',
			url: init_url,
			data: $.param(json_param),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
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
		//这里初始化增值服务和申请售后状态值
		
	} else {
		$scope.json = json;
		$scope.json_config = json.json_config;
		$scope.init();
		//这里初始化增值服务和申请售后状态值
		
	}
	
	// 返回状态
	$scope.choseStatus = function(order_status) {
		$scope.a_choose = order_status;
		$scope.init(order_status, 1);
	};
	$scope.paystatus = function(pay_status, ser_status) {
	
		if (ser_status == 0) {
			return "未接单";
		} else if (ser_status == 1) {
			return "已接单";
		} else if (ser_status == 2) {
			return "服务中";
		} else if (ser_status == 3) {
			if (pay_status == 2) {
				return "完成订单";
			} else {
				return "已完成，待审核";
			}
		} else if (ser_status == 4) {
			return "已取消";
		}
	
	};
	
	// 删除订单 没有这个接口
	$scope.delOrder = function(index) {
		$.confirm({
			title: '删除订单',
			text: '确认删除该订单？',
			onOK: function() {
			// 点击确认
			// 组装url与参数
				var order_url = project_url + "/masterOrder/del.do";
				var json_param = {};
				json_param['user_id'] = $scope.json.orderinfos[index].user_id;
	
				$.showLoading();
				$http({
					method: 'post',
					url: order_url,
					data: $.param(json_param),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					$.hideLoading();
					if (data.data.err_code != -1) {
						$.toast(data.data.err_code + ":" + data.data.err_msg,"forbidden");
					} else {
						$scope.json.orderinfos.splice(index,1);
						$.toast(data.data.err_msg,"text");
					}
				},function errorCallback(data) {
					// 请求失败执行代码
					console.log("error:" + data);
					$.hideLoading();
				});
			},onCancel: function() {}
		});
	};
	// 取消订单 退款???
	var $time_ser = $('#time_box');
	var $serIosMask = $('#iosMask');
	var $serCancel = $('#cancel');
	var $serSure = $('#sure');
	// 点击取消按钮 弹出取消理由
	$scope.pick_time = function(order_sn) {
	
		$serIosMask.fadeIn();
		$time_ser.css('visibility', 'visible');
		$time_ser.css('opacity', 1);
		var pick_time = project_url + "/masterOrder/pick.do"; // 后台do????
		var json_param = {};
		json_param['order_sn'] = order_sn;
		json_param['is_json'] = 1;
		$http({
			method: 'post',
			url: order_url,
			data: $.param(json_param),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			// 请求成功执行代码
	
			$.hideLoading();
			data = $scope.json.xxx // 返回的取消订单的数据信息
			$("#inline").picker({
				container: '#picker-container',
				title: "请选择您取消的理由",
				cols: [{
					textAlign: 'center',
					values: data
				}]
			});
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.hideLoading();
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
		var order_url = project_url + "/masterOrder/applyRefund.do" // 后台do????
		var json_param = {};
		json_param['order_sn'] = $scope.json.orderinfos[index].order_sn;
		json_param['result'] = $scope.result;
		$.showLoading();
		$http({
				method: 'post',
				url: order_url,
				data: $.param(json_param),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function successCallback(data) {
			// 请求成功执行代码
	
			$.hideLoading();
			if (data.data.err_code == 3001) {
				$.toast(data.data.err_code + ":" + data.data.err_msg,"forbidden");
			} else {
				$scope.json.orderinfos.orderinfos[index].delivery_status = 1;
				$.toast("申请成功，等待审核", "text");
			}
	
		},function errorCallback(data) {
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
			var return_url = $scope.json_config.domain_url + "/" + app_module_action_param;
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
			return_url = $scope.json_config.domain_url + "/" + app_module_action_param;
		}
		if (return_url == $scope.json_config.pre_url) {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.doSearch = function(is_append) {
	var url = project_url + "/masterOrder/info.do?is_json=2";
	var json_param = {};
	json_param['page'] = $scope.page;
	json_param['tab'] = $scope.a_choose;
	json_param['pageSize'] = $scope.pageSize;
	
	$http({
		method: 'post',
		url: url,
		data: $.param(json_param),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		}).then(function successCallback(data) {
			if (is_append) {
				if (json.orders.length > 0)
					$scope.json.orders.push.apply($scope.json.orders,data.data.orders);
				else {
					$scope.has_data = false;
				}
			} else
				$scope.json.orders = data.data;
				$scope.page = $scope.page + 1;
				loading = false;
				$.hideLoading();
		},function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	};
	
	// 滚动加载
	//					var loading = false; // 状态标记
	//					$(document.body).infinite().on("infinite", function() {
	//						if (loading || !$scope.has_data)
	//							return;
	//						$('.loadMore').removeClass('hide');
	//						loading = true;
	//						$.showLoading();
	//						$scope.doSearch(true);
	//						$('.loadMore').addClass('hide');
	//					});
});