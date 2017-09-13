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
	<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/userCenter.js"></script>
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/wap_public.css">
    <link rel="stylesheet" href="${json_config.oss_static_url}/wap/src/css/userCenter.css">

</head>
<body ng-app="app" ng-controller="ctrl">
<div class="containner">
<!--头部一-->
<div class="header-container bg-qblue text-font4">
    <a href="javascript:;" class="weui-media-box weui-media-box_appmsg" style="height: 6rem;">
        <div class="eui-grid position-none js_grid userHLeft">
            <div class="userHImg">
            	<img src="{{json.user_info.user_pic!=''?json.user_info.user_pic:user_url}}" alt="" class="userHImg">
            </div>
            <aside id="nothing_order" class=" hide" ng-class="{'show':json.is_sign}">
            <p class="weui-grid__label text-font2 userHbtn mar-t2" ng-click=sign()>
				签到
			</p>
			</aside>
			<aside id="nothing_order" class=" hide" ng-class="{'show':!json.is_sign}">
			<p class="weui-grid__label text-font2 userHbtn mar-t2">
				已签到
			</p>
			</aside>
		</div>
		<div class="weui-media-box__bd pad-l4">
			<h3 class="bc-text-header text-font5">欢迎来到小二快服</h3>
			<h4 class="weui-media-box__title bc-text-header text-font5 mar-t2" ng-bind="userName">游客</h4>
			<p class="weui-media-box__desc text-font3" style="color: #D6D6D6;" ng-bind="binding(json.bind)">已绑定微信</p>
		</div>
        <!--通知-->
        <div style="position:absolute;top:10px;right:10px;" ng-click="newform()"><img src="http://common.huibaoming.cn/wap/images/new.png" alt="" style="width:24px"></div>

    </a>
</div>
</div>
<!--主体内容-->
<div class="weui-cells text-font3" style="margin-top:0">
    <div class="weui-cell weui-cell_access" ng-repeat="item in json.menu_2" ng-click=jump_url(item.url,item.app_module_action_param)>
        <div class="weui-cell__hd">
        <img src="{{json_config.oss_common_url}}/{{item.no_selected_icon}}" style="width:1.3rem"></div>
        <div class="weui-cell__bd">
            <p ng-bind="item.name"></p>
        </div>
        <div class="weui-cell__ft"></div>
    </div>
</div>

<!--按钮-->
<div style="width:auto;margin:1rem 15px 3.5rem 15px" ng-click=loginout()>
    <div class="weui-btn weui-btn_primary bg-qblue">退出登录</div>
</div>

</div>
<!--底部导航栏-->
<div class="weui-tabbar">
    <div class="weui-tabbar">
        <a href="{{combineUrl(item.url,item.app_module_action_param)}}" class="weui-tabbar__item {{is_pre_url(item.url,item.app_module_action_param)?'weui-bar__item--on':''}}"  ng-repeat="item in json.menu_1">
            <div class="weui-tabbar__icon weui-tar__img">
                <img src="{{json_config.oss_common_url}}/{{is_pre_url(item.url,item.app_module_action_param)?item.selected_icon:item.no_selected_icon}}" alt="">
            </div>
            <p class="weui-tabbar__label text-font2">{{item.name}}</p>
        </a>
    </div>
</div>



<#include "../inc/foot.ftl"/>