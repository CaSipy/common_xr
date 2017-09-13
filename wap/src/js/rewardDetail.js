var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function($scope,$http){
	$scope.reward_name="";
	$scope.delivery_time="";
	$scope.reward_type_name="";
	$scope.delivery_status="";
	$scope.start_time="";
	$scope.end_time="";
	$scope.deal_name="";
	$scope.real_money="";
	$scope.description="";
    if($.isEmptyObject(json)){
	// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
	
	}else{
		$scope.json=json;
		console.log(json.detail);
		$scope.json_config=json.detail.json_config;
		$scope.reward_name=json.detail.reward_name;
		$scope.reward_type_name=json.detail.reward_type_name;
		$scope.delivery_time=json.detail.delivery_time;
		$scope.delivery_status=json.detail.delivery_status==0?"未发放":"已发放";
		$scope.start_time=json.detail.start_time;
		$scope.end_time=json.detail.end_time;
		$scope.deal_name=json.detail.deal_name;
		$scope.real_money=json.detail.real_money;
		$scope.description=json.detail.description;
	}
});