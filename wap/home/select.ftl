	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<link rel="stylesheet" type="text/css" href="${json_config.oss_common_url}/font-awesome-4.7.0/css/font-awesome.css"/>
	
	
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/home_xr.css">
	<#--
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/home_xr.css">
	-->
</head>
<body ng-app="app" ng-controller="ctrl">
	<aside class="selMst_aside mar-b0 weui-flex bg-white">
		<input type="text" class="selMA_input flex_item8" placeholder="搜索你想要的内容" ng-model="find" />
		<i class="icon-search selMA_i mar-l2 flex_item1 text-c" ng-click="search()"></i>
	</aside>
	<section class="mar-t3">
		<div class="weui-panel__bd">
			<a ng-href="../xiaoerDeal/getDealDetail.do?id={{item.id}}" class="weui-media-box weui-media-box_appmsg bg-white mar-b2" ng-repeat="item in json.deals">
				<div class="weui-media-box__hd sec_leftImg">
					<img class="weui-media-box__thumb sec_leftImg" ng-src="{{item.icon}}">
				</div>
				<div class="weui-media-box__bd">
					<h4 class="weui-media-box__title" ng-bind="item.name"></h4>
				</div>
			</a>
			<a ng-href="../masterDeteil/index.do?id={{item.id}}" class="weui-media-box weui-media-box_appmsg bg-white mar-b2" ng-repeat="item in json.masters">
				<div class="weui-media-box__hd sec_leftImg">
					<img class="weui-media-box__thumb sec_leftImg" ng-src="{{item.user_pic}}">
				</div>
				<div class="weui-media-box__bd">
					<h4 class="weui-media-box__title" ng-bind="item.master_name"></h4>
					<p class="weui-media-box__desc" ng-bind="item.master_mobile"></p>
				</div>
			</a>
		</div>
	</section>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/select.js?ver=211323" type="text/javascript" charset="utf-8"></script>
