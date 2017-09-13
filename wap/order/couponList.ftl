<#include "../inc/head_base.ftl"/>
<#include "../inc/head_jq.ftl"/>
<#include "../inc/head_weui.ftl"/>
<#include "../inc/head_ng.ftl"/>
<#include "../inc/head_var.ftl"/>
<#--
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"/>
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/coupon.css">
-->
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/coupon.css?ver=20170704">

</head>
<body ng-app="app" ng-controller="ctrl">
	<header class="back-header weui-flex bg-white header_bBor">
		<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
		<h1 class="back-header-h1 flex_item4 sc-text-blue">优惠券</h1>
		<a class="flex_item1 header-right sc-text-blue"></a>
	</header>
	<nav class="bg-wechat cp_nav">
		<div class="classify_nav">
			<ul class="bg-white">
				<li class="ng-scope centerbor" ng-repeat="item in items" ng-bind="item.nav_name" ng-class="{'nav_li_checked':choose==$index}" ng-click="change($index)"></li>
				<!-- data-base 为看效果测试用，可删除-->
				<!--<li class="" ng-class="{'nav_li_checked':choose==0}" ng-click="change($index)">余额</li>
				<li ng-class="{'nav_li_checked':choose==1}" ng-click="change($index)">佣金</li>
				<li ng-class="{'nav_li_checked':choose==2}" ng-click="change($index)">积分</li>-->
				<!--<li class="weui-flex__item ng-scope centerbor nav_li_checked" data-base="5">全部</li>
				<li class="weui-flex__item ng-scope centerbor" data-base="6">未使用</li>
				<li class="weui-flex__item ng-scope centerbor" data-base="7">已过期</li>-->
			</ul>
		</div>
	</nav>

	<!--<aside class="cp_aside pad-r2 mar-t1 text-font3">
		<input type="text" class="cpAsi_input flex_item8" placeholder="输入您的卡券提取码" ng-model="cp_num" />
		<i class="cpAsi_i theme_sc" ng-click="exchange()">领券</i>
	</aside>-->
	<section class="cp_sec">
		<!--可用-->
		<figure class="cp_figNew weui-flex" ng-repeat="item in cp_new">
			<div class="flex_item3 text-c fig_Lsize" ng-bind="'￥'+item.money"></div>
			<div class="flex_item4 fig_Rsize">
				<header class="text-c" ng-bind="item.title"></header>
				<article class="fig_RartNew">
					<p ng-bind="item.begin_day+'至'+item.end_day+'可用'"></p>
					<p ng-bind="'满'+item.limit+'元可用'"></p>
					<p ng-bind="item.content"></p>
				</article>
			</div>
		</figure>
		<!--不可用-->
		<figure class="cp_figExpired weui-flex" ng-repeat="item in nav.cp_expired">
			<div class="flex_item3 text-c fig_Lsize" ng-bind="'￥'+item.money"></div>
			<div class="flex_item4 fig_Rsize">
				<header class="text-c" ng-bind="item.title"></header>
				<article class="fig_Rart">
					<p ng-bind="item.time"></p>
					<p ng-bind="item.content"></p>
					<p ng-bind="item.limit"></p>
				</article>
			</div>
		</figure>
	</section>

<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<#--
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/coupon.js" type="text/javascript" charset="utf-8"></script>
-->
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/coupon.js?ver=201707171545" type="text/javascript" charset="utf-8"></script>

<#include "../inc/foot.ftl"/>