 <#include "../inc/head_base.ftl"/>
 	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	 	<!--当前项目样式引用-->
	 	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
	 	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/deal.css">
	    
		<script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/jquery-2.1.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
		<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/deal.js?ver=2017053119565"></script>
		
	</head>
	<body  class="bg-wechat" ng-app="app" ng-controller="ctrl">
		<header class="back-header weui-flex bg-white header_bBor">
		    <span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
		    <h1 class="back-header-h1 flex_item4 sc-text-blue" ng-bind="json.nav_title"></h1>
		    <a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		
		<section class="detail_section fix_containner" style="padding-bottom: 2rem;">
			<header>
				<img ng-src="{{jsondetail.detail_img}}" style="width: 100%; height: 6.5rem;" />
			</header>
			<article class="detail_article">
				<header class="detail_header">服务介绍</header>
				<table class="detail_table" >
					<tr style="background: #008CD7;">
						<th>服务项目</th>
						<th>数量</th>
						<th>原价</th>
						<th>特价</th>
					</tr>
					<tr>
						<td ng-bind="jsondetail.name">空调挂机</td>
						<td ng-bind="jsondetail.unit">1</td>
						<td ng-bind="jsondetail.origin_price">98</td>
						<td ng-bind="jsondetail.price">98</td>
					</tr>
				</table>
				<aside class="detail_aside" id="description">
					Phasellus porta fermentum est et eleifend. Pellentesque dapibus fermentum tortor, non fermentum sem vehicula sit amet. Vivamus sed justo nisl. Nunc suscipit scelerisque ex, at mattis ipsum elementum sed. Cras eget neque ut justo dignissim tempus. In eu mi sagittis, fringilla lorem ac, porttitor ante. Duis fermentum, leo eget gravida cursus, eros mi congue est, et aliquam lectus enim ac ipsum. Cras eu lacus non odio laoreet fringilla. Curabitur eget enim vitae velit tincidunt aliquam. Aliquam nec tortor eu sapien efficitur rhoncus eu vel ante.
				</aside>
				<a href="javascript:;" class="weui-btn weui-btn_primary detail_btn bg-qblue" ng-click="placeOrder()">立即下单</a>
			</article>
			
		</section>
		
<#include "../inc/foot.ftl"/>