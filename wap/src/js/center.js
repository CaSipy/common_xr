/**
 * Created by Fra on 2017/5/28.
 */
var app = angular.module('app',[]);
app.controller('ctrl',function ($scope,$http,$interval) {
    $scope.master_name = '';
    $scope.imgurl = '';
    $scope.phone="076922279029";
    $scope.func_list = [
        {
            id:'0',
            name:'我的资料',
            img_url:'http://common.huibaoming.cn/wap/images/wechat.png'
        },
        {
            id:'1',
            name:'我的财务',
            img_url:'http://common.huibaoming.cn/wap/images/PayTreasure.png'
        },
        {
            id:'2',
            name:'我的住址',
            img_url:'http://common.huibaoming.cn/wap/images/wechat.png'
        },
        {
            id:'3',
            name:'联系客服',
            img_url:'http://common.huibaoming.cn/wap/images/PayTreasure.png'
        },
        {
            id:'4',
            name:'反馈意见',
            img_url:'http://common.huibaoming.cn/wap/images/wechat.png'
        }
    ];
    
    
    /**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		$.showLoading();
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		//var init_url="https//:192.168.1.116/login/user/login.do"+init_param;
		var init_url=project_url+"/master/center.do?is_json=1";

		$http({
            method: 'post',
            url: init_url,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
            
            $scope.master_name = json.master_info.master_name+"师傅";
            $scope.imgurl = json.user_info.user_pic;
            $scope.phone="076922279029";
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
})