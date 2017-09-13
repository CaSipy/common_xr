<#include "../inc/head_base.ftl"/>
<#include "../inc/head_jq.ftl"/>
<#include "../inc/head_weui.ftl"/>
<#include "../inc/head_ng.ftl"/>
<#include "../inc/head_var.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/user.js"></script>
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/user.css">

</head>

<body ng-controller="ctrl">
	<div>
    			<!--账号登录模块-->
    			<div class="box_status" style="display:block;" id="show1">
    				<div class="weui-cells weui-cells_form mar-t6 width90" style="margin:auto; margin-top: 4rem !important;">
    					<div class="weui-cell">
    						<div class="weui-cell__hd"><label class="weui-label text-font4">账号</label></div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font4" type="text" placeholder="请输入账号" ng-model="username">
    						</div>
    					</div>
    					<div class="weui-cell">
    						<div class="weui-cell__hd"><label class="weui-label text-font4">密码</label></div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font4" type="password" placeholder="请输入密码" ng-model="pwd">
    						</div>
    					</div>
    				</div>
    				<p class="weui-flex text-font2 width90 margin-auto">
    					<!--<span class="flex_item1 text-l mar-t2 pad-l2">？忘记密码</span>-->
    					<!--<span class="flex_item1 text-r mar-t2 pad-r2" ng-click="skip()">没有账号？注册</span>-->
    				</p>
    				<a href="javascript:;" class="weui-btn weui-btn_primary width90 text-font4" style="margin: auto; margin-top: 2rem;" ng-click="login()">登录</a>
    			</div>
    			<!--手机验证码登录-->
    			<div class="box_status" id="show2">
    				<div class="weui-cells weui-cells_form bg-white width90" style=" margin:auto; margin-top: 4rem !important;">

    					<div class="weui-cell weui-cell_vcode">
    						<div class="weui-cell__hd">
    							<label class="weui-label bc-text text-font4">手机号</label>
    						</div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font3" type="tel" placeholder="请输入手机号" required  ng-model="phone">
    						</div>
    						<div class="weui-cell__ft">
    							<a class="weui-vcode-btn text-font4" ng-click="login_Code()" ng-bind="get_code"></a>
    						</div>
    					</div>

    					<div class="weui-cell">
    						<div class="weui-cell__hd"><label class="weui-label bc-text text-font4">验证码</label></div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font3" type="text"  placeholder="请输入验证码" ng-model="yanzhengma" required>
    						</div>
    					</div>
    				</div>
    				<a href="javascript:;" class="weui-btn weui-btn_primary width90 text-font4" style="margin: auto; margin-top: 2rem;" ng-click="phone_login()">登录</a>

    			</div>
    			<!--忘记密码-->
    			<div class="box_status" id="show3">
    				<div class="weui-cells weui-cells_form bg-white width90" style=" margin:auto; margin-top: 4rem !important;">

    					<div class="weui-cell weui-cell_vcode">
    						<div class="weui-cell__hd">
    							<label class="weui-label bc-text text-font4">手机号</label>
    						</div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font3" type="tel" placeholder="请输入手机号" required  ng-model="phone">
    						</div>
    						<div class="weui-cell__ft">
    							<a class="weui-vcode-btn text-font4" ng-click="getback_Code()" ng-bind="get_code"></a>
    						</div>
    					</div>

    					<div class="weui-cell">
    						<div class="weui-cell__hd"><label class="weui-label bc-text text-font4">验证码</label></div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font3" type="text"  placeholder="请输入验证码" ng-model="yanzhengma" required>
    						</div>
    					</div>
    					<div class="weui-cell">
    						<div class="weui-cell__hd"><label class="weui-label bc-text text-font4">新密码</label></div>
    						<div class="weui-cell__bd">
    							<input class="weui-input text-font3" type="password"  placeholder="请输入密码" ng-model="forget_pwd" required>
    						</div>
    					</div>
    				</div>
    				<a href="javascript:;" class="weui-btn weui-btn_primary width90 text-font4" style="margin: auto; margin-top: 2rem;" ng-click="getback()">确定</a>

    			</div>
    		</div>
    		<div class="more" ng-click="more()">更多</div>
    		<!--弹出框-->
    		<div >
    			<div class="weui-mask" id="iosMask"></div>
    			<div class="time_box" id="time_box">
    				<div class="login_item" ng-click="change_status(1)">账号登录</div>
    				<div class="login_item" ng-click="change_status(2)">验证码登录</div>
    				<div class="login_item" ng-click="change_status(3)">忘记密码</div>
    				<div class="login_item" id="register" ng-click="skip()">用户注册</div>
    			</div>
    		</div>
	<#include "../inc/foot.ftl"/>