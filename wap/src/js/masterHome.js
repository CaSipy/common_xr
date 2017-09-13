/**
 * Created by 文文 on 2017/4/25.
 */


var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function ($scope,$http) {
    $scope.tabstatus =1;//切换按钮改变
    
    $scope.has_data = true;
    $scope.pages=2;//要查询的页数
    //循环需要的数据
//    $scope.mycheckList=[];//抢单
//     $scope.mytakeList=[];//接单
//    $scope.cancelList=[];//取消申请
  //标题在黑色顶部
//    $scope.title=[];
//    
//    $scope.mycheckList=[
//	    {objName:"清洗空调",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//	    {objName:"清洗baba",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//	    {objName:"清洗ee",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//    ];
//    $scope.mytakeList=[
//	    {objName:"清洗空调",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//	    {objName:"清洗baba",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//	    {objName:"清洗ee",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",create_time:"20133212"},
//    ];
//    $scope.cancelList=[
//	    {objName:"清洗空调",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",result:"选错了"},
//	    {objName:"清洗baba",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",result:"时间有误"},
//	    {objName:"清洗ee",num:1,address:"天河区",moreAddress:"仙霞路学校懂xxx",result:"暂时不方便"},
//    ];
	//点击抢单 所要执行的操作还没做
    $scope.grab=function (item) {
    	var article = json.tips.article;
		if(article == "" || article == null || json.tips == null){
			grab2(item);
		}else{
			$.alert(article,function(){
				grab2(item);
			});
		}
    }
    
    function grab2(item){
    	$.confirm({
			title: '抢单',
			text: '您确定要进行抢单么',
			onOK: function() {
				//点击确认
				var init_param="?is_json=2";
        		var param="&order_sn="+item.order_sn;
        		var init_url=$scope.json_config.project_url+"/MasterOrder/doGrab.do"+init_param+param;

        		$http({
                    method: 'post',
                    url: init_url,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    if(data.data.err_code==-1){
                    	item.is_check=1;
                    	$.toast(data.data.err_msg);
                    	$scope.mycheckList.splice($.index,1);
                    	$scope.tab(1);
                    }else{
                    	$.toast(data.data.err_msg,"forbidden");
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
    
     //点击接单 所要执行的操作还没做
    $scope.take=function (item) {
    	var article_finish = json.article_finish.article;
		if(article_finish == "" || article_finish == null || json.article_finish == null){
			dotake(item);
		}else{
			$.alert(article_finish,function(){
				dotake(item);
			});
		}
    }
    
    function dotake(item){
    	$.confirm({
			title: '接单',
			text: '您确定要接受该订单么',
			onOK: function() {
				//点击确认
				var init_param="?is_json=2";
        		var param="&order_sn="+item.order_sn;
        		var init_url=$scope.json_config.project_url+"/masterOrder/receive.do"+init_param+param;

        		$http({
                    method: 'post',
                    url: init_url,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    if(data.data.err_code==-1){
                    	item.is_check=1;
                    	$.toast(data.data.err_msg);
                    	$scope.mytakeList.splice($.index,1);
                    	$scope.tab(2);
                    }else{
                    	$.toast(data.data.err_msg,"forbidden");
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
    //接单拒绝
    $scope.refuse=function (item) {
    	$.confirm({
			title: '拒绝订单',
			text: '您确定要拒绝该订单么',
			onOK: function() {
			    //点击确认
			    //点击确认
				var init_param="?is_json=2";
        		var param="&order_sn="+item.order_sn;
        		var init_url=$scope.json_config.project_url+"/masterOrder/noreceive.do"+init_param+param;

        		$http({
                    method: 'post',
                    url: init_url,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    if(data.data.err_code==-1){
                    	item.is_check=1;
                    	$.toast(data.data.err_msg);
                    	$scope.mytakeList.splice($.index,1);
                    	$scope.tab(2);
                    }else{
                    	$.toast(data.data.err_msg,"forbidden");
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
     //点击确认 所要执行的操作还没做
    $scope.cancle=function (order_sn,choose) {
        $.confirm({
			title: '您真的接受取消该订单？',
			onOK: function() {
				//点击确认
        		var param="?order_sn="+order_sn+"&choose="+choose;
        		var init_url=$scope.json_config.project_url+"/masterOrder/doSure.do"+param;

        		$http({
                    method: 'post',
                    url: init_url,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    if(data.data.err_code==-1){
                    	item.is_check=1;
                    	$.toast(data.data.err_msg);
                    	$scope.cancelList.splice($.index,1);
                    	$scope.tab(3);
                    }else{
                    	$.toast(data.data.err_msg,"forbidden");
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
    
    $scope.cancel=function (order_sn,choose) {
        $.confirm({
			title: '您真的拒绝取消该订单？',
			onOK: function() {
				//点击确认
        		var param="?order_sn="+order_sn+"&choose="+choose;
        		var init_url=$scope.json_config.project_url+"/masterOrder/doSure.do"+param;

        		$http({
                    method: 'post',
                    url: init_url,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(data) {
                    // 请求成功执行代码
                    if(data.data.err_code==-1){
                    	item.is_check=1;
                    	$.toast(data.data.err_msg);
                    	$scope.cancelList.splice($.index,1);
                    	$scope.tab(3);
                    }else{
                    	$.toast(data.data.err_msg,"forbidden");
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
		var init_url="http://localhost/develop/userGroup/userGroupCheckList.do"+init_param;

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
			//循环列表数据（抢单）
			$scope.mycheckList=$scope.json.mycheckList;
			//循环列表数据（接单）
			$scope.mytakeList=$scope.json.mytakeList;
			//循环列表数据（取消订单）
			$scope.cancelList=$scope.json.cancelList;
			//标题在黑色顶部
			$scope.title=$scope.json.title;
			//标题在黑色顶部
			$scope.title=$scope.json.mytitle;
			
			$scope.tabstatus=$scope.json.tab;
//			$scope.islActive=$scope.json.checkList.is_check;
	}
    //头部导航按钮切换
    $scope.tab=function (type) {
        var init_url = $scope.json_config.pre_url;
        var json_param={};
        json_param["tab"]=type;
        json_param["is_json"]=2;
        $http({
            method: 'post',
            url: init_url,
            data:$.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
        	if(type==1){
            	$scope.tabstatus=1;
            	//循环列表数据（抢单）
    			$scope.mycheckList=data.data.mycheckList;
            }else if(type==2){
            	$scope.tabstatus=2;
            	//循环列表数据（接单）
            	$scope.mytakeList=data.data.mytakeList;
            }else if(type==3){
            	$scope.tabstatus=3;
            	//循环列表数据（取消订单）
            	$scope.cancelList=data.data.cancelList;
            }
        	//刷新当前页和has_data
        	$scope.pages = 2;
        	$scope.has_data = true;
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);

        });
       
    }
    
    $scope.tab(1);
    
    /********************************下拉加载**************************/
    
    
 // 滚动加载
	var loading = false; // 状态标记
	$(document.body).infinite().on("infinite", function() {
		if (loading || !$scope.has_data)
			return;
		$('.loadMore').removeClass('hide');
		loading = true;
		$scope.doSearch(true);
		$('.loadMore').addClass('hide');
	});
    
	/**
	 * 搜索
	 */
	$scope.doSearch = function(is_append) {
		var url=$scope.json_config.pre_url;
		var json_param = {};
		json_param['pages'] = $scope.pages;
		json_param['is_json'] = 2;
		json_param['tab'] = $scope.tabstatus;
		$http({
			method: 'post',
			url: url,
			data: $.param(json_param),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			var data_add=data.data;
			if (is_append) {
				if (data_add.err_code==-1){
					//拼接数据
					if($scope.tabstatus==1){
						$scope.mycheckList.push.apply($scope.mycheckList, data_add.mycheckList);
					}else if($scope.tabstatus==2){
						$scope.mytakeList.push.apply($scope.mytakeList, data_add.mytakeList);
					}else if($scope.tabstatus==3){
						$scope.cancelList.push.apply($scope.cancelList, data_add.cancelList);
					}
				}else {
					$scope.has_data = false;
				}
			} else{
				//替换数据
				if($scope.tabstatus==1){
					$scope.mycheckList = data_add.mycheckList;
				}else if($scope.tabstatus==2){
					$scope.mytakeList = data_add.mytakeList;
				}else if($scope.tabstatus==3){
					$scope.cancelList = data_add.cancelList;
				}
			}
			//增加当前页+1
			$scope.pages = $scope.pages + 1;
			loading = false;
		},
		function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	};
    
//    滚动加载
    /*
    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        $('.weui-loadmore').removeClass('hide');
        loading = true;
        
        if($scope.tabstatus==2){

            // 把你要更新的内容放在这里，并使用 jQuery 方法更新内容
            var init_param="?is_json=2";
    		var param="&type=2"+"&pages="+$scope.pages;
    		var init_url=$scope.json_config.project_url+"/userGroupOrder/userGroupCheckList.do"+init_param+param;
    		
    		$http({
                method: 'post',
                url: init_url,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(data) {
            	// 请求成功执行代码
            	 var checkListAdd=data.data;
                if(checkListAdd.err_code==-1){
                	console.log("已到底啦");
                	$('.weui-loadmore').addClass('hide');
                }else{
                	loading = true;
    	        	$scope.checkList.push.apply($scope.checkList,checkListAdd.list_add);
    	        	$scope.pages=$scope.pages+1;
  	                $('.weui-loadmore').addClass('hide');
                }
                loading = false;
            }, function errorCallback(data) {
                // 请求失败执行代码
                console.log("error:"+data);

            });
            
            
              //   $('.weui-loadmore').addClass('hide');

            loading = false;
        }else if($scope.tabstatus==1){
            // alert("模块一");
            $scope.$apply(function(){
                // 把你要更新的内容放在这里，并使用 jQuery 方法更新内容
               // $scope.status.push.apply($scope.ticket,$scope.status);
               //  $('.weui-loadmore').addClass('hide');
            });
            loading = false;
        }
    });
*/
});
