<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
		<#-- ${json_config.project_name_common}/ -->
	
		<!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/join.css">
	    
</head>
<body >
	<div class="audit1 ">
		<header class="audit_header">
			<img src="${json_config.oss_common_url}/wap/images/xr/audit.png" class="audit_hImg"/>
		</header>
		<h1 class="audit_h1">您已成功提交认证资料！</h1>
		<h2 class="audit_h2">请耐心等待审核结果</h2>
		<a class="weui-btn weui-btn_primary width90 bg-qblue audit_btn"  href="../userCenter/index.do">确定</a>
	</div>
	
<#include "../inc/foot.ftl"/>