'use strict';
// angular的js

var kmy_app = angular.module('app', ['ngSanitize']);
kmy_app.controller('ctrl', function($scope, $http, $filter) {
	
	
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	//定义数据
	$scope.jsonlist=[];//商品列表数据
	$scope.jsondetail=[];//商品详情数据json
	 if($.isEmptyObject(json)){
	 	var init_param="?is_json=1";
	 	// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
	 	var init_url=pre_url+init_param;

		 $http({
             method: 'post',
             url: init_url,
             headers:{'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(data) {
             // 请求成功执行代码
             json=data.data;
             $scope.json=data.data;
             console.log(json.menu_1);
             $scope.json_config=data.data.json_config;
             
             $scope.jsonlist = json.jsonlist;
             $("h1").text(json.jsonlist[0].list);
             
             for(var i=0;i<json.jsonlist.length;i++){
            	 type[i] = "tab"+i;
             }
		 	}, function errorCallback(data) {
		 		// 请求失败执行代码
		 		console.log("error:"+data);
        
		 	});
		 }else{
			 //这里是用于订单详情页面返回
			 	var init_param="&is_json=1";
			 	var init_url=pre_url_param+init_param;
		 		$http({
		 			method: 'post',
		 			url: init_url,
		 			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		 		}).then(function successCallback(data) {
		 			// 请求成功执行代码
		 			// 判断成功状态
		 			$scope.jsondetail = data.data.jsondetail;
		 			$("#description").html($scope.jsondetail.description);
		 			$scope.jsondetail.price = $scope.jsondetail.price.toFixed(2);
		 			$scope.jsondetail.origin_price = $scope.jsondetail.origin_price.toFixed(2);
		 			deal_id = $scope.jsondetail.id;
		 		}, function errorCallback(data) {
		 			// 请求失败执行代码
		 			console.log("error:"+data);

		 		}); 
		 	$scope.json=json;
		 	$scope.json_config=json.json_config;
		 	$scope.return_url=json.return_url;
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

	//查看详情
	$scope.showDetail=function (data) {
		deal_id = data;
		$("#popup_detail").popup();
		//后台数据请求
 		var detail_url=project_url+"/"+module+"/getDealDetail.do?is_json=1&id="+data;
 		$http({
 			method: 'post',
 			url: detail_url,
 			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
 		}).then(function successCallback(data) {
 			// 请求成功执行代码
 			// 判断成功状态
 			$scope.jsondetail = data.data.jsondetail;
 			$("#description").html($scope.jsondetail.description);
 			$scope.jsondetail.price = $scope.jsondetail.price.toFixed(2);
 			$scope.jsondetail.origin_price = $scope.jsondetail.origin_price.toFixed(2);
 		}, function errorCallback(data) {
 			// 请求失败执行代码
 			console.log("error:"+data);

 		});
	}
	
	//跳转下单
	var deal_id = "";
	$scope.placeOrder = function(){
		location.href = project_url+"/order/index.do?deal_id="+deal_id;
	}
});




//获取内容容器的id
var type = [];
var ff = 0;
var timeId, timeId2;
function skipHref() {
	if (ff == 1) {
		clearTimeout(timeId);
	} else {
		$.each(type, function (i) {
			if ($("#" + type[i]).offset().top < $(window).height() * 0.11) {
				console.log( $(window).height() * 0.11);
				console.log(i);
				$(".deal_nav a").removeClass("deal_nav_active");
				//$(".deal_nav a").removeClass("deal_nav_active");
				$("a[href=#" + type[i] + "]").addClass("deal_nav_active");
				var text = $("a[href=#" + type[i] + "]").text();
				$("h1").text(text);
			}

		});
		timeId = window.setTimeout("skipHref()", 200);
	}

	$(".deal_article").focus();
	console.log("move2");
	clearInterval(timeId);
	clearInterval(timeId2);
}

var j = 0, posL = [], posO = {};
function aSkip(key) {
	clearTimeout(timeId);
	ff = 1;
	timeId2 = window.setTimeout("isStop()", 200);
//	$(".deal_nav a").removeClass("deal_nav_active");
	$(".deal_nav a").removeClass("deal_nav_active");
	var text = $(key).text();
	$("h1").text(text);
	$(key).addClass("deal_nav_active");
	console.log("move1");
};
function isStop() {
	//alert($(".all_list").is(":animated"))
	if ($(".deal_article").is(":animated")) {
		ff = 1;
		timeId2 = window.setTimeout("isStop()", 200);
		console.log("move");
	} else {
		ff = 0;
		clearTimeout(timeId2);
		console.log("Stop");
	}
}
$(function(){
	$(".deal_article").focus();
//		jq判断滚动
$("#deal_article").on("scroll", function () {
	
	if (ff == 0) {
		console.log("?");
		timeId = window.setTimeout("skipHref()", 200);
	} else {
		clearTimeout(timeId);
		console.log("??");
	}

});
//		弹出层
var pop=true;
function showPop(obj){
	if($("#popup").css("display")=='none'){
		$("#popup").popup();
		$(".weui-popup__overlay").css("opacity",1);
		pop=false;
		console.log(pop);
	}else{
		$.closePopup();
		pop=true;
		$(".weui-popup__overlay").css("opacity",0);
		console.log(pop);
	}
}
function closePop(obj){
	$.closePopup();
}
//加的效果
$('.add').bind("click", function(event) {
	event.stopPropagation();
	var n = $(this).prev().val();
	var num = parseInt(n) + 1;
	if(num == 0) {
		return;
	}
	$(this).prev().val(num);
	$(this).parents("div[name='editor']").siblings("div[name='accomplish']").find("b[name='list_num']").html(num);
});
//减的效果
$('.jian').bind("click", function(event) {
	event.stopPropagation();
	var n = $(this).next().val();
	var num = parseInt(n) - 1;
	if(num == 0) {
		return
	}
	$(this).next().val(num);
});
//		清空购物车
function clearCar(){
	//如果参数过多，建议通过 object 方式传入
	$.confirm({
		title: '清空列表',
		text: '您确定要清空购物车么',
		onOK: function() {
			$(".pop_ul").children('li').remove();
			$.closePopup();
		},
		onCancel: function() {
			return;
		}
	});
}


	var height = $(window).height();
	$("#deal_article").css("height",height*0.85);
});

