<#include "../inc/head_base.ftl"/>
<#include "../inc/head_jq.ftl"/>
<#include "../inc/head_weui.ftl"/>
<#include "../inc/head_ng.ftl"/>
<#include "../inc/head_var.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/jquery-weui.js"></script>
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/user.js?ver=985776"></script>
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/user.css">
		
	</head>
	<body ng-controller="ctrl">
		<div class="weui-cells weui-cells_form input-bg width90" style=" margin:auto; margin-top: 4rem !important;">

		  <div class="weui-cell weui-cell_vcode">
		    <div class="weui-cell__hd">
		      <label class="weui-label  text-font4">手机号</label>
		    </div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="number" placeholder="请输入手机号" required ng-model="phone">
		    </div>
		    <div class="weui-cell__ft">
		      <button class="weui-vcode-btn text-font4" ng-click="register_Code()" ng-bind="get_code"></button>
		    </div>
		  </div>

		  <div class="weui-cell">
		    <div class="weui-cell__hd"><label class="weui-label  text-font4">验证码</label></div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="text"  placeholder="请输入验证码" ng-model="yanzhengma" required>
		    </div>
		  </div>

		  <div class="weui-cell">
		    <div class="weui-cell__hd"><label class="weui-label  text-font4">昵称</label></div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="text"  placeholder="请输入昵称" ng-model="Uname">
		    </div>
		  </div>
		  <div class="weui-cell">
		    <div class="weui-cell__hd"><label class="weui-label  text-font4">密码</label></div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="password"  placeholder="请输入密码" ng-model="Pass">
		    </div>
		  </div>
		  <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bc-text text-font4">推荐人ID</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input text-font4" type="text"  placeholder="请输入推荐人ID" ng-model="pid">
            </div>
           </div>

		</div>
		<a href="javascript:;" class="weui-btn weui-btn_primary width90 text-font4" style="margin: auto; margin-top: 2rem;" ng-click="register()">注册</a>
	</body>
</html>
