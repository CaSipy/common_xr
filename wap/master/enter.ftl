 <#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
		<#-- ${json_config.project_name_common}/ -->
		<!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/join.css">
	    
	    <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/enter.js?ver=1234" type="text/javascript" charset="utf-8"></script>
	    
	    <#--  
	    <link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/join.css">
	    
	    <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/enter.js?ver=1234" type="text/javascript" charset="utf-8"></script>-->
	    
</head>
	<body ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">填写认证资料</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<div class="box_status" id="show2">
			<div class="weui-cells weui-cells_form bg-white width90" style=" margin:auto; margin-top: 8rem !important;">
		
				<div class="weui-cell weui-cell_vcode">
					<div class="weui-cell__hd">
						<label class="weui-label bc-text text-font4">手机号</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input text-font4" type="tel" placeholder="请输入手机号" required ng-model="phone">
					</div>
					<div class="weui-cell__ft">
						<a class="weui-vcode-btn text-font4 sc-text-blue" ng-click="login_Code()" ng-bind="get_code"></a>
					</div>
				</div>
		
				<div class="weui-cell">
					<div class="weui-cell__hd"><label class="weui-label bc-text text-font4">验证码</label></div>
					<div class="weui-cell__bd">
						<input class="weui-input text-font4 sc-text-blue" type="text" placeholder="请输入验证码" ng-model="yanzhengma" required>
					</div>
				</div>
			</div>
		</div>
		
		<a href="javascript:;" class="weui-btn weui-btn_primary width90 bg-qblue" style="margin: auto; margin-top: 2rem;" ng-click="checkCode()">下一步</a>
		
	    
	    
<#include "../inc/foot.ftl"/>