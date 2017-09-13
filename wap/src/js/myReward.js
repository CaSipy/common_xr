var kmy_app=angular.module('app',[]);
    kmy_app.controller('ctrl',function($scope,$http){
        //模拟数据
        $scope.list=[];
        if($.isEmptyObject(json)){
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		}else{
			$scope.json=json;
			$scope.json_config=json.json_config;
			$scope.list=json.voList;
			console.log(json.voList);
		}
        $scope.absPage=1;
        $scope.pageSize=20;
        $scope.has_data = true;
        //加载更多数据
        $scope.doSearch = function(is_append) {
            var url = project_url + "/myReward/myReward.do?is_json=2";
            var json_param = {};
            json_param['absPage'] = $scope.absPage;
             json_param['pageSize'] = $scope.pageSize;
            

            $http({
                method : 'post',
                url : url,
                data : $.param(json_param),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(
                    function successCallback(data) {
                        if (is_append) {
    						if (data.data.voList.length > 0)
    							$scope.list.push.apply(
    									$scope.list, data.data.voList);
    						else
    							$scope.has_data = false;
    					} else {
    						$scope.list = data.data.voList;
    						if (data.data.voList.length == 0)
    							$scope.has_data = false;
    					}
                        $scope.absPage = $scope.absPage + 1;
                        $.hideLoading();
                        loading = false;
                        inf_allow = true;
                    }, function errorCallback(data) {
                        // 请求失败执行代码
                        console.log(data);
                    });
        };

     // 滚动加载
    	var loading = false; // 加载状态标记
    	var inf_allow = true; // 是否允许触发下拉事件
    	$(document.body).infinite().on("infinite", function() {
    		if (loading || !$scope.has_data || !inf_allow)
    			return;
    		$('.loadMore').removeClass('hide');
    		$.showLoading();
    		loading = true;
    		$scope.doSearch(true);
    		$('.loadMore').addClass('hide');
    	});
        
        $scope.jump=function(){
        	location.href="rewardDetail.do?id="+arguments[0];
        }
    });