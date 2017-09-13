'use strict';
//angular的js
var kmy_app = angular.module('app',['ngSanitize']);


kmy_app.controller('ctrl',function($scope,$http,$interval){
	var str = /^1(3|4|5|7|8)\d{9}$/;
	var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
	var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	var bankNum = /^(\d{16}|\d{19})$/;
	$scope.en_name="";
	$scope.en_phone="";
	$scope.en_idCard="";
	$scope.en_bankNum="";
	$scope.en_bankName="";
	$scope.en_insurance="";
	$scope.en_selProfessional="";
	$scope.en_writeProfessional="";
	$scope.en_address="";
	$scope.positive_idCard="";
	$scope.reverse_idCard="";
	$scope.other_card_imgs="";
	$scope.agreement=false;
	
	var professional_field_ids ="";
	var area_id = "";
	//专业领域
	/**
	 *	获取json数据,服务器返回用来初始化页面的 
	 */
	
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
          
          console.log(data);
          if(json.account_name != null){
	          $scope.en_bankName=json.account_name;
	          $scope.en_bankNum=json.bank_card;
	          $scope.en_name=json.master_name;
	          $scope.en_phone=json.master_mobile;
	          $scope.en_insurance=json.policy_no;
	          $scope.en_idCard=json.id_card;
	          $scope.en_writeProfessional=json.professional_field_desc;
	          $scope.en_selProfessional=json.desc;
	          professional_field_ids = json.professional_field_ids
	          //$scope.en_address=json.areas_name;
	          console.log(json.areas_name);
	          //area_id=json.code;
	          
	          $scope.area=json.areas_name;
	          $scope.province=json.province.title;
	          $scope.city=json.city.title;
	          area_id=json.area_id;
          }
          
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
        	    		area_id="";
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
      	    	area_id=$("#area").data("values");
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
//		$scope.return_url=json.return_url;
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
			if($scope.en_phone==""||$scope.en_phone==undefined){
				$.toast("手机不可为空","forbidden");
				return false
			}else if(!str.test($scope.en_phone)){
				$.toast("手机格式不正确", "forbidden");
				return false;
			}else{
				if($scope.en_idCard==""||$scope.en_idCard==undefined){
					$.toast("身份证不可为空","forbidden");
					return false
				}else if((!isIDCard1.test($scope.en_idCard))&&(!isIDCard2.test($scope.en_idCard))){
					$.toast("身份证格式不正确", "forbidden");
					return false;
				}else{
//					if($scope.en_bankNum==""){
//						$.toast("银行卡不可为空", "forbidden");
//						return false;
//					}else 
					if($scope.en_bankNum!=""&&!bankNum.test($scope.en_bankNum)){
						console.log($scope.en_bankNum);
						$.toast("银行卡长度不正确", "forbidden");
						return false;
					}else{
//						if($scope.en_bankName==""){
//							$.toast("持卡人姓名不可为空","forbidden");
//							return false
//						}else{
							if($scope.en_selProfessional==""){
								$.toast("请选择专业领域","forbidden");
							}else{
								if($scope.area_id==""){
									$.toast("请选择服务地区","forbidden");
								}else{
									if($scope.positive_idCard==""){
										$.toast("正面身份证照不可为空","forbidden");
									}else if($scope.reverse_idCard==""){
										$.toast("反面身份证照不可为空","forbidden");
									}else{
										if(!$scope.agreement){
											$.toast("未同意服务协议","forbidden");
										}else{
											var enter_url=$scope.json_config.project_url+"/master/doUpload.do";
//											json_param['master_name']=$scope.en_name;
//											json_param['master_mobile']=$scope.en_phone;
//											json_param['id_card']=$scope.en_idCard;
//											json_param['bank_card']=$scope.en_bankNum;
//											json_param['account_name']=$scope.en_bankName;
//											json_param['policy_no']=$scope.en_insurance;
//											json_param['professional_field_ids']=professional_field_ids;
//											json_param['professional_field_desc']=$scope.en_writeProfessional;
//											json_param['area_id']=area_id;
//											json_param['id_card_heads_img']=$scope.positive_idCard;
//											json_param['id_card_tails_img']=$scope.reverse_idCard;
//											json_param['other_card_imgs']=$scope.other_card_imgs;
										
											data.append('master_name', $scope.en_name);
											data.append('master_mobile', $scope.en_phone);
											data.append('id_card', $scope.en_idCard);
											data.append('bank_card', $scope.en_bankNum);
											data.append('account_name', $scope.en_bankName);
											data.append('policy_no', $scope.en_insurance);
											data.append('professional_field_ids', professional_field_ids);
											data.append('professional_field_desc', $scope.en_writeProfessional);
											data.append('area_id', area_id);
											$.showLoading();
											$http({
									            method: 'post',
									            url: enter_url,
									            data: data,
									            headers: {'Content-Type': undefined},
										        transformRequest: angular.identity
									        }).then(function successCallback(data) {
									            // 请求成功执行代码
												// 判断成功状态
									        	if(-1==data.data.err_code){
							//		        		成功
									        		$.toast("申请成功，等待审核",2000);
									        		location.href=$scope.json_config.project_url+"/master/inAudit.do";
									        	}else{
									        		$.hideLoading();
									        		$.toast(data.data.err_msg,"forbidden");
									        	}
									        }, function errorCallback(data) {
									            // 请求失败执行代码
									            alert("访问错误");
									            $.hideLoading();
									        });
										}
									}
								}
							}
//						}
					}
				}
			}
		}
	}
	
//	地址处理
//	$("#start").cityPicker({
//		title: "请选择服务地区"
//	});
//	上传图片处理
	
	/*----------------下面是上传图片--------------------*/
	
	$scope.reader = new FileReader();   //创建一个FileReader接口
    $scope.form = {     //用于绑定提交内容，图片或其他数据
        image:{},
    };
    $scope.thumb = {};      //用于存放图片的base64
    $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
        1111:{}
    };
    $scope.maxnum=5;//上传最多的图片数量
    $scope.num=5;//当前上传的照片
    var json=[];
    var s=0;
    var data = new FormData();      //以下为像后台提交图片数据
    
    //身份证正面
    $scope.positive_idCard_upload = function(files){
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
            $scope.$apply(function(){
            	$scope.positive_idCard = ev.target.result  //接收base64
            	$("#heads_div").hide();
            });
        };
        data.append('positive_idCard',files[0]);
    }
    //删除身份证正面
    $scope.positive_idCard_del = function(){
    	$scope.positive_idCard = "";
    	$("#heads_div").show();
    }
    
    //身份证反面
    $scope.reverse_idCard_upload = function(files){
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
            $scope.$apply(function(){
            	$scope.reverse_idCard = ev.target.result  //接收base64
            	$("#tails_div").hide();
            });
        };
        //console.log($scope.positive_idCard);
        data.append('reverse_idCard',files[0]);

    }
    //删除身份证反面
    $scope.reverse_idCard_del = function(){
    	$scope.reverse_idCard = "";
    	$("#tails_div").show();
    }
    
    //其他证件
    $scope.others_card_upload = function(files){
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
            $scope.$apply(function(){
            	$scope.others_card = ev.target.result  //接收base64
            	$("#other_div").hide();
            });
        };
        //console.log($scope.positive_idCard);
        data.append('others_card',files[0]);
    }
    //删除其他证件
    $scope.others_card_del = function(){
    	$scope.others_card = "";
    	$("#other_div").show();
    }
	/*---------------上面是上传图片-------------*/
    
    //展示服务协议
    $scope.showAgreement=function () {
		$("#popup_agreement").popup();
		//后台数据请求
 		var detail_url=project_url+"/"+module+"/getAgreement.do";
 		$http({
 			method: 'post',
 			url: detail_url,
 			headers:{'Content-Type': 'text/html'}
 		}).then(function successCallback(data) {
 			// 请求成功执行代码
 			// 判断成功状态
 			//console.log(data);
// 			$scope.msg = data.data;
 			$("#msg").html(data.data);
 		}, function errorCallback(data) {
 			// 请求失败执行代码
 			console.log("error:"+data);

 		});
	}
    $scope.closePop=function(){
		$.closePopup();
	}
});
$(function(){
	var txt='<a href="javascript:;" class="allSel" style="right: 123;left: 0;" ng-click="">确定</a>';
	
});
