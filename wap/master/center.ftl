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
		<!--当前项目样式引用-->
		<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/join.css">
	    
	    <script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/center.js?ver=123456" type="text/javascript" charset="utf-8"></script>
	    
	    <!-- 
	    <link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"/>
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	    <link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/join.css">
	    
	    <script src="${json_config.domain_url}/${json_config.folder_name}/src/js/center.js?ver=12345" type="text/javascript" charset="utf-8"></script>
	    -->
	    <script>
	    	json = {};
	    </script>
</head>
<body class="bg-qgray" style="padding-bottom: 100px;" ng-app="app" ng-controller="ctrl">
		<!--头像资料-->
		<header class="weui-panel weui-panel_access theme-bc pad-t3 pad-b3 bg-qblue">
			<div class="weui-panel__bd">
				<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" style="height: 6rem;">
					<div class="eui-grid position-none js_grid userHLeft">
						<div class="userHImg">
							<img ng-src="{{imgurl}}" class="userHImg" alt="">
						</div>
					</div>
					<div class="weui-media-box__bd pad-l4">
						<h4 class="weui-media-box__title bc-text-header text-font5" ng-bind="master_name"></h4>
						<p class="weui-media-box__desc text-font3 mar-t3" style="color: #D6D6D6;"></p>
					</div>
				</a>
			</div>
		</header>
		
		<!--我的活动-->
		<section class="weui-panel__bd mar-t5">
			<div class="weui-media-box weui-media-box_small-appmsg">
				<div class="weui-cells">
					<a class="weui-cell weui-cell_access" href="${json_config.project_url}/masterInfo/index.do" id="{{$index}}">
						<div class="weui-cell__hd">
							<img class="" alt="" src="http://common.huibaoming.cn/wap/images/xr/pic_user.png" style="width:1.3rem">
						</div>
						<div class="weui-cell__bd weui-cell_primary">
							<p class="text-font-p">我的资料</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
					<a class="weui-cell weui-cell_access" href="${json_config.domain_url}/finance/userMoney/index.do">
						<div class="weui-cell__hd">
							<img class="" src="http://common.huibaoming.cn/wap/images/xr/pic_waller.png" alt="" style="width:1.3rem">
						</div>
						<div class="weui-cell__bd weui-cell_primary">
							<p class="text-font-p">我的财务</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
					<a class="weui-cell weui-cell_access" href="${json_config.project_url}/userAddress/index.do">
						<div class="weui-cell__hd">
							<img class="" src="http://common.huibaoming.cn/wap/images/xr/pic_address.png" alt="" style="width:1.3rem">
						</div>
						<div class="weui-cell__bd weui-cell_primary">
							<p class="text-font-p">我的住址</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
					<a class="weui-cell weui-cell_access" href="tel:{{phone}}">
						<div class="weui-cell__hd">
							<img class="" src="http://common.huibaoming.cn/wap/images/xr/pic_call.png" alt="" style="width:1.3rem">
						</div>
						<div class="weui-cell__bd weui-cell_primary">
							<p class="text-font-p">联系客服</p>
						</div>
						<span class="weui-cell__ft" ng-bind="phone"></span>
					</a>
					<!--<a class="weui-cell weui-cell_access" href="receiptPlace.html">
						<div class="weui-cell__hd">
							<img class="" alt="" src="http://common.huibaoming.cn/wap/images/xr/pic_ask.png" style="width:1.3rem">
						</div>
						<div class="weui-cell__bd weui-cell_primary">
							<p class="text-font-p">反馈意见</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>-->
				</div>
			</div>
		</section>
		
		<footer class="weui-tabbar" id="footer">
	        <div class="weui-tabbar" name="footer">
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/masterOrder/masterHome.do">
	                <!--<span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;">8</span>-->
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_home.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">首页</p>
	            </a>
	            <a  class="weui-tabbar__item " href="${json_config.project_url}/masterOrder/list.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_classify.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2">订单</p>
	            </a>
	            <a  class="weui-tabbar__item" href="${json_config.project_url}/master/center.do">
	                <div class="weui-tabbar__icon weui-tar__img">
	                    <img src="${json_config.oss_common_url}/wap/images/xr/icon_user1.png" alt="">
	                </div>
	                <p class="weui-tabbar__label text-font2 sc-text-blue">我</p>
	            </a>
	        </div>
	    </footer>

	    
<#include "../inc/foot.ftl"/>