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
	    
	    <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/notAudit.js?ver=12" type="text/javascript" charset="utf-8"></script>
	    
	    <script>
	    	json={};
	    </script>
	    
</head>
<body ng-app="app" ng-controller="ctrl">
	<div class="audit2 text-c ">
		<header class="audit_header2 icon-warning-sign">
		</header>
		<h1 class="audit_h1">抱歉，您的审核没有通过...</h1>
		<h2 class="audit_h2" ng-bind="tip"></h2>
		<a href="javascript:;" class="weui-btn weui-btn_primary width90 bg-qblue audit_btn" ng-click="reapply()">重新申请</a>
		<a href="../userCenter/index.do" class="weui-btn weui-btn_default width90">关闭</a>
	</div>
	
<#include "../inc/foot.ftl"/>