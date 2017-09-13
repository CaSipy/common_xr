	    <#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--${json_config.project_name_common}-->
		<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/selMaster.css">
	</head>
	<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">师傅信息</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<article class="text-c master_art fix_containner mar-b0">
			<div>
				<img src="{{json.data.user_pic}}" class="master_artImg u-radius" alt="" />
			</div>
			<h1 class="master_artH1 bc-text-header mar-t2" ng-bind="master_name"></h1>
			<p class="master_artP bc-text-header" ng-bind="'已接单数:'+cont"></p>
			<aside id="starEva" class="starEva mar-t1">
				<span class="icon-star" ng-class="{mas_star_active:json.data.master_level>=1}"></span>
				<span class="icon-star" ng-class="{mas_star_active:json.data.master_level>=2}"></span>
				<span class="icon-star" ng-class="{mas_star_active:json.data.master_level>=3}"></span>
				<span class="icon-star" ng-class="{mas_star_active:json.data.master_level>=4}"></span>
				<span class="icon-star" ng-class="{mas_star_active:json.data.master_level>=5}"></span>
			</aside>
			<a href="javascript:;" class="weui-btn weui-btn_default master_btn text-font4" ng-click="submit()">预约该师傅</a>
		</article>
		<section>
			<!--个人资料-->
			<article class="bg-white header_bBor">
				<header class="weui-cell mas_secHeader">个人资料</header>
				<div class="weui-cell mar-t0 cancle text-font4 sc-text-tab pad-t4" style="display: inherit;">
					<figure class="width100 mar-b1">
						<p class="mas_secP">
							<span class="mas_secSpan">电话号码：</span>
							<b ng-bind="master_mobile"></b>
						</p>
					</figure>
					<figure class="width100 mar-b1">
						<p class="mas_secP">
							<span class="mas_secSpan">入驻时间：</span>
							<b ng-bind="create_time"></b>
						</p>
					</figure>
					<figure class="width100 mar-b1">
						<p class="mas_secP">
							<span class="mas_secSpan">服务地点：</span>
							<b ng-bind="name"></b>
						</p>
					</figure>
				</div>
			</article>
			
			<!--专修领域-->
			<article class="bg-white mar-t3 header_bBor">
				<header class="weui-cell mas_secHeader">专修领域</header>
				<div class="weui-cell mar-t0 cancle text-font4 sc-text-tab pad-t4">
					<div class="width100 mar-b1">
						<p class="mas_secP">
							<span class="mas_secSpan">家电维修：</span>
							<b ng-bind="json.data.desc"></b>
						</p>
					</div>
				</div>
			</article>
			<!--专修领域
			<article class="bg-white mar-t3 header_bBor">
				<header class="weui-cell mas_secHeader">评价</header>
				<div class="mas_artLast mar-t0 cancle text-font4 sc-text-tab pad-t4">
					<figure class="mas_figure">年轻无极限<b class="mar-l4">1</b></figure>
					<figure class="mas_figure">年轻<b class="mar-l4">1</b></figure>
					<figure class="mas_figure">年轻无极限<b class="mar-l4">1</b></figure>
					<figure class="mas_figure">年轻无极限<b class="mar-l4">1</b></figure>
				</div>
			</article>-->
		</section>
	</body>
	<script src="${json_config.oss_common_url}/jquery/jquery.js"></script>
	<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
	<!--<script src="../src/js/userMoney_com.js" type="text/javascript" charset="utf-8"></script>-->
	<!--Start==add src-->
	<script src="${json_config.oss_common_url}/angular/angular.js"></script>
	<script type="text/javascript" src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/master_deil.js?ver=201706082034" charset="utf-8"></script>
</html>
