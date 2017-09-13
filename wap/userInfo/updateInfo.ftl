<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/personalData.css">
	    <script type="text/javascript">
	    	var json={};
	    </script>
	</head>
	<body>
		<div ng-controller="edit_info_ctrl">
			<!--头部-->
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue">个人资料</h1>
				<a class="flex_item1 header-right sc-text-blue"></a>
			</header>
			<div class="fix_containner">
			<!--主体部分-->
			<nav class="pD-nav">
				<div class="weui-tab">
					<div class="weui-navbar" id="navbar">
						<a class="weui-navbar__item text-font3 weui-bar__item--on"ng-click="switchnew('updateInfo.do')">
							编辑资料
						</a>
						<a class="weui-navbar__item text-font3" ng-click="switchnew('updatePass.do')">
							修改密码
						</a>
					</div>
				</div>
			</nav>
			<section>
				<article>
					<form action="" class="form" id="form">
						<div class="weui-cells weui-cells_form bg-wechat mar-t0">
							<!--昵称-->
							<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">昵称</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input text-font3 text-r sc-text-gray" type="text" ng-model="user_name">
								</div>
							</div>
							<!--银行卡类型-->
							<!--<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">银行卡类型</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input text-font3 text-r sc-text-gray" type="text" ng-model="bank_name">
								</div>
							</div>-->
							<!--银行卡账号-->
							<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">银行卡账号</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input text-font3 text-r sc-text-gray" type="text" ng-model="bank_card">
								</div>
							</div>
							<!--持卡人姓名-->
							<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">持卡人姓名</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input text-font3 text-r sc-text-gray" type="text" ng-model="account_name">
								</div>
							</div>
						</div>
						<!--保存-->
						<a href="javascript:;" class="weui-btn bg-qblue pD-btn" ng-click="save()">保存修改</a>
					</form>
				</article>
			</section>
			</div>
		</div>
	</body>
</html>
<#include "../inc/foot.ftl"/>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/personalData.js?ver=990999" type="text/javascript" charset="utf-8"></script>