<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
	          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title></title>
		<!--oss库资源引用-->
		<!--字体图标库-->
	    <link rel="stylesheet" href="http://common.huibaoming.cn/font/font-awesome.css">
	    <link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/weui.css">
	    <link rel="stylesheet" href="http://common.huibaoming.cn/jquery-weui/css/jquery-weui.css">
	    <!--当前项目样式引用-->
		<link rel="stylesheet" href="http://static.huibaoming.cn/wap/src/css/wap.css">
		<link rel="stylesheet" type="text/css" href="http://static.huibaoming.cn/wap/src/css/wap_public.css"/>
	    <link rel="stylesheet" href="http://static.huibaoming.cn/wap/src/css/user_invite.css">
	</head>
	<body ng-controller="ctrl">
		<div>
			<header class="back-header weui-flex">
				<span class="back-header-icon icon-chevron-left flex_item1" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4" ng-bind="Code_title">APP邀请</h1>
				<a class=" flex_item1"></a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
			<section class="ewm ewm-br bg-white Code-body">
				<header class="weui-flex__item ewm-br ewm-bghead" id="order_topL">
					<div class="weui-panel weui-panel_access">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg Code-header">
								<div class="weui-media-box__hd">
									<img class="weui-media-box__thumb u-radius" ng-src="{{userImg_url}}">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title text-font5 mar-t2 sc-text-tab" ng-bind="user_name">蓝枫</h4>
									<p class="weui-media-box__desc text-font4">ID:<b ng-bind="user_num">5192313</b></p>
								</div>
							</a>
						</div>
					</div>
				</header>
				<article class="text-c">
					<div>
						<img class="Code-img" ng-src="{{Code_url}}" />
					</div>
					<p class="text-font5 mar-t4 sc-text-tab text-weight2">扫一扫加入我们</p>
					<a href="javascript:;" class="weui-btn weui-btn_primary Code-btn" ng-click="change()" ng-bind="btn_html">微信邀请</a>
				</article>
			</section>
			</div>
		</div>
	</body>
</html>
<script src="http://common.huibaoming.cn/jquery/jquery.js"></script>
<script src="http://common.huibaoming.cn/jquery-weui/js/jquery-weui.js"></script>
<script src="http://common.huibaoming.cn/angular/angular.js"></script>
<script src="http://static.huibaoming.cn/wap/src/js/user_invite.js" type="text/javascript" charset="utf-8"></script>