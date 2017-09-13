<#include "../inc/head_base.ftl"/>
		<#include "../inc/head_jq.ftl"/>
		<#include "../inc/head_weui.ftl"/>
		<#include "../inc/head_ng.ftl"/>
		<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/userTeam.css?ver=1">
		<style>
			.classify_nav li{width:32.8%}
		</style>
	</head>
	<body ng-controller="ctrl" class="bg-wechat">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue">我的团队</h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<div class="fix_containner">
		<section>
			<!--头部图片-->
			<header class="bg-qblue">
				<div class="text-c section_header">
					<img class="headerImg u-radius" src="http://common.huibaoming.cn/wap/images/xr/xr_team.png"/>
				</div>
			</header>
			<nav class="weui-tab nav sc-text-blue" ng-bind="'总共有'+num+'个'+flagNum+'级会员'">
			</nav>
			<article>
				<nav class="bg-wechat">
					<div class="classify_nav">
			            <ul>
			                <!-- data-base 为看效果测试用，可删除-->
			                <li class="nav_li_checked" data-base="1" ng-click="getMore(1)">一星</li>
			                <li data-base="2" ng-click="getMore(2)">二星</li>
			                <li data-base="3" ng-click="getMore(3)">三星</li>
			                <!--<li data-base="4">四级</li>
			                <li data-base="5">五级</li>
			                <li data-base="6">六级</li>
			                <li data-base="7">七级</li>-->
			            </ul>
			        </div>
				</nav>
				<div id = "1">
					<figure class="weui-panel weui-panel_access mar-b1" ng-repeat="user in teamUser">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" ng-src="{{ user.user_pic }}">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4" ng-bind="user.user_name"></h4>
								</div>
							</a>
						</div>
					</figure>
					<!--<figure class="weui-panel weui-panel_access mar-t0 mar-b1">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" src="../../oss/wap/images/header.jpg">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4">张三</h4>
								</div>
							</a>
						</div>
					</figure>
					<figure class="weui-panel weui-panel_access mar-t0 mar-b1">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" src="../../oss/wap/images/header.jpg">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4">张三</h4>
								</div>
							</a>
						</div>
					</figure>-->
				</div>
				<!--<div id = "2" class="hide">
					<figure class="weui-panel weui-panel_access mar-b1">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" src="../../oss/wap/images/header.jpg">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4">张发士大夫</h4>
								</div>
							</a>
						</div>
					</figure>
					<figure class="weui-panel weui-panel_access mar-t0 mar-b1">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" src="../../oss/wap/images/header.jpg">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4">张三</h4>
								</div>
							</a>
						</div>
					</figure>
					<figure class="weui-panel weui-panel_access mar-t0 mar-b1">
						<div class="weui-panel__bd">
							<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg pad-t3 pad-b3">
								<div class="weui-media-box__hd userImg">
									<img class="weui-media-box__thumb u-radius" src="../../oss/wap/images/header.jpg">
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title sc-text-tab text-font4">张三</h4>
								</div>
							</a>
						</div>
					</figure>
				</div>-->
			</article>
		</section>
		</div>
<#include "../inc/foot.ftl"/>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userTeam.js?ver=201706211231" type="text/javascript" charset="utf-8"></script>
<script src="http://common.huibaoming.cn/jquery-weui/js/city-picker.js"></script>
<script src="http://common.huibaoming.cn/swiper/js/swiper.js"></script>