//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$filter){
    $scope.user_url="";//个人头像的图片路径
    $scope.user_name="";
    $scope.mobile="";//用户手机
    $scope.estimate_level=5;//评价星级
    $scope.content="";//评价内容
    /**
     *	获取json数据,服务器返回用来初始化页面的
     */
    if($.isEmptyObject(json)){
        var init_param="?is_json=2";
        var init_url="evaluation.do"+init_param;

        $http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
            if(!json.userInfo){
            	$.toast("请传入order_sn参数","text");
            }else{
	            $scope.user_url=json.userInfo.user_pic;//个人头像的图片路径
	            $scope.user_name=json.userInfo.user_name;
	            $scope.mobile=json.userInfo.mobile;//用户手机
	            $scope.estimate_level=json.evaluation.estimate_level;//评价星级
	            $scope.content=json.evaluation.content;//评价内容
            }
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);
            $.toast("网络错误，请稍后重试","text");
        });
    }else{
        $scope.json=json;
        $scope.json_config=json.json_config;
        
        if(!json.userInfo){
        	$.toast("请传入order_sn参数","text");
        }else{
	        $scope.user_url=json.userInfo.user_pic;//个人头像的图片路径
	        $scope.user_name=json.userInfo.user_name;
	        $scope.mobile=json.userInfo.mobile;//用户手机
	        $scope.estimate_level=json.evaluation.estimate_level;//评价星级
	        $scope.content=json.evaluation.content;//评价内容
        }
    }
});