'use strict';
// angular的js
var kmy_app = angular.module('app', []);

kmy_app.controller('ctrl', function($scope, $http, $filter) {
	$scope.order_status = "";
	$scope.service_time = "";
	$scope.contacts = "";
	$scope.contacts_number = "";
	$scope.service_address = "";
	$scope.order_sn = "";
	$scope.deal_name = "";
	$scope.deal_price = "";
	$scope.order_deal_number = "";
	$scope.desc = "";
	$scope.order_deal_number = "";
	$scope.order_create_time = "";
	$scope.order_end_time = "";
	$scope.value_added_price = "";
	$scope.total_price = "";
	//增值服务状态
	$scope.show_addPrice=0;
	//售后服务状态
	$scope.show_service=0;
	/**
	 * 获取json数据,服务器返回用来初始化页面的
	 */
	if ($.isEmptyObject(json)) {
		var init_url = $scope.json_config.project_url
				+ "orderService/orderDetail.do?order_sn=001";

		var json_param = {};
		json_param['user_id'] = user_id;
		json_param['order_sn'] = order_sn;

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

			// 返回数据 需要后台的同志补充一下后面传过来的值
			$scope.order_status = "";
			$scope.service_time = "";
			$scope.contacts = "";
			$scope.contacts_number = "";
			$scope.service_address = "";
			$scope.order_sn = "";
			$scope.deal_name = "";
			$scope.deal_price = "";
			$scope.order_deal_number = "";
			$scope.desc = "";
			$scope.order_deal_number = "";
			$scope.order_create_time = "";
			$scope.order_end_time = "";
			$scope.value_added_price = "";
			$scope.total_price = "";
			//这里初始化增值服务和申请售后状态值
			
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
		});
	} else {
		$scope.json = json;
		$scope.json_config = json.json_config;

		$scope.order_status = json.detail.order_status;
		$scope.service_time = json.detail.service_time;
		$scope.contacts = json.detail.contacts;
		$scope.contacts_number = json.detail.contact_number;
		$scope.service_address = json.detail.address;
		$scope.order_sn = json.detail.order_sn;
		$scope.deal_name = json.detail.name;
		$scope.deal_price = json.detail.single_price;
		$scope.desc = json.detail.desc;
		$scope.order_deal_number = json.detail.number;
		$scope.order_create_time = json.detail.create_time;
		$scope.order_end_time = json.detail.end_time;
		$scope.value_added_price = json.detail.value_add;
		$scope.total_price = json.detail.single_price;
		$scope.orderStatus = pay(json.detail.pay_status,
				json.detail.service_status);
		$scope.master_name = json.detail.master_name;
		$scope.master_mobile = json.detail.master_mobile;
		//这里初始化增值服务和申请售后状态值
		
	}
});
// 状态判断
function pay(payStatus, serStatus) {
	if (payStatus == 0) {
		return "未支付";
	} else {
		if (serStatus == 0) {
			return "未接单";
		} else if (serStatus == 1) {
			return "已接单";
		} else if (serStatus == 2) {
			return "服务中";
		} else if (serStatus == 3) {
			return "已完成";
		} else if (serStatus == 4) {
			return "已取消";
		}
	}
};