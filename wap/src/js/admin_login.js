'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$filter){
	
	//get_url:默认携带参数,如果采用get方式的话,可以使用这个来拼接地址
	$scope.getUrl = function(get_url,json_param){
		for(var k in json_param){
			get_url=get_url+"&"+k+"="+json_param[k];
		}
		return get_url;
	}
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		var init_url="http://qiu.mingkong.com/login/admin/login.do"+init_param;
		
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
	}
	
	$scope.login=function(){
		var login_url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_login+"/admin/dologin.do?is_json=2";
		var json_param={};
		json_param['username']=$scope.username;
		json_param['password']=$scope.password;
		$http({
            method: 'post',
            url: login_url,
            data:$.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
        	if(-1==data.data.err_code){
        		window.location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_admins+"/index/index.do";
        	}else{
        		alert(data.data.err_msg);
        	}
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);

        });
	}
});

function keyLogin(){
	 if (event.keyCode==13)  //回车键的键值为13
	   document.getElementById("submit").click(); //调用登录按钮的登录事件
}
