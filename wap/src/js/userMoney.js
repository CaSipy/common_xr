/**
 * Created by 文文 on 2017/4/25.
 */
var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function ($scope,$http,$filter) {
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
            
            //用户财务
            $scope.user_finance=$scope.json.user_finance;
            
            //虚拟货币种类
            $scope.money_payments=$filter('filterFirst')($scope.json.money_payments);
            $scope.first_money_payment=$scope.json.money_payments[1];
            
            //虚拟货币名称列表,移除最后一项
            $scope.money_name_cols=$filter('filterEndFirst')($scope.json.money_payments);
            $scope.money_name_key_value=$filter('filterEndKeyValueFirst')($scope.json.money_payments);
            
            //虚拟商品种类
            $scope.money_deals=json.money_deals;
            
            //首页码首位
            $scope.money_first_types=json.money_first_types;
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);

        });
    }else{
        $scope.json=json;
        $scope.json_config=json.json_config;
        
        //用户财务
        $scope.user_finance=$scope.json.user_finance;
        
        //虚拟货币种类filterSecond
//        $scope.money_payments=$filter('filterFirst')($scope.json.money_payments);
        $scope.money_payments=$filter('filterSecond')($scope.json.money_payments);
        $scope.first_money_payment=$scope.json.money_payments[2];
        
        //虚拟货币名称列表,移除最后一项
        $scope.money_name_cols=$filter('filterEndFirst')($scope.json.money_payments);
        $scope.money_name_key_value=$filter('filterEndKeyValueFirst')($scope.json.money_payments);
        
        
        
        //虚拟商品种类
        $scope.money_deals=json.money_deals;
        
        //首页码首位
        $scope.money_first_types=json.money_first_types;
    }
	
    
    
    /**
     * 调用本方法的功能:充值,提现,转账
     * 把虚拟商品添加到购物车,假添加
     * money_first_type_id:业务类型,比如"充值","提现","转账","兑换"
     * money_payment_start_id:使用的支付方式
     * money_payment_end_id: 产出的支付方式
     */
    $scope.addCart = function(money_first_type_id,money_payment_start_id,money_payment_end_id){
    	var key_name = money_first_type_id+"_"+money_payment_start_id+"_"+money_payment_end_id;
    	var deal={};
    	deal=$scope.money_deals[key_name];
    	
    	if($.isEmptyObject(deal)){
    		//没有该货币商品
    		alert("该功能暂未开通,请联系管理员");
    	}else{
    		//有该货币商品
    		var deal_id=deal.id;
    		//alert("货币商品ID"+deal_id);
    		var action=$scope.money_first_types[money_first_type_id-1].action;
    		location.href=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_finance+"/"+$scope.json_config.module+"/"+ action+".do?deal_id="+deal_id;
    	}
    };
    
    
    $scope.coin_from="";//转换的币种选择
    $scope.coin_to="";//转换成什么币
    
    $scope.coin_from_name="";//转换的币种中文名
    $scope.coin_to_name="";//转换成什么币,中文名
    $scope.fn=function () {
        $("#picker-from").picker({
            title: "请选择",
            cols: [
                {
                    textAlign: 'center',
                    values: $scope.money_name_cols
                }
            ],
            onClose:function (data) {
            	$scope.coin_from_name=data.value;
            	$scope.coin_from=$scope.money_name_key_value[data.value].id;
            }
        });
        $("#picker-to").picker({
            title: "请选择",
            cols: [
                {
                    textAlign: 'center',
                    values:  $scope.money_name_cols
                }
            ],
            onClose:function (data) {
            	$scope.coin_to_name=data.value;
            	$scope.coin_to=$scope.money_name_key_value[data.value].id;
            }
        });
    }
    $scope.fn();
    /**
     * 确认兑换
     */
    $scope.doExchange=function(){
    	//$.toast(, "cancel");
        if(""==$scope.coin_from){
        	$.toast("请选择需要兑换前的币种!!!", "cancel");
        }else if(""==$scope.coin_to){
        	$.toast("请选择需要兑换后的币种!!!", "cancel");
        }else if($scope.coin_from==$scope.coin_to){
        	$.toast("前后兑换的币种种类不能一样!!!", "cancel");
        }else{
        	var money_first_type_id=4;
        	var key_name = "4_"+$scope.coin_from+"_"+$scope.coin_to;
        	var deal={};
        	deal=$scope.money_deals[key_name];
        	
        	if($.isEmptyObject(deal)){
        		//没有该货币商品
        		$.toast($scope.coin_from_name+"兑换"+$scope.coin_to_name+",功能暂未开通,请联系管理员", "cancel");
        	}else{
        		if($scope.send_money>0){
        			var money_key=$scope.money_name_key_value[$scope.coin_from_name].class_name;
        			if($scope.json.user_finance[money_key]<$scope.send_money){
        				$.toast("兑换的数额必须小于当前剩余数额:"+$scope.json.user_finance[money_key], "cancel");
        			}else{
        				//有该货币商品
        				var deal_id=deal.id;
        				//alert("货币商品ID"+deal_id);
        				var action="do"+$scope.money_first_types[money_first_type_id-1].action;
        				var url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_finance+"/"+$scope.json_config.module+"/"+ action+".do";
        			
        				var json_param={};
        				json_param['deal_id']=deal_id;
        				json_param[money_key]=$scope.send_money;
        				//json_param['key_name']=key_name;	//货币商品的键名,不进行优化
        				$http({
        		            method: 'post',
        		            url: url,
        		            data:$.param(json_param),
        		            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        		        }).then(function successCallback(data) {
        		            // 请求成功执行代码
        		        	if(-1==data.data.err_code){
        		        		$.toast(data.data.err_msg);
        		        		location.reload();
        		        	}else{
        		        		$.toast(data.data.err_msg, "cancel");
        		        	}
        		        }, function errorCallback(data) {
        		            // 请求失败执行代码
        		            console.log("error:"+data);

        		        });
        			}
        		}else{
        			$.toast("兑换的数额必须大于0", "cancel");
        		}
        	}
        }
    }
    
    
    //跳转去明细
    $scope.jumpToLogs=function(money_id){
    	var url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_finance+"/"+$scope.json_config.module+"/log.do?money_id="+money_id;
    	location.href=url;
    };
});

//移除第一项
kmy_app.filter('filterFirst',function(){
    return function(inputArray){
        var array = [];
        for(var i=1;i<inputArray.length;i++){
            array.push(inputArray[i]);
        }
        return array;
    }
});

//移除第一项和最后一项
kmy_app.filter('filterEndFirst',function(){
    return function(inputArray){
        var array = [];
        for(var i=0;i<inputArray.length-1;i++){
            array.push(inputArray[i].name);
        }
        return array;
    }
});

kmy_app.filter('filterEndKeyValueFirst',function(){
    return function(inputArray){
        var array = {};
        for(var i=0;i<inputArray.length-1;i++){
            array[inputArray[i].name]=inputArray[i];
        }
        return array;
    }
});

kmy_app.filter('filterSecond',function(){
    return function(inputArray){
        var array = [];
        for(var i=0;i<inputArray.length;i++){
        	if(i!=2&&i!=4){
        		array.push(inputArray[i]);
        	}
        }
        return array;
    }
});


