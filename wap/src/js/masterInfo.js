'use strict';
//angular的js
var kmy_app=angular.module('app',[]);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	var str = /^1(3|4|5|7|8)\d{9}$/;
	var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
	var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	var bankNum = /^(\d{16}|\d{19})$/;
	$scope.username==""
	$scope.en_name="";
	$scope.en_phone="";
	$scope.en_bankNum="";
	$scope.en_bankName="";
	$scope.en_insurance="";
	$scope.en_selProfessional="";
	$scope.en_writeProfessional="";
	$scope.en_address="";
	$scope.other_card_imgs="";
	
	var professional_field_ids ="";
	var area_id = "";
	
	//专业领域
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	var json=[];
	if($.isEmptyObject(json)){
		var init_param="?is_json=2";
		// var init_url="http://qiu.mingkong.com/login/user/login.do"+init_param;
		//var init_url="https//:192.168.1.116/login/user/login.do"+init_param;
		var init_url = pre_url_param+"&is_json=1";
		//console.log(init_url);

		$http({
        method: 'post',
        url: init_url,
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(data) {
        // 请求成功执行代码
        json=data.data;
        $scope.json=data.data;
        $scope.json_config=data.data.json_config;
        
        //console.log(data);
        $scope.en_name=json.data.master_name;
        $scope.en_phone=json.data.master_mobile;
        $scope.en_insurance=json.data.policy_no;
        $scope.en_bankName=json.data.account_name;
        $scope.en_bankNum=json.data.bank_card;
        $scope.en_writeProfessional=json.data.professional_field_desc;
        $scope.en_selProfessional=json.data.desc;
        professional_field_ids = json.data.professional_field_ids;
        
        $scope.area=json.data.areas_name;
        $scope.province=json.province.title;
        $scope.city=json.city.title;
        $scope.village_id = json.data.area_id;
        
    	 //专业领域
        $("#picker").select({
    	    title: "您的专业领域",
    	    multi: true,
    	    items: json.deal,
    	    onChange:function(){
    	    	professional_field_ids = $("#picker").data("values");
    	    	//console.log($("#picker").data("values"));
    	    }
    	  });
        $("#picker").focus(function(){
				document.activeElement.blur();
		  });
		  
        //省
        $("#province").select({
    	    title: "请选择省",
    	    multi: false,
    	    items: json.provinces,
    	    onChange:function(picker, values, displayValues){
    	    	var province_code = $("#province").data("values");
      	    	$http({
      	          method: 'post',
      	          url: project_url+"/masterInfo/getCity.do?pcode="+province_code,
      	          headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      	    	}).then(function successCallback(data) {
      	    		json.cities = data.data;
      	    		$("#city").select("update", {items:json.cities});
      	    		
      	    		$scope.city = "";
      	    		$scope.area = "";
      	    		$scope.village_id="";
      	    	},function errorCallback(data) {
      	          // 请求失败执行代码
      	          console.log("error:"+data);
      	    	});
      	    }
        });
        $("#province").focus(function(){
			document.activeElement.blur();
		});
        
        //市
        $("#city").select({
    	    title: "请选择市",
    	    multi: false,
    	    items: json.cities,
    	    onChange:function(picker, values, displayValues){
    	    	var city_code = $("#city").data("values");
      	    	$http({
      	          method: 'post',
      	          url: project_url+"/masterInfo/getArea.do?pcode="+city_code,
      	          headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      	    	}).then(function successCallback(data) {
      	    		json.cities = data.data;
      	    		$("#area").select("update", {items:json.cities});
      	    		
      	    		$scope.area = "";
      	    		$scope.village_id="";
      	    	},function errorCallback(data) {
      	          // 请求失败执行代码
      	          console.log("error:"+data);
      	    	});
      	    }
        });
        $("#city").focus(function(){
			document.activeElement.blur();
		});
        
        //区
        $("#area").select({
    	    title: "请选择服务地区",
    	    multi: true,
    	    items: json.areas,
    	    onChange:function(picker, values, displayValues){
    	    	$scope.village_id=$("#area").data("values");
      	    	console.log($("#area").data("values"));
      	    }
        });
        $("#area").focus(function(){
			document.activeElement.blur();
		});
        
    }, function errorCallback(data) {
        // 请求失败执行代码
        console.log("error:"+data);
    });
	}else{
		$scope.json=json;
		$scope.json_config=json.json_config;
		//$scope.return_url=json.return_url;
	}
	
	//测试
//	$scope.positive_idCard="123.jpg";
//	$scope.reverse_idCard="456.jpg";
//	点击保存
	$scope.save=function(){
		if($scope.en_name==""){
			$.toast("姓名不可为空","forbidden");
			return false
		}else{
			if($scope.en_phone==""){
				$.toast("联系手机不可为空","forbidden");
				return false
			}else if(!str.test($scope.en_phone)){
				$.toast("手机格式不正确", "forbidden");
				return false;
			}else{
				if($scope.en_bankNum==""){
					$.toast("银行卡不可为空", "forbidden");
					return false;
				}else if(!bankNum.test($scope.en_bankNum)){
					$.toast("银行卡长度不正确", "forbidden");
					return false;
				}else{
					if($scope.en_bankName==""){
						$.toast("持卡人姓名不可为空","forbidden");
						return false
					}else{
						if($scope.en_selProfessional==""){
							$.toast("请选择专业领域","forbidden");
						}else{
						if($scope.village_id==""){
							$.toast("请选择服务地区","forbidden");
						}else{
							var enter_url="update.do";
							var data = {};
							data["master_name"] = $scope.en_name;
							data['master_mobile'] = $scope.en_phone;
							data['id_card'] = $scope.en_idCard;
							data['bank_card'] = $scope.en_bankNum;
							data['account_name'] = $scope.en_bankName;
							data['policy_no'] = $scope.en_insurance;
							data['professional_field_ids'] = professional_field_ids;
							data['professional_field_desc'] = $scope.en_writeProfessional;
							data['area_id'] = $scope.village_id;
							console.log(data);
							$http({
					            method: 'post',
					            url: enter_url,
					            data: $.param(data),
					            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
					        }).then(function successCallback(data) {
					            // 请求成功执行代码
								// 判断成功状态
					        	if(-1==data.data.err_code){
			//		        		成功
					        		$.toast("修改成功",2000);
					        		location.href=$scope.json_config.project_url+"/master/center.do";
					        	}else{
					        		$.toast(data.data.err_msg,"forbidden");
					        	}
					        }, function errorCallback(data) {
					            // 请求失败执行代码
					            console.log("error:"+data);
			
					        });
							}
						}
					}
				}
			}
		}
	}
});