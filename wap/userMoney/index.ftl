 <#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userMoney.js?ver=201705162116"></script>
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/userMoney.css?ver=201704271518">

</head>
<body ng-app="app" ng-controller="ctrl" class="bg-white">

<header class="back-header weui-flex bg-white header_bBor">
    <span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
    <h1 class="back-header-h1 flex_item4 sc-text-blue" ng-bind="json.nav_title"></h1>
    <a class="flex_item1 header-right sc-text-blue"></a>
</header>
<!--内容区-->
<div class="fix_containner">
    <div class="bg-qblue center-pad">
        <center class="bc-text-header" style="line-height:1.3;">
            <p  class="center-pad-type" ng-bind="first_money_payment.name"  ng-click="jumpToLogs(first_money_payment.id)"></p>
            <p class="money-number" ng-bind="json.user_finance[first_money_payment.class_name]" ng-click="jumpToLogs(first_money_payment.id)"></p>
            <!--转账-->
            <!--<p style="color:#d7d7d7;" ng-click=addCart(3,first_money_payment.id,first_money_payment.id) ng-bind="money_first_types[2].name"></p>-->
        </center>
    </div>
    <div class="weui-flex text-c pad-all3 bg-white text-c" >
        <div class="weui-flex__item" ng-repeat="item in money_payments" ng-click="jumpToLogs(item.id)">
            <p class="sc-text-blue text-font5" ng-bind="json.user_finance[item.class_name]"></p>
            <p class="sc-text-tab text-font3" ng-bind="item.name"></p>
        </div>
    </div>
    <article class="mar-t5">
		<!--<header class="text-font4 uMoney_title">
			近期记录
		</header>-->
		<!--未交互需要交互-->
		<!--<figure class="bg-white" ng-repeat="item in json.xxx">
			<a class="weui-cell weui-cells_access" href="detail.html">
				<div class="weui-cell__hd"><img src="http://common.huibaoming.cn/wap/images/header.jpg" alt="icon" style="width:30px"></div>
				<div class="weui-cell__bd weui-cell_primary">
					<p class="text-font4" ng-bind="item.xxx">红包-来自林某某</p>
					<p class="text-font4 tip_c" ng-bind="item.xxx">2月20号&nbsp;12:90</p>
				</div>
				<div class="weui-cell__bd text-r">
					<p class="hx_addc hx_fw" ng-bind="item.xxx">+1.12</p>
					<p class="text-font1 hx_abc" ng-bind="'剩余'+item.xxx">剩余2233</p>
				</div>
			</a>
		</figure>-->
	</article>
</div>
<!--底部操作按钮-->
<div class="fix-footer">
    <div class="weui-flex">
        <!--提现-->
        <div class="weui-flex__item  fix-item bg-qblue active" ng-click=addCart(2,first_money_payment.id,1) >余额提现</div>
        <div class="weui-flex__item  fix-item active" style="color:#008CD7" ng-click=addCart(2,money_payments[1].id,1) >佣金提现</div>
    </div>
</div>

<#include "../inc/foot.ftl"/>