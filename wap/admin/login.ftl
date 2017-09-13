<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="utf-8">
		<meta name="renderer" content="webkit|ie-comp|ie-stand">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta http-equiv="Cache-Control" content="no-siteapp" />
		<title>管理登录</title>
		<meta name="keywords" content="管理登录">
		<meta name="description" content="管理登录">
		
		<!--[if lt IE 9]>
		<script type="text/javascript" src="http://common.huibaoming.cn/jquery-weui/html5.js"></script>
		<script type="text/javascript" src="http://common.huibaoming.cn/jquery-weui/respond.min.js"></script>
		<script type="text/javascript" src="http://common.huibaoming.cn/jquery-weui/PIE_IE678.js"></script>
		<![endif]-->
		<link href="http://common.huibaoming.cn/H-ui_v3.0/css/H-ui.min.css" rel="stylesheet" type="text/css" />
		<link href="http://common.huibaoming.cn/H-ui_v3.0/css/H-ui.login.css" rel="stylesheet" type="text/css" />
		<link href="http://common.huibaoming.cn/H-ui_v3.0/Hui-iconfont/1.0.1/iconfont.css" rel="stylesheet" type="text/css" />
		<!--[if IE 6]>
		<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
		<script>DD_belatedPNG.fix('*');</script>
		<![endif]-->  
		
		<!--oss脚本接入-->
		<script src="http://common.huibaoming.cn/angular/angular.js"></script>
		<script src="http://common.huibaoming.cn/jquery/jquery.js"></script>
		<script type="text/javascript" src="http://common.huibaoming.cn/H-ui_v3.0/js/H-ui.js"></script>
		
		
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/admin_login.js?ver=201704141156"></script>
		<#include "../inc/head_var.ftl"/>
	</head>
<body ng-controller="ctrl">
<input type="hidden" id="TenantId" name="TenantId" value="" />

<div class="loginWraper">
  <div id="loginform" class="loginBox" >
    <h4 style="text-align: center">管理登录</h2>
    <form class="form form-horizontal" action="#" method="post" onkeydown="keyLogin()">
      <div class="row cl"  style="margin-left: 14%">
        <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60d;</i></label>
        <div class="formControls col-xs-8">
          <input id="username" name="username" type="text" placeholder="账户" class="input-text size-L" ng-model="username">
        </div>
      </div>
      <div class="row cl" style="margin-left: 14%">
        <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60e;</i></label>
        <div class="formControls col-xs-8">
          <input id="password" name="password" type="password" placeholder="密码" class="input-text size-L" ng-model="password">
        </div>
      </div>
      <div class="row cl">
            </div>
      <div class="row cl">
        
      </div>
      <div class="row cl" style="margin-left: 20%">
        <div class="formControls col-xs-8 col-xs-offset-3">
          <input name="" id="submit" type="button" class="btn btn-success radius size-L" value="&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;"  ng-click="login()">
          <input name="" type="reset" class="btn btn-default radius size-L" value="&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;">
      	<input name="" type="button" class="btn btn-success radius size-L" value="&nbsp;生&nbsp;成&nbsp;桌&nbsp;面&nbsp;图&nbsp;标&nbsp;"  onclick="createShortcut()">
        </div>
      </div>
    </form>
  </div>
</div>
<div class="footer">{{json_config.system_footer_desc}} </div>
</body>
</html>