var key_app = angular.module('app', []);
key_app.controller('ctrl', function($scope, $http) {
	$scope.chose_ative = -1;
	$scope.img_json = [];
	$scope.img_num = 0;

	if ($.isEmptyObject(json)) {
		var init_url = "";
		var json_param = {};
		// json_param['username'] = $scope.username;
		$http({
			method : 'post',
			url : init_url,
			data : $.param(json_param),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(data) {
			// 请求成功执行代码
			json = data.data;
			$scope.json = data.data;
			$scope.json_config = data.data.json_config;

			// 获取值传递
		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log("error:" + data);
			$.toast("网络错误", "forbidden");
		});
	} else {
		$scope.json = json;
		$scope.json_config = json.json_config;
	}

	$scope.imglength = function(data) {
		for (i in data) {
			$scope.imglength++;
		}
	};

	// 完成提交
	$scope.finish = function() {
		if ($scope.msg == "" || $scope.msg == undefined) {
			$.toast("文字说明不能为空", "text");
		} else
			// 执行图片上传
		$.showLoading("请稍后");
		 $http({
	           method: 'post',
	           url: 'doUpload.do',
	           data:data,
	           headers: {'Content-Type': undefined},
	           transformRequest: angular.identity
	       }).then(function(d) {
	    	   $.hideLoading();
	    	   var param = {};
	    	   param["after_desc"]=$scope.msg;
	    	   param["uuid"]=json.uuid;
	    	   param["after_pic1"]=d.data.pic1;
	    	   param["after_pic2"]=d.data.pic2;
	    	   console.log(param);
	    	   $http({
		           method: 'post',
		           url: 'doApply.do',
		           data:$.param(param),
		           headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
		       }).then(function(d) {
		    	   if(d.data.err_code==-1){
		    		   alert(d.data.err_msg);
		    		   window.history.go(-1);
		    	   }else{
		    		   alert(d.data.err_msg);
		    	   }
		    	   $.hideLoading();
	  				
		       })
	       })
	};
	
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
});

function calculate(obj) {
	if ($(obj).val().length > $(".eva_num_all").html()) {
		$.toast("字数超过限制", "forbidden");
		$(obj).val($(obj).val().substring(0, $(".eva_num_all").html()));
	} else {
		$('#eva_num').html($(obj).val().length);
	}
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}