/**
 * Created by 文文 on 2017/4/11.
 */
'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$filter){
    $scope.user_url="http://common.huibaoming.cn/wap/images/header.jpg";//个人头像的图片路径
    $scope.username="林可欣";
    $scope.reward="333";//累计奖金
    $scope.gold="464644";//金币
    $scope.ingot="44646464";//元宝
    $scope.silver="4556355";//银币
    $scope.lost_selver="563535";//流失银币
    $scope.lost_ingot="3563535";//流失元宝
    /**
     *	获取json数据,服务器返回用来初始化页面的
     */
    if($.isEmptyObject(json)){
        var init_param="?is_json=2";
        var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;

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
        //头像路径赋值
        //昵称赋值
    }
    
    /**
     * 拼接地址
     */
    $scope.combineUrl = function(url,app_module_action_param){
    	if(url==""){
			var return_url=$scope.json_config.domain_url+"/"+app_module_action_param;
			return return_url;
		}else{
			return url;
		}
    }
    
    /**
     * 当前地址是否是当前页面
     */
    $scope.is_pre_url = function(url,app_module_action_param){
    	var return_url=url;
    	if(url==""){
			return_url=$scope.json_config.domain_url+"/"+app_module_action_param;
		}
    	if(return_url==$scope.json_config.pre_url){
    		return true;
    	}else{
    		return false;
    	}
    }
    
    /**
     * 退出登录
     */
    $scope.loginout = function(){
    	window.location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_login+"/user/loginout.do";
    }
    
    /**
     * 用户中心页面跳转地址
     */
    $scope.jump_url = function(url,app_module_action_param){
    	window.location.href=$scope.combineUrl(url,app_module_action_param);
    }
    // 消息通知
    $scope.newform=function(){
        window.location.href=$scope.json_config.domain_url+"/group/userGroupOrder/userGroupCheckList.do?type=1";
    }
    
    //签到
    $scope.sign = function() {
		// 组装url与参数
		var init_url = project_url
				+ "/userCenter/sign.do";
		var json_param = {};
		json_param['is_json'] = 1;

		$.showLoading();
		$http(
				{
					method : 'post',
					url : init_url,
					data : $.param(json_param),
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function successCallback(data) {
			// 请求成功执行代码

			$.hideLoading();
			if (data.data.err_code == 2019) {
				$.toast(data.data.err_code
						+ ":"
						+ data.data.err_msg,
						"forbidden");
			} else if (data.data.err_code == -1) {
				$.alert( data.data.err_msg);
				$scope.json.is_sign=false;
			}else if (data.data.err_code == 2020) {
				$.alert( data.data.err_msg);
				
			}
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.hideLoading();
		});

	};
});