/**
 * Created by 文文 on 2017/4/25.
 */
var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function ($scope,$http) {
    $scope.has_data = true;
    $scope.pages=2;//要查询的页数
     //点击确认 所要执行的操作还没做
    $scope.cancel=function (order_sn,choose) {
        $.confirm({
			title: '确定取消订单？',
			text: '',
			onOK: function() {
				//点击确认
        		var param="&order_sn="+order_sn+"&&choose="+choose;
        		var init_url="../orderService/doSure.do";

        		$http({
                    method: 'post',
                    url: init_url,
                    data:param,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    json=data.data;
                    $scope.json=data.data;
                    $scope.json_config=data.data.json_config;
                    if(json.err_code==-1){
                    	item.is_check=1;
                    	$.toast(json.err_msg);
                    	setTimeout(function(){
                    		window.location.href="../orderService/orderList.do";
                    	}, 2000);
                    }else{
                    	$.toast(json.err_msg);
                    }


                }, function errorCallback(data) {
                    // 请求失败执行代码
                    console.log("error:"+data);

                });
			},
			onCancel: function() {
				
			}
		});
        
        
    }

    /**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";

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
    
    /********************************下拉加载**************************/
    
    
});