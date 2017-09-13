	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<!--微信分享   begin-->
	<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<script>
		var head = document.getElementsByTagName("head")[0];
		var js = document.createElement("SCRIPT");
		var href = location.href.replace(/&/g,'%26');
		js.type= 'text/javascript'; 
		js.onload = js.onreadystatechange = function() { 
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
			js.onload = js.onreadystatechange = null; 
		} }; 
		js.src="${domain_url}/wxjs/js/getJsTicket.do?currentUrl="+href+"&jsApiList='onMenuShareAppMessage','onMenuShareTimeline'";
		head.appendChild(js); 
		var js2 = document.createElement("SCRIPT");
		js2.type= 'text/javascript'; 
		js2.onload = js.onreadystatechange = function() { 
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
			js2.onload = js2.onreadystatechange = null; 
		} }; 
		//这里的title（分享显示的标题），desc（分享显示的描述），和imgUrl（分享显示的图片）参数要传
		js2.src="${domain_url}/wxjs/js/share.do?title=小二快服&desc=分享了一个链接&link="+href+"&imgUrl=http://common.huibaoming.cn/wap/images/xr/logo.png";
		head.appendChild(js2); 
	</script>
	<!--end-->
	
	<link rel="stylesheet" type="text/css" href="${json_config.oss_common_url}/font-awesome-4.7.0/css/font-awesome.css"/>
	
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/home_xr.css?ver=1">
	<#--
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css">
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/home_xr.css">
	-->
</head>
	<body ng-app="app" ng-controller="ctrl">
		<header class="swiper-container">
			<!--搜索框-->
			<div class="Home_search" ng-click="home_ser()">
				<input type="text" id="search" placeholder="请输入想要选择的项目" readonly="readonly" />
				<i class="fa fa-search"></i>
			</div>
			<!--swiper容器[可以随意更改该容器的样式-->
			<div class="swiper-wrapper">
				<div class="swiper-slide" ng-repeat="item in json.swipers"
					ng-click="toSwiper(item.id)">
					<a ng-href="{{item.url}}"><img src="{{item.selected_icon}}" style="width:100%;height:14rem"></a>
				</div>
			</div>
		</header>
		<!--通告区-->
		<article class="weui-row bg-white nav_form mar-t1">
			<div class="weui-col-20 mar-l2">
				<img src="http://common.huibaoming.cn/wap/images/form.png" alt="" style="width:.9rem">
				<span class="text-font3">公告</span>
			</div>
			<div class="weui-col-75" style="overflow: hidden; text-overflow: ellipsis;">
				<span class="nav_form_title text-font3" ng-bind="announcement" ng-click="toAnnouncement()"></span>
			</div>
			<div class="weui-col-10 text-r"><span class="icon icon-angle-right"></span></div>
		</article>
		<!--导航区-->
		<nav class="text-c bg-white mar-t1 pad-t2 pad-b2">
			<div class="grid">
				<div class="grid_item nav_item" ng-repeat="item in json.types track by $index"
					ng-click="toDealType($index)">
					<img ng-src="{{item.type_icon}}" alt="">
					<p ng-bind="item.name"></p>
				</div>
			</div>
		</nav>
		
		<!--产品展示区-->
		<section class="Home_sec weui-flex fix_containner">
			<figure ng-click="toDealDetail(json.deals[0].id)" class="sec_left flex_item5 text-c">
				<figcaption ng-bind="json.deals[0].name"></figcaption>
				<p class="sc-text-tab text-font2 pad-l2 pad-r2 text-astrict showLine-1" ng-bind="json.deals[0].index_desc"></p>
				<img ng-src="leftImg" src="{{json.deals[0].index_img}}" class="sec_leftImg u-radius mar-t2" alt="" />
			</figure>
			<article class="sec_right flex_item4">
				<figure ng-click="toDealDetail(json.deals[1].id)" class="weui-media-box weui-media-box_appmsg pad-t2">
					<div class="weui-media-box__bd text-c">
						<h4 class="weui-media-box__title text-font4" ng-bind="json.deals[1].name"></h4>
						<p class="weui-media-box__desc" ng-bind="json.deals[1].index_desc"></p>
					</div>
					<div class="text-c sec_rightImg mar-l2">
						<img class="weui-media-box__thumb sec_rightImg" ng-src="{{json.deals[1].index_img}}">
					</div>
				</figure>
				<figure ng-click="toDealDetail(json.deals[2].id)" class="weui-media-box weui-media-box_appmsg pad-t2">
					<div class="weui-media-box__bd text-c">
						<h4 class="weui-media-box__title text-font4" ng-bind="json.deals[2].name"></h4>
						<p class="weui-media-box__desc" ng-bind="json.deals[2].index_desc"></p>
					</div>
					<div class="text-c sec_rightImg mar-l2">
						<img class="weui-media-box__thumb sec_rightImg" ng-src="{{json.deals[2].index_img}}">
					</div>
				</figure>
			</article>
		</section>
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
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
<#--
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/home.js" type="text/javascript" charset="utf-8"></script>
-->
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/home.js?ver=123" type="text/javascript" charset="utf-8"></script>
