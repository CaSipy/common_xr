		<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
		<!--当前项目样式引用-->
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/personalData.css">
	</head>
	
	<body ng-controller="edit_pass_ctrl">
		<div>
			<!--头部-->
			<header class="back-header weui-flex">
				<span class="back-header-icon icon-chevron-left flex_item1" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4">个人资料</h1>
				<a class="flex_item1 header-right"></a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
			<nav class="pD-nav">
				<div class="weui-tab">
					<div class="weui-navbar" id="navbar">
						<a class="weui-navbar__item text-font3" href="updateInfo.do">
							编辑资料
						</a>
						<a class="weui-navbar__item text-font3 weui-bar__item--on" href="updatePass.do">
							修改密码
						</a>
					</div>
				</div>
			</nav>
			<section>
				<article>
					<form action="" class="form" id="form">
						<div class="weui-cells weui-cells_form bg-wechat mar-t0">
							<!--验证码-->
							<div class="weui-cell bg-white pad-t1 pad-b1">
								<div class="weui-cell__hd"><label class="weui-label text-font4">验证码</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input text-font3" type="text" placeholder="请输入验证码" ng-model="yanzhengma">
								</div>
								<div class="weui-cell__ft">
									<a class="weui-vcode-btn text-font3" ng-click="Code()" ng-bind="getCode">获取验证码</a>
								</div>
							</div>
							<!--新密码-->
							<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">新密码</label></div>
								<div class="weui-cell__bd pad-r4">
									<input class="weui-input text-r" id="new_pass" name="new_pass" type="password" ng-model="new_pw">
								</div>
								 <div class="weui-cell__ft">
							       <input class="weui-switch text-font3" name="checkbox_on" id="checkbox_on" type="checkbox">
							     </div>
							</div>
							<!--确认密码-->
							<div class="weui-cell bg-white">
								<div class="weui-cell__hd"><label class="weui-label text-font4">确认新密码</label></div>
								<div class="weui-cell__bd pad-r4">
									<input class="weui-input text-r" id="re_new_pass" name="re_new_pass" type="password" ng-model="re_pw">
								</div>
								<div class="weui-cell__ft">
							       <input class="weui-switch text-font3" type="checkbox" id="re_checkbox_on" name="re_checkbox_on">
							     </div>
							</div>
						</div>
						<!--保存-->
						<a href="javascript:;" id="pass_save" class="weui-btn weui-btn_primary pD-btn" ng-click="uPbysave()">保存修改</a>
					</form>
				</article>
			</section>
			</div>
		</div>
<#include "../inc/foot.ftl"/>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/personalData.js" type="text/javascript" charset="utf-8"></script>