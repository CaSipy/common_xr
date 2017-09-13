		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/user.js"></script>
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/user.css">
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/user_invite.css">
	
	</head>
	<body ng-controller="ctrl" class="bg-wechat">
		<div>
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue" ng-bind="Code_title">二维码邀请</h1>
				<a class=" flex_item1  sc-text-blue"></a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
			<section class="ewm ewm-br bg-white Code-body" ng-show="show">
				<header class="weui-flex__item ewm-br ewm-bghead" id="order_topL">
					<div class="weui-panel weui-panel_access">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg Code-header">
								<div class="weui-media-box__hd">
									<img class="weui-media-box__thumb u-radius" ng-src="{{userImg_url}}">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title text-font5 mar-t2 sc-text-tab" ng-bind="user_name"></h4>
									<p class="weui-media-box__desc text-font4">ID:<b ng-bind="user_num"></b></p>
								</div>
							</a>
						</div>
					</div>
				</header>
				<article class="text-c">
					<div class="pad-t5">
						<img class="Code-img" ng-src="{{ Code_url }}" />
					</div>
					<p class="text-font5 mar-t4 sc-text-tab text-weight2"style="margin-bottom: 1.5rem;">扫一扫加入我们</p>
					<!--<a href="javascript:;" class="weui-btn weui-btn_primary Code-btn bg-qblue" ng-click="change()" ng-bind="btn_html">微信邀请</a>-->
				</article>
			</section>
			<section ng-show="!show">
				<div id="nothing_order">
					<div class="weui-msg" id="nothing">
						<div class="obl-un icon-warning-sign audit_header2" id="nothing_un">
							
						</div>
						<div class="weui-msg__text-area mar-t5 pad-t5">
							
							<p class="weui-msg__title text-font5 sc-text-blue">您还不是我们的会员 没有相应二维码</p>
							<p class="weui-msg__title text-font5 sc-text-blue">赶紧加入我们吧！</p>
						</div>
					</div>
				</div>
			</section>
			</div>
		</div>
	<#include "../inc/foot.ftl"/>

<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/user_invite.js" type="text/javascript" charset="utf-8"></script>