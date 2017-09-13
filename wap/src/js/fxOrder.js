
var kmy_app=angular.module('app',[]);

kmy_app.controller('ctrl',function($scope,$http,$filter){
	$scope.has_data = true;
	$scope.tab = 0;
	$scope.page = 2;
	$scope.order_status = -1;
	$scope.database = "";
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if ($.isEmptyObject(json)) {
		$scope.init(0);
	} else{		
		$scope.json=json;
		$scope.json_config=json.json_config;
		if(json.vo.length==0){
			$scope.has_data = false;
		}
	}
	
//	console.log(json);
	$scope.init = function(id) {		
		$scope.has_data = true;
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url="fxOrder.do"+init_param;
		var json_param = {};
		$.showLoading();
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
//          获取值传递
            $.hideLoading();
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);
            $.toast("网络错误","forbidden")
        });
	}
	
	$scope.nav_click = function(index) {
		//重新初始化
		$scope.page = 1;
		$scope.has_data = true;
		$scope.json.vo = [];
		$scope.order_status = -1;
		
		$scope.database = json.type[index].database;
		$scope.doSearch(true);
	};
	
	//还没改
	$scope.doSearch = function(is_append) {
		var url = project_url + "/fx/fxOrder.do?is_json=2";
		var json_param = {};
		json_param['page'] = $scope.page;
		json_param['database'] = $scope.database;
		json_param['order_status'] = $scope.order_status;
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
					if (data.data.vo.length > 0)
						$scope.json.vo.push.apply(
								$scope.json.vo,
								data.data.vo);
					else {
						$scope.has_data = false;
					}
				} else
					$scope.json.vo = data.data;
				$scope.page = $scope.page + 1;
				loading = false;
			}, function errorCallback(data) {
				// 请求失败执行代码
				console.log(data);
			});
	};
	
	//滚动加载
	var loading = false; // 状态标记
	$(document.body).infinite().on("infinite", function() {
		if (loading || !$scope.has_data)
			return;
		$('.loadMore').removeClass('hide');
		loading = true;
		$scope.doSearch(true);
		$('.loadMore').addClass('hide');
	});
	
	$scope.getOrderStatus=function(order_status){
		//重新初始化
		$scope.page = 1;
		$scope.has_data = true;
		$scope.json.vo = [];
		
		$scope.order_status=order_status;
		$scope.doSearch(true);
		$(".close-popup").click();
	};
});
