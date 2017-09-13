<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    	<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>用户注册</title>
		<link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/weui.css">
   		<link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/jquery-weui.css">
		<link rel="stylesheet" type="text/css" href="http://static.huibaoming.cn/wap/src/css/user.css"/>
		<link rel="stylesheet" type="text/css" href="http://static.huibaoming.cn/wap/src/css/wap.css"/>
		
	</head>
	<body ng-controller="ctrl">
		<div class="weui-cells weui-cells_form input-bg width90" style=" margin:auto; margin-top: 4rem !important;">
		  
		  <div class="weui-cell weui-cell_vcode">
		    <div class="weui-cell__hd">
		      <label class="weui-label bc-text-header text-font4">手机号</label>
		    </div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="number" placeholder="请输入手机号" required ng-model="phone">
		    </div>
		    <div class="weui-cell__ft">
		      <button class="weui-vcode-btn text-font4" ng-click="Code()" ng-bind="get_code"></button>
		    </div>
		  </div>
		  
		  <div class="weui-cell">
		    <div class="weui-cell__hd"><label class="weui-label bc-text-header text-font4">验证码</label></div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="text"  placeholder="请输入验证码" ng-model="yanzhengma" required>
		    </div>
		  </div>

		</div>
		<a href="javascript:;" ng-click="register()" class="weui-btn weui-btn_plain-default bc-text-header width90 text-font4" style="margin: auto; border:1px solid #FFFFFF;margin-top: 2rem;">确认登录</a>
	</body>
	<script src="http://common.huibaoming.cn/jquery/jquery.js"></script>
	<script src="http://common.huibaoming.cn/jquery-weui/js/jquery-weui.js"></script>
	<script src="http://common.huibaoming.cn/angular/angular.js"></script>
	<script src="http://static.huibaoming.cn/wap/src/js/user.js"></script>
</html>
