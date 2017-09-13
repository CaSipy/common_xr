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
    	$scope.master_name = json.data.master_name;
    	$scope.cont = json.data.cont;
    	$scope.master_mobile = json.data.master_mobile;
    	$scope.create_time = json.data.create_time;
    	$scope.name = json.data.name;
    	
    	var order_sn = json.order_sn;
    }
});