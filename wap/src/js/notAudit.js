'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	$scope.tip="";
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		$.showLoading();
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		//var init_url="https//:192.168.1.116/login/user/login.do"+init_param;
		var init_url = project_url+"/master/notAudit.do?is_json=1";

		$http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
            $scope.tip=json.content;
        }, function errorCallback(data) {
            // 请求失败执行代码
        	console.log(222);
            console.log("error:"+data);

        });
		$.hideLoading();
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
		$scope.return_url=json.return_url;
	}
	
	
	$scope.reapply=function(){
		location.href=$scope.json_config.project_url+"/master/reapply.do";
	}


	
});
