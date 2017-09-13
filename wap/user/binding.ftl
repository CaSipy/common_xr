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
	<body ng-controller="ctrl" class="bg-wechat">
		<div class="weui-cells weui-cells_form bg-white width90" style=" margin:auto; margin-top: 4rem !important;">
		  
		  <div class="weui-cell weui-cell_vcode">
		    <div class="weui-cell__hd">
		      <label class="weui-label bc-text text-font4">手机号</label>
		    </div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="tel" placeholder="请输入手机号" required  ng-model="phone">
		    </div>
		    <div class="weui-cell__ft">
		      <a class="weui-vcode-btn text-font4" ng-click="banding_Code()" ng-bind="get_code"></a>
		    </div>
		  </div>
		  
		  <div class="weui-cell">
		    <div class="weui-cell__hd"><label class="weui-label bc-text text-font4">验证码</label></div>
		    <div class="weui-cell__bd">
		      <input class="weui-input text-font3" type="text"  placeholder="请输入验证码" ng-model="yanzhengma" required>
		    </div>
		  </div>
		</div>
		<a href="javascript:;" class="weui-btn weui-btn_primary width90" style="margin: auto; margin-top: 2rem;" ng-click="binding()">绑定</a>
		
	</body>
</html>
