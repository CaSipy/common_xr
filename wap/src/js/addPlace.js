
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$filter){
	$scope.receiver_name="";//收货人名称
	$scope.receiver_phone="";//收货人电话
	$scope.province_name="";//省份名称
	$scope.city_name="";//城市名称
	$scope.village_name="";//地区名称
	$scope.id="";//地址ID
	$scope.address="";//详细地址
	$scope.isDefault="";//是否默认
	$scope.area="";
	$scope.is_chose=false;//是否默认
//	var _TheArray = new Array("440000","440200","440203");
	$("#start").cityPicker({
		title: "请选择收货地址",
		onClose:function(picker, values, displayValues){
//			console.log($(this));
			$scope.province_id=picker.value[0];
			$scope.city_id=picker.value[1];
			$scope.village_id=picker.value[2];
		}
	});
	$("#start").click(function(){
		$("input").blur();
		$('textarea').blur();
	});
	
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
//	console.log(json);
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		var init_url="index.do"+init_param;
		var json_param = {};
		//传递3个值 是否为vip 用户名 id
		json_param['user_name'] = $scope.user_name;
		json_param['user_num'] = $scope.user_num;
		$http({
            method: 'post',
            url: init_url,
            data: $.param(json_param),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
            // 请求成功执行代码
            json=data.data;
            $scope.json=data.data;
            $scope.json_config=data.data.json_config;
//          获取值传递
			
        }, function errorCallback(data) {
            // 请求失败执行代码
            console.log("error:"+data);
            $.toast("网络错误","forbidden")

        });
	}else{
		
		$scope.json=json;
		$scope.json_config=json.json_config;
//		console.log(json);
		if(json.vo!=null){
			$scope.receiver_name=json.vo.receiver_name;//收货人名称
			$scope.receiver_phone=parseInt(json.vo.receiver_phone);//收货人电话
			$scope.province_name=json.vo.province_name;//省份名称
			$scope.city_name=json.vo.city_name;//城市名称
			$scope.village_name=json.vo.village_name;//地区名称
			
			$scope.province_id=json.vo.province_id;//省份名称
			$scope.city_id=json.vo.city_id;//城市名称
			$scope.village_id=json.vo.village_id;//地区名称
			
			$scope.id=json.vo.id;//地址ID
			$scope.address=json.vo.address;//详细地址
			
			$scope.area=$scope.province_name+' '+$scope.city_name+' '+$scope.village_name;
	//		$("#start").val($scope.area);
//			console.log($scope.area);
			$scope.isDefault=parseInt(json.vo.isDefault);//是否默认
			if($scope.isDefault==1)
				$scope.is_chose=true;
		}
	}
	$scope.fn=function(){
		$.toast($("#start").val());
	}
	//编辑
	$scope.edit=function(id){
		if($scope.is_chose)
			$scope.isDefault=1;
		else
			$scope.isDefault=0;
//		console.log(id);
		var change_url ="createOrUpdate.do";
		var json_params={};
		json_params['id'] = id;
		json_params['receiver_name'] = $scope.receiver_name;
		json_params['receiver_phone'] = $scope.receiver_phone;
		json_params['address'] = $scope.address;
		json_params['province_id'] = $scope.province_id;
		json_params['city_id'] = $scope.city_id;
		json_params['village_id'] = $scope.village_id;
		json_params['isDefault'] = $scope.isDefault;
		$http({
			method: 'post',
			url: change_url,
			data: $.param(json_params),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(data) {
			// 请求成功执行代码
			// 判断成功状态
			if(data.data.err_code==-1){
				$.toast(data.data.err_msg);
				var url = "index.do";
				if($scope.json.cart_url != undefined){
					url += "?cart_url="+$scope.json.cart_url;
				}
				location.href=url;
			}else{
				$.toast(data.data.err_msg,"forbidden");
			}
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.toast("网络错误","forbidden")
		});
	}
	$scope.save=function(id){
		
		console.log(json.vo.address);
		console.log($scope.is_chose);
		console.log($scope.id);
	}
	
	//创建地址
	$scope.create=function(){
		if($scope.is_chose)
			$scope.isDefault=1;
		else
			$scope.isDefault=0;
		var change_url ="createOrUpdate.do";
		var json_param={};
		json_param['receiver_name'] = $scope.receiver_name;
		json_param['receiver_phone'] = $scope.receiver_phone;
		json_param['address'] = $scope.address;
		json_param['province_id'] = $scope.province_id;
		json_param['city_id'] = $scope.city_id;
		json_param['village_id'] = $scope.village_id;
		json_param['isDefault'] = $scope.isDefault;
		$http({
			method: 'post',
			url: change_url,
			data: $.param(json_param),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(data) {
			// 请求成功执行代码
			// 判断成功状态
			if(data.data.err_code==-1){
				$.toast(data.data.err_msg);
				var url = "index.do";
				if($scope.json.cart_url != undefined){
					url += "?cart_url="+$scope.json.cart_url;
				}
				location.href=url;
			}else{
				$.toast(data.data.err_msg,"forbidden")
			}
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.toast("网络错误","forbidden")
		});
	}

	
	
	
});




//$(function() {
	//	地址默认选择
//	$("input[name='checkbox1']").click(function() {
//		$("p[name='rP-defa']").removeClass('rP-fontClor');
//		if($(this).is(':checked')) {
//			$(this).parent("div").siblings('div').children("p[name='rP-defa']").addClass('rP-fontClor');
//		}
//	});
	//	点击保存跳转
//	$('#savePlace').click(function() {
//		
//		$.toast("保存成功", 2000);
//		setTimeout(function () {
//			window.location.href = "receiptPlace_static.html";
//			}, 2000);
//		
//	});\	
	
	
//});