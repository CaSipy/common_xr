'use strict';
/*Start==addEvent*/
//	输入金额
var str = '';//定义输入的金额
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
    });
});
//	删除
$('#backspace').click(function() {
    str = $('#money').val();
    str = str.substring(0, str.length - 1);
    $('#money').val(str);
});
/*Stop==addEvent*/
//angular的js
var kmy_app=angular.module('app',[]);
kmy_app.controller('ctrl',function($scope,$http,$interval){
    $scope.desc='';
    //文本框文字限制/*change */
    $scope.num1 = 0;//初始文字字数
    $scope.num2 = 200;//限制的文字字数
    $scope.calculate=function(){
        //console.log($scope.desc.length);
        if($scope.desc.length>$scope.num2){
            $.toast("文字超过限制", "forbidden");
            $scope.desc=$scope.desc.substring(0,$scope.num2);
        }else{
            $scope.num1=$scope.desc.length;
        }
    }
	/*Start==addEvent*/
    //处理确认增值
    $scope.increment = function () {
        console.log(Number(str),$scope.desc);
        str = Number(str);
        if(str == 0){
            $.toast("请输入服务金额", "forbidden");
        }else{
        	$.showLoading("请稍后");
			 $http({
		           method: 'post',
		           url: '../addOrder/doUpload.do',
		           data:data,
		           headers: {'Content-Type': undefined},
		           transformRequest: angular.identity
		       }).then(function(data) {
		    	    $.hideLoading();
      				var url = '../addOrder/createAddOrder.do';
    				/*window.location.href = url+"?deal_id="+json.deal_id+"&payment_id=21" +
    						"&payment_money="+$scope.payment_money+"&desc="+$scope.desc +
    								"&order_sn="+json.order_sn;*/ 
    				 var json_param = {};
    				 json_param['payment_money'] = str;
    				 json_param['desc'] = $scope.desc;
    				 json_param['payment_id'] = 21;
    				 json_param['deal_id'] = json.deal_id;
    				 json_param['order_sn'] = json.order_sn;
    				 json_param['pic1'] = data.data.pic1;
    				 json_param['pic2'] = data.data.pic2;
    				 $http({
    				 method:'post',
    				 url:url,
    				 data:$.param(json_param),
    				 headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    				 }).then(function successCallback(data){
    				 //请求成功执行代码
    					 if(data.data.err_code != '-1' ){
    						 $.toast(data.data.err_msg,"cancel");
    					 }else{
    						 $.toast("成功");
    						 setTimeout("window.location.href='../masterOrder/list.do'",2000);
    					 }
    				 },function errorCallback(){
    				 // 请求失败执行代码
    				 console.log("error:"+data);
    				 });
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
       //console.log($scope.positive_idCard);
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
       //console.log($scope.positive_idCard);
       data.append('pic2', files[0]);
       
    }
    //删除pic2
    $scope.pic2_del = function(){
    	$scope.pic2 = "";
    	$("#tails_div").show();
    }

    //图片上传接口方法
    $scope.imgload=function () {
    	//console.log(data);
       
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
	function keyboard() {
	    $("#keyboard").popup();
	}
	function closeKeyboard() {
	    $.closePopup();
	}


var pop=true;
function showPop(obj){
if($("#popup").css("display")=='none'){
	$("#popup").popup();
	$(".weui-popup__overlay").css("opacity",1);
	pop=false;
	console.log(pop);
}else{
	$.closePopup();
	pop=true;
	$(".weui-popup__overlay").css("opacity",0);
	console.log(pop);
}
}
function closePop(obj){
$.closePopup();
}