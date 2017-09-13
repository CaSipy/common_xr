var app = angular.module('app',['ngSanitize']);
app.controller('ctrl',function ($scope,$http) {
    
	 if($.isEmptyObject(json)){
	        var init_param = '';
	        var init_url = ''+init_param;
	        $http({
	            method : 'post',
	            url : init_url,
	            headers : {'Content-Type':'application/x-www/-form-urlencoded'}
	        }).then(function successCallback(data) {
	            //请求成功执行代码
	            json = data.data;
	            $scope.json = data.data;
	            $scope.json_config = data.data.json_config;

	        },function errorCallback(data) {
	            //请求失败执行代码
	            console.log('error:'+data);
	        });
	    }else{
	        $scope.json = json;
	        $scope.json_config = json.json_config;
	        
	        var url = project_url+"/"+module+"/getAgreement.do";
	        
	        $http({
	 			method: 'post',
	 			url: url,
	 			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	 		}).then(function successCallback(data) {
	 			// 请求成功执行代码
	 			// 判断成功状态
	 			console.log(data);
	 			$scope.msg = data.data.val;
	 		}, function errorCallback(data) {
	 			// 请求失败执行代码
	 			console.log("error:"+data);

	 		});
	    }
	 
	 $scope.back = function(){
		 window.history.go(-1);
	 }
});