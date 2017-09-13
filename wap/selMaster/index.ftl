		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--${json_config.project_name_common}-->
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.oss_static_url}/wap/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/selMaster.css">
	</head>
	<body class="bg-wechat" ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">选择师傅</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<aside class="selMst_aside fix_containner mar-b0 weui-flex bg-white">
			<input type="text" class="selMA_input flex_item8" placeholder="搜索你想要的师傅" ng-model="search_master"/>
			<i class="icon-search selMA_i mar-l2 flex_item1 text-c" ng-click="search()"></i>
		</aside>
		<section class="mar-t2 mar-b2">
			<figure class="weui-panel weui-panel_access mar-t1">
				<div class="weui-panel__bd">
					<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg weui-cell weui-cell_access" ng-repeat="item in json.data" ng-click="master(item.user_id)">
						<div class="weui-media-box__hd selMA_img">
							<img class="weui-media-box__thumb selMA_img" src="{{item.user_pic}}">
						</div>
						<div class="weui-media-box__bd">
							<div class="weui-flex">
								<span class="flex_item1 text-font5 text-weight3" ng-bind="item.master_name"></span>
								<span class="flex_item1 text-r sc-text-black text-font3 text-astrict showLine-1" ng-bind="item.name" style="height:1.3rem"></span>
							</div>
							<p class="weui-media-box__desc text-font3">专业领域：<b ng-bind="item.desc"></b></p>
							<p class="weui-media-box__desc text-font3 mar-t5" ng-bind="item.cont+'单'"></p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
				</div>
			</figure>
		</section>
		<div style="height:50px;"></div>
		<footer class="selMA_footer bg-white">
			<a href="javascript:;" class="weui-btn weui-btn_primary selMA_btn text-font3" ng-click="submit()">没有合适的师傅？点击直接发布</a>
		</footer>
	</body>
	<script src="${json_config.oss_common_url}/jquery/jquery.js"></script>
	<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
	<!--<script src="../src/js/userMoney_com.js" type="text/javascript" charset="utf-8"></script>-->
	<!--Start==add src-->
	<script src="${json_config.oss_common_url}/angular/angular.js"></script>
	<script type="text/javascript" src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/selMaster.js?ver=20170608148888" charset="utf-8"></script>
</html>
