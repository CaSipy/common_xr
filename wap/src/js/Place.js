
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
//		console.log($scope.json.cart_url);
		
	}
	//tianjia
	$scope.add=function(){
		var url = "add.do";
		if($scope.json.cart_url != undefined){
			url += "?cart_url="+$scope.json.cart_url;
		}
		
		location.href=url;
	}
	//编辑
	$scope.editer=function(id){
		var url = "edit.do?id="+id;
		if($scope.json.cart_url != undefined){
			url += "&cart_url="+$scope.json.cart_url;
		}
		location.href=url;
	}
	//删除
	$scope.del=function(id,index){
		$.confirm({
			title: '删除地址',
			text: '确定要删除该地址？',
			onOK: function() {
				//点击确认
				var change_url ="del.do?id="+id;
		//		json_param['str'] = $scope.str;
				$http({
					method: 'post',
					url: change_url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					// 判断成功状态
					if(data.data.err_code==-1){
						$.toast(data.data.err_msg);
						json.list.splice(index,1);
						history.go(0);
					}else{
						$.toast(data.data.err_msg,"forbidden")
					}
				}, function errorCallback(data) {
					// 请求失败执行代码
					console.log("error:" + data);
					$.toast("网络错误","forbidden")
				});
			},
			onCancel: function() {}
		});
		
	}
	//修改默认地址
	$scope.setDefault=function(id){
//		console.log(id);
		$.confirm({
			title: '设置默认',
			text: '确定把该地址设为默认地址？',
			onOK: function() {
				//点击确认
				var change_url ="setDefaultAddress.do?id="+id;
		//		json_param['str'] = $scope.str;
				$http({
					method: 'post',
					url: change_url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function successCallback(data) {
					// 请求成功执行代码
					// 判断成功状态
					
					if(data.data.err_code==-1){
						$.toast(data.data.err_msg);
						$scope.goBack();
					}else{
						$.toast(data.data.err_msg,"forbidden")
					}
					
				}, function errorCallback(data) {
					// 请求失败执行代码
					$.toast("网络错误","forbidden")
				});
			},
			onCancel: function() {}
		});
	}
	//创建或者更新地址
	$scope.create=function(id){
//		console.log(id);
		var change_url ="createOrUpdate.do";
//		json_param['str'] = $scope.str;
		$http({
			method: 'post',
			url: change_url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(data) {
			// 请求成功执行代码
			// 判断成功状态
			if(data.data.err_code==-1){
				$.toast(data.data.err_msg);
			}else{
				$.toast(data.data.err_msg,"forbidden")
			}
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.toast("网络错误","forbidden")
		});
	}
	$scope.shopCart = function(id){	
		if($scope.json.cart_url != undefined){
			$.ajax({
				url:'setDefaultAddress.do?id='+id,
				method:'post',
				dataType:'json',
				success:function(rs){
//					alert($scope.json.cart_url);
					window.location.href=$scope.json.cart_url;
				}
			});
		
		}		
	}
	$scope.goBack = function(){	
		if($scope.json.cart_url != undefined){
			window.location.href=$scope.json.cart_url;
		}else{
			window.history.go(-1);
		}		
	}
});




$(function() {
	//	地址默认选择
	$("input[name='checkbox1']").click(function() {
		$("p[name='rP-defa']").removeClass('rP-fontClor');
		if($(this).is(':checked')) {
			$(this).parent("div").siblings('div').children("p[name='rP-defa']").addClass('rP-fontClor');
		}
	});
	//	点击保存跳转
	$('#savePlace').click(function() {
		
		$.toast("保存成功", 2000);
		setTimeout(function () {
			window.location.href = "index.do";
			}, 2000);
		
	});
	
	
});