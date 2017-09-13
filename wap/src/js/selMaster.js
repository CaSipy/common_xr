var app = angular.module('app',[]);
app.controller('ctrl', function($scope, $http) {
	
	/*处理初始化*/
    if($.isEmptyObject(json)){
        var init_url = '';
        $scope.init = function(){
            $http({
                method:'post',
                url:init_url,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(data){
                //请求成功执行代码
                $scope.json = data.data;
                $scope.json_config = data.data.json_config;
                $scope.deal_id = json.deal.id;
            },function errorCallback(){
                // 请求失败执行代码
                console.log("error:"+data);
            });
        }
    }else{
    	$scope.json = json;
    	$scope.search_master = "";
    	$scope.logs=[];
    	$scope.page=2;	//第几页
    	var order_sn = json.order_sn;
    	$scope.logs= json.data;
    	$scope.has_data=true;
    }
    
    $scope.search = function(){
    	var url = "search.do";
    	var json_param = {};
    	json_param['filter']=$scope.search_master;
    	 $http({
             method:'post',
             url:url,
             data:$.param(json_param),
             headers:{'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(data){
        	 $scope.json = data;
         },function errorCallback(){
             // 请求失败执行代码
        	 $.toast("搜索失败,请稍后再试","cancel");
         });
    }
    
    $scope.submit = function(){
    	if(confirm("确定发布订单吗？")){
    		var url = "release.do";
        	var json_param = {};
        	json_param['order_sn']=order_sn;
        	 $http({
                 method:'post',
                 url:url,
                 data:$.param(json_param),
                 headers:{'Content-Type': 'application/x-www-form-urlencoded'}
             }).then(function successCallback(data){
            	 if(data.data){
            		 $.toast("发布成功");
            		 setTimeout("window.location.href='../orderService/orderList.do'", 2000);
            	 }else{
            		 $.toast("发布失败，请稍后再试","cancel");
            	 }
             },function errorCallback(){
                 // 请求失败执行代码
            	 $.toast("网络连接失败，请稍后再试","cancel");
             });
    	}
    }
    
    $scope.master = function(id){
    	window.location.href = "master.do?id="+id+"&order_sn="+order_sn;
    }
    

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
	
	
	$scope.doSearch = function(is_append) {
		var url="index.do";
		
		var json_param={};
		json_param['page']=$scope.page;
		json_param['order_sn']=order_sn;
		json_param['is_json']=2;

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
						if (data.data.length > 0)
							$scope.json.data.push.apply(
									$scope.json.data,
									data.data);
						else {
							$scope.has_data = false;
							$.hideLoading();
						}
					} else
						$scope.json.data = data.data;
						$scope.page = $scope.page + 1;
						loading = false;
						$.hideLoading();
				}, function errorCallback(data) {
					// 请求失败执行代码
					console.log(data);
				});
	};
});