<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	    <!--当前项目样式引用-->
	    
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/Place.css">
		 <!--	
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css">
		<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/Place.css">
		-->
	</head>
	<body class="bg-wechat" ng-controller="ctrl"  ng-app="app">
		<div>
			<!--头部-->
			<header class="back-header weui-flex bg-white header_bBor">
				<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);">返回</span>
				<h1 class="back-header-h1 flex_item4 sc-text-blue">新增地址</h1>
				<a class="flex_item1 header-right sc-text-blue"></a>
			</header>
			<!--主体部分-->
			<div class="fix_containner">
			    <section class="weui-cells weui-cells_form mar-t0 bg-wechat cancle">
                				<!--收货人-->
                				<article class="weui-cells mar-t0">
                					<div class="weui-cell">
                						<div class="weui-cell__hd"><label class="weui-label text-font3" >联系人</label></div>
                						<div class="weui-cell__bd">
                							<input class="weui-input text-r text-font3 sc-text-gray" type="text" ng-model="receiver_name">
                						</div>
                					</div>
                				</article>
                				<!--手机号码-->
                				<article class="weui-cells mar-t0">
                					<div class="weui-cell">
                						<div class="weui-cell__hd"><label class="weui-label text-font3">联系电话</label></div>
                						<div class="weui-cell__bd">
                							<input class="weui-input text-r sc-text-gray text-font3" type="number" pattern="[0-9]*"  ng-model="receiver_phone">
                						</div>
                					</div>
                				</article>
                				<!--选择地址-->
                				<article class="weui-cells mar-t0">
                					<div class="weui-cell">
                						<div class="weui-cell__hd"><label for="name" class="weui-label text-font3">所在地区</label></div>
                						<div class="weui-cell__bd">
                							<input id="start" class="weui-input text-r text-font3 sc-text-gray" type="text" value="" readonly="">
                							<iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></div>
                					</div>
                				</article>
                			    <!--详细地址-->
                				<article class="weui-cells weui-cells_form mar-t0">
                					<div class="weui-cell">
                						<div class="weui-cell__bd">
                							<textarea class="weui-textarea text-font3 sc-text-tab sc-text-gray" placeholder="请填写详细信息 不少于5个字" rows="3" ng-model="address"></textarea>
                						</div>
                					</div>
                				</article>

                				<!--设为默认-->
                				<article class="weui-cells weui-cells_form">
                					<div class="weui-cell weui-cell_switch">
                						<div class="weui-cell__bd text-font3">设为默认</div>
                						<div class="weui-cell__ft">
                							<input class="weui-switch" type="checkbox" ng-model="is_chose">
                						</div>
                					</div>
                				</article>
                				<article class="pad-all3 mar-t4">
                					<a id="savePlace" href="javascript:;" class="weui-btn width90 margin-auto text-font4 bg-qblue" ng-click="create()">保存</a>
                				</article>
                			</section>
			</div>


		</div>
	</body>
		
</html>

<script>
			$(function() {
				
				$("#time-format").datetimePicker({
		        title: '自定义格式',
		        yearSplit: '年',
		        monthSplit: '月',
		        dateSplit: '日',
		        times: function () {
		          return;
		        },
		        onChange: function (picker, values, displayValues) {
		          console.log(values);
		        }
		      });
			});
			
		</script>
		<script src="http://common.huibaoming.cn/jquery-weui/js/city-picker.js?ver=123"></script>
		
<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/addPlace.js?ver=112" type="text/javascript" charset="utf-8"></script>
<!--
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/addPlace.js" type="text/javascript" charset="utf-8"></script>
-->
<#include "../inc/foot.ftl"/>