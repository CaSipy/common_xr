'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	$scope.money="";
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		//var init_url="https//:192.168.1.116/login/user/login.do"+init_param;
		var init_url = pre_url_param+"&is_json=1";
		//console.log(init_url);

		$http({
          method: 'post',
          url: init_url,
          headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(data) {
          // 请求成功执行代码
          json=data.data;
          $scope.json=data.data;
          $scope.json_config=data.data.json_config;
          
         
      }, function errorCallback(data) {
          // 请求失败执行代码
          console.log("error:"+data);

      });
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
//		$scope.return_url=json.return_url;
	}
	$scope.withdraw=function(){
		window.location.href="";
	}
	$scope.log=function(){
		window.location.href="";
	}
});
