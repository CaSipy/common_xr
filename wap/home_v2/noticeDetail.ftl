	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/haivitDeal.css">
	<#--
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/haivitDeal.css">
	-->
</head>
<body ng-app="app" ng-controller="ctrl">
<!--头部-->

	<div class="fix_containner" style="margin-top:0">
	
	    <!--正文内容-->
	    <div class="agreement_contain">
	        <section>
	            <div class="agr_title" ng-bind-html="article"></div>
	        </section>
	    </div>
	</div>
	<!--底部导航栏-->
    <footer class="weui-tabbar" id="footer">
        <div class="weui-tabbar">
            <a href="{{combineUrl(item.url,item.app_module_action_param)}}" ng-repeat="item in json.menu_1"
            	class="weui-tabbar__item {{is_pre_url(item.url,item.app_module_action_param)?'weui-bar__item--on':''}}">
            	<div class="weui-tabbar__icon weui-tar__img">
              		<img src="{{json_config.oss_common_url}}/{{is_pre_url(item.url,item.app_module_action_param)?item.selected_icon:item.no_selected_icon}}" alt="">
            	</div>
           		<p class="weui-tabbar__label text-font2" ng-bind="item.name"></p>
        	</a>
    	</div>
    </footer>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>

<script type="text/javascript" src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/deal_noticeDetail.js"></script>
