		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
    	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/indent.css?ver=11">
</head>
<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
   
    <!--头部-->
	<header class="back-header weui-flex bg-white header_bBor">
		<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
		<h1 class="back-header-h1 flex_item4 sc-text-blue">通知</h1>
		<a class="flex_item1 header-right sc-text-blue"></a>
	</header>
	<section class="weui-tab__bd fix_containner">
		
		<article id="tab3" class="weui-tab__bd-item weui-tab__bd-item--active">
			<figure ng-repeat="item in json.list">
				<div class="apply_list">
					<div class="weui-row pad-b2">
						<div class="weui-col-60 mar-t2 apply_msg">
							<p>
								<span class="apply_active" ng-bind="item.title"></span>
								<span class="sc-text-gray text-font3 mar-l3" >x1</span>
								<span class="sc-text-gray text-font3 mar-l3" ng-bind="item.village_name"></span>
							</p>
							<p>
								<span class="sc-text-gray text-font2" ng-bind="'详细地址:'+item.address"></span>
							</p>
							<p>
								<span class="sc-text-gray text-font2" ng-bind="'取消理由:'+item.reason"></span>
							</p>
						</div>
						<div class="weui-col-40">
							<div class="weui-btn weui-btn_mini bg-qblue text-font2 fr mar-t5" ng-click="cancel(item.order_sn,2)">同意</div>
							<div class="weui-btn weui-btn_mini bg-qblue text-font2 fr mar-t5 mar-r2" ng-click="cancel(item.order_sn,1)">拒绝</div>
						</div>
						
						</div>
					</div>
				</div>
			</figure>
		</article>
	</section>

</body>
	<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
	<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/inform.js?ver=1154456456465" type="text/javascript" charset="utf-8"></script>
</html>