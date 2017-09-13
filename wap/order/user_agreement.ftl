<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
		<#-- ${json_config.project_name_common}/ -->
		<!--当前项目样式引用 -->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/userCenter.css">
	    
	    <script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
	    <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/user_agreement.js?ver=201706141055"></script>
	   
</head>
<body ng-app="app" ng-controller="ctrl">
<!--头部-->
<header class="back-header weui-flex bg-white header_bBor">
    <span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
    <h1 class="back-header-h1 flex_item4 sc-text-blue">平台说明</h1>
    <a class="flex_item1 header-right sc-text-blue"></a>
</header>
<div class="fix_containner">
    <div class="agreement_name">
        <p class="text-font5"><span class="icon icon-info-sign active mar-r2" style="font-size:1.5rem"></span><b class="text-font5">用户条款详情</b></p>
    </div>
    <!--正文内容-->
    <div class="agreement_contain">
        <section>
            <div class="agr_title" style="padding-left:5%;padding-right:5%;width:100%;box-sizing: border-box;" ng-bind-html="msg"></div>
        </section>
    </div>
    <a class="weui-btn weui-btn_primary width90 bg-qblue" style="margin: auto; margin-top: 2rem;" ng-click="back()">返回</a>
</div>
	 
	 
	 <#include "../inc/foot.ftl"/>