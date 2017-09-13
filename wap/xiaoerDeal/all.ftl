 <#include "../inc/head_base.ftl"/>
 	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<#include "../inc/head_ng.ftl"/>
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
	 	<!--当前项目样式引用-->
	 	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
	 	<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/deal.css">
	    
		
		<script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/jquery-2.1.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
		<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
		<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/deal.js?ver=2017053119525"></script>
		
		<!--${json_config.project_name_common}/
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/deal.css">
	    
		<script src="${json_config.oss_common_url}/angular/angular-sanitize.js"></script>
		<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/jquery-2.1.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
		<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
		<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>
		<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/deal.js?ver=201705311945"></script> -->
		
		
		 <script>
	    	json={};
	    </script>
	</head>
	<body class="body-hid" ng-app="app" ng-controller="ctrl">
		<!--头部-->
		<header class="back-header weui-flex bg-white header_bBor">
			<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
			<h1 class="back-header-h1 flex_item4 sc-text-blue"></h1>
			<a class="flex_item1 header-right sc-text-blue"></a>
		</header>
		<section class="weui-flex deal_section fix_containner mar-b0">
			<!--侧导航-->
			<nav class="flex_item1 deal_nav">
				<a class="weui-grid__label" href="#tab{{ $index }}" ng-class="{'deal_nav_active':$index==0}" onclick="aSkip(this)" ng-repeat="item in jsonlist" ng-bind="item.list"></a>
			</nav>
			<article class="flex_item3 bg-white deal_article" id="deal_article" style="">
				<!--循环体-->
				<div id="tab{{ $index }}" ng-repeat="itemlist in jsonlist">
					<figure class="weui-grids" ng-repeat="itemnum in itemlist.listnum">
						<header class="article_header" ng-bind="itemnum.type"></header>
						<a href="#" class="weui-grid js_grid cancle open-popup" ng-click="showDetail(item.id)" ng-repeat="item in itemnum.typename">
							<div class="weui-grid__icon lit_img">
								<img ng-src="{{ item.icon }}" class="u-radius" alt="">
							</div>
							<p class="weui-grid__label" ng-bind="item.name"></p>
						</a>
					</figure>
				</div>
				<div style="width:100%;height:16rem"></div>
			</article>

		</section>
		<!--弹出层-->
		<!--商品详情-->
		<section id="popup_detail" class="weui-popup__container" style="top: 2.5rem;">
  			<div class="weui-popup__modal">
				<header>
					<img ng-src="{{jsondetail.detail_img}}" style="width: 100%; height: 6.5rem;" />
				</header>
				<div class="detail_section">
					<article class="detail_article">
						<header class="detail_header" >服务介绍</header>
						<table class="detail_table" style="margin-top:5px">
							<tr style="background: #008CD7;">
								<th>服务项目</th>
								<th>单位</th>
								<th>原价</th>
								<th>特价</th>
							</tr>
							<tr>
								<td ng-bind="jsondetail.name"></td>
								<td ng-bind="jsondetail.unit"></td>
								<td ng-bind="jsondetail.origin_price"></td>
								<td ng-bind="jsondetail.price"></td>
							</tr>
						</table>
						<aside class="detail_aside" id="description">
							Phasellus porta fermentum est et eleifend. Pellentesque dapibus fermentum tortor, non fermentum sem vehicula sit amet. Vivamus sed justo nisl. Nunc suscipit scelerisque ex, at mattis ipsum elementum sed. Cras eget neque ut justo dignissim tempus. In eu mi sagittis, fringilla lorem ac, porttitor ante. Duis fermentum, leo eget gravida cursus, eros mi congue est, et aliquam lectus enim ac ipsum. Cras eu lacus non odio laoreet fringilla. Curabitur eget enim vitae velit tincidunt aliquam. Aliquam nec tortor eu sapien efficitur rhoncus eu vel ante.
		
						</aside>
					</article>
					<!--服务时长
					<!--<article>
						<header class="header_mar">
							<div class="detail_header">服务时长</div>
						</header>
						<div class="header_mar bg-white text-font2" style="padding-left: 1.7rem;" ng-bind="jsondetail.time+'分钟/台'"></div>
					</article>-->
					<!--清洗流程-->
					<!--<article>
						<header class="header_mar">
							<div class="detail_header">清洗流程</div>
						</header>
						<div class="header_mar bg-white text-font2" style="padding-left: 1.7rem;">
							<ui class="wash_ui" ng-bind-html="jsondetail.flow">-->
								<!--<li>验机</li>-->
								<!--<li>准备工具、做环境防护</li>-->
								<!--<li>拆卸外壳、做电路防护</li>-->
								<!--<li>多功能清洗机进行深度清洗</li>-->
								<!--<li>清洗外壳部件</li>-->
								<!--<li>机器安装还原</li>-->
								<!--<li>试机、清理现场</li>-->
							<!--</ui>
						</div>
					</article>-->
					<!--服务保养工具-->
					<!--<article>
						<header class="header_mar">
							<div class="detail_header">清洗流程</div>
						</header>
						<div class="header_mar bg-white text-font2" style="padding-left: 1.7rem;">
							<ui class="wash_ui" ng-bind-html="jsondetail.tool">-->
								<!--<li>十分到家家庭环境防护套装</li>-->
								<!--<li>多功能高压清洗机</li>-->
								<!--<li>空调专用清洗保护罩</li>-->
							<!--</ui>
						</div>
					</article>-->
					<a href="javascript:;" class="weui-btn weui-btn_primary detail_btn bg-qblue" ng-click="placeOrder()">立即下单</a>
					<a href="javascript:;" class="weui-btn weui-btn_default close-popup detail_btn" style="margin-bottom: 1rem;">关闭</a>
				</div>
			</div>
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