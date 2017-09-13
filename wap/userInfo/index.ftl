		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/personalData.css">
	</head>
	<body ng-controller="user_info_ctrl">
		<div>
			<!--头部-->
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue" ng-bind="sss">个人资料</h1>
				<a href="updateInfo.do" class="flex_item1 header-right sc-text-blue">编辑</a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
			<section>
				<article>
					<div class="weui-cells">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">昵称</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="user_name"></div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">推荐人</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="up_name"></div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">账号</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="code"></div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">手机号</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="phone"></div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">会员等级</p>
							</div>
							<div class="weui-cell__ft text-font3"  ng-bind="user_group"></div>
						</div>
					</div>
				</article>
				<article>
					<div class="weui-cells">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">银行卡账号</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="bank_card"></div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<p class="text-font4">持卡人姓名</p>
							</div>
							<div class="weui-cell__ft text-font3" ng-bind="account_name"></div>
						</div>
					</div>
				</article>
			</section>
			</div>
		</div>
	<#include "../inc/foot.ftl"/>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/personalData.js" type="text/javascript" charset="utf-8"></script>