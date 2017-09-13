	<#include "../inc/head_base.ftl"/>
	<#include "../inc/head_jq.ftl"/>
	<#include "../inc/head_weui.ftl"/>
	<#include "../inc/head_ng.ftl"/>
	<#include "../inc/head_var.ftl"/>
	<style type="text/css">
		b{
			font-weight: normal;
		}
	</style>
	
    <link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap_public.css"/>
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/css/apply.css"/>
	<#--
    <link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap_public.css"/>
	<link rel="stylesheet" href="${json_config.domain_url}/${json_config.folder_name}/src/css/wap.css">
	<link rel="stylesheet" type="text/css" href="${json_config.domain_url}/${json_config.folder_name}/src/css/apply.css"/>
	-->
</head>
<body ng-app="app" ng-controller="ctrl">
	<!--头部-->
	<header class="back-header weui-flex bg-white header_bBor">
		<span class="back-header-icon icon-chevron-left flex_item1 sc-text-blue" onclick="javascript:window.history.go(-1);"></span>
		<h1 class="back-header-h1 flex_item4 sc-text-blue">申请售后</h1>
		<a class="flex_item1 header-right  sc-text-blue"></a>
	</header>
	<!--文本域-->
	<section class=" fix_containner mar-b0 pad-t1">
		<article class="weui-cells weui-cells_form pad-b3 mar-t2">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<p class="weui-uploader__title">文字说明</p>
						</div>
						<div class="weui-cell hx-abr  eva_trea ">
							<div class="weui-cell__bd">
								<textarea class="weui-textarea text-font3" placeholder="请输入文本" rows="3" ng-model="msg" onkeyup="calculate(this)"></textarea>
								<div class="weui-textarea-counter text-font3"><span id="eva_num">0</span>/<span class="eva_num_all">200</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
		
		<!--上传图片-->
		<article class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<p class="weui-uploader__title text-font4">上传图片</p>
						</div>
						<div class="weui-flex">
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" ng-if="pic1" style="position: relative;">
									<!--预览图-->
									<div style="background: url({{pic1}}) center no-repeat; background-size: cover;" class="img_item"></div>
                       				<div ng-click="pic1_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>
								<div class="weui-uploader__input-box idCardImg" id="heads_div" style="width: 94%;margin-left: 3%;">
									<input id="heads" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().pic1_upload(this.files)">
								</div>
							</div>
							<div class="text-c flex_item1 margin-auto">
								<ul class="weui-uploader__files idCardImg" ng-if="pic2"style="position: relative;">
           							<!--预览图-->
           							<div style="background: url({{pic2}}) center no-repeat; background-size: cover;" class="img_item"></div>
                       				<div ng-click="pic2_del()" class="del_icon icon-remove" style="cursor:pointer"></div>
           						</ul>	
								<div class="weui-uploader__input-box idCardImg" id="tails_div" style="width: 94%;margin-left: 3%;">
									<input id="tails" class="weui-uploader__input" type="file" accept="image/*"  file-model="images" onchange="angular.element(this).scope().pic2_upload(this.files)">
								</div>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</article>
	</section>
	<a href="javascript:;" class="weui-btn margin-auto weui-btn_primary eva_btn bg-qblue width90" style="margin-top: 2rem;" ng-click="finish()">提交申请</a>
<#include "../inc/foot.ftl"/>
<script src="${json_config.oss_common_url}/jquery-weui/js/city-picker.js"></script>
<script src="${json_config.oss_common_url}/swiper/js/swiper.js"></script>

<script src="${json_config.domain_url}/${json_config.project_name_common}/${json_config.folder_name}/src/js/apply.js?ver=201706262116" type="text/javascript" charset="utf-8"></script>
<#--
<script src="${json_config.domain_url}/${json_config.folder_name}/src/js/apply.js" type="text/javascript" charset="utf-8"></script>
-->