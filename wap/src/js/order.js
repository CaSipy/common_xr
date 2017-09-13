/**
 * Created by Fra on 2017/5/27.
 */
function calculate(obj) {
    if($(obj).val().length > $(".eva_num_all").html()) {
        $.toast("文字超过限制", "forbidden");
        $(obj).val($(obj).val().substring(0, $(".eva_num_all").html()));
    } else {
        $('#eva_num').html($(obj).val().length);
    }
}

/*控制输入数字的长度为5*/
function control_length(obj){
    if(obj.value.length>5)obj.value=obj.value.slice(0,5);
}


var app = angular.module('app',['ngSanitize']);
app.controller('ctrl', function($scope, $http) {
	
	//定义时间
	$scope.data = new Date();
	var year = $scope.data.getFullYear();
	var month = $scope.data.getMonth()+1;
	var day = $scope.data.getDate();
	var hour = $scope.data.getHours() + 2;
	var min = $scope.data.getMinutes();
	if(hour==24){
		hour=0;
	}else if(hour==25){
		hour=1;
	}
	$scope.dateChange=function(obj){
		if(obj<10){
			obj='0'+obj;
		}
		return obj;
	}
	year=$scope.dateChange(year);
	month=$scope.dateChange(month);
	day=$scope.dateChange(day);
	hour=$scope.dateChange(hour);
	min=$scope.dateChange(min);
	/*处理日期选择*/
	$("#time-format").datetimePicker({
	  title: '选择时间',
	  yearSplit: '年',
	  monthSplit: '月',
	  dateSplit: '日',
	  value: year+'年'+month+'月'+day+'日 '+hour+'时'+min+'分',
	  times: function () {
	      return [  // 自定义的时间
	          {
	              values: (function () {
	                  var hours = [];
	                  for (var i=0; i<24; i++) hours.push(i > 9 ? i : '0'+i);
	                  return hours;
	              })()
	          },
	          {
	              divider: true,  // 这是一个分隔符
	              content: '时'
	          },
	          {
	              values: (function () {
	                  var minutes = [];
	                  for (var i=0; i<59; i++) minutes.push(i > 9 ? i : '0'+i);
	                  return minutes;
	              })()
	          },
	          {
	              divider: true,  // 这是一个分隔符
	              content: '分'
	          }
	      ];
	  },
	    onChange: function (picker, values, displayValues) {
	    }
	});
	
//初始化
	var ratio = 1;	//积分比例
	var bar=1;  //金额比例
	$scope.zishu=200;
	
	$scope.desc ="";
	$scope.service_time = "";
    $scope.user_name = '';//用户名称
    $scope.phone = '';//用户电话
    $scope.address = '';//收货地址
    $scope.type = '';//商品类型
    $scope.title = '';//商品名称
    $scope.deal_id = '';//商品id
//  $scope.price = '';//订单单价
    $scope.price = 123;//订单单价
    $scope.number = 1;//订单数量
    $scope.serve_func_order = $scope.number * $scope.price;//订单应付价格
    $scope.deduction = 0;//抵扣券金额 //抵扣券金额 假设抵扣券返回来金额，用于计算最终订单
    $scope.deduction_num = 0;//抵扣券数量
    $scope.coupon_id = 0;//定义抵扣券ID
    $scope.score = 0;//积分
    $scope.balance = 0;//余额
    $scope.cheap =  $scope.deduction + $scope.score + $scope.balance; //优惠的金额
    $scope.payment_money = $scope.serve_func_order - $scope.cheap;//待支付金额 = 订单应付价格 - 优惠的金额
    $scope.agreement=false;
    /*支付方式的循环*/
    $scope.payments_list = [
        {
            id:'0',
            name:'微信支付',
            img_url:'http://common.huibaoming.cn/wap/images/wechat.png'
        },
        {
            id:'1',
            name:'支付宝支付',
            img_url:'http://common.huibaoming.cn/wap/images/PayTreasure.png'
        }
    ];
    $scope.payment_id = $scope.payments_list[0].id;//初始化支付方式的ID
    /*处理点击切换支付方式的ID*/
    $scope.gainID = function (index) {
        $scope.payment_id = $scope.payments_list[index].id;
    }

    /*处理订单数量增加时*/
    $scope.add = function(){
        $scope.number++;
        $scope.serve_func_order = $scope.number * $scope.price;//订单应付价格
        $scope.payment_money = $scope.serve_func_order - $scope.cheap;//待支付金额 = 订单应付价格 - 优惠的金额
    }

    /*处理订单数量减少时*/
    $scope.reduce = function (){
        $scope.number--;
        if($scope.number<1){
            $scope.number = 1;
            return;
        }
        $scope.serve_func_order = $scope.number * $scope.price;//订单应付价格
        $scope.payment_money = $scope.serve_func_order - $scope.cheap;//待支付金额 = 订单应付价格 - 优惠的金额
    }
    /*处理直接输入订单数量时*/
    $scope.control_num = function (obj) {
        if($scope.number<=1 || $scope.number == ""){
            $scope.number = 1;
        }
        $scope.serve_func_order = $scope.number * $scope.price;//订单应付价格
        $scope.payment_money = $scope.serve_func_order - $scope.cheap;//待支付金额 = 订单应付价格 - 优惠的金额
    }
	$scope.cheap=$scope.deduction;
    
	$scope.control_score = function(obj){
    	var str1 = '';
		var Score = $("input.Score");
		var reg = /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		str1 = Score.val();
		if (!reg.test(str1)) {				
			if (str1.indexOf(".") >= 0) {
				var arr = str1.split('.');
				if (arr[1].length > 2) {
					arr[1] = arr[1].substring(0, 2);
				} else {
					arr[1] = arr[1];
				}
				str1 = arr[0] + '.' + arr[1];

			} else {
				str1 = "";
			}
			Score.val(Math.floor(str1 * 100) / 100);
			
		}
    	if($scope.balance==""){
			$scope.balance=0;
		}
    	if($scope.score==undefined){
    		$scope.score="";
    		$scope.cheap= Math.floor(($scope.deduction+$scope.balance*bar)* 100) / 100;
    		if($scope.cheap>$scope.serve_func_order){
				$scope.cheap=$scope.serve_func_order;
			}
    		$scope.payment_money = Math.floor(($scope.serve_func_order-$scope.cheap)* 100) / 100;
    	}else if($scope.score<0){
    		$scope.score=0;
    	}else{
	    	$scope.cheap=$scope.deduction+$scope.balance*bar;
	    	if($scope.cheap>=$scope.serve_func_order){
	    		$scope.score=0;
	    	}else{
	    		
	    		$scope.cheap= Math.floor(($scope.deduction+($scope.score*ratio)+($scope.balance*bar))* 100) / 100;
	    		if($scope.score==""){
					$scope.score=0;
				}
	    		if($scope.cheap>=$scope.serve_func_order){
	    			
	    			$scope.score= Number(Math.floor((($scope.serve_func_order - $scope.deduction- $scope.balance*bar)/ratio)* 100) / 100);
	    			$scope.cheap = Math.floor(($scope.deduction+$scope.score*ratio+$scope.balance*bar)* 100) / 100;
	  				//$scope.payment_money = ($scope.serve_func_order-$scope.cheap).toFixed(2);
	    		}
	    	}
	    	if($scope.cheap>$scope.serve_func_order){
				$scope.cheap=$scope.serve_func_order;
			}
	    	$scope.payment_money = Math.floor(($scope.serve_func_order-$scope.cheap)* 100) / 100;
    	}
    }
	$scope.control_balance = function(obj){
		//限制输入框输入金额格式
		var str = '';
		var money = $("input.balance");
		var reg = /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		str = money.val();
		
		if (!reg.test(str)) {				
			if (str.indexOf(".") >= 0) {
				var arr = str.split('.');
				if (arr[1].length > 2) {
					arr[1] = arr[1].substring(0, 2);
				} else {
					arr[1] = arr[1];
				}
				str = arr[0] + '.' + arr[1];

			} else {
				str = "";
			}
			money.val(Math.floor(str * 100) / 100);
		}
		//如果没有输入积分
		if($scope.score==""){
			$scope.score=0;
		}
		//如果金额为空
		if($scope.balance==undefined){
    		$scope.balance="";
    		$scope.cheap = Math.floor(($scope.deduction+$scope.score*ratio)* 100) / 100;
    		if($scope.cheap>$scope.serve_func_order){
				$scope.cheap=$scope.serve_func_order;
			}
    		$scope.payment_money = Math.floor(($scope.serve_func_order-$scope.cheap)* 100) / 100;
 		}else if($scope.balance<0){		//金额输入负数
    		$scope.balance=0;
    	}
		else{
			//在没有输入金额的时候的优惠价格
			$scope.cheap=Math.floor(($scope.deduction+$scope.score*ratio)* 100) / 100;
			//如果已经超过了商品金额 那就无法输入金额
			if($scope.cheap>=$scope.serve_func_order){
				$scope.balance=0;
			}else{
				//如果金额为空 计算时把它当为0
				if($scope.balance==""){
					$scope.balance=0;
				}
				//优惠券金额加限制
				$scope.cheap=Math.floor(($scope.deduction+$scope.score*ratio+$scope.balance*bar)* 100) / 100;
				if($scope.cheap>=$scope.serve_func_order){
	    			$scope.balance=Number(Math.floor((($scope.serve_func_order - $scope.deduction- $scope.score*ratio)/bar)* 100) / 100);
	    			$scope.cheap = Math.floor(($scope.deduction+$scope.score*ratio+$scope.balance*bar)* 100) / 100;
	    			//$scope.payment_money = ($scope.serve_func_order-$scope.cheap).toFixed(2);
	    		}
			}
			//待支付金额
			if($scope.cheap>$scope.serve_func_order){
				$scope.cheap=$scope.serve_func_order;
			}
			$scope.payment_money = Math.floor(($scope.serve_func_order-$scope.cheap)* 100) / 100;
		}
		
    }
	
	
	
	//	---卡券----------------------------------------------------------
	$scope.showCoupon = function() {
		$("#popup_agreement").popup();
	}
	
	$scope.changeCouponList = function(index) {
		$.showLoading();
		var type = index;
		if(type == 0){
			type = -1;
		}
		$scope.page = 1;
		$scope.choose = index;
		$scope.has_data = true;
		//后台写交互时记得解开下面这个语句
		//$scope.doSearch(false);
		var url = project_url + "/" + module+ "/couponList.do?is_json=2&type="+type+"&deal_id="+json.deal_id;
		$http({
			method : 'post',
			url : url,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			$.hideLoading();
			$scope.json = data;
			$scope.json_config = json.json_config;
			$scope.coupon_list=data.data;
			
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	}
	
	$scope.closeCoupon = function() {
		$scope.coupon_money=0;
		$.closePopup();
	}
	$scope.type_list=[
		{nav_name:"未使用"},
		{nav_name:"不可用"}
	];
	
	$scope.coupon_list = [];
	var json_param = [];
//	点击选择卡券
	$scope.exchange = function(index) {
//		$("figure.fig_active").addClass("fig_active");
		//选择时更换样式
		for(var i=0;i<$scope.coupon_list.length;i++){
			$scope.coupon_list[i].user_status='unuser';
		}
		$scope.coupon_list[index].user_status='user';
		//判断是否能用此优惠券
		if($scope.coupon_list[index].check_status!='SUCCESS'){
			$.toast("此券无法选取","forbidden");
			return false;
		}
		$scope.coupon_list[index].is_use=1;
//		$scope.coupon_id=$scope.coupon_list[index].id;
		$scope.deduction=$scope.coupon_list[index].money;
		$scope.coupon_id = $scope.coupon_list[index].id;
		$scope.cheap=Math.floor(($scope.deduction+$scope.score*ratio+$scope.balance*bar)* 100) / 100;
		if($scope.cheap>$scope.serve_func_order){
			$scope.cheap=$scope.serve_func_order;
		}
		$scope.payment_money=Math.floor(($scope.serve_func_order-$scope.cheap)* 100) / 100;
		$.closePopup();
	}
	$scope.doSearch = function(is_append) {
		var url="couponList.do";
		json_param['pageSize'] = 10;
		json_param['page'] = $scope.page;
		json_param['type'] = $scope.choose;
		json_param['is_json'] = 2;
		
		$http({
			method : 'post',
			url : url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			console.log(data);
			if (is_append) {
				if (data.data.length > 0)
					$scope.coupon_list.push.apply(
						$scope.coupon_list,
						data.data);
				else
					$scope.has_data = false;
			} else {
				$scope.coupon_list = data.data;
				if (data.data.length == 0)
					$scope.has_data = false;
			}
			console.log("111");
			$scope.page = $scope.page + 1;
			$.hideLoading();
			loading = false;
			inf_allow = true;
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log(data);
		});
	};
	// 滚动加载
	var loading = false; // 状态标记
	$(document.body).infinite().on("infinite", function() {
		if (loading || !$scope.has_data)
			return;
		$('.loadMore').removeClass('hide');
		loading = true;
		$.showLoading();
		$scope.doSearch(true);
		$('.loadMore').addClass('hide');
	});
//----------------------------------------------------------------------

    /*处理初始化*/
	if($.isEmptyObject(json)){
	      var init_url = '';
	      $scope.init = function(){
	          $http({
	              method:'post',
	              url:init_url,
	              headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	          }).then(function successCallback(data){
	              //请求成功执行代码
	              $scope.json = data.data;
	              $scope.json_config = data.data.json_config;
	              $scope.deal_id = json.deal.id;
	          },function errorCallback(){
	              // 请求失败执行代码
	              console.log("error:"+data);
	          });
	      }
	}else{
	      $scope.json = json;
	      $scope.json_config=json.json_config;
	      if(json.address != null){
	      	if(json.address.address != ""){
	      	$scope.user_name = json.address.user_name;//用户名称
	      	$scope.phone = json.address.phone;//用户电话
	      	$scope.address = json.address.address;//收货地址
	      	}else{
	      		$.toast("您的地址有误，请重新设置","cancel");
	      	}
	      }
	      $scope.service_time=year+'年'+month+'月'+day+'日 '+hour+'时'+min+'分';
	      $scope.type = '';//商品类型
	      $scope.title = json.deal.name;//商品名称
	      $scope.deal_id = json.deal.id;//商品id
	      $scope.price = json.deal.price;//订单单价
	      $scope.number = 1;//订单数量
	      $scope.serve_func_order = $scope.number * $scope.price;//订单应付价格
	      $scope.deduction = 0;//抵扣券金额 //抵扣券金额 假设抵扣券返回来金额，用于计算最终订单
//	      $scope.deduction_num = 0;//抵扣券数量
	      $scope.coupon_id = 0;//定义抵扣券ID
	      $scope.score = 0;//积分
	      $scope.cheap =  $scope.deduction + $scope.score //优惠的金额
	      $scope.payment_money = $scope.serve_func_order - $scope.cheap;//待支付金额 = 订单应付价格 - 优惠的金额
	      /*支付方式的循环*/
	      $scope.payments_list =json.payments;
	      $scope.payment_id = $scope.payments_list[0].id;//初始化支付方式的ID
	      
	      $scope.coupon_list = json.coupons;
	      
	      var deduction_num=0;
	  	  //判断有多少张优惠券可用
	  	  for(var i=0;i<$scope.coupon_list.length;i++){
	  		  if($scope.coupon_list[i].check_status=='SUCCESS'){
	  			deduction_num+=$scope.coupon_list[i].times;
	  		  }
	  	  }
	  	  console.log(deduction_num);
	  	  $scope.deduction_num=deduction_num;
	  	  console.log("11");
	}
    

    /*处理图片上传*/
    /*var imgurl = "";
    function getImgURL(node) {
        var imgURL = "";
        try{
            var file = null;
            if(node.files && node.files[0] ){
                file = node.files[0];
            }else if(node.files && node.files.item(0)) {
                file = node.files.item(0);
            }
            try{
                //Firefox7.0
                imgURL =  file.getAsDataURL();
            }catch(e){
                //Firefox8.0以上
                imgRUL = window.URL.createObjectURL(file);
            }
        }catch(e){
            //支持html5的浏览器,比如高版本的firefox、chrome、ie10
            if (node.files && node.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    imgURL = e.target.result;
                };
                reader.readAsDataURL(node.files[0]);
            }
        }
        //imgurl = imgURL;
        addImg(imgRUL);
        return imgURL;
    }
    function addImg(imgRUL){   //根据指定URL创建一个Img对象
        console.log(imgRUL);
        $("#uploaderFiles").children('li:first-child').css('background-image',imgRUL);
    }*/
//  点击协议
	$scope.showDetail=function () {
		$("#popup_detail").popup();
		//后台数据请求
 		$scope.json = json;
	    $scope.json_config = json.json_config;

		 var url = project_url + "/" + module + "/getAgreement.do";
		
		 $http({
		 	method: 'post',
		 	url: url,
		 	headers: {
		 		'Content-Type': 'text/html'
		 	}
		 }).then(function successCallback(data) {
		 	// 请求成功执行代码
		 	// 判断成功状态
//		 	$scope.msg = data.data;
		 	$("#msg").html(data.data);
		 }, function errorCallback(data) {
		 	// 请求失败执行代码
		 	console.log("error:" + data);
		
		 });
	}
    /*处理提交发布事件*/
   $scope.submit = function () {
	   if(json.address != null){
		   if(json.address.address != ""){
       			if($scope.service_time != ""){
       				if(!$scope.agreement){
						$.toast("未同意服务协议","forbidden");
					}else{
						var article = json.tips.article;
						if(article == "" || article == null || json.tips == null){
							submit2();
						}else{
							$.alert(article,function(){
								submit2();
							});
						}
					}
				}else{
       				$.toast("请填写服务时间","cancel");
       			}
		   }else{
			   $.toast("您的地址有误，请重新设置","cancel");
		   }
	   }else{
		   $.toast("请输入您的地址","cancel");
	   }
    }
   
   function submit2(){
	   if(confirm("确定提交订单吗？")){
			$.showLoading("请稍后");
			 $http({
		           method: 'post',
		           url: 'doUpload.do',
		           data:data,
		           headers: {'Content-Type': undefined},
		           transformRequest: angular.identity
		       }).then(function(data) {
		    	   $.hideLoading();
      				window.location.href="insertCart.do?is_cart=true&deal_id="+$scope.deal_id+"&number="+$scope.number+
      				"&payment_id="+$scope.payment_id+"&payment_money="+$scope.payment_money+"&score="+$scope.score+"&money="+$scope.balance+"&service_time="
      				+$scope.service_time+"&is_release=1&desc="+$scope.desc+"&pic1="+data.data.pic1+"&pic2="+data.data.pic2+"&coupon="+$scope.deduction+"&coupon_id="+$scope.coupon_id;
		       })
		    }
   }
   
   $scope.submit_choose = function () {
	   if(json.address != null){
		   if(json.address.address != ""){
			   if($scope.service_time != ""){
				   if(!$scope.agreement){
					$.toast("未同意服务协议","forbidden");
				}else{
					var article = json.tips.article;
					if(article == "" || article == null || json.tips == null){
						submit_choose2();
					}else{
						$.alert(article,function(){
							submit_choose2();
						});
					}
		       }
			}else{
				   $.toast("请填写服务时间","cancel");
			   }
		   }else{
			   $.toast("您的地址有误，请重新设置","cancel");
		   }
	   }else{
		   $.toast("请输入您的地址","cancel");
	   }
   }
   
   function submit_choose2(){
	   if(confirm("确定提交订单吗？")){
			$.showLoading();
			$http({
		           method: 'post',
		           url: 'doUpload.do',
		           data:data,
		           headers: {'Content-Type': undefined},
		           transformRequest: angular.identity
		       }).then(function(data) {
		    	   $.hideLoading();
				   window.location.href="insertCart.do?is_cart=true&deal_id="+$scope.deal_id+"&number="+$scope.number+
				   "&payment_id="+$scope.payment_id+"&payment_money="+$scope.payment_money+"&score="+$scope.score+"&money="+$scope.balance+"&service_time="
				   +$scope.service_time+"&is_release=0&desc="+$scope.desc+"&pic1="+data.data.pic1+"&pic2="+data.data.pic2+"&coupon="+$scope.deduction+"&coupon_id="+$scope.coupon_id;
		       })
		}
   }
   
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
   var s=0;
   var data = new FormData();      //以下为像后台提交图片数据
   
   //pic1
   $scope.pic1_upload = function(files){
       $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
       $scope.reader.onload = function(ev) {
           $scope.$apply(function(){
           	$scope.pic1 = ev.target.result  //接收base64
           	$("#heads_div").hide();
           });
       };
       data.append('pic1', files[0]);
       
   }
   //删除pic1
   $scope.pic1_del = function(){
   	$scope.pic1 = "";
   	$("#heads_div").show();
   }
   
   //pic2
   $scope.pic2_upload = function(files){
       $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
       $scope.reader.onload = function(ev) {
           $scope.$apply(function(){
           	$scope.pic2 = ev.target.result  //接收base64
           	$("#tails_div").hide();
           });
       };
       data.append('pic2', files[0]);
       
   }
   //删除pic2
   $scope.pic2_del = function(){
   	$scope.pic2 = "";
   	$("#tails_div").show();
   }

   //图片上传接口方法
   $scope.imgload=function () {
       
   }
	$scope.closePop=function(){
		$.closePopup();
	}
	/*---------------上面是上传图片-------------*/
	
	//跳转到地址
	$scope.jumpToAddress=function(){
		var url = "../userAddress/index.do?cart_url="+$scope.json.json_config.pre_url_param;
		location.href=url;
	}
	
	
	
});

var pop=true;
function showPop(obj){
	if($("#popup").css("display")=='none'){
		$("#popup").popup();
		$(".weui-popup__overlay").css("opacity",1);
		pop=false;
	}else{
		$.closePopup();
		pop=true;
		$(".weui-popup__overlay").css("opacity",0);
	}
}
function closePop(obj){
	$.closePopup();
}
