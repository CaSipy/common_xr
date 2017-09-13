var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function ($scope,$http) {
	/**
     *	获取json数据,服务器返回用来初始化页面的
     */
    if($.isEmptyObject(json)){
        var init_param="?is_json=2";
        var init_url="http://qiu.mingkong.com/finance/userMoney/incharge.do"+init_param;

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
    
    $scope.class_name=$scope.json.payment_rules[0].class_name;
    $scope.deal_id=$scope.json.deal_id;
    $scope.pay_type="请选择";
    $scope.is_user_payment_id=false;	//是否启用在线支付方式
    $scope.payment_id=0;				//在线支付方式
    $scope.is_input_money=false;	//是否展示输入钱的计算器
    $scope.money=0;					//本笔交易的总额
    //初始化
    if(-1==$scope.json.total_money){
    	$scope.is_input_money=true;
    }else{
    	 $scope.money=$scope.json.total_money;
    }
	
    $scope.money_ratio = {};
    $scope.payment_rules={};
    for(var i=0;i<$scope.json.payment_rules.length;i++){
    	var class_name = $scope.json.payment_rules[i].class_name;
    	if("payment_id"==class_name){
    		$scope.is_user_payment_id=true;
    	}
    	$scope.payment_rules[class_name]=$scope.json.payment_rules[i];
    }
    
	//下单
    $scope.createOrder=function(){
    	if(""==$scope.user_name || undefined==$scope.user_name){
    		$.toast("对方账户ID必填", "cancel");
    		return;
    	}
		$.confirm({
			title: '确认转账',
			text: '账号：'+$scope.user_name,
			onOK: function () {
				//点击确认
				var order_url=$scope.json_config.domain_url+"/"+$scope.json_config.project_name_finance+"/"+$scope.json_config.module+"/do"+ $scope.json_config.action+".do?qiu=1";

				var is_jump=false;
				var json_param={};
				var param_str="";
				json_param['deal_id']=$scope.deal_id;
				param_str+="&deal_id="+json_param['deal_id'];

				json_param['user_id']=$scope.user_name;
				param_str+="&user_id="+json_param['user_id'];

				for(var i=0;i<$scope.json.payment_rules.length;i++){
					var class_name = $scope.json.payment_rules[i].class_name;
					if("payment_id"==class_name){
						json_param['payment_id']=$scope.payment_id;
						json_param['payment_money']=$scope.money*$scope.payment_rules['payment_id'].money_ratio;
						if(json_param['payment_money']>0){
							is_jump=true;
						}
						param_str+="&payment_id="+json_param['payment_id'];
						param_str+="&payment_money="+json_param['payment_money'];
					}else{
						json_param[class_name]=$scope.money*$scope.payment_rules[class_name].money_ratio;
						param_str+="&"+class_name+"="+json_param[class_name];
					}
				}

				if(is_jump){
					location.href=order_url+param_str;
				}else{
					$http({
						method: 'post',
						url: order_url,
						data:$.param(json_param),
						headers:{'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(function successCallback(data) {
						// 请求成功执行代码
						if(-1==data.data.err_code){
							$.toast(data.data.err_msg, "cancel");
							location.reload();
						}else{
							$.toast(data.data.err_msg, "cancel");
						}
					}, function errorCallback(data) {
						// 请求失败执行代码
						console.log("error:"+data);

					});
				}
			},
			onCancel: function () {
				//取消
			}
		});

	};
	
	

	//点击弹出框
	$scope.submit=function(name){
		$("#about").popup();
	}
	//选择支付方式
	$scope.chose=function(name,id){
		$scope.pay_type=name;
		$scope.payment_id=id;
	}
	//确认支付
	$scope.check=function(name){
		if($scope.pay_type=="请选择充值方式"){
			$.toast("请选择支付方式","forbidden");
		}else if($scope.money==""){
			$.toast("请输入支付价钱","forbidden")
		}else{
			//开始支付
		}
	}

	var str = '';
	var Newstr = '';
	$("a[name='btn_num']").each(function() {
		$(this).click(function() {
			var reg = /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			if(str == '' && $(this).children('p').html() == '.') {
				str = '0.';
				$('#money').val(str);
			}
			else {
				str += $(this).children('p').html();
			}
			if(!reg.test(str)) {
				if(str.indexOf('.') >= 0) {
					var arr = str.split('.');
					if(arr[1].length > 2) {
						arr[1] = arr[1].substring(0, 2);
					}else{
						arr[1]=arr[1];
					}
					str = arr[0] + '.' + arr[1];
				}else{
					str=str;
				}
				$('#money').val(str);
				console.log(str);

			} else {
				$('#money').val(str);

			}
			$scope.money=str;
		});
	});
	//	删除
	$('#backspace').click(function() {
		str = $('#money').val();
		str = str.substring(0, str.length - 1);
		$('#money').val(str);
		$scope.money=str;
	});
	//关闭弹出框
	$scope.closePopup=function(){
		$.closePopup();
	}
	//弹出键盘事件
	$scope.keyboard=function () {
		$("#keyboard").popup();
	}
});
