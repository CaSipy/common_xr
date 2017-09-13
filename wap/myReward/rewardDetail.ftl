<#include "../inc/head_base.ftl">
<#include "../inc/head_jq.ftl">
<#include "../inc/head_weui.ftl">
<#include "../inc/head_var.ftl">
<#include "../inc/head_ng.ftl">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/wap.css">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/wap_public.css">
    <link rel="stylesheet" href="${domain_url}/common/wap/src/css/award.css">

	</head>
	<body ng-app="app" ng-controller="ctrl">
		<header class="coupon_msg">
			<article class="coupon_header theme_bg">
				<div class="weui-row">
					<div class="weui-col-75"><p>广州惠学科技有限公司</p></div>
					<div class="weui-col-25 text-r"><i class="icon-remove"></i></div>
				</div>
				<center>
					<p class="name" ng-bind="reward_name"></p>
					<p class="text-font2" >获奖时间：{{delivery_time}}</p>
					<span class="coupon_ticket_collect" ng-bind="reward_type_name"></span>
				</center>
			</article>
			<div class="coupon_status">
				<span class="bg-qgray sc-text-gray" ng-bind="delivery_status"></span>
			</div>
		</header>
		<section class="coupon_detail">
			<header class="msg_title">
				奖品详情
			</header>
			<article>
				<div class="weui-row">
					<div class="weui-col-25 sc-text-gray"><p>领奖时间</p></div>
					<div class="weui-col-75 ">{{start_time}}至{{end_time}}</div>
				</div>
				<div class="weui-row">
					<div class="weui-col-25 sc-text-gray"><p>奖品价值</p></div>
					<div class="weui-col-75 " ng-bind="real_money"></div>
				</div>
				<div class="weui-row">
					<div class="weui-col-25 sc-text-gray"><p>奖品来源</p></div>
					<div class="weui-col-75 " ng-bind="deal_name"></div>
				</div>
				<div class="weui-row">
					<div class="weui-col-25 sc-text-gray"><p>奖品描述</p></div>
					<div class="weui-col-75 " ng-bind="description"></div>
				</div>
			</article>
		</section>
		<footer class="footer" style="background:white">
			<a href="javascript:;" class="weui-btn theme_bg text-font5" style="width:95%;margin:0.5rem auto;border-radius:5px">兑换卡券中心</a>
		</footer>

<script src="${domain_url}/common/wap/src/js/rewardDetail.js?ver=2"></script>
<#include "../inc/foot.ftl">
